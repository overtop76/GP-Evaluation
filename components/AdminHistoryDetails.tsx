import React, { useState, useMemo } from 'react';
import { AppState, Observer } from '../types';
import { computeScore, getRating } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import * as XLSX from 'xlsx';

interface AdminHistoryDetailsProps {
  state: AppState;
  onNavigate: (page: string, params?: any) => void;
}

const AdminHistoryDetails: React.FC<AdminHistoryDetailsProps> = ({ state, onNavigate }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const hrRubricLevel = useMemo(() => ({
    absences: state.hrRubric?.absences || [2, 5, 9],
    earlyLate: state.hrRubric?.earlyLate || state.hrRubric?.earlyLeaves || [2, 4, 7]
  }), [state.hrRubric]);

  const teacherStats = useMemo(() => {
    const finals = state.evaluations.filter(e => !e.draft);
    
    let stats = state.teachers.map(teacher => {
      const teacherFinals = finals.filter(f => f.tid === teacher.id);
      
      const teacherHRData = state.hrData?.find(h => h.teacherId === teacher.id);
      
      let sum = 0;
      const observerIds = new Set<string>();
      
      teacherFinals.forEach(f => {
        sum += computeScore(f, state.customWeights, teacherHRData, state.hrWeight, hrRubricLevel);
        observerIds.add(f.oid);
      });
      
      const avg = teacherFinals.length > 0 ? sum / teacherFinals.length : null;
      
      const observerNames = Array.from(observerIds)
        .map(oid => state.observers.find(o => o.id === oid)?.name || 'Unknown')
        .join(', ');

      return {
        id: teacher.id,
        name: teacher.fullName,
        role: teacher.role,
        totalFinals: teacherFinals.length,
        observerNames,
        avg
      };
    });

    if (search) {
      stats = stats.filter(row => row.name.toLowerCase().includes(search.toLowerCase()) || row.role.toLowerCase().includes(search.toLowerCase()));
    }

    return stats;
  }, [state.evaluations, state.teachers, state.observers, state.hrData, state.customWeights, state.hrWeight, hrRubricLevel, search]);

  const handleExportExcel = () => {
    const dataToExport = teacherStats.map(row => {
      let ratingLabel = 'N/A';
      if (row.avg !== null) {
        ratingLabel = t(`lvl.${getRating(row.avg).level}`) || getRating(row.avg).label;
      }
      
      return {
        'Teacher Name': row.name,
        'Role': row.role,
        'Observers': row.observerNames || 'None',
        'Total Finalized': row.totalFinals,
        'Overall Score': row.avg !== null ? parseFloat(row.avg.toFixed(2)) : 'N/A',
        'Rating': ratingLabel
      };
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'History Details');
    XLSX.writeFile(wb, `Admin_History_Details_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="page" style={{ position: 'relative' }}>
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button className="btn btn-ghost btn-sm no-print" style={{ marginBottom: '16px', padding: 0 }} onClick={() => onNavigate('evaluations')}>
            <span className="material-icons" style={{ fontSize: '18px' }}>arrow_back</span>
            {t('action.back') || 'Back'}
          </button>
          <h1 className="ph-title">Evaluation History Details</h1>
          <p className="ph-sub">Comprehensive overview of teacher evaluation status and overall scores.</p>
        </div>
        <div className="no-print" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={handleExportExcel}>
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>table_view</span>
            Export Excel
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>picture_as_pdf</span>
            Export PDF
          </button>
        </div>
      </div>

      <div className="print-only">
        <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '12px' }}>
          Printed on: {currentDateTime}
        </p>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <div className="no-print" style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '20px' }}>search</span>
            <input 
              className="finput" 
              placeholder={t('dir.search') || 'Search...'} 
              style={{ paddingLeft: '42px' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gtable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>{t('dir.name')}</th>
                <th>{t('dir.role')}</th>
                <th>Observers</th>
                <th style={{ textAlign: 'center' }}>Total Finalized</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Overall Score</th>
              </tr>
            </thead>
            <tbody>
              {teacherStats.length > 0 ? teacherStats.map(row => {
                let scoreDisplay = <span style={{ color: 'var(--slate)' }}>—</span>;
                if (row.avg !== null) {
                  const rating = getRating(row.avg);
                  scoreDisplay = (
                    <div className="frow" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                      <span className={`badge ${rating.css}`}>{t(`lvl.${rating.level}`) || rating.label}</span>
                      <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', fontWeight: 900, color: rating.color }}>{row.avg.toFixed(2)}</span>
                    </div>
                  );
                }

                return (
                  <tr key={row.id} className="print-break-inside-avoid">
                    <td style={{ paddingLeft: '24px', fontWeight: 600, color: 'var(--navy)' }}>{row.name}</td>
                    <td style={{ color: 'var(--slate-dark)' }}>{row.role}</td>
                    <td style={{ fontSize: '13px', color: 'var(--slate)' }}>
                      <div style={{ maxWidth: '350px', lineHeight: '1.4' }}>
                        {row.observerNames || '—'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: row.totalFinals > 0 ? 'var(--navy)' : 'var(--slate)' }}>
                      {row.totalFinals}
                    </td>
                    <td style={{ paddingRight: '24px' }}>
                      {scoreDisplay}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px' }}>
                    <div style={{ color: 'var(--slate)', fontStyle: 'italic' }}>No data found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHistoryDetails;

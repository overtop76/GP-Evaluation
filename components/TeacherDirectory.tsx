import React, { useState } from 'react';
import { Teacher, Evaluation, HRData, Observer } from '../types';
import { computeScore, getRating, ini } from '../utils/helpers';
import { SUBJECTS, ROLES, DIVS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface TeacherDirectoryProps {
  teachers: Teacher[];
  evaluations: Evaluation[];
  customWeights: Record<string, number[]>;
  hrData?: HRData[];
  hrWeight?: number;
  hrRubric?: any;
  currentUser: Observer;
  onAddTeacher: (t: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
  onNavigate: (page: string, params?: any) => void;
}

const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({ teachers, evaluations, customWeights, hrData, hrWeight, hrRubric, currentUser, onAddTeacher, onDeleteTeacher, onNavigate }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // New Teacher Form State
  const [newName, setNewName] = useState('');
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDivs, setNewDivs] = useState<string[]>([]);

  // Filter based on permissions
  const allowedTeachers = React.useMemo(() => teachers.filter(tData => {
    if (currentUser?.role === 'admin') return true;
    if (!currentUser?.permissions) return true;
    
    const p = currentUser.permissions;
    if (p.viewScopes.includes('all')) return true;
    
    let match = true;
    if (p.viewScopes.includes('stage') && p.allowedStages?.length) {
      if (!p.allowedStages.includes(tData.division)) match = false;
    }
    if (p.viewScopes.includes('subject') && p.allowedSubjects?.length) {
      if (!p.allowedSubjects.includes(tData.subject)) match = false;
    }
    return match;
  }), [teachers, currentUser]);

  const filteredTeachers = React.useMemo(() => allowedTeachers.filter(tData => tData.fullName.toLowerCase().includes(search.toLowerCase())), [allowedTeachers, search]);

  const handleAdd = () => {
    if (!newName || !newEmployeeId || !newSubject || !newRole || !newDivs.length) {
      alert(t('dir.alertComplete'));
      return;
    }
    // Check if employee ID is unique
    if (teachers.some(tData => tData.employeeId === newEmployeeId)) {
      alert(t('dir.alertUnique'));
      return;
    }
    onAddTeacher({
      id: Date.now().toString(36),
      employeeId: newEmployeeId,
      fullName: newName,
      subject: newSubject,
      role: newRole,
      division: newDivs.join(', ')
    });
    setShowModal(false);
    setNewName('');
    setNewEmployeeId('');
    setNewSubject('');
    setNewRole('');
    setNewDivs([]);
  };

  const toggleDiv = (d: string) => {
    setNewDivs(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  return (
    <div className="page">
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="ph-title">{t('dir.title')}</h1>
          <p className="ph-sub">{t('dir.sub')}</p>
        </div>
        {currentUser.role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <span className="material-icons" style={{ fontSize: '17px' }}>person_add</span> {t('dir.register')}
          </button>
        )}
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', maxWidth: '400px', flex: 1 }}>
            <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '20px', pointerEvents: 'none' }}>search</span>
            <input 
              className="finput" 
              placeholder={t('dir.search')} 
              style={{ paddingLeft: '42px', fontSize: '14px' }} 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate)' }}>
            {t('dir.membersFound').replace('{count}', filteredTeachers.length.toString())}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="gtable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>{t('dir.name')}</th>
                <th>{t('dir.empId')}</th>
                <th>{t('dir.role')}</th>
                <th>{t('dir.subject')}</th>
                <th>{t('dir.division')}</th>
                <th>{t('dir.perf')}</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>{t('dash.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? filteredTeachers.map(tData => {
                const evals = evaluations.filter(e => e.tid === tData.id && !e.draft);
                const avg = evals.length ? evals.reduce((a, e) => {
                  const teacherHRData = hrData?.find(h => h.teacherId === e.tid);
                  return a + computeScore(e, customWeights, teacherHRData, hrWeight, hrRubric);
                }, 0) / evals.length : null;
                const r = avg != null ? getRating(avg) : null;
                return (
                  <tr key={tData.id}>
                    <td style={{ paddingLeft: '24px' }}>
                      <div className="frow" style={{ gap: '12px' }}>
                        <div className="av" style={{ width: '36px', height: '36px', background: 'var(--navy-bg)', borderRadius: '10px', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{ini(tData.fullName)}</div>
                        <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{tData.fullName}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate-dark)' }}>{tData.employeeId || '—'}</span></td>
                    <td><span style={{ background: 'var(--bg)', color: 'var(--slate-dark)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', padding: '4px 10px', borderRadius: '8px' }}>{tData.role}</span></td>
                    <td style={{ color: 'var(--slate)', fontWeight: 500, fontSize: '13.5px' }}>{tData.subject}</td>
                    <td><span style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#1d4ed8', fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', padding: '4px 10px', borderRadius: '20px' }}>{tData.division}</span></td>
                    <td>
                      {avg != null && r ? (
                        <div className="frow" style={{ gap: '10px' }}>
                          <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: r.color }}>{avg.toFixed(2)}</span>
                          <div>
                            <span className={`badge ${r.css}`} style={{ fontSize: '10px' }}>{t(`lvl.${r.level}`) || r.label}</span>
                            <div style={{ fontSize: '10px', color: 'var(--slate)', marginTop: '2px' }}>{evals.length} {t('dash.evals')}</div>
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#d1d5db', fontStyle: 'italic' }}>{t('dash.notEvaluated')}</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                      <div className="frow" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('evaluate', { tid: tData.id })}>
                          <span className="material-icons" style={{ fontSize: '16px' }}>play_circle</span> {t('action.evaluate')}
                        </button>
                        {(!currentUser.permissions || currentUser.permissions.canViewReports) && (
                          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('report', { tid: tData.id, type: 'gp' })}>
                            <span className="material-icons-outlined" style={{ fontSize: '16px' }}>bar_chart</span> {t('action.report')}
                          </button>
                        )}
                        {currentUser.role === 'admin' && (
                          <button className="icon-btn" onClick={() => {
                            if (window.confirm(t('dir.confirmDelete') || 'Are you sure you want to delete this teacher?')) {
                              onDeleteTeacher(tData.id);
                            }
                          }} title={t('action.delete')}>
                            <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>delete_outline</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7}>
                    <div className="empty" style={{ padding: '48px 24px' }}>
                      <span className="material-icons mi" style={{ fontSize: '40px', color: 'var(--border-hover)' }}>school</span>
                      <p style={{ fontSize: '14px' }}>{t('dir.noFaculty')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="mbox">
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '26px', fontWeight: 900, color: 'var(--navy)', marginBottom: '22px' }}>{t('dir.register')}</h2>
            <div className="g2">
              <div className="field">
                <label className="flabel">{t('dir.name')}</label>
                <input className="finput" placeholder="e.g. Dr. Jane Smith" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="field">
                <label className="flabel">{t('dir.empId')}</label>
                <input className="finput" placeholder="Unique ID" value={newEmployeeId} onChange={e => setNewEmployeeId(e.target.value)} />
              </div>
            </div>
            <div className="g2">
              <div className="field">
                <label className="flabel">{t('dir.subject')}</label>
                <select className="finput" value={newSubject} onChange={e => setNewSubject(e.target.value)}>
                  <option value="">{t('action.select')}…</option>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label className="flabel">{t('dir.role')}</label>
                <select className="finput" value={newRole} onChange={e => setNewRole(e.target.value)}>
                  <option value="">{t('action.select')}…</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="flabel">{t('dir.division')}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {DIVS.map(d => (
                  <label key={d} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'var(--bg)', border: `2px solid ${newDivs.includes(d) ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <input 
                      type="checkbox" 
                      value={d} 
                      checked={newDivs.includes(d)}
                      onChange={() => toggleDiv(d)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--blue)' }} 
                    />
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--slate-dark)' }}>{d}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>{t('action.cancel')}</button>
              <button className="btn btn-primary" onClick={handleAdd}>
                <span className="material-icons" style={{ fontSize: '16px' }}>check</span> {t('action.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDirectory;

import React, { useState } from 'react';
import { Evaluation, Teacher, Observer } from '../types';
import { fmtD, ini } from '../utils/helpers';
import { TYPE_LABELS } from '../constants';

interface EvaluationHistoryProps {
  evaluations: Evaluation[];
  teachers: Teacher[];
  observers: Observer[];
  onNavigate: (page: string, params?: any) => void;
  onDelete: (id: string) => void;
  currentUser: Observer;
}

const EvaluationHistory: React.FC<EvaluationHistoryProps> = ({ evaluations, teachers, observers, onNavigate, onDelete, currentUser }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = evaluations.filter(e => {
    const teacher = teachers.find(t => t.id === e.tid);
    const observer = observers.find(o => o.id === e.oid);
    
    const matchesSearch = 
      teacher?.fullName.toLowerCase().includes(search.toLowerCase()) ||
      observer?.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'draft' ? e.draft : !e.draft);

    // Role-based filtering
    const isAllowed = currentUser.role === 'admin' || e.oid === currentUser.id;

    return matchesSearch && matchesType && matchesStatus && isAllowed;
  });

  return (
    <div className="page">
      <div className="ph">
        <h1 className="ph-title">Evaluation History</h1>
        <p className="ph-sub">Review and manage all past evaluation sessions.</p>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '20px' }}>search</span>
            <input 
              className="finput" 
              placeholder="Search by teacher or observer…" 
              style={{ paddingLeft: '42px' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="finput" style={{ width: 'auto' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            {Object.entries(TYPE_LABELS).map(([val, lbl]) => (
              <option key={val} value={val}>{lbl}</option>
            ))}
          </select>
          <select className="finput" style={{ width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="final">Finalized</option>
            <option value="draft">Drafts</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gtable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>Date</th>
                <th>Teacher</th>
                <th>Observer</th>
                <th>Type</th>
                <th>Status</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(e => {
                const teacher = teachers.find(t => t.id === e.tid);
                const observer = observers.find(o => o.id === e.oid);
                return (
                  <tr key={e.id}>
                    <td style={{ paddingLeft: '24px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{fmtD(e.date)}</div>
                    </td>
                    <td>
                      <div className="frow" style={{ gap: '10px' }}>
                        <div className="av" style={{ width: '28px', height: '28px', fontSize: '10px' }}>{ini(teacher?.fullName || '?')}</div>
                        <span style={{ fontWeight: 600 }}>{teacher?.fullName}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', color: 'var(--slate-dark)' }}>{observer?.name}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase' }}>{TYPE_LABELS[e.type]}</span>
                    </td>
                    <td>
                      <span className={`badge ${e.draft ? 'b-uns' : 'b-ex'}`} style={{ fontSize: '10px' }}>
                        {e.draft ? 'Draft' : 'Finalized'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                      <div className="frow" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                        {e.draft ? (
                          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('evaluate', { eid: e.id })}>
                            <span className="material-icons" style={{ fontSize: '16px' }}>edit</span> Resume
                          </button>
                        ) : (
                          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('report', { tid: e.tid, type: e.type })}>
                            <span className="material-icons" style={{ fontSize: '16px' }}>visibility</span> View Report
                          </button>
                        )}
                        {(currentUser.role === 'admin' || e.oid === currentUser.id) && (
                          <button className="icon-btn" onClick={() => onDelete(e.id)}>
                            <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px' }}>
                    <div style={{ color: 'var(--slate)', fontStyle: 'italic' }}>No evaluations found matching filters.</div>
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

export default EvaluationHistory;

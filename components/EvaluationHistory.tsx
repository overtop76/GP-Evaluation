import React, { useState } from 'react';
import { Evaluation, Teacher, Observer } from '../types';
import { fmtD, ini } from '../utils/helpers';
import { TYPE_LABELS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface EvaluationHistoryProps {
  evaluations: Evaluation[];
  teachers: Teacher[];
  observers: Observer[];
  onNavigate: (page: string, params?: any) => void;
  onDelete: (id: string) => void;
  currentUser: Observer;
}

const EvaluationHistory: React.FC<EvaluationHistoryProps> = ({ evaluations, teachers, observers, onNavigate, onDelete, currentUser }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = React.useMemo(() => evaluations.filter(e => {
    const teacher = teachers.find(tData => tData.id === e.tid);
    const observer = observers.find(o => o.id === e.oid);
    
    const matchesSearch = 
      teacher?.fullName.toLowerCase().includes(search.toLowerCase()) ||
      observer?.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'draft' ? e.draft : !e.draft);

    // Role-based filtering
    const isAllowed = currentUser.role === 'admin' || e.oid === currentUser.id;

    return matchesSearch && matchesType && matchesStatus && isAllowed;
  }), [evaluations, teachers, observers, search, typeFilter, statusFilter, currentUser]);

  return (
    <div className="page">
      <div className="ph">
        <h1 className="ph-title">{t('hist.title')}</h1>
        <p className="ph-sub">{t('hist.sub')}</p>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '20px' }}>search</span>
            <input 
              className="finput" 
              placeholder={t('hist.search')} 
              style={{ paddingLeft: '42px' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="finput" style={{ width: 'auto' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">{t('hist.allTypes')}</option>
            {Object.entries(TYPE_LABELS).map(([val, lbl]) => (
              <option key={val} value={val}>{t(`type.${val}`) || lbl}</option>
            ))}
          </select>
          <select className="finput" style={{ width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">{t('hist.allStatus')}</option>
            <option value="final">{t('hist.finalized')}</option>
            <option value="draft">{t('hist.drafts')}</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gtable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>{t('eval.date')}</th>
                <th>{t('hist.teacher')}</th>
                <th>{t('eval.observer')}</th>
                <th>{t('hist.type')}</th>
                <th>{t('hist.status')}</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>{t('hist.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(e => {
                const teacher = teachers.find(tData => tData.id === e.tid);
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
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase' }}>{t(`type.${e.type}`) || TYPE_LABELS[e.type]}</span>
                    </td>
                    <td>
                      <span className={`badge ${e.draft ? 'b-uns' : 'b-ex'}`} style={{ fontSize: '10px' }}>
                        {e.draft ? t('hist.draft') : t('hist.finalized')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                      <div className="frow" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                        {e.draft ? (
                          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('evaluate', { eid: e.id })}>
                            <span className="material-icons" style={{ fontSize: '16px' }}>edit</span> {t('hist.resume')}
                          </button>
                        ) : (
                          <>
                            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('report', { tid: e.tid, type: e.type })}>
                              <span className="material-icons" style={{ fontSize: '16px' }}>visibility</span> {t('hist.viewReport')}
                            </button>
                            {(currentUser.role === 'admin' || currentUser.permissions?.canAddUser) && (
                              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('evaluate', { eid: e.id })}>
                                <span className="material-icons" style={{ fontSize: '16px' }}>edit</span> {t('action.edit') || 'Edit'}
                              </button>
                            )}
                          </>
                        )}
                        {(currentUser.role === 'admin' || e.oid === currentUser.id) && (
                          <button className="icon-btn" onClick={() => {
                            setConfirmDelete(e.id);
                          }}>
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
                    <div style={{ color: 'var(--slate)', fontStyle: 'italic' }}>{t('hist.noEvals')}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmDelete && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setConfirmDelete(null)}>
          <div className="mbox" style={{ maxWidth: '400px' }}>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>
              {t('action.delete')}
            </h2>
            <p style={{ marginBottom: '24px', color: 'var(--slate)', fontSize: '15px', lineHeight: 1.5 }}>
              {t('eval.confirmDelete') || 'Are you sure you want to delete this evaluation?'}
            </p>
            <div className="frow" style={{ gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>{t('action.cancel') || 'Cancel'}</button>
              <button className="btn btn-danger" onClick={() => {
                onDelete(confirmDelete);
                setConfirmDelete(null);
              }}>{t('action.confirm') || 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationHistory;

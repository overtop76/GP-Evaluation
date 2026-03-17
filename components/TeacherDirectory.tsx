import React, { useState } from 'react';
import { Teacher, Evaluation, HRData, Observer } from '../types';
import { computeScore, getRating, ini } from '../utils/helpers';
import { SUBJECTS, ROLES, DIVS } from '../constants';

interface TeacherDirectoryProps {
  teachers: Teacher[];
  evaluations: Evaluation[];
  customWeights: Record<string, number[]>;
  hrData?: HRData[];
  hrWeight?: number;
  currentUser: Observer;
  onAddTeacher: (t: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
  onNavigate: (page: string, params?: any) => void;
}

const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({ teachers, evaluations, customWeights, hrData, hrWeight, currentUser, onAddTeacher, onDeleteTeacher, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // New Teacher Form State
  const [newName, setNewName] = useState('');
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDivs, setNewDivs] = useState<string[]>([]);

  // Filter based on permissions
  const allowedTeachers = teachers.filter(t => {
    if (currentUser?.role === 'admin') return true;
    if (!currentUser?.permissions) return true;
    
    const p = currentUser.permissions;
    if (p.viewScope === 'all' || p.viewScope === 'own') return true;
    if (p.viewScope === 'stage' && p.allowedStages?.includes(t.division)) return true;
    if (p.viewScope === 'subject' && p.allowedSubjects?.includes(t.subject)) return true;
    return false;
  });

  const filteredTeachers = allowedTeachers.filter(t => t.fullName.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!newName || !newEmployeeId || !newSubject || !newRole || !newDivs.length) {
      alert('Please complete all fields.');
      return;
    }
    // Check if employee ID is unique
    if (teachers.some(t => t.employeeId === newEmployeeId)) {
      alert('Employee ID must be unique.');
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
          <h1 className="ph-title">Faculty Directory</h1>
          <p className="ph-sub">Manage staff and initiate evaluation sessions.</p>
        </div>
        {currentUser.role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <span className="material-icons" style={{ fontSize: '17px' }}>person_add</span> Register Faculty
          </button>
        )}
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', maxWidth: '400px', flex: 1 }}>
            <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '20px', pointerEvents: 'none' }}>search</span>
            <input 
              className="finput" 
              placeholder="Search faculty by name…" 
              style={{ paddingLeft: '42px', fontSize: '14px' }} 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate)' }}>
            {filteredTeachers.length} member{filteredTeachers.length !== 1 ? 's' : ''} found
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="gtable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>Name</th>
                <th>Role</th>
                <th>Subject</th>
                <th>Division</th>
                <th>Performance</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? filteredTeachers.map(t => {
                const evals = evaluations.filter(e => e.tid === t.id && !e.draft);
                const avg = evals.length ? evals.reduce((a, e) => {
                  const teacherHRData = hrData?.find(h => h.teacherId === e.tid);
                  return a + computeScore(e, customWeights, teacherHRData, hrWeight);
                }, 0) / evals.length : null;
                const r = avg != null ? getRating(avg) : null;
                return (
                  <tr key={t.id}>
                    <td style={{ paddingLeft: '24px' }}>
                      <div className="frow" style={{ gap: '12px' }}>
                        <div className="av" style={{ width: '36px', height: '36px', background: 'var(--navy-bg)', borderRadius: '10px', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{ini(t.fullName)}</div>
                        <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{t.fullName}</span>
                      </div>
                    </td>
                    <td><span style={{ background: 'var(--bg)', color: 'var(--slate-dark)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', padding: '4px 10px', borderRadius: '8px' }}>{t.role}</span></td>
                    <td style={{ color: 'var(--slate)', fontWeight: 500, fontSize: '13.5px' }}>{t.subject}</td>
                    <td><span style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#1d4ed8', fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', padding: '4px 10px', borderRadius: '20px' }}>{t.division}</span></td>
                    <td>
                      {avg != null && r ? (
                        <div className="frow" style={{ gap: '10px' }}>
                          <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: r.color }}>{avg.toFixed(2)}</span>
                          <div>
                            <span className={`badge ${r.css}`} style={{ fontSize: '10px' }}>{r.label}</span>
                            <div style={{ fontSize: '10px', color: 'var(--slate)', marginTop: '2px' }}>{evals.length} eval{evals.length !== 1 ? 's' : ''}</div>
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#d1d5db', fontStyle: 'italic' }}>Not evaluated</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                      <div className="frow" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('evaluate', { tid: t.id })}>
                          <span className="material-icons" style={{ fontSize: '16px' }}>play_circle</span> Evaluate
                        </button>
                        {(!currentUser.permissions || currentUser.permissions.canViewReports) && (
                          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('report', { tid: t.id, type: 'gp' })}>
                            <span className="material-icons-outlined" style={{ fontSize: '16px' }}>bar_chart</span> Report
                          </button>
                        )}
                        {currentUser.role === 'admin' && (
                          <button className="icon-btn" onClick={() => onDeleteTeacher(t.id)} title="Delete Faculty">
                            <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>delete_outline</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6}>
                    <div className="empty" style={{ padding: '48px 24px' }}>
                      <span className="material-icons mi" style={{ fontSize: '40px', color: 'var(--border-hover)' }}>school</span>
                      <p style={{ fontSize: '14px' }}>No faculty registered.</p>
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
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '26px', fontWeight: 900, color: 'var(--navy)', marginBottom: '22px' }}>Register New Faculty</h2>
            <div className="g2">
              <div className="field">
                <label className="flabel">Full Name</label>
                <input className="finput" placeholder="e.g. Dr. Jane Smith" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="field">
                <label className="flabel">Employee Number</label>
                <input className="finput" placeholder="Unique ID" value={newEmployeeId} onChange={e => setNewEmployeeId(e.target.value)} />
              </div>
            </div>
            <div className="g2">
              <div className="field">
                <label className="flabel">Subject Area</label>
                <select className="finput" value={newSubject} onChange={e => setNewSubject(e.target.value)}>
                  <option value="">Select…</option>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label className="flabel">Professional Role</label>
                <select className="finput" value={newRole} onChange={e => setNewRole(e.target.value)}>
                  <option value="">Select…</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="flabel">School Division(s)</label>
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
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>
                <span className="material-icons" style={{ fontSize: '16px' }}>check</span> Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDirectory;

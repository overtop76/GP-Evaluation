import React from 'react';
import { AppState } from '../types';
import { computeScore, getRating, countInds, fmtD, ini } from '../utils/helpers';
import { TYPE_LABELS, TYPE_COLORS } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  state: AppState;
  onNavigate: (page: string, params?: any) => void;
  onDeleteEvaluation: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onNavigate, onDeleteEvaluation }) => {
  const currentUser = state.currentUser;
  
  // Filter data based on permissions
  const allowedTeachers = state.teachers.filter(t => {
    if (currentUser?.role === 'admin') return true;
    if (!currentUser?.permissions) return true; // Default to all if no permissions set
    
    const p = currentUser.permissions;
    if (p.viewScope === 'all' || p.viewScope === 'own') return true; // 'own' is filtered at evaluation level, but they can see the teacher
    if (p.viewScope === 'stage' && p.allowedStages?.includes(t.division)) return true;
    if (p.viewScope === 'subject' && p.allowedSubjects?.includes(t.subject)) return true;
    return false;
  });
  
  const allowedTeacherIds = new Set(allowedTeachers.map(t => t.id));
  
  const allowedEvaluations = state.evaluations.filter(e => {
    if (currentUser?.role === 'admin') return true;
    if (!currentUser?.permissions) return true;
    
    const p = currentUser.permissions;
    if (p.viewScope === 'own' && e.oid !== currentUser.id) return false;
    if (!allowedTeacherIds.has(e.tid)) return false;
    return true;
  });

  const finals = allowedEvaluations.filter(e => !e.draft);
  const drafts = allowedEvaluations.filter(e => e.draft);
  const avg = finals.length ? finals.reduce((a, e) => {
    const teacherHRData = state.hrData?.find(h => h.teacherId === e.tid);
    return a + computeScore(e, state.customWeights, teacherHRData, state.hrWeight);
  }, 0) / finals.length : 0;

  const metrics = [
    { lbl: 'Faculty Members', val: allowedTeachers.length, ico: 'people', col: '#2563eb' },
    { lbl: 'Completed Evals', val: finals.length, ico: 'assignment_turned_in', col: '#10b981' },
    { lbl: 'System Average', val: finals.length ? avg.toFixed(2) : '—', ico: 'trending_up', col: '#7c3aed', sub: finals.length ? getRating(avg).label : 'No data yet' },
    { lbl: 'Open Drafts', val: drafts.length, ico: 'edit_note', col: '#f59e0b' }
  ];

  const recentEvals = [...finals].reverse().slice(0, 6);

  // Prepare data for trend chart
  const trendData = [...finals]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(e => {
      const teacherHRData = state.hrData?.find(h => h.teacherId === e.tid);
      return {
        date: fmtD(e.date),
        score: computeScore(e, state.customWeights, teacherHRData, state.hrWeight),
        type: TYPE_LABELS[e.type]
      };
    });

  return (
    <div className="page">
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="ph-title">System Overview</h1>
          <p className="ph-sub">Real-time aggregate of school performance metrics.</p>
        </div>
        <div className="frow" style={{ gap: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '6px 12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#15803d' }}>System Active</span>
        </div>
      </div>

      <div className="metrics">
        {metrics.map((m, i) => (
          <div className="mcard" key={i}>
            <div>
              <div className="mlbl">{m.lbl}</div>
              <div className="mval">{m.val}</div>
              {m.sub && <div className="msub" style={{ color: m.col }}>{m.sub}</div>}
            </div>
            <div className="mico" style={{ background: `${m.col}15`, color: m.col }}>
              <span className="material-icons-outlined" style={{ fontSize: '28px' }}>{m.ico}</span>
            </div>
          </div>
        ))}
      </div>

      {trendData.length > 1 && (
        <div className="card-xl" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <span className="material-icons-outlined">show_chart</span>
            </div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 800, color: 'var(--navy)' }}>Performance Trend</h2>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--slate)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 4]} tick={{ fontSize: 12, fill: 'var(--slate)' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: 'var(--navy2)', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-xl" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--white)' }}>
            <div className="frow" style={{ gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                <span className="material-icons-outlined">history</span>
              </div>
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.2 }}>Recent Evaluations</h2>
                <div style={{ fontSize: '11px', color: 'var(--slate)', fontWeight: 600 }}>Latest completed reviews</div>
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('evaluate')}>
              <span className="material-icons" style={{ fontSize: '16px' }}>add</span> New Evaluation
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="gtable">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '24px' }}>Staff Member</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Band</th>
                  <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentEvals.length > 0 ? recentEvals.map(ev => {
                  const t = state.teachers.find(x => x.id === ev.tid);
                  const teacherHRData = state.hrData?.find(h => h.teacherId === ev.tid);
                  const s = computeScore(ev, state.customWeights, teacherHRData, state.hrWeight);
                  const r = getRating(s);
                  return (
                    <tr key={ev.id}>
                      <td style={{ paddingLeft: '24px' }}>
                        <div className="frow" style={{ gap: '12px' }}>
                          <div className="av" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--slate-darker), var(--navy2))', borderRadius: '10px', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{ini(t?.fullName || '?')}</div>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{t?.fullName || 'Unknown'}</div>
                            <div style={{ fontSize: '11px', color: 'var(--slate)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{TYPE_LABELS[ev.type] || ev.type}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--slate)', fontSize: '13px' }}>{fmtD(ev.date)}</td>
                      <td><span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', fontWeight: 800, color: r.color }}>{s.toFixed(2)}</span></td>
                      <td><span className={`badge ${r.css}`}>{r.label}</span></td>
                      <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                        <div className="frow" style={{ gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('report', { tid: ev.tid, type: ev.type })}>View</button>
                          <button className="icon-btn" onClick={() => onDeleteEvaluation(ev.id)} title="Delete">
                            <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>delete_outline</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="empty">
                        <span className="material-icons mi">assignment_turned_in</span>
                        <p>No completed evaluations yet.</p>
                        <button className="btn btn-primary btn-sm" style={{ marginTop: '16px' }} onClick={() => onNavigate('evaluate')}>Start New Evaluation</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-xl" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--white)' }}>
            <div className="frow" style={{ gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                <span className="material-icons-outlined">edit_note</span>
              </div>
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.2 }}>Drafts</h2>
                <div style={{ fontSize: '11px', color: 'var(--slate)', fontWeight: 600 }}>In-progress evaluations</div>
              </div>
            </div>
            <span className="badge b-draft">{drafts.length}</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '500px' }}>
            {drafts.length > 0 ? drafts.map(ev => {
              const t = state.teachers.find(x => x.id === ev.tid);
              const tot = countInds(ev.type);
              const done = ev.scores ? ev.scores.length : 0;
              const pct = tot ? Math.round(done / tot * 100) : 0;
              return (
                <div key={ev.id} style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px', transition: 'background 0.2s' }} className="hover:bg-slate-50">
                  <div className="av" style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '12px', fontSize: '14px', flexShrink: 0, boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)' }}>{ini(t?.fullName || '?')}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px', marginBottom: '2px' }}>{t?.fullName || 'Unknown'}</div>
                    <div style={{ fontSize: '11px', color: '#92400e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span>{TYPE_LABELS[ev.type]}</span>
                      <span>{done}/{tot} Completed</span>
                    </div>
                    <div className="pbar" style={{ height: '4px', background: '#fed7aa' }}><div className="pfill" style={{ width: `${pct}%`, background: '#f59e0b' }}></div></div>
                  </div>
                  <div className="frow" style={{ gap: '8px', flexShrink: 0 }}>
                    <button className="btn btn-sm" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#c2410c', border: '1px solid #fed7aa' }} onClick={() => onNavigate('evaluate', { eid: ev.id })}>
                      Resume
                    </button>
                    <button className="icon-btn" onClick={() => onDeleteEvaluation(ev.id)} title="Discard Draft">
                      <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>close</span>
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div className="empty" style={{ padding: '48px 24px' }}>
                <span className="material-icons-outlined mi" style={{ fontSize: '40px', color: 'var(--border-hover)' }}>check_circle_outline</span>
                <p style={{ fontSize: '14px' }}>No active drafts.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {finals.length > 0 && (
        <div className="card-xl" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
              <span className="material-icons-outlined">pie_chart</span>
            </div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 800, color: 'var(--navy)' }}>Evaluation Type Breakdown</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {Object.entries(TYPE_LABELS).map(([t, l]) => {
              const cnt = finals.filter(e => e.type === t).length;
              const evs = finals.filter(e => e.type === t);
              const tavg = evs.length ? evs.reduce((a, e) => {
                const teacherHRData = state.hrData?.find(h => h.teacherId === e.tid);
                return a + computeScore(e, state.customWeights, teacherHRData, state.hrWeight);
              }, 0) / evs.length : 0;
              const r = evs.length ? getRating(tavg) : null;
              return (
                <div key={t} style={{ border: `1px solid ${TYPE_COLORS[t]}30`, borderRadius: '16px', padding: '20px', background: `linear-gradient(145deg, ${TYPE_COLORS[t]}05, ${TYPE_COLORS[t]}10)`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.1, color: TYPE_COLORS[t] }}>
                    <span className="material-icons" style={{ fontSize: '80px' }}>assessment</span>
                  </div>
                  <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '42px', fontWeight: 900, color: cnt ? TYPE_COLORS[t] : 'var(--border-hover)', lineHeight: 1, marginBottom: '4px' }}>{cnt}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{l}</div>
                  {r && <span className={`badge ${r.css}`} style={{ marginTop: '12px', fontSize: '10px' }}>Avg: {tavg.toFixed(2)} · {r.label}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

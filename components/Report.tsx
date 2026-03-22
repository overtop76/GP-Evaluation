import React from 'react';
import { Teacher, Observer, Evaluation, AppState } from '../types';
import { computeScore, getRating, getDomainScores, ini, fmtD, getRubric, getHRScore } from '../utils/helpers';
import { TYPE_LABELS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface ReportProps {
  teacherId: string | null;
  type: string;
  state: AppState;
  onBack: () => void;
}

const Report: React.FC<ReportProps> = ({ teacherId, type, state, onBack }) => {
  const [currentType, setCurrentType] = React.useState(type);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [observerFilter, setObserverFilter] = React.useState('');
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(null);
  
  const teacher = state.teachers.find(t => t.id === teacherId);
  if (!teacher) return <div className="page"><div className="empty"><span className="material-icons mi">error_outline</span><p>Teacher not found.</p></div></div>;

  const allFinals = state.evaluations.filter(e => {
    if (e.tid !== teacherId || e.type !== currentType || e.draft) return false;
    
    // Check permissions
    if (state.currentUser?.role === 'admin') return true;
    if (!state.currentUser?.permissions) return true;
    
    const p = state.currentUser.permissions;
    if (p.viewScopes.includes('all')) return true;
    if (p.viewScopes.includes('own') && e.oid !== state.currentUser.id) return false;
    
    return true;
  });
  
  if (!allFinals.length) {
    return (
      <div className="page">
        <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <button className="btn btn-ghost btn-sm no-print" style={{ marginBottom: '12px' }} onClick={onBack}>
              <span className="material-icons" style={{ fontSize: '15px' }}>arrow_back</span> Back
            </button>
            <h1 className="ph-title">{teacher.fullName}</h1>
            <p className="ph-sub">{teacher.role} · {teacher.subject} · {teacher.division}</p>
          </div>
          <div className="frow" style={{ gap: '12px' }}>
            <div className="tbar no-print">
              {Object.keys(TYPE_LABELS).map(t => (
                <button key={t} className={`tbtn ${currentType === t ? 'active' : ''}`} onClick={() => setCurrentType(t)}>{TYPE_LABELS[t]}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="card-xl" style={{ overflow: 'hidden', marginBottom: '24px' }}>
          <div className="rep-hdr">
            <div className="frow" style={{ gap: '20px' }}>
              <img 
                src="https://picsum.photos/seed/global-paradigm/200/200" 
                alt="GP Logo" 
                referrerPolicy="no-referrer"
                style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,.15)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '.02em', lineHeight: 1 }}>{teacher.fullName}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.6)', marginTop: '6px' }}>
                  Employee ID: {teacher.employeeId || 'N/A'} · Performance Evaluation Report · Global Paradigm International School
                </div>
              </div>
            </div>
          </div>
          <div className="empty" style={{ padding: '80px' }}>
            <span className="material-icons mi">search_off</span>
            <p>No <strong>{TYPE_LABELS[currentType]}</strong> evaluations for this teacher.</p>
          </div>
        </div>
      </div>
    );
  }

  const finals = allFinals.filter(e => {
    if (startDate && e.date < startDate) return false;
    if (endDate && e.date > endDate) return false;
    if (observerFilter && e.oid !== observerFilter) return false;
    return true;
  });

  const teacherHRData = state.hrData?.find(h => h.teacherId === teacherId);
  
  const latest = finals.length ? finals[finals.length - 1] : null;
  const latestScore = latest ? computeScore(latest, state.customWeights, teacherHRData, state.hrWeight) : 0;
  const avgScore = finals.length ? finals.reduce((a, e) => a + computeScore(e, state.customWeights, teacherHRData, state.hrWeight), 0) / finals.length : 0;
  const r = latestScore ? getRating(latestScore) : { label: 'N/A', css: '', color: 'var(--slate)', hex: '#f1f5f9' };
  const ds = latest ? getDomainScores(latest, state.customWeights, teacherHRData, state.hrWeight) : [];
  const rubric = getRubric(currentType, state.customWeights);
  
  const isCollective = !observerFilter;
  const observer = state.observers.find(o => o.id === observerFilter);
  const reportTitle = isCollective ? "Collective Performance Evaluation Report" : `Observer Evaluation Report: ${observer?.name || 'Unknown'}`;

  const sm: Record<string, number> = {};
  const nm: Record<string, string> = {};
  const agreementCount: Record<string, { strength: number, improvement: number, total: number }> = {};
  
  if (finals.length > 0) {
    const counts: Record<string, number> = {};
    finals.forEach(f => {
      f.scores.forEach(s => {
        sm[s.id] = (sm[s.id] || 0) + s.score;
        counts[s.id] = (counts[s.id] || 0) + 1;
        if (s.notes) nm[s.id] = nm[s.id] ? `${nm[s.id]} | ${s.notes}` : s.notes;
        
        if (!agreementCount[s.id]) agreementCount[s.id] = { strength: 0, improvement: 0, total: 0 };
        agreementCount[s.id].total++;
        if (s.score >= 3) agreementCount[s.id].strength++;
        if (s.score <= 2) agreementCount[s.id].improvement++;
      });
    });
    Object.keys(sm).forEach(k => {
      sm[k] = sm[k] / counts[k];
    });
  }
  
  const strengths: { id: string, text: string, score: number }[] = [];
  const imps: { id: string, text: string, score: number }[] = [];
  
  if (Object.keys(sm).length > 0) {
    rubric.forEach(d => d.subdomains.forEach(s => s.indicators.forEach(i => {
      const score = sm[i.id];
      const agreement = agreementCount[i.id];
      
      if (isCollective) {
        // Collective: Common strengths (at least 60% agreement among observers who rated it)
        const observerCount = new Set(finals.map(f => f.oid)).size;
        if (observerCount > 1) {
           if (agreement && agreement.strength / agreement.total >= 0.6) {
             strengths.push({ id: i.id, text: i.text, score });
           }
           if (agreement && agreement.improvement / agreement.total >= 0.6) {
             imps.push({ id: i.id, text: i.text, score });
           }
        } else {
           if (score >= 3) strengths.push({ id: i.id, text: i.text, score });
           else if (score && score <= 2) imps.push({ id: i.id, text: i.text, score });
        }
      } else {
        // Individual: All strengths/improvements
        if (score >= 3) strengths.push({ id: i.id, text: i.text, score });
        else if (score && score <= 2) imps.push({ id: i.id, text: i.text, score });
      }
    })));
  }

  // Chart Data
  const chartData = ds.map(d => ({
    name: d.name.replace(/D\d+: /, '').substring(0, 28),
    avg: d.avg,
    full: d.name
  }));

  const getColor = (v: number) => v >= 3.5 ? '#10b981' : v >= 2.75 ? '#2563eb' : v >= 2 ? '#f59e0b' : '#ef4444';

  const selectedDomainData = selectedDomain ? rubric.find(d => d.domain === selectedDomain) : null;

  return (
    <div className="page">
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <button className="btn btn-ghost btn-sm no-print" style={{ marginBottom: '12px' }} onClick={onBack}>
            <span className="material-icons" style={{ fontSize: '15px' }}>arrow_back</span> Back
          </button>
          <h1 className="ph-title">{teacher.fullName}</h1>
          <p className="ph-sub">{teacher.role} · {teacher.subject} · {teacher.division}</p>
        </div>
        <div className="frow" style={{ gap: '12px' }}>
          <div className="tbar no-print">
            {Object.keys(TYPE_LABELS).map(t => (
              <button key={t} className={`tbtn ${currentType === t ? 'active' : ''}`} onClick={() => setCurrentType(t)}>{TYPE_LABELS[t]}</button>
            ))}
          </div>
          {(!state.currentUser?.permissions || state.currentUser.permissions.canPrintReports) && (
            <button className="btn btn-dark no-print" onClick={() => window.print()}>
              <span className="material-icons-outlined" style={{ fontSize: '18px' }}>print</span> Print Report
            </button>
          )}
        </div>
      </div>

      <div className="card no-print" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--bg)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate)' }}>
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>filter_alt</span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--slate)' }}>Filters</span>
        </div>
        <div className="field" style={{ marginBottom: 0, flex: 1, minWidth: '160px' }}>
          <input type="date" className="finput" style={{ padding: '10px 14px', fontSize: '13px' }} value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Start Date" />
        </div>
        <div className="field" style={{ marginBottom: 0, flex: 1, minWidth: '160px' }}>
          <input type="date" className="finput" style={{ padding: '10px 14px', fontSize: '13px' }} value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="End Date" />
        </div>
        {(!state.currentUser?.permissions || !state.currentUser.permissions.viewScopes.includes('own')) && (
          <div className="field" style={{ marginBottom: 0, flex: 1, minWidth: '200px' }}>
            <select className="finput" style={{ padding: '10px 14px', fontSize: '13px' }} value={observerFilter} onChange={e => setObserverFilter(e.target.value)}>
              <option value="">All Observers</option>
              {state.observers.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
        )}
        {(startDate || endDate || observerFilter) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setStartDate(''); setEndDate(''); setObserverFilter(''); }}>
            Clear
          </button>
        )}
      </div>

      <div className="card-xl" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div className="rep-hdr">
          <div className="frow" style={{ gap: '20px' }}>
            <img 
              src="https://picsum.photos/seed/global-paradigm/200/200" 
              alt="GP Logo" 
              referrerPolicy="no-referrer"
              style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,.15)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '.02em', lineHeight: 1 }}>{teacher.fullName}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.6)', marginTop: '6px' }}>
                {reportTitle} · Global Paradigm International School
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.4)', marginTop: '4px' }}>
                Employee ID: {teacher.employeeId || 'N/A'} · {teacher.role} · {teacher.subject} · {teacher.division}
              </div>
            </div>
          </div>
        </div>

        {finals.length === 0 ? (
          <div className="empty" style={{ padding: '80px' }}>
            <span className="material-icons mi">filter_list_off</span>
            <p>No records match the selected filters.</p>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: '16px' }} onClick={() => { setStartDate(''); setEndDate(''); setObserverFilter(''); }}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="rep-meta">
              <div className="rmc"><div className="rmc-l">Framework</div><div className="rmc-v">{TYPE_LABELS[currentType]}</div></div>
              <div className="rmc"><div className="rmc-l">Latest Date</div><div className="rmc-v">{latest ? fmtD(latest.date) : '—'}</div></div>
              <div className="rmc"><div className="rmc-l">Total Evaluations</div><div className="rmc-v">{finals.length} completed</div></div>
              <div className="rmc"><div className="rmc-l">Period Average</div><div className="rmc-v" style={{ color: r.color }}>{avgScore.toFixed(2)}</div></div>
              <div className="rmc"><div className="rmc-l">HR Weight</div><div className="rmc-v">{state.hrWeight}%</div></div>
            </div>

            <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '20px' }}>Domain Competency Profile</h2>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--slate)' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 4]} tick={{ fontSize: 10 }} />
                      <Radar name="Score" dataKey="avg" stroke={r.color} fill={r.color} fillOpacity={0.5} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '12px' }}>Executive Summary</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--slate-darker)' }}>
                  This report summarizes the performance of <strong>{teacher.fullName}</strong> for the <strong>{TYPE_LABELS[currentType]}</strong> framework. 
                  Based on <strong>{finals.length}</strong> evaluations, the overall score is <strong>{latestScore.toFixed(2)}</strong>, placing the teacher in the <strong>{r.label}</strong> category.
                  {isCollective ? ' This collective view represents a consensus across multiple observers.' : ' This report reflects the specific observations of the selected evaluator.'}
                </p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                   <div style={{ flex: 1, padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase' }}>Avg Score</div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--navy)' }}>{avgScore.toFixed(2)}</div>
                   </div>
                   <div style={{ flex: 1, padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase' }}>Rating</div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: r.color }}>{r.label}</div>
                   </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }} className="page-break">
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '20px' }}>Performance by Domain (Detailed)</h2>
                <div style={{ height: Math.max(240, ds.length * 50 + 40) }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                      <XAxis type="number" domain={[0, 4]} hide />
                      <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 12, fontWeight: 600, fontFamily: 'Barlow', fill: 'var(--slate-dark)' }} />
                      <Tooltip 
                        cursor={{ fill: 'var(--bg)' }} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="avg" barSize={24} radius={[0, 6, 6, 0]} onClick={(data) => setSelectedDomain(data.full)} style={{ cursor: 'pointer' }}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getColor(entry.avg)} style={{ cursor: 'pointer', opacity: selectedDomain === entry.full ? 1 : selectedDomain ? 0.5 : 1, transition: 'opacity 0.2s' }} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>Overall Rating</h2>
                <div style={{ background: r.hex, border: `1px solid ${r.color}30`, borderRadius: '20px', padding: '32px', textAlign: 'center', borderTop: `6px solid ${r.color}`, boxShadow: 'var(--sh)' }}>
                  <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '80px', fontWeight: 900, color: r.color, lineHeight: 1 }}>{latestScore.toFixed(2)}</div>
                  <span className={`badge ${r.css}`} style={{ fontSize: '13px', padding: '6px 18px', marginTop: '12px' }}>{r.label}</span>
                  <div style={{ fontSize: '12px', color: 'var(--slate)', marginTop: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{TYPE_LABELS[currentType]}</div>
                </div>
              </div>
            </div>

            {selectedDomainData && (
              <div style={{ padding: '0 32px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>
                    Detailed Breakdown: {selectedDomainData.domain}
                  </h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelectedDomain(null)}>
                    <span className="material-icons" style={{ fontSize: '16px' }}>close</span> Close Details
                  </button>
                </div>
                <div className="card" style={{ padding: '24px' }}>
                  {selectedDomainData.subdomains.map(sub => (
                    <div key={sub.name} style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>{sub.name}</h3>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {sub.indicators.map(ind => {
                          const score = sm[ind.id];
                          const color = score >= 3.5 ? '#10b981' : score >= 2.75 ? '#2563eb' : score >= 2 ? '#f59e0b' : '#ef4444';
                          return (
                            <div key={ind.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                              <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', background: score ? color : 'var(--border)', color: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', flexShrink: 0 }}>
                                  {score || '-'}
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--slate)', marginBottom: '2px' }}>{ind.id}</div>
                                  <div style={{ fontSize: '13.5px', color: 'var(--slate-darker)' }}>{ind.text}</div>
                                </div>
                              </div>
                              {nm[ind.id] && (
                                <div style={{ marginTop: '4px', padding: '8px 12px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', color: 'var(--slate)', fontStyle: 'italic' }}>
                                  <strong style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--slate)', marginRight: '6px' }}>Notes:</strong>
                                  {nm[ind.id]}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ padding: '0 32px 32px' }} className="page-break">
              <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>Domain Breakdown</h2>
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="gtable">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: '24px' }}>Domain</th>
                      <th className="tc">Weight</th>
                      <th className="tc">Average</th>
                      <th className="tc">Rating</th>
                      <th className="tc" style={{ paddingRight: '24px' }}>Weighted Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ds.map(d => {
                      const dr = d.avg ? getRating(d.avg) : { label: 'Not Scored', css: '', color: 'var(--slate)' };
                      return (
                        <tr key={d.name}>
                          <td style={{ fontWeight: 600, color: 'var(--navy)', paddingLeft: '24px' }}>{d.name}</td>
                          <td className="tc">{d.weight}%</td>
                          <td className="tc"><span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 900, color: dr.color }}>{d.avg ? d.avg.toFixed(2) : '—'}</span></td>
                          <td className="tc"><span className={`badge ${dr.css}`}>{dr.label}</span></td>
                          <td className="tc" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--slate)', paddingRight: '24px' }}>{d.avg && d.weight ? (d.avg * d.weight / 100).toFixed(3) : '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {teacherHRData && (
              <div style={{ padding: '0 32px 32px' }} className="page-break">
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>HR Attendance & Punctuality Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="card" style={{ padding: '24px' }}>
                    <div style={{ height: '200px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Absences', value: teacherHRData.absences, score: getHRScore('absences', teacherHRData.absences) },
                          { name: 'Early Leaves', value: teacherHRData.earlyLeaves, score: getHRScore('earlyLeaves', teacherHRData.earlyLeaves) },
                          { name: 'Late Arrivals', value: teacherHRData.lateArrivals, score: getHRScore('lateArrivals', teacherHRData.lateArrivals) }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--slate)' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: 'var(--slate)' }} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          />
                          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="frow" style={{ justifyContent: 'center', gap: '20px', marginTop: '16px' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metric Count</span>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="grid grid-cols-3 gap-4">
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', marginBottom: '4px' }}>Absences</div>
                        <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>{teacherHRData.absences}</div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: getHRScore('absences', teacherHRData.absences) >= 3 ? '#10b981' : '#f43f5e' }}>Score: {getHRScore('absences', teacherHRData.absences)}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', marginBottom: '4px' }}>Early Leaves</div>
                        <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>{teacherHRData.earlyLeaves}</div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: getHRScore('earlyLeaves', teacherHRData.earlyLeaves) >= 3 ? '#10b981' : '#f43f5e' }}>Score: {getHRScore('earlyLeaves', teacherHRData.earlyLeaves)}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', marginBottom: '4px' }}>Late Arrivals</div>
                        <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>{teacherHRData.lateArrivals}</div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: getHRScore('lateArrivals', teacherHRData.lateArrivals) >= 3 ? '#10b981' : '#f43f5e' }}>Score: {getHRScore('lateArrivals', teacherHRData.lateArrivals)}</div>
                      </div>
                    </div>
                    
                    {teacherHRData.notes && (
                      <div style={{ marginTop: '20px', background: 'var(--bg)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', marginBottom: '4px' }}>HR Observations</div>
                        <div style={{ fontSize: '13px', color: 'var(--slate-darker)', fontStyle: 'italic' }}>"{teacherHRData.notes}"</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div style={{ padding: '0 32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="page-break">
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 900, color: '#15803d', marginBottom: '16px' }}>
                  {isCollective ? 'Common Strengths' : 'Identified Strengths'} <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--slate)' }}>(3–4)</span>
                </h2>
                {strengths.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {strengths.map(s => (
                      <div key={s.id} style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px 18px', breakInside: 'avoid' }}>
                        <div className="frow" style={{ gap: '10px', marginBottom: '6px' }}>
                          <span className="ind-id">{s.id}</span>
                          <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', fontWeight: 900, color: '#15803d' }}>{s.score.toFixed(1)}</span>
                        </div>
                        <div style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.5 }}>{s.text}</div>
                      </div>
                    ))}
                  </div>
                ) : <div style={{ color: 'var(--slate)', fontStyle: 'italic', fontSize: '14px' }}>No indicators scored 3 or above.</div>}
              </div>
              <div>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 900, color: '#dc2626', marginBottom: '16px' }}>
                  {isCollective ? 'Common Areas for Development' : 'Areas for Development'} <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--slate)' }}>(1–2)</span>
                </h2>
                {imps.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {imps.map(s => (
                      <div key={s.id} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px', breakInside: 'avoid' }}>
                        <div className="frow" style={{ gap: '10px', marginBottom: '6px' }}>
                          <span className="ind-id" style={{ background: 'var(--red)' }}>{s.id}</span>
                          <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', fontWeight: 900, color: '#dc2626' }}>{s.score.toFixed(1)}</span>
                        </div>
                        <div style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.5 }}>{s.text}</div>
                      </div>
                    ))}
                  </div>
                ) : <div style={{ color: 'var(--slate)', fontStyle: 'italic', fontSize: '14px' }}>No indicators scored below 3.</div>}
              </div>
            </div>

            {latest && latest.comments && (
              <div style={{ padding: '0 32px 32px' }}>
                <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>Evaluator Synthesis</h2>
                <div className="card" style={{ padding: '24px', fontSize: '15px', lineHeight: 1.7, color: 'var(--slate)', background: 'var(--bg)', border: '1px solid var(--border)' }}>{latest.comments}</div>
              </div>
            )}

            <div style={{ padding: '0 32px 32px' }}>
              <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>Evaluation History</h2>
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="gtable">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: '24px' }}>Date</th>
                      <th>Score</th>
                      <th>Rating</th>
                      <th style={{ paddingRight: '24px' }}>Observer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...finals].reverse().map(ev => {
                      const teacherHRData = state.hrData?.find(h => h.teacherId === ev.tid);
                      const s = computeScore(ev, state.customWeights, teacherHRData, state.hrWeight);
                      const rr = getRating(s);
                      const obs = state.observers.find(o => o.id === ev.oid);
                      return (
                        <tr key={ev.id}>
                          <td style={{ fontWeight: 600, color: 'var(--slate)', paddingLeft: '24px' }}>{fmtD(ev.date)}</td>
                          <td><span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '22px', fontWeight: 900, color: rr.color }}>{s.toFixed(2)}</span></td>
                          <td><span className={`badge ${rr.css}`}>{rr.label}</span></td>
                          <td style={{ color: 'var(--slate)', fontSize: '13px', paddingRight: '24px' }}>{obs?.name || '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ padding: '0 32px 40px' }}>
              <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', background: 'var(--white)' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--slate)', marginBottom: '8px' }}>Evaluator Signature</div>
                  <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: '8px', marginBottom: '8px', height: '40px' }}></div>
                  <div style={{ fontSize: '13px', color: 'var(--slate)' }}>{latest ? fmtD(latest.date) : '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--slate)', marginBottom: '8px' }}>Teacher Signature</div>
                  <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: '8px', marginBottom: '8px', height: '40px' }}></div>
                  <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Date</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Report;

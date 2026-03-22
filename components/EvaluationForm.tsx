import React, { useState, useEffect } from 'react';
import { Teacher, Observer, Evaluation, Score } from '../types';
import { getRubric, countInds, uid } from '../utils/helpers';
import { TYPE_LABELS, LEVEL_LABELS, LEVEL_COLORS, LEVEL_BG } from '../constants';

interface EvaluationFormProps {
  teachers: Teacher[];
  observers: Observer[];
  customWeights: Record<string, number[]>;
  initialData?: Partial<Evaluation>;
  currentUser: Observer;
  onSave: (ev: Evaluation) => void;
  onCancel: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ teachers, observers, customWeights, initialData, currentUser, onSave, onCancel }) => {
  const [type, setType] = useState(initialData?.type || 'gp');
  const [tid, setTid] = useState(initialData?.tid || '');
  const [oid, setOid] = useState(initialData?.oid || currentUser.id);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [comments, setComments] = useState(initialData?.comments || '');
  const [di, setDi] = useState(0); // Domain Index

  useEffect(() => {
    if (initialData?.scores) {
      const sm: Record<string, number> = {};
      const nm: Record<string, string> = {};
      initialData.scores.forEach(s => {
        sm[s.id] = s.score;
        if (s.notes) nm[s.id] = s.notes;
      });
      setScores(sm);
      setNotes(nm);
    }
  }, [initialData]);

  const allowedTeachers = React.useMemo(() => teachers.filter(t => {
    if (currentUser?.role === 'admin') return true;
    if (!currentUser?.permissions) return true;
    
    const p = currentUser.permissions;
    if (p.viewScopes.includes('all')) return true;
    
    let match = true;
    if (p.viewScopes.includes('stage') && p.allowedStages?.length) {
      if (!p.allowedStages.includes(t.division)) match = false;
    }
    if (p.viewScopes.includes('subject') && p.allowedSubjects?.length) {
      if (!p.allowedSubjects.includes(t.subject)) match = false;
    }
    return match;
  }), [teachers, currentUser]);

  const rubric = getRubric(type, customWeights);
  const total = countInds(type);
  const done = Object.keys(scores).length;
  const pct = total ? Math.round(done / total * 100) : 0;
  const isComplete = total > 0 && done >= total;

  const handleScore = (id: string, score: number) => {
    setScores(prev => ({ ...prev, [id]: score }));
  };

  const handleSave = (draft: boolean) => {
    if (!tid) {
      alert('Select a staff member first.');
      return;
    }
    if (!draft && (!oid || !isComplete)) {
      alert('Please complete all fields and scores before finalizing.');
      return;
    }

    const scoreList: Score[] = Object.entries(scores).map(([id, score]) => ({ 
      id, 
      score: score as number,
      notes: notes[id]
    }));
    const ev: Evaluation = {
      id: initialData?.id || uid(),
      type,
      tid,
      oid,
      date: new Date().toISOString().split('T')[0],
      scores: scoreList,
      comments,
      draft
    };
    onSave(ev);
  };

  const changeType = (t: string) => {
    if (type === t) return;
    if (Object.keys(scores).length > 0) {
      if (confirm('Switching frameworks will reset all current scores. Continue?')) {
        setType(t);
        setScores({});
        setDi(0);
      }
    } else {
      setType(t);
      setDi(0);
    }
  };

  const domain = rubric[di];
  const domInds = domain ? domain.subdomains.flatMap(s => s.indicators) : [];
  const domDone = domInds.filter(i => scores[i.id] !== undefined).length;

  return (
    <div className="page">
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <button className="btn btn-ghost btn-sm no-print" style={{ marginBottom: '12px' }} onClick={onCancel}>
            <span className="material-icons" style={{ fontSize: '15px' }}>arrow_back</span> Back
          </button>
          <h1 className="ph-title">Observation Session</h1>
          <p className="ph-sub">{initialData?.id ? 'Resuming saved draft' : 'New evaluation'} — {total} indicators total</p>
        </div>
        <div className="frow" style={{ gap: '16px', background: 'var(--white)', padding: '10px 16px', borderRadius: '16px', boxShadow: 'var(--sh)' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--slate)' }}>Progress</div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', lineHeight: 1 }}>
              {done} <span style={{ color: 'var(--border-hover)', fontSize: '16px' }}>/ {total}</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: '48px', height: '48px' }}>
            <svg viewBox="0 0 36 36" style={{ width: '48px', height: '48px', transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="3.2" />
              <circle 
                cx="18" cy="18" r="15.9" fill="none" 
                stroke={isComplete ? '#10b981' : '#3b82f6'} 
                strokeWidth="3.2" 
                strokeDasharray={`${pct} ${100 - pct}`} 
                strokeLinecap="round" 
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--navy)' }}>{pct}%</div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }}></div>
          <button className="btn btn-ghost no-print" onClick={() => handleSave(true)}>
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>save</span> Save Draft
          </button>
        </div>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg)', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <div className="tbar">
            {Object.keys(TYPE_LABELS).map(t => (
              <button key={t} className={`tbtn ${type === t ? 'active' : ''}`} onClick={() => changeType(t)}>{TYPE_LABELS[t]}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label className="flabel">Staff Member</label>
            <select className="finput" value={tid} onChange={e => setTid(e.target.value)}>
              <option value="">— Select Staff Member —</option>
              {allowedTeachers.map(t => <option key={t.id} value={t.id}>{t.fullName} · {t.role}</option>)}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label className="flabel">Evaluator / Observer</label>
            <select className="finput" value={oid} onChange={e => setOid(e.target.value)} disabled={currentUser.role !== 'admin'}>
              <option value="">— Select Evaluator —</option>
              {observers.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
        </div>
        
        <div className="dtabs">
          {rubric.map((d, i) => {
            const ids = d.subdomains.flatMap(s => s.indicators.map(x => x.id));
            const dc = ids.filter(id => scores[id] !== undefined).length;
            const dk = dc === ids.length;
            return (
              <div key={i} className={`dtab ${i === di ? 'active' : dk ? 'done' : ''}`} onClick={() => setDi(i)}>
                {dk && <span className="material-icons" style={{ fontSize: '14px', color: '#10b981' }}>check_circle</span>}
                {d.domain.split(':')[0]} <span style={{ opacity: .5, fontSize: '10px', marginLeft: '4px' }}>({dc}/{ids.length})</span>
              </div>
            );
          })}
        </div>

        {domain && (
          <>
            <div className="dom-hdr">
              <div>
                <div className="dom-name">{domain.domain}</div>
                <div className="dom-meta">Area {di + 1} of {rubric.length} &nbsp;·&nbsp; Weight: {domain.weight}%</div>
              </div>
              <div>
                <div className="dp-lbl">Area Progress</div>
                <div className="dp-val">{domDone} <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '20px' }}>/ {domInds.length}</span></div>
              </div>
            </div>
            
            {domain.subdomains.map(sub => (
              <div key={sub.name}>
                <div className="sub-hdr">{sub.name}</div>
                {sub.indicators.map(ind => {
                  const sel = scores[ind.id];
                  return (
                    <div className="ind-block" key={ind.id}>
                      <div className="ind-meta">
                        <span className="ind-id">{ind.id}</span>
                        <span className="ind-ev">Evidence: {ind.evidence}</span>
                      </div>
                      <div className="ind-text">{ind.text}</div>
                      <div className="sgrid">
                        {[4, 3, 2, 1].map(v => (
                          <button 
                            key={v} 
                            className="sbtn" 
                            onClick={() => handleScore(ind.id, v)}
                            style={{ 
                              background: sel === v ? LEVEL_COLORS[v] : '#fff',
                              borderColor: sel === v ? LEVEL_COLORS[v] : 'transparent',
                              boxShadow: sel === v ? `0 4px 12px ${LEVEL_COLORS[v]}40` : 'var(--sh)',
                              transform: sel === v ? 'translateY(-2px)' : 'none'
                            }}
                          >
                            <span className="snum" style={{ color: sel === v ? '#fff' : LEVEL_COLORS[v] }}>{v}</span>
                            <span className="slbl" style={{ color: sel === v ? 'rgba(255,255,255,.9)' : LEVEL_COLORS[v] }}>{LEVEL_LABELS[v]}</span>
                          </button>
                        ))}
                      </div>
                      {sel ? (
                        <div className="desc-box vis" style={{ background: LEVEL_BG[sel], borderLeftColor: LEVEL_COLORS[sel] }}>
                          <strong style={{ color: LEVEL_COLORS[sel], textTransform: 'uppercase', fontSize: '11px', letterSpacing: '.05em' }}>{LEVEL_LABELS[sel]} Performance:</strong>
                          <div style={{ marginTop: '4px' }}>{ind.levels[sel]}</div>
                        </div>
                      ) : (
                        <div className="desc-box vis" style={{ background: 'var(--bg)', borderLeftColor: 'var(--border-hover)', color: 'var(--slate)', fontStyle: 'italic' }}>
                          Select a score to view the performance descriptor.
                        </div>
                      )}
                      
                      <div style={{ marginTop: '12px' }}>
                        <textarea 
                          className="finput" 
                          style={{ minHeight: '60px', fontSize: '13px', padding: '10px' }}
                          placeholder="Add evidence or notes..."
                          value={notes[ind.id] || ''}
                          onChange={e => setNotes(prev => ({ ...prev, [ind.id]: e.target.value }))}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="form-nav no-print">
              <div className="frow" style={{ gap: '12px' }}>
                <button className="btn btn-ghost" onClick={() => setDi(di - 1)} disabled={di === 0}>
                  <span className="material-icons" style={{ fontSize: '18px' }}>chevron_left</span> Previous Area
                </button>
                <button className="btn btn-ghost" onClick={() => setDi(di + 1)} disabled={di === rubric.length - 1}>
                  Next Area <span className="material-icons" style={{ fontSize: '18px' }}>chevron_right</span>
                </button>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate)' }}>{done} of {total} indicators scored</span>
            </div>
          </>
        )}
      </div>

      <div className="card-xl" style={{ padding: '28px' }}>
        <div className="field">
          <label className="flabel">Professional Synthesis & Required Actions</label>
          <textarea 
            className="finput" 
            style={{ minHeight: '140px', resize: 'vertical', fontSize: '15px', lineHeight: 1.6 }} 
            placeholder="Enter formal feedback, commendations, or areas for immediate intervention…"
            value={comments}
            onChange={e => setComments(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            className="btn btn-ghost" 
            style={{ flex: 1, justifyContent: 'center', padding: '18px', fontSize: '14px', border: '1px solid var(--border)' }}
            onClick={() => handleSave(true)}
          >
            <span className="material-icons-outlined">save</span> Save Draft
          </button>
          <button 
            className={`btn ${isComplete ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ flex: 2, justifyContent: 'center', padding: '18px', fontSize: '14px' }}
            disabled={!isComplete}
            onClick={() => handleSave(false)}
          >
            <span className="material-icons">{isComplete ? 'check_circle' : 'lock'}</span> 
            {isComplete ? 'Finalize & Lock Evaluation' : `${total - done} indicator${total - done !== 1 ? 's' : ''} remaining to finalize`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;

import React, { useState, useEffect } from 'react';
import { Teacher, Observer, Evaluation, Score } from '../types';
import { getRubric, countInds, uid, canObserverViewTeacher } from '../utils/helpers';
import { TYPE_LABELS, LEVEL_LABELS, LEVEL_COLORS, LEVEL_BG } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

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
  const { t } = useLanguage();
  const { showToast } = useApp();
  const [type, setType] = useState(initialData?.type || 'gp');
  const [tid, setTid] = useState(initialData?.tid || '');
  const [oid, setOid] = useState(initialData?.oid || currentUser.id);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [comments, setComments] = useState(initialData?.comments || '');
  const [di, setDi] = useState(0); // Domain Index
  const [confirmSwitch, setConfirmSwitch] = useState<string | null>(null);

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

  const allowedTeachers = React.useMemo(() => teachers.filter(t => canObserverViewTeacher(currentUser, t)), [teachers, currentUser]);

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
      showToast(t('eval.alertSelectStaff'), 'error');
      return;
    }
    if (!draft && (!oid || !isComplete)) {
      showToast(t('eval.alertComplete'), 'error');
      return;
    }

    const scoreList: Score[] = Object.entries(scores).map(([id, score]) => {
      const s: Score = { 
        id, 
        score: score as number
      };
      if (notes[id]) {
        s.notes = notes[id];
      }
      return s;
    });
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

  const changeType = (tKey: string) => {
    if (type === tKey) return;
    if (Object.keys(scores).length > 0) {
      setConfirmSwitch(tKey);
    } else {
      setType(tKey);
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
            <span className="material-icons" style={{ fontSize: '15px' }}>arrow_back</span> {t('action.back')}
          </button>
          <h1 className="ph-title">{t('eval.title')}</h1>
          <p className="ph-sub">{initialData?.id ? t('eval.resuming') : t('eval.new')} — {total} {t('eval.indicatorsTotal')}</p>
        </div>
        <div className="frow" style={{ gap: '16px', background: 'var(--white)', padding: '10px 16px', borderRadius: '16px', boxShadow: 'var(--sh)' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--slate)' }}>{t('eval.progress')}</div>
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
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>save</span> {t('eval.saveDraft')}
          </button>
        </div>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg)', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <div className="tbar">
            {Object.keys(TYPE_LABELS).map(tKey => (
              <button key={tKey} className={`tbtn ${type === tKey ? 'active' : ''}`} onClick={() => changeType(tKey)}>{t(`type.${tKey}`) || TYPE_LABELS[tKey]}</button>
            ))}
          </div>
        </div>

        {confirmSwitch && (
          <div className="overlay" onClick={(e) => e.target === e.currentTarget && setConfirmSwitch(null)}>
            <div className="mbox" style={{ maxWidth: '400px' }}>
              <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>
                {t('eval.confirmSwitch')}
              </h2>
              <p style={{ marginBottom: '24px', color: 'var(--slate)', fontSize: '15px', lineHeight: 1.5 }}>
                {t('eval.confirmSwitchDesc') || 'Changing the evaluation type will discard your current progress. Are you sure?'}
              </p>
              <div className="frow" style={{ gap: '12px', justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost" onClick={() => setConfirmSwitch(null)}>{t('action.cancel') || 'Cancel'}</button>
                <button className="btn btn-danger" onClick={() => {
                  setType(confirmSwitch);
                  setScores({});
                  setDi(0);
                  setConfirmSwitch(null);
                }}>{t('action.confirm') || 'Confirm'}</button>
              </div>
            </div>
          </div>
        )}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label className="flabel">{t('eval.selectStaff')}</label>
            <select className="finput" value={tid} onChange={e => setTid(e.target.value)}>
              <option value="">— {t('eval.selectStaff')} —</option>
              {allowedTeachers.map(tData => <option key={tData.id} value={tData.id}>{tData.fullName} · {tData.role}</option>)}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label className="flabel">{t('eval.observer')}</label>
            <select className="finput" value={oid} onChange={e => setOid(e.target.value)} disabled={currentUser.role !== 'admin'}>
              <option value="">— {t('eval.observer')} —</option>
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
                <div className="dom-meta">{t('eval.area')} {di + 1} {t('eval.of')} {rubric.length} &nbsp;·&nbsp; {t('eval.weight')}: {domain.weight}%</div>
              </div>
              <div>
                <div className="dp-lbl">{t('eval.areaProgress')}</div>
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
                        <span className="ind-ev">{t('eval.evidence')}: {ind.evidence}</span>
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
                            <span className="slbl" style={{ color: sel === v ? 'rgba(255,255,255,.9)' : LEVEL_COLORS[v] }}>{t(`lvl.${v}`) || LEVEL_LABELS[v]}</span>
                          </button>
                        ))}
                      </div>
                      {sel ? (
                        <div className="desc-box vis" style={{ background: LEVEL_BG[sel], borderLeftColor: LEVEL_COLORS[sel] }}>
                          <strong style={{ color: LEVEL_COLORS[sel], textTransform: 'uppercase', fontSize: '11px', letterSpacing: '.05em' }}>{t(`lvl.${sel}`) || LEVEL_LABELS[sel]} {t('eval.performance')}:</strong>
                          <div style={{ marginTop: '4px' }}>{ind.levels[sel]}</div>
                        </div>
                      ) : (
                        <div className="desc-box vis" style={{ background: 'var(--bg)', borderLeftColor: 'var(--border-hover)', color: 'var(--slate)', fontStyle: 'italic' }}>
                          {t('eval.selectScore')}
                        </div>
                      )}
                      
                      <div style={{ marginTop: '12px' }}>
                        <textarea 
                          className="finput" 
                          style={{ minHeight: '60px', fontSize: '13px', padding: '10px' }}
                          placeholder={t('eval.addNotes')}
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
                  <span className="material-icons" style={{ fontSize: '18px' }}>chevron_left</span> {t('eval.prevArea')}
                </button>
                <button className="btn btn-ghost" onClick={() => setDi(di + 1)} disabled={di === rubric.length - 1}>
                  {t('eval.nextArea')} <span className="material-icons" style={{ fontSize: '18px' }}>chevron_right</span>
                </button>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate)' }}>{done} {t('eval.of')} {total} {t('eval.indicatorsScored')}</span>
            </div>
          </>
        )}
      </div>

      <div className="card-xl" style={{ padding: '28px' }}>
        <div className="field">
          <label className="flabel">{t('eval.synthesis')}</label>
          <textarea 
            className="finput" 
            style={{ minHeight: '140px', resize: 'vertical', fontSize: '15px', lineHeight: 1.6 }} 
            placeholder={t('eval.synthesisPlaceholder')}
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
            <span className="material-icons-outlined">save</span> {t('eval.saveDraft')}
          </button>
          <button 
            className={`btn ${isComplete ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ flex: 2, justifyContent: 'center', padding: '18px', fontSize: '14px' }}
            disabled={!isComplete}
            onClick={() => handleSave(false)}
          >
            <span className="material-icons">{isComplete ? 'check_circle' : 'lock'}</span> 
            {isComplete ? t('eval.finalize') : `${total - done} ${t('eval.remaining')}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;

import React, { useState } from 'react';
import { AppState } from '../types';
import { TYPE_LABELS, TYPE_COLORS, RUBRIC_DEF, SUBJECTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import UserPermissions from './UserPermissions';
import DataExport from './DataExport';

interface SettingsProps {
  state: AppState;
  onUpdateWeights: (type: string, weights: number[]) => void;
  onResetWeights: (type: string) => void;
  onResetSystem: () => void;
  onUpdateHRWeight: (weight: number) => void;
  onUpdateHRRubric: (rubric: AppState['hrRubric']) => void;
  onUpdateCustomSubjects: (subjects: string[]) => void;
}

const Settings: React.FC<SettingsProps> = ({ state, onUpdateWeights, onResetWeights, onResetSystem, onUpdateHRWeight, onUpdateHRRubric, onUpdateCustomSubjects }) => {
  const { t } = useLanguage();
  const { showToast } = useApp();
  const [editingWeights, setEditingWeights] = useState<Record<string, number[]>>({});
  const [hrWeight, setHrWeight] = useState(state.hrWeight || 5);
  const [hrRubric, setHrRubric] = useState(state.hrRubric || { absences: [2, 5, 9], earlyLate: [2, 4, 7] });
  const [newSubject, setNewSubject] = useState('');
  const [confirmAction, setConfirmAction] = useState<{ type: string, payload?: any } | null>(null);

  React.useEffect(() => {
    if (state.hrRubric) {
      setHrRubric(state.hrRubric);
    }
  }, [state.hrRubric]);

  const handleAddSubject = () => {
    const trimmed = newSubject.trim();
    if (!trimmed) return;
    const currentSubjects = state.customSubjects || [];
    if (currentSubjects.some(s => s.toLowerCase() === trimmed.toLowerCase()) || SUBJECTS.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      showToast('Subject already exists', 'error');
      return;
    }
    onUpdateCustomSubjects([...currentSubjects, trimmed]);
    setNewSubject('');
  };

  const handleRemoveSubject = (subject: string) => {
    setConfirmAction({ type: 'removeSubject', payload: subject });
  };

  const getWeights = (type: string) => {
    if (editingWeights[type]) return editingWeights[type];
    if (state.customWeights[type]) return state.customWeights[type];
    return (RUBRIC_DEF[type] || []).map(d => d.weight);
  };

  const handleWeightChange = (type: string, idx: number, val: number) => {
    const current = [...getWeights(type)];
    current[idx] = val;
    setEditingWeights(prev => ({ ...prev, [type]: current }));
  };

  const handleSave = (type: string) => {
    const weights = getWeights(type);
    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      showToast(t('set.weightsSumError').replace('{type}', TYPE_LABELS[type]).replace('{sum}', sum.toString()), 'error');
      return;
    }
    onUpdateWeights(type, weights);
    setEditingWeights(prev => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  };

  const handleReset = (type: string) => {
    setConfirmAction({ type: 'resetWeights', payload: type });
  };

  const sysCards = [
    { l: t('set.faculty'), i: 'people', v: state.teachers.length, c: '#2563eb' },
    { l: t('set.completedEvals'), i: 'assignment_turned_in', v: state.evaluations.filter(e => !e.draft).length, c: '#10b981' },
    { l: t('set.drafts'), i: 'edit_note', v: state.evaluations.filter(e => e.draft).length, c: '#f59e0b' },
    { l: t('set.users'), i: 'manage_accounts', v: state.observers.length, c: '#7c3aed' },
    { l: t('set.auditEvents'), i: 'history', v: state.logs.length, c: 'var(--slate)' }
  ];

  return (
    <div className="page">
      <div className="ph">
        <h1 className="ph-title" style={{ fontSize: '42px', fontWeight: 900, marginBottom: '8px' }}>{t('set.title')}</h1>
        <p className="ph-sub" style={{ fontSize: '16px' }}>{t('set.sub')}</p>
      </div>

      <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>{t('set.hrWeight')}</h2>
        <p style={{ fontSize: '15px', color: 'var(--slate)', marginBottom: '24px' }}>{t('set.hrWeightSub')}</p>
        
        <div className="frow" style={{ gap: '32px', alignItems: 'center' }}>
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={hrWeight} 
              onChange={(e) => setHrWeight(parseInt(e.target.value))}
              style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', appearance: 'none', cursor: 'pointer' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '42px', fontWeight: 900, color: '#2563eb', fontFamily: '"Barlow Condensed", sans-serif', lineHeight: 1 }}>{hrWeight}</span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--slate)' }}>%</span>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800, letterSpacing: '0.05em' }}
            onClick={() => onUpdateHRWeight(hrWeight)}
          >
            {t('set.save')}
          </button>
        </div>
        
        <div style={{ marginTop: '24px', padding: '12px 20px', background: 'var(--bg)', borderRadius: '12px', display: 'inline-block' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--slate)', margin: 0 }}>
            {t('set.finalScoreCalc').replace('{obsWeight}', (100 - hrWeight).toString()).replace('{hrWeight}', hrWeight.toString())}
          </p>
        </div>
      </div>

      <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>{t('set.hrRubric')}</h2>
            <p style={{ fontSize: '15px', color: 'var(--slate)' }}>{t('set.hrRubricDesc')}</p>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800 }}
            onClick={() => onUpdateHRRubric(hrRubric)}
          >
            {t('set.saveRubric')}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {(['absences', 'earlyLate'] as const).map(key => {
            const rubricArray = hrRubric[key] || [2, 4, 7];
            return (
            <div key={key} style={{ background: 'var(--bg)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
                  {key === 'absences' ? 'event_busy' : 'schedule'}
                </span>
                {t(`set.${key}`)}
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[4, 3, 2].map((score, idx) => (
                  <div key={score} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: score === 4 ? '#10b981' : score === 3 ? '#2563eb' : '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>
                        {score}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--slate-dark)' }}>{t('set.maxCount')}</span>
                    </div>
                    <input 
                      type="number" 
                      className="finput" 
                      style={{ width: '60px', textAlign: 'center', padding: '6px', fontWeight: 700 }}
                      value={rubricArray[idx]} 
                      onChange={e => {
                        const next = { ...hrRubric };
                        next[key] = [...rubricArray];
                        next[key][idx] = parseInt(e.target.value) || 0;
                        setHrRubric(next);
                      }}
                    />
                  </div>
                ))}
                <div style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>1</div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#991b1b' }}>{t('set.anythingAbove')}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#991b1b', paddingRight: '12px' }}>{rubricArray[2]}+</span>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>

      <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>Custom Subjects</h2>
        <p style={{ fontSize: '15px', color: 'var(--slate)', marginBottom: '24px' }}>Add custom subjects to the faculty creation dropdown.</p>
        
        <div className="frow" style={{ gap: '16px', marginBottom: '24px' }}>
          <input 
            type="text" 
            className="finput" 
            placeholder="Enter subject name..." 
            value={newSubject}
            onChange={e => setNewSubject(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddSubject()}
            style={{ flex: 1, maxWidth: '400px' }}
          />
          <button className="btn btn-primary" onClick={handleAddSubject}>
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>add</span> Add Subject
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {(state.customSubjects || []).map(subject => (
            <div key={subject} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>{subject}</span>
              <button 
                onClick={() => handleRemoveSubject(subject)}
                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', display: 'flex', padding: '4px', borderRadius: '50%' }}
                title="Remove subject"
              >
                <span className="material-icons-outlined" style={{ fontSize: '16px' }}>close</span>
              </button>
            </div>
          ))}
          {!(state.customSubjects?.length) && (
            <div style={{ fontSize: '14px', color: 'var(--slate)', fontStyle: 'italic' }}>No custom subjects added yet.</div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '32px', fontWeight: 900, color: 'var(--navy)' }}>{t('set.domainWeightEditor')}</h2>
          <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em' }}>{t('set.mustSum100')}</span>
        </div>
        
        <div style={{ display: 'grid', gap: '24px' }}>
          {Object.entries(TYPE_LABELS).map(([type, label]) => {
            const rubricDef = RUBRIC_DEF[type] || [];
            const weights = getWeights(type);
            const wtSum = weights.reduce((a, b) => a + b, 0);
            const isOk = wtSum === 100;

            return (
              <div className="card-xl" style={{ overflow: 'hidden' }} key={type}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)' }}>
                  <div className="frow" style={{ gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--white)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '24px' }}>
                      {type === 'gp' ? '🏫' : type === 'lb' ? '🧠' : type === 'ey' ? '🧸' : '🎨'}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)' }}>{label}</h3>
                      <div style={{ fontSize: '12px', color: 'var(--slate)', fontWeight: 600 }}>{rubricDef.length} {t('set.domains')} · {rubricDef.reduce((a, d) => a + d.subdomains.reduce((b, s) => b + s.indicators.length, 0), 0)} {t('set.indicators')}</div>
                    </div>
                  </div>
                  <div className="frow" style={{ gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--slate)' }}>{t('set.sum')}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ color: isOk ? '#15803d' : '#dc2626', fontSize: '24px', fontWeight: 900, fontFamily: '"Barlow Condensed", sans-serif' }}>{wtSum}%</div>
                        {isOk && (
                          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-icons" style={{ fontSize: '14px', fontWeight: 900 }}>check</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
                    <button className="btn btn-ghost btn-sm" style={{ fontWeight: 700 }} onClick={() => handleReset(type)}>{t('set.resetBtn')}</button>
                    <button className="btn btn-primary btn-sm" style={{ padding: '8px 20px', fontWeight: 800 }} onClick={() => handleSave(type)} disabled={!isOk}>
                      {t('set.save')}
                    </button>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {rubricDef.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--navy)', flex: 1, paddingRight: '16px' }}>{d.domain.replace(/D\d+: /, '')}</div>
                        <div className="frow" style={{ gap: '8px', flexShrink: 0 }}>
                          <input 
                            type="number" 
                            className="finput" 
                            style={{ width: '70px', textAlign: 'center', padding: '8px', fontWeight: 700 }}
                            min="0" 
                            max="100" 
                            value={weights[i]} 
                            onChange={e => handleWeightChange(type, i, parseInt(e.target.value) || 0)}
                          />
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--slate)' }}>%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <UserPermissions observers={state.observers} />
      <DataExport state={state} />

      <div className="card-xl" style={{ padding: '24px', border: '1px solid #fecaca', background: '#fff1f2' }}>
        <div className="frow" style={{ gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', flexShrink: 0 }}>
            <span className="material-icons-outlined" style={{ fontSize: '24px' }}>warning</span>
          </div>
          <div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: '#dc2626', marginBottom: '8px' }}>{t('set.dangerZone')}</h2>
            <p style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '16px', maxWidth: '600px', lineHeight: 1.6 }}>{t('set.dangerDesc')}</p>
            <button className="btn btn-danger" onClick={() => setConfirmAction({ type: 'resetSystem' })}>
              <span className="material-icons-outlined" style={{ fontSize: '18px' }}>restart_alt</span> {t('set.resetSystemBtn')}
            </button>
          </div>
        </div>
      </div>

      {confirmAction && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setConfirmAction(null)}>
          <div className="mbox" style={{ maxWidth: '400px' }}>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>
              {confirmAction.type === 'resetSystem' ? t('set.resetSystemBtn') : t('action.confirm')}
            </h2>
            <p style={{ marginBottom: '24px', color: 'var(--slate)', fontSize: '15px', lineHeight: 1.5 }}>
              {confirmAction.type === 'removeSubject' && `Remove subject "${confirmAction.payload}"?`}
              {confirmAction.type === 'resetWeights' && t('set.resetConfirm').replace('{type}', TYPE_LABELS[confirmAction.payload])}
              {confirmAction.type === 'resetSystem' && t('set.resetSystemConfirm')}
            </p>
            <div className="frow" style={{ gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setConfirmAction(null)}>{t('action.cancel') || 'Cancel'}</button>
              <button className="btn btn-danger" onClick={() => {
                if (confirmAction.type === 'removeSubject') {
                  onUpdateCustomSubjects((state.customSubjects || []).filter(s => s !== confirmAction.payload));
                } else if (confirmAction.type === 'resetWeights') {
                  onResetWeights(confirmAction.payload);
                  setEditingWeights(prev => {
                    const next = { ...prev };
                    delete next[confirmAction.payload];
                    return next;
                  });
                } else if (confirmAction.type === 'resetSystem') {
                  onResetSystem();
                }
                setConfirmAction(null);
              }}>{t('action.confirm') || 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

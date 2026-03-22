import React, { useState } from 'react';
import { AppState } from '../types';
import { TYPE_LABELS, TYPE_COLORS, RUBRIC_DEF } from '../constants';

interface SettingsProps {
  state: AppState;
  onUpdateWeights: (type: string, weights: number[]) => void;
  onResetWeights: (type: string) => void;
  onResetSystem: () => void;
  onUpdateHRWeight: (weight: number) => void;
  onUpdateHRRubric: (rubric: AppState['hrRubric']) => void;
}

const Settings: React.FC<SettingsProps> = ({ state, onUpdateWeights, onResetWeights, onResetSystem, onUpdateHRWeight, onUpdateHRRubric }) => {
  const [editingWeights, setEditingWeights] = useState<Record<string, number[]>>({});
  const [hrWeight, setHrWeight] = useState(state.hrWeight || 5);
  const [hrRubric, setHrRubric] = useState(state.hrRubric);

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
      alert(`Weights for ${TYPE_LABELS[type]} must sum to exactly 100% (currently ${sum}%).`);
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
    if (confirm(`Reset ${TYPE_LABELS[type]} weights to default values?`)) {
      onResetWeights(type);
      setEditingWeights(prev => {
        const next = { ...prev };
        delete next[type];
        return next;
      });
    }
  };

  const sysCards = [
    { l: 'Faculty', i: 'people', v: state.teachers.length, c: '#2563eb' },
    { l: 'Completed Evals', i: 'assignment_turned_in', v: state.evaluations.filter(e => !e.draft).length, c: '#10b981' },
    { l: 'Drafts', i: 'edit_note', v: state.evaluations.filter(e => e.draft).length, c: '#f59e0b' },
    { l: 'Users', i: 'manage_accounts', v: state.observers.length, c: '#7c3aed' },
    { l: 'Audit Events', i: 'history', v: state.logs.length, c: 'var(--slate)' }
  ];

  return (
    <div className="page">
      <div className="ph">
        <h1 className="ph-title" style={{ fontSize: '42px', fontWeight: 900, marginBottom: '8px' }}>System Settings</h1>
        <p className="ph-sub" style={{ fontSize: '16px' }}>Manage domain weights, HR integration, and system data.</p>
      </div>

      <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>HR Score Weight</h2>
        <p style={{ fontSize: '15px', color: 'var(--slate)', marginBottom: '24px' }}>Set how much the HR Attendance score contributes to each teacher's final score.</p>
        
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
            SAVE
          </button>
        </div>
        
        <div style={{ marginTop: '24px', padding: '12px 20px', background: 'var(--bg)', borderRadius: '12px', display: 'inline-block' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--slate)', margin: 0 }}>
            Final Score = <span style={{ color: 'var(--navy)' }}>(Observation × {100 - hrWeight}%)</span> + <span style={{ color: '#2563eb' }}>(HR × {hrWeight}%)</span>
          </p>
        </div>
      </div>

      <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>HR Scoring Rubric</h2>
            <p style={{ fontSize: '15px', color: 'var(--slate)' }}>Define the thresholds for each score level (4, 3, 2, 1). Values represent the <strong>maximum</strong> count for that score.</p>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800 }}
            onClick={() => onUpdateHRRubric(hrRubric)}
          >
            SAVE RUBRIC
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {(['absences', 'earlyLeaves', 'lateArrivals'] as const).map(key => (
            <div key={key} style={{ background: 'var(--bg)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
                  {key === 'absences' ? 'event_busy' : key === 'earlyLeaves' ? 'exit_to_app' : 'schedule'}
                </span>
                {key.replace(/([A-Z])/g, ' $1')}
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[4, 3, 2].map((score, idx) => (
                  <div key={score} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: score === 4 ? '#10b981' : score === 3 ? '#2563eb' : '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>
                        {score}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--slate-dark)' }}>Max Count</span>
                    </div>
                    <input 
                      type="number" 
                      className="finput" 
                      style={{ width: '60px', textAlign: 'center', padding: '6px', fontWeight: 700 }}
                      value={hrRubric[key][idx]} 
                      onChange={e => {
                        const next = { ...hrRubric };
                        next[key] = [...next[key]];
                        next[key][idx] = parseInt(e.target.value) || 0;
                        setHrRubric(next);
                      }}
                    />
                  </div>
                ))}
                <div style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed #fecaca', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>1</div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#991b1b' }}>Anything above</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#991b1b', paddingRight: '12px' }}>{hrRubric[key][2]}+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '32px', fontWeight: 900, color: 'var(--navy)' }}>Domain Weight Editor</h2>
          <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em' }}>MUST SUM TO 100%</span>
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
                      <div style={{ fontSize: '12px', color: 'var(--slate)', fontWeight: 600 }}>{rubricDef.length} domains · {rubricDef.reduce((a, d) => a + d.subdomains.reduce((b, s) => b + s.indicators.length, 0), 0)} indicators</div>
                    </div>
                  </div>
                  <div className="frow" style={{ gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--slate)' }}>SUM</div>
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
                    <button className="btn btn-ghost btn-sm" style={{ fontWeight: 700 }} onClick={() => handleReset(type)}>RESET</button>
                    <button className="btn btn-primary btn-sm" style={{ padding: '8px 20px', fontWeight: 800 }} onClick={() => handleSave(type)} disabled={!isOk}>
                      SAVE
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

      <div className="card-xl" style={{ padding: '24px', border: '1px solid #fecaca', background: '#fff1f2' }}>
        <div className="frow" style={{ gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', flexShrink: 0 }}>
            <span className="material-icons-outlined" style={{ fontSize: '24px' }}>warning</span>
          </div>
          <div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: '#dc2626', marginBottom: '8px' }}>Danger Zone</h2>
            <p style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '16px', maxWidth: '600px', lineHeight: 1.6 }}>Reset all system data to factory demo defaults. All evaluations, drafts, audit logs, and custom weights will be permanently deleted. This action cannot be undone.</p>
            <button className="btn btn-danger" onClick={() => { if(confirm('This will permanently delete ALL evaluations, drafts, audit logs, and custom weights. Faculty and users will be restored to demo defaults. This cannot be undone.')) onResetSystem(); }}>
              <span className="material-icons-outlined" style={{ fontSize: '18px' }}>restart_alt</span> Reset System to Demo Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

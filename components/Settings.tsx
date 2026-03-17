import React, { useState } from 'react';
import { AppState } from '../types';
import { TYPE_LABELS, TYPE_COLORS, RUBRIC_DEF } from '../constants';

interface SettingsProps {
  state: AppState;
  onUpdateWeights: (type: string, weights: number[]) => void;
  onResetWeights: (type: string) => void;
  onResetSystem: () => void;
}

const Settings: React.FC<SettingsProps> = ({ state, onUpdateWeights, onResetWeights, onResetSystem }) => {
  const [editingWeights, setEditingWeights] = useState<Record<string, number[]>>({});

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
        <h1 className="ph-title">System Settings</h1>
        <p className="ph-sub">Adjust domain weights, review frameworks, and manage data.</p>
      </div>

      <div className="card-xl" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>System Data Summary</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--slate)', marginBottom: '20px' }}>Live counts across all data stores.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {sysCards.map((c, i) => (
            <div key={i} style={{ background: `${c.c}08`, border: `1px solid ${c.c}20`, borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${c.c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <span className="material-icons-outlined" style={{ color: c.c, fontSize: '24px' }}>{c.i}</span>
              </div>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '36px', fontWeight: 900, color: c.c, lineHeight: 1, marginBottom: '6px' }}>{c.v}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{c.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)' }}>Domain Weight Editor</h2>
            <p style={{ fontSize: '14px', color: 'var(--slate)', marginTop: '4px' }}>Adjust the percentage weight assigned to each domain. Changes affect score calculation for new evaluations.</p>
          </div>
          <span style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>Weights must sum to 100%</span>
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
                      <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--slate)' }}>Total Weight</div>
                      <div style={{ color: isOk ? '#15803d' : '#dc2626', fontSize: '20px', fontWeight: 800, fontFamily: '"Barlow Condensed", sans-serif' }}>{wtSum}%</div>
                    </div>
                    <div style={{ width: '1px', height: '32px', background: 'var(--border)' }}></div>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleReset(type)}>Reset</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleSave(type)} disabled={!isOk}>
                      <span className="material-icons" style={{ fontSize: '16px' }}>save</span> Save Changes
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

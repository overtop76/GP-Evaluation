import { Evaluation, Domain } from '../types';
import { RUBRIC_DEF, LEVEL_COLORS } from '../constants';

export const uid = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

export const ini = (n: string): string =>
  n ? n.split(' ').filter(Boolean).slice(0, 2).map(x => x[0]).join('').toUpperCase() : '?';

export const fmtD = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso || '—';
  }
};

export const fmtDT = (iso: string): string => {
  try {
    return new Date(iso).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso || '—';
  }
};

export const getRubric = (type: string, customWeights?: Record<string, number[]>): Domain[] => {
  const def = RUBRIC_DEF[type] || [];
  const cw = customWeights?.[type];
  if (!cw) return def;
  return def.map((d, i) => ({ ...d, weight: cw[i] !== undefined ? cw[i] : d.weight }));
};

export const getRating = (s: number) => {
  if (s >= 3.5) return { label: 'Exemplary', css: 'b-ex', color: '#15803d', hex: 'rgba(16, 185, 129, 0.1)' };
  if (s >= 2.75) return { label: 'Proficient', css: 'b-pr', color: '#1d4ed8', hex: 'rgba(59, 130, 246, 0.1)' };
  if (s >= 2.0) return { label: 'Developing', css: 'b-dev', color: '#b45309', hex: 'rgba(245, 158, 11, 0.1)' };
  return { label: 'Unsatisfactory', css: 'b-uns', color: '#dc2626', hex: 'rgba(239, 68, 68, 0.1)' };
};

export const countInds = (type: string): number => {
  return (RUBRIC_DEF[type] || []).reduce((a, d) => a + d.subdomains.reduce((b, s) => b + s.indicators.length, 0), 0);
};

export const computeScore = (ev: Evaluation, customWeights?: Record<string, number[]>): number => {
  const r = getRubric(ev.type, customWeights);
  if (!r || !ev.scores || !ev.scores.length) return 0;
  
  const sm: Record<string, number> = {};
  ev.scores.forEach(s => sm[s.id] = s.score);
  
  let ws = 0, wt = 0;
  r.forEach(d => {
    let ds = 0, dc = 0;
    d.subdomains.forEach(s => s.indicators.forEach(i => {
      if (sm[i.id] !== undefined) {
        ds += sm[i.id];
        dc++;
      }
    }));
    if (dc > 0) {
      ws += (ds / dc) * d.weight;
      wt += d.weight;
    }
  });
  return wt > 0 ? ws / wt : 0;
};

export const getDomainScores = (ev: Evaluation, customWeights?: Record<string, number[]>) => {
  const r = getRubric(ev.type, customWeights);
  if (!r) return [];
  
  const sm: Record<string, number> = {};
  ev.scores.forEach(s => sm[s.id] = s.score);
  
  return r.map(d => {
    let ds = 0, dc = 0;
    d.subdomains.forEach(s => s.indicators.forEach(i => {
      if (sm[i.id] !== undefined) {
        ds += sm[i.id];
        dc++;
      }
    }));
    return {
      name: d.domain,
      weight: d.weight,
      avg: dc ? ds / dc : 0,
      scored: dc,
      total: d.subdomains.reduce((a, s) => a + s.indicators.length, 0)
    };
  });
};

export const findInd = (type: string, id: string) => {
  for (const d of RUBRIC_DEF[type] || []) {
    for (const s of d.subdomains) {
      for (const i of s.indicators) {
        if (i.id === id) return i;
      }
    }
  }
  return null;
};

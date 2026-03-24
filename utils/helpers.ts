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
  if (s >= 3.5) return { label: 'Exemplary', level: 4, css: 'b-ex', color: '#15803d', hex: 'rgba(16, 185, 129, 0.1)' };
  if (s >= 2.75) return { label: 'Proficient', level: 3, css: 'b-pr', color: '#1d4ed8', hex: 'rgba(59, 130, 246, 0.1)' };
  if (s >= 2.0) return { label: 'Developing', level: 2, css: 'b-dev', color: '#b45309', hex: 'rgba(245, 158, 11, 0.1)' };
  return { label: 'Unsatisfactory', level: 1, css: 'b-uns', color: '#dc2626', hex: 'rgba(239, 68, 68, 0.1)' };
};

export const countInds = (type: string): number => {
  return (RUBRIC_DEF[type] || []).reduce((a, d) => a + d.subdomains.reduce((b, s) => b + s.indicators.length, 0), 0);
};

export const getHRScore = (type: 'absences' | 'earlyLeaves' | 'lateArrivals', value: number, thresholds: number[]): number => {
  if (value <= thresholds[0]) return 4;
  if (value <= thresholds[1]) return 3;
  if (value <= thresholds[2]) return 2;
  return 1;
};

export const computeScore = (ev: Evaluation, customWeights?: Record<string, number[]>, hrData?: any, hrWeight?: number, hrRubric?: any): number => {
  const r = getRubric(ev.type, customWeights);
  if (!r || !ev.scores || !ev.scores.length) return 0;
  
  const sm: Record<string, number> = {};
  ev.scores.forEach(s => sm[s.id] = s.score);
  
  let obsWeightedSum = 0;
  let obsWeightTotal = 0;
  
  r.forEach(d => {
    let ds = 0, dc = 0;
    d.subdomains.forEach(s => s.indicators.forEach(i => {
      if (sm[i.id] !== undefined) {
        ds += sm[i.id];
        dc++;
      }
    }));
    if (dc > 0) {
      obsWeightedSum += (ds / dc) * d.weight;
      obsWeightTotal += d.weight;
    }
  });
  
  const obsScore = obsWeightTotal > 0 ? obsWeightedSum / obsWeightTotal : 0;
  
  if (hrData && hrWeight !== undefined && hrWeight > 0 && hrRubric) {
    const s1 = getHRScore('absences', hrData.absences ?? 0, hrRubric.absences);
    const s2 = getHRScore('earlyLeaves', hrData.earlyLeaves ?? 0, hrRubric.earlyLeaves);
    const s3 = getHRScore('lateArrivals', hrData.lateArrivals ?? 0, hrRubric.lateArrivals);
    const hrScore = (s1 + s2 + s3) / 3;
    
    // Final Score = (ObsScore * (100 - HRWeight) / 100) + (HRScore * HRWeight / 100)
    return (obsScore * (100 - hrWeight) / 100) + (hrScore * hrWeight / 100);
  }
  
  return obsScore;
};

export const getDomainScores = (ev: Evaluation, customWeights?: Record<string, number[]>, hrData?: any, hrWeight?: number, hrRubric?: any) => {
  const r = getRubric(ev.type, customWeights);
  if (!r) return [];
  
  const sm: Record<string, number> = {};
  ev.scores.forEach(s => sm[s.id] = s.score);
  
  const effectiveHRWeight = hrWeight || 0;
  const obsScale = (100 - effectiveHRWeight) / 100;
  
  const scores = r.map(d => {
    let ds = 0, dc = 0;
    d.subdomains.forEach(s => s.indicators.forEach(i => {
      if (sm[i.id] !== undefined) {
        ds += sm[i.id];
        dc++;
      }
    }));
    return {
      name: d.domain,
      weight: d.weight * obsScale, // Scale the weight to fit the remaining percentage
      avg: dc ? ds / dc : 0,
      scored: dc,
      total: d.subdomains.reduce((a, s) => a + s.indicators.length, 0)
    };
  });
  
  if (hrData && effectiveHRWeight > 0 && hrRubric) {
    const s1 = getHRScore('absences', hrData.absences ?? 0, hrRubric.absences);
    const s2 = getHRScore('earlyLeaves', hrData.earlyLeaves ?? 0, hrRubric.earlyLeaves);
    const s3 = getHRScore('lateArrivals', hrData.lateArrivals ?? 0, hrRubric.lateArrivals);
    const hrScore = (s1 + s2 + s3) / 3;
    
    scores.push({
      name: 'D-HR: Attendance & Punctuality',
      weight: effectiveHRWeight,
      avg: hrScore,
      scored: 1,
      total: 1
    });
  }
  
  return scores;
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

export const hashPassword = async (password: string, salt: string): Promise<string> => {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const exported = await crypto.subtle.exportKey('raw', key);
  return Array.from(new Uint8Array(exported)).map(b => b.toString(16).padStart(2, '0')).join('');
};

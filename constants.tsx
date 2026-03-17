import { GP_RUBRIC } from './rubrics/gp';
import { HOMEROOM_RUBRIC } from './rubrics/homeroom';
import { COTEACHER_RUBRIC } from './rubrics/coteacher';
import { HOD_RUBRIC } from './rubrics/hod';
import { Domain } from './types';

export const RUBRIC_DEF: Record<string, Domain[]> = {
  gp: GP_RUBRIC,
  homeroom: HOMEROOM_RUBRIC,
  coteacher: COTEACHER_RUBRIC,
  hod: HOD_RUBRIC,
};

export const TYPE_LABELS: Record<string, string> = {
  gp: 'GP Standard',
  homeroom: 'Homeroom K-3',
  coteacher: 'Co-Teacher K-3',
  hod: 'HOD Leadership',
};

export const TYPE_COLORS: Record<string, string> = {
  gp: '#2563eb',
  homeroom: '#7c3aed',
  coteacher: '#0891b2',
  hod: '#059669',
};

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Unsatisfactory',
  2: 'Developing',
  3: 'Proficient',
  4: 'Exemplary',
};

export const LEVEL_COLORS: Record<number, string> = {
  1: '#ef4444',
  2: '#f59e0b',
  3: '#2563eb',
  4: '#10b981',
};

export const LEVEL_BG: Record<number, string> = {
  1: 'rgba(239, 68, 68, 0.1)',
  2: '#fffbeb',
  3: 'rgba(37, 99, 235, 0.1)',
  4: 'rgba(16, 185, 129, 0.1)',
};

export const SUBJECTS = [
  'Homeroom', 'English', 'Math', 'Science', 'Social Studies',
  'French', 'German', 'Spanish', 'ICT', 'Art', 'Music', 'PE',
  'Arabic/Religion', 'Administration', 'Other'
];

export const ROLES = [
  'Teacher', 'Homeroom Teacher', 'HOD', 'Co-Teacher', 'Admin', 'Other'
];

export const DIVS = [
  'Early Years', 'Elementary', 'Middle', 'High'
];

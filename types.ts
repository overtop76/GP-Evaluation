export type UserRole = 'admin' | 'observer' | 'hr';

export interface Teacher {
  id: string;
  employeeId?: string;
  fullName: string;
  subject: string;
  role: string;
  division: string;
}

export interface ObserverPermissions {
  viewScope: 'all' | 'own' | 'stage' | 'subject';
  allowedStages?: string[];
  allowedSubjects?: string[];
  canPrintReports: boolean;
  canViewReports: boolean;
}

export interface Observer {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  hash?: string;
  salt?: string;
  permissions?: ObserverPermissions;
}

export interface Score {
  id: string;
  score: number;
  notes?: string;
}

export interface Evaluation {
  id: string;
  type: string;
  tid: string; // Teacher ID
  oid: string; // Observer ID
  date: string;
  scores: Score[];
  comments: string;
  draft: boolean;
}

export interface Log {
  id: string;
  ts: string;
  uid: string;
  uname: string;
  action: string;
  details: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'SYSTEM' | 'LOGIN' | 'LOGOUT';
}

export interface HRData {
  teacherId: string;
  absences: number;
  earlyLeaves: number;
  lateArrivals: number;
  notes?: string;
  lastUpdated: string;
}

export interface AppState {
  currentUser: Observer | null;
  teachers: Teacher[];
  observers: Observer[];
  evaluations: Evaluation[];
  logs: Log[];
  customWeights: Record<string, number[]>;
  hrData: HRData[];
  hrWeight: number;
}

// Rubric Types
export interface Indicator {
  id: string;
  text: string;
  evidence: string;
  levels: Record<number, string>;
}

export interface Subdomain {
  name: string;
  indicators: Indicator[];
}

export interface Domain {
  domain: string;
  weight: number;
  subdomains: Subdomain[];
}

export type RubricType = 'gp' | 'homeroom' | 'coteacher' | 'hod';

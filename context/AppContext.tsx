import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Teacher, Observer, Evaluation, Log, Score, HRData } from '../types';
import { uid } from '../utils/helpers';
import { db, auth } from '../firebase';
import { doc, setDoc, onSnapshot, collection, deleteDoc, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const INIT_STATE: AppState = {
  currentUser: null,
  teachers: [
    { id: 't1', employeeId: 'GP-1001', fullName: 'Edna Krabappel', subject: 'Homeroom', role: 'Homeroom Teacher', division: 'Elementary' },
    { id: 't2', employeeId: 'GP-1002', fullName: 'Elizabeth Hoover', subject: 'Mathematics', role: 'Co-Teacher', division: 'Elementary, Middle' },
    { id: 't3', employeeId: 'GP-1003', fullName: 'Dewey Largo', subject: 'Music', role: 'HOD', division: 'Middle, High' },
    { id: 't4', employeeId: 'GP-1004', fullName: 'Robert Terwilliger', subject: 'Social Studies', role: 'Teacher', division: 'High' },
  ],
  observers: [
    { id: 'o1', employeeId: 'ADM-001', name: 'System Administrator', email: 'admin@globalparadigmschools.com', username: 'admin', role: 'admin', hash: '', salt: '' },
    { id: 'o2', employeeId: 'OBS-001', name: 'Principal Skinner', email: 'observer@globalparadigmschools.com', username: 'observer', role: 'observer', hash: '', salt: '' },
    { id: 'o3', employeeId: 'HR-001', name: 'HR Department', email: 'hr@globalparadigmschools.com', username: 'hr@globalparadigmschools.com', role: 'hr', hash: '', salt: '' },
  ],
  evaluations: [],
  logs: [],
  customWeights: {},
  hrData: [],
  hrWeight: 5,
  hrRubric: {
    absences: [2, 5, 9],
    earlyLeaves: [2, 4, 7],
    lateArrivals: [2, 4, 7],
  },
};

interface AppContextType {
  state: AppState;
  dbStatus: 'connecting' | 'connected' | 'error';
  login: (user: Observer) => void;
  logout: () => void;
  addTeacher: (t: Teacher) => void;
  deleteTeacher: (id: string) => void;
  saveEvaluation: (ev: Evaluation) => void;
  deleteEvaluation: (id: string) => void;
  addUser: (user: Observer) => void;
  updateUser: (user: Observer) => void;
  deleteUser: (id: string) => void;
  updateWeights: (type: string, weights: number[]) => void;
  resetWeights: (type: string) => void;
  updateHRData: (data: HRData) => void;
  updateHRWeight: (weight: number) => void;
  updateHRRubric: (rubric: AppState['hrRubric']) => void;
  resetSystem: () => void;
  toasts: { id: string; msg: string; type: string }[];
  showToast: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INIT_STATE);
  const [toasts, setToasts] = useState<{ id: string; msg: string; type: string }[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthReady(true);
      } else {
        setDbStatus('error');
      }
    });
    return unsubscribeAuth;
  }, []);

  // Firebase Sync
  useEffect(() => {
    if (!isAuthReady) return;

    const unsubs: (() => void)[] = [];

    const handleError = (error: any) => {
      console.error("Firestore Sync Error:", error);
      setDbStatus('error');
      if (error.code === 'permission-denied') {
        showToast("Database access denied. Please enable Anonymous Auth in Firebase Console.", "error");
      }
    };

    unsubs.push(onSnapshot(collection(db, 'teachers'), (snap) => {
      const teachers = snap.docs.map(d => d.data() as Teacher);
      setState(prev => ({ ...prev, teachers }));
    }, handleError));

    unsubs.push(onSnapshot(collection(db, 'observers'), (snap) => {
      const observers = snap.docs.map(d => d.data() as Observer);
      if (observers.length === 0) {
        // Seed database if empty
        const batch = writeBatch(db);
        INIT_STATE.teachers.forEach(t => batch.set(doc(db, 'teachers', t.id), t));
        INIT_STATE.observers.forEach(o => batch.set(doc(db, 'observers', o.id), o));
        batch.set(doc(db, 'settings', 'main'), {
          customWeights: INIT_STATE.customWeights,
          hrWeight: INIT_STATE.hrWeight,
          hrRubric: INIT_STATE.hrRubric
        });
        batch.commit().catch(console.error);
      } else {
        setState(prev => ({ ...prev, observers }));
      }
    }, handleError));

    unsubs.push(onSnapshot(collection(db, 'evaluations'), (snap) => {
      const evaluations = snap.docs.map(d => d.data() as Evaluation);
      setState(prev => ({ ...prev, evaluations }));
    }, handleError));

    unsubs.push(onSnapshot(collection(db, 'logs'), (snap) => {
      const logs = snap.docs.map(d => d.data() as Log);
      setState(prev => ({ ...prev, logs }));
    }, handleError));

    unsubs.push(onSnapshot(collection(db, 'hrData'), (snap) => {
      const hrData = snap.docs.map(d => d.data() as HRData);
      setState(prev => ({ ...prev, hrData }));
    }, handleError));

    unsubs.push(onSnapshot(doc(db, 'settings', 'main'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setState(prev => ({
          ...prev,
          customWeights: data.customWeights || {},
          hrWeight: data.hrWeight ?? 5,
          hrRubric: data.hrRubric || INIT_STATE.hrRubric
        }));
        setDbStatus('connected');
      }
    }, handleError));

    return () => unsubs.forEach(u => u());
  }, [isAuthReady]);

  // Session persistence
  useEffect(() => {
    const sess = sessionStorage.getItem('gp_sess');
    if (sess) {
      try {
        const user = JSON.parse(sess);
        if (state.observers.find(o => o.id === user.id)) {
          setState(prev => ({ ...prev, currentUser: user }));
        }
      } catch {}
    }
  }, [state.observers]);

  const addLog = (action: string, details: string, type: Log['type'], user?: Observer) => {
    const u = user || state.currentUser;
    if (!u) return;
    const newLog: Log = {
      id: uid(),
      ts: new Date().toISOString(),
      uid: u.id,
      uname: u.name,
      action,
      details,
      type
    };
    setDoc(doc(db, 'logs', newLog.id), newLog).catch(console.error);
  };

  const showToast = (msg: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = uid();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const login = (user: Observer) => {
    setState(prev => ({ ...prev, currentUser: user }));
    sessionStorage.setItem('gp_sess', JSON.stringify(user));
    addLog('LOGIN', `${user.name} authenticated`, 'LOGIN', user);
  };

  const logout = () => {
    if (state.currentUser) {
      addLog('LOGOUT', `${state.currentUser.name} signed out`, 'LOGOUT');
    }
    setState(prev => ({ ...prev, currentUser: null }));
    sessionStorage.removeItem('gp_sess');
  };

  const addTeacher = (t: Teacher) => {
    setDoc(doc(db, 'teachers', t.id), t).then(() => {
      addLog('ADD_FACULTY', `Registered: ${t.fullName}`, 'CREATE');
      showToast(`${t.fullName} added.`, 'success');
    }).catch(console.error);
  };

  const deleteTeacher = (id: string) => {
    const t = state.teachers.find(x => x.id === id);
    if (t) {
      deleteDoc(doc(db, 'teachers', id)).then(() => {
        addLog('DELETE_FACULTY', `Removed: ${t.fullName}`, 'DELETE');
        showToast('Faculty member removed.', 'success');
      }).catch(console.error);
    }
  };

  const saveEvaluation = (ev: Evaluation) => {
    setDoc(doc(db, 'evaluations', ev.id), ev).then(() => {
      const t = state.teachers.find(x => x.id === ev.tid);
      if (ev.draft) {
        addLog('SAVE_DRAFT', `Draft for ${t?.fullName}`, 'UPDATE');
        showToast('Draft saved.', 'success');
      } else {
        addLog('COMPLETE_EVAL', `Final ${ev.type} for ${t?.fullName}`, 'CREATE');
        showToast('Evaluation finalized!', 'success');
      }
    }).catch(console.error);
  };

  const deleteEvaluation = (id: string) => {
    const ev = state.evaluations.find(e => e.id === id);
    if (ev) {
      deleteDoc(doc(db, 'evaluations', id)).then(() => {
        const t = state.teachers.find(x => x.id === ev.tid);
        addLog('DELETE_EVAL', `Deleted ${ev.draft ? 'draft' : 'eval'} for ${t?.fullName}`, 'DELETE');
        showToast('Deleted.', 'success');
      }).catch(console.error);
    }
  };

  const addUser = (user: Observer) => {
    setDoc(doc(db, 'observers', user.id), user).then(() => {
      addLog('ADD_USER', `Created: ${user.username}`, 'CREATE');
      showToast(`Account created for ${user.name}.`, 'success');
    }).catch(console.error);
  };

  const updateUser = (user: Observer) => {
    setDoc(doc(db, 'observers', user.id), user).then(() => {
      addLog('UPDATE_USER', `Updated: ${user.username}`, 'UPDATE');
      showToast(`Account updated for ${user.name}.`, 'success');
    }).catch(console.error);
  };

  const deleteUser = (id: string) => {
    const u = state.observers.find(x => x.id === id);
    if (u) {
      deleteDoc(doc(db, 'observers', id)).then(() => {
        addLog('DELETE_USER', `Removed: ${u.username}`, 'DELETE');
        showToast('User account removed.', 'success');
      }).catch(console.error);
    }
  };

  const updateSettings = (updates: Partial<AppState>) => {
    const currentSettings = {
      customWeights: state.customWeights,
      hrWeight: state.hrWeight,
      hrRubric: state.hrRubric,
      ...updates
    };
    setDoc(doc(db, 'settings', 'main'), currentSettings, { merge: true }).catch(console.error);
  };

  const updateWeights = (type: string, weights: number[]) => {
    updateSettings({ customWeights: { ...state.customWeights, [type]: weights } });
    addLog('UPDATE_WEIGHTS', `Updated ${type} weights`, 'UPDATE');
    showToast('Weights saved.', 'success');
  };

  const resetWeights = (type: string) => {
    const next = { ...state.customWeights };
    delete next[type];
    updateSettings({ customWeights: next });
    addLog('RESET_WEIGHTS', `Reset ${type} weights`, 'UPDATE');
    showToast('Weights reset.', 'success');
  };

  const updateHRData = (data: HRData) => {
    setDoc(doc(db, 'hrData', data.teacherId), data).then(() => {
      addLog('UPDATE_HR', `Updated HR data for ${data.teacherId}`, 'UPDATE');
      showToast('HR data saved.', 'success');
    }).catch(console.error);
  };

  const updateHRWeight = (weight: number) => {
    updateSettings({ hrWeight: weight });
    addLog('UPDATE_HR_WEIGHT', `Updated HR weight to ${weight}%`, 'UPDATE');
    showToast('HR weight updated.', 'success');
  };

  const updateHRRubric = (rubric: AppState['hrRubric']) => {
    updateSettings({ hrRubric: rubric });
    addLog('UPDATE_HR_RUBRIC', 'Updated HR scoring thresholds', 'UPDATE');
    showToast('HR rubric updated.', 'success');
  };

  const resetSystem = () => {
    // Note: Resetting the entire system with the new schema requires deleting all docs in all collections.
    // For simplicity, we just show a toast or implement a basic reset.
    showToast('System reset is disabled in cloud mode.', 'warning');
  };

  const contextValue = React.useMemo(() => ({
    state,
    dbStatus,
    login,
    logout,
    addTeacher,
    deleteTeacher,
    saveEvaluation,
    deleteEvaluation,
    addUser,
    updateUser,
    deleteUser,
    updateWeights,
    resetWeights,
    updateHRData,
    updateHRWeight,
    updateHRRubric,
    resetSystem,
    toasts,
    showToast
  }), [state, dbStatus, toasts]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

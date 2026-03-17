import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Teacher, Observer, Evaluation, Log, Score, HRData } from '../types';
import { uid } from '../utils/helpers';

const INIT_STATE: AppState = {
  currentUser: null,
  teachers: [
    { id: 't1', fullName: 'Edna Krabappel', subject: 'Homeroom', role: 'Homeroom Teacher', division: 'Elementary' },
    { id: 't2', fullName: 'Elizabeth Hoover', subject: 'Mathematics', role: 'Co-Teacher', division: 'Elementary, Middle' },
    { id: 't3', fullName: 'Dewey Largo', subject: 'Music', role: 'HOD', division: 'Middle, High' },
    { id: 't4', fullName: 'Robert Terwilliger', subject: 'Social Studies', role: 'Teacher', division: 'High' },
  ],
  observers: [
    { id: 'o1', name: 'System Administrator', username: 'admin', role: 'admin', hash: '', salt: '' },
    { id: 'o2', name: 'Principal Skinner', username: 'observer', role: 'observer', hash: '', salt: '' },
    { id: 'o3', name: 'HR Department', username: 'hr@globalparadigmschools.com', role: 'hr', hash: '', salt: '' },
  ],
  evaluations: [],
  logs: [],
  customWeights: {},
  hrData: [],
  hrWeight: 5,
};

interface AppContextType {
  state: AppState;
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
  resetSystem: () => void;
  toasts: { id: string; msg: string; type: string }[];
  showToast: (msg: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('gp_eval_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, currentUser: null }; 
      }
    } catch (e) {
      console.error(e);
    }
    return INIT_STATE;
  });

  const [toasts, setToasts] = useState<{ id: string; msg: string; type: string }[]>([]);

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
  }, []);

  useEffect(() => {
    localStorage.setItem('gp_eval_v4', JSON.stringify(state));
  }, [state]);

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
    setState(prev => ({ ...prev, logs: [...prev.logs, newLog] }));
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
    setState(prev => ({ ...prev, teachers: [...prev.teachers, t] }));
    addLog('ADD_FACULTY', `Registered: ${t.fullName}`, 'CREATE');
    showToast(`${t.fullName} added.`, 'success');
  };

  const deleteTeacher = (id: string) => {
    const t = state.teachers.find(x => x.id === id);
    if (t) {
      setState(prev => ({ ...prev, teachers: prev.teachers.filter(x => x.id !== id) }));
      addLog('DELETE_FACULTY', `Removed: ${t.fullName}`, 'DELETE');
      showToast('Faculty member removed.', 'success');
    }
  };

  const saveEvaluation = (ev: Evaluation) => {
    setState(prev => {
      const idx = prev.evaluations.findIndex(e => e.id === ev.id);
      let newEvals = [...prev.evaluations];
      if (idx >= 0) newEvals[idx] = ev;
      else newEvals.push(ev);
      return { ...prev, evaluations: newEvals };
    });
    
    const t = state.teachers.find(x => x.id === ev.tid);
    if (ev.draft) {
      addLog('SAVE_DRAFT', `Draft for ${t?.fullName}`, 'UPDATE');
      showToast('Draft saved.', 'success');
    } else {
      addLog('COMPLETE_EVAL', `Final ${ev.type} for ${t?.fullName}`, 'CREATE');
      showToast('Evaluation finalized!', 'success');
    }
  };

  const deleteEvaluation = (id: string) => {
    const ev = state.evaluations.find(e => e.id === id);
    if (ev) {
      setState(prev => ({ ...prev, evaluations: prev.evaluations.filter(e => e.id !== id) }));
      const t = state.teachers.find(x => x.id === ev.tid);
      addLog('DELETE_EVAL', `Deleted ${ev.draft ? 'draft' : 'eval'} for ${t?.fullName}`, 'DELETE');
      showToast('Deleted.', 'success');
    }
  };

  const addUser = (user: Observer) => {
    setState(prev => ({ ...prev, observers: [...prev.observers, user] }));
    addLog('ADD_USER', `Created: ${user.username}`, 'CREATE');
    showToast(`Account created for ${user.name}.`, 'success');
  };

  const updateUser = (user: Observer) => {
    setState(prev => ({
      ...prev,
      observers: prev.observers.map(o => o.id === user.id ? user : o)
    }));
    addLog('UPDATE_USER', `Updated: ${user.username}`, 'UPDATE');
    showToast(`Account updated for ${user.name}.`, 'success');
  };

  const deleteUser = (id: string) => {
    const u = state.observers.find(x => x.id === id);
    if (u) {
      setState(prev => ({ ...prev, observers: prev.observers.filter(x => x.id !== id) }));
      addLog('DELETE_USER', `Removed: ${u.username}`, 'DELETE');
      showToast('User account removed.', 'success');
    }
  };

  const updateWeights = (type: string, weights: number[]) => {
    setState(prev => ({ ...prev, customWeights: { ...prev.customWeights, [type]: weights } }));
    addLog('UPDATE_WEIGHTS', `Updated ${type} weights`, 'UPDATE');
    showToast('Weights saved.', 'success');
  };

  const resetWeights = (type: string) => {
    setState(prev => {
      const next = { ...prev.customWeights };
      delete next[type];
      return { ...prev, customWeights: next };
    });
    addLog('RESET_WEIGHTS', `Reset ${type} weights`, 'UPDATE');
    showToast('Weights reset.', 'success');
  };

  const updateHRData = (data: HRData) => {
    setState(prev => {
      const idx = prev.hrData.findIndex(d => d.teacherId === data.teacherId);
      let newHR = [...prev.hrData];
      if (idx >= 0) newHR[idx] = data;
      else newHR.push(data);
      return { ...prev, hrData: newHR };
    });
    addLog('UPDATE_HR', `Updated HR data for ${data.teacherId}`, 'UPDATE');
    showToast('HR data saved.', 'success');
  };

  const updateHRWeight = (weight: number) => {
    setState(prev => ({ ...prev, hrWeight: weight }));
    addLog('UPDATE_HR_WEIGHT', `Updated HR weight to ${weight}%`, 'UPDATE');
    showToast('HR weight updated.', 'success');
  };

  const resetSystem = () => {
    setState({ ...INIT_STATE, currentUser: state.currentUser });
    addLog('RESET_SYSTEM', 'System reset to demo data', 'DELETE');
    showToast('System reset.', 'success');
  };

  return (
    <AppContext.Provider value={{
      state,
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
      resetSystem,
      toasts,
      showToast
    }}>
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

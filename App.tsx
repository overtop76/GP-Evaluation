import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TeacherDirectory from './components/TeacherDirectory';
import EvaluationForm from './components/EvaluationForm';
import Report from './components/Report';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';
import AuditLog from './components/AuditLog';

const AppContent: React.FC = () => {
  const { state, login, logout, addTeacher, deleteTeacher, saveEvaluation, deleteEvaluation, addUser, deleteUser, updateWeights, resetWeights, resetSystem, toasts } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [evalParams, setEvalParams] = useState<any>({});

  const handleNavigate = (page: string, params?: any) => {
    setActiveTab(page);
    if (params) setEvalParams(params);
    else setEvalParams({});
  };

  if (!state.currentUser) {
    return <Login observers={state.observers} onLogin={login} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} onNavigate={handleNavigate} onDeleteEvaluation={deleteEvaluation} />;
      case 'teachers':
        return <TeacherDirectory 
          teachers={state.teachers} 
          evaluations={state.evaluations} 
          customWeights={state.customWeights}
          onAddTeacher={addTeacher} 
          onDeleteTeacher={deleteTeacher} 
          onNavigate={handleNavigate} 
        />;
      case 'evaluate':
        const initialEval = evalParams.eid 
          ? state.evaluations.find(e => e.id === evalParams.eid) 
          : evalParams.tid ? { tid: evalParams.tid } : undefined;
        return <EvaluationForm 
          teachers={state.teachers} 
          observers={state.observers} 
          customWeights={state.customWeights}
          initialData={initialEval}
          onSave={saveEvaluation} 
          onCancel={() => setActiveTab('dashboard')} 
        />;
      case 'report':
        return <Report 
          teacherId={evalParams.tid} 
          type={evalParams.type || 'gp'} 
          state={state} 
          onBack={() => setActiveTab('teachers')} 
        />;
      case 'observers':
        return <UserManagement 
          observers={state.observers} 
          currentUser={state.currentUser} 
          onAddUser={addUser} 
          onDeleteUser={deleteUser} 
        />;
      case 'audit':
        return <AuditLog logs={state.logs} />;
      case 'settings':
        return <Settings 
          state={state} 
          onUpdateWeights={updateWeights} 
          onResetWeights={resetWeights} 
          onResetSystem={resetSystem} 
        />;
      default:
        return <Dashboard state={state} onNavigate={handleNavigate} onDeleteEvaluation={deleteEvaluation} />;
    }
  };

  return (
    <div id="app-wrap" className="on">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={state.currentUser.role} 
        userName={state.currentUser.name}
        onLogout={logout}
      />
      <div id="main">
        {renderContent()}
      </div>
      <div id="toasts">
        {toasts.map(t => (
          <div key={t.id} className="toast" style={{ borderLeftColor: t.type === 'success' ? '#10b981' : t.type === 'error' ? '#ef4444' : '#2563eb' }}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

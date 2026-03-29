import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TeacherDirectory from './components/TeacherDirectory';
import EvaluationForm from './components/EvaluationForm';
import Report from './components/Report';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';
import AuditLog from './components/AuditLog';
import HRAttendance from './components/HRAttendance';
import EvaluationHistory from './components/EvaluationHistory';

const AppContent: React.FC = () => {
  const { state, login, logout, addTeacher, updateTeacher, deleteTeacher, saveEvaluation, deleteEvaluation, addUser, updateUser, deleteUser, updateWeights, resetWeights, resetSystem, updateHRWeight, updateHRRubric, updateCustomSubjects, toasts } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [evalParams, setEvalParams] = useState<any>({});

  const handleNavigate = React.useCallback((page: string, params?: any) => {
    setActiveTab(page);
    if (params) setEvalParams(params);
    else setEvalParams({});
  }, []);

  const renderToasts = () => (
    <div id="toasts">
      {toasts.map(t => (
        <div key={t.id} className="toast" style={{ borderLeftColor: t.type === 'success' ? '#10b981' : t.type === 'error' ? '#ef4444' : '#2563eb' }}>
          {t.msg}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (!state.currentUser) {
      return <Login observers={state.observers} onLogin={login} onRegister={addUser} />;
    }

    if (state.currentUser.role === 'hr') {
      return (
        <div id="app-wrap" className="on">
          <Sidebar 
            activeTab="hr" 
            setActiveTab={() => {}} 
            userRole={state.currentUser.role} 
            userName={state.currentUser.name}
            currentUser={state.currentUser}
            onLogout={logout}
          />
          <div id="main">
            <HRAttendance />
          </div>
          {renderToasts()}
        </div>
      );
    }

    if (state.currentUser.role === 'teacher') {
      const teacher = state.teachers.find(t => t.employeeId === state.currentUser?.employeeId);
      return (
        <div id="app-wrap" className="on">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            userRole={state.currentUser.role} 
            userName={state.currentUser.name}
            currentUser={state.currentUser}
            onLogout={logout}
          />
          <div id="main">
            {activeTab === 'dashboard' ? (
              <Dashboard state={state} onNavigate={handleNavigate} onDeleteEvaluation={() => {}} />
            ) : (
              <Report 
                teacherId={teacher?.id} 
                type="gp" 
                state={state} 
                onBack={() => setActiveTab('dashboard')} 
              />
            )}
          </div>
          {renderToasts()}
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} onNavigate={handleNavigate} onDeleteEvaluation={deleteEvaluation} />;
      case 'teachers':
        return <TeacherDirectory 
          teachers={state.teachers} 
          evaluations={state.evaluations} 
          customWeights={state.customWeights}
          customSubjects={state.customSubjects}
          hrData={state.hrData}
          hrWeight={state.hrWeight}
          hrRubric={state.hrRubric}
          currentUser={state.currentUser!}
          onAddTeacher={addTeacher} 
          onUpdateTeacher={updateTeacher}
          onDeleteTeacher={deleteTeacher} 
          onNavigate={handleNavigate} 
        />;
      case 'evaluations':
        return <EvaluationHistory 
          evaluations={state.evaluations}
          teachers={state.teachers}
          observers={state.observers}
          onNavigate={handleNavigate}
          onDelete={deleteEvaluation}
          currentUser={state.currentUser!}
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
          currentUser={state.currentUser!}
          onSave={(ev) => {
            saveEvaluation(ev);
            setActiveTab('dashboard');
          }} 
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
          currentUser={state.currentUser!} 
          onAddUser={addUser} 
          onUpdateUser={updateUser}
          onDeleteUser={deleteUser} 
        />;
      case 'audit':
        return <AuditLog logs={state.logs} />;
      case 'hr':
        return <HRAttendance />;
      case 'settings':
        return <Settings 
          state={state} 
          onUpdateWeights={updateWeights} 
          onResetWeights={resetWeights} 
          onResetSystem={resetSystem} 
          onUpdateHRWeight={updateHRWeight}
          onUpdateHRRubric={updateHRRubric}
          onUpdateCustomSubjects={updateCustomSubjects}
        />;
      default:
        return <Dashboard state={state} onNavigate={handleNavigate} onDeleteEvaluation={deleteEvaluation} />;
    }
  };

  return (
    <div id="app-wrap" className="on">
      {state.currentUser && state.currentUser.role !== 'hr' && state.currentUser.role !== 'teacher' && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userRole={state.currentUser!.role} 
          userName={state.currentUser!.name}
          currentUser={state.currentUser!}
          onLogout={logout}
        />
      )}
      <div id="main">
        {renderContent()}
      </div>
      {renderToasts()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
};

export default App;

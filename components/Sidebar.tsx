import React from 'react';
import { UserRole } from '../types';
import { ini } from '../utils/helpers';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, userName, onLogout }) => {
  const isAdmin = userRole === 'admin';
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('gp_theme') === 'dark';
  });

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('gp_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('gp_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="sidebar no-print flex flex-col h-screen">
      <div className="sb-head shrink-0">
        <div className="sb-logo">
          <div className="sb-ico"><span className="material-icons" style={{ color: '#fff', fontSize: '18px' }}>school</span></div>
          <div>
            <div className="sb-title">GP Eval</div>
            <div className="sb-ver">System v4.0</div>
          </div>
        </div>
      </div>
      <nav className="sb-nav flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        {userRole === 'hr' ? (
          <>
            <div className="sb-sec">HR Portal</div>
            <button className={`nav-btn ${activeTab === 'hr' ? 'active' : ''}`} onClick={() => setActiveTab('hr')}>
              <span className="material-icons-outlined mi">event_available</span>HR Attendance
            </button>
          </>
        ) : (
          <>
            <div className="sb-sec">Main</div>
            <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <span className="material-icons-outlined mi">grid_view</span>Dashboard
            </button>
            <button className={`nav-btn ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
              <span className="material-icons-outlined mi">group</span>Faculty
            </button>
            <button className={`nav-btn ${activeTab === 'evaluate' ? 'active' : ''}`} onClick={() => setActiveTab('evaluate')}>
              <span className="material-icons-outlined mi">assignment</span>New Evaluation
            </button>
            {isAdmin && (
              <>
                <div className="sb-sec">Admin</div>
                <button className={`nav-btn ${activeTab === 'hr' ? 'active' : ''}`} onClick={() => setActiveTab('hr')}>
                  <span className="material-icons-outlined mi">event_available</span>HR Attendance
                </button>
                <button className={`nav-btn ${activeTab === 'observers' ? 'active' : ''}`} onClick={() => setActiveTab('observers')}>
                  <span className="material-icons-outlined mi">manage_accounts</span>Users
                </button>
                <button className={`nav-btn ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
                  <span className="material-icons-outlined mi">history</span>Audit Log
                </button>
                <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                  <span className="material-icons-outlined mi">tune</span>Settings
                </button>
              </>
            )}
          </>
        )}
      </nav>
      <div className="sb-foot shrink-0">
        <div className="sb-user">
          <div className="sb-av">{ini(userName)}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div className="sb-uname">{userName}</div>
            <div className="sb-urole">{userRole}</div>
          </div>
          <button className="logout-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>{darkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button className="logout-btn" onClick={onLogout} title="Logout">
            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { UserRole } from '../types';
import { ini } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, userName, onLogout }) => {
  const isAdmin = userRole === 'admin';
  const { t, language, setLanguage } = useLanguage();
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
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
            <span className="material-icons" style={{ fontSize: '24px' }}>school</span>
          </div>
          <div>
            <div className="sb-title" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '18px', fontWeight: 900, letterSpacing: '0.02em' }}>GLOBAL PARADIGM</div>
            <div className="sb-ver" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Evaluation System v4.2</div>
          </div>
        </div>
      </div>
      <nav className="sb-nav flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', padding: '20px 12px' }}>
        {userRole === 'hr' ? (
          <>
            <div className="sb-sec">{t('nav.hrPortal')}</div>
            <button className={`nav-btn ${activeTab === 'hr' ? 'active' : ''}`} onClick={() => setActiveTab('hr')}>
              <span className="material-icons-outlined mi">event_available</span>{t('nav.hr')}
            </button>
          </>
        ) : userRole === 'teacher' ? (
          <>
            <div className="sb-sec">{t('nav.myPortal')}</div>
            <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <span className="material-icons-outlined mi">grid_view</span>{t('nav.myOverview')}
            </button>
            <button className={`nav-btn ${activeTab === 'report' ? 'active' : ''}`} onClick={() => setActiveTab('report')}>
              <span className="material-icons-outlined mi">bar_chart</span>{t('nav.myReports')}
            </button>
          </>
        ) : (
          <>
            <div className="sb-sec">{t('nav.main')}</div>
            <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <span className="material-icons-outlined mi">grid_view</span>{t('nav.dashboard')}
            </button>
            <button className={`nav-btn ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
              <span className="material-icons-outlined mi">group</span>{t('nav.facultyDirectory')}
            </button>
            <button className={`nav-btn ${activeTab === 'evaluations' ? 'active' : ''}`} onClick={() => setActiveTab('evaluations')}>
              <span className="material-icons-outlined mi">history_edu</span>{t('nav.evalHistory')}
            </button>
            <button className={`nav-btn ${activeTab === 'evaluate' ? 'active' : ''}`} onClick={() => setActiveTab('evaluate')}>
              <span className="material-icons-outlined mi">assignment_add</span>{t('nav.newEval')}
            </button>
            {isAdmin && (
              <>
                <div className="sb-sec">{t('nav.admin')}</div>
                <button className={`nav-btn ${activeTab === 'hr' ? 'active' : ''}`} onClick={() => setActiveTab('hr')}>
                  <span className="material-icons-outlined mi">event_available</span>{t('nav.hr')}
                </button>
                <button className={`nav-btn ${activeTab === 'observers' ? 'active' : ''}`} onClick={() => setActiveTab('observers')}>
                  <span className="material-icons-outlined mi">manage_accounts</span>{t('nav.userManagement')}
                </button>
                <button className={`nav-btn ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
                  <span className="material-icons-outlined mi">history</span>{t('nav.auditLog')}
                </button>
                <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                  <span className="material-icons-outlined mi">tune</span>{t('nav.settings')}
                </button>
              </>
            )}
          </>
        )}
      </nav>
      <div className="sb-foot shrink-0" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button 
            className="btn btn-ghost" 
            style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            <span className="material-icons-outlined" style={{ fontSize: '16px' }}>language</span>
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button 
            className="btn btn-ghost" 
            style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="material-icons-outlined" style={{ fontSize: '16px' }}>
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
        <div className="sb-user" style={{ background: 'var(--bg)', borderRadius: '16px', padding: '12px' }}>
          <div className="sb-av" style={{ background: 'var(--navy)', color: 'white', fontWeight: 900 }}>{ini(userName)}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div className="sb-uname" style={{ fontSize: '13px', fontWeight: 800 }}>{userName}</div>
            <div className="sb-urole" style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate)' }}>{userRole}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
            <button className="logout-btn" onClick={onLogout} title={t('log.logout')} style={{ width: '28px', height: '28px', color: '#ef4444' }}>
              <span className="material-icons-outlined" style={{ fontSize: '16px' }}>logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

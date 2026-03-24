import React, { useState } from 'react';
import { Observer } from '../types';
import { uid, hashPassword } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';

interface LoginProps {
  observers: Observer[];
  onLogin: (user: Observer) => void;
  onRegister: (user: Observer) => void;
}

const Login: React.FC<LoginProps> = ({ observers, onLogin, onRegister }) => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));

    const user = observers.find(o => o.username.toLowerCase() === username.toLowerCase() || o.email.toLowerCase() === username.toLowerCase());
    
    if (user) {
      if (!user.hash) {
        // For demo users without a hash, let them in
        onLogin(user);
      } else {
        const hashed = await hashPassword(password, user.salt || 'default_salt');
        if (hashed === user.hash) {
          onLogin(user);
        } else {
          setError(t('log.invalid'));
        }
      }
    } else {
      setError(t('log.invalid'));
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword) {
      setError(t('user.fillAll'));
      return;
    }

    if (!regEmail.endsWith('@globalparadigmschools.com')) {
      setError(t('user.onlyGPEmails'));
      return;
    }

    if (regPassword.length < 8) {
      setError(t('user.passMin8'));
      return;
    }

    setLoading(true);
    setError('');

    // Simulate delay
    await new Promise(r => setTimeout(r, 800));

    const username = regEmail.split('@')[0].toLowerCase();
    
    if (observers.find(o => o.username === username || o.email === regEmail.toLowerCase())) {
      setError(t('user.exists'));
      setLoading(false);
      return;
    }

    const salt = Date.now().toString(36);
    const hash = await hashPassword(regPassword, salt);

    const newUser: Observer = {
      id: Date.now().toString(36),
      name: regName,
      email: regEmail.toLowerCase(),
      username: username,
      role: 'observer',
      hash,
      salt,
      permissions: {
        viewScopes: ['own'],
        canPrintReports: true,
        canViewReports: true
      }
    };

    onRegister(newUser);
    setLoading(false);
    setActiveTab('signin');
    setUsername(username);
    setPassword(regPassword);
    // Auto login could be done here, but let's just switch to sign in
  };

  return (
    <div id="login-wrap" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--navy-bg)', padding: '20px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', [language === 'ar' ? 'left' : 'right']: '20px', display: 'flex', gap: '12px' }}>
        <button 
          className="btn btn-ghost" 
          style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 600, background: 'var(--white)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderRadius: '12px' }}
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        >
          <span className="material-icons-outlined" style={{ fontSize: '18px', marginRight: '8px', verticalAlign: 'middle' }}>language</span>
          <span style={{ verticalAlign: 'middle' }}>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>
      <div className="login-card">
        <div className="lhead">
          <img 
            src="https://picsum.photos/seed/global-paradigm/200/200" 
            alt="Global Paradigm Logo" 
            referrerPolicy="no-referrer"
            style={{ width: '80px', height: '80px', marginBottom: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <div className="ltitle">{t('log.welcome')}</div>
          <div className="lsub">{t('log.sub')}</div>
        </div>
        <div className="lbody">
          <div className="frow" style={{ background: 'var(--bg)', padding: '6px', borderRadius: '12px', marginBottom: '24px', gap: '4px' }}>
            <button 
              className={`btn ${activeTab === 'signin' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ flex: 1, fontSize: '12px', padding: '10px', background: activeTab === 'signin' ? 'var(--blue)' : 'transparent', color: activeTab === 'signin' ? '#fff' : 'var(--slate)', boxShadow: activeTab === 'signin' ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none' }}
              onClick={() => { setActiveTab('signin'); setError(''); }}
            >
              {t('log.signIn')}
            </button>
            <button 
              className={`btn ${activeTab === 'register' ? 'btn-primary' : 'btn-ghost'}`} 
              style={{ flex: 1, fontSize: '12px', padding: '10px', background: activeTab === 'register' ? 'var(--blue)' : 'transparent', color: activeTab === 'register' ? '#fff' : 'var(--slate)', boxShadow: activeTab === 'register' ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none' }}
              onClick={() => { setActiveTab('register'); setError(''); }}
            >
              {t('dir.register')}
            </button>
          </div>

          {error && (
            <div id="lerr" style={{ display: 'flex', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #fecaca', borderRadius: '9px', padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '13px', fontWeight: 600, alignItems: 'center', gap: '8px' }}>
              <span className="material-icons" style={{ fontSize: '17px' }}>error_outline</span>
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'signin' ? (
            <>
              <div className="field">
                <label className="flabel">{t('log.username')}</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border-hover)', fontSize: '19px', pointerEvents: 'none' }}>person</span>
                  <input 
                    className="finput" 
                    type="text" 
                    placeholder={t('log.username')} 
                    style={{ paddingLeft: '40px' }} 
                    autoComplete="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && document.getElementById('lpass')?.focus()}
                  />
                </div>
              </div>
              <div className="field">
                <label className="flabel">{t('log.password')}</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border-hover)', fontSize: '19px', pointerEvents: 'none' }}>lock</span>
                  <input 
                    id="lpass"
                    className="finput" 
                    type={showPass ? 'text' : 'password'} 
                    placeholder={t('log.password')} 
                    style={{ paddingLeft: '40px' }} 
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  <button 
                    type="button" 
                    className="icon-btn" 
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                    onClick={() => setShowPass(!showPass)}
                  >
                    <span className="material-icons-outlined" style={{ fontSize: '19px', color: 'var(--slate)' }}>{showPass ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '13px', marginTop: '8px' }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spin" style={{ width: '17px', height: '17px', border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', marginRight: '6px', verticalAlign: 'middle' }}></span>
                    {t('log.authenticating')}
                  </>
                ) : (
                  <>
                    <span className="material-icons" style={{ fontSize: '17px' }}>login</span> {t('log.signIn')}
                  </>
                )}
              </button>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                  className="btn btn-ghost" 
                  style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 700 }}
                  onClick={() => setActiveTab('register')}
                >
                  {t('log.needAccount')}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="field">
                <label className="flabel">{t('user.fullName')}</label>
                <input 
                  className="finput" 
                  type="text" 
                  placeholder={t('user.fullName')} 
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="flabel">{t('user.email')}</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-icons-outlined" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontSize: '18px' }}>email</span>
                  <input 
                    className="finput" 
                    type="email" 
                    placeholder="name@globalparadigmschools.com" 
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="flabel">{t('user.password')}</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-icons-outlined" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '18px' }}>lock</span>
                  <input 
                    className="finput" 
                    type="password" 
                    placeholder={t('log.min8chars')} 
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                  />
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '13px', marginTop: '8px' }}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spin" style={{ width: '17px', height: '17px', border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', marginRight: '6px', verticalAlign: 'middle' }}></span>
                    {t('log.creatingAccount')}
                  </>
                ) : (
                  <>
                    <span className="material-icons" style={{ fontSize: '17px' }}>person_add</span> {t('log.createAccount')}
                  </>
                )}
              </button>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                  className="btn btn-ghost" 
                  style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 700 }}
                  onClick={() => setActiveTab('signin')}
                >
                  {t('log.alreadyRegistered')}
                </button>
              </div>
            </>
          )}

          <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(37, 99, 235, 0.03)', borderRadius: '16px', border: '1px solid rgba(37, 99, 235, 0.08)' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{t('log.accessInfo')}</div>
            <p style={{ fontSize: '13px', color: 'var(--slate-dark)', lineHeight: 1.6, margin: 0 }}>
              {t('log.accessDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

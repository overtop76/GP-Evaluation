import React, { useState } from 'react';
import { Observer } from '../types';
import { uid, hashPassword } from '../utils/helpers';

interface LoginProps {
  observers: Observer[];
  onLogin: (user: Observer) => void;
}

const Login: React.FC<LoginProps> = ({ observers, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));

    const user = observers.find(o => o.username.toLowerCase() === username.toLowerCase());
    
    if (user) {
      if (!user.hash) {
        // For demo users without a hash, let them in
        onLogin(user);
      } else {
        const hashed = await hashPassword(password, user.salt || 'default_salt');
        if (hashed === user.hash) {
          onLogin(user);
        } else {
          setError('Invalid credentials. Please try again.');
        }
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div id="login-wrap" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--navy-bg)', padding: '20px' }}>
      <div className="login-card">
        <div className="lhead">
          <img 
            src="https://picsum.photos/seed/global-paradigm/200/200" 
            alt="Global Paradigm Logo" 
            referrerPolicy="no-referrer"
            style={{ width: '80px', height: '80px', marginBottom: '16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <div className="ltitle">Global Paradigm</div>
          <div className="lsub">Evaluation & Accreditation System</div>
        </div>
        <div className="lbody">
          {error && (
            <div id="lerr" style={{ display: 'flex', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #fecaca', borderRadius: '9px', padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '13px', fontWeight: 600, alignItems: 'center', gap: '8px' }}>
              <span className="material-icons" style={{ fontSize: '17px' }}>error_outline</span>
              <span>{error}</span>
            </div>
          )}
          <div className="field">
            <label className="flabel">Username</label>
            <div style={{ position: 'relative' }}>
              <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border-hover)', fontSize: '19px', pointerEvents: 'none' }}>person</span>
              <input 
                className="finput" 
                type="text" 
                placeholder="Enter username" 
                style={{ paddingLeft: '40px' }} 
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && document.getElementById('lpass')?.focus()}
              />
            </div>
          </div>
          <div className="field">
            <label className="flabel">Password</label>
            <div style={{ position: 'relative' }}>
              <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border-hover)', fontSize: '19px', pointerEvents: 'none' }}>lock</span>
              <input 
                id="lpass"
                className="finput" 
                type={showPass ? 'text' : 'password'} 
                placeholder="••••••••" 
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
            style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '13px' }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spin" style={{ width: '17px', height: '17px', border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', marginRight: '6px', verticalAlign: 'middle' }}></span>
                Authenticating...
              </>
            ) : (
              <>
                <span className="material-icons" style={{ fontSize: '17px' }}>login</span> Sign In Securely
              </>
            )}
          </button>
          <div className="demo-hint">
            <div className="demo-title">Demo Credentials</div>
            <div className="demo-row">
              <div className="demo-pill"><div className="demo-pl">Admin</div><div className="demo-pv">admin / any password</div></div>
              <div className="demo-pill"><div className="demo-pl">Observer</div><div className="demo-pv">observer / any</div></div>
              <div className="demo-pill"><div className="demo-pl">HR</div><div className="demo-pv">hr@globalparadigmschools.com / any</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

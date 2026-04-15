import React, { useState } from 'react';
import { Observer, UserRole, ObserverPermissions } from '../types';
import { ini, hashPassword } from '../utils/helpers';
import { SUBJECTS, DIVS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

interface UserManagementProps {
  observers: Observer[];
  currentUser: Observer;
  customSubjects?: string[];
  onAddUser: (user: Observer) => void;
  onDeleteUser: (id: string) => void;
  onUpdateUser?: (user: Observer) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ observers, currentUser, customSubjects = [], onAddUser, onDeleteUser, onUpdateUser }) => {
  const { t } = useLanguage();

  const { showToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Observer | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Observer | null>(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('observer');
  
  // Permissions state
  const [viewScopes, setViewScopes] = useState<('all' | 'own' | 'stage' | 'subject')[]>(['all']);
  const [allowedStages, setAllowedStages] = useState<string[]>([]);
  const [allowedSubjects, setAllowedSubjects] = useState<string[]>([]);
  const [canPrintReports, setCanPrintReports] = useState(true);
  const [canViewReports, setCanViewReports] = useState(true);
  const [canAddUser, setCanAddUser] = useState(false);

  const openModal = (user?: Observer) => {
    if (user) {
      setEditingUser(user);
      setNewName(user.name);
      setNewEmail(user.email || '');
      setNewEmployeeId(user.employeeId || '');
      setNewUsername(user.username);
      setNewPassword('');
      setNewRole(user.role);
      if (user.permissions) {
        setViewScopes(user.permissions.viewScopes || ['all']);
        setAllowedStages(user.permissions.allowedStages || []);
        setAllowedSubjects(user.permissions.allowedSubjects || []);
        setCanPrintReports(user.permissions.canPrintReports);
        setCanViewReports(user.permissions.canViewReports);
        setCanAddUser(user.permissions.canAddUser || false);
      } else {
        setViewScopes(['all']);
        setAllowedStages([]);
        setAllowedSubjects([]);
        setCanPrintReports(true);
        setCanViewReports(true);
        setCanAddUser(false);
      }
    } else {
      setEditingUser(null);
      setNewName('');
      setNewEmail('');
      setNewEmployeeId('');
      setNewUsername('');
      setNewPassword('');
      setNewRole('observer');
      setViewScopes(['all']);
      setAllowedStages([]);
      setAllowedSubjects([]);
      setCanPrintReports(true);
      setCanViewReports(true);
      setCanAddUser(false);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!newName || !newEmail || !newEmployeeId || !newUsername || (!editingUser && !newPassword)) {
      showToast(t('user.alertComplete'), 'error');
      return;
    }
    if (!editingUser && observers.find(o => o.username === newUsername.toLowerCase())) {
      showToast(t('user.alertUsername'), 'error');
      return;
    }
    
    // Check if email is unique
    if (observers.some(o => o.email === newEmail.toLowerCase() && o.id !== editingUser?.id)) {
      showToast(t('user.alertEmail'), 'error');
      return;
    }
    
    // Check if employee ID is unique
    if (observers.some(o => o.employeeId === newEmployeeId && o.id !== editingUser?.id)) {
      showToast(t('user.alertEmpId'), 'error');
      return;
    }
    
    const permissions: ObserverPermissions = {
      viewScopes,
      allowedStages,
      allowedSubjects,
      canPrintReports,
      canViewReports,
      canAddUser
    };
    
    if (editingUser && onUpdateUser) {
      let updatedUser = {
        ...editingUser,
        name: newName,
        email: newEmail.toLowerCase(),
        employeeId: newEmployeeId,
        username: newUsername.toLowerCase(),
        role: newRole,
        permissions
      };
      
      if (newPassword) {
        const salt = Date.now().toString(36);
        const hash = await hashPassword(newPassword, salt);
        updatedUser = { ...updatedUser, salt, hash };
      }
      
      onUpdateUser(updatedUser);
    } else {
      const salt = Date.now().toString(36);
      const hash = await hashPassword(newPassword, salt);
      
      const newUser: Observer = {
        id: Date.now().toString(36),
        employeeId: newEmployeeId,
        name: newName,
        email: newEmail.toLowerCase(),
        username: newUsername.toLowerCase(),
        role: newRole,
        hash,
        salt,
        permissions
      };
      onAddUser(newUser);
    }
    
    setShowModal(false);
  };

  return (
    <div className="page">
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="ph-title">{t('user.title')}</h1>
          <p className="ph-sub">{t('user.sub')}</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <span className="material-icons" style={{ fontSize: '17px' }}>person_add</span> {t('user.add')}
        </button>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <table className="gtable">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px' }}>{t('user.name')}</th>
              <th>{t('user.empId')}</th>
              <th>{t('user.username')}</th>
              <th>{t('user.role')}</th>
              <th>{t('user.status')}</th>
              <th style={{ textAlign: 'right', paddingRight: '24px' }}>{t('user.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {observers.map(o => (
              <tr key={o.id}>
                <td style={{ paddingLeft: '24px' }}>
                  <div className="frow" style={{ gap: '12px' }}>
                    <div className="av" style={{ width: '36px', height: '36px', background: o.role === 'admin' ? '#7c3aed' : o.role === 'hr' ? '#0ea5e9' : '#2563eb', borderRadius: '10px', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{ini(o.name)}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{o.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--slate)', fontWeight: 600 }}>
                        {t(`user.${o.role}`)}
                      </div>
                    </div>
                  </div>
                </td>
                <td><span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--slate-dark)' }}>{o.employeeId || '—'}</span></td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--slate-dark)', background: 'var(--bg)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>@{o.username}</span>
                    <span style={{ fontSize: '11px', color: 'var(--slate)', marginTop: '2px' }}>{o.email}</span>
                  </div>
                </td>
                <td>
                  <span className="badge" style={{ 
                    background: o.role === 'admin' ? 'rgba(168, 85, 247, 0.1)' : o.role === 'hr' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(37, 99, 235, 0.1)', 
                    color: o.role === 'admin' ? '#7c3aed' : o.role === 'hr' ? '#0284c7' : '#2563eb', 
                    borderColor: o.role === 'admin' ? '#e9d5ff' : o.role === 'hr' ? '#bae6fd' : '#bfdbfe' 
                  }}>
                    {t(`user.${o.role}`)}
                  </span>
                </td>
                <td>
                  <div className="frow" style={{ gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                    <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>{t('user.active')}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                  <button className="icon-btn" onClick={() => openModal(o)} title={t('user.editUser')}>
                    <span className="material-icons-outlined" style={{ fontSize: '18px', color: 'var(--blue)' }}>edit</span>
                  </button>
                  <button className="icon-btn" onClick={() => {
                    if (o.id === currentUser.id) {
                      showToast(t('user.alertOwnAccount'), 'error');
                      return;
                    }
                    setConfirmDelete(o);
                  }} title={t('user.deleteUser')}>
                    <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>delete_outline</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setConfirmDelete(null)}>
          <div className="mbox" style={{ maxWidth: '400px' }}>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>
              {t('action.delete')}
            </h2>
            <p style={{ marginBottom: '24px', color: 'var(--slate)', fontSize: '15px', lineHeight: 1.5 }}>
              {t('user.confirmDelete').replace('{name}', confirmDelete.name)}
            </p>
            <div className="frow" style={{ gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>{t('action.cancel') || 'Cancel'}</button>
              <button className="btn btn-danger" onClick={() => {
                onDeleteUser(confirmDelete.id);
                setConfirmDelete(null);
              }}>{t('action.confirm') || 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="mbox" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '26px', fontWeight: 900, color: 'var(--navy)', marginBottom: '22px' }}>
              {editingUser ? t('user.editTitle') : t('user.addTitle')}
            </h2>
            <div className="g2">
              <div className="field">
                <label className="flabel">{t('user.fullName')}</label>
                <input className="finput" placeholder="e.g. Dr. John Smith" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="field">
                <label className="flabel">{t('user.empId')}</label>
                <input className="finput" placeholder="Unique ID" value={newEmployeeId} onChange={e => setNewEmployeeId(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="flabel">{t('user.email')}</label>
              <div style={{ position: 'relative' }}>
                <span className="material-icons-outlined" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontSize: '18px' }}>email</span>
                <input className="finput" placeholder="name@globalparadigmschools.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
              </div>
            </div>
            <div className="g2">
              <div className="field">
                <label className="flabel">{t('user.username')}</label>
                <input className="finput" placeholder="e.g. jsmith" value={newUsername} onChange={e => setNewUsername(e.target.value)} disabled={!!editingUser} />
              </div>
              <div className="field">
                <label className="flabel">{editingUser ? t('user.passwordEdit') : t('user.password')}</label>
                <input className="finput" type="password" placeholder="Min. 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="flabel">{t('user.role')}</label>
              <div className="frow" style={{ gap: '12px' }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'var(--bg)', border: `2px solid ${newRole === 'observer' ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="of-role" value="observer" checked={newRole === 'observer'} onChange={() => setNewRole('observer')} style={{ accentColor: 'var(--blue)', width: '16px', height: '16px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{t('user.observer')}</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Scoped access</div>
                  </div>
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'var(--bg)', border: `2px solid ${newRole === 'admin' ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="of-role" value="admin" checked={newRole === 'admin'} onChange={() => setNewRole('admin')} style={{ accentColor: 'var(--blue)', width: '16px', height: '16px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{t('user.admin')}</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Full system control</div>
                  </div>
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'var(--bg)', border: `2px solid ${newRole === 'hr' ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="of-role" value="hr" checked={newRole === 'hr'} onChange={() => setNewRole('hr')} style={{ accentColor: 'var(--blue)', width: '16px', height: '16px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{t('user.hr')}</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Attendance only</div>
                  </div>
                </label>
              </div>
            </div>
            
            {newRole === 'admin' && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '12px', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>{t('user.adminAccess')}</h3>
                <p style={{ fontSize: '12px', color: 'var(--slate)', lineHeight: 1.5 }}>
                  {t('user.adminDesc')}
                </p>
              </div>
            )}

            {newRole === 'hr' && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '12px', border: '1px solid rgba(14, 165, 233, 0.1)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>{t('user.hrAccess')}</h3>
                <p style={{ fontSize: '12px', color: 'var(--slate)', lineHeight: 1.5 }}>
                  {t('user.hrDesc')}
                </p>
              </div>
            )}
            
            {newRole === 'observer' && (
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>{t('user.observerPerms')}</h3>
                
                <div className="field">
                  <label className="flabel">{t('user.viewScopesLabel')}</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {[
                      { id: 'all', label: t('user.scopeAllObs') },
                      { id: 'own', label: t('user.scopeOwnObs') },
                      { id: 'stage', label: t('user.scopeSpecificStages') },
                      { id: 'subject', label: t('user.scopeSpecificSubjects') }
                    ].map(scope => (
                      <label key={scope.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--bg)', border: `1px solid ${viewScopes.includes(scope.id as any) ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <input 
                          type="checkbox" 
                          checked={viewScopes.includes(scope.id as any)} 
                          onChange={e => {
                            const sid = scope.id as any;
                            if (e.target.checked) {
                              if (sid === 'all') setViewScopes(['all']);
                              else setViewScopes([...viewScopes.filter(s => s !== 'all'), sid]);
                            } else {
                              const next = viewScopes.filter(s => s !== sid);
                              setViewScopes(next.length ? next : ['all']);
                            }
                          }}
                          style={{ accentColor: 'var(--blue)' }}
                        />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{scope.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {viewScopes.includes('stage') && (
                  <div className="field">
                    <label className="flabel">{t('user.allowedStages')}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {DIVS.map(div => (
                        <label key={div} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={allowedStages.includes(div)} 
                            onChange={e => {
                              if (e.target.checked) setAllowedStages([...allowedStages, div]);
                              else setAllowedStages(allowedStages.filter(d => d !== div));
                            }} 
                          />
                          <span style={{ fontSize: '13px' }}>{div}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                {viewScopes.includes('subject') && (
                  <div className="field">
                    <label className="flabel">{t('user.allowedSubjects')}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {[...SUBJECTS, ...customSubjects].map(sub => (
                        <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={allowedSubjects.includes(sub)} 
                            onChange={e => {
                              if (e.target.checked) setAllowedSubjects([...allowedSubjects, sub]);
                              else setAllowedSubjects(allowedSubjects.filter(s => s !== sub));
                            }} 
                          />
                          <span style={{ fontSize: '13px' }}>{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="g2">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={canViewReports} onChange={e => setCanViewReports(e.target.checked)} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>{t('user.canViewReports')}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={canPrintReports} onChange={e => setCanPrintReports(e.target.checked)} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>{t('user.canPrintReports')}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={canAddUser} onChange={e => setCanAddUser(e.target.checked)} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Can Add Users</span>
                  </label>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>{t('user.cancel')}</button>
              <button className="btn btn-primary" onClick={handleSave}>
                <span className="material-icons" style={{ fontSize: '16px' }}>check</span> {editingUser ? t('user.saveChanges') : t('user.createAccount')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

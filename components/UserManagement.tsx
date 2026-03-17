import React, { useState } from 'react';
import { Observer, UserRole, ObserverPermissions } from '../types';
import { ini, hashPassword } from '../utils/helpers';
import { SUBJECTS, DIVS } from '../constants';

interface UserManagementProps {
  observers: Observer[];
  currentUser: Observer;
  onAddUser: (user: Observer) => void;
  onDeleteUser: (id: string) => void;
  onUpdateUser?: (user: Observer) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ observers, currentUser, onAddUser, onDeleteUser, onUpdateUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Observer | null>(null);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('observer');
  
  // Permissions state
  const [viewScope, setViewScope] = useState<'all' | 'own' | 'stage' | 'subject'>('all');
  const [allowedStages, setAllowedStages] = useState<string[]>([]);
  const [allowedSubjects, setAllowedSubjects] = useState<string[]>([]);
  const [canPrintReports, setCanPrintReports] = useState(true);
  const [canViewReports, setCanViewReports] = useState(true);

  const openModal = (user?: Observer) => {
    if (user) {
      setEditingUser(user);
      setNewName(user.name);
      setNewUsername(user.username);
      setNewPassword('');
      setNewRole(user.role);
      if (user.permissions) {
        setViewScope(user.permissions.viewScope);
        setAllowedStages(user.permissions.allowedStages || []);
        setAllowedSubjects(user.permissions.allowedSubjects || []);
        setCanPrintReports(user.permissions.canPrintReports);
        setCanViewReports(user.permissions.canViewReports);
      } else {
        setViewScope('all');
        setAllowedStages([]);
        setAllowedSubjects([]);
        setCanPrintReports(true);
        setCanViewReports(true);
      }
    } else {
      setEditingUser(null);
      setNewName('');
      setNewUsername('');
      setNewPassword('');
      setNewRole('observer');
      setViewScope('all');
      setAllowedStages([]);
      setAllowedSubjects([]);
      setCanPrintReports(true);
      setCanViewReports(true);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!newName || !newUsername || (!editingUser && !newPassword)) {
      alert('Please complete all required fields.');
      return;
    }
    if (!editingUser && observers.find(o => o.username === newUsername.toLowerCase())) {
      alert('Username already exists.');
      return;
    }
    
    const permissions: ObserverPermissions = {
      viewScope,
      allowedStages,
      allowedSubjects,
      canPrintReports,
      canViewReports
    };
    
    if (editingUser && onUpdateUser) {
      let updatedUser = {
        ...editingUser,
        name: newName,
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
        name: newName,
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
          <h1 className="ph-title">User Management</h1>
          <p className="ph-sub">Manage observer and administrator accounts.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <span className="material-icons" style={{ fontSize: '17px' }}>person_add</span> Add User
        </button>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <table className="gtable">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px' }}>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {observers.map(o => (
              <tr key={o.id}>
                <td style={{ paddingLeft: '24px' }}>
                  <div className="frow" style={{ gap: '12px' }}>
                    <div className="av" style={{ width: '36px', height: '36px', background: o.role === 'admin' ? '#7c3aed' : '#2563eb', borderRadius: '10px', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{ini(o.name)}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{o.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--slate)', fontWeight: 600 }}>{o.role === 'admin' ? 'Administrator' : 'Observer'}</div>
                    </div>
                  </div>
                </td>
                <td><span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--slate-dark)', background: 'var(--bg)', padding: '4px 8px', borderRadius: '6px' }}>@{o.username}</span></td>
                <td>
                  <span className="badge" style={{ background: o.role === 'admin' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(37, 99, 235, 0.1)', color: o.role === 'admin' ? '#7c3aed' : '#2563eb', borderColor: o.role === 'admin' ? '#e9d5ff' : '#bfdbfe' }}>
                    {o.role}
                  </span>
                </td>
                <td>
                  <div className="frow" style={{ gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                    <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>Active</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                  <button className="icon-btn" onClick={() => openModal(o)} title="Edit User">
                    <span className="material-icons-outlined" style={{ fontSize: '18px', color: 'var(--blue)' }}>edit</span>
                  </button>
                  <button className="icon-btn" onClick={() => {
                    if (o.id === currentUser.id) {
                      alert('You cannot delete your own account.');
                      return;
                    }
                    if (confirm(`Delete account for ${o.name}? They will lose all system access.`)) {
                      onDeleteUser(o.id);
                    }
                  }} title="Delete User">
                    <span className="material-icons-outlined" style={{ fontSize: '18px', color: '#ef4444' }}>delete_outline</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="mbox" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '26px', fontWeight: 900, color: 'var(--navy)', marginBottom: '22px' }}>
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <div className="field">
              <label className="flabel">Full Name</label>
              <input className="finput" placeholder="e.g. Dr. John Smith" value={newName} onChange={e => setNewName(e.target.value)} />
            </div>
            <div className="g2">
              <div className="field">
                <label className="flabel">Username</label>
                <input className="finput" placeholder="e.g. jsmith" value={newUsername} onChange={e => setNewUsername(e.target.value)} disabled={!!editingUser} />
              </div>
              <div className="field">
                <label className="flabel">Password {editingUser && '(Leave blank to keep current)'}</label>
                <input className="finput" type="password" placeholder="Min. 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="flabel">System Role</label>
              <div className="frow" style={{ gap: '12px' }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'var(--bg)', border: `2px solid ${newRole === 'observer' ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="of-role" value="observer" checked={newRole === 'observer'} onChange={() => setNewRole('observer')} style={{ accentColor: 'var(--blue)', width: '16px', height: '16px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>Observer</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Standard access</div>
                  </div>
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: 'var(--bg)', border: `2px solid ${newRole === 'admin' ? 'var(--blue)' : 'var(--border)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="of-role" value="admin" checked={newRole === 'admin'} onChange={() => setNewRole('admin')} style={{ accentColor: 'var(--blue)', width: '16px', height: '16px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>Administrator</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate)' }}>Full system control</div>
                  </div>
                </label>
              </div>
            </div>
            
            {newRole === 'observer' && (
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>Observer Permissions</h3>
                
                <div className="field">
                  <label className="flabel">View Scope</label>
                  <select className="finput" value={viewScope} onChange={e => setViewScope(e.target.value as any)}>
                    <option value="all">All Observations</option>
                    <option value="own">Only Own Observations</option>
                    <option value="stage">Specific Stages</option>
                    <option value="subject">Specific Subjects</option>
                  </select>
                </div>
                
                {viewScope === 'stage' && (
                  <div className="field">
                    <label className="flabel">Allowed Stages</label>
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
                
                {viewScope === 'subject' && (
                  <div className="field">
                    <label className="flabel">Allowed Subjects</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {SUBJECTS.map(sub => (
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
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Can View Reports</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={canPrintReports} onChange={e => setCanPrintReports(e.target.checked)} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Can Print Reports</span>
                  </label>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
                <span className="material-icons" style={{ fontSize: '16px' }}>check</span> {editingUser ? 'Save Changes' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

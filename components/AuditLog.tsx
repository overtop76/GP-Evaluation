import React, { useState } from 'react';
import { Log } from '../types';
import { fmtDT } from '../utils/helpers';

interface AuditLogProps {
  logs: Log[];
}

const TB: Record<string, string> = {
  CREATE: 'rgba(16, 185, 129, 0.1)|#15803d|#bbf7d0',
  UPDATE: 'rgba(59, 130, 246, 0.1)|#1d4ed8|#bfdbfe',
  DELETE: 'rgba(239, 68, 68, 0.1)|#dc2626|#fecaca',
  SYSTEM: 'var(--bg)|var(--slate)|var(--border)',
  LOGIN: 'rgba(16, 185, 129, 0.1)|#15803d|#bbf7d0',
  LOGOUT: 'rgba(239, 68, 68, 0.1)|#dc2626|#fecaca'
};

const AuditLog: React.FC<AuditLogProps> = ({ logs }) => {
  const [filter, setFilter] = useState('');

  const filteredLogs = React.useMemo(() => logs
    .filter(l => 
      l.action.toLowerCase().includes(filter.toLowerCase()) || 
      l.details.toLowerCase().includes(filter.toLowerCase()) ||
      l.uname.toLowerCase().includes(filter.toLowerCase())
    )
    .reverse()
    .slice(0, 200), [logs, filter]);

  return (
    <div className="page">
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="ph-title">Audit Log</h1>
          <p className="ph-sub">Immutable record of all system activity — latest 200 events.</p>
        </div>
        <div className="frow" style={{ gap: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '6px 12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <span className="material-icons-outlined" style={{ color: '#15803d', fontSize: '18px' }}>verified_user</span>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#15803d' }}>Immutable Log</span>
        </div>
      </div>

      <div className="card-xl" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', maxWidth: '400px', flex: 1 }}>
            <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '20px', pointerEvents: 'none' }}>search</span>
            <input 
              className="finput" 
              placeholder="Filter by user, action, or details…" 
              style={{ paddingLeft: '42px', fontSize: '14px' }} 
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          {filter && (
            <button className="btn btn-ghost btn-sm" onClick={() => setFilter('')}>
              Clear
            </button>
          )}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="gtable">
            <thead>
              <tr>
                <th style={{ paddingLeft: '24px' }}>Timestamp</th>
                <th>Operator</th>
                <th>Action</th>
                <th>Details</th>
                <th style={{ paddingRight: '24px' }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? filteredLogs.map(l => {
                const c = (TB[l.type] || TB.SYSTEM).split('|');
                return (
                  <tr key={l.id}>
                    <td style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--slate)', whiteSpace: 'nowrap', paddingLeft: '24px' }}>{fmtDT(l.ts)}</td>
                    <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{l.uname || 'System'}</td>
                    <td style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: '#2563eb' }}>{l.action}</td>
                    <td style={{ color: 'var(--slate-dark)', fontSize: '13.5px' }}>{l.details}</td>
                    <td style={{ paddingRight: '24px' }}>
                      <span className="badge" style={{ background: c[0], color: c[1], borderColor: c[2] }}>
                        {l.type}
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5}>
                    <div className="empty" style={{ padding: '48px 24px' }}>
                      <span className="material-icons mi" style={{ fontSize: '40px', color: 'var(--border-hover)' }}>receipt_long</span>
                      <p style={{ fontSize: '14px' }}>No audit events found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;

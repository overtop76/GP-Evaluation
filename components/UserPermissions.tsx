import React from 'react';
import { Observer } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface UserPermissionsProps {
  observers: Observer[];
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ observers }) => {
  const { t } = useLanguage();

  return (
    <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
      <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>{t('set.userPermissions')}</h2>
      <table className="gtable">
        <thead>
          <tr>
            <th>{t('user.name')}</th>
            <th>{t('user.role')}</th>
            <th>{t('user.permissions')}</th>
          </tr>
        </thead>
        <tbody>
          {observers.map(o => (
            <tr key={o.id}>
              <td style={{ fontWeight: 600 }}>{o.name}</td>
              <td>{o.role}</td>
              <td style={{ fontSize: '12px', color: 'var(--slate)' }}>
                {o.permissions ? Object.entries(o.permissions).map(([k, v]) => `${k}: ${v}`).join(', ') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPermissions;

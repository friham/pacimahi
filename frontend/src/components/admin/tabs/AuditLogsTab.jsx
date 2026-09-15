import React from 'react';
import { FaClipboardList, FaUndo } from 'react-icons/fa';

export default function AuditLogsTab({
  fetchAuditLogs,
  auditLogs
}) {
  return (
    <div className="cms-panel animate-fade-in-up">
      <div className="cms-panel__header">
        <div>
          <h2 className="cms-panel__title"><FaClipboardList /> Log Aktivitas Admin</h2>
          <p className="cms-panel__subtitle">Rekam jejak seluruh aksi yang dilakukan oleh admin pada sistem CMS.</p>
        </div>
        <button className="cms-btn cms-btn--ghost" onClick={fetchAuditLogs}>
          <FaUndo /> Refresh
        </button>
      </div>
      <div className="cms-table-wrapper">
        <table className="cms-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Admin</th>
              <th>Aksi</th>
              <th>Objek</th>
              <th>Detail</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length === 0 ? (
              <tr><td colSpan="6" className="cms-table__empty">Belum ada log aktivitas.</td></tr>
            ) : auditLogs.map(log => (
              <tr key={log.id}>
                <td className="cms-muted" style={{ whiteSpace: 'nowrap' }}>
                  {new Date(log.created_at).toLocaleString('id-ID')}
                </td>
                <td className="cms-table__bold">{log.admin_name || '—'}</td>
                <td><span className="cms-badge cms-badge--action">{log.action}</span></td>
                <td>{log.object_type}{log.object_id ? ` #${log.object_id}` : ''}</td>
                <td style={{ maxWidth: '300px', fontSize: '0.8rem' }}>{log.details}</td>
                <td className="cms-muted">{log.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

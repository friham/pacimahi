import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

export default function useAuditLogs({ token }) {
  const [auditLogs, setAuditLogs] = useState([]);

  const fetchAuditLogs = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAuditLogs(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  return { auditLogs, fetchAuditLogs };
}

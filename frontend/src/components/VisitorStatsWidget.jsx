import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import './VisitorStatsWidget.css';

function getOrCreateSessionId() {
  if (typeof window === 'undefined') return '';
  let sessId = sessionStorage.getItem('visitor_session_id');
  if (!sessId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      sessId = crypto.randomUUID();
    } else {
      sessId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    }
    sessionStorage.setItem('visitor_session_id', sessId);
  }
  return sessId;
}

export default function VisitorStatsWidget() {
  const location = useLocation();
  const [stats, setStats] = useState({
    hari_ini: 0,
    minggu_ini: 0,
    bulan_ini: 0,
    total: 0,
    online: 1
  });
  const sessionIdRef = useRef('');

  // 1. Check if admin path
  const isAdminPath = location.pathname.startsWith('/admin');

  // Initialize session_id
  useEffect(() => {
    if (!isAdminPath) {
      sessionIdRef.current = getOrCreateSessionId();
    }
  }, [isAdminPath]);

  // 2. Fetch stats
  const fetchStats = useCallback(async () => {
    if (isAdminPath) return;
    try {
      const res = await axios.get(`${API_URL}/analytics/stats`);
      if (res.data?.success && res.data.data) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch visitor stats:', err.message);
    }
  }, [isAdminPath]);

  // 3. Heartbeat
  const sendHeartbeat = useCallback(async () => {
    if (isAdminPath || !sessionIdRef.current) return;
    try {
      await axios.post(`${API_URL}/analytics/heartbeat`, {
        session_id: sessionIdRef.current
      });
    } catch (err) {
      console.warn('Heartbeat error:', err.message);
    }
  }, [isAdminPath]);

  // 4. Track page visit on route change
  useEffect(() => {
    if (isAdminPath) return;

    const track = async () => {
      try {
        await axios.post(`${API_URL}/analytics/track`, {
          path: location.pathname
        });
        fetchStats();
      } catch (err) {
        console.warn('Track visit error:', err.message);
      }
    };

    track();
  }, [location.pathname, isAdminPath, fetchStats]);

  // 5. Periodic stats fetch (every 30s) and heartbeat (every 60s)
  useEffect(() => {
    if (isAdminPath) return;

    fetchStats();
    sendHeartbeat();

    const statsInterval = setInterval(fetchStats, 30000);
    const heartbeatInterval = setInterval(sendHeartbeat, 60000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(heartbeatInterval);
    };
  }, [isAdminPath, fetchStats, sendHeartbeat]);

  // If in admin, do not render
  if (isAdminPath) return null;

  return (
    <div className="footer-visitor-stats">
      <h4 className="footer__col-title footer-visitor-stats__title">
        Statistik Pengunjung
      </h4>
      <div className="footer-visitor-stats__card">
        <div className="footer-visitor-stats__row">
          <span className="footer-visitor-stats__label">Hari ini</span>
          <span className="footer-visitor-stats__value">
            {Number(stats.hari_ini || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="footer-visitor-stats__row">
          <span className="footer-visitor-stats__label">Minggu ini</span>
          <span className="footer-visitor-stats__value">
            {Number(stats.minggu_ini || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="footer-visitor-stats__row">
          <span className="footer-visitor-stats__label">Bulan ini</span>
          <span className="footer-visitor-stats__value">
            {Number(stats.bulan_ini || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="footer-visitor-stats__row footer-visitor-stats__row--total">
          <span className="footer-visitor-stats__label">Jumlah (Total)</span>
          <span className="footer-visitor-stats__value footer-visitor-stats__value--bold">
            {Number(stats.total || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="footer-visitor-stats__row footer-visitor-stats__row--online">
          <span className="footer-visitor-stats__label">
            <span className="footer-visitor-stats__online-indicator" />
            Online
          </span>
          <span className="footer-visitor-stats__value footer-visitor-stats__value--online">
            {Number(stats.online || 1).toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
}

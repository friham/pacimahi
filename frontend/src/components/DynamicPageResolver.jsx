import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import DynamicCMSPage from './DynamicCMSPage';
import { FaSpinner } from 'react-icons/fa';

import { API_URL } from '../config';

export default function DynamicPageResolver() {
  const location = useLocation();
  const [resolvedSlug, setResolvedSlug] = useState(null);
  const [status, setStatus] = useState('checking'); // checking, found, not_found

  useEffect(() => {
    let isMounted = true;
    const checkSlug = async () => {
      const parts = location.pathname.split('/').filter(Boolean);
      const possibleSlug = parts[parts.length - 1];

      if (!possibleSlug) {
        if (isMounted) setStatus('not_found');
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/pages/slug/${possibleSlug}`);
        if (isMounted && res.data.success) {
          setResolvedSlug(possibleSlug);
          setStatus('found');
        } else {
          if (isMounted) setStatus('not_found');
        }
      } catch (err) {
        if (isMounted) setStatus('not_found');
      }
    };

    checkSlug();
    return () => { isMounted = false; };
  }, [location.pathname]);

  if (status === 'checking') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#0b4619' }}>
        <FaSpinner className="spin" size={32} />
      </div>
    );
  }

  if (status === 'found' && resolvedSlug) {
    return <DynamicCMSPage customSlug={resolvedSlug} />;
  }

  return <Navigate to="/" replace />;
}

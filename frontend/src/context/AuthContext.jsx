import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

import { API_URL } from '../config';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Use a ref to always have the latest token without stale closure issues
  const tokenRef = useRef(token);
  tokenRef.current = token;

  // Track whether we've done the initial auth check
  const hasCheckedAuth = useRef(false);

  /**
   * Verify the current token with the backend.
   * Only logs out on 401 (token invalid/expired).
   * Network errors or server errors do NOT force logout — the user can retry on next navigation.
   */
  const fetchUser = useCallback(async () => {
    const currentToken = tokenRef.current;
    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setUser(response.data.data);
    } catch (error) {
      // Only force logout if the token is actually invalid (401).
      // For network errors, CORS issues, or server errors (500, 502, 503),
      // keep the user logged in — they can retry on next navigation or page reload.
      if (error.response && error.response.status === 401) {
        console.warn('Token expired or invalid, logging out.');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } else {
        console.warn('Auth check failed (non-401), keeping session:', error.message);
        // Don't logout — just keep the existing user state from login()
      }
    } finally {
      setLoading(false);
      hasCheckedAuth.current = true;
    }
  }, []);

  // On mount: verify token if present
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      hasCheckedAuth.current = true;
    }
    // This effect should only run on mount — no dependencies needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Login: authenticate and store token + user.
   * After login, the user is set immediately — no need to call fetchUser() again
   * since login() already provides the user data from the backend response.
   */
  const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });

    const { token: newToken, admin } = response.data.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(admin);

    return response.data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    tokenRef.current = null;
  }, []);

  const updateUser = useCallback((updatedUser, newToken) => {
    setUser(updatedUser);
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      tokenRef.current = newToken;
    }
  }, []);

  /**
   * Manual refresh: re-verify the token with the backend.
   * Called explicitly by the user (e.g., pull-to-refresh in dashboard).
   */
  const refreshUser = useCallback(() => {
    return fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

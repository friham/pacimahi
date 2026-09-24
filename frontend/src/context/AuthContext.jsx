import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export { AuthContext };

import { API_URL } from '../config';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(() => Boolean(token));

  const tokenRef = useRef(token);
  useEffect(() => { tokenRef.current = token; }, [token]);

  const hasCheckedAuth = useRef(false);

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
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
      hasCheckedAuth.current = true;
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [fetchUser, token]);

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

  const refreshUser = useCallback(() => {
    return fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Shared configuration — reads from Vite environment variables.
// Set VITE_API_URL and VITE_SERVER_URL in frontend/.env (or .env.local / .env.production).

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaLock, FaSignInAlt, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import logoPaCimahi from '../assets/logo-pa-cimahi.png';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login Admin | Pengadilan Agama Kota Cimahi Kelas IA';
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__bg">
        <div className="login-page__bg-glow"></div>
        <div className="login-page__bg-pattern"></div>
        <div className="login-page__bg-vignette"></div>
      </div>

      <Link to="/" className="login-page__back animate-slide-down">
        <FaHome />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="login-card animate-card-entrance">
        <div className="login-card__header">
          <div className="login-card__logo-wrap animate-logo-pop">
            <div className="login-card__logo-glow"></div>
            <img
              src={logoPaCimahi}
              alt="Logo Pengadilan Agama Kota Cimahi Kelas IA"
              className="login-card__logo-img"
            />
          </div>
          <div className="login-card__header-texts animate-stagger-1">
            <h1 className="login-card__title">Admin Panel</h1>
            <p className="login-card__subtitle">Pengadilan Agama Kota Cimahi Kelas IA</p>
          </div>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-card__error animate-fade-in-down">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="login-card__field animate-stagger-2">
            <label htmlFor="username" className="login-card__label">Username</label>
            <div className="login-card__input-wrapper">
              <FaUser className="login-card__input-icon" />
              <input
                id="username"
                type="text"
                className="login-card__input"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="login-card__field animate-stagger-3">
            <label htmlFor="password" className="login-card__label">Password</label>
            <div className="login-card__input-wrapper">
              <FaLock className="login-card__input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="login-card__input"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-card__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-card__submit animate-stagger-4"
            disabled={loading}
          >
            {loading ? (
              <div className="login-card__spinner"></div>
            ) : (
              <>
                <FaSignInAlt className="login-card__submit-icon" />
                <span>Masuk</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

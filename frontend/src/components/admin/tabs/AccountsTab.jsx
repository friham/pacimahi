import {
  FaUserShield, FaCamera, FaTimes, FaUser, FaIdCard, FaEnvelope,
  FaShieldAlt, FaSave, FaLock, FaKey, FaEye, FaEyeSlash, FaCheckCircle
} from 'react-icons/fa';

export default function AccountsTab({
  user,
  accountForm,
  setAccountForm,
  handleUpdateProfile,
  avatarFileInputRef,
  avatarUploading,
  handleAvatarFileChange,
  avatarImgError,
  setAvatarImgError,
  getAvatarUrl,
  showMsg,
  accountLoading,
  handleChangePassword,
  passwordForm,
  setPasswordForm,
  showPass,
  setShowPass,
  passwordLoading
}) {
  return (
    <div className="admin-account-panel animate-fade-in-up">
      <div className="admin-account-grid">
        <div className="admin-account-card admin-account-card--profile">
          <div className="admin-account-card__top-bar admin-account-card__top-bar--emerald"></div>
          <div className="admin-account-card__header">
            <div className="admin-account-card__icon-wrap admin-account-card__icon-wrap--emerald">
              <FaUserShield />
            </div>
            <div>
              <h2 className="admin-account-card__title">Profil & Ikon Administrator</h2>
              <p className="admin-account-card__subtitle">Atur foto avatar, username login, nama tampilan, dan alamat email Anda.</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="admin-account-form">
            <div className="account-avatar-card">
              <input
                type="file"
                ref={avatarFileInputRef}
                accept="image/*"
                onChange={handleAvatarFileChange}
                style={{ display: 'none' }}
                disabled={avatarUploading}
              />

              <div className="account-avatar-preview-wrap">
                <div className="account-avatar-preview">
                  {accountForm.avatar && !avatarImgError ? (
                    <img
                      src={getAvatarUrl(accountForm.avatar)}
                      alt="Avatar Preview"
                      className="account-avatar-preview__img"
                      onError={() => setAvatarImgError(true)}
                    />
                  ) : (
                    <span className="account-avatar-preview__initial">
                      {(accountForm.name || accountForm.username || 'A').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button 
                  type="button" 
                  className="account-avatar-upload-trigger" 
                  onClick={() => avatarFileInputRef.current?.click()}
                  title="Klik untuk memilih foto avatar baru"
                  disabled={avatarUploading}
                >
                  <FaCamera />
                </button>
              </div>

              <div className="account-avatar-details">
                <div className="account-avatar-badge-wrap">
                  <span className="account-avatar-badge">FOTO / IKON PROFIL</span>
                </div>
                <p className="account-avatar-title">Sesuaikan Ikon Akun Anda</p>
                <p className="account-avatar-desc">Format yang didukung: PNG, JPG, JPEG, atau WebP (Maksimal 5MB). Ikon ini otomatis tampil di seluruh dashboard.</p>
                
                <div className="account-avatar-actions">
                  <button
                    type="button"
                    className="account-action-btn account-action-btn--upload"
                    onClick={() => avatarFileInputRef.current?.click()}
                    disabled={avatarUploading}
                  >
                    <FaCamera /> {avatarUploading ? 'Mengunggah...' : 'Unggah Foto Baru'}
                  </button>
                  <button
                    type="button"
                    className="account-action-btn account-action-btn--preset"
                    onClick={() => {
                      setAccountForm(prev => ({ ...prev, avatar: '/images/logo-pa-cimahi.png' }));
                      setAvatarImgError(false);
                      showMsg('Logo PA Cimahi dipilih! Klik "Simpan Perubahan Profil" untuk menerapkan.');
                    }}
                    title="Gunakan lambang resmi Pengadilan Agama Cimahi"
                  >
                    🏛️ Pakai Logo PA Cimahi
                  </button>
                  {accountForm.avatar && (
                    <button
                      type="button"
                      className="account-action-btn account-action-btn--reset"
                      onClick={() => {
                        setAccountForm(prev => ({ ...prev, avatar: '' }));
                        setAvatarImgError(false);
                        showMsg('Ikon diatur ke inisial huruf. Klik "Simpan Perubahan Profil" untuk menerapkan.');
                      }}
                      title="Gunakan inisial nama standar"
                    >
                      <FaTimes /> Hapus Foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="account-inputs-grid">
              <div className="account-input-group">
                <label className="account-label">
                  <span>Username Login</span>
                  <span className="account-label__req">*</span>
                </label>
                <div className="account-input-box">
                  <span className="account-input-box__icon"><FaUser /></span>
                  <input
                    type="text"
                    className="account-input-field"
                    value={accountForm.username}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Masukkan username"
                    required
                  />
                </div>
                <span className="account-hint">Digunakan saat proses login ke panel admin</span>
              </div>

              <div className="account-input-group">
                <label className="account-label">
                  <span>Nama Lengkap Tampilan</span>
                  <span className="account-label__req">*</span>
                </label>
                <div className="account-input-box">
                  <span className="account-input-box__icon"><FaIdCard /></span>
                  <input
                    type="text"
                    className="account-input-field"
                    value={accountForm.name}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Contoh: Administrator"
                    required
                  />
                </div>
                <span className="account-hint">Nama yang tampil pada salam dashboard & pojok kanan atas</span>
              </div>

              <div className="account-input-group">
                <label className="account-label">
                  <span>Email Administrator</span>
                </label>
                <div className="account-input-box">
                  <span className="account-input-box__icon"><FaEnvelope /></span>
                  <input
                    type="email"
                    className="account-input-field"
                    value={accountForm.email}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@pa-cimahi.go.id"
                  />
                </div>
                <span className="account-hint">Alamat surel resmi untuk korespondensi sistem</span>
              </div>

              <div className="account-input-group">
                <label className="account-label">
                  <span>Peran & Hak Akses Akun</span>
                </label>
                <div className="account-role-box">
                  <div className="account-role-box__content">
                    <div className="account-role-box__shield">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <span className="account-role-box__role">
                        {user?.role ? user.role.toUpperCase() : 'SUPERADMIN'}
                      </span>
                      <span className="account-role-box__sub">Otoritas Penuh Sistem</span>
                    </div>
                  </div>
                  <span className="account-role-box__status">
                    <span className="account-role-box__dot"></span> Aktif
                  </span>
                </div>
              </div>
            </div>

            <div className="account-form-footer">
              <button 
                type="submit" 
                className="account-submit-btn account-submit-btn--emerald" 
                disabled={accountLoading || avatarUploading}
              >
                <FaSave className="account-submit-btn__icon" />
                <span>{accountLoading ? 'Menyimpan Perubahan...' : 'Simpan Perubahan Profil'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="admin-account-card admin-account-card--security">
          <div className="admin-account-card__top-bar admin-account-card__top-bar--amber"></div>
          <div className="admin-account-card__header">
            <div className="admin-account-card__icon-wrap admin-account-card__icon-wrap--amber">
              <FaLock />
            </div>
            <div>
              <h2 className="admin-account-card__title">Ganti Kata Sandi (Password)</h2>
              <p className="admin-account-card__subtitle">Perbarui password akun Anda secara berkala untuk menjaga keamanan sistem.</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="admin-account-form">
            <div className="account-password-stack">
              <div className="account-input-group">
                <label className="account-label">
                  <span>Password Saat Ini</span>
                  <span className="account-label__req">*</span>
                </label>
                <div className="account-input-box">
                  <span className="account-input-box__icon"><FaKey /></span>
                  <input
                    type={showPass.current ? 'text' : 'password'}
                    className="account-input-field account-input-field--with-toggle"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Masukkan password saat ini"
                    required
                  />
                  <button
                    type="button"
                    className="account-eye-toggle"
                    onClick={() => setShowPass(prev => ({ ...prev, current: !prev.current }))}
                    tabIndex={-1}
                    title={showPass.current ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPass.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span className="account-hint">Dibutuhkan untuk verifikasi keamanan akun Anda</span>
              </div>

              <div className="account-input-group">
                <label className="account-label">
                  <span>Password Baru</span>
                  <span className="account-label__req">*</span>
                </label>
                <div className="account-input-box">
                  <span className="account-input-box__icon"><FaLock /></span>
                  <input
                    type={showPass.new ? 'text' : 'password'}
                    className="account-input-field account-input-field--with-toggle"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Minimal 6 karakter"
                    required
                  />
                  <button
                    type="button"
                    className="account-eye-toggle"
                    onClick={() => setShowPass(prev => ({ ...prev, new: !prev.new }))}
                    tabIndex={-1}
                    title={showPass.new ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPass.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span className="account-hint">Gunakan kombinasi huruf kapital, huruf kecil, dan angka</span>
              </div>

              <div className="account-input-group">
                <label className="account-label">
                  <span>Konfirmasi Password Baru</span>
                  <span className="account-label__req">*</span>
                </label>
                <div className="account-input-box">
                  <span className="account-input-box__icon"><FaCheckCircle /></span>
                  <input
                    type={showPass.confirm ? 'text' : 'password'}
                    className="account-input-field account-input-field--with-toggle"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Ketik ulang password baru"
                    required
                  />
                  <button
                    type="button"
                    className="account-eye-toggle"
                    onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                    tabIndex={-1}
                    title={showPass.confirm ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPass.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span className="account-hint">Pastikan password sama persis dengan yang di atas</span>
              </div>
            </div>

            <div className="account-form-footer">
              <button 
                type="submit" 
                className="account-submit-btn account-submit-btn--amber" 
                disabled={passwordLoading}
              >
                <FaLock className="account-submit-btn__icon" />
                <span>{passwordLoading ? 'Memproses Password...' : 'Perbarui Kata Sandi'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

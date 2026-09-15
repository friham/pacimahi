import { FaSignOutAlt } from 'react-icons/fa';

export default function LogoutConfirmModal({ show, onCancel, onConfirm, modalRef }) {
  if (!show) return null;

  return (
    <div
      className="cms-modal-overlay logout-modal__overlay"
      onClick={onCancel}
    >
      <div
        className="cms-modal logout-confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        tabIndex={-1}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cms-modal__header logout-modal__header">
          <FaSignOutAlt className="logout-modal__icon" aria-hidden="true" />
          <h3 id="logout-confirm-title">Keluar dari Dashboard?</h3>
        </div>
        <div className="logout-modal__body">
          <p>
            Apakah Anda yakin ingin keluar dari dashboard admin? Anda perlu login
            kembali untuk mengakses dashboard.
          </p>
        </div>
        <div className="logout-modal__actions">
          <button
            type="button"
            className="logout-modal__btn-secondary"
            onClick={onCancel}
            title="Batal logout"
          >
            Batal
          </button>
          <button
            type="button"
            className="logout-modal__btn-danger"
            onClick={onConfirm}
            title="Konfirmasi logout"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}

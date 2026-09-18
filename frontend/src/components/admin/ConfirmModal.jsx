import { useEffect, useRef } from 'react';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';

export default function ConfirmModal({
  show,
  title = 'Konfirmasi Hapus',
  message = 'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.',
  confirmText = 'Ya, Hapus',
  cancelText = 'Batal',
  type = 'danger', // 'danger' | 'warning' | 'primary'
  onConfirm,
  onCancel,
  loading = false
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!show) return;
    modalRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) {
        e.preventDefault();
        onCancel?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, loading, onCancel]);

  if (!show) return null;

  return (
    <div
      className="cms-modal-overlay logout-modal__overlay"
      onClick={!loading ? onCancel : undefined}
      style={{ zIndex: 99999 }}
    >
      <div
        className="cms-modal logout-confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        tabIndex={-1}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`cms-modal__header logout-modal__header ${type === 'warning' ? 'logout-modal__header--warning' : ''}`}>
          <div className="confirm-modal__icon-wrap">
            {type === 'danger' ? (
              <FaTrash className="logout-modal__icon" aria-hidden="true" />
            ) : (
              <FaExclamationTriangle className="logout-modal__icon" aria-hidden="true" />
            )}
          </div>
          <h3 id="confirm-modal-title">{title}</h3>
        </div>

        <div className="logout-modal__body">
          <p>{message}</p>
        </div>

        <div className="logout-modal__actions">
          <button
            type="button"
            className="logout-modal__btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={type === 'danger' ? 'logout-modal__btn-danger' : 'cms-btn cms-btn--primary'}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Memproses...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

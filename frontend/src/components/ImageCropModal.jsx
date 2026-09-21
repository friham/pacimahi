import { useState, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import {
  FaTimes,
  FaCrop,
  FaSearchPlus,
  FaSearchMinus,
  FaUndo,
  FaRedo,
  FaCheck,
  FaSyncAlt,
  FaArrowsAltH,
  FaArrowsAltV
} from 'react-icons/fa';
import './ImageCropModal.css';

const ASPECT_RATIO_PRESETS = [
  { label: 'Bebas (Free)', value: NaN },
  { label: '16:9 (Landscape)', value: 16 / 9 },
  { label: '4:3 (Standar)', value: 4 / 3 },
  { label: '1:1 (Persegi)', value: 1 },
  { label: '3:4 (Portrait)', value: 3 / 4 },
  { label: '2:3 (Buku/SK)', value: 2 / 3 },
];

export default function ImageCropModal({
  isOpen,
  imageSrc,
  fileName = 'gambar.jpg',
  onClose,
  onConfirmCrop,
  onSkipCrop,
  title = 'Potong & Sesuaikan Foto'
}) {
  const [selectedRatio, setSelectedRatio] = useState(NaN);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    let timer;
    // Beri sedikit delay untuk memastikan DOM modal dan img sudah ter-render sempurna
    timer = setTimeout(() => {
      if (imageRef.current) {
        if (cropperRef.current) {
          cropperRef.current.destroy();
        }

        cropperRef.current = new Cropper(imageRef.current, {
          aspectRatio: selectedRatio,
          viewMode: 1,
          dragMode: 'move',
          autoCropArea: 0.92,
          restore: false,
          guides: true,
          center: true,
          highlight: true,
          cropBoxMovable: true,
          cropBoxResizable: true,
          toggleDragModeOnDblclick: false,
          responsive: true,
          checkCrossOrigin: false,
          background: true,
        });
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    };
  }, [isOpen, imageSrc, selectedRatio]);

  if (!isOpen || !imageSrc) return null;

  const handleRatioChange = (ratio) => {
    setSelectedRatio(ratio);
    if (cropperRef.current) {
      cropperRef.current.setAspectRatio(ratio);
    }
  };

  const handleZoom = (ratio) => {
    if (cropperRef.current) {
      cropperRef.current.zoom(ratio);
    }
  };

  const handleRotate = (deg) => {
    if (cropperRef.current) {
      cropperRef.current.rotate(deg);
    }
  };

  const handleFlipH = () => {
    if (cropperRef.current) {
      const next = scaleX * -1;
      setScaleX(next);
      cropperRef.current.scaleX(next);
    }
  };

  const handleFlipV = () => {
    if (cropperRef.current) {
      const next = scaleY * -1;
      setScaleY(next);
      cropperRef.current.scaleY(next);
    }
  };

  const handleReset = () => {
    if (cropperRef.current) {
      cropperRef.current.reset();
      setScaleX(1);
      setScaleY(1);
      setSelectedRatio(NaN);
      cropperRef.current.setAspectRatio(NaN);
    }
  };

  const handleApplyCrop = () => {
    if (!cropperRef.current) return;
    setIsProcessing(true);

    try {
      const canvas = cropperRef.current.getCroppedCanvas({
        maxWidth: 2400,
        maxHeight: 2400,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      if (!canvas) {
        setIsProcessing(false);
        return;
      }

      canvas.toBlob((blob) => {
        setIsProcessing(false);
        if (!blob) return;

        // Ambil ekstensi nama file asli atau default ke .jpg
        let name = fileName || 'cropped-image.jpg';
        if (!/\.(jpe?g|png|webp)$/i.test(name)) {
          name += '.jpg';
        }

        const croppedFile = new File([blob], name, { type: 'image/jpeg' });
        const previewUrl = URL.createObjectURL(blob);
        onConfirmCrop(croppedFile, previewUrl);
      }, 'image/jpeg', 0.92);
    } catch (err) {
      console.error('Crop error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="crop-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="crop-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="crop-modal-header">
          <div className="crop-modal-title">
            <FaCrop className="crop-modal-title__icon" />
            <span>{title}</span>
          </div>
          <button
            type="button"
            className="crop-modal-close"
            onClick={onClose}
            aria-label="Tutup Crop"
          >
            <FaTimes />
          </button>
        </div>

        {/* Workspace Cropper */}
        <div className="crop-modal-body">
          <div className="crop-modal-canvas-wrapper">
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Gambar untuk dipotong"
              className="crop-modal-img"
              crossOrigin="anonymous"
            />
          </div>

          {/* Toolbar Pengaturan */}
          <div className="crop-modal-toolbar">
            {/* Pilihan Rasio */}
            <div className="crop-toolbar-section">
              <span className="crop-toolbar-label">Rasio Aspek:</span>
              <div className="crop-ratio-group">
                {ASPECT_RATIO_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`crop-toolbar-btn ${
                      (isNaN(selectedRatio) && isNaN(preset.value)) || selectedRatio === preset.value
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleRatioChange(preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transformasi & Navigasi */}
            <div className="crop-toolbar-section">
              <span className="crop-toolbar-label">Alat Penyesuaian:</span>
              <div className="crop-tools-group">
                <button
                  type="button"
                  className="crop-tool-btn"
                  title="Perbesar (Zoom In)"
                  onClick={() => handleZoom(0.1)}
                >
                  <FaSearchPlus /> Zoom +
                </button>
                <button
                  type="button"
                  className="crop-tool-btn"
                  title="Perkecil (Zoom Out)"
                  onClick={() => handleZoom(-0.1)}
                >
                  <FaSearchMinus /> Zoom -
                </button>
                <button
                  type="button"
                  className="crop-tool-btn"
                  title="Putar Kiri (-90°)"
                  onClick={() => handleRotate(-90)}
                >
                  <FaUndo /> Putar -90°
                </button>
                <button
                  type="button"
                  className="crop-tool-btn"
                  title="Putar Kanan (+90°)"
                  onClick={() => handleRotate(90)}
                >
                  <FaRedo /> Putar +90°
                </button>
                <button
                  type="button"
                  className="crop-tool-btn"
                  title="Cermin Horizontal"
                  onClick={handleFlipH}
                >
                  <FaArrowsAltH /> Flip H
                </button>
                <button
                  type="button"
                  className="crop-tool-btn"
                  title="Cermin Vertikal"
                  onClick={handleFlipV}
                >
                  <FaArrowsAltV /> Flip V
                </button>
                <button
                  type="button"
                  className="crop-tool-btn crop-tool-btn--reset"
                  title="Kembalikan ke Asli"
                  onClick={handleReset}
                >
                  <FaSyncAlt /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="crop-modal-footer">
          <button
            type="button"
            className="crop-modal-btn crop-modal-btn--secondary"
            onClick={onClose}
          >
            Batal
          </button>

          {onSkipCrop && (
            <button
              type="button"
              className="crop-modal-btn crop-modal-btn--neutral"
              onClick={onSkipCrop}
              title="Unggah gambar tanpa memotong ukuran"
            >
              Unggah Asli (Tanpa Crop)
            </button>
          )}

          <button
            type="button"
            className="crop-modal-btn crop-modal-btn--primary"
            onClick={handleApplyCrop}
            disabled={isProcessing}
          >
            <FaCheck /> {isProcessing ? 'Memproses...' : 'Terapkan Crop & Unggah'}
          </button>
        </div>
      </div>
    </div>
  );
}

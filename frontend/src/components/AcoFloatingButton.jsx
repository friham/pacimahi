import { useState } from 'react';
import './AcoFloatingButton.css';

function AcoFloatingButton({
  cctvUrl = 'https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421',
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="aco-floating-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={cctvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="aco-floating-btn"
        aria-label="Access CCTV Online (ACO) - Pengadilan Agama Kota Cimahi"
        title="Access CCTV Online (ACO)"
      >
        <div className="aco-icon-container">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="aco-svg-icon"
            aria-hidden="true"
          >
            <path d="M2.5 6.5H15.5L19 10H2.5V6.5Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M2 6.5H16" />
            <rect x="2.5" y="6.5" width="13" height="8" rx="1.5" />
            <path d="M15.5 8.5L20.5 5.5V15.5L15.5 12.5" />
            <circle cx="7" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
            <path d="M7 14.5V19H12" />
            <path d="M12 17.5V20.5" />
          </svg>
        </div>
      </a>

      {isHovered && (
        <div className="aco-tooltip-card animate-fade-in-up" role="tooltip">
          <span>Access CCTV Online (ACO)</span>
        </div>
      )}
    </div>
  );
}

export default AcoFloatingButton;

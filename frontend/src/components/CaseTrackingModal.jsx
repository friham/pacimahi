import { useState } from 'react';
import { FaSearch, FaTimes, FaGavel, FaCalendarCheck, FaUserCheck, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import './CaseTrackingModal.css';

const sampleCases = [
  {
    nomor: '124/Pdt.G/2026/PA.Cmi',
    jenis: 'Cerai Gugat',
    penggugat: 'Siti Rahmawati',
    tergugat: 'Ahmad Fauzi',
    tglDaftar: '12 Januari 2026',
    status: 'Putus (Berkekuatan Hukum Tetap)',
    tahapan: 'Selesai / Penerbitan Akta Cerai',
    majelis: 'Drs. H. M. Syarif, S.H., M.H.',
    sidangBerikutnya: '-',
    statusColor: '#2e7d32'
  },
  {
    nomor: '88/Pdt.G/2026/PA.Cmi',
    jenis: 'Cerai Talak',
    penggugat: 'Budi Santoso',
    tergugat: 'Dewi Lestari',
    tglDaftar: '04 Februari 2026',
    status: 'Sidang Pembuktian',
    tahapan: 'Pemeriksaan Saksi',
    majelis: 'Dr. Hj. Nurjanah, M.Ag.',
    sidangBerikutnya: '03 September 2026 (Ruang Sidang 1)',
    statusColor: '#1976d2'
  },
  {
    nomor: '35/Pdt.P/2026/PA.Cmi',
    jenis: 'Dispensasi Kawin',
    penggugat: 'Hendra Gunawan',
    tergugat: '-',
    tglDaftar: '18 Februari 2026',
    status: 'Musyawarah Majelis',
    tahapan: 'Menunggu Putusan',
    majelis: 'Drs. H. Ahmad Yani, M.H.',
    sidangBerikutnya: '01 September 2026 (Ruang Sidang 2)',
    statusColor: '#f57c00'
  }
];

function CaseTrackingModal({ isOpen, onClose, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmed = query.trim().toLowerCase();
    const found = sampleCases.find(c => 
      c.nomor.toLowerCase().includes(trimmed) || 
      c.penggugat.toLowerCase().includes(trimmed) || 
      c.tergugat.toLowerCase().includes(trimmed) ||
      c.jenis.toLowerCase().includes(trimmed)
    );

    setSearchResult(found || {
      nomor: query,
      jenis: 'Perkara Terdaftar SIPP',
      penggugat: 'Pihak Terkait',
      tergugat: 'Pihak Terkait',
      tglDaftar: 'Tahun 2026',
      status: 'Sedang Berjalan (Proses SIPP)',
      tahapan: 'Pemeriksaan Berkas / Sidang',
      majelis: 'Majelis Hakim PA Cimahi',
      sidangBerikutnya: 'Silakan cek detail lengkap di SIPP',
      statusColor: '#1976d2'
    });
    setSearched(true);
  };

  const handleUseSample = (nomor) => {
    setQuery(nomor);
    const found = sampleCases.find(c => c.nomor === nomor);
    setSearchResult(found);
    setSearched(true);
  };

  return (
    <div className="case-modal-overlay" onClick={onClose}>
      <div className="case-modal animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="case-modal__header">
          <div className="case-modal__header-icon">
            <FaGavel />
          </div>
          <div>
            <h3 className="case-modal__title">Informasi & Tracking Perkara SIPP</h3>
            <p className="case-modal__subtitle">Pengadilan Agama Kota Cimahi Kelas II</p>
          </div>
          <button className="case-modal__close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="case-modal__body">
          <form className="case-modal__search-form" onSubmit={handleSearch}>
            <div className="case-modal__input-wrapper">
              <FaSearch className="case-modal__search-icon" />
              <input
                type="text"
                className="case-modal__input"
                placeholder="Masukkan nomor perkara (contoh: 124/Pdt.G/2026/PA.Cmi) atau nama pihak..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="case-modal__search-btn">
                Cari Perkara
              </button>
            </div>
          </form>

          <div className="case-modal__samples">
            <span className="case-modal__samples-label">Contoh Cepat:</span>
            {sampleCases.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className="case-modal__sample-pill"
                onClick={() => handleUseSample(s.nomor)}
              >
                {s.nomor}
              </button>
            ))}
          </div>

          {searched && searchResult && (
            <div className="case-result-card animate-fade-in-up">
              <div className="case-result-card__header">
                <div>
                  <span className="case-result-card__badge" style={{ backgroundColor: `${searchResult.statusColor}15`, color: searchResult.statusColor, borderColor: `${searchResult.statusColor}40` }}>
                    {searchResult.status}
                  </span>
                  <h4 className="case-result-card__number">{searchResult.nomor}</h4>
                </div>
                <div className="case-result-card__type">{searchResult.jenis}</div>
              </div>

              <div className="case-result-card__grid">
                <div className="case-result-item">
                  <span className="case-result-item__label"><FaUserCheck /> Penggugat / Pemohon</span>
                  <span className="case-result-item__value">{searchResult.penggugat}</span>
                </div>
                <div className="case-result-item">
                  <span className="case-result-item__label"><FaUserCheck /> Tergugat / Termohon</span>
                  <span className="case-result-item__value">{searchResult.tergugat}</span>
                </div>
                <div className="case-result-item">
                  <span className="case-result-item__label"><FaCalendarCheck /> Tanggal Pendaftaran</span>
                  <span className="case-result-item__value">{searchResult.tglDaftar}</span>
                </div>
                <div className="case-result-item">
                  <span className="case-result-item__label"><FaFileAlt /> Tahapan Saat Ini</span>
                  <span className="case-result-item__value">{searchResult.tahapan}</span>
                </div>
                <div className="case-result-item">
                  <span className="case-result-item__label"><FaGavel /> Majelis Hakim</span>
                  <span className="case-result-item__value">{searchResult.majelis}</span>
                </div>
                <div className="case-result-item">
                  <span className="case-result-item__label"><FaCalendarCheck /> Jadwal Sidang Berikutnya</span>
                  <span className="case-result-item__value case-result-item__value--highlight">{searchResult.sidangBerikutnya}</span>
                </div>
              </div>

              <div className="case-result-card__footer">
                <a
                  href="https://sipp.pa-cimahi.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="case-result-card__sipp-btn"
                >
                  <FaExternalLinkAlt /> Buka di Portal Resmi SIPP PA Cimahi
                </a>
              </div>
            </div>
          )}

          {!searched && (
            <div className="case-modal__placeholder">
              <div className="case-modal__placeholder-icon">⚖️</div>
              <p>Ketik nomor perkara atau nama pihak di kolom atas untuk melihat progres persidangan, tahapan, dan jadwal sidang terkini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseTrackingModal;

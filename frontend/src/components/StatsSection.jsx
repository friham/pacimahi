import { useMemo } from 'react';
import { FaGavel, FaCheckCircle, FaPercent, FaSmile, FaClock, FaHandshake } from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import { useSettings } from '../context/SettingsContext';
import './StatsSection.css';

const defaultStats = [
  { icon: FaGavel, key: 'stat_diterima', number: '3.420', fallback: '3.420', label: 'Perkara Diterima', detail: 'Tahun Berjalan 2026', color: '#2e7d32' },
  { icon: FaCheckCircle, key: 'stat_diputus', number: '3.365', fallback: '3.365', label: 'Perkara Diputus', detail: 'Berkekuatan Hukum Tetap', color: '#1565c0' },
  { icon: FaPercent, key: 'stat_persentase', number: '98,4%', fallback: '98,4%', label: 'Tingkat Penyelesaian', detail: 'Standar Kinerja Mahkamah Agung', color: '#c69c3f' },
  { icon: FaSmile, key: 'stat_ikm', number: '97,8%', fallback: '97,8%', label: 'Indeks Kepuasan (IKM)', detail: 'Predikat Sangat Baik', color: '#7b1fa2' },
  { icon: FaClock, key: null, number: '< 30 Hari', fallback: '< 30 Hari', label: 'Rata-rata Waktu Putus', detail: 'Asas Cepat & Biaya Ringan', color: '#00838f' },
  { icon: FaHandshake, key: null, number: '74,2%', fallback: '74,2%', label: 'Mediasi Berhasil / Damai', detail: 'Kamar Mediasi Terpadu', color: '#d84315' },
];

function StatsSection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.1 });
  const { settings } = useSettings();

  const stats = useMemo(() => defaultStats.map(item => ({
    ...item,
    number: item.key && settings[item.key] ? settings[item.key] : item.number || item.fallback
  })), [settings]);

  return (
    <section className="stats-section">
      <div className="container">
        <div ref={headerRef} className="stats-section__header scroll-reveal">
          <span className="stats-section__tag">Transparansi & Kinerja</span>
          <h2 className="section-title">Statistik Penanganan Perkara</h2>
          <p className="section-subtitle">
            Komitmen Pengadilan Agama Kota Cimahi dalam mewujudkan peradilan yang cepat, sederhana, dan berbiaya ringan
          </p>
        </div>

        <div ref={gridRef} className="stats-section__grid scroll-reveal">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="stat-box"
                style={{ '--stat-accent': s.color, transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="stat-box__icon-wrapper">
                  <Icon className="stat-box__icon" />
                </div>
                <div className="stat-box__number">{s.number}</div>
                <div className="stat-box__label">{s.label}</div>
                <div className="stat-box__detail">{s.detail}</div>
                <div className="stat-box__glow"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaSearch, FaCalendarAlt, FaClipboardList, FaLaptop, 
  FaEdit, FaBullhorn, FaInfoCircle, FaHandsHelping 
} from 'react-icons/fa';
import { API_URL } from '../config';
import useScrollReveal from '../hooks/useScrollReveal';
import './QuickAccess.css';

const iconMap = {
  FaSearch,
  FaCalendarAlt,
  FaClipboardList,
  FaLaptop,
  FaEdit,
  FaBullhorn,
  FaInfoCircle,
  FaHandsHelping,
};

const defaultServices = [
  { name: 'Informasi Perkara', icon: 'FaSearch', description: 'Cek status & tahapan perkara Anda', link: '#cek-perkara' },
  { name: 'Jadwal Sidang', icon: 'FaCalendarAlt', description: 'Jadwal sidang hari ini di PA Cimahi', link: '#panduan' },
  { name: 'Daftar Perkara', icon: 'FaClipboardList', description: 'Pendaftaran perkara online e-Court', link: 'https://ecourt.mahkamahagung.go.id' },
  { name: 'E-Court', icon: 'FaLaptop', description: 'Layanan administrasi peradilan elektronik', link: 'https://ecourt.mahkamahagung.go.id' },
  { name: 'Gugatan Mandiri', icon: 'FaEdit', description: 'Buat gugatan mandiri secara online', link: 'https://gugatanmandiri.badilag.mahkamahagung.go.id' },
  { name: 'Pengaduan (SIWAS)', icon: 'FaBullhorn', description: 'Saluran pengaduan masyarakat resmi', link: 'https://siwas.mahkamahagung.go.id' },
  { name: 'PPID Online', icon: 'FaInfoCircle', description: 'Keterbukaan informasi & dokumentasi', link: '#berita' },
  { name: 'Posbakum (Gratis)', icon: 'FaHandsHelping', description: 'Bantuan hukum bagi masyarakat kurang mampu', link: '#panduan' },
];

function QuickAccess({ onOpenCaseModal }) {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.08 });
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        if (res.data.success && res.data.data.length > 0) {
          setServices(res.data.data);
        }
      } catch {
      }
    };
    fetchServices();
  }, []);

  const handleClick = (e, service) => {
    if (service.name.toLowerCase().includes('informasi perkara') || service.link === '#cek-perkara') {
      e.preventDefault();
      if (onOpenCaseModal) {
        onOpenCaseModal('');
      }
    }
  };

  return (
    <section className="quick-access" id="layanan">
      <div className="container">
        <div ref={headerRef} className="quick-access__header scroll-reveal">
          <span className="quick-access__tag">Layanan Digital</span>
          <h2 className="section-title">Yang Anda Butuhkan?</h2>
          <p className="section-subtitle">Akses cepat ke layanan utama dan aplikasi peradilan online kami</p>
        </div>

        <div ref={gridRef} className="quick-access__grid scroll-reveal-stagger">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FaSearch;
            const isExternal = service.link?.startsWith('http');
            return (
              <a
                key={index}
                href={service.link || '#'}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noreferrer' : ''}
                className="quick-access__card"
                style={{ animationDelay: `${index * 0.06}s` }}
                onClick={(e) => handleClick(e, service)}
              >
                <div className="quick-access__card-glow"></div>
                <div className="quick-access__icon-wrapper">
                  <IconComponent className="quick-access__icon" />
                </div>
                <h3 className="quick-access__card-title">{service.name}</h3>
                <p className="quick-access__card-desc">{service.description}</p>
                <div className="quick-access__card-arrow">→</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuickAccess;

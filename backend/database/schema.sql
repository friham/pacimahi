
CREATE DATABASE IF NOT EXISTS pa_cimahi_db;
USE pa_cimahi_db;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  avatar VARCHAR(255) DEFAULT NULL,
  role ENUM('superadmin', 'admin', 'editor') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sliders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  description TEXT,
  link VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  description TEXT,
  link VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  image_url VARCHAR(500),
  category ENUM('berita', 'pengumuman', 'artikel') DEFAULT 'berita',
  author_id INT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value LONGTEXT,
  setting_group VARCHAR(50) DEFAULT 'general',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO site_settings (setting_key, setting_value, setting_group) VALUES
('hero_badge', 'Zona Integritas WBK & WBBM', 'hero'),
('hero_title', 'Selamat Datang di Pengadilan Agama Kota Cimahi', 'hero'),
('hero_subtitle', 'Mewujudkan Peradilan Agama yang Agung, Bersih, dan Melayani dengan Sepenuh Hati untuk Masyarakat Kota Cimahi.', 'hero'),
('running_text', 'Selamat Datang di Website Resmi Pengadilan Agama Kota Cimahi Kelas II • Pelayanan PTSP Buka Senin-Jumat • Stop Pungli & Gratifikasi • Layanan e-Court MA RI Tersedia 24 Jam', 'hero'),
('stat_diterima', '3.420', 'stats'),
('stat_diputus', '3.365', 'stats'),
('stat_persentase', '98,4%', 'stats'),
('stat_ikm', '97,8%', 'stats'),
('court_address', 'Jl. Encep Kartawiria No. 28, Cimahi Tengah, Kota Cimahi 40526', 'contact'),
('court_phone', '(022) 6631 334', 'contact'),
('court_email', 'info@pa-cimahi.go.id', 'contact'),
('court_whatsapp', '6281121111522', 'contact'),
('survey_period', 'Triwulan II Tahun 2026', 'survey'),
('survey_ikm_score', '3.97', 'survey'),
('survey_ikm_grade', 'A (Sangat Baik)', 'survey'),
('survey_ipkp_score', '3.97', 'survey'),
('survey_ipkp_grade', 'A (Sangat Baik)', 'survey'),
('survey_ipak_score', '3.98', 'survey'),
('survey_ipak_grade', 'A (Sangat Baik)', 'survey')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

INSERT INTO admins (username, password, name, email, role) VALUES
('admin', '$2b$10$M0aPgOC.xoRQEAPfq0ZiReFRxWayIpNoiIDc19mOBa0aF7QZVCZDW', 'Administrator', 'admin@pa-cimahi.go.id', 'superadmin');

INSERT INTO services (name, icon, description, link, sort_order) VALUES
('Informasi Perkara', 'FaSearch', 'Cek informasi dan status perkara Anda', 'https://sipp.pa-cimahi.go.id', 1),
('Jadwal Sidang', 'FaCalendarAlt', 'Lihat jadwal sidang pengadilan', 'https://sipp.pa-cimahi.go.id/list_jadwal_sidang', 2),
('Daftar Perkara', 'FaClipboardList', 'Daftar perkara secara online', 'https://ecourt.mahkamahagung.go.id', 3),
('E-Court', 'FaLaptop', 'Layanan pendaftaran perkara elektronik', 'https://ecourt.mahkamahagung.go.id', 4),
('Gugatan Mandiri', 'FaEdit', 'Buat gugatan secara mandiri', 'https://ecourt.mahkamahagung.go.id', 5),
('Pengaduan', 'FaBullhorn', 'Sampaikan pengaduan Anda', 'https://siwas.mahkamahagung.go.id', 6),
('PPID', 'FaInfoCircle', 'Pejabat Pengelola Informasi dan Dokumentasi', '#', 7),
('Posbakum', 'FaHandsHelping', 'Pos Bantuan Hukum', '#', 8);

INSERT INTO sliders (title, image_url, description, sort_order) VALUES
('Zona Integritas WBK & WBSM', '/images/slider-1.jpg', 'Pengadilan Agama Kota Cimahi menuju Wilayah Bebas dari Korupsi dan Wilayah Birokrasi Bersih dan Melayani', 1),
('Layanan Prima', '/images/slider-2.jpg', 'Melayani dengan Cermat, Ikhlas, Nyaman, Transparan dan Akuntabel', 2),
('Modernisasi Peradilan', '/images/slider-3.jpg', 'Transformasi digital menuju peradilan modern', 3);

INSERT INTO news (title, slug, content, image_url, category, author_id, is_published, published_at) VALUES
('Pencanangan Pembangunan Zona Integritas PA Kota Cimahi Menuju WBBM 2026', 'pencanangan-zi-pa-cimahi-2026', 'Pengadilan Agama Kota Cimahi berkomitmen mewujudkan birokrasi yang bersih, melayani, dan bebas dari korupsi dengan meningkatkan standar pelayanan terpadu satu pintu (PTSP).', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', 'berita', 1, TRUE, NOW()),
('Pengumuman Jadwal Pelayanan PTSP dan Sidang Selama Bulan Ramadhan', 'pengumuman-jadwal-layanan-ramadhan', 'Diberitahukan kepada seluruh masyarakat pencari keadilan bahwa jam operasional pelayanan dan persidangan mengalami penyesuaian selama bulan Ramadhan.', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80', 'pengumuman', 1, TRUE, NOW()),
('Panduan Pendaftaran Perkara Secara Mandiri Melalui E-Court Mahkamah Agung', 'panduan-ecourt-mandiri-2026', 'Masyarakat kini dapat mendaftarkan gugatan, membayar panjar biaya perkara, hingga menerima panggilan sidang secara daring melalui platform e-Court MA RI.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', 'artikel', 1, TRUE, NOW());


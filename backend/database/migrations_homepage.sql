
CREATE DATABASE IF NOT EXISTS pa_cimahi_db;
USE pa_cimahi_db;

CREATE TABLE IF NOT EXISTS homepage_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_key VARCHAR(50) NOT NULL UNIQUE,
  badge_text VARCHAR(100) NULL,
  title VARCHAR(255) NULL,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  link_url VARCHAR(255) NULL,
  link_text VARCHAR(255) NULL,
  items JSON NULL,
  status ENUM('published','draft') DEFAULT 'published',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO homepage_sections (section_key, badge_text, title, description, items, status) VALUES
('zi_gallery', 'REFORMASI BIROKRASI', 'Pembangunan Zona Integritas (WBK & WBBM)',
 'Pengadilan Agama Kota Cimahi berkomitmen mewujudkan Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM) melalui 6 Area Perubahan.',
 '[{"id":"zi-main","img":"/images/zona-integritas/zi-main.png","title":"Zona Integritas PA Kota Cimahi","area":"Utama","desc":"Komitmen WBK & WBBM Menuju Peradilan Bersih dan Akuntabel"},{"id":"zi-area-1","img":"/images/zona-integritas/zi-area-1.png","title":"Area I: Manajemen Perubahan","area":"Area 1","desc":"Mengubah pola pikir dan budaya kerja aparatur peradilan"},{"id":"zi-area-2","img":"/images/zona-integritas/zi-area-2.png","title":"Area II: Penataan Tata Laksana","area":"Area 2","desc":"Optimalisasi SOP terintegrasi dan sistem persidangan modern"},{"id":"zi-area-3","img":"/images/zona-integritas/zi-area-3.png","title":"Area III: Penataan Sistem Manajemen SDM","area":"Area 3","desc":"Pengembangan kompetensi, transparansi, dan penegakan disiplin"},{"id":"zi-area-4","img":"/images/zona-integritas/zi-area-4.png","title":"Area IV: Penguatan Akuntabilitas Kinerja","area":"Area 4","desc":"Keterlibatan pimpinan dalam pencapaian target kinerja peradilan"},{"id":"zi-area-5","img":"/images/zona-integritas/zi-area-5.png","title":"Area V: Penguatan Pengawasan","area":"Area 5","desc":"Pengendalian gratifikasi dan saluran pengaduan SIWAS terpadu"},{"id":"zi-area-6","img":"/images/zona-integritas/zi-area-6.png","title":"Area VI: Peningkatan Kualitas Pelayanan Publik","area":"Area 6","desc":"Pelayanan prima berorientasi kepuasan masyarakat & kaum rentan"}]',
 'published')
ON DUPLICATE KEY UPDATE
  badge_text = VALUES(badge_text), title = VALUES(title), description = VALUES(description),
  image_url = VALUES(image_url), link_url = VALUES(link_url), link_text = VALUES(link_text),
  items = VALUES(items), status = VALUES(status);

INSERT INTO homepage_sections (section_key, badge_text, title, description, image_url, link_url, items, status) VALUES
('prioritas_ptsp', 'RAMAH DISABILITAS & KAUM RENTAN', 'Alur Pelayanan Prioritas PTSP PA Kota Cimahi',
 'Layanan khusus bebas antrean panjang dan pendampingan penuh untuk penyandang disabilitas, lanjut usia, ibu hamil, serta ibu menyusui.',
 '/images/alur-prioritas-ptsp.png',
 '/layanan-publik/alur-pelayanan-prioritas-ptsp',
 '["Jalur Antrian Prioritas Khusus","Fasilitas Kursi Roda & Tongkat Kruk","Pendampingan Petugas Ramah 5S","Ruang Tunggu & Loket Khusus Rendah"]',
 'published')
ON DUPLICATE KEY UPDATE
  badge_text = VALUES(badge_text), title = VALUES(title), description = VALUES(description),
  image_url = VALUES(image_url), link_url = VALUES(link_url), link_text = VALUES(link_text),
  items = VALUES(items), status = VALUES(status);

INSERT INTO homepage_sections (section_key, items, status) VALUES
('service_dual',
 '[{"image_url":"/images/prosedur-berperkara.png","title":"Prosedur Berperkara","subtitle":"Panduan lengkap tahapan beracara di tingkat pertama, banding, kasasi, hingga peninjauan kembali.","link_url":"/kepaniteraan/prosedur-berperkara","pill_text":"Buka Prosedur Berperkara","alt_text":"Prosedur Berperkara PA Cimahi","hover_title":"Klik untuk melihat Prosedur Berperkara di PA Kota Cimahi"},{"image_url":"/images/layanan-informasi.png","title":"Layanan Informasi & PPID","subtitle":"Permintaan informasi publik, biaya informasi, dan transparansi dokumentasi peradilan.","link_url":"/layanan-publik/layanan-informasi","pill_text":"Buka Layanan Informasi","alt_text":"Layanan Informasi PA Cimahi","hover_title":"Klik untuk mengakses Layanan Informasi PA Kota Cimahi"}]',
 'published')
ON DUPLICATE KEY UPDATE
  badge_text = VALUES(badge_text), title = VALUES(title), description = VALUES(description),
  image_url = VALUES(image_url), link_url = VALUES(link_url), link_text = VALUES(link_text),
  items = VALUES(items), status = VALUES(status);

INSERT INTO homepage_sections (section_key, image_url, link_url, items, status) VALUES
('brosur_digital',
 '/images/brosur-digital-banner.png',
 '/layanan-publik/brosur-digital',
 '[{"icon":"file","label":"Persyaratan Berperkara","url":"/kepaniteraan/prosedur-berperkara"},{"icon":"download","label":"Panjar Biaya Perkara","url":"/kepaniteraan/biaya-perkara"},{"icon":"check","label":"Alur Pelayanan","url":"/kepaniteraan/tahapan-perkara"},{"icon":"whatsapp","label":"WhatsApp SILINCAH","url":"https://wa.me/6285703203331?text=Halo%20Admin%20PA%20Cimahi,%20saya%20ingin%20bertanya%20informasi%20layanan"}]',
 'published')
ON DUPLICATE KEY UPDATE
  badge_text = VALUES(badge_text), title = VALUES(title), description = VALUES(description),
  image_url = VALUES(image_url), link_url = VALUES(link_url), link_text = VALUES(link_text),
  items = VALUES(items), status = VALUES(status);

INSERT INTO homepage_sections (section_key, title, description, image_url, items, status) VALUES
('akta_cerai', 'Butuh Duplikat atau Legalisasi Akta Cerai?',
 'Kini dapat diajukan secara online dengan mudah, cepat, dan transparan tanpa antrean panjang.',
 '/images/akta-cerai-banner.png',
 '[{"label":"Formulir Pengajuan Online","url":"https://bit.ly/aktaceraipacimahi","is_external":true},{"label":"Informasi Loket PTSP","url":"/layanan-publik/ptsp","is_external":false}]',
 'published')
ON DUPLICATE KEY UPDATE
  badge_text = VALUES(badge_text), title = VALUES(title), description = VALUES(description),
  image_url = VALUES(image_url), link_url = VALUES(link_url), link_text = VALUES(link_text),
  items = VALUES(items), status = VALUES(status);

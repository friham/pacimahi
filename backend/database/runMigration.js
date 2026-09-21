const pool = require('../config/db');

async function run() {
  console.log('🚀 Starting CMS Database Migration...');
  const connection = await pool.getConnection();

  try {
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS menus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parent_id INT NULL,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        type ENUM('page', 'link', 'dropdown', 'document', 'video', 'custom') DEFAULT 'page',
        url VARCHAR(500) NULL,
        icon VARCHAR(100) NULL,
        sort_order INT DEFAULT 0,
        status ENUM('draft', 'published', 'inactive') DEFAULT 'published',
        open_new_tab BOOLEAN DEFAULT FALSE,
        description TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_parent_sort (parent_id, sort_order),
        INDEX idx_status (status),
        FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table menus ready.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        menu_id INT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT NULL,
        content_html LONGTEXT NULL,
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        seo_title VARCHAR(255) NULL,
        meta_description TEXT NULL,
        meta_keywords VARCHAR(255) NULL,
        og_title VARCHAR(255) NULL,
        og_description TEXT NULL,
        og_image VARCHAR(500) NULL,
        author_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_status (status),
        FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE SET NULL,
        FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table pages ready.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS content_blocks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        content LONGTEXT NULL,
        settings JSON NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_page_sort (page_id, sort_order),
        FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table content_blocks ready.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NULL,
        file_url VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100) NULL,
        file_size INT DEFAULT 0,
        alt_text VARCHAR(255) NULL,
        caption TEXT NULL,
        width INT NULL,
        height INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table media ready.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NULL,
        file_url VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100) NULL,
        file_size INT DEFAULT 0,
        doc_title VARCHAR(255) NOT NULL,
        doc_number VARCHAR(100) NULL,
        doc_date DATE NULL,
        description TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table documents ready.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NULL,
        admin_name VARCHAR(100) NULL,
        action VARCHAR(100) NOT NULL,
        object_type VARCHAR(50) NOT NULL,
        object_id VARCHAR(50) NULL,
        details TEXT NULL,
        ip_address VARCHAR(50) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created (created_at),
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table audit_logs ready.');

    const [existingMenus] = await connection.query('SELECT COUNT(*) as count FROM menus');
    if (existingMenus[0].count === 0) {
      console.log('🌱 Seeding initial Court Menu structure...');

      const insertMenu = async (title, slug, type, url, parentId = null, sortOrder = 0, openNewTab = false, description = '') => {
        const [res] = await connection.query(
          `INSERT INTO menus (title, slug, type, url, parent_id, sort_order, status, open_new_tab, description)
           VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?)`,
          [title, slug, type, url, parentId, sortOrder, openNewTab ? 1 : 0, description]
        );
        return res.insertId;
      };

      const mProfil = await insertMenu('Profil Pengadilan', 'profil-pengadilan', 'dropdown', null, null, 1);
      await insertMenu('Pengantar Ketua Pengadilan', 'pengantar-dari-ketua-pengadilan', 'page', '/tentang-pengadilan/pengantar-dari-ketua-pengadilan', mProfil, 1);
      await insertMenu('Visi dan Misi Pengadilan', 'visi-dan-misi', 'page', '/tentang-pengadilan/visi-dan-misi', mProfil, 2);
      await insertMenu('Tugas Pokok & Fungsi', 'kekuasaan-dan-ruang-lingkup-pengadilan-agama', 'page', '/tentang-pengadilan/kekuasaan-dan-ruang-lingkup-pengadilan-agama', mProfil, 3);
      await insertMenu('Wilayah Yurisdiksi', 'wilayah-yurisdiksi', 'page', '/tentang-pengadilan/wilayah-yurisdiksi', mProfil, 4);
      await insertMenu('Struktur Organisasi', 'struktur-organisasi', 'page', '/tentang-pengadilan/struktur-organisasi', mProfil, 5);
      
      const mSejarah = await insertMenu('Sejarah Pengadilan', 'sejarah-pengadilan', 'dropdown', '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan', mProfil, 6);
      await insertMenu('Tanggal Pembentukan Pengadilan', 'tgl-pembentukan-pengadilan', 'page', '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan', mSejarah, 1);
      await insertMenu('SK Pembentukan Pengadilan', 'sk-pembentukan-pengadilan', 'page', '/tentang-pengadilan/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan', mSejarah, 2);

      await insertMenu('Daftar Mantan Pimpinan', 'daftar-nama-mantan-pimpinan', 'page', '/tentang-pengadilan/daftar-nama-mantan-pimpinan', mProfil, 7);
      await insertMenu('Agenda Kegiatan Pimpinan', 'agenda-kerja-pimpinan', 'page', '/tentang-pengadilan/agenda-kerja-pimpinan', mProfil, 8);
      await insertMenu('Alamat & Kontak Pengadilan', 'alamat-pengadilan', 'page', '/tentang-pengadilan/alamat-pengadilan', mProfil, 9);

      const mSdm = await insertMenu('Profil Pegawai & SDM', 'profil-pegawai-sdm', 'dropdown', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua', mProfil, 10);
      await insertMenu('Ketua & Wakil Ketua', 'ketua-wakil-ketua', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua', mSdm, 1);
      await insertMenu('SDM Hakim', 'sdm-hakim', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/sdm-hakim', mSdm, 2);
      await insertMenu('SDM Kepaniteraan', 'kepaniteraann', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kepaniteraann', mSdm, 3);
      await insertMenu('SDM Kesekretariatan', 'sdm-kesekretariatan', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kesekretariatan', mSdm, 4);
      await insertMenu('SDM Fungsional & Pelaksana', 'fungsional-dan-pelaksana', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana', mSdm, 5);
      await insertMenu('Statistik Kepegawaian', 'statistik-kepegawaian', 'page', '/tentang-pengadilan/profile-pengadilan/statistik-kepegawaian', mSdm, 6);

      const mInfo = await insertMenu('Informasi Umum', 'informasi-umum', 'dropdown', null, null, 2);
      await insertMenu('Standar Operasional Prosedur (SOP)', 'standar-operasional-prosedur', 'page', '/informasi-umum/standar-operasional-prosedur', mInfo, 1);
      await insertMenu('Program Kerja Tahunan', 'program-kerja', 'page', '/informasi-umum/program-kerja', mInfo, 2);
      await insertMenu('Laporan Tahunan', 'laporan-tahunan', 'page', '/informasi-umum/laporan-tahunan', mInfo, 3);

      const mPanitera = await insertMenu('Kepaniteraan', 'kepaniteraan', 'dropdown', null, null, 3);
      const mPosbakum = await insertMenu('Pos Bantuan Hukum (Posbakum)', 'posbakum', 'dropdown', '/kepaniteraan/posbakum', mPanitera, 1);
      await insertMenu('Keberadaan Posbakum', 'keberadaan-posbakum', 'page', '/kepaniteraan/posbakum', mPosbakum, 1);
      await insertMenu('Syarat dan Mekanisme Posbakum', 'syarat-mekanisme-posbakum', 'page', '/kepaniteraan/posbakum', mPosbakum, 2);

      const mProdeo = await insertMenu('Perkara Prodeo (Cuma-Cuma)', 'prodeo', 'dropdown', '/kepaniteraan/prodeo', mPanitera, 2);
      await insertMenu('Prosedur Berperkara Prodeo', 'prosedur-prodeo', 'page', '/kepaniteraan/prodeo', mProdeo, 1);
      await insertMenu('Syarat & Dokumen Prodeo', 'syarat-prodeo', 'page', '/kepaniteraan/prodeo', mProdeo, 2);

      await insertMenu('Hak-Hak Para Pencari Keadilan', 'hak-pencari-keadilan', 'page', '/kepaniteraan/hak-pencari-keadilan', mPanitera, 3);
      await insertMenu('Prosedur Berperkara', 'prosedur-berperkara', 'page', '/kepaniteraan/prosedur-berperkara', mPanitera, 4);
      await insertMenu('e-Court (Berperkara Elektronik)', 'ecourt', 'page', '/kepaniteraan/ecourt', mPanitera, 5);
      await insertMenu('Mediasi Pengadilan', 'mediasi', 'page', '/kepaniteraan/mediasi', mPanitera, 6);
      await insertMenu('Jadwal Persidangan', 'jadwal-persidangan', 'page', '/kepaniteraan/jadwal-persidangan', mPanitera, 7);
      await insertMenu('Biaya Perkara', 'biaya-perkara', 'page', '/kepaniteraan/biaya-perkara', mPanitera, 8);

      const mSekretariat = await insertMenu('Kesekretariatan', 'kesekretariatan', 'dropdown', null, null, 4);
      await insertMenu('Pengadaan Barang dan Jasa', 'pengadaan-barang-dan-jasa', 'page', '/kesekretariatan/pengadaan-barang-dan-jasa', mSekretariat, 1);
      await insertMenu('DIPA', 'dipa', 'page', '/kesekretariatan/dipa', mSekretariat, 2);
      await insertMenu('SAKIP', 'sakip', 'page', '/kesekretariatan/sakip', mSekretariat, 3);
      await insertMenu('Daftar Aset dan Inventaris', 'daftar-aset-dan-inventaris', 'page', '/kesekretariatan/daftar-aset-dan-inventaris', mSekretariat, 4);
      await insertMenu('Survei Pelayanan Publik', 'survei-pelayanan-publik', 'page', '/kesekretariatan/survei-pelayanan-publik', mSekretariat, 5);

      const mLayanan = await insertMenu('Layanan Publik', 'layanan-publik', 'dropdown', null, null, 5);
      await insertMenu('Pelayanan Terpadu Satu Pintu (PTSP)', 'ptsp', 'page', '/layanan-publik/ptsp', mLayanan, 1);
      await insertMenu('Zona Integritas (WBK/WBBM)', 'zona-integritas', 'page', '/layanan-publik/zona-integritas', mLayanan, 2);
      await insertMenu('Layanan Pengaduan', 'layanan-pengaduan', 'page', '/layanan-publik/layanan-pengaduan', mLayanan, 3);
      await insertMenu('Layanan Informasi Publik (PPID)', 'layanan-informasi', 'page', '/layanan-publik/layanan-informasi', mLayanan, 4);
      await insertMenu('Fasilitas Publik & Jam Kerja', 'fasilitas-publik', 'page', '/layanan-publik/fasilitas-publik', mLayanan, 5);
      await insertMenu('Brosur Digital', 'brosur-digital', 'page', '/layanan-publik/brosur-digital', mLayanan, 6);
      await insertMenu('WhatsApp SILINCAH', 'wa-silincah', 'link', 'https://wa.me/6281121111522?text=Info%20Layanan', mLayanan, 7, true);
      await insertMenu('CCTV Online (ACO Badilag)', 'cctv-online', 'link', 'https://cctv.badilag.net/display/satker/3f0217881b5ba82ead3967e1032f6421', mLayanan, 8, true);

      const mPublikasi = await insertMenu('Publikasi', 'publikasi', 'dropdown', null, null, 6);
      await insertMenu('Berita Pengadilan', 'berita', 'page', '/publikasi/berita', mPublikasi, 1);
      await insertMenu('Pengumuman Resmi', 'pengumuman', 'page', '/publikasi/pengumuman', mPublikasi, 2);
      await insertMenu('Artikel Hukum & Opini', 'artikel', 'page', '/publikasi/artikel', mPublikasi, 3);
      await insertMenu('Peraturan & Kebijakan', 'peraturan-kebijakan', 'page', '/publikasi/peraturan-kebijakan', mPublikasi, 4);
      await insertMenu('Galeri Foto & Multimedia', 'galeri', 'page', '/publikasi/galeri', mPublikasi, 5);

      console.log('✅ Menu seeding complete!');
    }

    const [existingPages] = await connection.query('SELECT COUNT(*) as count FROM pages');
    if (existingPages[0].count === 0) {
      console.log('🌱 Seeding sample CMS page & content blocks...');
      const [pageRes] = await connection.query(
        `INSERT INTO pages (title, subtitle, slug, excerpt, status, seo_title, meta_description, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'published', ?, ?, NOW(), NOW())`,
        [
          'Sejarah Berdirinya Pengadilan Agama Kota Cimahi',
          'Kilasan Sejarah Perjalanan dan Perkembangan Peradilan Agama di Kota Cimahi',
          'sejarah-berdirinya-pengadilan',
          'Informasi lengkap mengenai sejarah dan landasan pembentukan Pengadilan Agama Kota Cimahi Kelas IA.',
          'Sejarah Berdirinya Pengadilan Agama Kota Cimahi',
          'Menelusuri sejarah pendirian, landasan hukum, dan pemekaran Pengadilan Agama Kota Cimahi.'
        ]
      );
      const pageId = pageRes.insertId;

      const blocks = [
        {
          type: 'heading',
          content: JSON.stringify({ text: 'Perjalanan Bersejarah Pengadilan Agama Kota Cimahi', level: 'h2' }),
          settings: JSON.stringify({ align: 'left' }),
          sort_order: 1
        },
        {
          type: 'text',
          content: JSON.stringify({
            html: '<p>Pengadilan Agama Kota Cimahi merupakan lembaga peradilan tingkat pertama di bawah Mahkamah Agung RI yang bertugas menyelenggarakan penegakan hukum dan keadilan bagi masyarakat pencari keadilan di wilayah Kota Cimahi dan sekitarnya.</p><p>Sejak awal berdirinya, Pengadilan Agama Kota Cimahi terus berkomitmen menghadirkan layanan peradilan yang modern, transparan, akuntabel, dan bebas dari korupsi.</p>'
          }),
          settings: JSON.stringify({}),
          sort_order: 2
        },
        {
          type: 'quote',
          content: JSON.stringify({
            quote: 'Peradilan yang agung adalah peradilan yang memadukan kepastian hukum, keadilan substantif, dan pelayanan berintegritas.',
            author: 'Pimpinan Pengadilan Agama Kota Cimahi'
          }),
          settings: JSON.stringify({ style: 'callout' }),
          sort_order: 3
        },
        {
          type: 'accordion',
          content: JSON.stringify({
            items: [
              {
                title: 'Kapan Pengadilan Agama Cimahi diresmikan?',
                content: 'Pengadilan Agama Cimahi dibentuk dan beroperasi berdasarkan peraturan perundang-undangan dan keputusan Mahkamah Agung RI guna melayani masyarakat pencari keadilan.'
              },
              {
                title: 'Apa saja wilayah yuridis yang dilayani?',
                content: 'Meliputi seluruh kecamatan dan kelurahan di Kota Cimahi serta penyesuaian wilayah pasca pemekaran satuan kerja.'
              }
            ]
          }),
          settings: JSON.stringify({}),
          sort_order: 4
        }
      ];

      for (const b of blocks) {
        await connection.query(
          `INSERT INTO content_blocks (page_id, type, content, settings, sort_order) VALUES (?, ?, ?, ?, ?)`,
          [pageId, b.type, b.content, b.settings, b.sort_order]
        );
      }
      console.log('✅ Sample page and content blocks seeded!');
    }

    console.log('🎉 Migration finished successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    connection.release();
  }
}

run();

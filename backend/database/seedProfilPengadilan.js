const pool = require('../config/db');

async function seed() {
  console.log('🌱 Starting Seed: Profil Pengadilan Menus & Pages...');
  const conn = await pool.getConnection();

  try {
    
    await conn.query(`
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

    await conn.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        menu_id INT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT NULL,
        content_html LONGTEXT NULL,
        status ENUM('draft', 'published', 'archived') DEFAULT 'published',
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

    await conn.query(`
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

    async function upsertMenu(title, slug, type, url, parentId = null, sortOrder = 0, description = '') {
      const [existing] = await conn.query('SELECT id FROM menus WHERE slug = ?', [slug]);
      if (existing.length > 0) {
        await conn.query(
          'UPDATE menus SET title = ?, type = ?, url = ?, parent_id = ?, sort_order = ?, status = "published", description = ? WHERE id = ?',
          [title, type, url, parentId, sortOrder, description, existing[0].id]
        );
        return existing[0].id;
      }
      const [res] = await conn.query(
        'INSERT INTO menus (title, slug, type, url, parent_id, sort_order, status, description) VALUES (?, ?, ?, ?, ?, ?, "published", ?)',
        [title, slug, type, url, parentId, sortOrder, description]
      );
      return res.insertId;
    }

    async function upsertPage(pageData) {
      const { menu_id, title, subtitle, slug, excerpt, content_html, seo_title, meta_description } = pageData;
      const [existing] = await conn.query('SELECT id FROM pages WHERE slug = ?', [slug]);
      if (existing.length > 0) {
        await conn.query(
          `UPDATE pages 
           SET menu_id = ?, title = ?, subtitle = ?, excerpt = ?, content_html = ?, status = 'published', seo_title = ?, meta_description = ?, updated_at = NOW()
           WHERE id = ?`,
          [menu_id, title, subtitle, excerpt, content_html, seo_title, meta_description, existing[0].id]
        );
        return existing[0].id;
      } else {
        const [res] = await conn.query(
          `INSERT INTO pages (menu_id, title, subtitle, slug, excerpt, content_html, status, seo_title, meta_description, author_id, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?, 1, NOW(), NOW())`,
          [menu_id, title, subtitle, slug, excerpt, content_html, seo_title, meta_description]
        );
        return res.insertId;
      }
    }

    console.log('📌 Creating Top-Level Navbar Menus...');
    const mProfil = await upsertMenu('Profil Pengadilan', 'profil-pengadilan', 'dropdown', null, null, 1, 'Informasi profil, visi misi, sejarah, struktur, dan aparatur pengadilan');
    const mInfo = await upsertMenu('Informasi Umum', 'informasi-umum', 'dropdown', null, null, 2, 'Standar operasional prosedur, program kerja dan laporan tahunan');
    const mPanitera = await upsertMenu('Kepaniteraan', 'kepaniteraan', 'dropdown', null, null, 3, 'Layanan perkara, posbakum, prodeo, mediasi, dan jadwal persidangan');
    const mSekretariat = await upsertMenu('Kesekretariatan', 'kesekretariatan', 'dropdown', null, null, 4, 'DIPA, SAKIP, pengadaan barang jasa, dan inventaris pengadilan');
    const mLayanan = await upsertMenu('Layanan Publik', 'layanan-publik', 'dropdown', null, null, 5, 'PTSP, Zona Integritas, pengaduan masyarakat, dan layanan informasi PPID');
    const mPublikasi = await upsertMenu('Publikasi', 'publikasi', 'dropdown', null, null, 6, 'Berita terkini, artikel hukum, pengumuman resmi, dan galeri multimedia');

    console.log('📌 Creating Submenus for Profil Pengadilan...');
    const smPengantar = await upsertMenu('Pengantar Ketua Pengadilan', 'pengantar-dari-ketua-pengadilan', 'page', '/tentang-pengadilan/pengantar-dari-ketua-pengadilan', mProfil, 1);
    const smVisiMisi = await upsertMenu('Visi dan Misi Pengadilan', 'visi-dan-misi', 'page', '/tentang-pengadilan/visi-dan-misi', mProfil, 2);
    const smTupoksi = await upsertMenu('Tugas Pokok & Fungsi', 'kekuasaan-dan-ruang-lingkup-pengadilan-agama', 'page', '/tentang-pengadilan/kekuasaan-dan-ruang-lingkup-pengadilan-agama', mProfil, 3);
    const smWilayah = await upsertMenu('Wilayah Yurisdiksi', 'wilayah-yurisdiksi', 'page', '/tentang-pengadilan/wilayah-yurisdiksi', mProfil, 4);
    const smStruktur = await upsertMenu('Struktur Organisasi', 'struktur-organisasi', 'page', '/tentang-pengadilan/struktur-organisasi', mProfil, 5);

    const smSejarah = await upsertMenu('Sejarah Pengadilan', 'sejarah-pengadilan', 'dropdown', '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan', mProfil, 6);
    const smSejarahTgl = await upsertMenu('Tanggal Pembentukan Pengadilan', 'tgl-pembentukan-pengadilan', 'page', '/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan', smSejarah, 1);
    const smSejarahSk = await upsertMenu('SK Pembentukan Pengadilan', 'sk-pembentukan-pengadilan', 'page', '/tentang-pengadilan/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan', smSejarah, 2);

    const smMantan = await upsertMenu('Daftar Mantan Pimpinan', 'daftar-nama-mantan-pimpinan', 'page', '/tentang-pengadilan/daftar-nama-mantan-pimpinan', mProfil, 7);
    const smAgenda = await upsertMenu('Agenda Kegiatan Pimpinan', 'agenda-kerja-pimpinan', 'page', '/tentang-pengadilan/agenda-kerja-pimpinan', mProfil, 8);
    const smAlamat = await upsertMenu('Alamat & Kontak Pengadilan', 'alamat-pengadilan', 'page', '/tentang-pengadilan/alamat-pengadilan', mProfil, 9);

    const smSdm = await upsertMenu('Profil Pegawai & SDM', 'profil-pegawai-sdm', 'dropdown', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua', mProfil, 10);
    const smKetuaWk = await upsertMenu('Ketua & Wakil Ketua', 'ketua-wakil-ketua', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua', smSdm, 1);
    const smHakim = await upsertMenu('SDM Hakim', 'sdm-hakim', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/sdm-hakim', smSdm, 2);
    const smKepaniteraan = await upsertMenu('SDM Kepaniteraan', 'kepaniteraann', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kepaniteraann', smSdm, 3);
    const smKesekretariatan = await upsertMenu('SDM Kesekretariatan', 'sdm-kesekretariatan', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/kesekretariatan', smSdm, 4);
    const smFungsional = await upsertMenu('SDM Fungsional & Pelaksana', 'fungsional-dan-pelaksana', 'page', '/tentang-pengadilan/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana', smSdm, 5);
    const smStatistikPeg = await upsertMenu('Statistik Kepegawaian', 'statistik-kepegawaian', 'page', '/tentang-pengadilan/profile-pengadilan/statistik-kepegawaian', smSdm, 6);

    await upsertMenu('Standar Operasional Prosedur (SOP)', 'standar-operasional-prosedur', 'page', '/informasi-umum/standar-operasional-prosedur', mInfo, 1);
    await upsertMenu('Program Kerja Tahunan', 'program-kerja', 'page', '/informasi-umum/program-kerja', mInfo, 2);
    await upsertMenu('Laporan Tahunan', 'laporan-tahunan', 'page', '/informasi-umum/laporan-tahunan', mInfo, 3);

    await upsertMenu('Pos Bantuan Hukum (Posbakum)', 'posbakum', 'page', '/kepaniteraan/posbakum', mPanitera, 1);
    await upsertMenu('Perkara Prodeo (Cuma-Cuma)', 'prodeo', 'page', '/kepaniteraan/prodeo', mPanitera, 2);
    await upsertMenu('Hak-Hak Para Pencari Keadilan', 'hak-pencari-keadilan', 'page', '/kepaniteraan/hak-pencari-keadilan', mPanitera, 3);
    await upsertMenu('Prosedur Berperkara', 'prosedur-berperkara', 'page', '/kepaniteraan/prosedur-berperkara', mPanitera, 4);
    await upsertMenu('e-Court (Berperkara Elektronik)', 'ecourt', 'page', '/kepaniteraan/ecourt', mPanitera, 5);
    await upsertMenu('Mediasi Pengadilan', 'mediasi', 'page', '/kepaniteraan/mediasi', mPanitera, 6);
    await upsertMenu('Jadwal Persidangan', 'jadwal-persidangan', 'page', '/kepaniteraan/jadwal-persidangan', mPanitera, 7);
    await upsertMenu('Biaya Perkara', 'biaya-perkara', 'page', '/kepaniteraan/biaya-perkara', mPanitera, 8);

    await upsertMenu('Pengadaan Barang dan Jasa', 'pengadaan-barang-dan-jasa', 'page', '/kesekretariatan/pengadaan-barang-dan-jasa', mSekretariat, 1);
    await upsertMenu('DIPA', 'dipa', 'page', '/kesekretariatan/dipa', mSekretariat, 2);
    await upsertMenu('SAKIP', 'sakip', 'page', '/kesekretariatan/sakip', mSekretariat, 3);
    await upsertMenu('Daftar Aset dan Inventaris', 'daftar-aset-dan-inventaris', 'page', '/kesekretariatan/daftar-aset-dan-inventaris', mSekretariat, 4);
    await upsertMenu('Survei Pelayanan Publik', 'survei-pelayanan-publik', 'page', '/kesekretariatan/survei-pelayanan-publik', mSekretariat, 5);

    await upsertMenu('Pelayanan Terpadu Satu Pintu (PTSP)', 'ptsp', 'page', '/layanan-publik/ptsp', mLayanan, 1);
    await upsertMenu('Zona Integritas (WBK/WBBM)', 'zona-integritas', 'page', '/layanan-publik/zona-integritas', mLayanan, 2);
    await upsertMenu('Layanan Pengaduan', 'layanan-pengaduan', 'page', '/layanan-publik/layanan-pengaduan', mLayanan, 3);
    await upsertMenu('Layanan Informasi Publik (PPID)', 'layanan-informasi', 'page', '/layanan-publik/layanan-informasi', mLayanan, 4);
    await upsertMenu('Fasilitas Publik & Jam Kerja', 'fasilitas-publik', 'page', '/layanan-publik/fasilitas-publik', mLayanan, 5);
    await upsertMenu('Brosur Digital', 'brosur-digital', 'page', '/layanan-publik/brosur-digital', mLayanan, 6);

    await upsertMenu('Berita Pengadilan', 'berita', 'page', '/publikasi/berita', mPublikasi, 1);
    await upsertMenu('Pengumuman Resmi', 'pengumuman', 'page', '/publikasi/pengumuman', mPublikasi, 2);
    await upsertMenu('Artikel Hukum & Opini', 'artikel', 'page', '/publikasi/artikel', mPublikasi, 3);
    await upsertMenu('Peraturan & Kebijakan', 'peraturan-kebijakan', 'page', '/publikasi/peraturan-kebijakan', mPublikasi, 4);
    await upsertMenu('Galeri Foto & Multimedia', 'galeri', 'page', '/publikasi/galeri', mPublikasi, 5);

    console.log('📌 Inserting Full CMS Pages for Profil Pengadilan...');

    await upsertPage({
      menu_id: smPengantar,
      title: 'Pengantar Ketua Pengadilan',
      subtitle: 'Sekapur Sirih dan Sambutan Resmi Ketua Pengadilan Agama Kota Cimahi Kelas IA',
      slug: 'pengantar-dari-ketua-pengadilan',
      excerpt: 'Sekapur sirih dan sambutan resmi Ketua Pengadilan Agama Kota Cimahi mengenai komitmen reformasi birokrasi, integritas yudisial, dan pelayanan prima bagi masyarakat pencari keadilan.',
      seo_title: 'Pengantar Ketua Pengadilan | PA Kota Cimahi',
      meta_description: 'Sambutan resmi Ketua Pengadilan Agama Kota Cimahi menyongsong peradilan modern berbasis teknologi informasi.',
      content_html: `
        <div class="pa-callout">
          <h4>⚖️ Landasan Konstitusional Yudikatif</h4>
          <p><em>"Kekuasaan kehakiman dilakukan oleh sebuah Mahkamah Agung dan badan peradilan yang berada di bawahnya dalam Lingkungan Peradilan Umum, Lingkungan Peradilan Agama, Lingkungan Peradilan Militer, Lingkungan Peradilan Tata Usaha Negara, dan oleh sebuah Mahkamah Konstitusi."</em><br />
          <strong>— Pasal 24 ayat (2) UUD Negara Republik Indonesia Tahun 1945</strong></p>
        </div>

        <p><strong>Assalamu’alaikum Warahmatullahi Wabarakatuh,</strong><br />
        Salam sejahtera bagi kita semua, <em>Om Swastiastu, Namo Buddhaya, Salam Kebajikan.</em></p>

        <p>Puji dan syukur senantiasa kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat, taufik, dan hidayah-Nya, sehingga website resmi Pengadilan Agama Kota Cimahi Kelas IA ini dapat terus hadir dan bertransformasi melayani masyarakat.</p>

        <p>Pengadilan Agama Kota Cimahi berkomitmen mewujudkan peradilan agama yang <strong>Agung, Modern, Akuntabel, dan Transparan</strong>. Di era digital saat ini, keterbukaan informasi publik bukan lagi sekadar kewajiban administratif, melainkan wujud nyata dedikasi kami untuk mempermudah akses keadilan bagi seluruh lapisan masyarakat, khususnya warga Kota Cimahi.</p>

        <h2>Pilar Reformasi dan Transformasi Digital</h2>
        <p>Dalam menjalankan roda peradilan, kami senantiasa berpedoman pada prinsip keterbukaan dan modernisasi yang dicanangkan oleh Mahkamah Agung Republik Indonesia melalui berbagai inovasi unggulan:</p>
        <ul>
          <li><strong>Penerapan e-Court & e-Litigation:</strong> Pendaftaran perkara, pembayaran panjar biaya perkara secara virtual account, pemanggilan elektronik, hingga persidangan daring yang cepat dan berbiaya ringan.</li>
          <li><strong>Pelayanan Terpadu Satu Pintu (PTSP):</strong> Memberikan layanan prima dengan standar operasional yang ramah, cepat, bebas pungutan liar, dan bebas calo peradilan.</li>
          <li><strong>Pembangunan Zona Integritas (WBK & WBBM):</strong> Seluruh aparatur berkomitmen mewujudkan birokrasi yang bersih dan melayani secara tulus dan berintegritas.</li>
          <li><strong>Layanan Inklusif dan Ramah Disabilitas:</strong> Menyediakan sarana prasarana khusus bagi kelompok rentan, lansia, ibu hamil, serta penyandang disabilitas demi menjamin asas <em>Justice for All</em>.</li>
        </ul>

        <div class="pa-quote">
          <blockquote>"Keadilan bukan hanya harus ditegakkan di ruang sidang, namun juga harus dirasakan manfaat dan kemudahannya oleh setiap warga masyarakat dalam setiap tahapan pelayanan."</blockquote>
        </div>

        <p>Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh pihak dan masyarakat atas kepercayaan dan dukungannya. Masukan, saran, dan kritik yang membangun senantiasa kami nantikan demi kesempurnaan pelayanan kami di masa yang akan datang.</p>

        <p><strong>Wassalamu’alaikum Warahmatullahi Wabarakatuh.</strong></p>
      `
    });

    await upsertPage({
      menu_id: smVisiMisi,
      title: 'Visi dan Misi Pengadilan',
      subtitle: 'Komitmen Visi, Misi, dan 8 Nilai Utama Mahkamah Agung RI di PA Kota Cimahi',
      slug: 'visi-dan-misi',
      excerpt: 'Visi dan Misi Pengadilan Agama Kota Cimahi sebagai pedoman arah kebijakan peradilan yang agung, berintegritas, dan melayani.',
      seo_title: 'Visi dan Misi | Pengadilan Agama Kota Cimahi',
      meta_description: 'Visi, misi, dan nilai-nilai luhur kepemimpinan Pengadilan Agama Kota Cimahi Kelas IA.',
      content_html: `
        <h2>Visi Pengadilan Agama Kota Cimahi</h2>
        <div class="pa-callout" style="text-align: center; font-size: 1.15rem; font-weight: 600; color: #0b4619;">
          "Terwujudnya Pengadilan Agama Kota Cimahi yang Agung"
        </div>

        <h2>Misi Pengadilan Agama Kota Cimahi</h2>
        <ol>
          <li><strong>Menjaga Kemandirian Pengadilan:</strong> Memastikan independensi badan peradilan dalam menegakkan hukum dan keadilan tanpa intervensi pihak manapun.</li>
          <li><strong>Memberikan Pelayanan Hukum yang Berkeadilan:</strong> Menghadirkan putusan yang berkualitas, proses persidangan yang transparan, tepat waktu, dan berorientasi pada kepuasan pencari keadilan.</li>
          <li><strong>Meningkatkan Kualitas Kepemimpinan Pengadilan:</strong> Mewujudkan tata kelola organisasi yang adaptif, profesional, visioner, dan akuntabel di seluruh jajaran peradilan.</li>
          <li><strong>Meningkatkan Kredibilitas dan Transparansi:</strong> Menjamin akses keterbukaan informasi publik yang komprehensif, berbasis teknologi informasi modern, dan bebas dari praktik KKN.</li>
        </ol>

        <hr />

        <h2>8 Nilai Utama Mahkamah Agung Republik Indonesia</h2>
        <p>Seluruh aparatur Pengadilan Agama Kota Cimahi dalam bertugas senantiasa menjunjung tinggi 8 (delapan) Nilai Utama Badan Peradilan:</p>
        <ul>
          <li><strong>1. Kemandirian (Independence):</strong> Bebas dari campur tangan pihak luar dalam memeriksa dan memutus perkara.</li>
          <li><strong>2. Integritas (Integrity):</strong> Bertindak konsisten, jujur, dan berpegang teguh pada kode etik serta prinsip moral.</li>
          <li><strong>3. Kejujuran (Honesty):</strong> Senantiasa mengedepankan kebenaran dan keikhlasan dalam setiap pengabdian.</li>
          <li><strong>4. Akuntabilitas (Accountability):</strong> Bertanggung jawab penuh atas setiap pelaksanaan tugas, program kerja, dan penggunaan anggaran negara.</li>
          <li><strong>5. Responsibilitas (Responsibility):</strong> Cepat tanggap terhadap kebutuhan masyarakat dan perkembangan dinamika hukum.</li>
          <li><strong>6. Keterbukaan (Transparency):</strong> Menjamin akses publik terhadap informasi perkara dan kebijakan pengadilan.</li>
          <li><strong>7. Ketidakberpihakan (Impartiality):</strong> Memperlakukan semua pihak secara adil tanpa diskriminasi suku, agama, ras, maupun status sosial.</li>
          <li><strong>8. Perlakuan yang Sama di Depan Hukum (Equality before the Law):</strong> Menjaga kesetaraan hak setiap warga negara dalam proses peradilan.</li>
        </ul>

        <h2>Maklumat Pelayanan</h2>
        <div class="pa-callout">
          <p><em>"Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku."</em></p>
        </div>
      `
    });

    await upsertPage({
      menu_id: smTupoksi,
      title: 'Tugas Pokok & Fungsi Pengadilan Agama',
      subtitle: 'Kekuasaan, Wewenang, dan Ruang Lingkup Peradilan Berdasarkan Undang-Undang',
      slug: 'kekuasaan-dan-ruang-lingkup-pengadilan-agama',
      excerpt: 'Tugas pokok dan fungsi yustisial serta ruang lingkup kewenangan absolut Pengadilan Agama berdasarkan UU No. 7 Tahun 1989 jo UU No. 50 Tahun 2009.',
      seo_title: 'Tugas Pokok dan Fungsi | Pengadilan Agama Kota Cimahi',
      meta_description: 'Tugas pokok, fungsi, dan wewenang mengadili perkara di Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Landasan Hukum Pembentukan & Tugas Pokok</h2>
        <p>Berdasarkan <strong>Undang-Undang Nomor 7 Tahun 1989</strong> tentang Peradilan Agama sebagaimana telah diubah dengan <strong>Undang-Undang Nomor 3 Tahun 2006</strong> dan perubahan kedua dengan <strong>Undang-Undang Nomor 50 Tahun 2009</strong>, Pengadilan Agama adalah salah satu pelaku kekuasaan kehakiman bagi rakyat pencari keadilan yang beragama Islam.</p>

        <p><strong>Tugas Pokok Pengadilan Agama:</strong> Memeriksa, memutus, dan menyelesaikan perkara-perkara di tingkat pertama antara orang-orang yang beragama Islam di bidang hukum perdata tertentu.</p>

        <h2>Kewenangan Absolut (Pasal 49 UU No. 3/2006)</h2>
        <p>Pengadilan Agama bertugas dan berwenang memeriksa, memutus, dan menyelesaikan perkara di tingkat pertama antara orang-orang yang beragama Islam dalam bidang:</p>
        <ol>
          <li><strong>Perkawinan:</strong> Izin poligami, dispensasi kawin, gugatan cerai/talak, pembatalan nikah, nafkah iddah & mut'ah, hak asuh anak (hadhanah), pengesahan nikah (itsbat nikah), dan asal usul anak.</li>
          <li><strong>Kewarisan:</strong> Penentuan siapa yang menjadi ahli waris, penentuan harta peninggalan, dan pembagian harta warisan.</li>
          <li><strong>Wasiat:</strong> Pengesahan dan pembatalan surat wasiat.</li>
          <li><strong>Hibah:</strong> Sengketa atau pengesahan pemberian benda/harta secara cuma-cuma.</li>
          <li><strong>Wakaf:</strong> Pengelolaan, pensertifikatan, dan penyelesaian sengketa harta benda wakaf.</li>
          <li><strong>Zakat:</strong> Pengelolaan dan penyelesaian hak amil zakat.</li>
          <li><strong>Infaq & Shadaqah:</strong> Sengketa kepemilikan dan pengelolaan dana infaq/shadaqah.</li>
          <li><strong>Ekonomi Syariah:</strong> Sengketa perbankan syariah, asuransi syariah, reasuransi syariah, reksadana syariah, obligasi & sukuk syariah, pembiayaan syariah, pegadaian syariah, dan bisnis syariah lainnya.</li>
        </ol>

        <h2>Fungsi Strategis Pengadilan Agama</h2>
        <ul>
          <li><strong>Fungsi Mengadili (Judicial):</strong> Menerima, memeriksa, mengadili, dan menyelesaikan perkara yang diajukan ke pengadilan.</li>
          <li><strong>Fungsi Pembinaan:</strong> Memberikan pengarahan, bimbingan, dan petunjuk kepada jajaran aparatur struktural maupun fungsional.</li>
          <li><strong>Fungsi Pengawasan:</strong> Mengawasi jalannya peradilan dan tingkah laku aparat peradilan sesuai kode etik pedoman perilaku hakim dan pegawai.</li>
          <li><strong>Fungsi Administratif:</strong> Menyelenggarakan administrasi umum, perencanaan, kepegawaian, keuangan, dan kearsipan peradilan.</li>
          <li><strong>Fungsi Memberikan Keterangan / Hisab Rukyat:</strong> Memberikan pertimbangan hukum serta penetapan hisab rukyat hilal awal bulan qamariyah.</li>
        </ul>
      `
    });

    await upsertPage({
      menu_id: smWilayah,
      title: 'Wilayah Yurisdiksi Pengadilan Agama Kota Cimahi',
      subtitle: 'Cakupan Wilayah Hukum, Batas Geografis, dan Wilayah Pelayanan Pengadilan',
      slug: 'wilayah-yurisdiksi',
      excerpt: 'Wilayah hukum dan batas administratif pelayanan Pengadilan Agama Kota Cimahi meliputi 3 kecamatan dan 15 kelurahan.',
      seo_title: 'Wilayah Yurisdiksi | Pengadilan Agama Kota Cimahi',
      meta_description: 'Wilayah yurisdiksi hukum dan cakupan kecamatan di lingkungan Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Cakupan Wilayah Hukum</h2>
        <p>Wilayah hukum Pengadilan Agama Kota Cimahi Kelas IA meliputi seluruh wilayah administratif Kota Cimahi yang terdiri dari <strong>3 (tiga) Kecamatan</strong> dan <strong>15 (lima belas) Kelurahan</strong>:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <thead>
            <tr style="background: #0b4619; color: #fff;">
              <th style="padding: 10px; border: 1px solid #ddd;">No</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Kecamatan</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Daftar Kelurahan</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Radius Biaya Perkara</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Cimahi Selatan</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Cibeber, Cibeureum, Leuwigajah, Melong, Utama</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Radius I</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Cimahi Tengah</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Baros, Cigugur Tengah, Karangmekar, Padasuka, Setiamanah, Cimahi</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Radius I</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Cimahi Utara</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Cibabat, Cipageran, Citeureup, Pasirkaliki</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Radius I / II</td>
            </tr>
          </tbody>
        </table>

        <h2>Batas Wilayah Geografis</h2>
        <ul>
          <li><strong>Sebelah Utara:</strong> Berbatasan dengan Kecamatan Parongpong, Kabupaten Bandung Barat</li>
          <li><strong>Sebelah Selatan:</strong> Berbatasan dengan Kecamatan Margaasih, Kabupaten Bandung</li>
          <li><strong>Sebelah Barat:</strong> Berbatasan dengan Kecamatan Padalarang dan Batujajar, Kabupaten Bandung Barat</li>
          <li><strong>Sebelah Timur:</strong> Berbatasan dengan Kota Bandung (Kecamatan Sukasari, Andir, Cicendo, dan Bandung Kulon)</li>
        </ul>

        <div class="pa-callout">
          <p><strong>Catatan Yurisdiksi:</strong> Bagi masyarakat yang berdomisili di wilayah Kabupaten Bandung Barat, pelayanan perkara dilayani oleh Pengadilan Agama Ngamprah sesuai dengan wilayah pemekaran yurisdiksi.</p>
        </div>
      `
    });

    await upsertPage({
      menu_id: smStruktur,
      title: 'Struktur Organisasi',
      subtitle: 'Bagan dan Susunan Organisasi Pengadilan Agama Kota Cimahi Kelas IA',
      slug: 'struktur-organisasi',
      excerpt: 'Struktur kepemimpinan, jajaran kepaniteraan, dan kesekretariatan Pengadilan Agama Kota Cimahi.',
      seo_title: 'Struktur Organisasi | Pengadilan Agama Kota Cimahi',
      meta_description: 'Bagan struktur organisasi pimpinan, hakim, kepaniteraan, dan kesekretariatan Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Bagan Struktur Organisasi</h2>
        <p>Struktur Organisasi Pengadilan Agama Kota Cimahi disusun berdasarkan Peraturan Mahkamah Agung RI Nomor 7 Tahun 2015 tentang Organisasi dan Tata Kerja Kepaniteraan dan Kesekretariatan Peradilan.</p>

        <div style="background: #f8fafc; border: 2px dashed #0b4619; border-radius: 8px; padding: 2rem; text-align: center; margin: 1.5rem 0;">
          <h3 style="color: #0b4619; margin-bottom: 0.5rem;">Pimpinan Pengadilan</h3>
          <p style="margin: 0; font-weight: bold;">Ketua Pengadilan Agama Kota Cimahi</p>
          <p style="margin: 0; color: #6b7280;">Wakil Ketua Pengadilan Agama Kota Cimahi</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 1.5rem;">
            <h4 style="color: #065f46; margin-top: 0;">Jajaran Kepaniteraan (Teknis Yustisial)</h4>
            <p><strong>Panitera</strong></p>
            <ul>
              <li>Panitera Muda Gugatan</li>
              <li>Panitera Muda Permohonan</li>
              <li>Panitera Muda Hukum</li>
              <li>Panitera Pengganti</li>
              <li>Jurusita & Jurusita Pengganti</li>
            </ul>
          </div>
          <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
            <h4 style="color: #1e40af; margin-top: 0;">Jajaran Kesekretariatan (Operasional)</h4>
            <p><strong>Sekretaris</strong></p>
            <ul>
              <li>Sub Bagian Umum & Keuangan</li>
              <li>Sub Bagian Kepegawaian, Organisasi & Tata Laksana</li>
              <li>Sub Bagian Perencanaan, TI, dan Pelaporan</li>
              <li>Pejabat Fungsional & Pengelola IT</li>
            </ul>
          </div>
        </div>

        <h2>Majelis Hakim & Hakim Pengawas Bidang (Hawasbid)</h2>
        <p>Di bawah pembinaan Ketua Pengadilan, Majelis Hakim menjalankan fungsi yudisial mengadili perkara, serta mengemban tugas sebagai Hakim Pengawas Bidang (Hawasbid) untuk memastikan standar mutu pelayanan di setiap sub-bagian tetap terjaga.</p>
      `
    });

    await upsertPage({
      menu_id: smSejarahTgl,
      title: 'Tanggal Pembentukan Pengadilan',
      subtitle: 'Napak Tilas dan Kilasan Sejarah Perjalanan PA Cimahi dari Masa ke Masa',
      slug: 'tgl-pembentukan-pengadilan',
      excerpt: 'Sejarah berdirinya Pengadilan Agama Cimahi, perintisan, penetapan status kelas, hingga menjadi Pengadilan Kelas IA.',
      seo_title: 'Tanggal Pembentukan Pengadilan | PA Kota Cimahi',
      meta_description: 'Sejarah dan tanggal pembentukan Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Sejarah Perintisan Pengadilan Agama Cimahi</h2>
        <p>Pengadilan Agama Cimahi memiliki sejarah panjang dalam memberikan pelayanan hukum bagi masyarakat Kota Cimahi dan sekitarnya. Sejak awal berdirinya, keberadaan badan peradilan agama di wilayah ini dirintis untuk memenuhi kebutuhan masyarakat pencari keadilan di bidang hukum perdata Islam.</p>

        <h2>Kronologi Perkembangan Satuan Kerja</h2>
        <ul>
          <li><strong>Masa Perintisan:</strong> Pelayanan peradilan agama mulanya melayani wilayah kewedanaan dan pembantu pengadilan di kawasan Bandung Barat dan Cimahi.</li>
          <li><strong>Peningkatan Status:</strong> Dengan meningkatnya volume perkara dan laju pertumbuhan penduduk Kota Cimahi, pengadilan ini mengalami kenaikan kelas bertahap dari Pengadilan Agama Kelas II, kemudian Kelas IB, hingga saat ini berstatus <strong>Pengadilan Agama Kelas IA</strong>.</li>
          <li><strong>Pemekaran Wilayah:</strong> Pasca berdirinya Kabupaten Bandung Barat, cakupan perkara sempat melayani 2 wilayah otonom sebelum akhirnya terjadi pemekaran dengan berdirinya Pengadilan Agama Ngamprah. Saat ini, Pengadilan Agama Kota Cimahi berfokus secara prima memberikan pelayanan bagi seluruh warga Kota Cimahi.</li>
        </ul>

        <div class="pa-callout">
          <h4>🏛️ Komitmen Berkelanjutan</h4>
          <p>Dari masa ke masa, Pengadilan Agama Kota Cimahi terus bertransformasi menuju peradilan modern berkelas dunia dengan menerapkan digitalisasi terintegrasi dan budaya pelayanan prima 5S (Senyum, Salam, Sapa, Sopan, Santun).</p>
        </div>
      `
    });

    await upsertPage({
      menu_id: smSejarahSk,
      title: 'Surat Keputusan Pembentukan Pengadilan',
      subtitle: 'Landasan Yuridis dan Keputusan Resmi Pembentukan Pengadilan Agama',
      slug: 'sk-pembentukan-pengadilan',
      excerpt: 'Dokumen dan dasar hukum pembentukan serta kenaikan kelas Pengadilan Agama Kota Cimahi.',
      seo_title: 'SK Pembentukan Pengadilan | PA Kota Cimahi',
      meta_description: 'Landasan Surat Keputusan (SK) dan Keputusan Presiden pembentukan Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Dasar Hukum dan Dokumen SK</h2>
        <p>Operasionalisasi dan pembentukan Pengadilan Agama Kota Cimahi bersandar pada keputusan-keputusan resmi kenegaraan dan Mahkamah Agung Republik Indonesia:</p>

        <ol>
          <li><strong>Undang-Undang Nomor 7 Tahun 1989 jo UU Nomor 50 Tahun 2009:</strong> Tentang Peradilan Agama di lingkungan Mahkamah Agung RI.</li>
          <li><strong>Keputusan Presiden Republik Indonesia:</strong> Terkait pembentukan pengadilan tingkat pertama di lingkungan peradilan agama.</li>
          <li><strong>Surat Keputusan Mahkamah Agung RI:</strong> Terkait penetapan kenaikan kelas satuan kerja menjadi Pengadilan Agama Kelas IA.</li>
        </ol>

        <h2>Arsip Keputusan Satker</h2>
        <p>Dokumen legalitas pembentukan satuan kerja disimpan dan dipelihara secara digital dalam Pustaka Dokumen resmi satuan kerja sebagai bukti otentik sejarah kelembagaan pengadilan.</p>
      `
    });

    await upsertPage({
      menu_id: smMantan,
      title: 'Daftar Nama Mantan Pimpinan',
      subtitle: 'Tokoh-Tokoh Pemimpin dan Pengabdi yang Pernah Memimpin PA Kota Cimahi',
      slug: 'daftar-nama-mantan-pimpinan',
      excerpt: 'Daftar nama Ketua dan Wakil Ketua Pengadilan Agama Kota Cimahi dari masa ke masa.',
      seo_title: 'Daftar Mantan Pimpinan | PA Kota Cimahi',
      meta_description: 'Daftar nama mantan pimpinan dan riwayat kepemimpinan Ketua PA Kota Cimahi.',
      content_html: `
        <h2>Riwayat Kepemimpinan Ketua Pengadilan Agama Kota Cimahi</h2>
        <p>Berikut adalah para pimpinan yang telah mendedikasikan tenaga dan pikirannya dalam memajukan Pengadilan Agama Kota Cimahi:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <thead>
            <tr style="background: #0b4619; color: #fff;">
              <th style="padding: 10px; border: 1px solid #ddd;">No</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Nama Pimpinan</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Jabatan</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Periode Menjabat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Drs. H. Pimpinan Terdahulu, S.H., M.H.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Ketua Pengadilan Agama</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Periode Perintis</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Drs. H. Pimpinan Kedua, M.H.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Ketua Pengadilan Agama</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Periode 2012 - 2016</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Drs. H. Pimpinan Ketiga, S.H.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Ketua Pengadilan Agama</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Periode 2016 - 2020</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">4</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Dr. H. Pimpinan Keempat, S.Ag., M.H.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Ketua Pengadilan Agama</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Periode 2020 - 2024</td>
            </tr>
          </tbody>
        </table>

        <p>Jasa dan warisan integritas para mantan pimpinan menjadi fondasi kokoh bagi kemajuan dan kehormatan Pengadilan Agama Kota Cimahi hingga saat ini.</p>
      `
    });

    await upsertPage({
      menu_id: smAgenda,
      title: 'Agenda Kegiatan Pimpinan',
      subtitle: 'Transparansi Rencana dan Realisasi Jadwal Kegiatan Pimpinan Pengadilan',
      slug: 'agenda-kerja-pimpinan',
      excerpt: 'Agenda kegiatan, rapat koordinasi, audiensi publik, dan pengawasan berkala pimpinan PA Kota Cimahi.',
      seo_title: 'Agenda Kerja Pimpinan | PA Kota Cimahi',
      meta_description: 'Agenda dan jadwal kerja resmi Ketua dan Wakil Ketua Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Rangkaian Kegiatan Rutin Pimpinan</h2>
        <p>Sebagai wujud transparansi dan akuntabilitas kepemimpinan kepada publik, berikut adalah agenda kerja berkala pimpinan Pengadilan Agama Kota Cimahi:</p>

        <ul>
          <li><strong>Rapat Koordinasi Bulanan:</strong> Evaluasi kinerja kesekretariatan dan kepaniteraan setiap awal bulan.</li>
          <li><strong>Briefing Petugas PTSP & Keamanan:</strong> Pengarahan prima etika pelayanan setiap hari Senin pagi sebelum jam operasional dimulai.</li>
          <li><strong>Rapat Evaluasi SIPP & Mediasi:</strong> Pemantauan rasio penyelesaian perkara dan tingkat keberhasilan mediasi setiap pekan.</li>
          <li><strong>Audiensi dan Koordinasi Forkopimda:</strong> Kerja sama terpadu dengan Walikota Cimahi, Kejaksaan Negeri, Kepolisian, dan instansi vertikal lainnya.</li>
          <li><strong>Pembinaan dan Pengawasan Internal:</strong> Pemeriksaan berkala terhadap keteraturan administrasi berkas perkara dan buku register peradilan.</li>
        </ul>
      `
    });

    await upsertPage({
      menu_id: smAlamat,
      title: 'Alamat & Kontak Pengadilan',
      subtitle: 'Informasi Lokasi Gedung Kantor, Saluran Komunikasi Resmi, dan Jam Operasional',
      slug: 'alamat-pengadilan',
      excerpt: 'Lokasi gedung kantor Pengadilan Agama Kota Cimahi, peta penunjuk arah, nomor telepon, WhatsApp, dan jam pelayanan.',
      seo_title: 'Alamat dan Kontak | Pengadilan Agama Kota Cimahi',
      meta_description: 'Alamat lengkap kantor Pengadilan Agama Kota Cimahi, nomor telepon, dan jam kerja pelayanan PTSP.',
      content_html: `
        <h2>Lokasi Kantor Pengadilan Agama Kota Cimahi</h2>
        <p>Gedung kantor Pengadilan Agama Kota Cimahi Kelas IA berlokasi di titik strategis Kota Cimahi dengan akses transportasi umum yang mudah dijangkau:</p>

        <div class="pa-callout">
          <h4>📍 Alamat Kantor</h4>
          <p><strong>Jl. Encep Kartawiria No. 28, Cimahi Tengah, Kota Cimahi, Jawa Barat 40526</strong><br />
          (Satu kawasan dengan pusat pelayanan publik Pemerintah Kota Cimahi)</p>
        </div>

        <h2>Saluran Komunikasi Resmi</h2>
        <ul>
          <li><strong>Telepon Kantor:</strong> (022) 6631 334</li>
          <li><strong>WhatsApp Layanan Informasi (SILINCAH):</strong> +62 812-3456-7890</li>
          <li><strong>Email Resmi:</strong> info@pa-cimahi.go.id / pengadilanagamacimahi@gmail.com</li>
          <li><strong>Website:</strong> https://pa-cimahi.go.id</li>
        </ul>

        <h2>Jam Kerja Pelayanan PTSP</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
          <thead>
            <tr style="background: #0b4619; color: #fff;">
              <th style="padding: 10px; border: 1px solid #ddd;">Hari</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Jam Pelayanan</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Waktu Istirahat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Senin - Kamis</td>
              <td style="padding: 8px; border: 1px solid #ddd;">08.00 - 16.30 WIB</td>
              <td style="padding: 8px; border: 1px solid #ddd;">12.00 - 13.00 WIB</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Jumat</td>
              <td style="padding: 8px; border: 1px solid #ddd;">07.30 - 16.30 WIB</td>
              <td style="padding: 8px; border: 1px solid #ddd;">11.30 - 13.00 WIB</td>
            </tr>
          </tbody>
        </table>
      `
    });

    await upsertPage({
      menu_id: smKetuaWk,
      title: 'Profil Ketua & Wakil Ketua Pengadilan',
      subtitle: 'Biografi Singkat, Profil Pendidikan, dan Riwayat Karir Pimpinan Pengadilan',
      slug: 'ketua-wakil-ketua',
      excerpt: 'Profil lengkap Ketua dan Wakil Ketua Pengadilan Agama Kota Cimahi Kelas IA.',
      seo_title: 'Ketua dan Wakil Ketua | PA Kota Cimahi',
      meta_description: 'Profil pimpinan Ketua dan Wakil Ketua Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Profil Pimpinan Pengadilan Agama Kota Cimahi</h2>
        <p>Pimpinan Pengadilan Agama Kota Cimahi senantiasa memegang teguh integritas, kepemimpinan transformasional, dan profesionalisme yudisial dalam memimpin satuan kerja.</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
            <h3 style="color: #0b4619; margin-top: 0;">Ketua Pengadilan</h3>
            <p><strong>Nama:</strong> Dr. H. Pimpinan Ketua, S.Ag., M.H.</p>
            <p><strong>NIP:</strong> 19700101 199603 1 001</p>
            <p><strong>Pangkat / Golongan:</strong> Pembina Utama Madya (IV/d)</p>
            <p><strong>Pendidikan Terakhir:</strong> Doktor Ilmu Hukum (S3)</p>
            <p><strong>Motto Kepemimpinan:</strong> <em>"Integritas adalah mahkota hakim, pelayanan adalah wujud ibadah."</em></p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
            <h3 style="color: #0b4619; margin-top: 0;">Wakil Ketua Pengadilan</h3>
            <p><strong>Nama:</strong> Dra. Hj. Wakil Ketua, S.H., M.H.</p>
            <p><strong>NIP:</strong> 19720505 199803 2 002</p>
            <p><strong>Pangkat / Golongan:</strong> Pembina Utama Muda (IV/c)</p>
            <p><strong>Pendidikan Terakhir:</strong> Magister Hukum (S2)</p>
            <p><strong>Motto Kepemimpinan:</strong> <em>"Tegas menegakkan hukum, santun dalam melayani sesama."</em></p>
          </div>
        </div>
      `
    });

    await upsertPage({
      menu_id: smHakim,
      title: 'Profil SDM Hakim Pengadilan',
      subtitle: 'Daftar Majelis Hakim Pengadilan Agama Kota Cimahi Kelas IA',
      slug: 'sdm-hakim',
      excerpt: 'Daftar nama, riwayat pendidikan, dan profil para Hakim di Pengadilan Agama Kota Cimahi.',
      seo_title: 'SDM Hakim | Pengadilan Agama Kota Cimahi',
      meta_description: 'Profil Hakim Madya dan Hakim Pengadilan Agama Kota Cimahi.',
      content_html: `
        <h2>Majelis Hakim Pengadilan Agama Kota Cimahi</h2>
        <p>Majelis Hakim bertugas mengadili dan memeriksa perkara dengan independen, mengedepankan pembuktian substantif, dan senantiasa berpedoman pada Kode Etik dan Pedoman Perilaku Hakim (KEPPH).</p>

        <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <thead>
            <tr style="background: #0b4619; color: #fff;">
              <th style="padding: 10px; border: 1px solid #ddd;">No</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Nama Hakim</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Pangkat / Golongan</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Jabatan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Drs. H. Hakim Senior Satu, M.H.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Pembina Utama Madya (IV/d)</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Hakim Utama / Hawasbid Teknis</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">H. Hakim Anggota Dua, S.H.I., M.S.I.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Pembina Utama Muda (IV/c)</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Hakim Madya / Mediator Bersertifikat</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Hj. Hakim Anggota Tiga, S.Ag., M.H.</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Pembina Tingkat I (IV/b)</td>
              <td style="padding: 8px; border: 1px solid #ddd;">Hakim Madya / Humas Pengadilan</td>
            </tr>
          </tbody>
        </table>
      `
    });

    await upsertPage({
      menu_id: smKepaniteraan,
      title: 'Profil SDM Kepaniteraan',
      subtitle: 'Aparatur Teknis Yustisial, Panitera Muda, Panitera Pengganti, dan Jurusita',
      slug: 'kepaniteraann',
      excerpt: 'Aparatur teknis kepaniteraan Pengadilan Agama Kota Cimahi.',
      seo_title: 'SDM Kepaniteraan | Pengadilan Agama Kota Cimahi',
      meta_description: 'Profil Panitera, Panitera Muda, Panitera Pengganti, dan Jurusita PA Cimahi.',
      content_html: `
        <h2>Jajaran Kepaniteraan</h2>
        <p>Kepaniteraan dipimpin oleh Panitera yang bertindak mengoordinasikan seluruh administrasi pendaftaran perkara, persidangan, hingga eksekusi putusan.</p>
        <ul>
          <li><strong>Panitera:</strong> Bertanggung jawab langsung kepada Ketua Pengadilan atas ketertiban administrasi perkara.</li>
          <li><strong>Panitera Muda Gugatan:</strong> Melayani pendaftaran perkara gugatan dan administrasi pra-sidang.</li>
          <li><strong>Panitera Muda Permohonan:</strong> Mengelola permohonan voluntair (itsbat nikah, perwalian, dll).</li>
          <li><strong>Panitera Muda Hukum:</strong> Mengelola statistik perkara, laporan bulanan, dan pelayanan informasi putusan.</li>
          <li><strong>Jurusita / Jurusita Pengganti:</strong> Menyampaikan relaas panggilan sidang dan pemberitahuan putusan ke alamat para pihak secara resmi dan patut.</li>
        </ul>
      `
    });

    await upsertPage({
      menu_id: smKesekretariatan,
      title: 'Profil SDM Kesekretariatan',
      subtitle: 'Aparatur Pengelola Anggaran, Kepegawaian, Tata Laksana, dan Teknologi Informasi',
      slug: 'kesekretariatan',
      excerpt: 'Profil jajaran Kesekretariatan Pengadilan Agama Kota Cimahi.',
      seo_title: 'SDM Kesekretariatan | Pengadilan Agama Kota Cimahi',
      meta_description: 'Profil Sekretaris, Kasubbag, dan staf pelaksana kesekretariatan PA Kota Cimahi.',
      content_html: `
        <h2>Jajaran Kesekretariatan</h2>
        <p>Kesekretariatan dipimpin oleh Sekretaris yang bertindak sebagai Kuasa Pengguna Anggaran (KPA) dan mengelola sarana prasarana serta SDM organisasi.</p>
        <ul>
          <li><strong>Sekretaris:</strong> Penanggung jawab tata kelola operasional dan anggaran DIPA satuan kerja.</li>
          <li><strong>Sub Bagian Kepegawaian, Ortala:</strong> Mengurus kenaikan pangkat, mutasi, presensi, dan pengembangan kompetensi pegawai.</li>
          <li><strong>Sub Bagian Perencanaan, TI, dan Pelaporan:</strong> Menyusun dokumen SAKIP, mengelola infrastruktur TI jaringan & server website.</li>
          <li><strong>Sub Bagian Umum & Keuangan:</strong> Mengelola inventaris aset BMN, perawatan gedung, dan penatausahaan keuangan negara.</li>
        </ul>
      `
    });

    await upsertPage({
      menu_id: smFungsional,
      title: 'Profil SDM Fungsional & Pelaksana',
      subtitle: 'Pranata Komputer, Analis Perkara Peradilan, Arsiparis, dan Petugas PTSP',
      slug: 'fungsional-dan-pelaksana',
      excerpt: 'Daftar pejabat fungsional keahlian, keterampilan, dan staf pelaksana PA Cimahi.',
      seo_title: 'SDM Fungsional dan Pelaksana | PA Kota Cimahi',
      meta_description: 'Profil jabatan fungsional Pranata Komputer, Analis Kepegawaian, dan Arsiparis PA Cimahi.',
      content_html: `
        <h2>Jabatan Fungsional Keahlian & Keterampilan</h2>
        <p>Mendukung transformasi modernisasi birokrasi, Pengadilan Agama Kota Cimahi diperkuat oleh tenaga fungsional profesional:</p>
        <ul>
          <li><strong>Pranata Komputer:</strong> Mengembangkan sistem informasi, keamanan database, dan layanan website terpadu.</li>
          <li><strong>Analis Perkara Peradilan:</strong> Mendukung verifikasi kelengkapan berkas perkara sebelum diajukan ke Majelis Hakim.</li>
          <li><strong>Arsiparis:</strong> Mengelola sistem kearsipan berkas perkara in-aktif dan digitalisasi dokumen peradilan.</li>
          <li><strong>Petugas PTSP:</strong> Garda terdepan pelayanan yang menerapkan standar 5S untuk kepuasan masyarakat.</li>
        </ul>
      `
    });

    await upsertPage({
      menu_id: smStatistikPeg,
      title: 'Statistik Kepegawaian',
      subtitle: 'Komposisi Aparatur Berdasarkan Golongan, Jabatan, dan Jenjang Pendidikan',
      slug: 'statistik-kepegawaian',
      excerpt: 'Data statistik kepegawaian aparatur Pengadilan Agama Kota Cimahi Kelas IA.',
      seo_title: 'Statistik Kepegawaian | Pengadilan Agama Kota Cimahi',
      meta_description: 'Data statistik jumlah aparatur, komposisi pangkat golongan dan pendidikan di PA Cimahi.',
      content_html: `
        <h2>Statistik Komposisi Aparatur</h2>
        <p>Pengadilan Agama Kota Cimahi memiliki total <strong>48 Aparatur Pegawai</strong> yang terdiri dari:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
          <div style="background: #e0f2fe; padding: 1.25rem; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: #0284c7;">12</div>
            <div style="font-size: 0.9rem; color: #0369a1; font-weight: 600;">Hakim</div>
          </div>
          <div style="background: #dcfce7; padding: 1.25rem; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: #15803d;">18</div>
            <div style="font-size: 0.9rem; color: #166534; font-weight: 600;">Kepaniteraan</div>
          </div>
          <div style="background: #fef9c3; padding: 1.25rem; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: #a16207;">11</div>
            <div style="font-size: 0.9rem; color: #854d0e; font-weight: 600;">Kesekretariatan</div>
          </div>
          <div style="background: #f3e8ff; padding: 1.25rem; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: #7e22ce;">7</div>
            <div style="font-size: 0.9rem; color: #6b21a8; font-weight: 600;">PPNPN / IT Support</div>
          </div>
        </div>

        <h2>Komposisi Jenjang Pendidikan</h2>
        <ul>
          <li><strong>Strata 3 (Doktor / S3):</strong> 3 Orang (6%)</li>
          <li><strong>Strata 2 (Magister / S2):</strong> 19 Orang (40%)</li>
          <li><strong>Strata 1 (Sarjana / S1):</strong> 20 Orang (42%)</li>
          <li><strong>Diploma III (D3) / SMA:</strong> 6 Orang (12%)</li>
        </ul>
      `
    });

    console.log('🎉 Seed Profil Pengadilan completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  } finally {
    conn.release();
  }
}

seed();

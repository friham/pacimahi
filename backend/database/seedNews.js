const pool = require('../config/db');

async function seedNews() {
  console.log('🌱 Starting Seed: News & Articles...\n');
  const conn = await pool.getConnection();

  try {
    // Check if news already exist
    const [existing] = await conn.query('SELECT COUNT(*) as count FROM news');
    if (existing[0].count > 0) {
      console.log(`⚠️  Database already has ${existing[0].count} news items. Skipping insert.`);
      console.log('   To re-seed, delete existing news first or truncate the table.\n');
      return;
    }

    // Get admin author_id (superadmin)
    const [admins] = await conn.query('SELECT id FROM admins LIMIT 1');
    const authorId = admins.length > 0 ? admins[0].id : 1;

    const newsData = [
      {
        title: 'Pencanangan Pembangunan Zona Integritas PA Kota Cimahi Menuju WBBM 2026',
        slug: 'pencanangan-zi-pa-cimahi-2026',
        content: `<p>Pengadilan Agama Kota Cimahi berkomitmen mewujudkan birokrasi yang bersih, melayani, dan bebas dari korupsi dengan meningkatkan standar pelayanan terpadu satu pintu (PTSP).</p>
<p>Dalam acara pencanangan yang dihadiri seluruh aparatur pengadilan, Ketua Pengadilan Agama Kota Cimahi menyatakan bahwa pembangunan Zona Integritas menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM) merupakan prioritas utama tahun 2026.</p>
<h3>Tahapan Pembangunan ZI</h3>
<ul>
  <li><strong>Manajemen Perubahan:</strong> Membangun komitmen pimpinan dan seluruh aparatur</li>
  <li><strong>Penataan Tatalaksana:</strong> Penerapan SOP terstandarisasi dan digitalisasi persidangan</li>
  <li><strong>Penataan Sistem Manajemen SDM:</strong> Transparansi mutasi/promosi dan penilaian kinerja</li>
  <li><strong>Penguatan Akuntabilitas:</strong> Keterlibatan pimpinan dalam penyusunan SAKIP dan Renstra</li>
  <li><strong>Penguatan Pengawasan:</strong> Optimalisasi SIWAS MARI dan whistleblowing system</li>
  <li><strong>Peningkatan Kualitas Pelayanan:</strong> Penyediaan fasilitas PTSP prima dan inovasi SILINCAH</li>
</ul>
<p>Seluruh aparatur diharapkan dapat menjadi agen perubahan dalam mewujudkan birokrasi yang bersih dan melayani.</p>`,
        image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        category: 'berita',
        author_name: 'Humas PA Cimahi',
      },
      {
        title: 'Pengumuman Jadwal Pelayanan PTSP dan Sidang Selama Bulan Ramadhan',
        slug: 'pengumuman-jadwal-layanan-ramadhan',
        content: `<p>Diberitahukan kepada seluruh masyarakat pencari keadilan bahwa jam operasional pelayanan dan persidangan mengalami penyesuaian selama bulan Ramadhan 1447 H / 2026 M.</p>
<h3>Penyesuaian Jam Pelayanan</h3>
<table>
  <thead>
    <tr>
      <th>Layanan</th>
      <th>Sebelum Ramadhan</th>
      <th>Selama Ramadhan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PTSP (Senin - Kamis)</td>
      <td>08.00 - 16.30 WIB</td>
      <td>08.00 - 15.00 WIB</td>
    </tr>
    <tr>
      <td>PTSP (Jumat)</td>
      <td>07.30 - 16.30 WIB</td>
      <td>07.30 - 14.30 WIB</td>
    </tr>
    <tr>
      <td>Persidangan</td>
      <td>08.30 - 16.00 WIB</td>
      <td>08.30 - 14.30 WIB</td>
    </tr>
  </tbody>
</table>
<h3>Catatan Penting</h3>
<ul>
  <li>Pelayanan e-Court tetap beroperasi 24 jam</li>
  <li>Jadwal sidang yang sudah ditetapkan tidak mengalami perubahan</li>
  <li>Panitera Pengganti tetap standby untuk pendaftaran perkara darurat</li>
</ul>
<p>Semoga penyesuaian ini dapat membantu kelancaran ibadah puasa bagi seluruh masyarakat. Mohon maaf lahir dan batin.</p>`,
        image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        category: 'pengumuman',
        author_name: 'Sekretariat',
      },
      {
        title: 'Panduan Pendaftaran Perkara Secara Mandiri Melalui E-Court Mahkamah Agung',
        slug: 'panduan-ecourt-mandiri-2026',
        content: `<p>Masyarakat kini dapat mendaftarkan gugatan, membayar panjar biaya perkara, hingga menerima panggilan sidang secara daring melalui platform e-Court Mahkamah Agung RI.</p>
<h3>Langkah Pendaftaran e-Court</h3>
<ol>
  <li><strong>Akun SIPP Online:</strong> Daftar dan verifikasi akun di <code>sipp.pa-cimahi.go.id</code></li>
  <li><strong>Isi Formulir Gugatan:</strong> Lengkapi identitas para pihak, objek sengketa, dan tagihan</li>
  <li><strong>Unggah Berkas:</strong> Scan KTP, surat gugatan, bukti pendukung dalam format PDF</li>
  <li><strong>Pembayaran Virtual Account:</strong> Bayar panjar biaya perkara melalui VA yang tertera</li>
  <li><strong>Panggilan Elektronik:</strong> Status perkara dan jadwal sidang diinformasikan via email & WhatsApp</li>
</ol>
<h3>Keunggulan e-Court</h3>
<ul>
  <li>Akses 24 jam tanpa perlu datang ke pengadilan</li>
  <li>Bebas biaya tambahan (sesuai PNBP)</li>
  <li>Transparansi biaya dan status perkara secara real-time</li>
  <li>Panggilan sidang via email dan WhatsApp (SILINCAH)</li>
</ul>
<p>Panduan lengkap dapat diunduh di menu Pustaka Dokumen atau menghubungi PTSP Pengadilan Agama Kota Cimahi.</p>`,
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        category: 'artikel',
        author_name: 'Kepaniteraan Hukum',
      }
    ];

    for (const news of newsData) {
      const publishedAt = new Date();
      await conn.query(
        `INSERT INTO news (title, slug, content, image_url, category, author_id, is_published, published_at)
         VALUES (?, ?, ?, ?, ?, ?, TRUE, ?)`,
        [news.title, news.slug, news.content, news.image_url, news.category, authorId, publishedAt]
      );
      console.log(`  ✅ [${news.category.toUpperCase()}] ${news.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${newsData.length} news items!`);
    console.log('   - 1 Berita');
    console.log('   - 1 Pengumuman');
    console.log('   - 1 Artikel');
    console.log('\n   You can view them in Admin Panel > Kelola Berita\n');
  } catch (error) {
    console.error('❌ Seed news error:', error.message);
    throw error;
  } finally {
    conn.release();
  }
}

// Run if called directly
if (require.main === module) {
  seedNews()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { seedNews };

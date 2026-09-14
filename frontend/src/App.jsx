import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { SettingsProvider } from './context/SettingsContext';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// ── Core pages (always visible) ────────────────────────────────
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// ── Shared components used by routes ───────────────────────────
import ProtectedRoute from './components/ProtectedRoute';
import DynamicCMSPage from './components/DynamicCMSPage';

// ── Tentang Pengadilan Pages ───────────────────────────────────
const PengantarKetuaPage = lazy(() => import('./pages/tentang-pengadilan/PengantarKetuaPage'));
const VisiMisiPage = lazy(() => import('./pages/tentang-pengadilan/VisiMisiPage'));
const TugasPokokFungsiPage = lazy(() => import('./pages/tentang-pengadilan/TugasPokokFungsiPage'));
const WilayahYurisdiksiPage = lazy(() => import('./pages/tentang-pengadilan/WilayahYurisdiksiPage'));
const StrukturOrganisasiPage = lazy(() => import('./pages/tentang-pengadilan/StrukturOrganisasiPage'));
const SejarahTanggalPage = lazy(() => import('./pages/tentang-pengadilan/SejarahTanggalPage'));
const SejarahSKPage = lazy(() => import('./pages/tentang-pengadilan/SejarahSKPage'));
const MantanPimpinanPage = lazy(() => import('./pages/tentang-pengadilan/MantanPimpinanPage'));
const AgendaKegiatanPage = lazy(() => import('./pages/tentang-pengadilan/AgendaKegiatanPage'));
const AlamatPengadilanPage = lazy(() => import('./pages/tentang-pengadilan/AlamatPengadilanPage'));

// ── Profile Pegawai & Statistik Kepegawaian ────────────────────
const KetuaWakilKetuaPage = lazy(() => import('./pages/tentang-pengadilan/KetuaWakilKetuaPage'));
const SDMHakimPage = lazy(() => import('./pages/tentang-pengadilan/SDMHakimPage'));
const SDMKepaniteraanPage = lazy(() => import('./pages/tentang-pengadilan/SDMKepaniteraanPage'));
const SDMKesekretariatanPage = lazy(() => import('./pages/tentang-pengadilan/SDMKesekretariatanPage'));
const SDMFungsionalPage = lazy(() => import('./pages/tentang-pengadilan/SDMFungsionalPage'));
const StatistikKepegawaianPage = lazy(() => import('./pages/tentang-pengadilan/StatistikKepegawaianPage'));

// ── Informasi Umum Pages ───────────────────────────────────────
const SOPPengadilanPage = lazy(() => import('./pages/informasi-umum/SOPPengadilanPage'));
const ProgramKerjaPage = lazy(() => import('./pages/informasi-umum/ProgramKerjaPage'));
const LaporanTahunanPage = lazy(() => import('./pages/informasi-umum/LaporanTahunanPage'));

// ── Kepaniteraan Pages ─────────────────────────────────────────
const PosbakumPage = lazy(() => import('./pages/kepaniteraan/PosbakumPage'));
const ProdeoPage = lazy(() => import('./pages/kepaniteraan/ProdeoPage'));
const HakPencariKeadilanPage = lazy(() => import('./pages/kepaniteraan/HakPencariKeadilanPage'));
const ProsedurBerperkaraPage = lazy(() => import('./pages/kepaniteraan/ProsedurBerperkaraPage'));
const ECourtPage = lazy(() => import('./pages/kepaniteraan/ECourtPage'));
const HakPokokPersidanganPage = lazy(() => import('./pages/kepaniteraan/HakPokokPersidanganPage'));
const MediasiPage = lazy(() => import('./pages/kepaniteraan/MediasiPage'));
const PanggilanGhaibPage = lazy(() => import('./pages/kepaniteraan/PanggilanGhaibPage'));
const DelegasiTabayunPage = lazy(() => import('./pages/kepaniteraan/DelegasiTabayunPage'));
const PedomanKepaniteraanPage = lazy(() => import('./pages/kepaniteraan/PedomanKepaniteraanPage'));
const SIPPPage = lazy(() => import('./pages/kepaniteraan/SIPPPage'));
const DirektoriPutusanPage = lazy(() => import('./pages/kepaniteraan/DirektoriPutusanPage'));
const TataTertibPersidanganPage = lazy(() => import('./pages/kepaniteraan/TataTertibPersidanganPage'));
const JadwalPersidanganPage = lazy(() => import('./pages/kepaniteraan/JadwalPersidanganPage'));
const StatistikPerkaraPage = lazy(() => import('./pages/kepaniteraan/StatistikPerkaraPage'));
const BiayaPerkaraPage = lazy(() => import('./pages/kepaniteraan/BiayaPerkaraPage'));
const HakPerempuanAnakPage = lazy(() => import('./pages/kepaniteraan/HakPerempuanAnakPage'));
const PenerimaanPerkaraPage = lazy(() => import('./pages/kepaniteraan/PenerimaanPerkaraPage'));
const LayananInformasiPerkaraPage = lazy(() => import('./pages/kepaniteraan/LayananInformasiPerkaraPage'));
const TahapanPerkaraPage = lazy(() => import('./pages/kepaniteraan/TahapanPerkaraPage'));
const KeuanganPerkaraPage = lazy(() => import('./pages/kepaniteraan/KeuanganPerkaraPage'));

// ── Kesekretariatan Pages ──────────────────────────────────────
const DIPAPage = lazy(() => import('./pages/kesekretariatan/DIPAPage'));
const SAKIPPage = lazy(() => import('./pages/kesekretariatan/SAKIPPage'));
const PengadaanBarangJasaPage = lazy(() => import('./pages/kesekretariatan/PengadaanBarangJasaPage'));
const AsetInventarisPage = lazy(() => import('./pages/kesekretariatan/AsetInventarisPage'));
const LHKPNPage = lazy(() => import('./pages/kesekretariatan/LHKPNPage'));
const RealisasiPNBPPage = lazy(() => import('./pages/kesekretariatan/RealisasiPNBPPage'));
const SurveiPelayananPublikPage = lazy(() => import('./pages/kesekretariatan/SurveiPelayananPublikPage'));
const KepegawaianPage = lazy(() => import('./pages/kesekretariatan/KepegawaianPage'));
const KategorisasiInformasiPage = lazy(() => import('./pages/kesekretariatan/KategorisasiInformasiPage'));
const SuratMenyuratPimpinanPage = lazy(() => import('./pages/kesekretariatan/SuratMenyuratPimpinanPage'));
const PedomanKesekretariatanPage = lazy(() => import('./pages/kesekretariatan/PedomanKesekretariatanPage'));
const UPTKesekretariatanPage = lazy(() => import('./pages/kesekretariatan/UPTKesekretariatanPage'));
const LaporanKesekretariatanPage = lazy(() => import('./pages/kesekretariatan/LaporanKesekretariatanPage'));

// ── Layanan Publik Pages ───────────────────────────────────────
const PTSPPage = lazy(() => import('./pages/layanan-publik/PTSPPage'));
const ZonaIntegritasPage = lazy(() => import('./pages/layanan-publik/ZonaIntegritasPage'));
const AlurPrioritasPTSPPage = lazy(() => import('./pages/layanan-publik/AlurPrioritasPTSPPage'));
const APMPage = lazy(() => import('./pages/layanan-publik/APMPage'));
const PengawasanKodeEtikPage = lazy(() => import('./pages/layanan-publik/PengawasanKodeEtikPage'));
const LayananPengaduanPage = lazy(() => import('./pages/layanan-publik/LayananPengaduanPage'));
const LayananInformasiPPIDPage = lazy(() => import('./pages/layanan-publik/LayananInformasiPPIDPage'));
const FasilitasPublikPage = lazy(() => import('./pages/layanan-publik/FasilitasPublikPage'));
const MediaPublikasiLayananPage = lazy(() => import('./pages/layanan-publik/MediaPublikasiLayananPage'));

// ── Publikasi Pages ────────────────────────────────────────────
const BeritaPage = lazy(() => import('./pages/publikasi/BeritaPage'));
const PengumumanPage = lazy(() => import('./pages/publikasi/PengumumanPage'));
const ArsipPeraturanPage = lazy(() => import('./pages/publikasi/ArsipPeraturanPage'));
const GaleriPage = lazy(() => import('./pages/publikasi/GaleriPage'));
const ArtikelHukumPage = lazy(() => import('./pages/publikasi/ArtikelHukumPage'));
const PerjanjianKerjasamaPage = lazy(() => import('./pages/publikasi/PerjanjianKerjasamaPage'));
const HasilPenelitianPage = lazy(() => import('./pages/publikasi/HasilPenelitianPage'));

// ── Loading fallback for Suspense boundary ─────────────────────
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      color: '#0b4619',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #d1d5db',
          borderTop: '4px solid #0b4619',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 12px'
        }} />
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Memuat halaman...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <SettingsProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* Auth & Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/login" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Profil Pengadilan Routes (Dinamis terhubung ke CMS Admin & Database) */}
              <Route path="/tentang-pengadilan/pengantar-dari-ketua-pengadilan" element={<DynamicCMSPage customSlug="pengantar-dari-ketua-pengadilan" fallbackComponent={PengantarKetuaPage} />} />
              <Route path="/tentang-pengadilan/visi-dan-misi" element={<DynamicCMSPage customSlug="visi-dan-misi" fallbackComponent={VisiMisiPage} />} />
              <Route path="/tentang-pengadilan/kekuasaan-dan-ruang-lingkup-pengadilan-agama" element={<DynamicCMSPage customSlug="kekuasaan-dan-ruang-lingkup-pengadilan-agama" fallbackComponent={TugasPokokFungsiPage} />} />
              <Route path="/tentang-pengadilan/wilayah-yurisdiksi" element={<DynamicCMSPage customSlug="wilayah-yurisdiksi" fallbackComponent={WilayahYurisdiksiPage} />} />
              <Route path="/tentang-pengadilan/struktur-organisasi" element={<DynamicCMSPage customSlug="struktur-organisasi" fallbackComponent={StrukturOrganisasiPage} />} />
              <Route path="/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan" element={<DynamicCMSPage customSlug="tgl-pembentukan-pengadilan" fallbackComponent={SejarahTanggalPage} />} />
              <Route path="/tentang-pengadilan/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan" element={<DynamicCMSPage customSlug="sk-pembentukan-pengadilan" fallbackComponent={SejarahSKPage} />} />
              <Route path="/tentang-pengadilan/daftar-nama-mantan-pimpinan" element={<DynamicCMSPage customSlug="daftar-nama-mantan-pimpinan" fallbackComponent={MantanPimpinanPage} />} />
              <Route path="/tentang-pengadilan/agenda-kerja-pimpinan" element={<DynamicCMSPage customSlug="agenda-kerja-pimpinan" fallbackComponent={AgendaKegiatanPage} />} />
              <Route path="/tentang-pengadilan/alamat-pengadilan" element={<DynamicCMSPage customSlug="alamat-pengadilan" fallbackComponent={AlamatPengadilanPage} />} />

              {/* Profil Pegawai & SDM Routes (Dinamis terhubung ke CMS Admin & Database) */}
              <Route path="/tentang-pengadilan/profile-pengadilan" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua" replace />} />
              <Route path="/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua" element={<DynamicCMSPage customSlug="ketua-wakil-ketua" fallbackComponent={KetuaWakilKetuaPage} />} />
              <Route path="/tentang-pengadilan/profile-pengadilan/profil-pegawai/sdm-hakim" element={<DynamicCMSPage customSlug="sdm-hakim" fallbackComponent={SDMHakimPage} />} />
              <Route path="/tentang-pengadilan/profile-pengadilan/profil-pegawai/kepaniteraann" element={<DynamicCMSPage customSlug="kepaniteraann" fallbackComponent={SDMKepaniteraanPage} />} />
              <Route path="/tentang-pengadilan/profile-pengadilan/profil-pegawai/kesekretariatan" element={<DynamicCMSPage customSlug="kesekretariatan" fallbackComponent={SDMKesekretariatanPage} />} />
              <Route path="/tentang-pengadilan/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana" element={<DynamicCMSPage customSlug="fungsional-dan-pelaksana" fallbackComponent={SDMFungsionalPage} />} />
              <Route path="/tentang-pengadilan/profile-pengadilan/statistik-kepegawaian" element={<DynamicCMSPage customSlug="statistik-kepegawaian" fallbackComponent={StatistikKepegawaianPage} />} />

              {/* Dynamic CMS Catch-All Routes for new pages created in Admin */}
              <Route path="/p/:slug" element={<DynamicCMSPage />} />
              <Route path="/tentang-pengadilan/:slug" element={<DynamicCMSPage />} />

              {/* Informasi Umum Routes */}
              <Route path="/informasi-umum" element={<Navigate to="/informasi-umum/standar-operasional-prosedur" replace />} />
              <Route path="/informasi-umum/standar-operasional-prosedur" element={<SOPPengadilanPage />} />
              <Route path="/informasi-umum/program-kerja" element={<ProgramKerjaPage />} />
              <Route path="/informasi-umum/laporan-tahunan" element={<LaporanTahunanPage />} />

              {/* Aliases for 'transparansi-pengadilan' (legacy live site URLs) */}
              <Route path="/transparansi-pengadilan/standar-operasional-prosedur" element={<Navigate to="/informasi-umum/standar-operasional-prosedur" replace />} />
              <Route path="/transparansi-pengadilan/standar-operasional-prosedur/kepaniteraan" element={<Navigate to="/informasi-umum/standar-operasional-prosedur" replace />} />
              <Route path="/transparansi-pengadilan/program-kerja" element={<Navigate to="/informasi-umum/program-kerja" replace />} />
              <Route path="/transparansi-pengadilan/laporan-tahunan" element={<Navigate to="/informasi-umum/laporan-tahunan" replace />} />

              {/* Aliases for 'tentang-pengadian' (legacy typo support) */}
              <Route path="/tentang-pengadian/pengantar-dari-ketua-pengadilan" element={<Navigate to="/tentang-pengadilan/pengantar-dari-ketua-pengadilan" replace />} />
              <Route path="/tentang-pengadian/visi-dan-misi" element={<Navigate to="/tentang-pengadilan/visi-dan-misi" replace />} />
              <Route path="/tentang-pengadian/kekuasaan-dan-ruang-lingkup-pengadilan-agama" element={<Navigate to="/tentang-pengadilan/kekuasaan-dan-ruang-lingkup-pengadilan-agama" replace />} />
              <Route path="/tentang-pengadian/wilayah-yurisdiksi" element={<Navigate to="/tentang-pengadilan/wilayah-yurisdiksi" replace />} />
              <Route path="/tentang-pengadian/struktur-organisasi" element={<Navigate to="/tentang-pengadilan/struktur-organisasi" replace />} />
              <Route path="/tentang-pengadian/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan" element={<Navigate to="/tentang-pengadilan/sejarah-pengadilan-cmi/tgl-pembentukan-pengadilan" replace />} />
              <Route path="/tentang-pengadian/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan" element={<Navigate to="/tentang-pengadilan/sejarah-pengadilan-cmi/sk-pembentukan-pengadilan" replace />} />
              <Route path="/tentang-pengadian/daftar-nama-mantan-pimpinan" element={<Navigate to="/tentang-pengadilan/daftar-nama-mantan-pimpinan" replace />} />
              <Route path="/tentang-pengadian/agenda-kerja-pimpinan" element={<Navigate to="/tentang-pengadilan/agenda-kerja-pimpinan" replace />} />
              <Route path="/tentang-pengadian/alamat-pengadilan" element={<Navigate to="/tentang-pengadilan/alamat-pengadilan" replace />} />
              
              <Route path="/tentang-pengadian/profile-pengadilan" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua" replace />} />
              <Route path="/tentang-pengadian/profile-pengadilan/profil-pegawai/ketua-wakil-ketua" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/ketua-wakil-ketua" replace />} />
              <Route path="/tentang-pengadian/profile-pengadilan/profil-pegawai/sdm-hakim" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/sdm-hakim" replace />} />
              <Route path="/tentang-pengadian/profile-pengadilan/profil-pegawai/kepaniteraann" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/kepaniteraann" replace />} />
              <Route path="/tentang-pengadian/profile-pengadilan/profil-pegawai/kesekretariatan" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/kesekretariatan" replace />} />
              <Route path="/tentang-pengadian/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/profil-pegawai/fungsional-dan-pelaksana" replace />} />
              <Route path="/tentang-pengadian/profile-pengadilan/statistik-kepegawaian" element={<Navigate to="/tentang-pengadilan/profile-pengadilan/statistik-kepegawaian" replace />} />

              {/* Kepaniteraan Routes */}
              <Route path="/kepaniteraan" element={<Navigate to="/kepaniteraan/posbakum" replace />} />
              <Route path="/kepaniteraan/posbakum" element={<PosbakumPage />} />
              <Route path="/kepaniteraan/prodeo" element={<ProdeoPage />} />
              <Route path="/kepaniteraan/hak-pencari-keadilan" element={<HakPencariKeadilanPage />} />
              <Route path="/kepaniteraan/hak-hak-pencari-keadilan" element={<Navigate to="/kepaniteraan/hak-pencari-keadilan" replace />} />
              <Route path="/kepaniteraan/prosedur-berperkara" element={<ProsedurBerperkaraPage />} />
              <Route path="/kepaniteraan/ecourt" element={<ECourtPage />} />
              <Route path="/kepaniteraan/layanan-e-court" element={<Navigate to="/kepaniteraan/ecourt" replace />} />
              <Route path="/kepaniteraan/hak-pokok-persidangan" element={<HakPokokPersidanganPage />} />
              <Route path="/kepaniteraan/mediasi" element={<MediasiPage />} />
              <Route path="/kepaniteraan/panggilan-ghaib" element={<PanggilanGhaibPage />} />
              <Route path="/kepaniteraan/delegasi-tabayun" element={<DelegasiTabayunPage />} />
              <Route path="/kepaniteraan/pedoman-kepaniteraan" element={<PedomanKepaniteraanPage />} />
              <Route path="/kepaniteraan/pedoman-pengelolaan-kepaniteraan" element={<Navigate to="/kepaniteraan/pedoman-kepaniteraan" replace />} />
              <Route path="/kepaniteraan/sipp" element={<SIPPPage />} />
              <Route path="/kepaniteraan/direktori-putusan" element={<DirektoriPutusanPage />} />
              <Route path="/kepaniteraan/tata-tertib-persidangan" element={<TataTertibPersidanganPage />} />
              <Route path="/kepaniteraan/jadwal-persidangan" element={<JadwalPersidanganPage />} />
              <Route path="/kepaniteraan/agenda-jadwal-persidangan" element={<Navigate to="/kepaniteraan/jadwal-persidangan" replace />} />
              <Route path="/kepaniteraan/statistik-perkara" element={<StatistikPerkaraPage />} />
              <Route path="/kepaniteraan/biaya-perkara" element={<BiayaPerkaraPage />} />
              <Route path="/kepaniteraan/biaya-proses-berperkara" element={<Navigate to="/kepaniteraan/biaya-perkara" replace />} />
              <Route path="/kepaniteraan/hak-perempuan-anak" element={<HakPerempuanAnakPage />} />
              <Route path="/kepaniteraan/hak-perempuan-dan-anak" element={<Navigate to="/kepaniteraan/hak-perempuan-anak" replace />} />
              <Route path="/kepaniteraan/penerimaan-perkara" element={<PenerimaanPerkaraPage />} />
              <Route path="/kepaniteraan/layanan-informasi-perkara" element={<LayananInformasiPerkaraPage />} />
              <Route path="/kepaniteraan/tahapan-perkara" element={<TahapanPerkaraPage />} />
              <Route path="/kepaniteraan/tahapan-tahapan-perkara" element={<Navigate to="/kepaniteraan/tahapan-perkara" replace />} />
              <Route path="/kepaniteraan/keuangan-perkara" element={<KeuanganPerkaraPage />} />

              {/* Kesekretariatan Routes */}
              <Route path="/kesekretariatan" element={<Navigate to="/kesekretariatan/pengadaan-barang-dan-jasa" replace />} />
              <Route path="/kesekretariatan/pengadaan-barang-dan-jasa" element={<PengadaanBarangJasaPage />} />
              <Route path="/kesekretariatan/pengadaan-barang-jasa" element={<Navigate to="/kesekretariatan/pengadaan-barang-dan-jasa" replace />} />
              <Route path="/kesekretariatan/dipa" element={<DIPAPage />} />
              <Route path="/kesekretariatan/dipa-anggaran" element={<Navigate to="/kesekretariatan/dipa" replace />} />
              <Route path="/kesekretariatan/realisasi-pnbp" element={<RealisasiPNBPPage />} />
              <Route path="/kesekretariatan/daftar-aset-dan-inventaris" element={<AsetInventarisPage />} />
              <Route path="/kesekretariatan/aset-inventaris" element={<Navigate to="/kesekretariatan/daftar-aset-dan-inventaris" replace />} />
              <Route path="/kesekretariatan/survei-pelayanan-publik" element={<SurveiPelayananPublikPage />} />
              <Route path="/kesekretariatan/kepegawaian" element={<KepegawaianPage />} />
              <Route path="/kesekretariatan/kategorisasi-informasi" element={<KategorisasiInformasiPage />} />
              <Route path="/kesekretariatan/sakip" element={<SAKIPPage />} />
              <Route path="/kesekretariatan/surat-menyurat-pimpinan" element={<SuratMenyuratPimpinanPage />} />
              <Route path="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" element={<PedomanKesekretariatanPage />} />
              <Route path="/kesekretariatan/pedoman-kesekretariatan" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/kesekretariatan/unit-pelaksana-teknis-kesekretariatan" element={<UPTKesekretariatanPage />} />
              <Route path="/kesekretariatan/upt-kesekretariatan" element={<Navigate to="/kesekretariatan/unit-pelaksana-teknis-kesekretariatan" replace />} />
              <Route path="/kesekretariatan/laporan" element={<LaporanKesekretariatanPage />} />
              <Route path="/kesekretariatan/lhkpn-lhkasn" element={<LHKPNPage />} />

              {/* Layanan Publik Routes */}
              <Route path="/layanan-publik" element={<Navigate to="/layanan-publik/ptsp" replace />} />
              <Route path="/layanan-publik/ptsp" element={<PTSPPage />} />
              <Route path="/layanan-publik/alur-pelayanan-prioritas-ptsp" element={<AlurPrioritasPTSPPage />} />
              <Route path="/layanan-publik/akreditasi-penjaminan-mutu" element={<APMPage />} />
              <Route path="/layanan-publik/zona-integritas" element={<ZonaIntegritasPage />} />
              <Route path="/layanan-publik/pengawasan-dan-kode-etik" element={<PengawasanKodeEtikPage />} />
              <Route path="/layanan-publik/layanan-pengaduan" element={<LayananPengaduanPage />} />
              <Route path="/layanan-publik/layanan-informasi" element={<LayananInformasiPPIDPage />} />
              <Route path="/layanan-publik/fasilitas-publik" element={<FasilitasPublikPage />} />
              <Route path="/layanan-publik/brosur-digital" element={<MediaPublikasiLayananPage />} />

              {/* Kegiatan Pengadilan Live Site Aliases */}
              <Route path="/kegiatan-pengadilan/kumpulan-sk" element={<Navigate to="/layanan-publik/brosur-digital" replace />} />
              <Route path="/kegiatan-pengadilan/alur-pelayanan-prioritas-ptsp" element={<Navigate to="/layanan-publik/alur-pelayanan-prioritas-ptsp" replace />} />
              <Route path="/kegiatan-pengadilan/youtube-pa-kota-cimahi" element={<Navigate to="/layanan-publik/brosur-digital" replace />} />
              <Route path="/kegiatan-pengadilan/tautan-terkait" element={<Navigate to="/layanan-publik/brosur-digital" replace />} />
              <Route path="/kegiatan-pengadilan/akreditasi-penjaminan-mutu" element={<Navigate to="/layanan-publik/akreditasi-penjaminan-mutu" replace />} />
              <Route path="/kegiatan-pengadilan/akreditasi-penjaminan-mutu/*" element={<Navigate to="/layanan-publik/akreditasi-penjaminan-mutu" replace />} />
              <Route path="/kegiatan-pengadilan/zona-integritas" element={<Navigate to="/layanan-publik/zona-integritas" replace />} />
              <Route path="/kegiatan-pengadilan/zona-integritas/*" element={<Navigate to="/layanan-publik/zona-integritas" replace />} />
              <Route path="/kegiatan-pengadilan/laporan-akses-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/daftar-nama-pejabat-pengawas" element={<Navigate to="/layanan-publik/fasilitas-publik" replace />} />
              <Route path="/kegiatan-pengadilan/layanan-informasi-via-whatsapp-silincah" element={<Navigate to="/layanan-publik/brosur-digital" replace />} />
              <Route path="/kegiatan-pengadilan/brosur-digital" element={<Navigate to="/layanan-publik/brosur-digital" replace />} />
              <Route path="/kegiatan-pengadilan/formulir-permintaan-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/sop-pelayanan-publik" element={<Navigate to="/layanan-publik/ptsp" replace />} />
              <Route path="/kegiatan-pengadilan/cctv-online" element={<Navigate to="/layanan-publik/brosur-digital" replace />} />
              <Route path="/kegiatan-pengadilan/standar-dan-maklumat-pelayanan-pengadilan" element={<Navigate to="/layanan-publik/ptsp" replace />} />
              <Route path="/kegiatan-pengadilan/pengawasan-dan-kode-etik" element={<Navigate to="/layanan-publik/pengawasan-dan-kode-etik" replace />} />
              <Route path="/kegiatan-pengadilan/pengawasan-dan-kode-etik/*" element={<Navigate to="/layanan-publik/pengawasan-dan-kode-etik" replace />} />
              <Route path="/kegiatan-pengadilan/layanan-pengaduan" element={<Navigate to="/layanan-publik/layanan-pengaduan" replace />} />
              <Route path="/kegiatan-pengadilan/layanan-pengaduan/*" element={<Navigate to="/layanan-publik/layanan-pengaduan" replace />} />
              <Route path="/kegiatan-pengadilan/layanan-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/fasilitas-publik" element={<Navigate to="/layanan-publik/fasilitas-publik" replace />} />
              <Route path="/kegiatan-pengadilan/petugas-informasi-pelayanan-terpadu-satu-pintu-ptsp-dan-pengaduan" element={<Navigate to="/layanan-publik/fasilitas-publik" replace />} />
              <Route path="/kegiatan-pengadilan/hak-hak-pemohon-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/biaya-memperoleh-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/hak-hak-pelapor-dan-terlapor" element={<Navigate to="/layanan-publik/layanan-pengaduan" replace />} />
              <Route path="/kegiatan-pengadilan/prosedur-peringatan-dini-dan-prosedur-evakuasi-keadaan-darurat" element={<Navigate to="/layanan-publik/fasilitas-publik" replace />} />
              <Route path="/kegiatan-pengadilan/jam-kerja-kantor" element={<Navigate to="/layanan-publik/fasilitas-publik" replace />} />
              <Route path="/kegiatan-pengadilan/prosedur-permintaan-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/prosedur-keberatan-informasi" element={<Navigate to="/layanan-publik/layanan-informasi" replace />} />
              <Route path="/kegiatan-pengadilan/pedoman-pengawasan" element={<Navigate to="/layanan-publik/pengawasan-dan-kode-etik" replace />} />
              <Route path="/kegiatan-pengadilan/putusan-majelis-kehormatan-hakim" element={<Navigate to="/layanan-publik/pengawasan-dan-kode-etik" replace />} />

              {/* Live Site URLs Mapping */}
              <Route path="/layanan-publik/lelang-barang-dan-jasa" element={<Navigate to="/kesekretariatan/pengadaan-barang-dan-jasa" replace />} />
              <Route path="/layanan-publik/dipa/dipa" element={<Navigate to="/kesekretariatan/dipa" replace />} />
              <Route path="/layanan-publik/dipa/rpa" element={<Navigate to="/kesekretariatan/dipa" replace />} />
              <Route path="/layanan-publik/dipa/rincian-kertas-kerja-satker-rkkl" element={<Navigate to="/kesekretariatan/dipa" replace />} />
              <Route path="/layanan-publik/dipa/catatan-atas-laporan-keuangan-calk" element={<Navigate to="/kesekretariatan/dipa" replace />} />
              <Route path="/layanan-publik/dipa/neraca-keuangan" element={<Navigate to="/kesekretariatan/dipa" replace />} />
              <Route path="/layanan-publik/realisasi-penerimaan-negara-bukan-pajak-pnbp" element={<Navigate to="/kesekretariatan/realisasi-pnbp" replace />} />
              <Route path="/layanan-publik/daftar-aset-dan-inventaris" element={<Navigate to="/kesekretariatan/daftar-aset-dan-inventaris" replace />} />
              <Route path="/layanan-publik/survei-pelayanan-publik" element={<Navigate to="/kesekretariatan/survei-pelayanan-publik" replace />} />
              <Route path="/layanan-publik/kepegawaian" element={<Navigate to="/kesekretariatan/kepegawaian" replace />} />
              <Route path="/layanan-publik/kategorisasi-informasi" element={<Navigate to="/kesekretariatan/kategorisasi-informasi" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/rencana-kerja-dan-anggaran" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/renstra" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/rencana-aksi-kinerja" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/reviu-indikator-kinerja-utama" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/perjanjian-kinerja" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/lkijp" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/sistem-pengelolaan-pengadilan/cetak-biru-mahkamah-agung" element={<Navigate to="/kesekretariatan/sakip" replace />} />
              <Route path="/layanan-publik/surat-menyurat-pimpinan" element={<Navigate to="/kesekretariatan/surat-menyurat-pimpinan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/keuangan" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/bagian-umum" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/bagian-kepegawaian" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/organisasi" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/perencanaan" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/pelaporan" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/teknologi-informasi" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/pedoman-pengelolaan-organisasi-administrasi/tata-laksana" element={<Navigate to="/kesekretariatan/pedoman-pengelolaan-kesekretariatan" replace />} />
              <Route path="/layanan-publik/unit-pelaksana-teknis-kesekretariatan" element={<Navigate to="/kesekretariatan/unit-pelaksana-teknis-kesekretariatan" replace />} />
              <Route path="/layanan-publik/laporan/laporan-keuangan" element={<Navigate to="/kesekretariatan/laporan" replace />} />
              <Route path="/layanan-publik/laporan/lhkpn-lhkasn/laporan-lhkpn" element={<Navigate to="/kesekretariatan/lhkpn-lhkasn" replace />} />
              <Route path="/layanan-publik/laporan/lhkpn-lhkasn/laporan-lhkasn" element={<Navigate to="/kesekretariatan/lhkpn-lhkasn" replace />} />
              <Route path="/layanan-publik/laporan/lra" element={<Navigate to="/kesekretariatan/laporan" replace />} />
              <Route path="/layanan-publik/laporan/laporan-kinerja-triwulan" element={<Navigate to="/kesekretariatan/laporan" replace />} />
              <Route path="/layanan-publik/laporan/laporan-skm-dan-ipk" element={<Navigate to="/kesekretariatan/survei-pelayanan-publik" replace />} />

              {/* Publikasi Routes */}
              <Route path="/publikasi" element={<Navigate to="/publikasi/berita" replace />} />
              <Route path="/publikasi/berita" element={<BeritaPage />} />
              <Route path="/publikasi/pengumuman" element={<PengumumanPage />} />
              <Route path="/publikasi/artikel" element={<ArtikelHukumPage />} />
              <Route path="/publikasi/peraturan-kebijakan" element={<ArsipPeraturanPage />} />
              <Route path="/publikasi/perjanjian-dengan-pihak-ketiga" element={<PerjanjianKerjasamaPage />} />
              <Route path="/publikasi/perjanjian-kerjasama" element={<Navigate to="/publikasi/perjanjian-dengan-pihak-ketiga" replace />} />
              <Route path="/publikasi/arsip-hasil-penelitian" element={<HasilPenelitianPage />} />
              <Route path="/publikasi/hasil-penelitian" element={<Navigate to="/publikasi/arsip-hasil-penelitian" replace />} />
              <Route path="/publikasi/galeri" element={<GaleriPage />} />

              {/* Hubungi Kami / Publikasi Live Site Aliases */}
              <Route path="/hubungi-kami/artikel" element={<Navigate to="/publikasi/artikel" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/peraturan-perundang-undangan" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/perma" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/keputusan-ketua-mahkamah-agung" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/surat-edaran-mahkamah-agung" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/keputusan-sekretaris-mahkamah-agung" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/pertimbangan-dan-nasihat-hukum-mahkamah-agung" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/yurisprudensi" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/peraturan-dan-kebijakan/informasi-dan-kebijakan-pejabat-pengadilan" element={<Navigate to="/publikasi/peraturan-kebijakan" replace />} />
              <Route path="/hubungi-kami/perjanjian-dengan-pihak-ketiga" element={<Navigate to="/publikasi/perjanjian-dengan-pihak-ketiga" replace />} />
              <Route path="/hubungi-kami/arsip-hasil-penelitian" element={<Navigate to="/publikasi/arsip-hasil-penelitian" replace />} />
              <Route path="/hubungi-kami/arsip-file-multimedia" element={<Navigate to="/publikasi/galeri" replace />} />
              <Route path="/hubungi-kami/arsip-berita-pengadilan" element={<Navigate to="/publikasi/berita" replace />} />
              <Route path="/hubungi-kami/arsip-pengumuman-2" element={<Navigate to="/publikasi/pengumuman" replace />} />

              {/* Fallback Catch-all Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
        </SettingsProvider>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;

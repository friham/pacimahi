# 🗄️ Panduan Database — Website PA Cimahi

Dokumen ini menjelaskan **file-file skema di folder ini**, urutan setup database
baru dari nol, dan peringatan penting sebelum menjalankan seed.

> ⚠️ **Prinsip utama:** skema aplikasi ini **tersebar di beberapa file**.
> Menjalankan `schema.sql` saja **TIDAK cukup** — database tidak akan lengkap.

---

## 1. Peta tabel → file definisi

Database `pa_cimahi_db` punya **15 tabel** yang didefinisikan di beberapa file:

| # | Tabel | Didefinisikan di | Fungsi |
|---|-------|------------------|--------|
| 1 | `admins` | `schema.sql` | Akun admin (login) |
| 2 | `sliders` | `schema.sql` | Slider homepage |
| 3 | `services` | `schema.sql` | Kartu layanan cepat |
| 4 | `news` | `schema.sql` | Berita / pengumuman / artikel |
| 5 | `site_settings` | `schema.sql` | Pengaturan website (key/value) |
| 6 | `menus` | `migrations_cms.sql` | Struktur menu navigasi |
| 7 | `pages` | `migrations_cms.sql` | Halaman CMS |
| 8 | `content_blocks` | `migrations_cms.sql` | Blok konten per halaman |
| 9 | `media` | `migrations_cms.sql` | Media library |
| 10 | `documents` | `migrations_cms.sql` | Pustaka dokumen |
| 11 | `audit_logs` | `migrations_cms.sql` | Log aktivitas admin |
| 12 | `code_snippets` | `migrations_cms.sql` | Code Library |
| 13 | `homepage_sections` | `migrations_homepage.sql` | Section homepage dinamis |
| 14 | `page_visits` | `migrations_analytics.sql` | Tracking pengunjung |
| 15 | `active_sessions` | `migrations_analytics.sql` | Pengunjung online |

**Catatan sumber tambahan (duplikat / alternatif):**

| File | Isi | Status |
|------|-----|--------|
| `runMigration.js` | Runner JS: membuat tabel `menus`, `pages`, `content_blocks`, `media`, `documents`, `audit_logs` (idempotent) | Alternatif dari `migrations_cms.sql` — **tidak mencakup `code_snippets`** |
| `generate_migrations_sql.js` | Generator/menampilkan SQL struktur tabel CMS (6 tabel, tanpa `code_snippets`) | Untuk referensi/mendapatkan SQL mentah |
| `migrateCodeSnippets.js` | Runner JS: hanya `code_snippets` | Alternatif; `migrations_cms.sql` sudah mencakupnya |
| `runHomepageMigration.js` | Runner JS yang **membaca `migrations_homepage.sql`** | Alternatif dari import SQL langsung |
| `seedProfilPengadilan.js` | Seed menu + halaman CMS profil; juga `CREATE TABLE IF NOT EXISTS menus/pages/content_blocks` | ⚠️ Seed — lihat peringatan bagian 4 |
| `seedNews.js` | Seed berita contoh | Opsional |

> `migrations_analytics.sql` **tidak punya runner JS** — wajib diimport via `mysql <`.

---

## 2. Urutan setup database BARU dari nol

Jalankan berurutan agar **semua 15 tabel + seed dasar (akun admin)** tercipta.

```bash
# 0) Buat database dengan collation yang sama dengan seluruh tabel
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS pa_cimahi_db \
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 1) Tabel core + seed admin default, settings, services, sliders, berita
mysql -u root -p pa_cimahi_db < backend/database/schema.sql

# 2) Tabel CMS (menus, pages, content_blocks, media, documents,
#    audit_logs, code_snippets) + seed menu & halaman
mysql -u root -p pa_cimahi_db < backend/database/migrations_cms.sql

# 3) Tabel section homepage + seed section
mysql -u root -p pa_cimahi_db < backend/database/migrations_homepage.sql

# 4) Tabel analytics (page_visits, active_sessions)
mysql -u root -p pa_cimahi_db < backend/database/migrations_analytics.sql
```

**Alternatif (tanpa CLI mysql), untuk langkah 2–3:**

```bash
cd backend
node database/runMigration.js            # tabel CMS (tanpa code_snippets!)
node database/migrateCodeSnippets.js     # code_snippets bila langkah 2 dilewati
node database/runHomepageMigration.js    # homepage_sections
```

**Langkah verifikasi:**

```sql
-- Harus menampilkan 15 tabel:
USE pa_cimahi_db; SHOW TABLES;
```

**Setelah setup:** ganti password admin default — lihat bagian 5.

**Seed opsional** (hanya untuk database kosong, lihat peringatan bagian 4):

```bash
node backend/database/seedNews.js              # berita contoh
node backend/database/seedProfilPengadilan.js  # menu + halaman CMS profil
```

---

## 3. Kenapa ada banyak file? (sejarah)

Proyek berkembang bertahap, jadi skema terbelah per fitur:

1. **Garis awal** — `schema.sql`: tabel inti yang dipakai website statis
   sederhana: `admins`, `sliders`, `services`, `news`, `site_settings`.
2. **Fitur CMS** — `migrations_cms.sql` (+ runner `runMigration.js`,
   generator `generate_migrations_sql.js`): menu dinamis, halaman berbasis
   blok, media library, pustaka dokumen, dan audit log.
3. **Fitur homepage dinamis** — `migrations_homepage.sql` (+ runner
   `runHomepageMigration.js`): section homepage yang bisa diedit dari admin.
4. **Fitur analytics** — `migrations_analytics.sql`: statistik pengunjung &
   pengunjung online.
5. **Fitur Code Library** — `migrateCodeSnippets.js`, lalu ikut masuk ke
   `migrations_cms.sql`.

Karena penambahan bertahap inilah **satu file tidak pernah cukup**, dan definisi
lama berulang di beberapa tempat (duplikat yang sifatnya idempotent —
`CREATE TABLE IF NOT EXISTS`).

---

## ⚠️ 4. Peringatan sebelum menjalankan seed

> **JANGAN jalankan `seedProfilPengadilan.js` di database yang sudah berisi
> data `pages` / `menus` / `content_blocks` nyata.**

Alasannya:

- File itu juga berisi `CREATE TABLE IF NOT EXISTS` (bukan cuma INSERT) —
  aman untuk tabel kosong, tapi **tidak menambah kolom** bila tabel sudah lama.
- Seed-nya memakai `INSERT ... ON DUPLICATE KEY UPDATE` berdasarkan **ID dan
  slug tetap** → pada database berisi data yang sudah diedit, **konten &
  judul akan ditimpa** kembali ke versi contoh (terutama halaman profil,
  sejarah, visi-misi, dst.).
- `seedNews.js` dan seed bawaan `schema.sql` / `migrations_cms.sql` juga
  bersifat idempotent-timpa, walaupun dampaknya lebih ringan.

**Aman dijalankan hanya pada:** database kosong, atau database yang
dipastikan belum pernah mengedit data tersebut.

---

## 🔐 5. Akun default — WAJIB diganti

`schema.sql` membuat akun administrator bawaan:

| Field | Nilai |
|-------|-------|
| username | `admin` |
| password | `admin123` |

> ⚠️ **Password default ini WAJIB diganti segera** setelah setup pertama kali
> (login ke `/admin/login` → menu **Pengaturan Akun** → ubah password).

Hash bcrypt ada di `schema.sql` — untuk membuat hash baru:
`node -e "console.log(require('bcryptjs').hashSync('password_baru', 10))"`

---

## 🧰 Referensi cepat

| Kebutuhan | Jalankan |
|-----------|----------|
| Setup dari nol | Bagian 2 (urutan 1→4) |
| Tambah tabel CMS saja | `migrations_cms.sql` atau `runMigration.js` |
| Code Library saja | `migrateCodeSnippets.js` |
| Section homepage saja | `migrations_homepage.sql` / `runHomepageMigration.js` |
| Analytics | `migrations_analytics.sql` (manual `mysql <`) |
| Lihat SQL mentah CMS | `generate_migrations_sql.js` |

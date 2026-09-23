# 🏛️ Website PA Cimahi

Website resmi **Pengadilan Agama Cimahi** — sistem informasi berbasis web fullstack dengan fitur manajemen konten (CMS), berita, layanan, dokumen, dan halaman publik.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 🧱 Tech Stack

| Layer     | Teknologi                                  |
|-----------|--------------------------------------------|
| Frontend  | React 19, Vite, React Router DOM, Axios    |
| Backend   | Node.js, Express 5, MySQL2, Multer, JWT    |
| Database  | MySQL                                      |
| Auth      | JWT (JSON Web Token) + bcryptjs            |
| Styling   | CSS (Vanilla)                              |

---

## 📁 Struktur Proyek

```
pacimahi/
├── backend/               # REST API Server (Node.js + Express)
│   ├── config/            # Konfigurasi database
│   ├── controllers/       # Logic handler setiap route
│   ├── database/          # Skema / migrasi database
│   ├── middleware/        # Auth middleware (JWT)
│   ├── public/            # File statis (gambar, dokumen upload)
│   │   ├── images/
│   │   └── documents/
│   ├── routes/            # Definisi API routes
│   ├── .env.example       # Contoh environment variables
│   ├── package.json
│   └── server.js          # Entry point server
│
└── frontend/              # React App (Vite)
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/    # Komponen reusable
    │   ├── context/       # React Context (auth, dll)
    │   ├── pages/         # Halaman-halaman aplikasi
    │   ├── App.jsx        # Root component + routing
    │   └── main.jsx       # Entry point React
    ├── index.html
    └── package.json
```

---

## ⚙️ Cara Menjalankan Proyek

### Prasyarat
- **Node.js** v18 atau lebih baru
- **MySQL** (lokal atau cloud)
- **npm** atau **yarn**

---

### 1. Clone Repository

```bash
git clone https://github.com/<username>/<repo-name>.git
cd pacimahi
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di dalam folder `backend/`:

```bash
cp .env.example .env
```

Lalu isi file `.env` sesuai konfigurasi lokal kamu:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=pa_cimahi_db

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=24h
```

Import database — **ikuti urutan lengkapnya di [`backend/database/README.md`](backend/database/README.md)**.

> ⚠️ Skema tersebar di beberapa file (15 tabel). Menjalankan `schema.sql` saja
> **TIDAK cukup** — lihat panduannya di [`backend/database/README.md`](backend/database/README.md).

```bash
# Urutan singkat (detail + penjelasan di backend/database/README.md):
mysql -u root -p pa_cimahi_db < backend/database/schema.sql             # 1. core + admin default
mysql -u root -p pa_cimahi_db < backend/database/migrations_cms.sql     # 2. CMS (menu/halaman/media/dokumen/audit/code)
mysql -u root -p pa_cimahi_db < backend/database/migrations_homepage.sql # 3. section homepage
mysql -u root -p pa_cimahi_db < backend/database/migrations_analytics.sql # 4. analytics pengunjung
```

Jalankan server:

```bash
# Development (dengan nodemon)
npm run dev

# Production
npm start
```

Server berjalan di: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di: `http://localhost:5173`

---

## 🔗 API Endpoints Utama

| Method | Endpoint              | Keterangan           |
|--------|-----------------------|----------------------|
| GET    | `/api/health`         | Health check server  |
| POST   | `/api/auth/login`     | Login user           |
| GET    | `/api/sliders`        | Data slider          |
| GET    | `/api/services`       | Data layanan         |
| GET    | `/api/news`           | Data berita          |
| GET    | `/api/pages`          | Data halaman         |
| GET    | `/api/menus`          | Data menu navigasi   |
| GET    | `/api/documents`      | Data dokumen         |
| GET    | `/api/audit-logs`     | Log aktivitas admin  |

---

## 🔐 Environment Variables

Salin `.env.example` dan sesuaikan nilainya. **Jangan pernah commit file `.env` ke GitHub!**

```bash
cp backend/.env.example backend/.env
```

---

## 👤 Author

Dibuat dalam rangka **Kerja Praktik (KP)** di Pengadilan Agama Cimahi.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan instansi. Hak cipta © 2024 PA Cimahi.

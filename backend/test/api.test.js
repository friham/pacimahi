const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock pool sebelum server dimuat
jest.mock('../config/db', () => ({
  execute: jest.fn(),
  getConnection: jest.fn().mockResolvedValue({
    release: jest.fn()
  })
}));

const pool = require('../config/db');
const app = require('../server');

describe('PA Cimahi Backend API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Health Check Endpoint', () => {
    it('GET /api/health harus mengembalikan status 200 dan success true', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('PA Cimahi API is running');
    });
  });

  describe('Auth Controller - POST /api/auth/login', () => {
    it('harus mengembalikan 400 jika username atau password kosong', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Username dan password wajib diisi.');
    });

    it('harus mengembalikan 401 jika user tidak terdaftar', async () => {
      pool.execute.mockResolvedValueOnce([[]]);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'nonexistent_user', password: 'password123' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Username atau password salah.');
    });

    it('harus mengembalikan 401 jika password tidak cocok', async () => {
      const hashedPassword = await bcrypt.hash('rahasia123', 10);
      pool.execute.mockResolvedValueOnce([
        [{ id: 1, username: 'admin', password: hashedPassword, role: 'superadmin' }]
      ]);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'password_salah' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Username atau password salah.');
    });

    it('harus mengembalikan token dan data admin jika login valid', async () => {
      const hashedPassword = await bcrypt.hash('rahasia123', 10);
      pool.execute.mockResolvedValueOnce([
        [{ id: 1, username: 'admin', name: 'Super Admin', email: 'admin@pa-cimahi.go.id', password: hashedPassword, role: 'superadmin' }]
      ]);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'rahasia123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.admin.username).toBe('admin');
    });
  });

  describe('Service CRUD Controller - GET /api/services', () => {
    it('harus mengembalikan daftar layanan aktif', async () => {
      const mockServices = [
        { id: 1, name: 'Gugatan Mandiri', icon: 'FaFileAlt', is_active: 1, sort_order: 1 },
        { id: 2, name: 'Antrean Sidang', icon: 'FaUsers', is_active: 1, sort_order: 2 }
      ];

      pool.execute.mockResolvedValueOnce([mockServices]);

      const res = await request(app).get('/api/services');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockServices);
    });
  });

  describe('Rate Limiter — loginLimiter active outside test mode', () => {
    const origEnv = process.env.NODE_ENV;
    const hashedPassword = bcrypt.hashSync('correct', 10);

    afterEach(() => {
      process.env.NODE_ENV = origEnv;
    });

    it('should return 429 on 6th failed login when NODE_ENV is production', async () => {
      process.env.NODE_ENV = 'production';
      pool.execute.mockResolvedValue([
        [{ id: 1, username: 'admin', password: hashedPassword, role: 'superadmin' }]
      ]);

      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({ username: 'admin', password: 'wrong' });
      }

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'wrong' });

      expect(res.status).toBe(429);
    });

    it('should NOT return 429 when NODE_ENV is test', async () => {
      process.env.NODE_ENV = 'test';
      pool.execute.mockResolvedValue([
        [{ id: 1, username: 'admin', password: hashedPassword, role: 'superadmin' }]
      ]);

      for (let i = 0; i < 10; i++) {
        const res = await request(app)
          .post('/api/auth/login')
          .send({ username: 'admin', password: 'wrong' });
        expect(res.status).not.toBe(429);
      }
    });
  });

  describe('Superadmin Reset Password — PUT /api/auth/reset-password/:id', () => {
    const SECRET = process.env.JWT_SECRET || 'test-secret';
    const signToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '1h' });

    beforeAll(() => {
      if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'test-secret';
    });

    it('harus mengembalikan 401 jika tanpa token', async () => {
      const res = await request(app)
        .put('/api/auth/reset-password/2')
        .send({ newPassword: 'rahasia123' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('harus mengembalikan 403 jika bukan superadmin', async () => {
      const token = signToken({ id: 3, username: 'editor1', role: 'editor' });
      const res = await request(app)
        .put('/api/auth/reset-password/2')
        .set('Authorization', `Bearer ${token}`)
        .send({ newPassword: 'rahasia123' });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('harus mengembalikan 400 jika password baru kosong', async () => {
      const token = signToken({ id: 1, username: 'admin', role: 'superadmin' });
      const res = await request(app)
        .put('/api/auth/reset-password/2')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('harus mengembalikan 400 jika reset password akun sendiri', async () => {
      const token = signToken({ id: 1, username: 'admin', role: 'superadmin' });
      const res = await request(app)
        .put('/api/auth/reset-password/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ newPassword: 'rahasia123' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Gunakan menu Ganti Password untuk mengubah password akun sendiri.');
    });

    it('harus mengembalikan 404 jika admin target tidak ada', async () => {
      pool.execute.mockResolvedValueOnce([[]]);
      const token = signToken({ id: 1, username: 'admin', role: 'superadmin' });
      const res = await request(app)
        .put('/api/auth/reset-password/99')
        .set('Authorization', `Bearer ${token}`)
        .send({ newPassword: 'rahasia123' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('harus berhasil reset password admin lain', async () => {
      pool.execute.mockResolvedValueOnce([[{ id: 2 }]]);
      const token = signToken({ id: 1, username: 'admin', role: 'superadmin' });
      const res = await request(app)
        .put('/api/auth/reset-password/2')
        .set('Authorization', `Bearer ${token}`)
        .send({ newPassword: 'rahasia123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const updateCall = pool.execute.mock.calls.find((c) => c[0].includes('UPDATE admins'));
      expect(updateCall).toBeDefined();
    });
  });
});

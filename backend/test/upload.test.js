const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../config/db', () => ({
  execute: jest.fn(),
  getConnection: jest.fn().mockResolvedValue({
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    release: jest.fn(),
    query: jest.fn(),
  }),
}));

const pool = require('../config/db');
const app = require('../server');

const AUTH_TOKEN = jwt.sign(
  { id: 1, username: 'admin', role: 'superadmin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const BUFFER = Buffer.from('fake content for testing');

const acceptedCases = [
  ['PDF',  'test.pdf',  'application/pdf'],
  ['DOC',  'test.doc',  'application/msword'],
  ['DOCX', 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['DOCX', 'test.docx', 'application/msword'],
  ['DOCX', 'test.docx', 'application/octet-stream'],
  ['XLS',  'test.xls',  'application/vnd.ms-excel'],
  ['XLSX', 'test.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ['PPT',  'test.ppt',  'application/vnd.ms-powerpoint'],
  ['PPTX', 'test.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  ['ZIP',  'test.zip',  'application/zip'],
  ['ZIP',  'test.zip',  'application/x-zip-compressed'],
  ['ZIP',  'test.zip',  'application/octet-stream'],
  ['CSV',  'test.csv',  'text/csv'],
  ['CSV',  'test.csv',  'application/vnd.ms-excel'],
  ['CSV',  'test.csv',  'text/plain'],
  ['TXT',  'test.txt',  'text/plain'],
  ['RTF',  'test.rtf',  'application/rtf'],
  ['RTF',  'test.rtf',  'text/rtf'],
];

const rejectedCases = [
  ['EXE-disguised-as-JPG', 'virus.jpg', 'image/jpeg'],
  ['JAR-disguised-as-DOCX', 'malware.docx', 'application/java-archive'],
  ['JS-disguised-as-TXT', 'script.txt', 'application/javascript'],
  ['APK-disguised-as-ZIP', 'app.zip', 'application/vnd.android.package-archive'],
  ['BMP-not-whitelisted',  'photo.bmp', 'image/bmp'],
  ['DOCX-with-octet-stream-exe-renamed', 'fake.docx', 'application/x-msdownload'],
  ['ZIP-with-octet-stream-exe-renamed',  'fake.zip',  'application/x-executable'],
];

describe('Document Upload — MIME Type + Extension Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('should ACCEPT', () => {
    acceptedCases.forEach(([label, filename, mime]) => {
      it(`accepts ${filename} (${label}: ${mime})`, async () => {
        pool.execute.mockResolvedValueOnce([{ insertId: 1 }]);
        pool.execute.mockResolvedValueOnce([]);

        const res = await request(app)
          .post('/api/upload/document')
          .set('Authorization', `Bearer ${AUTH_TOKEN}`)
          .attach('document', BUFFER, { filename, contentType: mime });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
      });
    });
  });

  describe('should REJECT', () => {
    rejectedCases.forEach(([label, filename, mime]) => {
      it(`rejects ${filename} (${label}: ${mime})`, async () => {
        const res = await request(app)
          .post('/api/upload/document')
          .set('Authorization', `Bearer ${AUTH_TOKEN}`)
          .attach('document', BUFFER, { filename, contentType: mime });

        expect(res.status).toBeGreaterThanOrEqual(400);
        expect(res.body.success).toBe(false);
      });
    });
  });

  describe('edge cases', () => {
    it('rejects .exe file even with correct image MIME', async () => {
      const res = await request(app)
        .post('/api/upload/document')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .attach('document', BUFFER, { filename: 'malware.exe', contentType: 'application/x-msdownload' });

      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('rejects .php file with document MIME type', async () => {
      const res = await request(app)
        .post('/api/upload/document')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .attach('document', BUFFER, { filename: 'shell.php', contentType: 'text/plain' });

      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('rejects no file at all', async () => {
      const res = await request(app)
        .post('/api/upload/document')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});

/**
 * Runner migration homepage_sections (migrations_homepage.sql).
 * Cara pakai: node database/runHomepageMigration.js
 * Idempotent: aman dijalankan berulang (CREATE TABLE IF NOT EXISTS
 * + INSERT ... ON DUPLICATE KEY UPDATE).
 */
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function run() {
  console.log('Starting homepage_sections migration...');
  const connection = await pool.getConnection();

  try {
    const sqlPath = path.join(__dirname, 'migrations_homepage.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Eksekusi per statement (split ";" di akhir statement, aman untuk seed
    // JSON di file ini karena tidak ada ";" di dalam string data).
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--') === false || s.length > 0)
      .filter((s) => {
        // Buang blok yang hanya berisi komentar
        const withoutComments = s
          .split('\n')
          .filter((line) => !line.trim().startsWith('--'))
          .join('\n')
          .trim();
        return withoutComments.length > 0;
      });

    for (const statement of statements) {
      await connection.query(statement);
    }

    const [rows] = await connection.query(
      'SELECT section_key, status FROM homepage_sections ORDER BY id ASC'
    );
    console.log('Sections in database:');
    rows.forEach((r) => console.log(`  - ${r.section_key} (${r.status})`));

    console.log('Homepage migration finished successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exitCode = 1;
  } finally {
    connection.release();
    await pool.end();
  }
}

run();

const pool = require('../config/db');


const sql = `CREATE TABLE IF NOT EXISTS code_snippets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  language ENUM('html', 'css', 'js', 'combined') DEFAULT 'html',
  tags VARCHAR(500) NULL COMMENT 'Comma-separated tags',
  html_code LONGTEXT NULL,
  css_code LONGTEXT NULL,
  js_code LONGTEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_language (language),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

pool.execute(sql)
  .then(() => { console.log('✅ Table code_snippets created OK'); process.exit(0); })
  .catch(e => { console.error('❌', e.message); process.exit(1); });

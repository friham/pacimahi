const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function main() {
  const [username, newPassword] = process.argv.slice(2);

  if (!username || !newPassword) {
    console.error('Cara pakai: node database/resetAdminPassword.js <username> <passwordBaru>');
    process.exit(1);
  }

  if (newPassword.length < 6) {
    console.error('❌ Password baru minimal 6 karakter.');
    process.exit(1);
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, username FROM admins WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      console.error(`❌ Admin dengan username "${username}" tidak ditemukan.`);
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, rows[0].id]
    );

    console.log(`✅ Password admin "${username}" berhasil direset. Silakan login dengan password baru.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal reset password:', error.message);
    process.exit(1);
  }
}

main();

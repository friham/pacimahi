const pool = require('../config/db');

/**
 * Track page visit
 * POST /api/analytics/track
 * Body: { path: string }
 */
const trackVisit = async (req, res, next) => {
  try {
    let { path } = req.body;

    if (typeof path === 'string') {
      path = path.trim().substring(0, 255);
    } else {
      path = '/';
    }

    // Exclude admin panel visits from public analytics
    if (path.startsWith('/admin')) {
      return res.json({ success: true, tracked: false });
    }

    await pool.query('INSERT INTO page_visits (path) VALUES (?)', [path]);

    return res.json({ success: true, tracked: true });
  } catch (err) {
    next(err);
  }
};

/**
 * Heartbeat for online active sessions
 * POST /api/analytics/heartbeat
 * Body: { session_id: string }
 */
const heartbeat = async (req, res, next) => {
  try {
    const { session_id } = req.body;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid session_id' });
    }

    const cleanSessionId = session_id.trim().substring(0, 64);
    if (!cleanSessionId) {
      return res.status(400).json({ success: false, message: 'Empty session_id' });
    }

    await pool.query(
      `INSERT INTO active_sessions (session_id, last_ping_at) 
       VALUES (?, NOW()) 
       ON DUPLICATE KEY UPDATE last_ping_at = NOW()`,
      [cleanSessionId]
    );

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * Get visitor statistics
 * GET /api/analytics/stats
 * Output: { hari_ini, minggu_ini, bulan_ini, total, online }
 */
const getStats = async (req, res, next) => {
  try {
    // 1. Routine cleanup: remove stale sessions older than 30 minutes
    pool.query('DELETE FROM active_sessions WHERE last_ping_at < NOW() - INTERVAL 30 MINUTE')
      .catch((err) => console.warn('Session cleanup error:', err.message));

    // 2. Query stats using parallel queries
    const [
      [todayRows],
      [weekRows],
      [monthRows],
      [totalRows],
      [onlineRows]
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) AS count FROM page_visits WHERE visited_at >= CURDATE()'),
      pool.query('SELECT COUNT(*) AS count FROM page_visits WHERE visited_at >= (CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY)'),
      pool.query('SELECT COUNT(*) AS count FROM page_visits WHERE visited_at >= DATE_FORMAT(NOW(), "%Y-%m-01")'),
      pool.query('SELECT COUNT(*) AS count FROM page_visits'),
      pool.query('SELECT COUNT(*) AS count FROM active_sessions WHERE last_ping_at >= NOW() - INTERVAL 15 MINUTE')
    ]);

    return res.json({
      success: true,
      data: {
        hari_ini: Number(todayRows[0]?.count || 0),
        minggu_ini: Number(weekRows[0]?.count || 0),
        bulan_ini: Number(monthRows[0]?.count || 0),
        total: Number(totalRows[0]?.count || 0),
        online: Number(onlineRows[0]?.count || 0)
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  trackVisit,
  heartbeat,
  getStats
};

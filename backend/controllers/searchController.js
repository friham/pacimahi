const pool = require('../config/db');

const globalSearch = async (req, res) => {
  try {
    const q = req.query.q ? String(req.query.q).trim() : '';

    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }

    const searchTerm = `%${q}%`;

    // 1. Search Published CMS Pages
    const pagesPromise = pool.execute(
      `SELECT id, title, slug, excerpt, content_html,
        (CASE WHEN title LIKE ? THEN 2 ELSE 1 END) AS relevance
       FROM pages 
       WHERE status = 'published' 
         AND (title LIKE ? OR excerpt LIKE ? OR content_html LIKE ?)
       ORDER BY relevance DESC, updated_at DESC
       LIMIT 5`,
      [searchTerm, searchTerm, searchTerm, searchTerm]
    );

    // 2. Search Published News
    const newsPromise = pool.execute(
      `SELECT id, title, slug, content, category,
        (CASE WHEN title LIKE ? THEN 2 ELSE 1 END) AS relevance
       FROM news 
       WHERE is_published = TRUE 
         AND (title LIKE ? OR content LIKE ?)
       ORDER BY relevance DESC, published_at DESC
       LIMIT 5`,
      [searchTerm, searchTerm, searchTerm]
    );

    // 3. Search Services
    const servicesPromise = pool.execute(
      `SELECT id, name, description, link,
        (CASE WHEN name LIKE ? THEN 2 ELSE 1 END) AS relevance
       FROM services 
       WHERE (name LIKE ? OR description LIKE ?)
       ORDER BY relevance DESC, sort_order ASC
       LIMIT 5`,
      [searchTerm, searchTerm, searchTerm]
    );

    const [[pageRows], [newsRows], [serviceRows]] = await Promise.all([
      pagesPromise,
      newsPromise,
      servicesPromise
    ]);

    const results = [];

    // Format Pages
    pageRows.forEach((p) => {
      const cleanSnippet = p.excerpt 
        ? p.excerpt 
        : (p.content_html || '').replace(/<[^>]*>?/gm, '').substring(0, 110);

      results.push({
        type: 'halaman',
        typeLabel: 'Halaman',
        id: `page-${p.id}`,
        title: p.title,
        snippet: cleanSnippet,
        url: `/p/${p.slug}`,
        relevance: p.relevance
      });
    });

    // Format News
    newsRows.forEach((n) => {
      const cleanSnippet = (n.content || '').replace(/<[^>]*>?/gm, '').substring(0, 110);
      results.push({
        type: 'berita',
        typeLabel: 'Berita',
        id: `news-${n.id}`,
        title: n.title,
        snippet: cleanSnippet,
        url: `/publikasi/berita?search=${encodeURIComponent(n.title)}`,
        relevance: n.relevance
      });
    });

    // Format Services
    serviceRows.forEach((s) => {
      results.push({
        type: 'layanan',
        typeLabel: 'Layanan',
        id: `service-${s.id}`,
        title: s.name,
        snippet: s.description || 'Layanan publik Pengadilan Agama Kota Cimahi',
        url: s.link && s.link.startsWith('http') ? s.link : (s.link || '/layanan-publik'),
        isExternal: Boolean(s.link && s.link.startsWith('http')),
        relevance: s.relevance
      });
    });

    // Sort by relevance (title match first)
    results.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('GlobalSearch error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses pencarian.'
    });
  }
};

module.exports = {
  globalSearch
};

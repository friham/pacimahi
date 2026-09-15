import { FaSearch, FaShareAlt } from 'react-icons/fa';

export default function SeoForm({ formData, onChange, onOpenMediaLibrary }) {
  return (
    <div className="cms-seo-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
          <FaSearch size={12} /> Pratinjau Hasil Pencarian Google
        </div>
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          <div style={{ fontSize: '0.85rem', color: '#202124' }}>
            https://pa-cimahi.go.id › {formData.slug || 'slug-halaman'}
          </div>
          <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 500, margin: '2px 0', textDecoration: 'none' }}>
            {formData.seo_title || formData.title || 'Judul Halaman - PA Kota Cimahi'}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#4d5156', lineHeight: 1.4 }}>
            {formData.meta_description || formData.excerpt || 'Deskripsi halaman akan tampil di sini untuk membantu mesin pencari Google menemukan informasi Anda.'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Slug URL (Jalur Web):
          </label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            value={formData.slug || ''}
            onChange={(e) => onChange('slug', e.target.value)}
            placeholder="contoh: sejarah-pengadilan"
          />
          <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>Hanya huruf kecil, angka, dan tanda hubung (-).</small>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            SEO Title:
          </label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            value={formData.seo_title || ''}
            onChange={(e) => onChange('seo_title', e.target.value)}
            placeholder="Judul yang tampil di tab browser & Google"
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
          Meta Description (Maks. 160 karakter disarankan):
        </label>
        <textarea 
          rows={3}
          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          value={formData.meta_description || ''}
          onChange={(e) => onChange('meta_description', e.target.value)}
          placeholder="Ringkasan isi halaman untuk mesin pencari..."
        />
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: (formData.meta_description || '').length > 160 ? '#dc2626' : '#6b7280' }}>
          {(formData.meta_description || '').length} / 160 karakter
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
          Kata Kunci (Meta Keywords):
        </label>
        <input 
          type="text" 
          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          value={formData.meta_keywords || ''}
          onChange={(e) => onChange('meta_keywords', e.target.value)}
          placeholder="pengadilan agama cimahi, putusan, cerai, jadwal sidang (pisahkan dengan koma)"
        />
      </div>

      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '10px' }}>
          <FaShareAlt size={12} /> Media Sosial / OpenGraph (WhatsApp, Facebook, Twitter)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>OG Title:</label>
            <input 
              type="text" 
              style={{ width: '100%', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              value={formData.og_title || ''}
              onChange={(e) => onChange('og_title', e.target.value)}
              placeholder="Judul share media sosial"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>OG Image URL:</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input 
                type="text" 
                style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                value={formData.og_image || ''}
                onChange={(e) => onChange('og_image', e.target.value)}
                placeholder="https://... URL gambar thumbnail share"
              />
              {onOpenMediaLibrary && (
                <button 
                  type="button" 
                  style={{ padding: '6px 12px', background: '#0b4619', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                  onClick={() => onOpenMediaLibrary((url) => onChange('og_image', url))}
                >
                  Pilih
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

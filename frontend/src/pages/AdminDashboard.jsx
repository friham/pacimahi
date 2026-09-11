import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ImageUploader from '../components/ImageUploader';
import DocumentUploader from '../components/DocumentUploader';
import BlockRenderer from '../components/cms/BlockRenderer';
import { 
  FaSignOutAlt, FaHome, FaUsers, FaNewspaper, 
  FaImages, FaCog, FaChartBar, FaTachometerAlt, 
  FaCalendarAlt, FaBell, FaPlus, FaEdit, FaTrash, 
  FaCheck, FaTimes, FaUndo, FaSearch, FaSlidersH, FaSave, FaFilePdf,
  FaUserShield, FaUser, FaLock, FaKey, FaCamera, FaEye, FaEyeSlash, FaCheckCircle, FaShieldAlt,
  FaEnvelope, FaIdCard, FaBars,
  FaClock, FaArrowRight, FaExternalLinkAlt, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt,
  FaSitemap, FaFileAlt, FaFolder, FaClipboardList, FaLink, FaGlobe,
  FaToggleOn, FaToggleOff, FaEllipsisV, FaCopy, FaFileUpload, FaFileWord, FaFileExcel,
  FaFilePowerpoint, FaFileArchive, FaChevronRight, FaChevronDown, FaAngleRight, FaAngleDown,
  FaAlignLeft, FaHeading, FaListUl, FaQuoteRight, FaTable, FaVideo, FaImage,
  FaInfo, FaDownload, FaEyeDropper, FaSortAmountDown, FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import logoPaCimahi from '../assets/logo-pa-cimahi.png';
import { sanitizeHtml } from '../sanitize';
import './AdminDashboard.css';

import { API_URL, SERVER_URL } from '../config';

// Helper untuk memastikan URL avatar mengarah ke server backend jika berupa relative upload path
const getAvatarUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `${SERVER_URL}${url}`;
  }
  return `${SERVER_URL}/${url}`;
};

function AdminDashboard() {
  const { user, token, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');

  useEffect(() => {
    document.title = 'Admin Panel | Pengadilan Agama Kota Cimahi Kelas IA';
  }, []);

  // Account Settings state
  const [accountForm, setAccountForm] = useState({
    username: user?.username || '',
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [accountLoading, setAccountLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarImgError, setAvatarImgError] = useState(false);
  const [headerImgError, setHeaderImgError] = useState(false);
  const avatarFileInputRef = useRef(null);

  // Sidebar Open / Close Collapse State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('admin_sidebar_collapsed') === 'true';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setMobileSidebarOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => {
        const next = !prev;
        localStorage.setItem('admin_sidebar_collapsed', String(next));
        return next;
      });
    }
  };

  // Sync account form when user updates
  useEffect(() => {
    if (user) {
      setAccountForm({
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
      setHeaderImgError(false);
    }
  }, [user]);

  useEffect(() => {
    setAvatarImgError(false);
  }, [accountForm.avatar]);

  // CRUD state
  const [sliders, setSliders] = useState([]);
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);

  // === CMS State ===
  const [menus, setMenus] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [pages, setPages] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Menu form
  const [menuForm, setMenuForm] = useState({
    title: '', slug: '', parent_id: '', type: 'page', url: '', icon: '',
    sort_order: 0, status: 'published', open_new_tab: false, description: ''
  });
  const [expandedMenus, setExpandedMenus] = useState({});

  // Page form & editor
  const [pageForm, setPageForm] = useState({
    title: '', subtitle: '', slug: '', excerpt: '', content_html: '',
    status: 'draft', seo_title: '', meta_description: '', meta_keywords: '',
    menu_id: '', blocks: []
  });
  const [pageSearch, setPageSearch] = useState('');
  const [pageStatusFilter, setPageStatusFilter] = useState('all');
  const [mediaSearch, setMediaSearch] = useState('');
  const [docSearch, setDocSearch] = useState('');
  const [docForm, setDocForm] = useState({
    doc_title: '', doc_number: '', doc_date: '', description: '', file_url: ''
  });
  const [mediaUploadFile, setMediaUploadFile] = useState(null);
  const [mediaAltText, setMediaAltText] = useState('');
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaUploading, setMediaUploading] = useState(false);
  const [previewPage, setPreviewPage] = useState(null);
  const mediaFileRef = useRef(null);
  const docFileRef = useRef(null);

  // Modal dialogs for Rich Media insertion in Page Editor
  const [insertModal, setInsertModal] = useState(null); // 'image' | 'pdf' | 'video' | null
  const [insertImageForm, setInsertImageForm] = useState({
    url: '',
    caption: '',
    alt: '',
    alignment: 'center' // 'center' | 'full'
  });
  const [insertPdfForm, setInsertPdfForm] = useState({
    url: '',
    title: '',
    desc: 'Unduh dokumen resmi Pengadilan Agama Kota Cimahi Kelas IA.',
    mode: 'card' // 'card' (Download Card) | 'embed' (PDF Iframe Viewer)
  });
  const [insertVideoForm, setInsertVideoForm] = useState({
    url: '',
    title: ''
  });

  // Helper functions for Container/Block Editor
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === 'text' ? { html: '' }
             : type === 'image' ? { url: '', caption: '', alt: '' }
             : type === 'video' ? { url: '', title: '', caption: '' }
             : type === 'document' ? { file_url: '', doc_title: '', description: '' }
             : type === 'callout' ? { title: 'Informasi Penting', text: '' }
             : type === 'table' ? { headers: ['Kolom 1', 'Kolom 2', 'Kolom 3'], rows: [['', '', ''], ['', '', '']], has_header: true }
             : {},
      settings: type === 'image' ? { align: 'center', width: '100%' } : {},
      sort_order: (pageForm.blocks || []).length + 1
    };
    setPageForm(prev => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock]
    }));
  };

  const updateBlockContent = (index, field, value) => {
    setPageForm(prev => {
      const updated = [...(prev.blocks || [])];
      updated[index] = {
        ...updated[index],
        content: {
          ...(updated[index].content || {}),
          [field]: value
        }
      };
      return { ...prev, blocks: updated };
    });
  };

  const updateBlockSettings = (index, field, value) => {
    setPageForm(prev => {
      const updated = [...(prev.blocks || [])];
      updated[index] = {
        ...updated[index],
        settings: {
          ...(updated[index].settings || {}),
          [field]: value
        }
      };
      return { ...prev, blocks: updated };
    });
  };

  const moveBlock = (index, direction) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= blocks.length) return prev;
      const temp = blocks[index];
      blocks[index] = blocks[targetIndex];
      blocks[targetIndex] = temp;
      // Re-normalize sort_order so frontend renders in correct order
      const normalized = blocks.map((b, i) => ({ ...b, sort_order: i + 1 }));
      return { ...prev, blocks: normalized };
    });
  };

  const deleteBlock = (index) => {
    setPageForm(prev => ({
      ...prev,
      blocks: (prev.blocks || []).filter((_, i) => i !== index).map((b, i) => ({ ...b, sort_order: i + 1 }))
    }));
  };

  // Table block helpers
  const updateTableHeader = (blockIndex, colIndex, value) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const headers = [...(blocks[blockIndex].content.headers || [])];
      headers[colIndex] = value;
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, headers } };
      return { ...prev, blocks };
    });
  };

  const updateTableCell = (blockIndex, rowIndex, colIndex, value) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const rows = blocks[blockIndex].content.rows.map(r => [...r]);
      rows[rowIndex][colIndex] = value;
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, rows } };
      return { ...prev, blocks };
    });
  };

  const addTableRow = (blockIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const colCount = (blocks[blockIndex].content.headers || []).length || 2;
      const newRow = Array(colCount).fill('');
      const rows = [...(blocks[blockIndex].content.rows || []), newRow];
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, rows } };
      return { ...prev, blocks };
    });
  };

  const removeTableRow = (blockIndex, rowIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const rows = (blocks[blockIndex].content.rows || []).filter((_, i) => i !== rowIndex);
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, rows } };
      return { ...prev, blocks };
    });
  };

  const addTableColumn = (blockIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const headers = [...(blocks[blockIndex].content.headers || []), `Kolom ${(blocks[blockIndex].content.headers || []).length + 1}`];
      const rows = (blocks[blockIndex].content.rows || []).map(r => [...r, '']);
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, headers, rows } };
      return { ...prev, blocks };
    });
  };

  const removeTableColumn = (blockIndex, colIndex) => {
    setPageForm(prev => {
      const blocks = [...(prev.blocks || [])];
      const headers = (blocks[blockIndex].content.headers || []).filter((_, i) => i !== colIndex);
      const rows = (blocks[blockIndex].content.rows || []).map(r => r.filter((_, i) => i !== colIndex));
      blocks[blockIndex] = { ...blocks[blockIndex], content: { ...blocks[blockIndex].content, headers, rows } };
      return { ...prev, blocks };
    });
  };

  // Site Settings state
  const [settings, setSettings] = useState({
    hero_badge: 'Zona Integritas WBK & WBBM',
    hero_title: 'Selamat Datang di Pengadilan Agama Kota Cimahi',
    hero_subtitle: 'Mewujudkan Peradilan Agama yang Agung, Bersih, dan Melayani dengan Sepenuh Hati untuk Masyarakat Kota Cimahi.',
    running_text: 'Selamat Datang di Website Resmi Pengadilan Agama Kota Cimahi Kelas II • Pelayanan PTSP Buka Senin-Jumat • Stop Pungli & Gratifikasi • Layanan e-Court MA RI Tersedia 24 Jam',
    stat_diterima: '3.420',
    stat_diputus: '3.365',
    stat_persentase: '98,4%',
    stat_ikm: '97,8%',
    court_address: 'Jl. Encep Kartawiria No. 28, Cimahi Tengah, Kota Cimahi 40526',
    court_phone: '(022) 6631 334',
    court_email: 'info@pa-cimahi.go.id',
    court_whatsapp: '6281234567890'
  });

  // Form states
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Form input fields
  const [sliderForm, setSliderForm] = useState({ title: '', image_url: '', description: '', link: '', sort_order: 0, is_active: true });
  const [serviceForm, setServiceForm] = useState({ name: '', icon: '', description: '', link: '', sort_order: 0, is_active: true });
  const [newsForm, setNewsForm] = useState({ title: '', content: '', image_url: '', category: 'berita', is_published: true });

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // API fetches
  const fetchSliders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/sliders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSliders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchServices = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/services/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchNews = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/news/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/settings`);
      if (res.data.success && Object.keys(res.data.data).length > 0) {
        setSettings(prev => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // === CMS Fetches ===
  const fetchMenus = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/menus`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenus(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchMenuTree = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/menus/tree`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMenuTree(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token]);

  const fetchPages = useCallback(async () => {
    try {
      const params = {};
      if (pageStatusFilter && pageStatusFilter !== 'all') params.status = pageStatusFilter;
      if (pageSearch) params.search = pageSearch;
      const res = await axios.get(`${API_URL}/pages`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setPages(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token, pageStatusFilter, pageSearch]);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/media`, {
        headers: { Authorization: `Bearer ${token}` },
        params: mediaSearch ? { search: mediaSearch } : {}
      });
      setMediaList(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token, mediaSearch]);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/documents`, {
        headers: { Authorization: `Bearer ${token}` },
        params: docSearch ? { search: docSearch } : {}
      });
      setDocuments(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token, docSearch]);

  const fetchAuditLogs = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAuditLogs(res.data.data || []);
    } catch (err) { console.error(err); }
  }, [token]);

  useEffect(() => {
    fetchSettings();
    if (activeTab === 'Kelola Slider') fetchSliders();
    if (activeTab === 'Kelola Layanan') fetchServices();
    if (activeTab === 'Kelola Berita') fetchNews();
    if (activeTab === 'Pengaturan Website') fetchSettings();
    if (activeTab === 'Kelola Menu') { fetchMenus(); fetchMenuTree(); }
    if (activeTab === 'Kelola Halaman') fetchPages();
    if (activeTab === 'Media Library') fetchMedia();
    if (activeTab === 'Pustaka Dokumen') fetchDocuments();
    if (activeTab === 'Log Aktivitas') fetchAuditLogs();
  }, [activeTab, fetchSliders, fetchServices, fetchNews, fetchSettings, fetchMenus, fetchMenuTree, fetchPages, fetchMedia, fetchDocuments, fetchAuditLogs]);

  // CRUD actions for Sliders
  const handleSliderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/sliders/${editingItem.id}`, sliderForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Slider berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/sliders`, sliderForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Slider baru berhasil ditambahkan');
      }
      setIsAdding(false);
      setEditingItem(null);
      setSliderForm({ title: '', image_url: '', description: '', link: '', sort_order: 0, is_active: true });
      fetchSliders();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan slider', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteSlider = async (id) => {
    if (!window.confirm('Yakin ingin menghapus slider ini?')) return;
    try {
      await axios.delete(`${API_URL}/sliders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMsg('Slider berhasil dihapus');
      fetchSliders();
    } catch (err) {
      showMsg('Gagal menghapus slider', 'error');
    }
  };

  // CRUD actions for Services
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/services/${editingItem.id}`, serviceForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Layanan berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/services`, serviceForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Layanan baru berhasil ditambahkan');
      }
      setIsAdding(false);
      setEditingItem(null);
      setServiceForm({ name: '', icon: '', description: '', link: '', sort_order: 0, is_active: true });
      fetchServices();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan layanan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Yakin ingin menghapus layanan ini?')) return;
    try {
      await axios.delete(`${API_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMsg('Layanan berhasil dihapus');
      fetchServices();
    } catch (err) {
      showMsg('Gagal menghapus layanan', 'error');
    }
  };

  // CRUD actions for News
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/news/${editingItem.id}`, newsForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Berita berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/news`, newsForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showMsg('Berita baru berhasil ditambahkan');
      }
      setIsAdding(false);
      setEditingItem(null);
      setNewsForm({ title: '', content: '', image_url: '', category: 'berita', is_published: true });
      fetchNews();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan berita', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm('Yakin ingin menghapus berita ini?')) return;
    try {
      await axios.delete(`${API_URL}/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMsg('Berita berhasil dihapus');
      fetchNews();
    } catch (err) {
      showMsg('Gagal menghapus berita', 'error');
    }
  };

  // Save Settings
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMsg('Pengaturan website berhasil disimpan & disinkronkan ke Homepage!');
    } catch (err) {
      showMsg('Gagal menyimpan pengaturan website', 'error');
    } finally {
      setLoading(false);
    }
  };

  // === CMS: Menu CRUD ===
  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...menuForm, parent_id: menuForm.parent_id || null };
      if (editingItem) {
        await axios.put(`${API_URL}/menus/${editingItem.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Menu berhasil diperbarui!');
      } else {
        await axios.post(`${API_URL}/menus`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Menu baru berhasil ditambahkan!');
      }
      setIsAdding(false); setEditingItem(null);
      setMenuForm({ title: '', slug: '', parent_id: '', type: 'page', url: '', icon: '', sort_order: 0, status: 'published', open_new_tab: false, description: '' });
      fetchMenus(); fetchMenuTree();
      window.dispatchEvent(new Event('cms_menu_updated'));
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan menu.', 'error');
    } finally { setLoading(false); }
  };

  const deleteMenu = async (id) => {
    if (!window.confirm('Yakin hapus menu ini? Sub-menu akan dinaikkan ke level atasnya.')) return;
    try {
      await axios.delete(`${API_URL}/menus/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      showMsg('Menu berhasil dihapus.');
      fetchMenus(); fetchMenuTree();
      window.dispatchEvent(new Event('cms_menu_updated'));
    } catch (err) { showMsg('Gagal menghapus menu.', 'error'); }
  };

  const toggleMenuStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'inactive' : 'published';
    try {
      await axios.patch(`${API_URL}/menus/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      fetchMenus(); fetchMenuTree();
      window.dispatchEvent(new Event('cms_menu_updated'));
    } catch (err) { showMsg('Gagal mengubah status menu.', 'error'); }
  };

  // === CMS: Page CRUD ===
  const handlePageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...pageForm, menu_id: pageForm.menu_id || null };
      if (editingItem) {
        await axios.put(`${API_URL}/pages/${editingItem.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Halaman berhasil diperbarui!');
      } else {
        await axios.post(`${API_URL}/pages`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Halaman baru berhasil dibuat!');
      }
      setIsAdding(false); setEditingItem(null);
      setPageForm({ title: '', subtitle: '', slug: '', excerpt: '', content_html: '', status: 'draft', seo_title: '', meta_description: '', meta_keywords: '', menu_id: '', blocks: [] });
      fetchPages();
      window.dispatchEvent(new Event('cms_page_updated'));
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan halaman.', 'error');
    } finally { setLoading(false); }
  };

  const deletePage = async (id) => {
    if (!window.confirm('Yakin hapus halaman ini? Konten tidak bisa dikembalikan.')) return;
    try {
      await axios.delete(`${API_URL}/pages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      showMsg('Halaman berhasil dihapus.');
      fetchPages();
      window.dispatchEvent(new Event('cms_page_updated'));
    } catch (err) { showMsg('Gagal menghapus halaman.', 'error'); }
  };

  const togglePageStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await axios.patch(`${API_URL}/pages/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      showMsg(`Status halaman berhasil diubah ke ${newStatus}.`);
      fetchPages();
      window.dispatchEvent(new Event('cms_page_updated'));
    } catch (err) { showMsg('Gagal mengubah status halaman.', 'error'); }
  };

  // === CMS: Media Upload ===
  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (!mediaUploadFile) { showMsg('Pilih file gambar terlebih dahulu.', 'error'); return; }
    const formData = new FormData();
    formData.append('image', mediaUploadFile);
    formData.append('alt_text', mediaAltText);
    formData.append('caption', mediaCaption);
    setMediaUploading(true);
    try {
      await axios.post(`${API_URL}/media`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      showMsg('Media berhasil diunggah ke Media Library!');
      setMediaUploadFile(null); setMediaAltText(''); setMediaCaption('');
      if (mediaFileRef.current) mediaFileRef.current.value = '';
      fetchMedia();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal mengunggah media.', 'error');
    } finally { setMediaUploading(false); }
  };

  const deleteMedia = async (id) => {
    if (!window.confirm('Yakin hapus file media ini?')) return;
    try {
      await axios.delete(`${API_URL}/media/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      showMsg('Media berhasil dihapus.');
      fetchMedia();
    } catch (err) { showMsg('Gagal menghapus media.', 'error'); }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => showMsg('URL disalin ke clipboard!'));
  };

  // === CMS: Document ===
  const handleDocSubmit = async (e) => {
    e.preventDefault();
    if (!docForm.file_url) { showMsg('Upload dokumen terlebih dahulu.', 'error'); return; }
    setLoading(true);
    try {
      const payload = { ...docForm };
      if (editingItem) {
        await axios.put(`${API_URL}/documents/${editingItem.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Dokumen berhasil diperbarui!');
      } else {
        // Gunakan /by-url karena file_url sudah didapat dari DocumentUploader
        await axios.post(`${API_URL}/documents/by-url`, payload, { headers: { Authorization: `Bearer ${token}` } });
        showMsg('Dokumen berhasil ditambahkan ke Pustaka!');
      }
      setIsAdding(false); setEditingItem(null);
      setDocForm({ doc_title: '', doc_number: '', doc_date: '', description: '', file_url: '' });
      fetchDocuments();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal menyimpan dokumen.', 'error');
    } finally { setLoading(false); }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm('Yakin hapus dokumen ini?')) return;
    try {
      await axios.delete(`${API_URL}/documents/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      showMsg('Dokumen berhasil dihapus.');
      fetchDocuments();
    } catch (err) { showMsg('Gagal menghapus dokumen.', 'error'); }
  };

  // Tree rendering helper
  const renderMenuTreeItems = (items, depth = 0) => {
    return items.map(item => (
      <div key={item.id} className={`menu-tree-item menu-tree-item--depth-${depth}`}>
        <div className="menu-tree-row">
          <div className="menu-tree-row__left">
            {item.children?.length > 0 ? (
              <button className="menu-tree-expand" onClick={() => setExpandedMenus(prev => ({ ...prev, [item.id]: !prev[item.id] }))}>
                {expandedMenus[item.id] ? <FaAngleDown /> : <FaAngleRight />}
              </button>
            ) : <span className="menu-tree-expand menu-tree-expand--empty" />}
            <span className="menu-tree-icon"><FaSitemap /></span>
            <div className="menu-tree-info">
              <span className="menu-tree-title">{item.title}</span>
              <span className="menu-tree-slug">/{item.slug}</span>
            </div>
          </div>
          <div className="menu-tree-row__right">
            <span className={`cms-badge cms-badge--${item.type}`}>{item.type}</span>
            <span className={`cms-badge cms-badge--status-${item.status}`}>{item.status}</span>
            <button className="cms-btn cms-btn--icon cms-btn--edit" title="Edit Menu" onClick={() => {
              setEditingItem(item);
              setMenuForm({ title: item.title, slug: item.slug, parent_id: item.parent_id || '', type: item.type, url: item.url || '', icon: item.icon || '', sort_order: item.sort_order, status: item.status, open_new_tab: !!item.open_new_tab, description: item.description || '' });
              setIsAdding(true);
            }}>
              <FaEdit /> Edit
            </button>
            <button 
              className={`cms-btn cms-btn--icon ${item.status === 'published' ? 'cms-btn--toggle' : 'cms-btn--toggle-draft'}`} 
              title={item.status === 'published' ? 'Nonaktifkan Menu' : 'Aktifkan Menu'} 
              onClick={() => toggleMenuStatus(item.id, item.status)}
            >
              {item.status === 'published' ? <><FaToggleOn /> Aktif</> : <><FaToggleOff /> Nonaktif</>}
            </button>
            <button className="cms-btn cms-btn--icon cms-btn--delete" title="Hapus Menu" onClick={() => deleteMenu(item.id)}>
              <FaTrash /> Hapus
            </button>
          </div>
        </div>
        {item.children?.length > 0 && expandedMenus[item.id] && (
          <div className="menu-tree-children">
            {renderMenuTreeItems(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  // Handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (avatarUploading) {
      showMsg('Sedang mengunggah foto avatar, mohon tunggu sebentar...', 'error');
      return;
    }
    if (accountForm.avatar && accountForm.avatar.startsWith('blob:')) {
      showMsg('Foto masih diproses, silakan coba lagi sesaat.', 'error');
      return;
    }
    setAccountLoading(true);
    try {
      const res = await axios.put(`${API_URL}/auth/profile`, accountForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        updateUser(res.data.data.admin, res.data.data.token);
        showMsg('Profil akun admin berhasil diperbarui!');
      }
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal memperbarui profil.', 'error');
    } finally {
      setAccountLoading(false);
    }
  };

  // Handle change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMsg('Konfirmasi password baru tidak cocok.', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showMsg('Password baru minimal 6 karakter.', 'error');
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await axios.put(`${API_URL}/auth/password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        showMsg('Password akun admin berhasil diubah!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal mengubah password.', 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle avatar upload from file
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showMsg('Ukuran file foto maksimal 5MB.', 'error');
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
      return;
    }

    // Tampilkan preview lokal secepat mungkin untuk feedback instan
    const localPreview = URL.createObjectURL(file);
    setAccountForm(prev => ({ ...prev, avatar: localPreview }));
    setAvatarImgError(false);

    const formData = new FormData();
    formData.append('image', file);

    setAvatarUploading(true);
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        const newAvatarUrl = res.data.data.image_url;
        setAccountForm(prev => ({ ...prev, avatar: newAvatarUrl }));
        showMsg('Foto avatar berhasil diunggah! Klik "Simpan Perubahan Profil" untuk menerapkan.');
      }
    } catch (err) {
      showMsg(err.response?.data?.message || 'Gagal mengunggah foto avatar.', 'error');
      setAccountForm(prev => ({ ...prev, avatar: user?.avatar || '' }));
    } finally {
      setAvatarUploading(false);
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
    }
  };

  const stats = [
    { label: 'Total Perkara', value: settings.stat_diterima || '3.420', icon: FaChartBar, color: '#4CAF50' },
    { label: 'Perkara Diputus', value: settings.stat_diputus || '3.365', icon: FaNewspaper, color: '#2196F3' },
    { label: 'Penyelesaian (%)', value: settings.stat_persentase || '98,4%', icon: FaCalendarAlt, color: '#FF9800' },
    { label: 'Indeks Kepuasan (IKM)', value: settings.stat_ikm || '97,8%', icon: FaUsers, color: '#9C27B0' },
  ];
  const navSections = [
    {
      title: 'KONTEN WEBSITE',
      items: [
        { label: 'Dashboard', short: 'Beranda', icon: FaTachometerAlt },
        { label: 'Kelola Berita', short: 'Berita', icon: FaNewspaper },
        { label: 'Kelola Slider', short: 'Slider', icon: FaImages },
        { label: 'Kelola Layanan', short: 'Layanan', icon: FaCog },
      ]
    },
    {
      title: 'CMS DINAMIS',
      items: [
        { label: 'Kelola Menu', short: 'Menu', icon: FaSitemap },
        { label: 'Kelola Halaman', short: 'Halaman', icon: FaFileAlt },
        { label: 'Media Library', short: 'Media', icon: FaFolder },
        { label: 'Pustaka Dokumen', short: 'Dokumen', icon: FaFilePdf },
        { label: 'Log Aktivitas', short: 'Log', icon: FaClipboardList },
      ]
    },
    {
      title: 'SISTEM',
      items: [
        { label: 'Pengaturan Website', short: 'Sistem', icon: FaSlidersH },
        { label: 'Pengaturan Akun', short: 'Akun', icon: FaUserShield },
      ]
    }
  ];

  return (
    <div className={`admin-dashboard ${sidebarCollapsed ? 'admin-dashboard--collapsed' : ''}`}>
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="admin-sidebar-backdrop animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - YouTube Style */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'admin-sidebar--collapsed' : ''} ${mobileSidebarOpen ? 'admin-sidebar--mobile-open' : ''}`}>
        {/* Header with circular YouTube toggle on the left, brand on the right */}
        <div className="admin-sidebar__header">
          <button
            type="button"
            className="admin-sidebar__yt-toggle"
            onClick={toggleSidebar}
            title={sidebarCollapsed ? "Perluas Menu" : "Ciutkan Menu"}
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>

          {!sidebarCollapsed && (
            <div className="admin-sidebar__brand">
              <img
                src={logoPaCimahi}
                alt="Logo Pengadilan Agama Kota Cimahi"
                className="admin-sidebar__logo-img"
              />
              <div className="admin-sidebar__brand-text">
                <span className="admin-sidebar__brand-title">Pengadilan Agama Kota Cimahi Kelas IA</span>
                <span className="admin-sidebar__brand-sub">Admin Panel</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Body */}
        <nav className="admin-sidebar__nav">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="admin-sidebar__section">
              {sIdx > 0 && <div className="admin-sidebar__divider" />}
              {!sidebarCollapsed && (
                <p className="admin-sidebar__section-title">{section.title}</p>
              )}
              <div className="admin-sidebar__section-items">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.label;
                  return (
                    <button
                      key={iIdx}
                      className={`admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
                      title={item.label}
                      onClick={() => {
                        setActiveTab(item.label);
                        setIsAdding(false);
                        setEditingItem(null);
                        if (window.innerWidth <= 768) setMobileSidebarOpen(false);
                      }}
                    >
                      <Icon className="admin-sidebar__link-icon" />
                      <span className="admin-sidebar__link-text">
                        {sidebarCollapsed ? item.short : item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__divider" />
          <Link 
            to="/" 
            className="admin-sidebar__link"
            title="Lihat Website"
          >
            <FaHome className="admin-sidebar__link-icon" />
            <span className="admin-sidebar__link-text">
              {sidebarCollapsed ? 'Web' : 'Lihat Website'}
            </span>
          </Link>
          <button 
            className="admin-sidebar__link admin-sidebar__link--logout" 
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt className="admin-sidebar__link-icon" />
            <span className="admin-sidebar__link-text">
              {sidebarCollapsed ? 'Keluar' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main ${sidebarCollapsed ? 'admin-main--collapsed' : ''}`}>
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header__left">
            <button
              type="button"
              className="admin-header__mobile-toggle"
              onClick={toggleSidebar}
              title="Buka Menu Navigasi"
              aria-label="Buka Menu Navigasi"
            >
              <FaBars />
            </button>
            <div>
              <h1 className="admin-header__title">{activeTab}</h1>
              <p className="admin-header__subtitle">Halo, {user?.name || 'Admin'}! Anda memiliki kontrol penuh atas konten website.</p>
            </div>
          </div>
          <div 
            className="admin-header__user"
            onClick={() => {
              setActiveTab('Pengaturan Akun');
              setIsAdding(false);
              setEditingItem(null);
            }}
            title="Klik untuk mengelola akun & profil admin"
          >
            <div className="admin-header__avatar">
              {user?.avatar && !headerImgError ? (
                <img
                  src={getAvatarUrl(user.avatar)}
                  alt={user.name || 'Admin'}
                  className="admin-header__avatar-img"
                  onError={() => setHeaderImgError(true)}
                />
              ) : (
                (user?.name || user?.username || 'A').charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <p className="admin-header__user-name">{user?.name || 'Administrator'}</p>
              <p className="admin-header__user-role">{user?.role || 'superadmin'}</p>
            </div>
            <div className="admin-header__user-edit-hint" title="Pengaturan Akun">
              <FaEdit />
            </div>
          </div>
        </header>

        {/* Global Message Alerts */}
        {message.text && (
          <div className={`crud-alert crud-alert--${message.type} animate-fade-in-down`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ text: '', type: '' })} className="crud-alert__close">
              <FaTimes />
            </button>
          </div>
        )}

        {/* TAB: DASHBOARD */}
        {activeTab === 'Dashboard' && (
          <div className="dashboard-home animate-fade-in-up">

            {/* Welcome Banner */}
            <div className="dash-banner">
              <div className="dash-banner__bg-blobs">
                <span className="dash-banner__blob dash-banner__blob--1"/>
                <span className="dash-banner__blob dash-banner__blob--2"/>
                <span className="dash-banner__blob dash-banner__blob--3"/>
              </div>
              <div className="dash-banner__left">
                <h2 className="dash-banner__title">
                  Selamat datang, <span className="dash-banner__name">{user?.name || 'Administrator'}!</span>
                </h2>
                <p className="dash-banner__sub">
                  Kelola konten website Pengadilan Agama Kota Cimahi Kelas IA secara real-time. Perubahan yang Anda simpan langsung tampil ke publik.
                </p>
              </div>
              <div className="dash-banner__right">
                <div className="dash-banner__emblem-wrap">
                  <img src={logoPaCimahi} alt="PA Cimahi" className="dash-banner__emblem" />
                </div>
              </div>
            </div>

            {/* Stat Cards with Sparklines (Inspired by Reference) */}
            <div className="admin-stats">
              {/* Card 1: Total Perkara */}
              <div className="admin-stat-card admin-stat-card--graph">
                <div className="admin-stat-card__top">
                  <span className="admin-stat-card__label">Total Perkara</span>
                  <span className="stat-badge stat-badge--green">+3,4% ↑</span>
                </div>
                <div className="admin-stat-card__value-row">
                  <h3 className="admin-stat-card__value">{settings.stat_diterima || '3.420'}</h3>
                </div>
                <p className="admin-stat-card__note">Perkara masuk tahun berjalan</p>
                <div className="stat-sparkline-wrap">
                  <svg viewBox="0 0 160 40" className="stat-sparkline" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sparkGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,32 Q25,36 50,22 T100,18 T130,24 T160,8 L160,40 L0,40 Z" fill="url(#sparkGrad1)"/>
                    <path d="M0,32 Q25,36 50,22 T100,18 T130,24 T160,8" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M0,36 Q30,34 60,28 T110,26 T160,18" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
                  </svg>
                </div>
              </div>

              {/* Card 2: Perkara Diputus */}
              <div className="admin-stat-card admin-stat-card--graph">
                <div className="admin-stat-card__top">
                  <span className="admin-stat-card__label">Perkara Diputus</span>
                  <span className="stat-badge stat-badge--green">+4,1% ↑</span>
                </div>
                <div className="admin-stat-card__value-row">
                  <h3 className="admin-stat-card__value">{settings.stat_diputus || '3.365'}</h3>
                </div>
                <p className="admin-stat-card__note">Selesai & berkekuatan hukum</p>
                <div className="stat-sparkline-wrap">
                  <svg viewBox="0 0 160 40" className="stat-sparkline" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sparkGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,35 Q20,38 45,24 T90,20 T125,12 T160,5 L160,40 L0,40 Z" fill="url(#sparkGrad2)"/>
                    <path d="M0,35 Q20,38 45,24 T90,20 T125,12 T160,5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M0,38 Q35,36 70,30 T120,22 T160,14" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
                  </svg>
                </div>
              </div>

              {/* Card 3: Tingkat Penyelesaian */}
              <div className="admin-stat-card admin-stat-card--graph">
                <div className="admin-stat-card__top">
                  <span className="admin-stat-card__label">Penyelesaian (%)</span>
                  <span className="stat-badge stat-badge--gold">Target 90%</span>
                </div>
                <div className="admin-stat-card__value-row">
                  <h3 className="admin-stat-card__value">{settings.stat_persentase || '98,4%'}</h3>
                </div>
                <p className="admin-stat-card__note">Rasio keberhasilan penanganan</p>
                <div className="stat-progress-section">
                  <div className="stat-progress-bar">
                    <div className="stat-progress-fill" style={{ width: settings.stat_persentase || '98.4%' }}></div>
                    <div className="stat-progress-target" title="Target MA 90%" style={{ left: '90%' }}></div>
                  </div>
                  <div className="stat-progress-labels">
                    <span>Target MA: 90%</span>
                    <span className="text-success">Tercapai: {settings.stat_persentase || '98,4%'}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Indeks Kepuasan (IKM) */}
              <div className="admin-stat-card admin-stat-card--graph">
                <div className="admin-stat-card__top">
                  <span className="admin-stat-card__label">Indeks Kepuasan (IKM)</span>
                  <span className="stat-badge stat-badge--purple">Sangat Baik</span>
                </div>
                <div className="admin-stat-card__value-row">
                  <h3 className="admin-stat-card__value">{settings.stat_ikm || '97,8%'}</h3>
                </div>
                <p className="admin-stat-card__note">Survei pelayanan publik PTSP</p>
                <div className="stat-mini-bars">
                  {[45, 65, 55, 80, 72, 90, 85, 95, 88, 92, 98, 94].map((h, i) => (
                    <div key={i} className="stat-mini-bar" style={{ height: `${h}%` }} title={`Bulan ${i+1}: ${h}%`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics & Charts Section (Inspired by Dashboard Visuals) */}
            <div className="dash-analytics-grid">
              {/* Main Area / Wave Chart */}
              <div className="dash-chart-card dash-chart-card--main">
                <div className="dash-chart-card__header">
                  <div>
                    <h3 className="dash-chart-card__title">Tren Penanganan Perkara Bulanan</h3>
                    <p className="dash-chart-card__subtitle">Statistik komparasi perkara masuk vs diputus tahun berjalan</p>
                  </div>
                  <div className="dash-chart-card__legends">
                    <span className="chart-legend-item">
                      <span className="chart-legend-dot chart-legend-dot--blue" /> Perkara Masuk
                    </span>
                    <span className="chart-legend-item">
                      <span className="chart-legend-dot chart-legend-dot--green" /> Perkara Diputus
                    </span>
                  </div>
                </div>

                <div className="dash-chart-svg-container">
                  <svg viewBox="0 0 600 200" className="dash-main-chart" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                      </linearGradient>
                      <linearGradient id="areaGradGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="30" y1="30" x2="590" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1"/>
                    <line x1="30" y1="75" x2="590" y2="75" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1"/>
                    <line x1="30" y1="120" x2="590" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1"/>
                    <line x1="30" y1="165" x2="590" y2="165" stroke="#e2e8f0" strokeWidth="1"/>

                    {/* Y Axis labels */}
                    <text x="5" y="34" fill="#94a3b8" fontSize="10" fontWeight="500">400</text>
                    <text x="5" y="79" fill="#94a3b8" fontSize="10" fontWeight="500">300</text>
                    <text x="5" y="124" fill="#94a3b8" fontSize="10" fontWeight="500">200</text>
                    <text x="5" y="169" fill="#94a3b8" fontSize="10" fontWeight="500">100</text>

                    {/* Area 1: Perkara Masuk (Blue) */}
                    <path
                      d="M30,125 C75,135 120,85 165,95 C210,105 255,65 300,70 C345,75 390,55 435,60 C480,65 525,40 580,45 L580,165 L30,165 Z"
                      fill="url(#areaGradBlue)"
                      className="dash-chart-wave-area"
                    />
                    <path
                      d="M30,125 C75,135 120,85 165,95 C210,105 255,65 300,70 C345,75 390,55 435,60 C480,65 525,40 580,45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="dash-chart-wave-line dash-chart-wave-line--blue"
                    />

                    {/* Area 2: Perkara Diputus (Green) */}
                    <path
                      d="M30,135 C75,145 120,95 165,105 C210,115 255,75 300,78 C345,82 390,62 435,65 C480,68 525,45 580,48 L580,165 L30,165 Z"
                      fill="url(#areaGradGreen)"
                      className="dash-chart-wave-area"
                    />
                    <path
                      d="M30,135 C75,145 120,95 165,105 C210,115 255,75 300,78 C345,82 390,62 435,65 C480,68 525,45 580,48"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="dash-chart-wave-line dash-chart-wave-line--green"
                    />

                    {/* Data Points */}
                    {[
                      {x: 30, y1: 125, y2: 135},
                      {x: 165, y1: 95, y2: 105},
                      {x: 300, y1: 70, y2: 78},
                      {x: 435, y1: 60, y2: 65},
                      {x: 580, y1: 45, y2: 48}
                    ].map((pt, idx) => (
                      <g key={idx} className="dash-chart-dot-group">
                        <circle cx={pt.x} cy={pt.y1} r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" className="dash-chart-dot"/>
                        <circle cx={pt.x} cy={pt.y2} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="dash-chart-dot"/>
                      </g>
                    ))}
                  </svg>
                  {/* Month X Labels */}
                  <div className="dash-chart-x-labels">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'].map((m, i) => (
                      <span key={i}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="dash-chart-summary-row">
                  <div className="chart-summary-item">
                    <span className="chart-summary-label">Rata-rata Masuk</span>
                    <strong className="chart-summary-val text-blue">285 perkara/bln</strong>
                  </div>
                  <div className="chart-summary-item">
                    <span className="chart-summary-label">Rata-rata Diputus</span>
                    <strong className="chart-summary-val text-green">280 perkara/bln</strong>
                  </div>
                  <div className="chart-summary-item">
                    <span className="chart-summary-label">Sisa Perkara Aktif</span>
                    <strong className="chart-summary-val text-gold">55 perkara (1,6%)</strong>
                  </div>
                </div>
              </div>

              {/* Radial Gauge Card (Inspired by ACTIVE USERS 58% in user reference) */}
              <div className="dash-chart-card dash-chart-card--gauge">
                <div className="dash-chart-card__header">
                  <div>
                    <h3 className="dash-chart-card__title">Tingkat Penyelesaian</h3>
                    <p className="dash-chart-card__subtitle">Rasio perkara diputus tepat waktu</p>
                  </div>
                </div>

                <div className="gauge-container">
                  <svg viewBox="0 14 200 94" className="gauge-svg">
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#059669"/>
                        <stop offset="50%" stopColor="#10b981"/>
                        <stop offset="100%" stopColor="#34d399"/>
                      </linearGradient>
                    </defs>
                    {/* Background Arc */}
                    <path
                      d="M 25 100 A 75 75 0 0 1 175 100"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    {/* Active Arc (98.4% of semi circle) */}
                    <path
                      d="M 25 100 A 75 75 0 0 1 175 100"
                      fill="none"
                      stroke="url(#gaugeGrad)"
                      strokeWidth="15"
                      strokeDasharray="235.6"
                      strokeDashoffset="7"
                      strokeLinecap="round"
                      className="gauge-arc-active"
                    />
                  </svg>
                  <div className="gauge-data">
                    <span className="gauge-percent">{settings.stat_persentase || '98,4%'}</span>
                  </div>
                </div>

                <div className="gauge-bottom-label">
                  Penyelesaian Perkara
                </div>

                <div className="gauge-stats-list">
                  <div className="gauge-stat-item">
                    <div className="gauge-stat-dot gauge-stat-dot--primary"></div>
                    <span className="gauge-stat-name">Perkara Gugatan</span>
                    <span className="gauge-stat-val">2.531 (74%)</span>
                  </div>
                  <div className="gauge-stat-item">
                    <div className="gauge-stat-dot gauge-stat-dot--gold"></div>
                    <span className="gauge-stat-name">Perkara Permohonan</span>
                    <span className="gauge-stat-val">889 (26%)</span>
                  </div>
                </div>
              </div>

              {/* Vertical Bar Chart (Inspired by ACTIVE SUBSCRIPTIONS in user reference) */}
              <div className="dash-chart-card dash-chart-card--bars">
                <div className="dash-chart-card__header">
                  <div>
                    <h3 className="dash-chart-card__title">Pengunjung PTSP</h3>
                    <p className="dash-chart-card__subtitle">Aktivitas layanan 7 hari terakhir</p>
                  </div>
                  <span className="stat-badge stat-badge--green">+8% ↑</span>
                </div>

                <div className="ptsp-bars-value-row">
                  <span className="ptsp-bars-total">486</span>
                  <span className="ptsp-bars-unit">pengunjung / minggu</span>
                </div>

                <div className="ptsp-bars-container">
                  {[
                    { day: 'Sen', val: 94 },
                    { day: 'Sel', val: 86 },
                    { day: 'Rab', val: 98, active: true },
                    { day: 'Kam', val: 82 },
                    { day: 'Jum', val: 68 },
                    { day: 'Sab', val: 28 },
                    { day: 'Min', val: 30 },
                  ].map((bar, i) => (
                    <div key={i} className={`ptsp-bar-col ${bar.active ? 'ptsp-bar-col--active' : ''}`}>
                      <div className="ptsp-bar-track">
                        <div className="ptsp-bar-fill" style={{ height: `${bar.val}%` }}>
                          <span className="ptsp-bar-tooltip">{bar.val}</span>
                        </div>
                      </div>
                      <span className="ptsp-bar-label">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="ptsp-quick-services">
                  <div className="ptsp-service-pill">
                    <span>Sidang: <strong>182</strong></span>
                  </div>
                  <div className="ptsp-service-pill">
                    <span>Akta Cerai: <strong>124</strong></span>
                  </div>
                  <div className="ptsp-service-pill">
                    <span>POSBAKUM: <strong>95</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Title */}
            <div className="dash-section-title">
              <span className="dash-section-title__bar" />
              <h3>Menu Pengelolaan</h3>
            </div>

            {/* Quick Actions */}
            <div className="dash-quick-grid">
              {[
                { label: 'Kelola Menu', desc: 'Kelola navigasi & sidebar website secara dinamis', icon: FaSitemap, tab: 'Kelola Menu', color: '#6366f1', bg: '#eef2ff' },
                { label: 'Kelola Halaman', desc: 'Buat & edit halaman konten CMS website', icon: FaFileAlt, tab: 'Kelola Halaman', color: '#3b82f6', bg: '#eff6ff' },
                { label: 'Kelola Berita', desc: 'Tulis, edit dan publish berita & pengumuman', icon: FaNewspaper, tab: 'Kelola Berita', color: '#0ea5e9', bg: '#f0f9ff' },
                { label: 'Media Library', desc: 'Kelola gambar & media yang diunggah', icon: FaImages, tab: 'Media Library', color: '#8b5cf6', bg: '#f5f3ff' },
                { label: 'Kelola Layanan', desc: 'Perbarui daftar layanan publik pengadilan', icon: FaCog, tab: 'Kelola Layanan', color: '#f59e0b', bg: '#fffbeb' },
                { label: 'Pengaturan Website', desc: 'Ubah teks hero, kontak & statistik homepage', icon: FaSlidersH, tab: 'Pengaturan Website', color: '#10b981', bg: '#ecfdf5' },
                { label: 'Pustaka Dokumen', desc: 'Kelola file SK, Peraturan, & dokumen resmi', icon: FaFilePdf, tab: 'Pustaka Dokumen', color: '#ef4444', bg: '#fef2f2' },
                { label: 'Lihat Website', desc: 'Buka halaman publik pengadilan langsung', icon: FaExternalLinkAlt, tab: null, color: '#6b7280', bg: '#f9fafb' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="dash-quick-card"
                    style={{ '--qcard-color': item.color, '--qcard-bg': item.bg }}
                    onClick={() => item.tab ? setActiveTab(item.tab) : window.open('/', '_blank')}
                  >
                    <div className="dash-quick-card__icon-wrap">
                      <Icon />
                    </div>
                    <div className="dash-quick-card__body">
                      <p className="dash-quick-card__label">{item.label}</p>
                      <p className="dash-quick-card__desc">{item.desc}</p>
                    </div>
                    <FaArrowRight className="dash-quick-card__arrow" />
                  </div>
                );
              })}
            </div>

            {/* Info Footer Row */}
            <div className="dash-info-row">
              {[
                { icon: FaMapMarkerAlt, title: 'Alamat Kantor', val: settings.court_address || 'Jl. Encep Kartawiria No. 28, Cimahi Tengah', iconBg: '#e0f2fe', iconColor: '#0284c7' },
                { icon: FaPhoneAlt, title: 'Telepon Kantor', val: settings.court_phone || '(022) 6631 334', iconBg: '#fef9c3', iconColor: '#a16207' },
                { icon: FaWhatsapp, title: 'WhatsApp PTSP', val: `+${settings.court_whatsapp || '6281234567890'}`, iconBg: '#dcfce7', iconColor: '#15803d' },
                { icon: FaEnvelope, title: 'Email Resmi', val: settings.court_email || 'info@pa-cimahi.go.id', iconBg: '#fce7f3', iconColor: '#be185d' },
              ].map((info, i) => {
                const InfoIcon = info.icon;
                return (
                  <div key={i} className="dash-info-card">
                    <div className="dash-info-card__icon" style={{ background: info.iconBg, color: info.iconColor }}>
                      <InfoIcon />
                    </div>
                    <div>
                      <p className="dash-info-card__title">{info.title}</p>
                      <p className="dash-info-card__val">{info.val}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB: PENGATURAN WEBSITE */}
        {activeTab === 'Pengaturan Website' && (
          <div className="crud-panel animate-fade-in-up">
            <form onSubmit={handleSettingsSubmit} className="crud-form">
              <h2 className="crud-form__title">Pengaturan Konten & Teks Homepage</h2>

              <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
                1. Teks Hero Banner & Pengumuman Berjalan
              </h3>
              <div className="crud-form__grid">
                <div className="crud-form__group">
                  <label>Badge Zona Integritas (Hero)</label>
                  <input
                    type="text"
                    value={settings.hero_badge || ''}
                    onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })}
                  />
                </div>
                <div className="crud-form__group">
                  <label>Judul Utama (Hero Title)</label>
                  <input
                    type="text"
                    value={settings.hero_title || ''}
                    onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  />
                </div>
                <div className="crud-form__group col-span-2">
                  <label>Slogan / Subtitle Hero</label>
                  <textarea
                    rows="2"
                    value={settings.hero_subtitle || ''}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  />
                </div>
                <div className="crud-form__group col-span-2">
                  <label>Teks Pengumuman Berjalan (Running Announcement Ticker)</label>
                  <input
                    type="text"
                    value={settings.running_text || ''}
                    onChange={(e) => setSettings({ ...settings, running_text: e.target.value })}
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
                2. Angka Statistik Kinerja Pengadilan
              </h3>
              <div className="crud-form__grid">
                <div className="crud-form__group">
                  <label>Total Perkara Diterima</label>
                  <input
                    type="text"
                    value={settings.stat_diterima || ''}
                    onChange={(e) => setSettings({ ...settings, stat_diterima: e.target.value })}
                  />
                </div>
                <div className="crud-form__group">
                  <label>Total Perkara Diputus</label>
                  <input
                    type="text"
                    value={settings.stat_diputus || ''}
                    onChange={(e) => setSettings({ ...settings, stat_diputus: e.target.value })}
                  />
                </div>
                <div className="crud-form__group">
                  <label>Tingkat Penyelesaian (%)</label>
                  <input
                    type="text"
                    value={settings.stat_persentase || ''}
                    onChange={(e) => setSettings({ ...settings, stat_persentase: e.target.value })}
                  />
                </div>
                <div className="crud-form__group">
                  <label>Indeks Kepuasan Masyarakat / IKM (%)</label>
                  <input
                    type="text"
                    value={settings.stat_ikm || ''}
                    onChange={(e) => setSettings({ ...settings, stat_ikm: e.target.value })}
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '1rem', color: 'var(--primary-800)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '6px' }}>
                3. Informasi Kontak Kantor & Layanan WhatsApp PTSP
              </h3>
              <div className="crud-form__grid">
                <div className="crud-form__group col-span-2">
                  <label>Alamat Kantor Pengadilan</label>
                  <input
                    type="text"
                    value={settings.court_address || ''}
                    onChange={(e) => setSettings({ ...settings, court_address: e.target.value })}
                  />
                </div>
                <div className="crud-form__group">
                  <label>Nomor Telepon Kantor</label>
                  <input
                    type="text"
                    value={settings.court_phone || ''}
                    onChange={(e) => setSettings({ ...settings, court_phone: e.target.value })}
                  />
                </div>
                <div className="crud-form__group">
                  <label>Email Resmi</label>
                  <input
                    type="text"
                    value={settings.court_email || ''}
                    onChange={(e) => setSettings({ ...settings, court_email: e.target.value })}
                  />
                </div>
                <div className="crud-form__group col-span-2">
                  <label>Nomor WhatsApp Layanan PTSP / Chatbot (Format: 62812xxxxxx)</label>
                  <input
                    type="text"
                    value={settings.court_whatsapp || ''}
                    onChange={(e) => setSettings({ ...settings, court_whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="crud-form__actions" style={{ marginTop: '2rem' }}>
                <button type="submit" className="crud-panel__btn crud-panel__btn--primary" disabled={loading}>
                  <FaSave /> {loading ? 'Menyimpan...' : 'Simpan & Sinkronkan ke Homepage'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: KELOLA SLIDER */}
        {activeTab === 'Kelola Slider' && (
          <div className="crud-panel">
            {!isAdding && !editingItem ? (
              <>
                <div className="crud-panel__actions">
                  <button className="crud-panel__btn crud-panel__btn--primary" onClick={() => setIsAdding(true)}>
                    <FaPlus /> Tambah Slider Baru
                  </button>
                </div>

                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr>
                        <th>Sort</th>
                        <th>Gambar</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center' }}>Tidak ada data slider.</td></tr>
                      ) : (
                        sliders.map((s) => (
                          <tr key={s.id}>
                            <td>{s.sort_order}</td>
                            <td>
                              <img src={s.image_url} alt={s.title} className="crud-table__img" onError={(e) => { e.target.src = 'https://placehold.co/100x50?text=Gambar'; }} />
                            </td>
                            <td className="crud-table__bold">{s.title}</td>
                            <td>{s.description || '-'}</td>
                            <td>
                              <span className={`crud-badge ${s.is_active ? 'crud-badge--active' : 'crud-badge--inactive'}`}>
                                {s.is_active ? 'Aktif' : 'Non-aktif'}
                              </span>
                            </td>
                            <td>
                              <div className="crud-actions">
                                <button className="crud-actions__btn crud-actions__btn--edit" onClick={() => {
                                  setEditingItem(s);
                                  setSliderForm({ ...s, is_active: s.is_active === 1 || s.is_active === true });
                                }}>
                                  <FaEdit />
                                </button>
                                <button className="crud-actions__btn crud-actions__btn--delete" onClick={() => deleteSlider(s.id)}>
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <form onSubmit={handleSliderSubmit} className="crud-form">
                <h2 className="crud-form__title">{editingItem ? 'Edit Slider' : 'Tambah Slider Baru'}</h2>
                <div className="crud-form__grid">
                  <div className="crud-form__group">
                    <label>Judul Slider *</label>
                    <input type="text" value={sliderForm.title} onChange={(e) => setSliderForm({ ...sliderForm, title: e.target.value })} required />
                  </div>
                  <div className="crud-form__group col-span-2">
                    <DocumentUploader
                      label="Gambar Banner / File Slider *"
                      value={sliderForm.image_url}
                      token={token}
                      onChange={(url) => setSliderForm({ ...sliderForm, image_url: url })}
                    />
                  </div>
                  <div className="crud-form__group col-span-2">
                    <label>Deskripsi / Keterangan</label>
                    <textarea rows="3" value={sliderForm.description} onChange={(e) => setSliderForm({ ...sliderForm, description: e.target.value })} />
                  </div>
                  <div className="crud-form__group">
                    <label>Link Tujuan URL (Opsional)</label>
                    <input type="text" value={sliderForm.link} onChange={(e) => setSliderForm({ ...sliderForm, link: e.target.value })} />
                  </div>
                  <div className="crud-form__group">
                    <label>Urutan Tampil (Sort Order)</label>
                    <input type="number" value={sliderForm.sort_order} onChange={(e) => setSliderForm({ ...sliderForm, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="crud-form__group checkbox">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={sliderForm.is_active} onChange={(e) => setSliderForm({ ...sliderForm, is_active: e.target.checked })} />
                      Tampilkan Slider di Homepage (Aktif)
                    </label>
                  </div>
                </div>
                <div className="crud-form__actions">
                  <button type="submit" className="crud-panel__btn crud-panel__btn--primary" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button type="button" className="crud-panel__btn crud-panel__btn--secondary" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB: KELOLA LAYANAN */}
        {activeTab === 'Kelola Layanan' && (
          <div className="crud-panel">
            {!isAdding && !editingItem ? (
              <>
                <div className="crud-panel__actions">
                  <button className="crud-panel__btn crud-panel__btn--primary" onClick={() => setIsAdding(true)}>
                    <FaPlus /> Tambah Layanan Baru
                  </button>
                </div>

                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr>
                        <th>Sort</th>
                        <th>Ikon</th>
                        <th>Nama Layanan</th>
                        <th>Keterangan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center' }}>Tidak ada data layanan.</td></tr>
                      ) : (
                        services.map((s) => (
                          <tr key={s.id}>
                            <td>{s.sort_order}</td>
                            <td className="crud-table__icon-cell">{s.icon}</td>
                            <td className="crud-table__bold">{s.name}</td>
                            <td>{s.description || '-'}</td>
                            <td>
                              <span className={`crud-badge ${s.is_active ? 'crud-badge--active' : 'crud-badge--inactive'}`}>
                                {s.is_active ? 'Aktif' : 'Non-aktif'}
                              </span>
                            </td>
                            <td>
                              <div className="crud-actions">
                                <button className="crud-actions__btn crud-actions__btn--edit" onClick={() => {
                                  setEditingItem(s);
                                  setServiceForm({ ...s, is_active: s.is_active === 1 || s.is_active === true });
                                }}>
                                  <FaEdit />
                                </button>
                                <button className="crud-actions__btn crud-actions__btn--delete" onClick={() => deleteService(s.id)}>
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <form onSubmit={handleServiceSubmit} className="crud-form">
                <h2 className="crud-form__title">{editingItem ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
                <div className="crud-form__grid">
                  <div className="crud-form__group">
                    <label>Nama Layanan *</label>
                    <input type="text" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} required />
                  </div>
                  <div className="crud-form__group">
                    <label>Nama Ikon React Icons (misal: FaSearch, FaLaptop, FaCalendarAlt) *</label>
                    <input type="text" value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} required />
                  </div>
                  <div className="crud-form__group col-span-2">
                    <label>Keterangan Layanan</label>
                    <textarea rows="3" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} />
                  </div>
                  <div className="crud-form__group">
                    <label>Link Akses Layanan</label>
                    <input type="text" value={serviceForm.link} onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })} />
                  </div>
                  <div className="crud-form__group">
                    <label>Urutan Urut (Sort Order)</label>
                    <input type="number" value={serviceForm.sort_order} onChange={(e) => setServiceForm({ ...serviceForm, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="crud-form__group checkbox">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={serviceForm.is_active} onChange={(e) => setServiceForm({ ...serviceForm, is_active: e.target.checked })} />
                      Aktifkan Layanan di Homepage
                    </label>
                  </div>
                </div>
                <div className="crud-form__actions">
                  <button type="submit" className="crud-panel__btn crud-panel__btn--primary" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button type="button" className="crud-panel__btn crud-panel__btn--secondary" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB: KELOLA BERITA */}
        {activeTab === 'Kelola Berita' && (
          <div className="crud-panel">
            {!isAdding && !editingItem ? (
              <>
                <div className="crud-panel__actions">
                  <button className="crud-panel__btn crud-panel__btn--primary" onClick={() => setIsAdding(true)}>
                    <FaPlus /> Tulis Berita Baru
                  </button>
                </div>

                <div className="crud-table-wrapper">
                  <table className="crud-table">
                    <thead>
                      <tr>
                        <th>Kategori</th>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>Status Publikasi</th>
                        <th>Tanggal Dibuat</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {news.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center' }}>Tidak ada data berita/pengumuman.</td></tr>
                      ) : (
                        news.map((n) => (
                          <tr key={n.id}>
                            <td>
                              <span className="crud-badge crud-badge--category">{n.category}</span>
                            </td>
                            <td className="crud-table__bold">{n.title}</td>
                            <td>{n.author_name || 'Admin'}</td>
                            <td>
                              <span className={`crud-badge ${n.is_published ? 'crud-badge--active' : 'crud-badge--inactive'}`}>
                                {n.is_published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td>{new Date(n.created_at).toLocaleDateString('id-ID')}</td>
                            <td>
                              <div className="crud-actions">
                                <button className="crud-actions__btn crud-actions__btn--edit" onClick={() => {
                                  setEditingItem(n);
                                  setNewsForm({ ...n, is_published: n.is_published === 1 || n.is_published === true });
                                }}>
                                  <FaEdit />
                                </button>
                                <button className="crud-actions__btn crud-actions__btn--delete" onClick={() => deleteNews(n.id)}>
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <form onSubmit={handleNewsSubmit} className="crud-form">
                <h2 className="crud-form__title">{editingItem ? 'Edit Berita / Pengumuman' : 'Tulis Berita Baru'}</h2>
                <div className="crud-form__grid">
                  <div className="crud-form__group col-span-2">
                    <label>Judul Berita *</label>
                    <input type="text" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} required />
                  </div>
                  <div className="crud-form__group">
                    <label>Kategori</label>
                    <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}>
                      <option value="berita">Berita</option>
                      <option value="pengumuman">Pengumuman</option>
                      <option value="artikel">Artikel</option>
                    </select>
                  </div>
                  <div className="crud-form__group col-span-2">
                    <DocumentUploader
                      label="Lampiran File Berita / Dokumen PDF / Gambar *"
                      value={newsForm.image_url}
                      token={token}
                      onChange={(url) => setNewsForm({ ...newsForm, image_url: url })}
                    />
                  </div>
                  <div className="crud-form__group col-span-2">
                    <label>Isi Konten Berita *</label>
                    <textarea rows="8" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} required />
                  </div>
                  <div className="crud-form__group checkbox">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={newsForm.is_published} onChange={(e) => setNewsForm({ ...newsForm, is_published: e.target.checked })} />
                      Publikasikan Berita Ini di Homepage
                    </label>
                  </div>
                </div>
                <div className="crud-form__actions">
                  <button type="submit" className="crud-panel__btn crud-panel__btn--primary" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button type="button" className="crud-panel__btn crud-panel__btn--secondary" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB: PENGATURAN AKUN */}
        {activeTab === 'Pengaturan Akun' && (
          <div className="admin-account-panel animate-fade-in-up">
            <div className="admin-account-grid">
              {/* Card 1: Profil & Avatar Admin */}
              <div className="admin-account-card admin-account-card--profile">
                <div className="admin-account-card__top-bar admin-account-card__top-bar--emerald"></div>
                <div className="admin-account-card__header">
                  <div className="admin-account-card__icon-wrap admin-account-card__icon-wrap--emerald">
                    <FaUserShield />
                  </div>
                  <div>
                    <h2 className="admin-account-card__title">Profil & Ikon Administrator</h2>
                    <p className="admin-account-card__subtitle">Atur foto avatar, username login, nama tampilan, dan alamat email Anda.</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="admin-account-form">
                  {/* Avatar Section */}
                  <div className="account-avatar-card">
                    {/* Hidden file input controlled via ref */}
                    <input
                      type="file"
                      ref={avatarFileInputRef}
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      style={{ display: 'none' }}
                      disabled={avatarUploading}
                    />

                    <div className="account-avatar-preview-wrap">
                      <div className="account-avatar-preview">
                        {accountForm.avatar && !avatarImgError ? (
                          <img
                            src={getAvatarUrl(accountForm.avatar)}
                            alt="Avatar Preview"
                            className="account-avatar-preview__img"
                            onError={() => setAvatarImgError(true)}
                          />
                        ) : (
                          <span className="account-avatar-preview__initial">
                            {(accountForm.name || accountForm.username || 'A').charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <button 
                        type="button" 
                        className="account-avatar-upload-trigger" 
                        onClick={() => avatarFileInputRef.current?.click()}
                        title="Klik untuk memilih foto avatar baru"
                        disabled={avatarUploading}
                      >
                        <FaCamera />
                      </button>
                    </div>

                    <div className="account-avatar-details">
                      <div className="account-avatar-badge-wrap">
                        <span className="account-avatar-badge">FOTO / IKON PROFIL</span>
                      </div>
                      <p className="account-avatar-title">Sesuaikan Ikon Akun Anda</p>
                      <p className="account-avatar-desc">Format yang didukung: PNG, JPG, JPEG, atau WebP (Maksimal 5MB). Ikon ini otomatis tampil di seluruh dashboard.</p>
                      
                      <div className="account-avatar-actions">
                        <button
                          type="button"
                          className="account-action-btn account-action-btn--upload"
                          onClick={() => avatarFileInputRef.current?.click()}
                          disabled={avatarUploading}
                        >
                          <FaCamera /> {avatarUploading ? 'Mengunggah...' : 'Unggah Foto Baru'}
                        </button>
                        <button
                          type="button"
                          className="account-action-btn account-action-btn--preset"
                          onClick={() => {
                            setAccountForm(prev => ({ ...prev, avatar: '/images/logo-pa-cimahi.png' }));
                            setAvatarImgError(false);
                            showMsg('Logo PA Cimahi dipilih! Klik "Simpan Perubahan Profil" untuk menerapkan.');
                          }}
                          title="Gunakan lambang resmi Pengadilan Agama Cimahi"
                        >
                          🏛️ Pakai Logo PA Cimahi
                        </button>
                        {accountForm.avatar && (
                          <button
                            type="button"
                            className="account-action-btn account-action-btn--reset"
                            onClick={() => {
                              setAccountForm(prev => ({ ...prev, avatar: '' }));
                              setAvatarImgError(false);
                              showMsg('Ikon diatur ke inisial huruf. Klik "Simpan Perubahan Profil" untuk menerapkan.');
                            }}
                            title="Gunakan inisial nama standar"
                          >
                            <FaTimes /> Hapus Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="account-inputs-grid">
                    {/* Username */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Username Login</span>
                        <span className="account-label__req">*</span>
                      </label>
                      <div className="account-input-box">
                        <span className="account-input-box__icon"><FaUser /></span>
                        <input
                          type="text"
                          className="account-input-field"
                          value={accountForm.username}
                          onChange={(e) => setAccountForm(prev => ({ ...prev, username: e.target.value }))}
                          placeholder="Masukkan username"
                          required
                        />
                      </div>
                      <span className="account-hint">Digunakan saat proses login ke panel admin</span>
                    </div>

                    {/* Nama Lengkap */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Nama Lengkap Tampilan</span>
                        <span className="account-label__req">*</span>
                      </label>
                      <div className="account-input-box">
                        <span className="account-input-box__icon"><FaIdCard /></span>
                        <input
                          type="text"
                          className="account-input-field"
                          value={accountForm.name}
                          onChange={(e) => setAccountForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Contoh: Administrator"
                          required
                        />
                      </div>
                      <span className="account-hint">Nama yang tampil pada salam dashboard & pojok kanan atas</span>
                    </div>

                    {/* Email */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Email Administrator</span>
                      </label>
                      <div className="account-input-box">
                        <span className="account-input-box__icon"><FaEnvelope /></span>
                        <input
                          type="email"
                          className="account-input-field"
                          value={accountForm.email}
                          onChange={(e) => setAccountForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="admin@pa-cimahi.go.id"
                        />
                      </div>
                      <span className="account-hint">Alamat surel resmi untuk korespondensi sistem</span>
                    </div>

                    {/* Peran Akun Card */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Peran & Hak Akses Akun</span>
                      </label>
                      <div className="account-role-box">
                        <div className="account-role-box__content">
                          <div className="account-role-box__shield">
                            <FaShieldAlt />
                          </div>
                          <div>
                            <span className="account-role-box__role">
                              {user?.role ? user.role.toUpperCase() : 'SUPERADMIN'}
                            </span>
                            <span className="account-role-box__sub">Otoritas Penuh Sistem</span>
                          </div>
                        </div>
                        <span className="account-role-box__status">
                          <span className="account-role-box__dot"></span> Aktif
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="account-form-footer">
                    <button 
                      type="submit" 
                      className="account-submit-btn account-submit-btn--emerald" 
                      disabled={accountLoading || avatarUploading}
                    >
                      <FaSave className="account-submit-btn__icon" />
                      <span>{accountLoading ? 'Menyimpan Perubahan...' : 'Simpan Perubahan Profil'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 2: Keamanan & Ganti Password */}
              <div className="admin-account-card admin-account-card--security">
                <div className="admin-account-card__top-bar admin-account-card__top-bar--amber"></div>
                <div className="admin-account-card__header">
                  <div className="admin-account-card__icon-wrap admin-account-card__icon-wrap--amber">
                    <FaLock />
                  </div>
                  <div>
                    <h2 className="admin-account-card__title">Ganti Kata Sandi (Password)</h2>
                    <p className="admin-account-card__subtitle">Perbarui password akun Anda secara berkala untuk menjaga keamanan sistem.</p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="admin-account-form">
                  <div className="account-password-stack">
                    {/* Password Saat Ini */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Password Saat Ini</span>
                        <span className="account-label__req">*</span>
                      </label>
                      <div className="account-input-box">
                        <span className="account-input-box__icon"><FaKey /></span>
                        <input
                          type={showPass.current ? 'text' : 'password'}
                          className="account-input-field account-input-field--with-toggle"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Masukkan password saat ini"
                          required
                        />
                        <button
                          type="button"
                          className="account-eye-toggle"
                          onClick={() => setShowPass(prev => ({ ...prev, current: !prev.current }))}
                          tabIndex={-1}
                          title={showPass.current ? 'Sembunyikan password' : 'Lihat password'}
                        >
                          {showPass.current ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <span className="account-hint">Dibutuhkan untuk verifikasi keamanan akun Anda</span>
                    </div>

                    {/* Password Baru */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Password Baru</span>
                        <span className="account-label__req">*</span>
                      </label>
                      <div className="account-input-box">
                        <span className="account-input-box__icon"><FaLock /></span>
                        <input
                          type={showPass.new ? 'text' : 'password'}
                          className="account-input-field account-input-field--with-toggle"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Minimal 6 karakter"
                          required
                        />
                        <button
                          type="button"
                          className="account-eye-toggle"
                          onClick={() => setShowPass(prev => ({ ...prev, new: !prev.new }))}
                          tabIndex={-1}
                          title={showPass.new ? 'Sembunyikan password' : 'Lihat password'}
                        >
                          {showPass.new ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <span className="account-hint">Gunakan kombinasi huruf kapital, huruf kecil, dan angka</span>
                    </div>

                    {/* Konfirmasi Password Baru */}
                    <div className="account-input-group">
                      <label className="account-label">
                        <span>Konfirmasi Password Baru</span>
                        <span className="account-label__req">*</span>
                      </label>
                      <div className="account-input-box">
                        <span className="account-input-box__icon"><FaCheckCircle /></span>
                        <input
                          type={showPass.confirm ? 'text' : 'password'}
                          className="account-input-field account-input-field--with-toggle"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Ketik ulang password baru"
                          required
                        />
                        <button
                          type="button"
                          className="account-eye-toggle"
                          onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                          tabIndex={-1}
                          title={showPass.confirm ? 'Sembunyikan password' : 'Lihat password'}
                        >
                          {showPass.confirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <span className="account-hint">Pastikan password sama persis dengan yang di atas</span>
                    </div>
                  </div>

                  <div className="account-form-footer">
                    <button 
                      type="submit" 
                      className="account-submit-btn account-submit-btn--amber" 
                      disabled={passwordLoading}
                    >
                      <FaLock className="account-submit-btn__icon" />
                      <span>{passwordLoading ? 'Memproses Password...' : 'Perbarui Kata Sandi'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* =================== TAB: KELOLA MENU =================== */}
        {activeTab === 'Kelola Menu' && (
          <div className="cms-panel animate-fade-in-up">
            <div className="cms-panel__header">
              <div>
                <h2 className="cms-panel__title"><FaSitemap /> Kelola Menu Navigasi & Sidebar</h2>
                <p className="cms-panel__subtitle">Tambah, edit, atur hierarki dan urutan menu website secara dinamis.</p>
              </div>
              <button className="cms-btn cms-btn--primary" onClick={() => { setIsAdding(true); setEditingItem(null); setMenuForm({ title: '', slug: '', parent_id: '', type: 'page', url: '', icon: '', sort_order: 0, status: 'published', open_new_tab: false, description: '' }); }}>
                <FaPlus /> Tambah Menu
              </button>
            </div>

            {isAdding && (
              <div className="cms-form-card animate-fade-in-down">
                <h3 className="cms-form-card__title">{editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
                <form onSubmit={handleMenuSubmit}>
                  <div className="cms-form-grid">
                    <div className="cms-form-group">
                      <label>Nama Menu *</label>
                      <input type="text" value={menuForm.title} required
                        onChange={e => setMenuForm(prev => ({ ...prev, title: e.target.value, slug: !editingItem ? slugify(e.target.value) : prev.slug }))}
                        placeholder="Contoh: Profil Pengadilan" />
                    </div>
                    <div className="cms-form-group">
                      <label>Slug / URL Identifier *</label>
                      <input type="text" value={menuForm.slug} required
                        onChange={e => setMenuForm(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                        placeholder="profil-pengadilan" />
                    </div>
                    <div className="cms-form-group">
                      <label>Parent Menu (Opsional)</label>
                      <select value={menuForm.parent_id} onChange={e => setMenuForm(prev => ({ ...prev, parent_id: e.target.value }))}>
                        <option value="">— Tanpa Parent (Level Utama) —</option>
                        {menus.filter(m => !editingItem || m.id !== editingItem.id).map(m => (
                          <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="cms-form-group">
                      <label>Tipe Menu</label>
                      <select value={menuForm.type} onChange={e => setMenuForm(prev => ({ ...prev, type: e.target.value }))}>
                        <option value="page">Halaman CMS</option>
                        <option value="link">Tautan Eksternal</option>
                        <option value="dropdown">Dropdown (Parent saja)</option>
                        <option value="document">Dokumen/File</option>
                        <option value="video">Video</option>
                        <option value="custom">Kustom</option>
                      </select>
                    </div>
                    <div className="cms-form-group">
                      <label>URL / Tautan (Opsional)</label>
                      <input type="text" value={menuForm.url} onChange={e => setMenuForm(prev => ({ ...prev, url: e.target.value }))} placeholder="https://... atau /halaman-saya" />
                    </div>
                    <div className="cms-form-group">
                      <label>Urutan (Sort Order)</label>
                      <input type="number" value={menuForm.sort_order} min="0" onChange={e => setMenuForm(prev => ({ ...prev, sort_order: Number(e.target.value) }))} />
                    </div>
                    <div className="cms-form-group">
                      <label>Status</label>
                      <select value={menuForm.status} onChange={e => setMenuForm(prev => ({ ...prev, status: e.target.value }))}>
                        <option value="published">Published (Tampil)</option>
                        <option value="draft">Draft (Tersembunyi)</option>
                        <option value="inactive">Nonaktif</option>
                      </select>
                    </div>
                    <div className="cms-form-group">
                      <label>Icon (CSS Class / Emoji)</label>
                      <input type="text" value={menuForm.icon} onChange={e => setMenuForm(prev => ({ ...prev, icon: e.target.value }))} placeholder="mis. 📋 atau fa-gavel" />
                    </div>
                    <div className="cms-form-group cms-form-group--full">
                      <label>Deskripsi (Opsional)</label>
                      <textarea rows="2" value={menuForm.description} onChange={e => setMenuForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Deskripsi singkat menu ini..." />
                    </div>
                    <div className="cms-form-group cms-form-group--checkbox">
                      <label className="cms-checkbox-label">
                        <input type="checkbox" checked={menuForm.open_new_tab} onChange={e => setMenuForm(prev => ({ ...prev, open_new_tab: e.target.checked }))} />
                        Buka di Tab Baru
                      </label>
                    </div>
                  </div>
                  <div className="cms-form-actions">
                    <button type="button" className="cms-btn cms-btn--ghost" onClick={() => { setIsAdding(false); setEditingItem(null); }}>Batal</button>
                    <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}><FaSave /> {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="cms-menu-tree">
              <div className="cms-menu-tree__header">
                <span>Struktur Menu ({menus.length} item)</span>
                <span className="cms-menu-tree__hint">Klik <FaAngleRight className="inline" /> untuk expand sub-menu</span>
              </div>
              {menuTree.length === 0 ? (
                <div className="cms-empty-state">
                  <FaSitemap className="cms-empty-state__icon" />
                  <p>Belum ada menu. Klik "Tambah Menu" untuk membuat menu pertama.</p>
                </div>
              ) : (
                <div className="menu-tree-wrapper">
                  {renderMenuTreeItems(menuTree)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================== TAB: KELOLA HALAMAN =================== */}
        {activeTab === 'Kelola Halaman' && (
          <div className="cms-panel animate-fade-in-up">
            <div className="cms-panel__header">
              <div>
                <h2 className="cms-panel__title"><FaFileAlt /> Kelola Halaman CMS</h2>
                <p className="cms-panel__subtitle">Buat & edit halaman konten dinamis yang terhubung ke menu navigasi.</p>
              </div>
              <button className="cms-btn cms-btn--primary" onClick={() => { 
                setIsAdding(true); 
                setEditingItem(null); 
                setPageForm({ 
                  title: '', 
                  subtitle: '', 
                  slug: '', 
                  excerpt: '', 
                  content_html: '', 
                  status: 'draft', 
                  seo_title: '', 
                  meta_description: '', 
                  meta_keywords: '', 
                  menu_id: '', 
                  blocks: [{ id: Date.now(), type: 'text', content: { text: '' }, settings: {}, sort_order: 1 }] 
                }); 
              }}>
                <FaPlus /> Buat Halaman Baru
              </button>
            </div>

            {/* Filter & Search */}
            {!isAdding && (
              <div className="cms-filter-row">
                <div className="cms-search-box">
                  <FaSearch className="cms-search-box__icon" />
                  <input type="text" placeholder="Cari halaman berdasarkan judul atau slug..." value={pageSearch}
                    onChange={e => setPageSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && fetchPages()} />
                  <button className="cms-search-box__btn" onClick={fetchPages}>Cari</button>
                </div>
                <select className="cms-filter-select" value={pageStatusFilter} onChange={e => { setPageStatusFilter(e.target.value); }}>
                  <option value="all">Semua Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            )}

            {isAdding && (
              <div className="cms-form-card animate-fade-in-down">
                <h3 className="cms-form-card__title">{editingItem ? `Edit: ${editingItem.title}` : 'Buat Halaman Baru'}</h3>
                <form onSubmit={handlePageSubmit}>
                  <div className="cms-section-label">Informasi Dasar</div>
                  <div className="cms-form-grid">
                    <div className="cms-form-group">
                      <label>Judul Halaman *</label>
                      <input type="text" value={pageForm.title} required
                        onChange={e => setPageForm(prev => ({ ...prev, title: e.target.value, slug: !editingItem ? slugify(e.target.value) : prev.slug }))} />
                    </div>
                    <div className="cms-form-group">
                      <label>Slug URL *</label>
                      <input type="text" value={pageForm.slug} required
                        onChange={e => setPageForm(prev => ({ ...prev, slug: slugify(e.target.value) }))} />
                    </div>
                    <div className="cms-form-group">
                      <label>Subtitle</label>
                      <input type="text" value={pageForm.subtitle} onChange={e => setPageForm(prev => ({ ...prev, subtitle: e.target.value }))} placeholder="Sub-judul opsional" />
                    </div>
                    <div className="cms-form-group">
                      <label>Tautkan ke Menu</label>
                      <select value={pageForm.menu_id} onChange={e => setPageForm(prev => ({ ...prev, menu_id: e.target.value }))}>
                        <option value="">— Tidak Terhubung ke Menu —</option>
                        {menus.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                      </select>
                    </div>
                    <div className="cms-form-group">
                      <label>Status Publikasi</label>
                      <select value={pageForm.status} onChange={e => setPageForm(prev => ({ ...prev, status: e.target.value }))}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="cms-form-group cms-form-group--full">
                      <label>Ringkasan / Excerpt</label>
                      <textarea rows="2" value={pageForm.excerpt} onChange={e => setPageForm(prev => ({ ...prev, excerpt: e.target.value }))} placeholder="Ringkasan singkat halaman ini..." />
                    </div>
                  </div>

                  <div className="cms-section-label">
                    <span>Struktur Konten Halaman (Wadah / Container Berbasis Blok)</span>
                  </div>
                  <div className="cms-form-group cms-form-group--full">
                    <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>
                      Setiap elemen konten berada dalam <strong>wadah (container) tersendiri</strong>. Anda dapat langsung mengedit isi teks, mengganti foto/gambar, mengganti video, atau mengganti dokumen PDF secara instan tanpa perlu coding HTML.
                    </p>

                    <div className="cms-blocks-builder">
                      {/* List of Containers */}
                      {(!pageForm.blocks || pageForm.blocks.length === 0) ? (
                        <div className="cms-block-empty">
                          <FaAlignLeft style={{ fontSize: '2rem', color: '#cbd5e1' }} />
                          <h4>Belum ada blok konten</h4>
                          <p>Klik salah satu tombol di bawah untuk menambahkan wadah teks, gambar, video, atau dokumen PDF.</p>
                        </div>
                      ) : (
                        <div className="cms-blocks-list">
                          {pageForm.blocks.map((block, idx) => {
                            const bContent = block.content || {};
                            const bSettings = block.settings || {};

                            return (
                              <div key={block.id || idx} className={`cms-block-card cms-block-card--${block.type}`}>
                                {/* Header Kontainer */}
                                <div className="cms-block-card__header">
                                  <div className="cms-block-card__tag">
                                    <span className="cms-block-card__num">{idx + 1}</span>
                                    {block.type === 'text' && <><FaAlignLeft style={{ color: '#16a34a' }} /> <span>Wadah Teks & Artikel</span></>}
                                    {block.type === 'image' && <><FaImage style={{ color: '#2563eb' }} /> <span>Wadah Foto / Gambar</span></>}
                                    {block.type === 'video' && <><FaVideo style={{ color: '#dc2626' }} /> <span>Wadah Video (YouTube/MP4)</span></>}
                                    {block.type === 'document' && <><FaFilePdf style={{ color: '#ea580c' }} /> <span>Wadah Dokumen PDF</span></>}
                                    {block.type === 'callout' && <><FaInfo style={{ color: '#ca8a04' }} /> <span>Wadah Kotak Informasi / Pengumuman</span></>}
                                    {block.type === 'table' && <><FaTable style={{ color: '#7c3aed' }} /> <span>Wadah Tabel Data</span></>}
                                  </div>
                                  <div className="cms-block-card__actions">
                                    <button 
                                      type="button" 
                                      className="cms-block-tool-btn" 
                                      title="Pindah ke Atas" 
                                      disabled={idx === 0} 
                                      onClick={() => moveBlock(idx, -1)}
                                    >
                                      <FaArrowUp />
                                    </button>
                                    <button 
                                      type="button" 
                                      className="cms-block-tool-btn" 
                                      title="Pindah ke Bawah" 
                                      disabled={idx === pageForm.blocks.length - 1} 
                                      onClick={() => moveBlock(idx, 1)}
                                    >
                                      <FaArrowDown />
                                    </button>
                                    <button 
                                      type="button" 
                                      className="cms-block-tool-btn cms-block-tool-btn--delete" 
                                      title="Hapus Wadah Ini" 
                                      onClick={() => deleteBlock(idx)}
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </div>

                                {/* Body Kontainer Sesuai Tipe */}
                                <div className="cms-block-card__body">
                                  {/* 1. TIPE: TEKS - Rich Text Editor */}
                                  {block.type === 'text' && (
                                    <div className="cms-rte-wrapper">
                                      <div className="cms-rte-toolbar">
                                        <div className="cms-rte-toolbar__group">
                                          <button type="button" className="cms-rte-btn" title="Bold" onMouseDown={e=>{e.preventDefault();document.execCommand('bold')}}><b>B</b></button>
                                          <button type="button" className="cms-rte-btn" title="Italic" onMouseDown={e=>{e.preventDefault();document.execCommand('italic')}}><i>I</i></button>
                                          <button type="button" className="cms-rte-btn" title="Underline" onMouseDown={e=>{e.preventDefault();document.execCommand('underline')}}><u>U</u></button>
                                          <button type="button" className="cms-rte-btn" title="Strikethrough" onMouseDown={e=>{e.preventDefault();document.execCommand('strikeThrough')}}><s>S</s></button>
                                        </div>
                                        <div className="cms-rte-toolbar__sep" />
                                        <div className="cms-rte-toolbar__group">
                                          <button type="button" className="cms-rte-btn" title="Judul H1" onMouseDown={e=>{e.preventDefault();document.execCommand('formatBlock',false,'h1')}}>H1</button>
                                          <button type="button" className="cms-rte-btn" title="Judul H2" onMouseDown={e=>{e.preventDefault();document.execCommand('formatBlock',false,'h2')}}>H2</button>
                                          <button type="button" className="cms-rte-btn" title="Judul H3" onMouseDown={e=>{e.preventDefault();document.execCommand('formatBlock',false,'h3')}}>H3</button>
                                          <button type="button" className="cms-rte-btn" title="Paragraf Normal" onMouseDown={e=>{e.preventDefault();document.execCommand('formatBlock',false,'p')}}>P</button>
                                        </div>
                                        <div className="cms-rte-toolbar__sep" />
                                        <div className="cms-rte-toolbar__group">
                                          <button type="button" className="cms-rte-btn" title="Daftar Bullet" onMouseDown={e=>{e.preventDefault();document.execCommand('insertUnorderedList')}}>• List</button>
                                          <button type="button" className="cms-rte-btn" title="Daftar Nomor" onMouseDown={e=>{e.preventDefault();document.execCommand('insertOrderedList')}}>1. List</button>
                                        </div>
                                        <div className="cms-rte-toolbar__sep" />
                                        <div className="cms-rte-toolbar__group">
                                          <button type="button" className="cms-rte-btn" title="Rata Kiri" onMouseDown={e=>{e.preventDefault();document.execCommand('justifyLeft')}}>⬛▭▭</button>
                                          <button type="button" className="cms-rte-btn" title="Rata Tengah" onMouseDown={e=>{e.preventDefault();document.execCommand('justifyCenter')}}>▭⬛▭</button>
                                          <button type="button" className="cms-rte-btn" title="Rata Kanan" onMouseDown={e=>{e.preventDefault();document.execCommand('justifyRight')}}>▭▭⬛</button>
                                          <button type="button" className="cms-rte-btn" title="Rata Penuh" onMouseDown={e=>{e.preventDefault();document.execCommand('justifyFull')}}>▬▬▬</button>
                                        </div>
                                        <div className="cms-rte-toolbar__sep" />
                                        <div className="cms-rte-toolbar__group">
                                          <button type="button" className="cms-rte-btn" title="Sisipkan Link" onMouseDown={e=>{
                                            e.preventDefault();
                                            const url = window.prompt('Masukkan URL link:','https://');
                                            if(url) document.execCommand('createLink',false,url);
                                          }}>🔗 Link</button>
                                          <button type="button" className="cms-rte-btn" title="Hapus Link" onMouseDown={e=>{e.preventDefault();document.execCommand('unlink')}}>✂ Hapus Link</button>
                                          <button type="button" className="cms-rte-btn" title="Garis Pemisah" onMouseDown={e=>{e.preventDefault();document.execCommand('insertHorizontalRule')}}>— HR</button>
                                          <button type="button" className="cms-rte-btn cms-rte-btn--danger" title="Hapus Semua Format" onMouseDown={e=>{e.preventDefault();document.execCommand('removeFormat')}}>✕ Clear</button>
                                        </div>
                                      </div>
                                      <div
                                        className="cms-rte-editor"
                                        contentEditable
                                        suppressContentEditableWarning
                                        data-placeholder="Ketikkan teks konten atau artikel di sini..."
                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(bContent.html || bContent.text || '') }}
                                        onBlur={e => updateBlockContent(idx, 'html', e.currentTarget.innerHTML)}
                                      />
                                      <p className="cms-rte-hint">Tip: Pilih teks lalu klik tombol di toolbar untuk memformat. Konten otomatis tersimpan saat klik di luar editor.</p>
                                    </div>
                                  )}

                                  {/* 2. TIPE: GAMBAR (Bisa langsung ganti foto) */}
                                  {block.type === 'image' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1', minWidth: '240px' }}>
                                          <ImageUploader 
                                            value={bContent.url}
                                            token={token}
                                            label="Ganti / Upload Foto Baru"
                                            onChange={newUrl => updateBlockContent(idx, 'url', newUrl)}
                                          />
                                        </div>
                                        <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                          <div className="cms-form-group">
                                            <label>Atau URL Foto Langsung</label>
                                            <input 
                                              type="text" 
                                              value={bContent.url || ''} 
                                              placeholder="https://example.com/foto.jpg atau /images/uploads/..." 
                                              onChange={e => updateBlockContent(idx, 'url', e.target.value)}
                                            />
                                          </div>
                                          <div className="cms-form-group">
                                            <label>Keterangan / Caption Foto</label>
                                            <input 
                                              type="text" 
                                              value={bContent.caption || ''} 
                                              placeholder="Keterangan yang tampil di bawah foto..." 
                                              onChange={e => updateBlockContent(idx, 'caption', e.target.value)}
                                            />
                                          </div>
                                          <div className="cms-form-group">
                                            <label>Alt Text (SEO & Aksesibilitas)</label>
                                            <input 
                                              type="text" 
                                              value={bContent.alt || ''} 
                                              placeholder="Deskripsi foto..." 
                                              onChange={e => updateBlockContent(idx, 'alt', e.target.value)}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* 3. TIPE: VIDEO (Bisa langsung ganti video URL) */}
                                  {block.type === 'video' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                      <div className="cms-form-group">
                                        <label>URL Video (YouTube, Vimeo, atau Link MP4) *</label>
                                        <input 
                                          type="text" 
                                          value={bContent.url || ''} 
                                          placeholder="Contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/..." 
                                          onChange={e => updateBlockContent(idx, 'url', e.target.value)}
                                        />
                                        <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
                                          Ganti link ini kapan saja untuk langsung mengubah tayangan video di halaman.
                                        </small>
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="cms-form-group">
                                          <label>Judul Video</label>
                                          <input 
                                            type="text" 
                                            value={bContent.title || ''} 
                                            placeholder="Judul video di atas player..." 
                                            onChange={e => updateBlockContent(idx, 'title', e.target.value)}
                                          />
                                        </div>
                                        <div className="cms-form-group">
                                          <label>Keterangan / Caption Video</label>
                                          <input 
                                            type="text" 
                                            value={bContent.caption || ''} 
                                            placeholder="Keterangan singkat di bawah video..." 
                                            onChange={e => updateBlockContent(idx, 'caption', e.target.value)}
                                          />
                                        </div>
                                      </div>
                                      {bContent.url && (
                                        <div className="cms-block-preview-box">
                                          <small style={{ fontWeight: 600, color: '#15803d', display: 'block', marginBottom: 4 }}>
                                            ✓ Video terpasang: {bContent.url}
                                          </small>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* 4. TIPE: DOKUMEN PDF (Bisa langsung ganti berkas) */}
                                  {block.type === 'document' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1', minWidth: '240px' }}>
                                          <DocumentUploader 
                                            value={bContent.file_url}
                                            token={token}
                                            label="Ganti / Upload Berkas PDF Baru"
                                            acceptTypes="application/pdf"
                                            onChange={newDocUrl => updateBlockContent(idx, 'file_url', newDocUrl)}
                                          />
                                        </div>
                                        <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                          <div className="cms-form-group">
                                            <label>Judul Dokumen / Nama Berkas *</label>
                                            <input 
                                              type="text" 
                                              value={bContent.doc_title || ''} 
                                              placeholder="Contoh: Surat Keputusan / Pedoman Pelayanan" 
                                              onChange={e => updateBlockContent(idx, 'doc_title', e.target.value)}
                                            />
                                          </div>
                                          <div className="cms-form-group">
                                            <label>Keterangan Dokumen</label>
                                            <input 
                                              type="text" 
                                              value={bContent.description || ''} 
                                              placeholder="Keterangan berkas unduhan..." 
                                              onChange={e => updateBlockContent(idx, 'description', e.target.value)}
                                            />
                                          </div>
                                          <div className="cms-form-group">
                                            <label>Nomor Dokumen (Opsional)</label>
                                            <input 
                                              type="text" 
                                              value={bContent.doc_number || ''} 
                                              placeholder="Contoh: W10-A19/001/HK.05/I/2024" 
                                              onChange={e => updateBlockContent(idx, 'doc_number', e.target.value)}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* 5. TIPE: KOTAK INFORMASI / CALLOUT */}
                                  {block.type === 'callout' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                      <div className="cms-form-group">
                                        <label>Judul Kotak Informasi</label>
                                        <input 
                                          type="text" 
                                          value={bContent.title || ''} 
                                          placeholder="Contoh: Informasi Penting / Catatan Pelayanan" 
                                          onChange={e => updateBlockContent(idx, 'title', e.target.value)}
                                        />
                                      </div>
                                      <div className="cms-form-group" style={{ marginBottom: 0 }}>
                                        <label>Pesan / Uraian Catatan</label>
                                        <textarea 
                                          rows="3" 
                                          value={bContent.text || ''} 
                                          placeholder="Uraian pengumuman atau catatan penting..."
                                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #d1d5db', fontSize: '0.9rem' }}
                                          onChange={e => updateBlockContent(idx, 'text', e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* 6. TIPE: TABEL */}
                                  {block.type === 'table' && (
                                    <div className="cms-table-editor">
                                      <div className="cms-table-editor__toolbar">
                                        <button type="button" className="cms-table-editor__btn" onClick={() => addTableRow(idx)}>
                                          + Tambah Baris
                                        </button>
                                        <button type="button" className="cms-table-editor__btn" onClick={() => addTableColumn(idx)}>
                                          + Tambah Kolom
                                        </button>
                                        <label className="cms-table-editor__toggle">
                                          <input 
                                            type="checkbox" 
                                            checked={bContent.has_header !== false} 
                                            onChange={e => updateBlockContent(idx, 'has_header', e.target.checked)}
                                          />
                                          <span>Baris Header</span>
                                        </label>
                                      </div>
                                      <div className="cms-table-editor__scroll">
                                        <table className="cms-table-edit-preview">
                                          {bContent.has_header !== false && (
                                            <thead>
                                              <tr>
                                                {(bContent.headers || []).map((header, colIdx) => (
                                                  <th key={colIdx} className="cms-table-edit-th">
                                                    <div className="cms-table-edit-cell-wrap">
                                                      <input
                                                        type="text"
                                                        className="cms-table-edit-input cms-table-edit-input--header"
                                                        value={header}
                                                        placeholder={`Kolom ${colIdx + 1}`}
                                                        onChange={e => updateTableHeader(idx, colIdx, e.target.value)}
                                                      />
                                                      {(bContent.headers || []).length > 1 && (
                                                        <button type="button" className="cms-table-edit-del-col" title="Hapus Kolom" onClick={() => removeTableColumn(idx, colIdx)}>✕</button>
                                                      )}
                                                    </div>
                                                  </th>
                                                ))}
                                              </tr>
                                            </thead>
                                          )}
                                          <tbody>
                                            {(bContent.rows || []).map((row, rowIdx) => (
                                              <tr key={rowIdx}>
                                                {(Array.isArray(row) ? row : []).map((cell, colIdx) => (
                                                  <td key={colIdx} className="cms-table-edit-td">
                                                    <input
                                                      type="text"
                                                      className="cms-table-edit-input"
                                                      value={cell}
                                                      placeholder="Isi sel..."
                                                      onChange={e => updateTableCell(idx, rowIdx, colIdx, e.target.value)}
                                                    />
                                                  </td>
                                                ))}
                                                <td className="cms-table-edit-td cms-table-edit-td--action">
                                                  {(bContent.rows || []).length > 1 && (
                                                    <button type="button" className="cms-table-edit-del-row" title="Hapus Baris" onClick={() => removeTableRow(idx, rowIdx)}>✕</button>
                                                  )}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                      <p className="cms-rte-hint">Klik sel untuk mengedit. Tambah/hapus baris dan kolom dengan tombol di atas.</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Tombol Tambah Wadah Baru */}
                      <div className="cms-add-block-bar">
                        <p className="cms-add-block-bar__title">+ Tambah Wadah Fitur Baru ke Halaman:</p>
                        <div className="cms-add-block-bar__buttons">
                          <button 
                            type="button" 
                            className="cms-btn-add-block" 
                            onClick={() => addBlock('text')}
                          >
                            <FaAlignLeft style={{ color: '#16a34a' }} /> + Wadah Teks
                          </button>
                          <button 
                            type="button" 
                            className="cms-btn-add-block" 
                            onClick={() => addBlock('image')}
                          >
                            <FaImage style={{ color: '#2563eb' }} /> + Wadah Foto / Gambar
                          </button>
                          <button 
                            type="button" 
                            className="cms-btn-add-block" 
                            onClick={() => addBlock('video')}
                          >
                            <FaVideo style={{ color: '#dc2626' }} /> + Wadah Video
                          </button>
                          <button 
                            type="button" 
                            className="cms-btn-add-block" 
                            onClick={() => addBlock('document')}
                          >
                            <FaFilePdf style={{ color: '#ea580c' }} /> + Wadah Dokumen PDF
                          </button>
                          <button 
                            type="button" 
                            className="cms-btn-add-block" 
                            onClick={() => addBlock('callout')}
                          >
                            <FaInfo style={{ color: '#ca8a04' }} /> + Wadah Kotak Info
                          </button>
                          <button 
                            type="button" 
                            className="cms-btn-add-block" 
                            onClick={() => addBlock('table')}
                          >
                            <FaTable style={{ color: '#7c3aed' }} /> + Wadah Tabel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cms-section-label">SEO & Meta</div>
                  <div className="cms-form-grid">
                    <div className="cms-form-group">
                      <label>SEO Title</label>
                      <input type="text" value={pageForm.seo_title} onChange={e => setPageForm(prev => ({ ...prev, seo_title: e.target.value }))} placeholder="Biarkan kosong untuk gunakan judul halaman" />
                    </div>
                    <div className="cms-form-group">
                      <label>Meta Keywords</label>
                      <input type="text" value={pageForm.meta_keywords} onChange={e => setPageForm(prev => ({ ...prev, meta_keywords: e.target.value }))} placeholder="kata-kunci, dipisah, koma" />
                    </div>
                    <div className="cms-form-group cms-form-group--full">
                      <label>Meta Description</label>
                      <textarea rows="2" value={pageForm.meta_description} onChange={e => setPageForm(prev => ({ ...prev, meta_description: e.target.value }))} placeholder="Deskripsi singkat untuk mesin pencari (maks. 160 karakter)" />
                    </div>
                  </div>

                  <div className="cms-form-actions">
                    <button type="button" className="cms-btn cms-btn--ghost" onClick={() => { setIsAdding(false); setEditingItem(null); }}>Batal</button>
                    {((pageForm.blocks && pageForm.blocks.length > 0) || pageForm.content_html) && (
                      <button type="button" className="cms-btn cms-btn--preview" onClick={() => setPreviewPage({ ...pageForm })}>
                        <FaEye /> Preview
                      </button>
                    )}
                    <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}><FaSave /> {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Buat & Simpan'}</button>
                  </div>
                </form>
              </div>
            )}

            {/* Preview Modal */}
            {previewPage && (
              <div className="cms-modal-overlay" onClick={() => setPreviewPage(null)}>
                <div className="cms-modal" onClick={e => e.stopPropagation()}>
                  <div className="cms-modal__header">
                    <h3>Preview: {previewPage.title}</h3>
                    <button className="cms-modal__close" onClick={() => setPreviewPage(null)}><FaTimes /></button>
                  </div>
                  <div className="cms-modal__body">
                    {previewPage.blocks && previewPage.blocks.length > 0 ? (
                      <BlockRenderer blocks={previewPage.blocks} />
                    ) : (
                      <div className="cms-page-preview" dangerouslySetInnerHTML={{ __html: sanitizeHtml(previewPage.content_html || '') }} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Pages List */}
            {!isAdding && (
              <div className="cms-table-wrapper">
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th>Judul Halaman</th>
                      <th>Slug</th>
                      <th>Menu Terkait</th>
                      <th>Status</th>
                      <th>Diperbarui</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.length === 0 ? (
                      <tr><td colSpan="6" className="cms-table__empty">Belum ada halaman. Klik "Buat Halaman Baru" untuk mulai.</td></tr>
                    ) : pages.map(page => (
                      <tr key={page.id}>
                        <td className="cms-table__bold">
                          <div>{page.title}</div>
                          {page.subtitle && <small className="cms-table__sub">{page.subtitle}</small>}
                        </td>
                        <td><code className="cms-code">/{page.slug}</code></td>
                        <td>{page.menu_title || <span className="cms-muted">—</span>}</td>
                        <td><span className={`cms-badge cms-badge--status-${page.status}`}>{page.status}</span></td>
                        <td className="cms-muted">{new Date(page.updated_at).toLocaleDateString('id-ID')}</td>
                        <td>
                          <div className="cms-table-actions">
                            <button className="cms-btn cms-btn--icon cms-btn--edit" title="Edit Halaman" onClick={async () => {
                              try {
                                const res = await axios.get(`${API_URL}/pages/${page.id}`, { headers: { Authorization: `Bearer ${token}` } });
                                const d = res.data.data;
                                let initialBlocks = Array.isArray(d.blocks) && d.blocks.length > 0 ? d.blocks : [];
                                if (initialBlocks.length === 0 && d.content_html) {
                                  initialBlocks = [{ id: Date.now(), type: 'text', content: { text: d.content_html }, settings: {}, sort_order: 1 }];
                                }
                                setPageForm({ 
                                  title: d.title, 
                                  subtitle: d.subtitle || '', 
                                  slug: d.slug, 
                                  excerpt: d.excerpt || '', 
                                  content_html: d.content_html || '', 
                                  status: d.status, 
                                  seo_title: d.seo_title || '', 
                                  meta_description: d.meta_description || '', 
                                  meta_keywords: d.meta_keywords || '', 
                                  menu_id: d.menu_id || '', 
                                  blocks: initialBlocks 
                                });
                                setEditingItem(page);
                                setIsAdding(true);
                              } catch (err) {
                                showMsg('Gagal memuat data halaman.', 'error');
                              }
                            }}>
                              <FaEdit /> Edit
                            </button>
                            <button 
                              className={`cms-btn cms-btn--icon ${page.status === 'published' ? 'cms-btn--toggle' : 'cms-btn--toggle-draft'}`} 
                              title={page.status === 'published' ? 'Jadikan Draft' : 'Publish Halaman'} 
                              onClick={() => togglePageStatus(page.id, page.status)}
                            >
                              {page.status === 'published' ? <><FaToggleOn /> Published</> : <><FaToggleOff /> Draft</>}
                            </button>
                            <button className="cms-btn cms-btn--icon cms-btn--delete" title="Hapus Halaman" onClick={() => deletePage(page.id)}>
                              <FaTrash /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =================== TAB: MEDIA LIBRARY =================== */}
        {activeTab === 'Media Library' && (
          <div className="cms-panel animate-fade-in-up">
            <div className="cms-panel__header">
              <div>
                <h2 className="cms-panel__title"><FaImages /> Media Library</h2>
                <p className="cms-panel__subtitle">Kelola semua gambar & aset visual yang diunggah ke website.</p>
              </div>
            </div>

            {/* Upload Form */}
            <div className="cms-media-upload-card">
              <h3 className="cms-media-upload-card__title"><FaFileUpload /> Unggah Gambar Baru</h3>
              <form onSubmit={handleMediaUpload} className="cms-media-upload-form">
                <div className="cms-media-drop-zone" onClick={() => mediaFileRef.current?.click()}>
                  {mediaUploadFile ? (
                    <div className="cms-media-drop-zone__preview">
                      <img src={URL.createObjectURL(mediaUploadFile)} alt="preview" />
                      <span>{mediaUploadFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <FaImage className="cms-media-drop-zone__icon" />
                      <p>Klik atau seret gambar ke sini</p>
                      <small>JPG, PNG, WEBP, SVG — Maks. 5MB</small>
                    </>
                  )}
                  <input ref={mediaFileRef} type="file" accept="image/*" style={{ display: 'none' }}
                    onChange={e => { if (e.target.files[0]) setMediaUploadFile(e.target.files[0]); }} />
                </div>
                <div className="cms-form-grid">
                  <div className="cms-form-group">
                    <label>Alt Text (SEO)</label>
                    <input type="text" value={mediaAltText} onChange={e => setMediaAltText(e.target.value)} placeholder="Deskripsi gambar untuk SEO & aksesibilitas" />
                  </div>
                  <div className="cms-form-group">
                    <label>Caption (Opsional)</label>
                    <input type="text" value={mediaCaption} onChange={e => setMediaCaption(e.target.value)} placeholder="Keterangan gambar" />
                  </div>
                </div>
                <button type="submit" className="cms-btn cms-btn--primary" disabled={mediaUploading || !mediaUploadFile}>
                  <FaFileUpload /> {mediaUploading ? 'Mengunggah...' : 'Unggah ke Library'}
                </button>
              </form>
            </div>

            {/* Search */}
            <div className="cms-filter-row">
              <div className="cms-search-box">
                <FaSearch className="cms-search-box__icon" />
                <input type="text" placeholder="Cari file berdasarkan nama atau alt text..." value={mediaSearch}
                  onChange={e => setMediaSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchMedia()} />
                <button className="cms-search-box__btn" onClick={fetchMedia}>Cari</button>
              </div>
              <span className="cms-count-badge">{mediaList.length} file</span>
            </div>

            {/* Media Grid */}
            <div className="cms-media-grid">
              {mediaList.length === 0 ? (
                <div className="cms-empty-state">
                  <FaImages className="cms-empty-state__icon" />
                  <p>Belum ada media. Unggah gambar di atas.</p>
                </div>
              ) : mediaList.map(item => (
                <div key={item.id} className="cms-media-card">
                  <div className="cms-media-card__img-wrap">
                    <img src={`${SERVER_URL}${item.file_url}`} alt={item.alt_text} onError={e => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="90"><rect fill="%23f1f5f9" width="120" height="90"/><text x="50%" y="50%" font-size="12" fill="%2394a3b8" text-anchor="middle" dy=".35em">No Image</text></svg>'; }} />
                    <div className="cms-media-card__overlay">
                      <button className="cms-media-card__action-btn" title="Salin URL" onClick={() => copyToClipboard(`${SERVER_URL}${item.file_url}`)}>
                        <FaCopy />
                      </button>
                      <button className="cms-media-card__action-btn cms-media-card__action-btn--delete" title="Hapus" onClick={() => deleteMedia(item.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="cms-media-card__info">
                    <p className="cms-media-card__name">{item.original_name}</p>
                    <p className="cms-media-card__meta">{(item.file_size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================== TAB: PUSTAKA DOKUMEN =================== */}
        {activeTab === 'Pustaka Dokumen' && (
          <div className="cms-panel animate-fade-in-up">
            <div className="cms-panel__header">
              <div>
                <h2 className="cms-panel__title"><FaFilePdf /> Pustaka Dokumen</h2>
                <p className="cms-panel__subtitle">Kelola dokumen resmi: SK, Peraturan, Laporan, dan file publik lainnya.</p>
              </div>
              <button className="cms-btn cms-btn--primary" onClick={() => { setIsAdding(true); setEditingItem(null); setDocForm({ doc_title: '', doc_number: '', doc_date: '', description: '', file_url: '' }); }}>
                <FaPlus /> Tambah Dokumen
              </button>
            </div>

            {isAdding && (
              <div className="cms-form-card animate-fade-in-down">
                <h3 className="cms-form-card__title">{editingItem ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}</h3>
                <form onSubmit={handleDocSubmit}>
                  <div className="cms-form-grid">
                    <div className="cms-form-group cms-form-group--full">
                      <label>Judul Dokumen *</label>
                      <input type="text" value={docForm.doc_title} required onChange={e => setDocForm(prev => ({ ...prev, doc_title: e.target.value }))} placeholder="Contoh: SK Pembentukan Pengadilan Agama Kota Cimahi" />
                    </div>
                    <div className="cms-form-group">
                      <label>Nomor Dokumen</label>
                      <input type="text" value={docForm.doc_number} onChange={e => setDocForm(prev => ({ ...prev, doc_number: e.target.value }))} placeholder="Mis. 001/SK/2024" />
                    </div>
                    <div className="cms-form-group">
                      <label>Tanggal Dokumen</label>
                      <input type="date" value={docForm.doc_date} onChange={e => setDocForm(prev => ({ ...prev, doc_date: e.target.value }))} />
                    </div>
                    <div className="cms-form-group cms-form-group--full">
                      <label>Deskripsi</label>
                      <textarea rows="2" value={docForm.description} onChange={e => setDocForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Keterangan singkat dokumen..." />
                    </div>
                    <div className="cms-form-group cms-form-group--full">
                      <DocumentUploader
                        label="Upload File Dokumen (PDF/DOC/DOCX/XLS/XLSX/ZIP) *"
                        value={docForm.file_url}
                        token={token}
                        onChange={(url) => setDocForm(prev => ({ ...prev, file_url: url }))}
                      />
                    </div>
                  </div>
                  <div className="cms-form-actions">
                    <button type="button" className="cms-btn cms-btn--ghost" onClick={() => { setIsAdding(false); setEditingItem(null); }}>Batal</button>
                    <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}><FaSave /> {loading ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Dokumen'}</button>
                  </div>
                </form>
              </div>
            )}

            {/* Search */}
            {!isAdding && (
              <div className="cms-filter-row">
                <div className="cms-search-box">
                  <FaSearch className="cms-search-box__icon" />
                  <input type="text" placeholder="Cari dokumen berdasarkan judul atau nomor..." value={docSearch}
                    onChange={e => setDocSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchDocuments()} />
                  <button className="cms-search-box__btn" onClick={fetchDocuments}>Cari</button>
                </div>
                <span className="cms-count-badge">{documents.length} dokumen</span>
              </div>
            )}

            {!isAdding && (
              <div className="cms-table-wrapper">
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th>Judul Dokumen</th>
                      <th>Nomor</th>
                      <th>Tanggal</th>
                      <th>File</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.length === 0 ? (
                      <tr><td colSpan="5" className="cms-table__empty">Belum ada dokumen. Klik "Tambah Dokumen" untuk mulai.</td></tr>
                    ) : documents.map(doc => (
                      <tr key={doc.id}>
                        <td className="cms-table__bold">
                          {doc.doc_title}
                          {doc.description && <small className="cms-table__sub">{doc.description}</small>}
                        </td>
                        <td>{doc.doc_number || <span className="cms-muted">—</span>}</td>
                        <td className="cms-muted">{doc.doc_date ? new Date(doc.doc_date).toLocaleDateString('id-ID') : '—'}</td>
                        <td>
                          <a href={`${SERVER_URL}${doc.file_url}`} target="_blank" rel="noreferrer" className="cms-btn cms-btn--sm cms-btn--download">
                            <FaDownload /> Download
                          </a>
                        </td>
                        <td>
                          <div className="cms-table-actions">
                            <button className="cms-btn cms-btn--icon cms-btn--edit" title="Edit" onClick={() => {
                              setEditingItem(doc);
                              setDocForm({ doc_title: doc.doc_title, doc_number: doc.doc_number || '', doc_date: doc.doc_date ? doc.doc_date.split('T')[0] : '', description: doc.description || '', file_url: doc.file_url });
                              setIsAdding(true);
                            }}><FaEdit /></button>
                            <button className="cms-btn cms-btn--icon cms-btn--delete" title="Hapus" onClick={() => deleteDocument(doc.id)}><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =================== TAB: LOG AKTIVITAS =================== */}
        {activeTab === 'Log Aktivitas' && (
          <div className="cms-panel animate-fade-in-up">
            <div className="cms-panel__header">
              <div>
                <h2 className="cms-panel__title"><FaClipboardList /> Log Aktivitas Admin</h2>
                <p className="cms-panel__subtitle">Rekam jejak seluruh aksi yang dilakukan oleh admin pada sistem CMS.</p>
              </div>
              <button className="cms-btn cms-btn--ghost" onClick={fetchAuditLogs}><FaUndo /> Refresh</button>
            </div>
            <div className="cms-table-wrapper">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Admin</th>
                    <th>Aksi</th>
                    <th>Objek</th>
                    <th>Detail</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.length === 0 ? (
                    <tr><td colSpan="6" className="cms-table__empty">Belum ada log aktivitas.</td></tr>
                  ) : auditLogs.map(log => (
                    <tr key={log.id}>
                      <td className="cms-muted" style={{ whiteSpace: 'nowrap' }}>
                        {new Date(log.created_at).toLocaleString('id-ID')}
                      </td>
                      <td className="cms-table__bold">{log.admin_name || '—'}</td>
                      <td><span className={`cms-badge cms-badge--action`}>{log.action}</span></td>
                      <td>{log.object_type}{log.object_id ? ` #${log.object_id}` : ''}</td>
                      <td style={{ maxWidth: '300px', fontSize: '0.8rem' }}>{log.details}</td>
                      <td className="cms-muted">{log.ip_address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;

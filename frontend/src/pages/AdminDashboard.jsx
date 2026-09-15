import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaTachometerAlt, FaNewspaper, FaImages, FaCog, 
  FaSitemap, FaFileAlt, FaFolder, FaFilePdf, FaClipboardList, 
  FaSlidersH, FaUserShield, FaTimes,
  FaAngleDown, FaAngleRight, FaEdit, FaToggleOn, FaToggleOff,
  FaTrash, FaChartBar, FaCalendarAlt, FaUsers
} from 'react-icons/fa';
import logoPaCimahi from '../assets/logo-pa-cimahi.png';
import './AdminDashboard.css';
import { API_URL, SERVER_URL } from '../config';

import LogoutConfirmModal from '../components/admin/LogoutConfirmModal';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import OverviewTab from '../components/admin/tabs/OverviewTab';
import SettingsTab from '../components/admin/tabs/SettingsTab';
import SlidersTab from '../components/admin/tabs/SlidersTab';
import ServicesTab from '../components/admin/tabs/ServicesTab';
import NewsTab from '../components/admin/tabs/NewsTab';
import AccountsTab from '../components/admin/tabs/AccountsTab';
import MenusTab from '../components/admin/tabs/MenusTab';
import PagesTab from '../components/admin/tabs/PagesTab';
import MediaTab from '../components/admin/tabs/MediaTab';
import DocumentsTab from '../components/admin/tabs/DocumentsTab';
import AuditLogsTab from '../components/admin/tabs/AuditLogsTab';

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

  const [sliders, setSliders] = useState([]);
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);

  const [menus, setMenus] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [pages, setPages] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [menuForm, setMenuForm] = useState({
    title: '', slug: '', parent_id: '', type: 'page', url: '', icon: '',
    sort_order: 0, status: 'published', open_new_tab: false, description: ''
  });
  const [expandedMenus, setExpandedMenus] = useState({});

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

  const [insertModal, setInsertModal] = useState(null); 
  const [insertImageForm, setInsertImageForm] = useState({
    url: '',
    caption: '',
    alt: '',
    alignment: 'center' 
  });
  const [insertPdfForm, setInsertPdfForm] = useState({
    url: '',
    title: '',
    desc: 'Unduh dokumen resmi Pengadilan Agama Kota Cimahi Kelas IA.',
    mode: 'card' 
  });
  const [insertVideoForm, setInsertVideoForm] = useState({
    url: '',
    title: ''
  });

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

  const [settings, setSettings] = useState({
    hero_badge: 'Zona Integritas WBK & WBBM',
    hero_title: 'Selamat Datang di Pengadilan Agama Kota Cimahi',
    hero_subtitle: 'Mewujudkan Peradilan Agama yang Agung, Bersih, dan Melayani dengan Sepenuh Hati untuk Masyarakat Kota Cimahi.',
    running_text: 'Selamat Datang di Website Resmi Pengadilan Agama Kota Cimahi Kelas IA • Pelayanan PTSP Buka Senin-Kamis & Jumat • Stop Pungli & Gratifikasi • Layanan e-Court MA RI Tersedia 24 Jam',
    stat_diterima: '3.420',
    stat_diputus: '3.365',
    stat_persentase: '98,4%',
    stat_ikm: '97,8%',
    court_address: 'Jl. Encep Kartawiria No. 28, Cimahi Tengah, Kota Cimahi 40526',
    court_phone: '(022) 6631 334',
    court_email: 'info@pa-cimahi.go.id',
    court_whatsapp: '6281121111522',
    social_facebook: 'https://www.facebook.com/share/1CcnHbJVdC/?mibextid=wwXIfr',
    social_instagram: 'https://www.instagram.com/pa.kotacimahi/',
    social_youtube: 'https://www.youtube.com/channel/UCEEumbm787379_CQ9AQblCg',
    social_whatsapp: '6281121111522',
    footer_description: 'Mewujudkan peradilan agama yang agung, bersih, dan melayani dengan sepenuh hati untuk masyarakat Kota Cimahi dan sekitarnya.',
    footer_hours_weekday: '08.00 – 16.30 WIB',
    footer_hours_friday: '07.30 – 16.30 WIB',
    video_url: 'https://youtu.be/62bIsvRcPv0?si=Fow524ngSa3DIkBs',
    video_title: 'Video Profil Pengadilan Agama Kota Cimahi',
    video_subtitle: 'Mengenal lebih dekat komitmen integritas, tata kelola modern, dan inovasi pelayanan prima Pengadilan Agama Kota Cimahi bagi masyarakat.',
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [sliderForm, setSliderForm] = useState({ title: '', image_url: '', description: '', link: '', sort_order: 0, is_active: true });
  const [sliderPreview, setSliderPreview] = useState(null); 
  const [serviceForm, setServiceForm] = useState({ name: '', icon: '', description: '', link: '', sort_order: 0, is_active: true });
  const [newsForm, setNewsForm] = useState({ title: '', content: '', image_url: '', category: 'berita', is_published: true });

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutModalRef = useRef(null);

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/admin/login');
  };

  const cancelLogout = () => setShowLogoutModal(false);

  useEffect(() => {
    if (!showLogoutModal) return;
    logoutModalRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowLogoutModal(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showLogoutModal]);

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

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showMsg('Ukuran file foto maksimal 5MB.', 'error');
      if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
      return;
    }

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
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        toggleSidebar={toggleSidebar}
        navSections={navSections}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsAdding={setIsAdding}
        setEditingItem={setEditingItem}
        handleLogout={handleLogout}
        logo={logoPaCimahi}
      />

      <main className={`admin-main ${sidebarCollapsed ? 'admin-main--collapsed' : ''}`}>
        <AdminHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
          user={user}
          headerImgError={headerImgError}
          setHeaderImgError={setHeaderImgError}
          getAvatarUrl={getAvatarUrl}
          setIsAdding={setIsAdding}
          setEditingItem={setEditingItem}
        />

        {message.text && (
          <div className={`crud-alert crud-alert--${message.type} animate-fade-in-down`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ text: '', type: '' })} className="crud-alert__close">
              <FaTimes />
            </button>
          </div>
        )}

        {activeTab === 'Dashboard' && (
          <OverviewTab
            user={user}
            settings={settings}
            setActiveTab={setActiveTab}
            logo={logoPaCimahi}
          />
        )}

        {activeTab === 'Pengaturan Website' && (
          <SettingsTab
            settings={settings}
            setSettings={setSettings}
            handleSettingsSubmit={handleSettingsSubmit}
            loading={loading}
          />
        )}

        {activeTab === 'Kelola Slider' && (
          <SlidersTab
            sliders={sliders}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            sliderForm={sliderForm}
            setSliderForm={setSliderForm}
            handleSliderSubmit={handleSliderSubmit}
            deleteSlider={deleteSlider}
            token={token}
            loading={loading}
            getAvatarUrl={getAvatarUrl}
            sliderPreview={sliderPreview}
            setSliderPreview={setSliderPreview}
          />
        )}

        {activeTab === 'Kelola Layanan' && (
          <ServicesTab
            services={services}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            serviceForm={serviceForm}
            setServiceForm={setServiceForm}
            handleServiceSubmit={handleServiceSubmit}
            deleteService={deleteService}
            loading={loading}
          />
        )}

        {activeTab === 'Kelola Berita' && (
          <NewsTab
            news={news}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            newsForm={newsForm}
            setNewsForm={setNewsForm}
            handleNewsSubmit={handleNewsSubmit}
            deleteNews={deleteNews}
            token={token}
            loading={loading}
          />
        )}

        {activeTab === 'Pengaturan Akun' && (
          <AccountsTab
            user={user}
            accountForm={accountForm}
            setAccountForm={setAccountForm}
            handleUpdateProfile={handleUpdateProfile}
            avatarFileInputRef={avatarFileInputRef}
            avatarUploading={avatarUploading}
            handleAvatarFileChange={handleAvatarFileChange}
            avatarImgError={avatarImgError}
            setAvatarImgError={setAvatarImgError}
            getAvatarUrl={getAvatarUrl}
            showMsg={showMsg}
            accountLoading={accountLoading}
            handleChangePassword={handleChangePassword}
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            showPass={showPass}
            setShowPass={setShowPass}
            passwordLoading={passwordLoading}
          />
        )}

        {activeTab === 'Kelola Menu' && (
          <MenusTab
            menus={menus}
            menuTree={menuTree}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            menuForm={menuForm}
            setMenuForm={setMenuForm}
            handleMenuSubmit={handleMenuSubmit}
            slugify={slugify}
            renderMenuTreeItems={renderMenuTreeItems}
            loading={loading}
          />
        )}

        {activeTab === 'Kelola Halaman' && (
          <PagesTab
            pages={pages}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            pageForm={pageForm}
            setPageForm={setPageForm}
            pageSearch={pageSearch}
            setPageSearch={setPageSearch}
            pageStatusFilter={pageStatusFilter}
            setPageStatusFilter={setPageStatusFilter}
            fetchPages={fetchPages}
            handlePageSubmit={handlePageSubmit}
            togglePageStatus={togglePageStatus}
            deletePage={deletePage}
            menus={menus}
            token={token}
            loading={loading}
            slugify={slugify}
            previewPage={previewPage}
            setPreviewPage={setPreviewPage}
            moveBlock={moveBlock}
            deleteBlock={deleteBlock}
            addBlock={addBlock}
            updateBlockContent={updateBlockContent}
            addTableRow={addTableRow}
            addTableColumn={addTableColumn}
            updateTableHeader={updateTableHeader}
            removeTableColumn={removeTableColumn}
            updateTableCell={updateTableCell}
            removeTableRow={removeTableRow}
            showMsg={showMsg}
            API_URL={API_URL}
          />
        )}

        {activeTab === 'Media Library' && (
          <MediaTab
            mediaUploadFile={mediaUploadFile}
            setMediaUploadFile={setMediaUploadFile}
            mediaAltText={mediaAltText}
            setMediaAltText={setMediaAltText}
            mediaCaption={mediaCaption}
            setMediaCaption={setMediaCaption}
            mediaUploading={mediaUploading}
            handleMediaUpload={handleMediaUpload}
            mediaFileRef={mediaFileRef}
            mediaSearch={mediaSearch}
            setMediaSearch={setMediaSearch}
            fetchMedia={fetchMedia}
            mediaList={mediaList}
            SERVER_URL={SERVER_URL}
            copyToClipboard={copyToClipboard}
            deleteMedia={deleteMedia}
          />
        )}

        {activeTab === 'Pustaka Dokumen' && (
          <DocumentsTab
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            docForm={docForm}
            setDocForm={setDocForm}
            handleDocSubmit={handleDocSubmit}
            loading={loading}
            token={token}
            docSearch={docSearch}
            setDocSearch={setDocSearch}
            fetchDocuments={fetchDocuments}
            documents={documents}
            SERVER_URL={SERVER_URL}
            deleteDocument={deleteDocument}
          />
        )}

        {activeTab === 'Log Aktivitas' && (
          <AuditLogsTab
            fetchAuditLogs={fetchAuditLogs}
            auditLogs={auditLogs}
          />
        )}
      </main>

      <LogoutConfirmModal
        show={showLogoutModal}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
        modalRef={logoutModalRef}
      />
    </div>
  );
}

export default AdminDashboard;

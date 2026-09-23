import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { 
  FaTachometerAlt, FaNewspaper, FaImages, FaCog, 
  FaSitemap, FaFileAlt, FaFolder, FaFilePdf, FaClipboardList, 
  FaSlidersH, FaUserShield, FaTimes, FaThLarge, FaCode
} from 'react-icons/fa';
import logoPaCimahi from '../assets/logo-pa-cimahi.png';
import './AdminDashboard.css';
import { API_URL, SERVER_URL } from '../config';

import LogoutConfirmModal from '../components/admin/LogoutConfirmModal';
import ConfirmModal from '../components/admin/ConfirmModal';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import OverviewTab from '../components/admin/tabs/OverviewTab';
import HomepageTab from '../components/admin/tabs/HomepageTab';
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
import CodeLibraryTab from '../components/admin/tabs/CodeLibraryTab';
import useSliders from '../hooks/admin/useSliders';
import useServices from '../hooks/admin/useServices';
import useNews from '../hooks/admin/useNews';
import useSettings from '../hooks/admin/useSettings';
import useMenus from '../hooks/admin/useMenus';
import usePages from '../hooks/admin/usePages';
import useMedia from '../hooks/admin/useMedia';
import useDocuments from '../hooks/admin/useDocuments';
import useAuditLogs from '../hooks/admin/useAuditLogs';
import useAccount from '../hooks/admin/useAccount';

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



  const [previewPage, setPreviewPage] = useState(null);




  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });


  const [sliderPreview, setSliderPreview] = useState(null); 



  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutModalRef = useRef(null);

  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    title: '',
    message: '',
    confirmText: 'Ya, Hapus',
    cancelText: 'Batal',
    type: 'danger',
    onConfirm: null
  });

  const openConfirm = ({ title, message, confirmText = 'Ya, Hapus', cancelText = 'Batal', type = 'danger', onConfirm }) => {
    setConfirmDialog({
      show: true,
      title,
      message,
      confirmText,
      cancelText,
      type,
      onConfirm
    });
  };

  const closeConfirm = () => {
    setConfirmDialog(prev => ({ ...prev, show: false, onConfirm: null }));
  };

  const handleConfirmAction = async () => {
    if (confirmDialog.onConfirm) {
      const action = confirmDialog.onConfirm;
      closeConfirm();
      await action();
    }
  };

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

  // ─── Data & aksi per-domain: custom hooks (state + fetch + CRUD per tab) ───
  const adminActions = { token, showMsg, setLoading, setEditingItem, setIsAdding, openConfirm };

  const {
    sliders, sliderForm, setSliderForm, fetchSliders, saveSlider, deleteSlider
  } = useSliders(adminActions);
  const {
    services, serviceForm, setServiceForm, fetchServices, saveService, deleteService
  } = useServices(adminActions);
  const {
    news, newsForm, setNewsForm, fetchNews, saveNews, deleteNews
  } = useNews(adminActions);
  const { settings, setSettings, fetchSettings, handleSettingsSubmit } = useSettings(adminActions);
  const {
    menus, menuTree, menuForm, setMenuForm, fetchMenus, fetchMenuTree,
    saveMenu, deleteMenu, toggleMenuStatus
  } = useMenus(adminActions);
  const {
    pages, pageForm, setPageForm, pageSearch, setPageSearch,
    pageStatusFilter, setPageStatusFilter, fetchPages, savePage, deletePage, togglePageStatus,
    addBlock, updateBlockContent, moveBlock, deleteBlock,
    updateTableHeader, updateTableCell, addTableRow, removeTableRow,
    addTableColumn, removeTableColumn
  } = usePages(adminActions);
  const {
    mediaList, mediaSearch, setMediaSearch, mediaUploadFile, setMediaUploadFile,
    mediaAltText, setMediaAltText, mediaCaption, setMediaCaption,
    mediaUploading, mediaFileRef, fetchMedia, handleMediaUpload, deleteMedia, copyToClipboard
  } = useMedia(adminActions);
  const {
    documents, docSearch, setDocSearch, docForm, setDocForm,
    fetchDocuments, saveDocument, deleteDocument
  } = useDocuments(adminActions);
  const { auditLogs, fetchAuditLogs } = useAuditLogs({ token });
  const {
    accountForm, setAccountForm, passwordForm, setPasswordForm, showPass, setShowPass,
    accountLoading, passwordLoading, avatarUploading, avatarImgError, setAvatarImgError,
    headerImgError, setHeaderImgError, avatarFileInputRef,
    handleUpdateProfile, handleChangePassword, handleAvatarFileChange
  } = useAccount({ user, token, updateUser, showMsg });

  // Wrapper submit: `editingItem` tetap state cross-tab di komponen ini.
  const handleSliderSubmit = (e) => saveSlider(e, editingItem);
  const handleServiceSubmit = (e) => saveService(e, editingItem);
  const handleNewsSubmit = (e) => saveNews(e, editingItem);
  const handleMenuSubmit = (e) => saveMenu(e, editingItem);
  const handlePageSubmit = (e) => savePage(e, editingItem);
  const handleDocSubmit = (e) => saveDocument(e, editingItem);

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


  const navSections = [
    {
      title: 'HOMEPAGE',
      items: [
        { label: 'Dashboard', short: 'Beranda', icon: FaTachometerAlt },
        { label: 'Konten Homepage', short: 'Homepage', icon: FaThLarge },
        { label: 'Kelola Slider', short: 'Slider', icon: FaImages },
        { label: 'Kelola Layanan', short: 'Layanan', icon: FaCog },
        { label: 'Kelola Berita', short: 'Berita', icon: FaNewspaper },
      ]
    },
    {
      title: 'CMS',
      items: [
        { label: 'Kelola Menu', short: 'Menu', icon: FaSitemap },
        { label: 'Kelola Halaman', short: 'Halaman', icon: FaFileAlt },
        { label: 'Code Library', short: 'Code', icon: FaCode },
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
        userRole={user?.role}
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

        {activeTab === 'Konten Homepage' && (
          <HomepageTab
            token={token}
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
            userRole={user?.role}
            menus={menus}
            menuTree={menuTree}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            menuForm={menuForm}
            setMenuForm={setMenuForm}
            handleMenuSubmit={handleMenuSubmit}
            deleteMenu={deleteMenu}
            toggleMenuStatus={toggleMenuStatus}
            loading={loading}
          />
        )}

        {activeTab === 'Kelola Halaman' && (
          <PagesTab
            userRole={user?.role}
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

        {activeTab === 'Code Library' && (
          <CodeLibraryTab
            token={token}
          />
        )}
      </main>

      <LogoutConfirmModal
        show={showLogoutModal}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
        modalRef={logoutModalRef}
      />

      <ConfirmModal
        show={confirmDialog.show}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        type={confirmDialog.type}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirm}
      />
    </div>
  );
}

export default AdminDashboard;

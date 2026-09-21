import { useState, useMemo } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaCopy, FaChevronRight, FaChevronDown, FaGripVertical, FaFolder, FaFolderOpen, FaFileAlt, FaSearch, FaCheckCircle, FaEyeSlash } from 'react-icons/fa';
import MenuFormModal from './MenuFormModal';
import './MenuTreeManager.css';
import ConfirmModal from '../admin/ConfirmModal';

import { API_URL } from '../../config';

const filterTree = (nodes, query) => {
  if (!query) return nodes;
  const lowerQuery = query.toLowerCase();

  return nodes.reduce((acc, node) => {
    const match = node.title.toLowerCase().includes(lowerQuery) || node.slug.toLowerCase().includes(lowerQuery);
    const filteredChildren = node.children && node.children.length > 0 ? filterTree(node.children, query) : [];

    if (match || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren
      });
    }
    return acc;
  }, []);
};

export default function MenuTreeManager({ tree = [], allMenus = [], onRefresh, token, userRole }) {
  const [search, setSearch] = useState('');
  const [collapsedNodes, setCollapsedNodes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [parentDefaultId, setParentDefaultId] = useState(null);

  const [draggedNode, setDraggedNode] = useState(null);
  const [dropTarget, setDropTarget] = useState(null); // { id, position: 'before' | 'after' | 'inside' }

  const toggleCollapse = (id) => {
    setCollapsedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isCollapsed = (id) => !!collapsedNodes[id];

  const filteredTree = useMemo(() => {
    return filterTree(tree, search);
  }, [tree, search]);

  const handleAddRoot = () => {
    setEditingMenu(null);
    setParentDefaultId(null);
    setIsModalOpen(true);
  };

  const handleAddSubmenu = (parentId) => {
    setEditingMenu(null);
    setParentDefaultId(parentId);
    setIsModalOpen(true);
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setParentDefaultId(menu.parent_id);
    setIsModalOpen(true);
  };

  const handleSaveMenu = async (formData) => {
    try {
      if (editingMenu) {
        await axios.put(`${API_URL}/menus/${editingMenu.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/menus`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data menu.');
    }
  };

  const handleDuplicate = async (menu) => {
    try {
      await axios.post(`${API_URL}/menus`, {
        title: `${menu.title} (Salinan)`,
        slug: `${menu.slug}-copy-${Math.round(Math.random() * 100)}`,
        parent_id: menu.parent_id,
        type: menu.type,
        url: menu.url,
        sort_order: (menu.sort_order || 0) + 1,
        status: 'draft',
        open_new_tab: menu.open_new_tab,
        description: menu.description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menduplikasi menu.');
    }
  };

  const handleDelete = async (menu) => {
    if (userRole === 'editor') {
      alert('Role Editor tidak diizinkan menghapus menu.');
      return;
    }
    setDeleteTargetMenu(menu);
  };

  const confirmDeleteMenuAction = async () => {
    if (!deleteTargetMenu) return;
    const menu = deleteTargetMenu;
    setDeleteTargetMenu(null);
    try {
      await axios.delete(`${API_URL}/menus/${menu.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus menu.');
    }
  };

  const handleToggleStatus = async (menu) => {
    const nextStatus = menu.status === 'published' ? 'draft' : 'published';
    try {
      await axios.patch(`${API_URL}/menus/${menu.id}/status`, { status: nextStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefresh();
    } catch {
      alert('Gagal mengubah status menu.');
    }
  };

  const handleDragStart = (e, node) => {
    setDraggedNode(node);
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, node) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedNode || draggedNode.id === node.id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const height = rect.height;

    let pos = 'after';
    if (offsetY < height * 0.3) {
      pos = 'before';
    } else if (offsetY >= height * 0.3 && offsetY <= height * 0.7) {
      pos = 'inside';
    } else {
      pos = 'after';
    }

    setDropTarget({ id: node.id, position: pos });
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropTarget(null);
    }
  };

  const handleDrop = async (e, targetNode) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedNode || !dropTarget || draggedNode.id === targetNode.id) {
      setDraggedNode(null);
      setDropTarget(null);
      return;
    }

    try {
      let newParentId = targetNode.parent_id;
      let newSortOrder = targetNode.sort_order || 0;

      if (dropTarget.position === 'inside') {
        newParentId = targetNode.id;
        newSortOrder = (targetNode.children?.length || 0) + 1;
      } else if (dropTarget.position === 'before') {
        newParentId = targetNode.parent_id;
        newSortOrder = Math.max(0, (targetNode.sort_order || 0) - 1);
      } else if (dropTarget.position === 'after') {
        newParentId = targetNode.parent_id;
        newSortOrder = (targetNode.sort_order || 0) + 1;
      }

      await axios.put(`${API_URL}/menus/reorder`, {
        items: [
          { id: draggedNode.id, parent_id: newParentId, sort_order: newSortOrder }
        ]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onRefresh();
    } catch (err) {
      console.error('Reorder error:', err);
    } finally {
      setDraggedNode(null);
      setDropTarget(null);
    }
  };

  const renderTreeNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const collapsed = isCollapsed(node.id);
    const isDragging = draggedNode?.id === node.id;
    const isTarget = dropTarget?.id === node.id;
    const targetPos = isTarget ? dropTarget.position : '';

    return (
      <div key={node.id} className="menu-tree-node-wrapper">
        <div 
          className={`menu-tree-row level-${level} ${isDragging ? 'dragging' : ''} ${isTarget ? `drop-${targetPos}` : ''}`}
          style={{ paddingLeft: `${16 + level * 28}px` }}
          draggable
          onDragStart={(e) => handleDragStart(e, node)}
          onDragOver={(e) => handleDragOver(e, node)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node)}
        >
          <div className="menu-tree-drag" title="Drag & drop untuk geser atau buat submenu">
            <FaGripVertical />
          </div>

          <div className="menu-tree-symbol">
            {level === 0 ? '' : level === 1 ? '↳' : '└──'}
          </div>

          <div className="menu-tree-toggle" onClick={() => hasChildren && toggleCollapse(node.id)}>
            {hasChildren ? (
              collapsed ? <FaChevronRight size={11} /> : <FaChevronDown size={11} />
            ) : (
              <span className="menu-tree-dot">•</span>
            )}
          </div>

          <div className="menu-tree-icon">
            {hasChildren ? (
              collapsed ? <FaFolder className="folder-icon" /> : <FaFolderOpen className="folder-icon" />
            ) : (
              <FaFileAlt className="file-icon" />
            )}
          </div>

          <div className="menu-tree-info">
            <span className="menu-tree-title">{node.title}</span>
            <span className="menu-tree-slug">/{node.slug}</span>
            {node.url && <span className="menu-tree-url" title={node.url}>{node.url}</span>}
            <span className={`menu-tree-type-tag type-${node.type}`}>{node.type}</span>
          </div>

          <button 
            type="button" 
            className={`menu-status-badge status-${node.status}`}
            onClick={() => handleToggleStatus(node)}
            title="Klik untuk ubah status"
          >
            {node.status === 'published' ? <FaCheckCircle size={11} /> : <FaEyeSlash size={11} />}
            <span>{node.status}</span>
          </button>

          <div className="menu-tree-actions">
            <button 
              type="button" 
              className="tree-btn add"
              onClick={() => handleAddSubmenu(node.id)}
              title="Tambah Submenu di sini"
            >
              <FaPlus /> <span>Submenu</span>
            </button>
            <button 
              type="button" 
              className="tree-btn edit"
              onClick={() => handleEdit(node)}
              title="Edit Menu"
            >
              <FaEdit />
            </button>
            <button 
              type="button" 
              className="tree-btn duplicate"
              onClick={() => handleDuplicate(node)}
              title="Duplikat Menu"
            >
              <FaCopy />
            </button>
            <button 
              type="button" 
              className="tree-btn delete"
              onClick={() => handleDelete(node)}
              title="Hapus Menu"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        {hasChildren && !collapsed && (
          <div className="menu-tree-children">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="menu-tree-manager">
      <div className="menu-tree-header">
        <div className="menu-tree-header__left">
          <button type="button" className="cms-add-menu-btn" onClick={handleAddRoot}>
            <FaPlus /> <span>Tambah Menu Utama</span>
          </button>
          <div className="menu-tree-instruction">
            Gunakan drag & drop ikon <strong>☰</strong> untuk mengubah urutan atau geser ke dalam menu lain untuk menjadikannya submenu.
          </div>
        </div>

        <div className="menu-tree-search">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Cari menu / slug..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="menu-tree-canvas">
        {filteredTree.length === 0 ? (
          <div className="menu-tree-empty">
            <p>Tidak ada menu yang ditemukan. Klik tombol "Tambah Menu Utama" untuk mulai membuat menu navigasi website.</p>
          </div>
        ) : (
          <div className="menu-tree-list">
            {filteredTree.map(rootNode => renderTreeNode(rootNode, 0))}
          </div>
        )}
      </div>

      <MenuFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMenu}
        menuData={editingMenu}
        allMenus={allMenus}
        parentDefaultId={parentDefaultId}
      />
      <ConfirmModal
        show={Boolean(deleteTargetMenu)}
        title="Hapus Menu Navigasi"
        message={
          deleteTargetMenu?.children && deleteTargetMenu.children.length > 0
            ? `Menu "${deleteTargetMenu.title}" memiliki ${deleteTargetMenu.children.length} sub-menu. Hapus menu ini? Sub-menu akan dipindahkan ke tingkat atas.`
            : `Apakah Anda yakin ingin menghapus menu "${deleteTargetMenu?.title}"?`
        }
        confirmText="Ya, Hapus Menu"
        type="warning"
        onConfirm={confirmDeleteMenuAction}
        onCancel={() => setDeleteTargetMenu(null)}
      />
    </div>
  );
}

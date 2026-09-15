import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MenuContext = createContext();

import { API_URL } from '../config';

export const MenuProvider = ({ children }) => {
  const [menuTree, setMenuTree] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuTree = useCallback(async () => {
    try {
      setLoading(true);
      const [treeRes, flatRes] = await Promise.all([
        axios.get(`${API_URL}/menus/tree?scope=public`),
        axios.get(`${API_URL}/menus`)
      ]);

      if (treeRes.data?.success) {
        setMenuTree(treeRes.data.data || []);
      }
      if (flatRes.data?.success) {
        setAllMenus(flatRes.data.data || []);
      }
      setError(null);
    } catch (err) {
      console.warn('Failed to fetch menus from API, checking fallback...', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuTree();
  }, [fetchMenuTree]);

  const findMenuByPath = useCallback((pathname) => {
    if (!pathname) return null;
    const cleanPath = pathname.replace(/\/+$/, '');

    const searchBranch = (nodes) => {
      for (const node of nodes) {
        const nodeUrl = (node.url || '').replace(/\/+$/, '');
        const nodeSlugUrl = `/p/${node.slug}`;
        if (nodeUrl && nodeUrl === cleanPath) return node;
        if (cleanPath === nodeSlugUrl) return node;
        if (node.children && node.children.length > 0) {
          const found = searchBranch(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    return searchBranch(menuTree);
  }, [menuTree]);

  const findBranchByPath = useCallback((pathname) => {
    if (!pathname) return null;
    const cleanPath = pathname.replace(/\/+$/, '');

    for (const root of menuTree) {
      const rootUrl = (root.url || '').replace(/\/+$/, '');
      if (rootUrl && rootUrl === cleanPath) return root;

      const hasChild = (nodes) => {
        for (const child of nodes) {
          const childUrl = (child.url || '').replace(/\/+$/, '');
          if (childUrl && childUrl === cleanPath) return true;
          if (`/p/${child.slug}` === cleanPath) return true;
          if (child.children && child.children.length > 0 && hasChild(child.children)) return true;
        }
        return false;
      };

      if (root.children && hasChild(root.children)) {
        return root;
      }
    }
    return null;
  }, [menuTree]);

  return (
    <MenuContext.Provider
      value={{
        menuTree,
        allMenus,
        loading,
        error,
        refreshMenus: fetchMenuTree,
        findMenuByPath,
        findBranchByPath
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenus = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenus must be used within a MenuProvider');
  }
  return context;
};

export default MenuContext;

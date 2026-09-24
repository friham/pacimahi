import { createContext, useState, useCallback } from 'react';
import GlobalSearchModal from '../components/GlobalSearchModal';

const SearchModalContext = createContext(null);

export { SearchModalContext };

export function SearchModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearchModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearchModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchModalContext.Provider value={{ isOpen, openSearchModal, closeSearchModal }}>
      {children}
      <GlobalSearchModal isOpen={isOpen} onClose={closeSearchModal} />
    </SearchModalContext.Provider>
  );
}

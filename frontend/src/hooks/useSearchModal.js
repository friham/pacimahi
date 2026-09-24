import { useContext } from 'react';
import { SearchModalContext } from '../context/SearchModalContext';

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error('useSearchModal must be used within a SearchModalProvider');
  }
  return context;
}

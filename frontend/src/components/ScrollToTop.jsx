import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    const scrollableContainers = document.querySelectorAll('.profile-page-wrapper, .info-page-wrapper, .admin-main, main');
    scrollableContainers.forEach(container => {
      if (container && container.scrollTop > 0) {
        container.scrollTop = 0;
      }
    });
  }, [pathname, search]);

  return null;
}

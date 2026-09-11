import { useEffect, useRef } from 'react';

/**
 * Custom hook that adds scroll-triggered reveal animations.
 * Elements with the returned `ref` will animate in when they enter the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="scroll-reveal">...</div>
 *
 * CSS needed (add to index.css):
 *   .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
 *   .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el); // Only animate once
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

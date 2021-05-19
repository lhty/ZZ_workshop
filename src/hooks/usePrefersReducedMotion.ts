import React from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

const isSSR = () => {
  return typeof window === 'undefined' ? true : !window.matchMedia(QUERY).matches;
};
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(isSSR);
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = () => {
      setPrefersReducedMotion(!mediaQueryList.matches);
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);
  return prefersReducedMotion;
};

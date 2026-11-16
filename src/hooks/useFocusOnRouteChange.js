import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export function useFocusOnRouteChange() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);
  const contentRef = useRef(null);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return contentRef;
}

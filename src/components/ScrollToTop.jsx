import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top of the page on every route change — including when
// navigating between two routes that render the same component (e.g. one
// property page to another), where React Router won't remount and a plain
// per-page useEffect wouldn't fire.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

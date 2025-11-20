import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" // можно заменить на "smooth" для плавной прокрутки
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

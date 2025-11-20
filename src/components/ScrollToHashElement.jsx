import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Без анимации — просто мгновенно к нужной секции
        setTimeout(() => {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }, 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

export default ScrollToHashElement;

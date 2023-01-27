import { useEffect } from "react";

export const useOverlay = (overlayEl, setActive) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (overlayEl.current === e.target) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleClick);
    return function cleanUp() {
      document.removeEventListener("click", handleClick);
    };
  }, [overlayEl, setActive]);
};

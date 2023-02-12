import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollTop = (props) => {
  // restore scroll to top for every pages
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{props.children}</>;
};

export default ScrollTop;

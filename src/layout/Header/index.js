import { useState, useRef, useEffect } from "react";

import Avatar from "./../../components/ui/Avatar";
import Noti from "./Noti";
import HeaderNav from "./HeaderNav";
import LogoBox from "./LogoBox";
import SearchBox from "./SearchBox";
import { useGlobalContext } from "../../context/GlobalContext";

const Header = () => {
  // toggle Sticky
  const [sticky, setSticky] = useState(true);
  const headerEl = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset >= headerEl.current.offsetHeight) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return function cleanUp() {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // toggle HeaderNav
  const { toggleHeaderNav, setHeaderNav } = useGlobalContext();
  const overlay = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target === overlay.current) {
        setHeaderNav(false);
      }
    };
    document.addEventListener("click", handleClick);
    return function cleanUp() {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={sticky ? "header sticky" : "header"} ref={headerEl}>
      <LogoBox toggleHeaderNav={toggleHeaderNav} setHeaderNav={setHeaderNav} />
      <SearchBox />
      <Noti />
      <Avatar className="avatar small" path="/profile" />
      <HeaderNav
        toggleHeaderNav={toggleHeaderNav}
        setHeaderNav={setHeaderNav}
        overlay={overlay}
      />
    </div>
  );
};
export default Header;

import { memo } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import NavItem from "./../../components/NavItem";

const HeaderNav = ({ overlay }) => {
  const { toggleHeaderNav } = useGlobalContext();
  const toggleClass = toggleHeaderNav
    ? "header_nav_wrapper active"
    : "header_nav_wrapper";

  return (
    <div className={toggleClass} ref={overlay}>
      <div className="header_nav">
        <NavItem />
      </div>
    </div>
  );
};
export default memo(HeaderNav);

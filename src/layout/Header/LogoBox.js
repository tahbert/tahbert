import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/images/cubes.svg";
import { memo } from "react";

const LogoBox = ({ toggleHeaderNav, setHeaderNav }) => {
  return (
    <div className="logo_box">
      <MenuIcon
        className={toggleHeaderNav ? "icon--menu active" : "icon--menu"}
        onClick={() => setHeaderNav(!toggleHeaderNav)}
      />
      <Link className="logo" to="/">
        tahbert.com
      </Link>
    </div>
  );
};
export default memo(LogoBox);

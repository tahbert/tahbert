import { Link } from "react-router-dom";
import Avatar from "./../../components/ui/Avatar";
import Static from "./Statics";
import AsideNav from "./AsideNav";

export default function Aside() {
  return (
    <div className="aside">
      <div className="aside_info">
        <Avatar path="/profile" />
        <Link className="aside_info_name" to="/profile">
          Tahbert Nguyen
        </Link>
        <Static />
      </div>
      <AsideNav />
    </div>
  );
}

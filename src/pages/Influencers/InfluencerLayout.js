import InfluencerCate from "./InfluencerCate";
import { Outlet } from "react-router-dom";

const InfluencerLayout = () => {
  return (
    <div className="main">
      <Outlet />
      <InfluencerCate />
    </div>
  );
};
export default InfluencerLayout;

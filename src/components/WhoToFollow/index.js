import { Link } from "react-router-dom";
import WhoToFollowList from "./WhoToFollowList";

const WhoToFollow = () => {
  return (
    <div className="inf-box">
      <div className="inf-box_header">
        <h2>Who to follow</h2>
        <Link to="/influencers" className="btn--link">
          see all
        </Link>
      </div>

      <WhoToFollowList />
    </div>
  );
};
export default WhoToFollow;

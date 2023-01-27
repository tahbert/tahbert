import { Link } from "react-router-dom";
import { memo } from "react";

const Avatar = ({ img, className, path }) => {
  return (
    <div className={className ? className : "avatar"}>
      <Link to={path} state={img}>
        <img
          src={`/assets/${
            className?.includes("small") ? "avatars_thumb" : "avatars"
          }/${img ?? "Tahbert"}.jpg`}
          alt="avatar"
        />
      </Link>
    </div>
  );
};

export default memo(Avatar);

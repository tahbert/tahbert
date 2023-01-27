import { Link } from "react-router-dom";
import Statics from "../../data/statics.json";
import { useGlobalContext } from "./../../context/GlobalContext";

export default function Static() {
  const { state } = useGlobalContext();

  const countFeeds = state.feedData.length;
  const countActs = state.actData.length;
  const countInfs = state.infData.length;

  const handleNumb = (title) => {
    if (title === "Feed") {
      return countFeeds;
    } else if (title === "Influencers") {
      return countInfs;
    } else {
      return countActs;
    }
  };

  return (
    <div className="aside_info_statics">
      {Statics.map((item) => {
        const { id, title, path } = item;
        return (
          <div className="aside_info_static" key={id}>
            <Link to={path} className="aside_info_title">
              {title}
            </Link>
            <span className="aside_info_numb">{handleNumb(title)}</span>
          </div>
        );
      })}
    </div>
  );
}

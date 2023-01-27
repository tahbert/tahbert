import { Fragment, memo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import InfluencerList from "./InfluencerList";
import { useGlobalContext } from "./../../context/GlobalContext";

const InfluencerCate = () => {
  // fetching
  const { state } = useGlobalContext();
  const Data = state.cateData;

  if (state.isLoading) {
    return <p>loading...</p>;
  } else
    return (
      <Fragment>
        {Data.map((cate) => {
          const { id } = cate;
          const { title, desc, infs } = cate.attributes;
          return (
            <Fragment key={id}>
              <div className="nav_item inf">
                <img
                  className="icon"
                  src={`/assets/icons/${title.toLowerCase()}.svg`}
                  alt={title}
                />
                <span>{title}</span>
              </div>
              <div className="main-review">{desc}</div>
              <InfluencerList infs={infs.data} />
            </Fragment>
          );
        })}
      </Fragment>
    );
};
export default memo(InfluencerCate);

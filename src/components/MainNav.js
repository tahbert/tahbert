import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useFetch } from "../hooks/useFetch";
import { useGlobalContext } from "../context/GlobalContext";

const MainNav = ({ url, setAbout, setActivities }) => {
  // filter Feeds by NavKey
  const { setNavKey } = useGlobalContext();

  // fetching
  const feedNav = "https://api.npoint.io/832b5779adc13a9aa81e";
  const aboutNav = "https://api.npoint.io/e90c6c7432a34dc2c3ff";
  const activityNav = "https://api.npoint.io/3e94327f817607102eab";
  let navUrl;
  if (url === "feed-navs") {
    navUrl = feedNav;
  } else if (url === "about-navs") {
    navUrl = aboutNav;
  } else {
    navUrl = activityNav;
  }
  const { loading, error, data } = useFetch(navUrl);
  const Data = data.data;

  // active MainNav
  const [active, setActive] = useState(1);

  const handleClick = (name, id) => {
    setActive(id);
    if (setAbout) {
      setAbout(id);
    }
    if (setActivities) {
      setActivities(name);
    }
    if (setNavKey && url === "feed-navs") {
      setNavKey(name);
    }
  };

  // returning
  if (loading) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>error...</p>;
  } else
    return (
      <div className="main-nav">
        <h1>
          {url === "feed-navs"
            ? "Feed"
            : url === "activity-navs"
            ? "Activities"
            : "About"}
        </h1>
        <Swiper
          className="swiper swiper_nav"
          slidesPerView={"auto"}
          freeMode={true}
          slideToClickedSlide={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          <div className="swiper-wrapper">
            {Data.map((data) => {
              const { id } = data;
              const { name } = data.attributes;
              return (
                <SwiperSlide
                  key={id}
                  className={
                    id === active
                      ? "btn main-nav-item swiper_slide_nav active"
                      : "btn main-nav-item swiper_slide_nav"
                  }
                  onClick={() => {
                    handleClick(name, id);
                  }}
                >
                  {name}
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    );
};

export default MainNav;

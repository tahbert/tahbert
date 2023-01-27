import { memo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const InfluencerList = ({ infs }) => {
  return (
    <div className="swiper_prevent-break">
      <Swiper
        className="swiper swiper-inf"
        slidesPerView={"auto"}
        freeMode={true}
      >
        <div className="swiper-wrapper" data-inf>
          {infs.map((inf) => {
            const { id } = inf;
            const { name, job, rank } = inf.attributes;
            return (
              <SwiperSlide className="swiper_slide_inf" key={id}>
                <Link className="swiper_avatar" to={name}>
                  <img
                    className="swiper_avatar_img"
                    src={`/assets/avatars/${name}.jpg`}
                    alt={name}
                  />
                </Link>
                <div className="swiper_text">
                  <div className="swiper_text_top">
                    <img
                      className="icon--rank"
                      src={`/assets/icons/${rank}.svg`}
                      alt={rank}
                    />
                    <Link className="swiper_text_name" to={name}>
                      {name}
                    </Link>
                  </div>
                  <p className="swiper_text_job">{job}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default memo(InfluencerList);

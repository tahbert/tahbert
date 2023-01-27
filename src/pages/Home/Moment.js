import { useRef, useState } from "react";
import MomentPopup from "./MomentPopup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Avatar from "../../components/ui/Avatar";
import { useGlobalContext } from "../../context/GlobalContext";
import { useFetch } from "./../../hooks/useFetch";

const Moment = () => {
  // fetching
  const url = "https://api.npoint.io/a00cd0d26b2042f1aa04";
  const { loading, error, data } = useFetch(url);
  const Data = data.data;

  const [active, setActive] = useState(false);
  const { isSearching } = useGlobalContext();

  // getting props for MomentPopup
  const [moment, setMoment] = useState({});
  const getMoment = (title, composer) => {
    setMoment({
      title: title,
      composer: composer,
    });
  };

  // handle audio
  const audioEl = useRef();
  const playAudio = (title) => {
    audioEl.current.src = `assets/audio/${title}.mp3`;
    audioEl.current.play();
  };
  const pauseAudio = () => {
    audioEl.current.pause();
  };

  // returning
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error...</p>;
  } else
    return (
      <div
        className={
          isSearching ? "swiper_prevent-break hidden" : "swiper_prevent-break"
        }
      >
        <Swiper
          className="swiper swiper_moment"
          slidesPerView={"auto"}
          freeMode={true}
        >
          <div className="swiper-wrapper swiper_moment">
            {Data.map((data) => {
              const { id } = data;
              const { title, composer } = data.attributes;
              return (
                <SwiperSlide
                  className="swiper_slide_moment"
                  key={id}
                  onClick={() => {
                    setActive(true);
                    getMoment(title, composer);
                    playAudio(title);
                  }}
                >
                  <div className="swiper_moment_content">
                    <img
                      className="swiper_moment_img"
                      src={`assets/moments_thumb/${title}.jpg`}
                      alt={title}
                    />
                    <audio
                      className="swiper_moment_audio"
                      src=""
                      ref={audioEl}
                      onPause={() => {
                        setActive(false);
                      }}
                    ></audio>
                    <Avatar
                      className="avatar small swiper_moment_avatar"
                      img={composer}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        <MomentPopup
          active={active}
          setActive={setActive}
          title={moment.title}
          composer={moment.composer}
          pauseAudio={pauseAudio}
        />
      </div>
    );
};
export default Moment;

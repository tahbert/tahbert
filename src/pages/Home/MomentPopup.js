import Avatar from "../../components/ui/Avatar";
import { useRef, useEffect } from "react";

const MomentPopup = ({ active, setActive, title, composer, pauseAudio }) => {
  const momentPopupEl = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target === momentPopupEl.current) {
        setActive(false);
        pauseAudio();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setActive, pauseAudio]);

  return (
    <div
      id="moment_popup"
      className={active ? "moment_popup active" : "moment_popup"}
      ref={momentPopupEl}
    >
      <div className="moment_content">
        <img
          className="moment_img"
          src={`assets/moments/${title}.jpg`}
          alt={title}
        />

        <div className="music_wrapper">
          <Avatar
            className="avatar small music_avatar"
            img={composer}
            path={`/influencers/${composer}`}
          />

          <div className="music_info">
            <span className="music_composer">{composer}</span>
            <div>
              <span className="music_track">{title}</span>
              <img
                className={active ? "icon--disc active" : "icon--disc"}
                src="/assets/icons/disc.svg"
                alt="disc"
              />
            </div>
          </div>
        </div>

        <img
          className="icon--close"
          src="/assets/icons/close.svg"
          alt="close"
          onClick={() => {
            setActive(false);
            pauseAudio();
          }}
        />
      </div>
    </div>
  );
};
export default MomentPopup;

import { Link } from "react-router-dom";
import Avatar from "./../../components/ui/Avatar";
import ReactMarkdown from "react-markdown";
import { useGlobalContext } from "./../../context/GlobalContext";

const Feed = ({
  id,
  title,
  content,
  date,
  img,
  audio,
  tags,
  toggleMusic,
  setMusic,
  more,
  setMore,
  setAudio,
}) => {
  const imgName = img?.data.attributes.name; // img is optional

  const { activeFeed } = useGlobalContext();

  // hightlight searching
  const createMarkup = (html) => {
    return { __html: html };
  };

  // filter by Tags
  const { setTagKey, handleInput } = useGlobalContext();

  const handleMusicIcon = () => {
    if (toggleMusic === id) {
      setMusic(null);
    } else {
      setMusic(id);
      setMore(id);
    }
    setAudio(audio);
  };

  return (
    <div className={id === activeFeed ? "feed-box active" : "feed-box"}>
      <div className="feed-box_header">
        <Avatar className="avatar small" path="./profile" />
        <h2>
          <Link to="./profile">Tahbert Nguyen</Link>
        </h2>
        <span className="date">{date}</span>
        <img
          className={toggleMusic === id ? "icon--music playing" : "icon--music"}
          src={`/assets/icons/${toggleMusic === id ? "pause" : "play"}.svg`}
          alt="music"
          onClick={handleMusicIcon}
        />
      </div>

      <div
        className={more === id ? "feed-box_body active" : "feed-box_body"}
        onClick={() => {
          setMore(id);
          setMusic(id);
          setAudio(audio);
        }}
      >
        <h3
          className="feed-title"
          dangerouslySetInnerHTML={createMarkup(title)}
        />

        <ReactMarkdown className={more === id ? "markdown active" : "markdown"}>
          {more === id ? content : content.substr(0, 180).concat("...")}
        </ReactMarkdown>
        <button
          className="btn--link"
          onClick={(e) => {
            e.stopPropagation();
            if (more === id) {
              setMore(null);
              setMusic(null);
            } else {
              setMore(id);
              setMusic(id);
            }
            setAudio(audio);
          }}
        >
          {more === id ? "see less" : "see more"}
        </button>

        <div className="tag">
          {tags.data.map((tag) => {
            const { id } = tag;
            const { name } = tag.attributes;
            return (
              <Link
                to="/"
                key={id}
                href="#tag"
                onClick={(e) => {
                  if (name.includes("</mark>")) {
                    return;
                  } else {
                    e.target.value = name;
                    handleInput(e);
                    setTagKey(name);
                  }
                }}
                dangerouslySetInnerHTML={createMarkup(name)}
              />
            );
          })}
        </div>
      </div>

      <div className="feed-box_footer">
        <img src={`assets/feeds/${imgName}`} alt="feed" />
      </div>
    </div>
  );
};
export default Feed;

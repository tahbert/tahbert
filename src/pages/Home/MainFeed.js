import PopularTags from "../../components/PopularTags";
import { Fragment, useState, useRef, useEffect } from "react";
import WhoToFollow from "../../components/WhoToFollow";
import Feed from "./Feed";
import { useGlobalContext } from "../../context/GlobalContext";

const MainFeed = () => {
  const { state, navKey, cateKey } = useGlobalContext();
  const [toggleMusic, setMusic] = useState(null);
  const [more, setMore] = useState(null);
  const [getAudio, setAudio] = useState("");
  const audioEl = useRef();

  // filter feedData
  let filteredData = [];
  if (navKey === "All" && cateKey === "Feeds") {
    filteredData = state.feedData;
  } else if (navKey === "All" && cateKey !== "Feeds") {
    filteredData = state.feedData.filter((i) =>
      i.attributes.cates.data.some((i) => i.attributes.title === cateKey)
    );
  } else if (navKey !== "All" && cateKey === "Feeds") {
    filteredData = state.feedData.filter((i) =>
      i.attributes.feed_navs.data.some((i) => i.attributes.name === navKey)
    );
  } else {
    filteredData = state.feedData.filter(
      (i) =>
        i.attributes.feed_navs.data.some((i) => i.attributes.name === navKey) &&
        i.attributes.cates.data.some((i) => i.attributes.title === cateKey)
    );
  }

  // filter searchData
  let filteredSearchData = [];
  if (navKey === "All" && cateKey === "Feeds") {
    filteredSearchData = state.searchData;
  } else if (navKey === "All" && cateKey !== "Feeds") {
    filteredSearchData = state.searchData.filter((i) =>
      i.attributes.cates.data.some((i) => i.attributes.title === cateKey)
    );
  } else if (navKey !== "All" && cateKey === "Feeds") {
    filteredSearchData = state.searchData.filter((i) =>
      i.attributes.feed_navs.data.some((i) => i.attributes.name === navKey)
    );
  } else {
    filteredSearchData = state.searchData.filter(
      (i) =>
        i.attributes.feed_navs.data.some((i) => i.attributes.name === navKey) &&
        i.attributes.cates.data.some((i) => i.attributes.title === cateKey)
    );
  }

  useEffect(() => {
    audioEl.current.src = `assets/audio/${getAudio}.mp3`;
    if (toggleMusic !== null) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [toggleMusic]);

  return (
    <div className="main-feed">
      <div className="main-center">
        <audio
          src="assets/audio/Our Planet - This Is Our Planet.mp3"
          ref={audioEl}
          onEnded={() => {
            setMusic(null);
          }}
        ></audio>

        {state.isLoading ? (
          <p>loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="not-found">
            no feed found in
            <br />
            {cateKey} and {navKey}
          </p>
        ) : state.search.length > 0 && filteredSearchData.length === 0 ? (
          <p className="not-found">
            no feed found in
            <br />
            {cateKey} and {navKey}
          </p>
        ) : state.search.length > 0 ? (
          <>
            <p className="found">{`${filteredSearchData.length} ${
              filteredSearchData.length === 1
                ? "feed found about it"
                : "feeds found about it"
            }`}</p>
            {filteredSearchData.map((feed) => {
              const { id } = feed;
              const { title, content, date, img, audio, tags } =
                feed.attributes;
              return (
                <Fragment>
                  <Feed
                    key={id}
                    id={id}
                    title={title}
                    content={content}
                    date={date}
                    img={img}
                    audio={audio}
                    tags={tags}
                    toggleMusic={toggleMusic}
                    setMusic={setMusic}
                    more={more}
                    setMore={setMore}
                    setAudio={setAudio}
                  />
                </Fragment>
              );
            })}
          </>
        ) : (
          filteredData.map((feed) => {
            const { id } = feed;
            const { title, content, date, img, audio, tags } = feed.attributes;
            return (
              <Feed
                key={id}
                id={id}
                title={title}
                content={content}
                date={date}
                img={img}
                audio={audio}
                tags={tags}
                toggleMusic={toggleMusic}
                setMusic={setMusic}
                more={more}
                setMore={setMore}
                setAudio={setAudio}
              />
            );
          })
        )}
      </div>

      <div className="main-right">
        <WhoToFollow />
        <PopularTags />
      </div>
    </div>
  );
};
export default MainFeed;

import { useState, useRef, memo, useEffect } from "react";
import { ReactComponent as NotiIcon } from "../../assets/images/noti.svg";
import Avatar from "./../../components/ui/Avatar";
import { useOverlay } from "./../../hooks/useOverlay";
import { useGlobalContext } from "./../../context/GlobalContext";
import { Link } from "react-router-dom";

const Noti = () => {
  // get the most recent feeds or activities
  const { state, setActiveFeed, setActiveAct } = useGlobalContext();

  // toggle Noti box
  const [show, setShow] = useState(false);
  const overlayEl = useRef();
  useOverlay(overlayEl, setShow);

  // mark readed
  const [recentFeeds, setRecentFeeds] = useState([]);
  const [recentActs, setRecentActs] = useState([]);

  useEffect(() => {
    if (state.isLoading) {
      return;
    } else {
      const now = new Date();
      const lastWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );

      const filteredFeeds = state.feedData.filter(
        (i) => new Date(i.attributes.date) >= lastWeek
      );
      setRecentFeeds(filteredFeeds);

      const filterActs = state.actData.filter(
        (i) => new Date(i.attributes.updatedAt) >= lastWeek
      );
      setRecentActs(filterActs);
    }
  }, [state]);

  const deleteNotiFeed = (id) => {
    const newData = recentFeeds.filter((data) => data.id !== id);
    setRecentFeeds(newData);
  };
  const deleteNotiActivity = (id) => {
    const newData = recentActs.filter((data) => data.id !== id);
    setRecentActs(newData);
  };

  const handleText = (type) => {
    if (type === "new law") {
      return "have set a new law";
    } else if (type === "new goal") {
      return "have set a new goal";
    } else if (type === "goal achieved") {
      return "have achieved a new goal";
    } else if (type === "goal unfinished") {
      return "have not finished a goal";
    } else {
      return "have broken a law";
    }
  };

  const handleIcon = (type) => {
    if (type === "new law") {
      return "law";
    } else if (type === "new goal") {
      return "goal";
    } else if (type === "goal achieved") {
      return "happy";
    } else if (type === "goal unfinished") {
      return "sad";
    } else {
      return "sad";
    }
  };

  return (
    <div className="noti-box_wrapper">
      <NotiIcon className="icon--noti" onClick={() => setShow(!show)} />
      <span className="noti-badge">
        {recentFeeds.length + recentActs.length}
      </span>
      <div
        className={show ? "overlay active" : "overlay"}
        ref={overlayEl}
      ></div>
      <div className={show ? "noti-box active" : "noti-box"}>
        <div className="noti-box_header ">
          <h2>What's new this week?</h2>
        </div>

        <div className="noti-box_body">
          {recentFeeds.length + recentActs.length === 0 && (
            <p className="nothing">nothing new</p>
          )}

          {/* listing recent feeds */}
          {recentFeeds.map((data) => {
            const { id } = data;
            return (
              <Link
                href="#noti"
                className={
                  recentFeeds.find((c) => c.id === id)
                    ? "noti-item"
                    : "noti-item readed"
                }
                key={id}
                to="/"
                onClick={() => {
                  setShow(!show);
                  deleteNotiFeed(id);
                  setActiveFeed(id);
                }}
              >
                <span className="noti-dot"></span>
                <Avatar className="avatar small" />
                <div className="noti-text">
                  <h3>Tahbert Nguyen</h3>
                  <span>have a new feed</span>
                </div>
                <img
                  className="icon--activity"
                  src={`/assets/icons/feed.svg`}
                  alt="icon"
                />
              </Link>
            );
          })}

          {/* listing recent activities */}
          {recentActs.map((data) => {
            const { id } = data;
            const { type } = data.attributes;
            return (
              <Link
                href="#noti"
                className={
                  recentActs.find((c) => c.id === id)
                    ? "noti-item"
                    : "noti-item readed"
                }
                key={id}
                to="/profile"
                onClick={() => {
                  setShow(!show);
                  deleteNotiActivity(id);
                  setActiveAct(id);
                }}
              >
                <span className="noti-dot"></span>
                <Avatar className="avatar small" />
                <div className="noti-text">
                  <h3>Tahbert Nguyen</h3>
                  <span>{handleText(type)}</span>
                </div>
                <img
                  className="icon--activity"
                  src={`/assets/icons/${handleIcon(type)}.svg`}
                  alt="icon"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default memo(Noti);

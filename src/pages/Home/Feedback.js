import { useOverlay } from "./../../hooks/useOverlay";

const Feedback = ({ overlayEl, feedback, setFeedback }) => {
  const Data = ["like", "dislike"];
  useOverlay(overlayEl, setFeedback);

  return (
    <div className={feedback ? "feedback-box active" : "feedback-box"}>
      <div className="feedback-box_body">
        {Data.map((data) => {
          return (
            <button
              key={data}
              className="feedback-item"
              onClick={() => setFeedback(false)}
            >
              <span className="noti-text">
                {data === "like"
                  ? "Write more about this!"
                  : "This is terrible!"}
              </span>
              <img
                className="icon--feedback"
                src={`/assets/icons/${data}.svg`}
                alt={data}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Feedback;

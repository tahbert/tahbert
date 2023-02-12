import { Fragment } from "react";
import Avatar from "./../../components/ui/Avatar";
import { ReactComponent as HappyIcon } from "../../assets/images/happy.svg";
import { ReactComponent as SadIcon } from "../../assets/images/sad.svg";
import { ReactComponent as GoalIcon } from "../../assets/images/goal.svg";
import { ReactComponent as LawIcon } from "../../assets/images/law.svg";
import { useGlobalContext } from "./../../context/GlobalContext";

const handleEmoji = (type) => {
  if (type === "new goal") {
    return <GoalIcon className="icon--activity" />;
  } else if (type === "new law") {
    return <LawIcon className="icon--activity" />;
  } else if (type === "goal achieved") {
    return <HappyIcon className="icon--activity" />;
  } else {
    return <SadIcon className="icon--activity" />;
  }
};

const handleDesc = (type) => {
  if (type === "new goal") {
    return "have set a new goal";
  } else if (type === "new law") {
    return "have set a new law";
  } else if (type === "goal achieved") {
    return "have achieved a new goal";
  } else if (type === "goal unfinished") {
    return "have not finished a new goal";
  } else {
    return "have broken the law";
  }
};

const Activities = ({ activities }) => {
  const { state, activeAct } = useGlobalContext();
  const Data = state.actData;

  if (state.isLoading) {
    return <p>loading...</p>;
  } else {
    let newData = [];
    if (activities === "All") {
      newData = Data;
    } else {
      console.log(Data);
      newData = Data.filter(
        (i) => i.attributes.activity_nav.data.attributes.name === activities
      );
    }
    return (
      <Fragment>
        {newData.map((activity) => {
          const { id } = activity;
          const { type, desc, updatedAt } = activity.attributes;
          return (
            <div className="activity-box" key={id}>
              <div className="activity-box_header">
                <Avatar className="avatar small" />
                <div className="activity-text">
                  <h3>Tahbert Nguyen</h3>
                  <span className="sec-text">{handleDesc(type)}</span>
                </div>
                {handleEmoji(type)}
              </div>

              <div className="activity-box_footer">
                <div className="date">{updatedAt.slice(0, 10)}</div>
                <p className={activeAct === id ? "text active" : "text"}>
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  }
};
export default Activities;

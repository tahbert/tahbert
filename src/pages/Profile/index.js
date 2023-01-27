import Goals from "./Goals";
import Laws from "./Laws";
import Activities from "./Activities";
import MainNav from "./../../components/MainNav";
import MainCover from "./../../components/MainCover";
import MainInfo from "./../../components/MainInfo";
import MainReview from "./../../components/MainReview";
import { useState } from "react";

export default function Profile() {
  const [activities, setActivities] = useState("All");

  return (
    <div className="main">
      <MainCover cover="Tahbert" />
      <MainInfo />
      <MainReview />
      <MainNav url="activity-navs" setActivities={setActivities} />
      <div className="main-feed">
        <div className="main-center activity">
          <Activities activities={activities} />
        </div>
        <div className="main-right">
          <Goals />
          <Laws />
        </div>
      </div>
    </div>
  );
}

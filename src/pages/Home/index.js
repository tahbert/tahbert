import MainNav from "./../../components/MainNav";
import Moment from "./Moment";
import MainFeed from "./MainFeed";

export default function Home() {
  return (
    <div className="main home">
      <MainNav url="feed-navs" />
      <Moment />
      <MainFeed />
    </div>
  );
}

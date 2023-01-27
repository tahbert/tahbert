import { Link } from "react-router-dom";
import Avatar from "./../ui/Avatar";
import { useGlobalContext } from "./../../context/GlobalContext";

const WhoToFollowList = () => {
  const { state } = useGlobalContext();
  const Data = state.infData;

  // returning
  if (state.isLoading) {
    return <p>loading</p>;
  } else
    return (
      <div className="inf-box_body ">
        {Data.map((person) => {
          const { id } = person;
          const { name, job, rank, featured } = person.attributes;
          if (featured) {
            return (
              <div className="inf-item" key={id}>
                <Avatar
                  className="avatar small"
                  img={name}
                  path={`/influencers/${name}`}
                />
                <div className="inf-text">
                  <h3>
                    <Link to={`/influencers/${name}`} state={name}>
                      {name}
                    </Link>
                  </h3>
                  <span>{job}</span>
                </div>
                <img
                  className="icon--rank"
                  src={`/assets/icons/${rank}.svg`}
                  alt={rank}
                />
              </div>
            );
          }
        })}
      </div>
    );
};
export default WhoToFollowList;

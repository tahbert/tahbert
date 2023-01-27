import { Fragment, useState, memo } from "react";
import { useParams } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Avatar from "../../components/ui/Avatar";
import { useGlobalContext } from "../../context/GlobalContext";
import ReactMarkdown from "react-markdown";

const SingleInfluencer = () => {
  const { state } = useGlobalContext();
  const Data = state.infData;

  const [about, setAbout] = useState(1);

  // default influencer
  let { infName } = useParams();
  if (infName === undefined) {
    infName = "Hans Zimmer";
  }

  const handleRankText = (rank) => {
    if (rank === "love") {
      return "top 1 in my heart";
    } else if (rank === "verified") {
      return "beautify my life so much";
    } else {
      return "beautify my life";
    }
  };

  if (state.isLoading) {
    return <p>loading</p>;
  } else {
    // finding influencer
    const initDetail = Data.find((i) => i.attributes.name === infName);
    const { name, job, rank, overview, work } = initDetail.attributes;
    return (
      <Fragment>
        <div className="main_cover" id="top">
          <img
            className="main_cover_img"
            src={`/assets/covers/${name} cover.jpg`}
            alt={name}
          />
        </div>
        <div className="main_info">
          <Avatar className="avatar big" img={name} />

          <div className="main_info_text">
            <h1 className="main_info_name">{name}</h1>
            <div className="main_info_detail">
              <div className="main_info_job">
                <img
                  className="icon--job"
                  src={`/assets/icons/job.svg`}
                  alt={job}
                />
                <span>{job}</span>
              </div>
              <div className="main_info_rank">
                <img
                  className="icon--rank"
                  src={`/assets/icons/${rank}.svg`}
                  alt={rank}
                />
                <span>{handleRankText(rank)}</span>
              </div>
            </div>
          </div>
        </div>

        <MainNav url="about-navs" setAbout={setAbout} />
        <div className="main-review">
          <ReactMarkdown className="react-markdown">
            {about === 1 ? overview : work}
          </ReactMarkdown>
        </div>
      </Fragment>
    );
  }
};

export default memo(SingleInfluencer);

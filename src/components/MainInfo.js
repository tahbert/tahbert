import Avatar from "./ui/Avatar";

const MainInfo = () => {
  return (
    <div className="main_info">
      <Avatar className="avatar big" />

      <div className="main_info_text">
        <h1 className="main_info_name">Tahbert Nguyen</h1>
        <div className="main_info_detail">
          <div className="main_info_job">
            <img className="icon--job" src="/assets/icons/job.svg" alt="job" />
            <span>frontend engineer</span>
          </div>
          <div className="main_info_rank">
            <img
              className="icon--rank"
              src="/assets/icons/love.svg"
              alt="job"
            />
            <span>top 1 in my heart</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainInfo;

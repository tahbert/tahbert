const MainCover = ({ cover }) => {
  return (
    <div className="main_cover">
      <img
        className="main_info_img"
        src={`/assets/covers/${cover} cover.jpg`}
        alt="cover"
      />
    </div>
  );
};
export default MainCover;

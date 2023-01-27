import { memo, useRef } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const SearchBox = () => {
  const { tagKey, setTagKey, handleInput } = useGlobalContext();
  const inputEl = useRef();

  // prevent submit
  const handleSubmit = (e) => {
    e.preventDefault();
    inputEl.current.blur();
  };

  return (
    <form className="search_box" action="#" onSubmit={handleSubmit}>
      <img
        className="icon--search"
        src="/assets/icons/search.svg"
        alt="search"
        onClick={() => {
          inputEl.current.focus();
        }}
      />
      <input
        ref={inputEl}
        type="text"
        name="search"
        id="search"
        placeholder="Search feeds"
        onFocus={(e) => {
          setTagKey("");
          e.target.value = "";
          handleInput(e);
        }}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <div className={tagKey ? "search_tag" : "search_tag hidden"}>
        {tagKey}
        <img
          className="icon--close-tag"
          src="/assets/icons/close.svg"
          alt="close"
          onClick={(e) => {
            setTagKey("");
            e.target.value = "";
            handleInput(e);
          }}
        />
      </div>
    </form>
  );
};
export default memo(SearchBox);

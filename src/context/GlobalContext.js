import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import axios from "axios";

const AppContext = createContext();

// initial state
const initialState = {
  isLoading: true,
  feedData: [],
  search: "",
  searchData: [],
  actData: [],
  infData: [],
  cateData: [],
};

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FEED_DATA":
      return {
        ...state,
        feedData: action.payload,
        isLoading: false,
      };
    case "SEARCH_INPUT":
      return { ...state, search: action.payload };
    case "SEARCH_DATA":
      return { ...state, searchData: action.payload };
    case "ACT_DATA":
      return { ...state, isLoading: false, actData: action.payload };
    case "INF_DATA":
      return { ...state, isLoading: false, infData: action.payload };
    case "CATE_DATA":
      return { ...state, isLoading: false, cateData: action.payload };
    default:
      throw new Error();
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetching with axios
  const fetchingData = () => {
    let endpoints = [
      "https://api.npoint.io/2a2903b06e9243ad562d",
      "https://api.npoint.io/fd186fa60032c862546c",
      "https://api.npoint.io/08a673a5e8966f4a9e01",
      "https://api.npoint.io/9e1d12a8dcd92360c6cd",
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread(
        (
          { data: feeds },
          { data: influencers },
          { data: activities },
          { data: categories }
        ) => {
          dispatch({ type: "FEED_DATA", payload: feeds.data });
          dispatch({ type: "ACT_DATA", payload: activities.data });
          dispatch({ type: "INF_DATA", payload: influencers.data });
          dispatch({ type: "CATE_DATA", payload: categories.data });
        }
      )
    );
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // filter feeds by MainNav
  const [navKey, setNavKey] = useState("All");
  // filter feeds by Categories
  const [cateKey, setCateKey] = useState("Feeds");
  // filter feeds by tagKey
  const [tagKey, setTagKey] = useState("");

  // hidden moments when searching
  const [isSearching, setSearching] = useState(false);
  useEffect(() => {
    if (navKey !== "All" || cateKey !== "Feeds" || tagKey !== "") {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [navKey, cateKey, tagKey]);

  // search and hightlight
  const handleInput = (e) => {
    let str = e.target.value;
    dispatch({ type: "SEARCH_INPUT", payload: str });

    // display: none moments when searching
    if (str.length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }

    const newArr = state.feedData
      .filter(
        (item) =>
          item.attributes.title.toLowerCase().includes(str.toLowerCase()) ||
          item.attributes.tags.data.some((item) =>
            item.attributes.name.toLowerCase().includes(str.toLowerCase())
          )
      )
      .map((item) => {
        let newTitle = item.attributes.title.replace(
          new RegExp(str, "gi"),
          (match) =>
            `<mark style="background: #000000; color: white;">${match}</mark>`
        );

        let newTags = item.attributes.tags.data.map((item) => {
          let newTag = item.attributes.name.replace(
            new RegExp(str, "gi"),
            (match) =>
              `<mark style="background: #000000; color: white;">${match}</mark>`
          );
          return {
            ...item,
            attributes: {
              ...item.attributes,
              name: newTag,
            },
          };
        });
        return {
          ...item,
          attributes: {
            ...item.attributes,
            title: newTitle,
            tags: { data: newTags },
          },
        };
      });

    dispatch({ type: "SEARCH_DATA", payload: newArr });
  };

  // toggle active categrories
  const [activeCate, setActiveCate] = useState(null);

  // toggle HeaderNav
  const [toggleHeaderNav, setHeaderNav] = useState(false);

  return (
    <AppContext.Provider
      value={{
        state,
        handleInput,
        isSearching,
        setSearching,
        activeCate,
        setActiveCate,
        toggleHeaderNav,
        setHeaderNav,
        navKey,
        setNavKey,
        cateKey,
        setCateKey,
        tagKey,
        setTagKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

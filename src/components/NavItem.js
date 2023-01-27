import { Fragment, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Pages from "../data/pages.json";
import { useGlobalContext } from "../context/GlobalContext";
import { useLocation } from "react-router";

const NavItem = () => {
  // getting a category
  const { setCateKey } = useGlobalContext();
  // toggle categories
  const { activeCate, setActiveCate } = useGlobalContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveCate(null);
    }
  }, [location, setActiveCate]);

  // toggle HeaderNav
  const { setHeaderNav } = useGlobalContext();

  // fetching
  const { state } = useGlobalContext();
  const Data = state.cateData;

  // returning
  if (state.isLoading) {
    return <p>loading...</p>;
  } else
    return (
      <Fragment>
        {Pages.map((item) => {
          const { id, title, path } = item;
          return (
            <NavLink
              className="nav_item"
              to={path}
              key={id}
              onClick={() => {
                setHeaderNav(false);
                setActiveCate(null);
                setCateKey("Feeds");
              }}
            >
              <img
                className="icon"
                src={`/assets/icons/${title.toLowerCase()}.svg`}
                alt={title}
              />
              <span>{title}</span>
            </NavLink>
          );
        })}
        {Data.map((cate) => {
          const { id } = cate;
          const { title } = cate.attributes;
          return (
            <Link
              className={
                activeCate === id ? "nav_item cate-active" : "nav_item"
              }
              key={id}
              to="/"
              onClick={() => {
                if (activeCate === id) {
                  setActiveCate(null);
                  setCateKey("Feeds");
                } else {
                  setActiveCate(id);
                  setCateKey(title);
                }
                setHeaderNav(false);
              }}
            >
              <img
                className="icon"
                src={`/assets/icons/${title.toLowerCase()}.svg`}
                alt={title}
              />
              <span>{title}</span>
            </Link>
          );
        })}
      </Fragment>
    );
};
export default NavItem;

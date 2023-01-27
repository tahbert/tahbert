import { useFetch } from "../../hooks/useFetch";
import { useGlobalContext } from "./../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function PopularTagsList() {
  // strapi
  const url = "https://api.npoint.io/16afb2baff57383177d1";
  const { loading, error, data } = useFetch(url);
  const Data = data.data;

  // filter by Tags
  const { setTagKey, handleInput } = useGlobalContext();

  // returning
  if (loading) {
    return <p>loading</p>;
  } else if (error) {
    return <p>error</p>;
  } else
    return (
      <div className="tag-box_body">
        {Data.map((tag) => {
          const { id } = tag;
          const { name, featured } = tag.attributes;
          if (featured) {
            return (
              <Link
                to="/"
                key={id}
                onClick={(e) => {
                  if (name.includes("</mark>")) {
                    return;
                  } else {
                    e.target.value = name;
                    handleInput(e);
                    setTagKey(name);
                  }
                }}
              >
                {name}
              </Link>
            );
          }
        })}
      </div>
    );
}

import { useFetch } from "./../../hooks/useFetch";

const GoalsList = () => {
  // strapi
  const url = "https://api.npoint.io/6f972b9678464f26b3a5";
  const { loading, error, data } = useFetch(url);
  const Data = data.data;

  if (loading) {
    return <p>Loading</p>;
  } else if (error) {
    return <p>Error</p>;
  } else
    return (
      <div className="inf-box_body">
        {Data.map((goal) => {
          const { id } = goal;
          const { title, desc, percent } = goal.attributes;
          return (
            <div className="inf-item" key={id}>
              <img
                className="icon--activity"
                src={`/assets/icons/${title.toLowerCase()}.svg`}
                alt={title}
              />
              <div className="inf-text">
                <h3>
                  <a href="#inf">{title}</a>
                </h3>
                <span>{desc}</span>
              </div>
              <span className="percen">{percent}</span>
            </div>
          );
        })}
      </div>
    );
};
export default GoalsList;

import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="error-page">
      <h1>Page Not Found!</h1>
      <Link to="/" className="btn--back">
        Back
      </Link>
    </div>
  );
};
export default Error;

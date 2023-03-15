import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Sorry, the page you were looking for was not found. </h1>
      <Link className="main" to="/">
        Return to home page
      </Link>
    </div>
  );
}

export default NotFound;

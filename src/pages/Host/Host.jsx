import { Link, Outlet } from "react-router-dom";

function Host() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/host">Dashboard</Link>
          </li>
          <li>
            <Link to="/host/Income">Income</Link>
          </li>
          <li>
            <Link to="/host/reviews">Reviews</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Host;

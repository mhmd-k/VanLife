import { NavLink, Outlet } from "react-router-dom";

function Host() {
  return (
    <>
      <nav>
        <div className="container">
          <ul>
            <li>
              <NavLink
                to="/host"
                className={(e) => (e.isActive ? "active" : null)}
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/host/Income"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Income
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/host/vans"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Vans
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/host/reviews"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Host;

import { NavLink, Outlet } from "react-router-dom";

function Host() {
  return (
    <>
      <nav>
        <div className="container">
          <ul>
            <li>
              <NavLink
                to="."
                className={(e) => (e.isActive ? "active" : null)}
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="income"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Income
              </NavLink>
            </li>
            <li>
              <NavLink
                to="vans"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Vans
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
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

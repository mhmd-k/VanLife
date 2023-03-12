import { NavLink } from "react-router-dom";
import logo from "../assets/images/logog.png";

function Navbar() {
  return (
    <header>
      <nav>
        <div className="container">
          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <ul>
            <li>
              <NavLink
                to="/host"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Host
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={(e) => (e.isActive ? "active" : null)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vans"
                className={(e) => (e.isActive ? "active" : null)}
              >
                Vans
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

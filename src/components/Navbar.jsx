import { Link } from "react-router-dom";
import logo from "../assets/images/logog.png";
function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/vans">Vans</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

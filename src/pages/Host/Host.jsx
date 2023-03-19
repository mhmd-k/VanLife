import { NavLink, Outlet } from "react-router-dom";
import { SiSimpleanalytics } from "react-icons/si";
import { BiCoinStack } from "react-icons/bi";
import { BsFillBusFrontFill } from "react-icons/bs";
import { BsLayoutTextSidebar } from "react-icons/bs";

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
                {window.innerWidth > 767 ? (
                  <>
                    Dashboard <SiSimpleanalytics />
                  </>
                ) : (
                  <SiSimpleanalytics />
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="income"
                className={(e) => (e.isActive ? "active" : null)}
              >
                {window.innerWidth > 767 ? (
                  <>
                    Income <BiCoinStack />
                  </>
                ) : (
                  <BiCoinStack />
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="vans"
                className={(e) => (e.isActive ? "active" : null)}
              >
                {window.innerWidth > 767 ? (
                  <>
                    Vans <BsFillBusFrontFill />
                  </>
                ) : (
                  <BsFillBusFrontFill />
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                className={(e) => (e.isActive ? "active" : null)}
              >
                {window.innerWidth > 767 ? (
                  <>
                    Reviews <BsLayoutTextSidebar />
                  </>
                ) : (
                  <BsLayoutTextSidebar />
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="host">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Host;

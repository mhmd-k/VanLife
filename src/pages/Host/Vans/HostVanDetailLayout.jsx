import { useContext, useEffect, useState } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getVan, deleteVan } from "../../../api/firebase";
import Spinner from "../../../components/Spinner";
import { UserContext } from "../../../App";

function HostVanDetailLayout() {
  const { user, setUser } = useContext(UserContext);
  const [van, setVan] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setStatus("fetching");
    getVan(params.id)
      .then((data) => setVan(data))
      .catch((err) => setError(err))
      .finally(() => setStatus("idle"));
  }, []);

  return (
    <div className="host-van-detail">
      <div className="container">
        {status === "fetching" ? (
          <Spinner />
        ) : (
          <>
            <Link to=".." relative="path">
              <BiArrowBack /> Back to all vans
            </Link>
            {error && (
              <div className="error">
                Please check your internet connection and try again
              </div>
            )}
            {van && (
              <div className="card">
                <div className="top">
                  <div className="image">
                    <img src={van.imageUrl} alt={van.name} />
                  </div>
                  <div className="text">
                    <div className={`type ${van.type.toLowerCase()}`}>
                      <span>{van.type}</span>
                    </div>
                    <h4>{van.name}</h4>
                    <p>${van.price}/day</p>
                    <button
                      className="delete"
                      onClick={() => {
                        deleteVan(user.uid, van.id);
                        navigate("/vans", { replace: true, relative: true });
                      }}
                    >
                      Delete Van
                    </button>
                  </div>
                </div>
                <div className="nav">
                  <nav>
                    <ul>
                      <li>
                        <NavLink
                          end
                          to={`/host/vans/${van.id}`}
                          className={(e) => (e.isActive ? "active" : null)}
                        >
                          Details
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/host/vans/${van.id}/prices`}
                          className={(e) => (e.isActive ? "active" : null)}
                        >
                          Prices
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/host/vans/${van.id}/photos`}
                          className={(e) => (e.isActive ? "active" : null)}
                        >
                          Photos
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                  <Outlet context={[van, setVan]} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HostVanDetailLayout;

import { useEffect, useState } from "react";
import { useParams, NavLink, Link, Outlet } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function HostVanDetailLayout() {
  const [van, setVan] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans);
      });
  }, []);

  return (
    <div className="host-van-detail">
      <div className="container">
        <Link to=".." relative="path">
          <BiArrowBack /> Back to all vans
        </Link>
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
      </div>
    </div>
  );
}

export default HostVanDetailLayout;

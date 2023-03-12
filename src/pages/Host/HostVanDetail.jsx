import { useEffect, useState } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import BackArrow from "../../assets/icons/Arrow 1.svg";

function HostVanDetail() {
  const [van, setVan] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(...data.vans);
      });
  }, []);

  console.log(van);

  return (
    <div className="host-van-detail">
      <div className="container">
        <Link to="/host/vans">
          <img src={BackArrow} alt="back icon" /> Back to all vans
        </Link>
        {van ? (
          <div className="card">
            <div className="top">
              <div className="image">
                <img src={van.imageUrl} alt="van image" />
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
                    <Link>Details</Link>
                  </li>
                  <li>
                    <Link>Prices</Link>
                  </li>
                  <li>
                    <Link>Photos</Link>
                  </li>
                </ul>
              </nav>
              <p>{van.description}</p>
              <div>
                Visibility: <span>Public</span>
              </div>
            </div>
          </div>
        ) : (
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default HostVanDetail;

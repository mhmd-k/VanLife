import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HostVans() {
  const [hostVans, setHostVans] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => {
        setHostVans(data.vans);
      });
  }, []);

  console.log(hostVans);

  const vans = hostVans.map((van) => {
    return (
      <div className="van" key={van.id}>
        <Link to={`/host/vans/${van.id}`}>
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="text">
            <h4>{van.name}</h4>
            <p>${van.price}/day</p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="host-vans">
      <h3>Your Listed Vans</h3>
      <div className="container">{vans}</div>
    </div>
  );
}

export default HostVans;

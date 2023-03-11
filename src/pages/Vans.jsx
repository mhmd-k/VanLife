import { useEffect, useState } from "react";
import VanCard from "../components/VanCard";

function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
        console.log(data.vans);
      });
  }, []);

  const vansArr = vans.map((van) => {
    return (
      <VanCard
        key={van.id}
        id={van.id}
        image={van.imageUrl}
        description={van.description}
        name={van.name}
        price={van.price}
        type={van.type}
      />
    );
  });

  return (
    <div className="vans">
      <div className="container">
        <h2>Explore our van options</h2>
        <ul className="filter">
          <li>Simple</li>
          <li>Luxury</li>
          <li>Rugged</li>
          <li>Clear filters</li>
        </ul>
        <div className="vans-container">{vansArr}</div>
      </div>
    </div>
  );
}

export default Vans;

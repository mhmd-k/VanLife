import { useEffect, useState } from "react";
import VanCard from "./VanCard";
import { useSearchParams, Link } from "react-router-dom";

function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  const vansArr = filteredVans.map((van) => {
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
          <li onClick={() => setSearchParams({ type: "simple" })}>Simple </li>
          <li
            className="luxury"
            onClick={() => setSearchParams({ type: "luxury" })}
          >
            Luxury
          </li>
          <li
            className="rugged"
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            Rugged
          </li>
          <li onClick={() => setSearchParams({})}>Clear Filter</li>
        </ul>
        <div className="vans-container">{vans.length > 0 && vansArr}</div>
      </div>
    </div>
  );
}

export default Vans;

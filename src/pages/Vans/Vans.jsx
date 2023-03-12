import { useEffect, useState } from "react";
import VanCard from "./VanCard";

function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
        setVans((prevVans) => {
          return prevVans.map((van) => {
            return { ...van, visibility: true };
          });
        });
      });
  }, []);

  function filtervans(type) {
    setVans((prevVans) => {
      return prevVans.map((van) =>
        van.type.toLowerCase() === type
          ? { ...van, visibility: true }
          : { ...van, visibility: false }
      );
    });
  }

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
        visibility={van.visibility}
      />
    );
  });

  return (
    <div className="vans">
      <div className="container">
        <h2>Explore our van options</h2>
        <ul className="filter">
          <li onClick={() => filtervans("simple")}>Simple</li>
          <li className="luxury" onClick={() => filtervans("luxury")}>
            Luxury
          </li>
          <li className="rugged" onClick={() => filtervans("rugged")}>
            Rugged
          </li>
          <li
            onClick={() =>
              setVans((prevVans) => {
                return prevVans.map((van) => {
                  return { ...van, visibility: true };
                });
              })
            }
          >
            Clear filters
          </li>
        </ul>
        <div className="vans-container">{vansArr}</div>
      </div>
    </div>
  );
}

export default Vans;

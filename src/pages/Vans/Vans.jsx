import VanCard from "./VanCard";
import { useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  return getVans();
}

function Vans() {
  const vans = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
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
        filter={searchParams.toString()}
      />
    );
  });

  return (
    <div className="vans">
      <div className="container">
        <h2>Explore our van options</h2>
        <ul className="filter">
          <li
            className={typeFilter === "simple" ? "selected" : ""}
            onClick={() => setSearchParams({ type: "simple" })}
          >
            Simple{" "}
          </li>
          <li
            className={typeFilter === "luxury" ? "luxury selected" : "luxury"}
            onClick={() => setSearchParams({ type: "luxury" })}
          >
            Luxury
          </li>
          <li
            className={typeFilter === "rugged" ? "rugged selected" : "rugged"}
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            Rugged
          </li>
          {typeFilter && (
            <li className="filter" onClick={() => setSearchParams({})}>
              Clear Filter
            </li>
          )}
        </ul>
        <div className="vans-container">{vansArr}</div>
      </div>
    </div>
  );
}

export default Vans;

import { Suspense } from "react";
import { Await, Link, useLoaderData, defer } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getHostVans } from "../../api/firebase";

export function loader() {
  const uid = JSON.parse(localStorage.getItem("user")).uid;
  return defer({ vans: getHostVans(uid) });
}

function renderVans(vans) {
  console.log(vans);
  if (vans.length === 0) {
    return (
      <>
        you don't have any vans,{" "}
        <Link className="link" to="/vans">
          Rent one Now
        </Link>
      </>
    );
  }
  const vansElements = vans.map((van) => {
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
    <>
      <h2>Your Listed Vans</h2>
      <div className="container">{vansElements}</div>
    </>
  );
}

function HostVans() {
  const vansPromise = useLoaderData();

  return (
    <div className="host-vans">
      <Suspense fallback={<Spinner />}>
        <Await resolve={vansPromise.vans}>{renderVans}</Await>
      </Suspense>
    </div>
  );
}

export default HostVans;

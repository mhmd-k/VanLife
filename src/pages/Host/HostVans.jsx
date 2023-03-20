import { Suspense } from "react";
import {
  Await,
  Link,
  useLoaderData,
  defer,
  useLocation,
} from "react-router-dom";
import Spinner from "../../components/Spinner";

export function loader(obj) {
  console.log(obj.params);
  return defer({ vans: "" });
}

function renderVans(vans) {
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

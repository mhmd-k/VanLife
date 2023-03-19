import { Suspense } from "react";
import {
  Link,
  useLocation,
  defer,
  Await,
  useLoaderData,
} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getVans } from "../../api";
import Spinner from "../../components/Spinner";

export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

function VanDetail() {
  const vanPromise = useLoaderData();
  const location = useLocation();
  const filter = location.state?.filter || "";
  const type = location.state?.type || "all";

  function renderVan(van) {
    return (
      <div className="container">
        {/* this link will take you to the vans page and if there
        is a filter in the vans page this link will restore it */}
        <Link to={`../?${filter}`} relative="path">
          <BiArrowBack /> to {type} vans
        </Link>
        <div className="card">
          <div className="image">
            <img src={van.imageUrl} alt={van.name} />
          </div>
          <div className="content">
            <div className={`type ${van.type.toLowerCase()}`}>
              <span>{van.type}</span>
            </div>
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
            <p>{van.description}</p>
            <button className="main">Rent this van</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="van-detail">
      <Suspense fallback={<Spinner />}>
        <Await resolve={vanPromise.van}>{renderVan}</Await>
      </Suspense>
    </div>
  );
}

export default VanDetail;

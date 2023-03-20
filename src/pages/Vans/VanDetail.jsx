import { Suspense, useContext, useState } from "react";
import {
  Link,
  useLocation,
  defer,
  Await,
  useLoaderData,
  NavLink,
} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getVan, rentVan } from "../../api/firebase";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../App";

export function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

function VanDetail() {
  const { user, setUser } = useContext(UserContext);
  const [vanExists, setVanExists] = useState(false);
  const [addVan, setAddVan] = useState(false);
  const [state, setState] = useState("idle");
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
            {vanExists && (
              <p className="error">You've already rented this van</p>
            )}
            {addVan && (
              <p className="msg">van has been added to your collection</p>
            )}
            <button
              className="main"
              onClick={() => {
                setState("submitting");
                rentVan(van, user.uid)
                  .then((res) => {
                    setVanExists(res);
                    setAddVan(!res);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    setState("idle");
                  });
              }}
              disabled={state === "submitting"}
            >
              {state === "submitting" ? "..." : "Rent this van"}
            </button>
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

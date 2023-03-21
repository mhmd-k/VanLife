import React from "react";
import { Link, defer, Await, useLoaderData } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { getHostVans } from "../../api/firebase";
import Spinner from "../../components/Spinner";

export const loader = () => {
  const uid = JSON.parse(localStorage.getItem("user")).uid;
  return defer({ vans: getHostVans(uid) });
};

export default function Dashboard() {
  const loaderData = useLoaderData();

  function renderVanElements(vans) {
    console.log(vans);

    if (vans.length === 0 || vans === null) {
      return (
        <>
          you don't have any vans,
          <Link className="link" to="/vans">
            Rent one Now
          </Link>
        </>
      );
    }
    if (vans.length > 2) {
      vans.length = 2;
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
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        <div className="container">{vansElements}</div>
      </>
    );
  }

  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <BsStarFill className="star" />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="host-vans">
          <React.Suspense fallback={<Spinner />}>
            <Await resolve={loaderData.vans}>{renderVanElements}</Await>
          </React.Suspense>
        </div>
      </section>
    </>
  );
}

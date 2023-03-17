import { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData, defer } from "react-router-dom";

async function fetchVans() {
  const res = await fetch("/api/host/vans");
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}

function HostVans() {
  const [vans, setVans] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  console.log(vans);
  console.log(error);
  console.log(status);

  useEffect(() => {
    setStatus("fetching");
    fetchVans()
      .then((data) => {
        console.log(data);
        setVans(data.vans);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }, []);

  if (error) {
    return <>Please check you internet connition and try again</>;
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
    <div className="host-vans">
      {status === "fetching" ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <h3>Your Listed Vans</h3>
          <div className="container">{vansElements}</div>
        </>
      )}
    </div>
  );
}

export default HostVans;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import backArrow from "../../assets/icons/Arrow 1.svg";

function VanDetail() {
  const [van, setVan] = useState(null);
  const params = useParams();

  console.log(van);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, []);

  return (
    <div className="van-detail">
      <div className="container">
        <Link to=".." relative="path">
          <img src={backArrow} alt="" /> Back to all vans
        </Link>
        {van ? (
          <div className="card">
            <div className="image">
              <img src={van.imageUrl} alt="" />
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
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default VanDetail;

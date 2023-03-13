import { useOutletContext } from "react-router-dom";

function Details() {
  const [van, setvan] = useOutletContext();

  return (
    <>
      {van && (
        <div className="detail">
          <p>
            <b>Name:</b> {van.name}
          </p>
          <p>{van.description}</p>
        </div>
      )}
    </>
  );
}

export default Details;

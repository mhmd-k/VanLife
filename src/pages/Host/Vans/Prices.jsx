import { useOutletContext } from "react-router-dom";

function Prices() {
  const [van, setVan] = useOutletContext();

  return (
    <>
      {van && (
        <div className="detail">
          <b>Price:</b> ${van.price}/day
        </div>
      )}
    </>
  );
}
export default Prices;

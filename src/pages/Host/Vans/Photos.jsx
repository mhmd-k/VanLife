import { useOutletContext } from "react-router-dom";

function Photos() {
  const [van, setVan] = useOutletContext();

  return (
    <>
      {van && (
        <div className="van-images">
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="image">
            <img src={van.imageUrl} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
export default Photos;

import { useOutletContext } from "react-router-dom";

function Photos() {
  const [van, setVan] = useOutletContext();

  const imagesArr = [
    van.imageUrl,
    van.imageUrl,
    van.imageUrl,
    van.imageUrl,
    van.imageUrl,
  ];

  const vanImages = imagesArr.map((image, index) => {
    return (
      <div className="image" key={index}>
        <img src={image} alt={`image ${index}`} />
      </div>
    );
  });

  return <>{van && <div className="van-images">{vanImages}</div>}</>;
}
export default Photos;

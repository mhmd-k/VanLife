import { Link } from "react-router-dom";

function VanCard(props) {
  return (
    <div
      className="van-card"
      style={{ display: props.visibility ? "block" : "none" }}
    >
      <Link to={`/vans/${props.id}`}>
        <div className="image">
          <img src={props.image} alt="van image" />
        </div>
        <div className="info">
          <div>{props.name}</div>
          <div>${props.price}/day</div>
        </div>
        <div className={`type ${props.type.toLowerCase()}`}>
          <span>{props.type}</span>
        </div>
      </Link>
    </div>
  );
}
export default VanCard;

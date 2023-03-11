import { Link } from "react-router-dom";

function VanCard(props) {
  return (
    <div className="van-card">
      <Link>
        <div className="image">
          <img src={props.image} alt="van image" />
        </div>
        <div className="info">
          <div>{props.name}</div>
          <div>${props.price}/day</div>
        </div>
        <div className="type">
          <span>{props.type}</span>
        </div>
      </Link>
    </div>
  );
}
export default VanCard;

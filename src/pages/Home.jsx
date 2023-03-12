import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="landing">
        <div className="content">
          <h1>You got the travel plans, we got the travel vans.</h1>
          <p>
            Add adventure to your life by joining the #vanlife movement. Rent
            the perfect van to make your perfect road trip.
          </p>
          <button className="main">
            <Link to="/vans">Find your van</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

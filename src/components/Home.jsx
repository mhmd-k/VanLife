import Navbar from "./Navbar";
import Footer from "./Footer";
function Home() {
  return (
    <>
      <Navbar />
      <div className="landing">
        <div className="content">
          <h1>You got the travel plans, we got the travel vans.</h1>
          <p>
            Add adventure to your life by joining the #vanlife movement. Rent
            the perfect van to make your perfect road trip.
          </p>
          <button>Find your van</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

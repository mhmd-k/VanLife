import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Reviews from "./pages/Host/Reviews";
import Income from "./pages/Host/Income";
import VanDetail from "./pages/Vans/VanDetail";
import Host from "./pages/Host/Host";
import HostVans from "./pages/Host/HostVans";
import Details from "./pages/Host/Vans/Details";
import HostVanDetailLayout from "./pages/Host/Vans/HostVanDetailLayout";
import Prices from "./pages/Host/Vans/Prices";
import Photos from "./pages/Host/Vans/Photos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="host" element={<Host />}>
            <Route index element={<Dashboard />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="income" element={<Income />} />
            <Route path="vans/:id" element={<HostVanDetailLayout />}>
              <Route index element={<Details />} />
              <Route path="prices" element={<Prices />} />
              <Route path="photos" element={<Photos />} />
            </Route>
          </Route>
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

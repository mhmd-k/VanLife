import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import Layout from "./components/Layout";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Reviews from "./pages/Host/Reviews";
import Income from "./pages/Host/Income";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";
import Host from "./pages/Host/Host";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import Details from "./pages/Host/Vans/Details";
import HostVanDetailLayout from "./pages/Host/Vans/HostVanDetailLayout";
import Prices from "./pages/Host/Vans/Prices";
import Photos from "./pages/Host/Vans/Photos";
import Error from "./pages/Error";
import LogIn, { action as loginAction } from "./pages/SignIn";
import AuthRequired from "./components/AuthRequired";
import SignUp from "./pages/SignUp";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route element={<AuthRequired />}>
        <Route path="host" element={<Host />}>
          <Route
            index
            element={<Dashboard />}
            loader={dashboardLoader}
            errorElement={<Error />}
          />
          <Route path="reviews" element={<Reviews />} />
          <Route
            path="vans"
            element={<HostVans />}
            loader={hostVansLoader}
            errorElement={<Error />}
          />
          <Route path="income" element={<Income />} />
          <Route path="vans/:id" element={<HostVanDetailLayout />}>
            <Route index element={<Details />} />
            <Route path="prices" element={<Prices />} />
            <Route path="photos" element={<Photos />} />
          </Route>
        </Route>
      </Route>
      <Route path="about" element={<About />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />
      <Route path="login" element={<LogIn />} action={loginAction} />
      <Route path="signup" element={<SignUp />} />
    </Route>,
    <Route path="*" element={<Error />}></Route>,
  ])
);

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;

/*
    the old version of react router that does not support data api
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
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
*/

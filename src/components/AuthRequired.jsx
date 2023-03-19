import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../App";

function AuthRequired() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  if (!user?.token)
    return (
      <Navigate
        to="login"
        state={{ message: "You must log in first", from: location.pathname }}
      />
    );

  return <Outlet />;
}

export default AuthRequired;

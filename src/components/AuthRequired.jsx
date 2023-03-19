import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthRequired() {
  const auth = { token: null };
  const location = useLocation();

  if (!auth.token)
    return (
      <Navigate
        to="login"
        state={{ message: "You must log in first", from: location.pathname }}
      />
    );

  return <Outlet />;
}

export default AuthRequired;

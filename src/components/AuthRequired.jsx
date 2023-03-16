import { Navigate, Outlet } from "react-router-dom";

function AuthRequired() {
  const auth = { token: "123" };

  if (!auth.token)
    return <Navigate to="login" state={{ message: "You must log in first" }} />;

  return <Outlet />;
}

export default AuthRequired;

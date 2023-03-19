import { useContext, useEffect } from "react";
import {
  useLocation,
  Form,
  useActionData,
  useNavigation,
  NavLink,
  redirect,
  useNavigate,
} from "react-router-dom";
import { loginUser } from "../api/firebase";
import { BiLogIn } from "react-icons/bi";
import { UserContext } from "../App";
import { BiUserCircle } from "react-icons/bi";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await loginUser({ email, password });
    return data.user;
  } catch (error) {
    return { error };
  }
}

function LogIn() {
  const { user, setUser } = useContext(UserContext);

  const location = useLocation();
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  console.log(user);

  useEffect(() => {
    if (data) {
      setUser({
        email: data.email,
        token: data.accessToken,
      });
      navigate(from, { replace: true });
    }
  }, [data]);

  if (user?.token) {
    return (
      <>
        <ul className="user-info">
          <li>
            <BiUserCircle />
          </li>
          <li>Email: {user.email}</li>
          <li>
            <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </>
    );
  }

  return (
    <div className="sign-in">
      {location.state?.message && (
        <div className="msg">{location.state.message}</div>
      )}
      <Form action="/login" method="post">
        <div className="container">
          <h2>Sign in to your account</h2>
          {data?.error && (
            <p className="error">
              {data.error.code.slice(5).split("-").join(" ")}
            </p>
          )}
          <input type="email" name="email" placeholder="Email address" />
          <input type="password" name="password" placeholder="Password" />
          <button
            className="submit"
            style={{
              pointerEvents:
                navigation.state === "submitting" ? "none" : "visible",
              opacity: navigation.state === "submitting" ? 0.7 : 1,
            }}
          >
            {navigation.state === "submitting" ? (
              "..."
            ) : (
              <>
                Log in <BiLogIn />
              </>
            )}
          </button>
          <p>
            Don't have an account?{" "}
            <NavLink to="../signup" state={location.state}>
              Create one now
            </NavLink>
          </p>
        </div>
      </Form>
    </div>
  );
}
export default LogIn;

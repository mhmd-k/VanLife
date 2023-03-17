import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const pass = formData.get("password");
  try {
    const data = await loginUser({
      email: email,
      password: pass,
    });
    return data;
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

function LogIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useActionData();
  const navigation = useNavigation();
  const from = location.state?.from || "/host";

  useEffect(() => {
    if (data?.token) {
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <div className="sign-in">
      {location.state?.message && (
        <div className="msg">{location.state.message}</div>
      )}
      <Form action="/login" method="post">
        <div className="container">
          <h2>Sign in to your account</h2>
          {data?.error && <>{data.error}</>}
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
            {navigation.state === "submitting" ? "..." : "Log in"}
          </button>
          <p>
            Don't have an account? <Link>Create one now</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
export default LogIn;

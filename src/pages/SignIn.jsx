import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const location = useLocation();
  const navigate = useNavigate();

  const messageRef = useRef();
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    loginUser(formData)
      .then((data) => {
        console.log(data);
        navigate("/host");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  return (
    <div className="sign-in">
      {location.state?.message && (
        <div ref={messageRef} className="msg">
          {location.state.message}{" "}
          <button
            onClick={() => {
              messageRef.current.remove();
            }}
          >
            close
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h2>Sign in to your account</h2>
          {error && <>{error.message}</>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button
            className="submit"
            style={{
              pointerEvents: status === "submitting" ? "none" : "visible",
              opacity: status === "submitting" ? 0.7 : 1,
            }}
          >
            {status === "submitting" ? "..." : "Log in"}
          </button>
          <p>
            Don't have an account? <Link>Create one now</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LogIn;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAccount } from "../api/firebase";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/vans";
  console.log(from);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    createAccount(formData.email, formData.password)
      .then((userCredential) => {
        const user = {
          ...formData,
          token: userCredential.user.accessToken,
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError({ ...err });
        console.log(error);
      })
      .finally(() => {
        setState("idle");
      });
  }

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h2>Create an account</h2>
          {error && <p className="error">{error.code?.slice(5)}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.pass}
            onChange={handleChange}
            minLength={6}
            maxLength={12}
          />
          <button className="submit">
            {state === "submitting" ? "..." : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

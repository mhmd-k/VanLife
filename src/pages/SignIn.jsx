import { useState } from "react";
import { Link } from "react-router-dom";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }

  return (
    <div className="sign-in">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="container">
          <h2>Sign in to your account</h2>
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
          <button className="submit">Log in</button>
          <p>
            Don't have an account? <Link>Create one now</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LogIn;

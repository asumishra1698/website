import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../reuseable/SEO";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import "../../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <SEO
        title="Login Page | My Website"
        description="Learn more about our company."
      />

      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-links">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

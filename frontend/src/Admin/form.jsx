import "./form.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4900/";

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    const signinData = { email, password };

    try {
      const response = await axios.post("admin/signin", signinData);
      setSuccess("Signin successful!");
      localStorage.setItem("admintoken", response.data.token);
      // Clear form fields
      setEmail("");
      setPassword("");
      navigate("/admin");
    } catch (err) {
      console.error("Error:", err);
      alert("user not found");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="adminlogin_container">
      <h1>Admin Login</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;

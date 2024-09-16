import React, { useState } from "react";
import axios from "axios";
import "./regis.css";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import axiosInstance from "./axiosConfig";

const Registration = () => {
  const [select, setSelect] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (select === "signup") {
      if (!name || name.length < 3) {
        setError("Name must be at least 3 characters long");
        return;
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setError("Invalid email address");
        return;
      }
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const signupData = { name, email, password };

      try {
        const response = await axiosInstance.post("/user/signup", signupData);
        setSuccess("Signup successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Delay to ensure navigation happens first
        setTimeout(() => {
          toast('Registered successfully!');
        }, 1000);

        navigate("/");
      } catch (err) {
        console.error("Error:", err);
        alert("Email id already exists");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
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
        const response = await axiosInstance.post("/user/signin", signinData);
        setSuccess("Signin successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        // Clear form fields
        setEmail("");
        setPassword("");
        navigate("/");
      } 
      catch (err) {
        console.error("Error:", err);
        alert("User not found");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="container">
      <h1>Registration Form</h1>
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${select === "signin" ? "active" : ""}`}
          onClick={() => setSelect("signin")}
        >
          Signin
        </button>
        <button
          className={`toggle-btn ${select === "signup" ? "active" : ""}`}
          onClick={() => setSelect("signup")}
        >
          Signup
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {select === "signup" && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
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

          {select === "signin" && (
            <Link to="/email" className="frgt">Forgot Your Password?</Link>
          )}

          {select === "signup" && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="submit_regis">
            {select === "signin" ? "Signin" : "Signup"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Registration;

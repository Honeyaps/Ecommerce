import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgot.css";

axios.defaults.baseURL = "http://localhost:4900";

const Reset = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const email = localStorage.getItem("Email");
        const response = await axios.put("/user/update", {
          email: email,
          password: formData.password,
        });

        localStorage.clear()
        alert("password changed");
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("user not found");
      }
    }
  };

  return (
    <div className="reset-form-container">
      <h2>Create new password</h2>
      <br />
      <p>We'll ask for this password whenever you sign in.</p>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password here"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password here"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" className="form_btn">
          Save changes and sign in
        </button>
      </form>
    </div>
  );
};

export default Reset;

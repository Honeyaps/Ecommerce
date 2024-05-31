import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./forgot.css";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const location = useLocation();
  const OTP = location.state?.otp;

  const [errors, setErrors] = useState({});

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    const enteredOtp = otp.join("");
    const strng = OTP.otp.toString();

    if (!enteredOtp) {
      errors.password = "OTP is required";
    } else if (!/^\d{4}$/i.test(enteredOtp)) {
      errors.password = "OTP must be a 4-digit number";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        if (strng == enteredOtp) {
          navigate("/reset");
        } else {
          alert("OTP is incorrect");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("User not found");
      }
    }
  };

  return (
    <div className="otp-form-container">
      <h2>Verification required</h2>
      <br />
      <p>
        To continue, complete this verification step. We've sent an OTP to the
        email.
      </p>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Enter OTP</label>
        <div >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength="1"
              className="otp_input"
            />
          ))}
          <br />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <br/>
        <button type="submit" className="form_btn">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Otp;

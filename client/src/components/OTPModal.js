// src/components/OtpModel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';
import hero from '../assets/hero.jpg';

const OtpModel = () => {
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const phone = location.state?.phone;

  useEffect(() => {
    if (!phone) {
      alert("Phone number not found. Redirecting to login.");
      navigate("/login");
    }
  }, [phone, navigate]);

  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleOtpVerify = async () => {
    if (!/^\d{6}$/.test(otp.trim())) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp }),
      });

      const data = await response.json();

      if (data.success) {
        alert('OTP Verified Successfully!');

        // Sample user & isNewUser (adjust as per your backend response)
        const userData = data.user || { phone }; // fallback
        const isNew = data.isNewUser ?? true; // default true if not present

        login(userData, isNew); // context me set karo

        navigate(isNew ? "/details" : "/dashboard"); // redirect
      } else {
        alert(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (data.success) {
        alert('OTP resent successfully.');
        setResendCooldown(30);
      } else {
        alert(data.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      alert('Something went wrong while resending OTP.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={hero} alt="Student Sharpner Logo" className="logo" />
        <h1>Welcome to <span className="highlight">Student Sharpner</span>!</h1>
        <p className="subtext">Your trusted platform for online learning</p>
      </div>

      <div className="login-right">
        <div className="form-box">
          <h2 className="form-heading">OTP Verification</h2>
          <p className="form-subtext">Enter the OTP sent to your mobile number</p>

          <input
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength="6"
            className="otp-input"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="otp-button" onClick={handleOtpVerify}>
            Verify OTP
          </button>

          <p className="resend-text">
            Didn’t receive OTP?{' '}
            {resendCooldown > 0 ? (
              <span className="cooldown-text">Resend in {resendCooldown}s</span>
            ) : (
              <span className="resend-link" onClick={handleResendOtp}>Resend</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpModel;

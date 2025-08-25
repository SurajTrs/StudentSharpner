import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const DetailsPage = () => {
  const navigate = useNavigate();
  const { user, isNewUser, setIsNewUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    school: '',
    studentClass: '',
  });
  const [notice, setNotice] = useState({ type: null, text: '' });

  // Load existing data if any (in case user refreshes or partial data saved)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        school: user.school || '',
        studentClass: user.studentClass || '',
      });
    }
  }, [user]);

  // Redirect if user is not new (should not access details page),
  // but skip redirect while showing a success/error notice
  useEffect(() => {
    if (!isNewUser && !notice.type) {
      navigate('/dashboard');
    }
  }, [isNewUser, navigate, notice.type]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        ...(user && user.phone ? { phone: user.phone } : {}),
      };

      const response = await fetch('http://localhost:5001/api/user-details/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // Add token if needed
        },
        body: JSON.stringify(payload),
      });

      // Safely parse response as JSON if possible, otherwise as text
      const contentType = response.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (response.ok) {
        // Mark user as not new and proceed
        setIsNewUser(false);
        setNotice({ type: 'success', text: 'Profile submitted successfully!' });
        // Give the user time to read the message before navigating
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        if (response.status === 503) {
          setNotice({ type: 'error', text: 'Service temporarily unavailable: database not connected. Please try again shortly.' });
        } else {
          setNotice({ type: 'error', text: 'Failed to submit profile: ' + (data.message || 'Unknown error') });
        }
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setNotice({ type: 'error', text: `Network or server error: ${err?.message || 'Unknown error'}. Please check your internet connection and try again.` });
    }
  };

  return (
    <div className="details-container">
      <h1 className="details-title">Complete Your Profile</h1>
      {notice.type && (
        <div
          role="status"
          aria-live="polite"
          className={`notice ${notice.type}`}
          style={{
            margin: '12px auto',
            maxWidth: 520,
            padding: '10px 14px',
            borderRadius: 8,
            color: notice.type === 'error' ? '#721c24' : '#0c5460',
            background: notice.type === 'error' ? '#f8d7da' : '#d1ecf1',
            border: '1px solid',
            borderColor: notice.type === 'error' ? '#f5c6cb' : '#bee5eb',
            textAlign: 'center',
          }}
        >
          {notice.text}
        </div>
      )}
      <form className="details-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="school"
          placeholder="School Name"
          value={formData.school}
          onChange={handleChange}
          required
          className="form-input"
        />
        <select
          name="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select Class</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
          <option value="Dropper PCM">Dropper PCM</option>
          <option value="Dropper PCB">Dropper PCB</option>
        </select>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default DetailsPage;

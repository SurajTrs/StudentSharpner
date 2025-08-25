import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import hero from '../assets/hero.jpg';
import { useAuth } from '../context/AuthContext';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const { googleSignIn, emailSignIn, emailSignUp, isNewUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      await googleSignIn();
      navigate(isNewUser ? '/details' : '/dashboard');
    } catch (e) {
      const msg = e?.code === 'auth/popup-closed-by-user'
        ? 'Google sign-in popup was closed.'
        : e?.message || 'Google sign-in failed';
      setErrMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setErrMsg('');
      const normalizedEmail = email.trim().toLowerCase();
      // Determine available sign-in methods first
      const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);

      if (!methods || methods.length === 0) {
        // No account exists -> create one
        try {
          await emailSignUp(normalizedEmail, password, displayName);
          navigate('/details');
          return;
        } catch (signUpErr) {
          // If Firebase says already in use, re-check methods and guide
          if (signUpErr?.code === 'auth/email-already-in-use') {
            const recheck = await fetchSignInMethodsForEmail(auth, normalizedEmail);
            if (recheck.includes('password')) {
              setErrMsg('This email already exists. Please enter the correct password to log in or use Forgot password.');
              return;
            }
            if (recheck.includes('google.com')) {
              setErrMsg('This email is registered with Google. Use "Continue with Google" to sign in.');
              return;
            }
          }
          setErrMsg(signUpErr?.message || 'Sign up failed');
          return;
        }
      }

      if (methods.includes('password')) {
        // Existing password user -> try sign-in
        await emailSignIn(normalizedEmail, password);
        navigate('/dashboard');
        return;
      }

      if (methods.includes('google.com') && !methods.includes('password')) {
        setErrMsg('This email is registered with Google. Use "Continue with Google" to sign in.');
        return;
      }

      setErrMsg(`Use the available provider to sign in: ${methods.join(', ')}`);
    } catch (err) {
      const code = err?.code;
      const msg = code === 'auth/invalid-credential'
        ? 'Wrong email or password.'
        : code === 'auth/too-many-requests'
          ? 'Too many attempts. Try again later.'
          : err?.message || 'Authentication failed';
      setErrMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrMsg('Enter your email to reset password.');
      return;
    }
    try {
      setSubmitting(true);
      setErrMsg('');
      const normalizedEmail = email.trim().toLowerCase();
      const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
      if (!methods || methods.length === 0) {
        setErrMsg('No account found with this email.');
      } else if (methods.includes('password')) {
        await sendPasswordResetEmail(auth, normalizedEmail);
        setErrMsg('Password reset email sent. Check your inbox (and spam).');
      } else if (methods.includes('google.com')) {
        setErrMsg('This email is registered with Google. Use "Continue with Google" to sign in.');
      } else {
        setErrMsg(`Use the available provider to sign in: ${methods.join(', ')}`);
      }
    } catch (e) {
      const msg = e?.code === 'auth/user-not-found'
        ? 'No account found with this email.'
        : e?.message || 'Failed to send reset email';
      setErrMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={hero} alt="Student Sharpner Logo" className="logo" />
        <h1>Welcome to <span className="highlight">Student Sharpner</span>!</h1>
        <p className="subtext">Your trusted platform for online learning</p>
        <div className="features-grid">
          <div className="feature-box"><strong>100+</strong><br />Offline Centres</div>
          <div className="feature-box"><strong>Daily Live</strong><br />Interactive Classes</div>
          <div className="feature-box"><strong>15 Million+</strong><br />Happy Students</div>
          <div className="feature-box"><strong>24x7</strong><br />Doubt Solving</div>
        </div>
      </div>

      <div className="login-right">
        <div className="form-box">
          <h2 className="form-heading">Login or Register</h2>
          <p className="form-subtext">Use Google or email to continue</p>
          {errMsg && (
            <div style={{ color: '#b00020', marginBottom: 8, fontSize: 14 }}>{errMsg}</div>
          )}

          <button disabled={submitting} className="otp-button" onClick={handleGoogle}>
            Continue with Google
          </button>

          <div style={{ margin: '12px 0', textAlign: 'center', opacity: 0.6 }}>or</div>

          <form onSubmit={handleEmail}>
            <input
              type="text"
              className="mobile-input"
              placeholder="Full name (only for first time)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              type="email"
              className="mobile-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="mobile-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button disabled={submitting} className="otp-button" type="submit">
              Continue
            </button>
          </form>

          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <button type="button" className="resend-link" onClick={handleResetPassword} disabled={submitting}>
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

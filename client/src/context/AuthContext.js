import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hydrate local flags on load
  useEffect(() => {
    const savedNewUser = localStorage.getItem('isNewUser');
    if (savedNewUser) setIsNewUser(savedNewUser === 'true');
  }, []);

  // Subscribe to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const minimalUser = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
        };
        setUser(minimalUser);
        localStorage.setItem('user', JSON.stringify(minimalUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Google sign-in
  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    // For Google popup, consider user as existing unless explicitly collecting details
    setIsNewUser(false);
    localStorage.setItem('isNewUser', 'false');
    return result.user;
  };

  // Email/password sign-in
  const emailSignIn = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setIsNewUser(false);
    localStorage.setItem('isNewUser', 'false');
    return cred.user;
  };

  // Email/password sign-up
  const emailSignUp = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      try { await updateProfile(cred.user, { displayName }); } catch {}
    }
    setIsNewUser(true);
    localStorage.setItem('isNewUser', 'true');
    return cred.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setIsNewUser(false);
    localStorage.removeItem('isNewUser');
  };

  // Record a purchased course (best-effort)
  const addPurchasedCourse = async (course) => {
    try {
      if (!user || !course) return;
      const email = user.email?.toLowerCase();
      if (!email) return;

      let courseId = course._id || course.id || course?.courseId;

      // If the course doesn't exist in backend, create it to obtain an ID
      if (!courseId) {
        try {
          const resp = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: course.title,
              description: course.description || '',
              category: course.category || '',
              path: course.path || '',
              classLevel: course.classLevel || '',
              isLive: Boolean(course.isLive),
            }),
          });
          if (resp.ok) {
            const created = await resp.json();
            courseId = created?._id || courseId;
          }
        } catch (e) {
          console.warn('Creating course failed (non-blocking):', e?.message || e);
        }
      }

      if (!courseId) return; // still no id, skip server write but keep UI flow

      // Record purchase idempotently
      try {
        await fetch('/api/courses/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: email, courseId }),
        });
      } catch (e) {
        console.warn('Purchase recording failed (non-blocking):', e?.message || e);
      }
    } catch (err) {
      console.warn('addPurchasedCourse error:', err?.message || err);
    }
  };

  const value = {
    user,
    isNewUser,
    setIsNewUser,
    loading,
    googleSignIn,
    emailSignIn,
    emailSignUp,
    logout,
    addPurchasedCourse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

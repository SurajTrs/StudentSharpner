// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");

  let initialUser = null;
  try {
    initialUser = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Invalid JSON in localStorage for 'user':", error);
    localStorage.removeItem("user");
  }

  const [user, setUser] = useState(initialUser);
  const [isNewUser, setIsNewUser] = useState(() => {
    const savedFlag = localStorage.getItem("isNewUser");
    return savedFlag === "true";
  });

  const login = (userData, isNew = false) => {
    setUser(userData);
    setIsNewUser(isNew);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isNewUser", isNew.toString());
  };

  const logout = () => {
    setUser(null);
    setIsNewUser(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isNewUser");
  };

  const addPurchasedCourse = (course) => {
    if (!user) return;
    const updatedCourses = user.courses ? [...user.courses, course] : [course];
    const updatedUser = { ...user, courses: updatedCourses };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addPurchasedCourse, isNewUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

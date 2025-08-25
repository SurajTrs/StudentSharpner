// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import heroImg from '../assets/hero.jpg';
import '../App.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="header glass">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={heroImg} alt="Logo" className="nav-logo hover-lift" />
          </Link>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/live">Live</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {!user ? (
            <li><Link to="/login">Login/Register</Link></li>
          ) : (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/my-courses">My Courses</Link></li>
              <li><button onClick={handleLogout} className="btn-secondary">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

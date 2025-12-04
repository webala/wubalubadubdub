import React, { useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { Home, Tv, Users, MapPin, Menu, X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <Home size={18} color="#00d563" /> },
    { path: "/episodes", label: "Episodes", icon: <Tv size={18} color="#00d563" /> },
    { path: "/characters", label: "Characters", icon: <Users size={18} color="#00d563" /> },
    { path: "/locations", label: "Locations", icon: <MapPin size={18} color="#00d563" /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo or Brand (Optional, currently commented out in original) */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-items desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={`link ${
                location.pathname === link.path ? "active" : ""
              }`}
              to={link.path}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMobileMenuOpen ? (
            <X className="icon" size={28} />
          ) : (
            <Menu className="icon" size={28} />
          )}
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
        />

        {/* Mobile Navigation */}
        <div className={`nav-items mobile ${isMobileMenuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={`link ${
                location.pathname === link.path ? "active" : ""
              }`}
              to={link.path}
              onClick={closeMenu}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

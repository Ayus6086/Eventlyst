import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="navbar__brand">EventVerse</Link>
      </div>
      <div className="navbar__actions">
        <Link to="/login">
          <button className="navbar__login">Login</button>
        </Link>
        <Link to="/Signup">
          <button className="navbar__singup">Signup</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
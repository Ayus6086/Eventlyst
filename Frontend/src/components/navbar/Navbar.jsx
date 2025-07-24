import React from "react";
import "./Navbar.css";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">EventVerse</div>
      <div className="navbar__actions">
        <Link to={"/login"} className="navbar__login">
          Login
        </Link>
        <Link to={"/signup"} className="navbar__singup">
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
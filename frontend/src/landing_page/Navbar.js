import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  // CLOSE MOBILE MENU
  const closeMenu = () => {
    const navbar = document.getElementById("navbarSupportedContent");

    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container-fluid px-3">

        {/* LEFT LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.png"
            alt="Tradeonix"
            className="main-logo"
          />
        </Link>

        {/* RIGHT TOGGLE */}
        <button
          className="navbar-toggler ms-auto border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
      <span
  className="navbar-toggler-icon"
  style={{
    position: "absolute",
    right: "30px",
    top: "24px",
    border: "none",
    boxShadow: "none",
    width: "20px",
    height: "20px",
    backgroundSize: "20px",
  }}
></span>
        </button>

        {/* MENU */}
        <div
          className="collapse navbar-collapse mobile-menu"
          id="navbarSupportedContent"
        >

          {/* CLOSE BUTTON */}
          <div className="mobile-close-wrapper d-lg-none">
            <button
              className="mobile-close-btn"
              onClick={closeMenu}
            >
              ✕
            </button>
          </div>

          {/* MENU ITEMS */}
          <ul className="navbar-nav ms-auto mobile-nav-grid">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                onClick={closeMenu}
              >
                Signup
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/product"
                onClick={closeMenu}
              >
                Product
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/pricing"
                onClick={closeMenu}
              >
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/support"
                onClick={closeMenu}
              >
                Support
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
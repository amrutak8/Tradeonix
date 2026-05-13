import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Menu.css";

import { Link } from "react-router-dom";
import { BarChartOutlined } from "@mui/icons-material";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

const Menu = ({ setActiveDrawer, activeDrawer }) => {
  const { user } = useContext(AuthContext);
  const [selectedMenu, setSelectedMenu] = useState(0);
  //const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [setMobileMenuOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  // const handleProfileClick = (index) => {
  //   setIsProfileDropdownOpen(!isProfileDropdownOpen);
  // };

  const handleLogout = async () => {
  await axios.post(
    "https://tradeonix.onrender.com/api/logout",
    {},
    { withCredentials: true }
  );

  window.location.href = "http://localhost:3000/login";
};

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo"style={{ width: "50px" }} />
    <div className="mobile-buttons">

<button
  className="mobile-watchlist-btn"
  onClick={() =>
  setActiveDrawer(prev =>
    prev === "watchlist" ? null : "watchlist"
  )

  }
>
  <BarChartOutlined />
</button>

 
<button
className="mobile-menu-btn "
 onClick={() =>
  setActiveDrawer(prev =>
    prev === "menu" ? null : "menu"
  )
}
>
   < AppsRoundedIcon />
</button>

</div>

      <div className={`menus ${activeDrawer === "menu" ? "mobile-active" : ""}`}>
       <ul>

  <li>
    <Link
      style={{ textDecoration: "none" }}
      to="/"
      onClick={() => {
        handleMenuClick(0);
        setMobileMenuOpen(false);
         setActiveDrawer(null);
      }}
    >
      <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
        Dashboard
      </p>
    </Link>
  </li>

  <li>
    <Link
      style={{ textDecoration: "none" }}
      to="/orders"
      onClick={() => {
        handleMenuClick(1);
        setMobileMenuOpen(false);
         setActiveDrawer(null);
      }}
    >
      <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
        Orders
      </p>
    </Link>
  </li>

  <li>
    <Link
      style={{ textDecoration: "none" }}
      to="/holdings"
      onClick={() => {
        handleMenuClick(2);
        setMobileMenuOpen(false);
         setActiveDrawer(null);
      }}
    >
      <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
        Holdings
      </p>
    </Link>
  </li>

  <li>
    <Link
      style={{ textDecoration: "none" }}
      to="/positions"
      onClick={() => {
        handleMenuClick(3);
        setMobileMenuOpen(false);
         setActiveDrawer(null);
      }}
    >
      <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
        Positions
      </p>
    </Link>
  </li>

  <li>
    <Link
      style={{ textDecoration: "none" }}
      to="/funds"
      onClick={() => {
        handleMenuClick(4);
        setMobileMenuOpen(false);
         setActiveDrawer(null);
      }}
    >
      <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
        Funds
      </p>
    </Link>
  </li>

</ul>
        <hr />
       <div className="profile">
  {/* ACCOUNT CLICK */}
  <div className="account" onClick={() => setOpen(!open)}>
    <div className="avatar">
      {user?.username?.charAt(0).toUpperCase()}
    </div>
    <p className="username">{user?.username}</p>
  </div>

  {/* DROPDOWN */}
  {open && (
    <div className="dropdown">
      <p onClick={() => {
        setShowProfile(true);
        setOpen(false);
      }}>
        My Profile
      </p>

      <p onClick={handleLogout}>
        Logout
      </p>
    </div>
  )}

  {/* PROFILE BOX */}
  {showProfile && (
    <div className="profileBox">
      <h3>My Profile</h3>

      <p>Username : { user?.username}</p>
      <p>Email : { user?.email}</p>

      <button onClick={() => setShowProfile(false)}>
        Close
      </button>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Menu;
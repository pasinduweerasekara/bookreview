import React, {useEffect, useState, useRef, useCallback } from "react";
import "./navbar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import { useUserContext } from "../../context/userContext";
import LoginSignup from "../loginsignup/LoginSignup";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [navbarHide, setNavbarHide] = useState(false);
  const lastScrollPos = useRef(0); // Use useRef to track scroll position without causing re-renders
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    if (lastScrollPos.current < currentScrollPos && !navbarHide) {
      setNavbarHide(true);
    } else if (lastScrollPos.current > currentScrollPos && navbarHide) {
      setNavbarHide(false);
    }

    lastScrollPos.current = currentScrollPos;
  }, [navbarHide]);

  const [showLogin, setShowLogin] = useState(false);

  const { currentUser, setCurrentUser } = useUserContext();

const handleLightboxClick = ()=>{
  setShowLogin(false)
}

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);


  useEffect(() => {
    document.body.classList.toggle("noscroll", open);
  }, [open]);
  
  return (
    <>
      <nav id="navbar" className={navbarHide ? "navbar-hide" : ""}>
        <div id="logo-container" onClick={() => navigate("/")}>
          <h1 id="nav-logo">Book Review App</h1>
        </div>
        <ul id="nav-links-container" className={open ? "open" : ""}>
          <li
            className="link-item"
            id="sub-menu-link"
          >
            <NavLink
              className="nav-link-text"
              to="/books"
              onClick={() => setOpen(false)}
            >
              Books
            </NavLink>
          </li>
          <li className="link-item" onClick={() => setOpen(false)}>
            {currentUser?currentUser.email:<span id="login-signup-btn" onClick={()=>setShowLogin(true)}>Login/Signup</span>}
          </li>
        </ul>
        <div id="menu-icons">
          <div
            id="hamburger-btn"
            onClick={() => {
              setOpen(!open);
            }}
            className={open ? "btn-open" : ""}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {showLogin && <LoginSignup setShowLogin={setShowLogin} setUser={setCurrentUser} />}
        {showLogin?<div id="lightbox" onClick={handleLightboxClick}></div>:""}
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Navbar;
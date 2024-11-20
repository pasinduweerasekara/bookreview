import React, {useEffect, useState, useRef, useCallback } from "react";
import "./navbar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";

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
          <h1 id="nav-logo">THAPRO</h1>
        </div>
        <ul id="nav-links-container" className={open ? "open" : ""}>
          <li className="link-item" onClick={() => setOpen(false)}>
            <NavLink className="nav-link-text" to="/">
              Home
            </NavLink>
          </li>
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
            <NavLink className="nav-link-text" to="/">
              Custom Order
            </NavLink>
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
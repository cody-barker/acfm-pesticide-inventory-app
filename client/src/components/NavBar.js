import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="nav-container">
      <nav id="navbar">
        <NavLink to="/">
          <img
            className="logo-img"
            src="/assets/acfm_logo_transparent.svg"
            alt="logo"
          />
        </NavLink>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger-icon">&#9776;</span>{" "}
          {/* Simple hamburger icon */}
        </button>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <NavLink className="nav-button" to="/" onClick={closeMenu}>
            Inventory
          </NavLink>
          <NavLink
            className="nav-button"
            to="/concentrates"
            onClick={closeMenu}
          >
            Concentrates
          </NavLink>
          <NavLink className="nav-button" to="/products" onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink className="nav-button" to="/help" onClick={closeMenu}>
            Help
          </NavLink>
          <NavLink
            className="nav-button"
            to="/"
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
          >
            Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

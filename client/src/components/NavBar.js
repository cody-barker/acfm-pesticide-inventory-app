import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
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

  return (
    <div className="nav-container">
      <nav id="navbar">
        <NavLink to="/">
          <img
            className="logo-img"
            src="/assets/acfm_logo_transparent.svg"
            alt="logo"
          ></img>
        </NavLink>
        <NavLink className="nav-btn" to="/">
          Inventory
        </NavLink>
        <NavLink className="nav-btn" to="/concentrates">
          Concentrates
        </NavLink>
        <NavLink className="nav-btn" to="/products">
          Products
        </NavLink>
        <NavLink className="nav-btn" to="/help">
          Help
        </NavLink>
        <NavLink onClick={handleLogout} className="nav-btn" to="/">
          Logout
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;

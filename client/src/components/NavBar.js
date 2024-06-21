import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  // const { id } = user;

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
    <nav id="navbar">
      <NavLink to="/">
        <img className="logo-img" src="/assets/acfm-logo.svg" alt="logo"></img>
      </NavLink>
      <NavLink to="/">
        <h2 className="logo">ACFM Pesticide Inventory</h2>
      </NavLink>
      <NavLink className="nav-btn" to={`/`}>
        Inventory
      </NavLink>
      <NavLink className="nav-btn" to="/products">
        Products
      </NavLink>
      <NavLink onClick={handleLogout} className="nav-btn" to="/">
        Logout
      </NavLink>
    </nav>
  );
}

export default NavBar;

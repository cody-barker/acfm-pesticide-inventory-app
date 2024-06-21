import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { id } = user;

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
    <nav id="navbar" className="container">
      <NavLink to="/">
        <img
          className="logo-img"
          src="https://i.imgur.com/h8odfzA.png"
          alt="logo"
        ></img>
      </NavLink>
      <NavLink to="/">
        <h2 className="logo">TrailScan</h2>
      </NavLink>
      <NavLink className="nav-btn" to="/trails">
        New Trail
      </NavLink>
      <NavLink className="nav-btn" to={`/user/${id}/reviews`}>
        Profile
      </NavLink>
      <NavLink onClick={handleLogout} className="nav-btn" to="/">
        Logout
      </NavLink>
    </nav>
  );
}

export default NavBar;

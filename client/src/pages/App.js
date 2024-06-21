import "../styles/App.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Products from "./Products";
import Inventory from "./Inventory";

function App() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

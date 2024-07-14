import "../styles/App.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Products from "./Products";
import Inventory from "./Inventory";
import Product from "./Product";
import EditProduct from "./EditProduct";
import Container from "./Container";

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
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/container/:id" element={<Container />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

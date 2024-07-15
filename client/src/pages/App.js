import "../styles/App.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Products from "./Products";
import Inventory from "./Inventory";
import Product from "./Product";
import EditProduct from "./EditProduct";
import Container from "./Container";
import EditContainer from "./EditContainer";

function App() {
  const { user } = useContext(UserContext);
  const { loading } = useContext(ProductsContext);

  if (!user) {
    return <Login />;
  }

  if (loading) {
    return <div>Loading...</div>;
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
          <Route path="/containers/:id" element={<Container />} />
          <Route path="/containers/:id/edit" element={<EditContainer />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id);
  const { products, setProducts } = useContext(ProductsContext);
  const product = products.find((product) => product.id === parseInt(id));

  const [name, setName] = useState(product.name);
  const [epaReg, setEpaReg] = useState(product.epa_reg);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEpaRegChange = (e) => {
    setEpaReg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, name, epa_reg: epaReg };
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    navigate("/products");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          EPA Reg
          <input type="text" value={epaReg} onChange={handleEpaRegChange} />
        </label>
        <button type="submit" className="login-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProduct;

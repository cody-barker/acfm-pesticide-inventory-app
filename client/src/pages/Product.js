import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

function Product() {
  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <p>EPA Reg: {product.epa_reg}</p>
        <div className="product-options">
          <span>Edit</span> <span>Remove</span>
        </div>
      </div>
    </div>
  );
}

export default Product;

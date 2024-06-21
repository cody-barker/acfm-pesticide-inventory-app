import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

function Products() {
  let { products } = useContext(ProductContext);

  return <p>Products</p>;
}

export default Products;

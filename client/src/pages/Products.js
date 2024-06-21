import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";

function Products() {
  const { products } = useContext(ProductsContext);
  if (!products) {
    return <div></div>;
  }
  let productComps = products.map((product) => {
    return (
      <tr key={product.id}>
        <td>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </td>
        <td>{product.epa_reg}</td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header-row">
            <th>Name</th>
            <th>EPA Reg</th>
          </tr>
        </thead>
        <tbody>{productComps}</tbody>
      </table>
    </div>
  );
}

export default Products;

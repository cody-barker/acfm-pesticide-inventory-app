import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";

function Products() {
  const { products } = useContext(ProductsContext);
  const [vis, setVis] = useState(false);
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

  function handleVis() {
    setVis(!vis);
  }

  return (
    <div className="table-container">
      <div className="center margin-4em">
        <button onClick={handleVis} className="login-btn">
          Add a Product
        </button>
      </div>
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

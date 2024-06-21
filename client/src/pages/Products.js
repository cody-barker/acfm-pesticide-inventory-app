import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

function Products() {
  const { products } = useContext(ProductsContext);
  if (!products) {
    return <p>"Loading..."</p>;
  }
  let productComps = products.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.epa_reg}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>EPA Registration #</th>
        </tr>
      </thead>
      <tbody>{productComps}</tbody>
    </table>
  );
}

export default Products;

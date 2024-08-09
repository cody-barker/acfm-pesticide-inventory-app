import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Concentrates() {
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  // Create a function to get the product name by its ID
  const getProductNameById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Unknown Product";
  };

  // Create an object to hold the count of containers per product with 100% concentration
  const productCounts = {};

  user.containers.forEach((container) => {
    container.contents.forEach((content) => {
      if (content.concentration === 100) {
        if (productCounts[content.product_id]) {
          productCounts[content.product_id] += 1;
        } else {
          productCounts[content.product_id] = 1;
        }
      }
    });
  });

  // Map over the productCounts to create table rows
  const concentrateComps = Object.entries(productCounts).map(
    ([productId, count]) => (
      <tr key={productId}>
        <td>{getProductNameById(Number(productId))}</td>
        <td>{count}</td>
      </tr>
    )
  );

  return (
    <div className="table-container">
      <table className="inventory-table margin-top-2em">
        <thead>
          <tr className="table-header-row">
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{concentrateComps}</tbody>
      </table>
    </div>
  );
}

export default Concentrates;

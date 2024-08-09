import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Concentrates() {
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  // Create an object to hold the count of containers per product with 100% concentration
  const productCounts = {};

  // Initialize the productCounts with all product IDs and set the count to 0
  products.forEach((product) => {
    productCounts[product.id] = 0;
  });

  // Count the containers with 100% concentration for each product
  user.containers.forEach((container) => {
    container.contents.forEach((content) => {
      if (content.concentration === 100) {
        productCounts[content.product_id] += 1;
      }
    });
  });

  // Sort products by name in ascending alphabetical order
  const sortedProducts = [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Map over all products to create table rows
  const concentrateComps = sortedProducts.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{productCounts[product.id]}</td>
    </tr>
  ));

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

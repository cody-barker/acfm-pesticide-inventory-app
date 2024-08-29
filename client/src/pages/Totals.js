import React, { useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Totals() {
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  // Generate unique prescriptions and their quantities
  const uniquePrescriptions = useMemo(() => {
    const prescriptionMap = new Map();

    user.containers.forEach((container) => {
      const filteredContents = container.contents.filter(
        (content) => content.concentration < 100 // Exclude 100% concentration
      );

      if (filteredContents.length > 0) {
        const prescription = filteredContents
          .map((content) => {
            const product = products.find((p) => p.id === content.product_id);
            const productName = product ? product.name : "Unknown Product";
            return { concentration: content.concentration, productName };
          })
          .sort((a, b) => b.concentration - a.concentration) // Sort by concentration descending
          .map(
            ({ concentration, productName }) =>
              `${concentration}% ${productName}`
          )
          .join(", ");

        if (prescriptionMap.has(prescription)) {
          prescriptionMap.set(
            prescription,
            prescriptionMap.get(prescription) + 1
          );
        } else {
          prescriptionMap.set(prescription, 1);
        }
      }
    });

    return Array.from(prescriptionMap.entries()).map(
      ([prescription, quantity]) => ({
        prescription,
        quantity,
      })
    );
  }, [user.containers, products]);

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

  // Map over all products to create table rows for concentrates
  const concentrateComps = sortedProducts.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{productCounts[product.id]}</td>
    </tr>
  ));

  return (
    <div className="inventory-container">
      <div className="inventory-table-container inventory-table-container--premix">
        <h2 className="inventory-table-container__title">Premix Inventory</h2>
        <table className="teams-table">
          <thead>
            <tr>
              <th>Prescription</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {uniquePrescriptions.map((item, index) => (
              <tr key={index}>
                <td>{item.prescription}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2 className="h2">Concentrate Inventory</h2>
        <table className="table margin-top-2em">
          <thead>
            <tr className="table-header-row">
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{concentrateComps}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Totals;

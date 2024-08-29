import { useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Premix() {
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

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

  return (
    <div className="inventory-table-container inventory-table-container--premix">
      <h2 className="inventory-table-container__title">Premix Inventory</h2>
      <table className="inventory-table inventory-table--premix">
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
  );
}

export default Premix;

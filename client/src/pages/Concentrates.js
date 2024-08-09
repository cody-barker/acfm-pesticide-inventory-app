import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Concentrates() {
  const { user, setUser } = useContext(UserContext);
  const { products, setProducts } = useContext(ProductsContext);
  const concentrateComps = user.containers.map((container) => {
    return (
      <tr>
        <td></td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table">
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

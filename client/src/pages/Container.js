import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";

function Container() {
  let { id } = useParams();
  id = parseInt(id);
  const { user, setUser } = useContext(UserContext);
  const container = user.containers.find((container) => container.id === id);
  const { products } = useContext(ProductsContext);
  console.log(container);

  return (
    <div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Shelf</th>
            <th>Row</th>
            <th colSpan={products.length + 1}>Contents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{container.shelf}</td>
            <td>{container.row}</td>
            {container.contents.map((content, index) => {
              return (
                <td key={index}>
                  {content.concentration}% {""}
                  {
                    products.find(
                      (product) => product.id === content.product_id
                    )?.name
                  }
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Container;

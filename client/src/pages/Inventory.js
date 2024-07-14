import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";
function Inventory() {
  //get the containers state through context
  //render a table of all containers with their shelves and rows
  //eventually render their contents as well

  const { user, setUser } = useContext(UserContext);
  const { products, setProducts } = useContext(ProductsContext);
  const containers = user.containers.map((container) => {
    return container;
  });
  console.log(containers);

  const tableRows = containers.map((container) => {
    return (
      <tr key={container.id}>
        <td>{container.shelf}</td>
        <td>{container.row}</td>
        {container.contents.map((content, index) => {
          // Find the product object that matches the product_id
          let product = products.find(
            (product) => product.id === content.product_id
          );
          // Render a <td> if product is found
          return product ? (
            <td key={index}>
              {content.concentration}% {product.name}
            </td>
          ) : null;
        })}
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Shelf</th>
          <th>Row</th>
          <th>Contents</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default Inventory;

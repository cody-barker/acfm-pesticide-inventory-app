import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";
function Inventory() {
  //get the containers state through context
  //render a table of all containers with their shelves and rows
  //eventually render their contents as well

  const { user, setUser } = useContext(UserContext);
  const { products, setProducts } = useContext(ProductsContext);
  const [vis, setVis] = useState(false);
  const [shelf, setShelf] = useState(0);
  const [row, setRow] = useState("");

  const containers = user.containers.map((container) => {
    return container;
  });

  const tableRows = containers.map((container) => {
    return (
      <tr key={container.id}>
        <td>{container.shelf}</td>
        <td>{container.row}</td>
        {container.contents.map((content, index) => {
          let product = products.find(
            (product) => product.id === content.product_id
          );
          return product ? (
            <td key={index}>
              {content.concentration}% {product.name}
            </td>
          ) : null;
        })}
      </tr>
    );
  });

  function handleVis() {
    setVis(!vis);
  }

  function handleShelfChange(e) {
    setShelf(e.target.value);
  }

  function handleRowChange(e) {
    setRow(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const container = { shelf, row };
    fetch("/containers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(container),
    });
  }

  return (
    <>
      <div className="center margin-4em">
        <button onClick={handleVis} className="blue-btn">
          {vis ? "Cancel" : "Add a Container"}
        </button>
        <div>
          {vis ? (
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="number"
                  value={shelf}
                  onChange={handleShelfChange}
                ></input>
              </label>
              <label>
                <input
                  type="text"
                  value={row}
                  onChange={handleRowChange}
                ></input>
              </label>
              <button type="submit" className="blue-btn">
                Add Container
              </button>
            </form>
          ) : null}
        </div>
      </div>

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
    </>
  );
}

export default Inventory;

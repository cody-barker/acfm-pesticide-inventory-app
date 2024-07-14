import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Inventory() {
  const { user, setUser } = useContext(UserContext);
  const { products, setProducts } = useContext(ProductsContext);
  const [vis, setVis] = useState(false);
  const [shelf, setShelf] = useState(0);
  const [row, setRow] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect to set loading state based on user context
  useEffect(() => {
    if (user && user.containers) {
      setLoading(false);
    }
  }, [user]);

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Function to compare containers alphanumerically by shelf and row
  const compareContainers = (a, b) => {
    // Concatenate shelf and row into a sortable string
    const keyA = `${a.shelf}${a.row}`;
    const keyB = `${b.shelf}${b.row}`;
    // Compare the concatenated strings
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  };

  // Sort containers alphanumerically
  const sortedContainers = user.containers.slice().sort(compareContainers);

  // Render table rows based on sorted containers
  const tableRows = sortedContainers.map((container) => (
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
  ));

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
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to add container");
        }
        return r.json();
      })
      .then((container) => {
        setUser((prevUser) => ({
          ...prevUser,
          containers: [...prevUser.containers, container],
        }));
        setShelf(0);
        setRow("");
        setVis(false);
      })
      .catch((error) => {
        console.error("Error adding container:", error);
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

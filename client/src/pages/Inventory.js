import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function Inventory() {
  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(ProductsContext);
  const [vis, setVis] = useState(false);
  const [shelf, setShelf] = useState(0);
  const [row, setRow] = useState("");
  const [contents, setContents] = useState([
    { product_id: "", concentration: "" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.containers) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleVis = () => {
    setVis(!vis);
  };

  const handleShelfChange = (e) => {
    setShelf(e.target.value);
  };

  const handleRowChange = (e) => {
    setRow(e.target.value);
  };

  const handleContentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContents = [...contents];
    updatedContents[index][name] = value;
    setContents(updatedContents);
  };

  const addContentField = () => {
    setContents([...contents, { product_id: "", concentration: "" }]);
  };

  const removeContentField = (index) => {
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const container = {
      user_id: user.id,
      shelf: parseInt(shelf),
      row,
      contents_attributes: contents, // Ensure contents are correctly nested
    };

    fetch("/containers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ container }),
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
        setContents([{ product_id: "", concentration: "" }]);
        setVis(false);
      })
      .catch((error) => {
        console.error("Error adding container:", error);
      });
  };

  const sortedContainers = user.containers
    .slice()
    .sort((a, b) => `${a.shelf}${a.row}` - `${b.shelf}${b.row}`);

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
                Shelf:
                <input
                  type="number"
                  value={shelf}
                  onChange={handleShelfChange}
                  name="shelf"
                  required
                />
              </label>
              <label>
                Row:
                <input
                  type="text"
                  value={row}
                  onChange={handleRowChange}
                  name="row"
                  required
                />
              </label>
              <div>
                Contents:
                {contents.map((content, index) => (
                  <div key={index}>
                    <select
                      value={content.product_id}
                      onChange={(e) => handleContentChange(index, e)}
                      name="product_id"
                      required
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Concentration"
                      value={content.concentration}
                      onChange={(e) => handleContentChange(index, e)}
                      name="concentration"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeContentField(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addContentField}>
                  Add Content
                </button>
              </div>
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

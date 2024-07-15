import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";

function EditContainer() {
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id);

  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  const container = user.containers.find((container) => container.id === id);

  const [shelf, setShelf] = useState(container?.shelf || "");
  const [row, setRow] = useState(container?.row || "");
  const [contents, setContents] = useState(container?.contents || []);

  useEffect(() => {
    if (container) {
      setShelf(container.shelf);
      setRow(container.row);
      setContents(
        container.contents.map((content) => ({
          ...content,
          id: content.id || null,
        }))
      );
    }
  }, [container]);

  function handleShelfChange(event) {
    setShelf(event.target.value);
  }

  function handleRowChange(event) {
    setRow(event.target.value);
  }

  function handleContentChange(index, key, value) {
    // Only update product_id and concentration fields
    if (key === "product_id" || key === "concentration") {
      const updatedContents = [...contents];
      updatedContents[index][key] = value;
      setContents(updatedContents);
    }
  }

  function handleAddContent() {
    setContents([...contents, { product_id: "", concentration: 0 }]);
  }

  const handleExpiresChange = (e, index) => {
    const { value } = e.target;
    const updatedContainers = [...user.containers];
    updatedContainers[index].expires = value;
    setUser(updatedContainers);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const updatedContainer = {
      id: container.id,
      shelf,
      row,
      expires: container.expires,
      contents_attributes: contents.map((content) => {
        if (content.id && !content.product_id) {
          return { ...content, _destroy: true };
        }
        return content;
      }),
    };

    fetch(`/containers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ container: updatedContainer }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to update container");
        }
        return r.json();
      })
      .then((updatedContainer) => {
        const updatedContainers = user.containers.map((c) =>
          c.id === id ? updatedContainer : c
        );
        setUser({ ...user, containers: updatedContainers });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating container:", error);
      });
  }

  if (!container) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="flex-row">
          <label>
            Shelf
            <select value={shelf} onChange={handleShelfChange}>
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            Row
            <select value={row} onChange={handleRowChange}>
              {["A", "B", "C", "D", "E"].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>

        {contents.map((content, index) => (
          <div key={index} className="flex-row">
            <label>
              Product
              <select
                value={content.product_id}
                onChange={(e) =>
                  handleContentChange(
                    index,
                    "product_id",
                    parseInt(e.target.value)
                  )
                }
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Concentration
              <input
                type="number"
                required
                value={content.concentration}
                onChange={(e) =>
                  handleContentChange(
                    index,
                    "concentration",
                    parseInt(e.target.value)
                  )
                }
              />
            </label>
            <label>
              Expires:
              <input
                type="datetime-local"
                value={container.expires}
                onChange={(e) => handleExpiresChange(e, index)}
                name="expires"
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddContent}>
          Add Content
        </button>
        <button type="submit" className="blue-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditContainer;

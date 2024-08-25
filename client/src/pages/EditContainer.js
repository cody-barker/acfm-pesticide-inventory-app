import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditContainer() {
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id);

  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  let container = user.containers.find((container) => container.id === id);

  const [shelf, setShelf] = useState(container?.shelf || "");
  const [row, setRow] = useState(container?.row || "");
  const [contents, setContents] = useState(container?.contents || []);
  const [expires, setExpires] = useState(container?.expires || "");

  const showToastMessage = () => {
    toast("Container updated!", {
      className: "custom-toast",
      progressClassName: "Toastify__progress-bar",
    });
  };

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
      setExpires(container.expires); // Prefill expires with current container's expires
    }
  }, [container]);

  function handleShelfChange(event) {
    setShelf(event.target.value);
  }

  function handleRowChange(event) {
    setRow(event.target.value);
  }

  function handleContentChange(index, key, value) {
    const updatedContents = [...contents];
    if (key === "product_id") {
      updatedContents[index][key] = value;
    } else if (key === "concentration") {
      updatedContents[index][key] = value === "" ? null : parseFloat(value);
    }
    setContents(updatedContents);
  }

  function handleAddContent() {
    setContents([...contents, { product_id: "", concentration: null }]);
  }

  function handleRemoveContent(index) {
    const updatedContents = contents.map((content, idx) =>
      idx === index ? { ...content, _destroy: true } : content
    );
    setContents(updatedContents);
  }

  function handleExpiresChange(event) {
    setExpires(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedContainer = {
      id: container.id,
      shelf,
      row,
      expires, // Include updated expires date for the entire container
      contents_attributes: contents.map((content) => {
        if (content._destroy || (!content.product_id && content.id)) {
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
        showToastMessage();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating container:", error);
      });
  }

  if (!container) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-container">
      <form className="edit-container__form" onSubmit={handleSubmit}>
        <div className="edit-container__form-row">
          <label className="edit-container__label">
            Shelf
            <select
              className="edit-container__select button"
              value={shelf}
              onChange={handleShelfChange}
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <label className="edit-container__label">
            Row
            <select
              className="edit-container__select  button"
              value={row}
              onChange={handleRowChange}
            >
              {["A", "B", "C", "D", "E"].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="edit-container__label">
            Expires:
            <input
              className="edit-container__input"
              type="date"
              value={expires}
              onChange={handleExpiresChange}
              name="expires"
            />
          </label>
        </div>

        {contents.map(
          (content, index) =>
            !content._destroy && (
              <div key={index} className="edit-container__form-row">
                <label className="edit-container__label">
                  Product
                  <select
                    className="edit-container__select button"
                    value={content.product_id}
                    required
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
                <label className="edit-container__label">
                  Concentration
                  <input
                    className="edit-container__input"
                    type="number"
                    required
                    step="any"
                    value={
                      content.concentration === null
                        ? ""
                        : content.concentration
                    }
                    onChange={(e) =>
                      handleContentChange(
                        index,
                        "concentration",
                        e.target.value
                      )
                    }
                  />
                </label>
                <button
                  type="button"
                  className="edit-container__button button--remove"
                  onClick={() => handleRemoveContent(index)}
                >
                  Remove
                </button>
              </div>
            )
        )}
        <button
          type="button"
          className="edit-container__button button button--remove"
          onClick={handleAddContent}
        >
          Add More Contents
        </button>
        <button type="submit" className="edit-container__button button">
          Submit
        </button>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default EditContainer;

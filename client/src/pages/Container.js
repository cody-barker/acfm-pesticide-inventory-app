import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";

function Container() {
  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);

  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(ProductsContext);

  const container = user.containers.find((container) => container.id === id);

  if (!container) {
    return <p>Loading...</p>;
  }

  function handleDelete() {
    fetch(`/containers/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to delete product");
        }
        if (r.status === 204) {
          return {};
        }
        return r.json();
      })
      .then(() => {
        const updatedContainers = user.containers.filter(
          (container) => container.id !== id
        );
        setUser({ ...user, containers: updatedContainers });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }

  return (
    <div>
      <table className="inventory-table margin-top-4em">
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
            {container.contents.map((content, index) => (
              <td key={index}>
                {content.concentration}% {""}
                {
                  products.find((product) => product.id === content.product_id)
                    ?.name
                }
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="product-options">
        <button className="blue-btn">
          <Link to={`/containers/${id}/edit`}>Edit</Link>
        </button>
        <button className="remove-btn" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default Container;

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Container() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(ProductsContext);
  const [expirationClass, setExpirationClass] = useState(""); // State to manage expiration class

  const container = user.containers.find(
    (container) => container.id === parseInt(id)
  );

  const showToastMessage = () => {
    toast("Container removed!");
  };

  useEffect(() => {
    if (container) {
      const today = new Date();
      const expires = new Date(container.expires);
      const threeMonthsFromNow = new Date(
        today.getFullYear(),
        today.getMonth() + 3,
        today.getDate()
      );

      if (expires < threeMonthsFromNow) {
        setExpirationClass("text-red"); // Set text to red if expiration is within 3 months
      } else {
        setExpirationClass(""); // Clear the class if expiration is not within 3 months
      }
    }
  }, [container]);

  if (!container) {
    return <p>Loading...</p>;
  }

  function handleDelete() {
    fetch(`/containers/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to delete container");
        }
        if (r.status === 204) {
          return {};
        }
        return r.json();
      })
      .then(() => {
        const updatedContainers = user.containers.filter(
          (container) => container.id !== parseInt(id)
        );
        showToastMessage();
        setTimeout(() => {
          setUser({ ...user, containers: updatedContainers });
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting container:", error);
      });
  }

  // Calculate the number of contents in the container
  const numContents = container.contents.length;

  return (
    <div className="flex-column-center">
      <table className="table inventory-table margin-top-4em">
        <thead>
          <tr>
            <th>Expires</th>
            <th>Shelf</th>
            <th>Row</th>
            <th colSpan={numContents + 1}>Contents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={expirationClass}>
              {container.expires.slice(0, 10)}
            </td>
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
      <div className="product-options-wrapper">
        <div className="product-options">
          <button className="blue-btn edit-btn button-width">
            <Link to={`/containers/${id}/edit`}>Edit</Link>
          </button>
          <button className="remove-btn" onClick={handleDelete}>
            Remove
          </button>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Container;

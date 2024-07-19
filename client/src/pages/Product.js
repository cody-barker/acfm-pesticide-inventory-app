import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);
  const { products, setProducts } = useContext(ProductsContext);
  const product = products.find((product) => product.id === parseInt(id));

  const showToastMessage = () => {
    toast(`Product removed!`);
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  function handleDelete() {
    fetch(`/products/${id}`, {
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
        const updatedProducts = products.filter((product) => product.id !== id);
        showToastMessage();
        setTimeout(() => {
          setProducts(updatedProducts);
          navigate("/products");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }

  return (
    <div className="container">
      <div className="product">
        {" "}
        {/* Apply 'product' class here */}
        <h1>{product.name}</h1>
        <p>EPA Reg: {product.epa_reg}</p>
        <div className="product-options-wrapper">
          <div className="product-options">
            <button className="blue-btn button-width">
              <Link to={`/products/${id}/edit`}>Edit</Link>
            </button>
            <button className="remove-btn button-width" onClick={handleDelete}>
              Remove
            </button>
          </div>
          <p className="errors">
            Warning: Removing a product will remove it from all containers with
            that product.
          </p>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Product;

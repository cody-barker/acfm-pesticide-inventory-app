import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { useParams, useNavigate } from "react-router-dom";
import Error from "../components/Error";

function EditProduct() {
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id);
  const { products, setProducts } = useContext(ProductsContext);
  const product = products.find((product) => product.id === parseInt(id));

  const [name, setName] = useState(product.name);
  const [epaReg, setEpaReg] = useState(product.epa_reg);
  const [errors, setErrors] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEpaRegChange = (e) => {
    setEpaReg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, name, epa_reg: epaReg };

    // Make the API call to update the product in the database
    fetch(`/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error("Failed to update product");
      //   }
      //   return response.json();
      // })
      .then((data) => {
        if (data.ok) {
          const updatedProducts = products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
          setProducts(updatedProducts);
          navigate("/products");
        } else {
          data.json().then((err) => setErrors(err.errors));
        }
      });
    // .catch((error) => {
    //   console.error("Error updating product:", error);
    //   // Handle error (e.g., show a notification to the user)
    // });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          EPA Reg
          <input type="text" value={epaReg} onChange={handleEpaRegChange} />
        </label>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
        <button type="submit" className="blue-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProduct;

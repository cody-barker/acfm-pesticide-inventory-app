import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { useParams } from "react-router-dom";

function EditProduct() {
  let { id } = useParams();
  id = parseInt(id);
  const { products, setProducts } = useContext(ProductsContext);
  const product = products.find((product) => product.id === parseInt(id));

  const [name, setName] = useState(product.name);
  const [epaReg, setEpaReg] = useState(product.epa_reg);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEpaRegChange = (e) => {
    setEpaReg(e.target.value);
  };

  return (
    <div className="container">
      <form>
        <label>
          Name
          <input type="text" value={name} onChange={handleNameChange}></input>
        </label>
        <label>
          EPA Reg
          <input
            type="text"
            value={epaReg}
            onChange={handleEpaRegChange}
          ></input>
        </label>
        <submit className="login-btn">Submit</submit>
      </form>
    </div>
  );
}

export default EditProduct;

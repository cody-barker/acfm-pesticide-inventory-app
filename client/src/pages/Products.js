import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";

function Products() {
  const { products } = useContext(ProductsContext);
  const [vis, setVis] = useState(false);
  const [name, setName] = useState("");
  const [epaReg, setEpaReg] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEpaRegChange(e) {
    setEpaReg(e.target.value);
  }

  if (!products) {
    return <div></div>;
  }

  let productComps = products.map((product) => {
    return (
      <tr key={product.id}>
        <td>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </td>
        <td>{product.epa_reg}</td>
      </tr>
    );
  });

  function handleVis() {
    setVis(!vis);
  }

  return (
    <div className="table-container">
      <div className="center margin-4em">
        <button onClick={handleVis} className="login-btn">
          {vis ? "Cancel" : "Add a Product"}
        </button>
        <div>
          {vis ? (
            <form>
              <label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                ></input>
              </label>
              <label>
                <input
                  type="text"
                  value={epaReg}
                  onChange={handleEpaRegChange}
                ></input>
              </label>
              <button type="submit" className="login-btn">
                Submit
              </button>
            </form>
          ) : null}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table-header-row">
            <th>Name</th>
            <th>EPA Reg</th>
          </tr>
        </thead>
        <tbody>{productComps}</tbody>
      </table>
    </div>
  );
}

export default Products;

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal"; // Import your new Modal component

function Inventory() {
  const { user, setUser } = useContext(UserContext);
  const { products } = useContext(ProductsContext);
  const [errors, setErrors] = useState([]);
  const [shelf, setShelf] = useState(1); // Default shelf selection
  const [row, setRow] = useState("A"); // Default row selection
  const [contents, setContents] = useState([
    { product_id: "", concentration: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(""); // State for filtering by product
  const [selectedConcentration, setSelectedConcentration] = useState(""); // State for filtering by concentration
  const [selectedProduct2, setSelectedProduct2] = useState(""); // State for filtering by product
  const [selectedConcentration2, setSelectedConcentration2] = useState(""); // State for filtering by concentration
  const [expires, setExpires] = useState(""); // State for expiration date
  const showToastMessage = () => {
    toast("Container added!");
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  const navigate = useNavigate();
  const handleResetFilters = () => {
    setSelectedProduct("");
    setSelectedConcentration("");
    setSelectedProduct2("");
    setSelectedConcentration2("");
    setShelf(1); // Reset shelf to default
    setRow("A"); // Reset row to default
  };

  useEffect(() => {
    if (user && user.containers) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Calculate 2 years from today
    const today = new Date();
    const twoYearsFromNow = new Date(
      today.getFullYear() + 2,
      today.getMonth(),
      today.getDate()
    );
    // Format the date as YYYY-MM-DD for the input field
    const formattedDate = twoYearsFromNow.toISOString().slice(0, 10);
    setExpires(formattedDate);
  }, []);

  if (loading) {
    return <p></p>;
  }

  const handleShelfChange = (e) => {
    setShelf(parseInt(e.target.value));
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
    // Check if this is the last content field, if so, disable removal
    if (contents.length === 1) {
      return;
    }
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate 2 years from today
    const today = new Date();
    const twoYearsFromNow = new Date(
      today.getFullYear() + 2,
      today.getMonth(),
      today.getDate()
    );
    // Format the date as YYYY-MM-DD for the input field
    const formattedDate = twoYearsFromNow.toISOString().slice(0, 10);

    const container = {
      user_id: user.id,
      shelf: shelf,
      row: row,
      expires: formattedDate, // Update expires to formattedDate
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
        if (r.ok) {
          // Update the expires state in user.containers
          r.json().then((container) => {
            container.expires = formattedDate;
            setUser((prevUser) => ({
              ...prevUser,
              containers: [...prevUser.containers, container],
            }));
            setShelf(1); // Reset to default after submission
            setRow("A"); // Reset to default after submission
            setContents([{ product_id: "", concentration: "" }]);
            setIsModalOpen(false); // Close modal on successful submit
            // setVis(false);
            showToastMessage();
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        console.error("Error adding container:", error);
      });
  };

  const handleProductFilterChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleConcentrationFilterChange = (e) => {
    setSelectedConcentration(e.target.value);
  };

  const handleProductFilterChange2 = (e) => {
    setSelectedProduct2(e.target.value);
  };

  const handleConcentrationFilterChange2 = (e) => {
    setSelectedConcentration2(e.target.value);
  };

  // Filter containers based on selected products and concentrations
  const filteredContainers = user.containers.filter((container) => {
    const firstFilterMatch = container.contents.some(
      (content) =>
        (!selectedProduct ||
          content.product_id === parseInt(selectedProduct)) &&
        (!selectedConcentration ||
          content.concentration === parseFloat(selectedConcentration))
    );

    const secondFilterMatch = container.contents.some(
      (content) =>
        (!selectedProduct2 ||
          content.product_id === parseInt(selectedProduct2)) &&
        (!selectedConcentration2 ||
          content.concentration === parseFloat(selectedConcentration2))
    );

    return firstFilterMatch && secondFilterMatch;
  });

  // Sorting containers alphanumerically by shelf and row
  const sortedContainers = filteredContainers.slice().sort((a, b) => {
    // Sort by shelf first
    if (a.shelf !== b.shelf) {
      return a.shelf - b.shelf;
    }
    // Then sort by row alphabetically
    return a.row.localeCompare(b.row);
  });

  // Sort products alphabetically by name
  const sortedProducts = products
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  // Extract unique concentrations from user containers
  const uniqueConcentrations = [
    ...new Set(
      user.containers.flatMap((container) =>
        container.contents.map((content) => content.concentration)
      )
    ),
  ].sort((a, b) => a - b);

  // Calculate the maximum number of contents in any container
  const maxContents = Math.max(
    ...user.containers.map((container) => container.contents.length),
    0
  );

  const tableRows = sortedContainers.map((container) => {
    // Sort the contents of each container by concentration in descending order
    const sortedContents = container.contents.slice().sort((a, b) => {
      return b.concentration - a.concentration;
    });

    // Calculate 3 months from today
    const today = new Date();
    const threeMonthsFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 3,
      today.getDate()
    );

    return (
      <tr
        key={container.id}
        onClick={() => navigate(`/containers/${container.id}`)}
        className="clickable-row"
      >
        <td>
          <span
            style={{
              color:
                new Date(container.expires) < threeMonthsFromNow
                  ? "rgb(202, 11, 11)"
                  : "inherit",
            }}
          >
            {container.expires.slice(0, 10)}
          </span>
        </td>
        <td>{container.shelf}</td>
        <td>{container.row}</td>
        {sortedContents.map((content, index) => (
          <td key={index}>
            {content.concentration}%{" "}
            {
              products.find((product) => product.id === content.product_id)
                ?.name
            }
          </td>
        ))}
      </tr>
    );
  });

  return (
    <>
      <div>
        <div>
          <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
            <form className="form" onSubmit={handleSubmit}>
              <div className="flex-column">
                <div className="flex-row">
                  <label className="form__label">
                    Shelf
                    <select
                      className="button"
                      value={shelf}
                      onChange={handleShelfChange}
                      required
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form__label">
                    Row
                    <select
                      className="button"
                      value={row}
                      onChange={handleRowChange}
                      required
                    >
                      {["A", "B", "C", "D", "E"].map((char) => (
                        <option key={char} value={char}>
                          {char}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="form__label">
                  Expiration Date
                  <input
                    type="date"
                    value={expires}
                    onChange={(e) => setExpires(e.target.value)}
                    required
                  />
                </label>
                {contents.map((content, index) => (
                  <div className="flex-row" key={index}>
                    <select
                      className="button"
                      value={content.product_id}
                      onChange={(e) => handleContentChange(index, e)}
                      name="product_id"
                    >
                      <option value="">Select a product</option>
                      {sortedProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <label className="form__label">
                      <input
                        className="concentration-input"
                        type="number"
                        placeholder="%"
                        step="0"
                        value={content.concentration}
                        onChange={(e) => handleContentChange(index, e)}
                        name="concentration"
                      />
                    </label>
                    {/* Disable remove button if it's the last content field */}
                    <button
                      className="button button--remove"
                      type="button"
                      onClick={() => removeContentField(index)}
                      disabled={contents.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {errors.map((err) => (
                  <Error key={err}>{err}</Error>
                ))}
                <button
                  className="button button--remove"
                  type="button"
                  onClick={addContentField}
                >
                  Add More Contents
                </button>
              </div>
              <button type="submit" className="button margin-top-2em">
                Submit Container
              </button>
              {errors.length > 0 && <Error errors={errors} />}
            </form>
          </Modal>
        </div>
        <div className="filter-container">
          <div className="filter-container__filter-group">
            <label className="filter">
              <select
                value={selectedConcentration}
                onChange={handleConcentrationFilterChange}
                className="button button--filter filter__option"
              >
                <option value="">All Concentrations</option>
                {uniqueConcentrations.map((concentration) => (
                  <option key={concentration} value={concentration}>
                    {concentration}%
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                value={selectedProduct}
                onChange={handleProductFilterChange}
                className="button button--filter"
              >
                <option value="">All Products</option>
                {sortedProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="filter-container__filter-group">
            <label className="filter">
              <select
                value={selectedConcentration2}
                onChange={handleConcentrationFilterChange2}
                className="button button--filter filter__option"
              >
                <option value="">All Concentrations</option>
                {uniqueConcentrations.map((concentration) => (
                  <option key={concentration} value={concentration}>
                    {concentration}%
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                value={selectedProduct2}
                onChange={handleProductFilterChange2}
                className="button button--filter"
              >
                <option value="">All Products</option>
                {sortedProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={handleResetFilters} className="reset-button">
            <img className="reset-button__image" src="/assets/reset-icon.svg" />
          </button>
        </div>
        <div>
          <p className="flex-column">
            <button onClick={handleModalToggle} className="button button--add">
              {isModalOpen ? "Cancel" : "Add a Container"}
            </button>
            <span className="flex-column__span">
              Selected Prescription: {tableRows.length} Containers
            </span>
          </p>
        </div>
        <div className="inventory-table-container">
          {filteredContainers.length > 0 ? (
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Expires</th>
                  <th>Shelf</th>
                  <th>Row</th>
                  {[...Array(maxContents).keys()].map((index) => (
                    <th key={index}>Product {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          ) : (
            <p className="error">
              There are no containers in inventory with that prescription.
            </p>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Inventory;

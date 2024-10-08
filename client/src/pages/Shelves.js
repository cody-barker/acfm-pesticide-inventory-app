import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";

function Shelves() {
  const { loading: productsLoading } = useContext(ProductsContext);
  const { user, setUser } = useContext(UserContext);
  const teams = user.teams || [];
  const { products } = useContext(ProductsContext);
  const [errors, setErrors] = useState([]);
  const [shelf, setShelf] = useState(1);
  const [row, setRow] = useState("A");
  const [contents, setContents] = useState([
    { product_id: "", concentration: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedConcentration, setSelectedConcentration] = useState("");
  const [selectedProduct2, setSelectedProduct2] = useState("");
  const [selectedConcentration2, setSelectedConcentration2] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const [expires, setExpires] = useState("");
  const showToastMessage = () => {
    toast("Container added!", {
      className: "custom-toast",
      progressClassName: "Toastify__progress-bar",
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  const navigate = useNavigate();
  const handleResetFilters = () => {
    setSelectedProduct("");
    setSelectedConcentration("");
    setSelectedProduct2("");
    setSelectedConcentration2("");
    setSelectedTeam("");
    setShelf(1);
    setRow("A");
  };

  useEffect(() => {
    if (user && user.containers && products) {
      setLoading(false);
    }
  }, [user, products]);

  useEffect(() => {
    const today = new Date();
    const sixMonthsFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 6,
      today.getDate()
    );
    const formattedDate = sixMonthsFromNow.toISOString().slice(0, 10);
    setExpires(formattedDate);
  }, []);

  if (loading || !user.containers) {
    return <p></p>;
  }

  if (productsLoading) {
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
    if (contents.length === 1) {
      return;
    }
    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const sixMonthsFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 6,
      today.getDate()
    );
    const formattedDate = sixMonthsFromNow.toISOString().slice(0, 10);

    const container = {
      user_id: user.id,
      shelf: shelf,
      row: row,
      expires: formattedDate,
      contents_attributes: contents,
      team_id: selectedTeam,
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
          r.json().then((container) => {
            container.expires = formattedDate;
            setUser((prevUser) => ({
              ...prevUser,
              containers: [...prevUser.containers, container],
            }));
            setShelf(1);
            setRow("A");
            setContents([{ product_id: "", concentration: "" }]);
            setSelectedTeam("");
            setIsModalOpen(false);
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

    const teamFilterMatch =
      !selectedTeam || container.team.id === parseInt(selectedTeam);

    return firstFilterMatch && secondFilterMatch && teamFilterMatch;
  });

  const sortedContainers = filteredContainers.slice().sort((a, b) => {
    if (a.shelf !== b.shelf) {
      return a.shelf - b.shelf;
    }
    return a.row.localeCompare(b.row);
  });

  const sortedProducts = products
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const uniqueConcentrations = [
    ...new Set(
      user.containers.flatMap((container) =>
        container.contents.map((content) => content.concentration)
      )
    ),
  ].sort((a, b) => a - b);

  const maxContents = Math.max(
    ...user.containers.map((container) => container.contents.length),
    0
  );

  const tableRows = sortedContainers.map((container) => {
    if (!container.contents || container.contents.length === 0) {
      return (
        <tr key={container.id}>
          <td colSpan={maxContents + 4}>No contents available</td>
        </tr>
      );
    }

    const sortedContents = container.contents.slice().sort((a, b) => {
      return b.concentration - a.concentration;
    });

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
        <td>{container.team.name}</td>
        <td>{container.shelf}</td>
        <td>{container.row}</td>
        {sortedContents.map((content, index) => {
          const product = products.find(
            (product) => product.id === content.product_id
          );
          return (
            <td key={index}>
              <div>{content.concentration}%</div>{" "}
              {/* Concentration appears above */}
              <div>{product ? product.name : "Refresh the page"}</div>{" "}
              {/* Product name */}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <>
      <div>
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={handleModalToggle}
            className="modal"
          >
            <form className="form add-form" onSubmit={handleSubmit}>
              <div className="flex-column flex-column--modal">
                <div className="flex-row">
                  <label className="form__label">
                    Team
                    <select
                      name="team"
                      className="button"
                      value={selectedTeam || ""}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      required
                    >
                      <option value="">Select a team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form__label">
                    Shelf
                    <select
                      name="shelf"
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
                      name="row"
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
                  <label className="form__label">
                    Expiration Date
                    <input
                      name="expiration_date"
                      type="date"
                      value={expires}
                      onChange={(e) => setExpires(e.target.value)}
                      required
                    />
                  </label>
                </div>

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
                    <button
                      className="button button--remove"
                      type="button"
                      onClick={() => removeContentField(index)}
                      disabled={contents.length === 1}
                    >
                      X
                    </button>
                  </div>
                ))}

                <button
                  className="button button--remove"
                  type="button"
                  onClick={addContentField}
                >
                  Add More Contents
                </button>
              </div>
              <button type="submit" className="button">
                Submit Container
              </button>
              {errors.map((err) => (
                <Error key={err}>{err}</Error>
              ))}
            </form>
          </Modal>
        </div>
        <div className="filter-container">
          <div className="filter-container__filter-group">
            {/* Existing filters */}
            <label className="filter">
              <select
                value={selectedConcentration}
                onChange={handleConcentrationFilterChange}
                className="button button--filter filter__option"
                name="select-concentration-1"
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
                name="select-product-1"
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
            {/* Existing filters */}
            <label className="filter">
              <select
                value={selectedConcentration2}
                onChange={handleConcentrationFilterChange2}
                className="button button--filter filter__option"
                name="select-concentration-2"
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
                name="select-product-2"
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
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="button button--filter"
                name="select-team"
              >
                <option value="">All Teams</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            onClick={handleResetFilters}
            className="reset-button"
            alt="reset button"
          >
            <img
              className="reset-button__image"
              src="/assets/reset-icon.svg"
              alt="reset button"
            />
          </button>
        </div>

        <div>
          <p className="flex-column">
            <button
              onClick={handleModalToggle}
              className="button button--add modal-button"
            >
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
                  <th>Team</th>
                  <th>Shelf</th>
                  <th>Row</th>
                  <th colSpan={maxContents}>Contents</th>
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

export default Shelves;

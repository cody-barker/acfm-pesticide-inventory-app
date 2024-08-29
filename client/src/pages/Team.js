import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext"; // Make sure to import your context

function Team() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [containers, setContainers] = useState([]);
  const { products } = useContext(ProductsContext); // Access the products from the context

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(`/teams/${id}`);
        const data = await response.json();
        console.log("Fetched team data:", data); // Debugging line
        if (data) {
          setTeam(data);
          setContainers(data.containers || []);
        } else {
          setTeam(null);
          setContainers([]);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setTeam(null);
        setContainers([]);
      }
    };

    fetchTeamData();
  }, [id]);

  // Helper function to get the product name by its ID
  const getProductNameById = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : "Unknown Product";
  };

  if (!team || products.length === 0) {
    return <p></p>;
  }

  console.log(products);

  return (
    <div className="inventory-table-container inventory-table-container--team">
      <h2 className="h2">{team.name}</h2>
      {containers.length === 0 ? (
        <p>No containers found</p>
      ) : (
        <table className="inventory-table inventory-table--team">
          <thead>
            <tr>
              <th>Expires</th>
              <th>Shelf</th>
              <th>Row</th>
              <th>Contents</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((container) => (
              <tr key={container.id}>
                <td>{container.expires.slice(0, 10)}</td>
                <td>{container.shelf}</td>
                <td>{container.row}</td>
                <td>
                  {container.contents && container.contents.length > 0 ? (
                    container.contents.map((content) => (
                      <div key={content.id}>
                        {content.concentration}%
                        {getProductNameById(content.product_id)}
                      </div>
                    ))
                  ) : (
                    <p>No contents</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Team;

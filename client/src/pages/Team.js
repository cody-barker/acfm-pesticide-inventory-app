import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
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

  // Calculate the maximum number of contents in any container
  const maxContents = containers.reduce(
    (max, container) => Math.max(max, container.contents.length),
    0
  );

  if (!team || products.length === 0) {
    return <p>No data available</p>;
  }

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
              <th colSpan={maxContents}>Contents</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((container) => {
              // Sort contents by concentration in descending order
              const sortedContents = [...container.contents].sort(
                (a, b) => b.concentration - a.concentration
              );

              return (
                <tr key={container.id}>
                  <td>
                    <NavLink
                      to={`/containers/${container.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {container.expires.slice(0, 10)}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/containers/${container.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {container.shelf}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/containers/${container.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {container.row}
                    </NavLink>
                  </td>
                  {sortedContents.map((content, index) => (
                    <td key={index} className="content-cell">
                      <NavLink
                        to={`/containers/${container.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="content-concentration">
                          {content.concentration}%
                        </div>
                        <div className="content-product">
                          {getProductNameById(content.product_id)}
                        </div>
                      </NavLink>
                    </td>
                  ))}
                  {/* Add empty cells to fill up the row if there are fewer contents than the maximum */}
                  {Array.from(
                    { length: maxContents - sortedContents.length },
                    (_, index) => (
                      <td key={`empty-${index}`}></td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Team;

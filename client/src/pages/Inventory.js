import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function Inventory() {
  //get the containers state through context
  //render a table of all containers with their shelves and rows
  //eventually render their contents as well

  const { user, setUser } = useContext(UserContext);
  const containers = user.containers.map((container) => {
    return container;
  });
  const tableRows = containers.map((container) => {
    return (
      <tr key={container.id}>
        <td>{container.shelf}</td>
        <td>{container.row}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Shelf</th>
          <th>Row</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default Inventory;

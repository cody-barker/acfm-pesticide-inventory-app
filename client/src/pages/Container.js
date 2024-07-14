import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";

function Container() {
  let { id } = useParams();
  id = parseInt(id);
  const { user, setUser } = useContext(UserContext);

  const container = user.containers.find((container) => container.id === id);
  console.log(id);
  return <div></div>;
}

export default Container;

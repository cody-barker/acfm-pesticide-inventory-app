import "../styles/App.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Login from "./Login";

function App() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello</p>
      </header>
    </div>
  );
}

export default App;

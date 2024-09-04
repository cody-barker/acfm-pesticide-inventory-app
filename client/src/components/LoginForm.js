import { useState, useContext } from "react";
import Error from "./Error";
import { UserContext } from "../contexts/UserContext";
import { ProductsContext } from "../contexts/ProductsContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setProducts } = useContext(ProductsContext);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then(async (user) => {
            setUser(user);

            // Fetch products after successful login
            const productsResponse = await fetch("/products");
            if (productsResponse.ok) {
              const products = await productsResponse.json();
              setProducts(products);
            } else {
              console.error("Failed to fetch products");
              // Handle error case as needed
            }
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Login error:", error);
        // Handle fetch error as needed
      });
  }

  return (
    <form className="form form--login" onSubmit={handleSubmit}>
      <label className="form__label">
        Username
        <input
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="form__label">
        Password
        <input
          name="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="button button--login" type="submit">
        {isLoading ? "Loading..." : "Login"}
      </button>

      {errors.map((err) => (
        <Error key={err}>{err}</Error>
      ))}
    </form>
  );
}

export default LoginForm;

import { useState, useEffect, createContext } from "react";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/products").then((r) => {
      if (r.ok) {
        r.json().then((product) => setProduct(product));
      }
    });
  }, []);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };

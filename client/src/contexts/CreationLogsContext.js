import { useState, useEffect, createContext } from "react";

const CreationLogsContext = createContext();

function CreationLogsProvider({ children }) {
  const [creationLogs, setCreationLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/creation_logs")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to fetch creation logs");
      })
      .then((userData) => {
        setCreationLogs(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching creation logs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <CreationLogsContext.Provider
      value={{ creationLogs, setCreationLogs, loading }}
    >
      {children}
    </CreationLogsContext.Provider>
  );
}

export { CreationLogsContext, CreationLogsProvider };

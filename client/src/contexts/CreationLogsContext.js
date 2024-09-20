import { useState, useEffect, createContext } from "react";

const CreationLogsContext = createContext();

function CreationLogsProvider({ children }) {
  const [creationLogs, setCreationLogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/creation-logs")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to fetch creationLogs");
      })
      .then((creationLogsData) => {
        setCreationLogs(creationLogsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching creationLogs:", error);
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

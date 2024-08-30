import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Teams() {
  const { user } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [creationLogs, setCreationLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [containerCounts, setContainerCounts] = useState({});

  useEffect(() => {
    if (user) {
      setTeams(user.teams);
    }
  }, [user]);

  useEffect(() => {
    // Set default date to January 1 of the current year
    const now = new Date();
    const currentYear = now.getFullYear();
    const januaryFirst = new Date(currentYear, 0, 1); // January is month 0
    const formattedDate = januaryFirst.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchCreationLogs = async () => {
      try {
        const response = await fetch(`/creation_logs`);
        const data = await response.json();
        console.log("Fetched creation logs:", data); // Log data to verify it's an array
        if (Array.isArray(data)) {
          setCreationLogs(data);
        } else {
          console.error("Expected an array but got:", data);
          setCreationLogs([]);
        }
      } catch (error) {
        console.error("Error fetching creation logs:", error);
        setCreationLogs([]);
      }
    };

    fetchCreationLogs();
  }, []);

  useEffect(() => {
    if (selectedDate && teams.length > 0) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setUTCHours(0, 0, 0, 0); // Normalize to UTC start of the selected date

      // Initialize counts
      const counts = {};

      // Count containers created since selected date for each team
      creationLogs.forEach((log) => {
        const logDateObj = new Date(log.created_at);
        logDateObj.setUTCHours(0, 0, 0, 0); // Normalize to UTC start of the log's creation date

        if (logDateObj >= selectedDateObj) {
          const teamId = log.team.id;
          if (!counts[teamId]) {
            counts[teamId] = 0;
          }
          counts[teamId]++;
        }
      });

      console.log("Counts based on selected date:", counts); // Debugging output

      setContainerCounts(counts);
    } else {
      // If no date is selected, reset counts
      setContainerCounts({});
    }
  }, [selectedDate, creationLogs, teams]);

  return (
    <div className="teams-list__container">
      <h1>Teams</h1>

      {/* Date Picker */}
      <label htmlFor="date-picker" className="date-picker__label">
        Select a Date to View Premixes Created Since
      </label>
      <input
        id="date-picker"
        className="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <table className="inventory-table teams-table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Containers</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>
                <Link to={`/teams/${team.id}`}>{team.name}</Link>
              </td>
              <td>{containerCounts[team.id] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;

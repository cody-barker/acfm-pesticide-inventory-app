import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Teams() {
  const { user } = useContext(UserContext);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (user) {
      setTeams(user.teams);
    }
  }, [user]);

  return (
    <div className="teams-list__container">
      <h1>Teams</h1>
      <ul className="teams-list">
        {teams.map((team) => (
          <li className="team" key={team.id}>
            <Link to={`/teams/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;

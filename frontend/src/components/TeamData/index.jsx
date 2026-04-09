import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./index.css";

const TeamData = () => {

  const { teamName, nationName, playerName, positionName } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  const [playersToShow, setPlayersToShow] = useState(10);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = "";

    if (teamName) {
      url = `/api/v1/player?team=${teamName}`;
    } 
    else if (nationName) {
      url = `/api/v1/player?nation=${nationName}`;
    } 
    else if (playerName) {
      url = `/api/v1/player?name=${playerName}`;
    }
    else if (positionName) {
      url = `/api/v1/player?position=${positionName}`;
    }

    if (!url) {
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8080${url}`)
      .then(res => {
        setPlayerData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

  }, [teamName, nationName, playerName, positionName]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (error) return <p style={{ textAlign: "center", color: "red" }}>
    Error: {error.message}
  </p>;

  if (playerData.length === 0) {
    return (
      <div className="table-container">
        <h1 className="page-title">
          {teamName || nationName || playerName || positionName}
        </h1>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No players found.
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">

      <h1 className="page-title">
        {teamName && `${teamName} Players`}
        {nationName && `${nationName} Players`}
        {playerName && `Search: ${playerName}`}
        {positionName && `${positionName} Players`}
      </h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Matches</th>
            <th>Starts</th>
            <th>Minutes</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>PK</th>
            <th>Yellow</th>
            <th>Red</th>
            <th>xG</th>
            <th>xAG</th>
          </tr>
        </thead>

        <tbody>
          {playerData.slice(0, playersToShow).map(player => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.pos}</td>
              <td>{player.age}</td>
              <td>{player.mp}</td>
              <td>{player.starts}</td>
              <td>{player.min}</td>
              <td>{player.gls}</td>
              <td>{player.ast}</td>
              <td>{player.pk}</td>
              <td>{player.crdy}</td>
              <td>{player.crdr}</td>
              <td>{player.xg}</td>
              <td>{player.xag}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {playersToShow < playerData.length && (
        <button 
          onClick={() => setPlayersToShow(playersToShow + 10)}
          className="show-more-button"
        >
          Show More
        </button>
      )}

    </div>
  );
};

export default TeamData;
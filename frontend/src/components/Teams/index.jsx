import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./index.css";
import teamData from "../../data/teams.json";

const Teams = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeams, setFilteredTeams] = useState(teamData.teams); // ✅ show all initially

    useEffect(() => {
        const filtered = teamData.teams.filter(team =>
            team.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTeams(filtered);
    }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const renderTeam = (teams) => {
        return (
            <div className="teams-container">
                {teams.map((team, idx) => (
                    <Link 
                        key={idx} 
                        to={`/teams/${encodeURIComponent(team.title)}`} 
                        className="team-card"
                    >
                        {/* Placeholder instead of image */}
                        <div className="team-placeholder">
                            {team.title}
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="teams-page">
            <h1 className="page-title">Teams</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for teams"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {renderTeam(filteredTeams)}
        </div>
    );
};

export default Teams;
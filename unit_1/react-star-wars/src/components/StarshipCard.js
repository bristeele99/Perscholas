import React from 'react';

const StarshipCard = ({ starship}) => {
    return (
        <div className="starship-card">
            <h2>{starship.name}</h2>
            <p>Model: {starship.model}</p>
            <p>Hyper Drive Rating: {starship.hyperdrive_rating}</p>
        </div>
    );
};

export default StarshipCard;
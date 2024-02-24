// App.js

import React, { useState, useEffect } from 'react';
import { getAllStarships } from './services/sw-api';
import StarshipCard from './components/StarshipCard';
import './App.css'; 

const App = () => {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const starshipsData = await getAllStarships();
        setStarships(starshipsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Run the effect only on component mount

  return (
    <div>
      <h1 className="title"> Star Wars Starships</h1>
      <div className="starship-card-container">
      {starships.map((starship) => (
        <StarshipCard key={starship.name} starship={starship} />
      ))}
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import About from './About';
import Stock from './Stock';
import stockData from './stock-data';

console.log('Main.js - stockData:', stockData);

function Main(props) {
  console.log('Main component rendered', props);
  return (
    <main>
       <Routes>
          <Route exact path="/" element={Home} />
          <Route path="/about" element={About} />
          <Route path="/stocks/:symbol" element={<Stock stockData={stockData} />}/>
          <Route path="/stocks"element={<Dashboard stockData={stockData} />}/>
      </Routes>
    </main>
  );
}

export default Main;

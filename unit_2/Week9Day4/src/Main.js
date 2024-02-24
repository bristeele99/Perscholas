import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Stock from './Stock';
import stockData from './stock-data';


function Main(props) {
  return (
    <main>
       <Routes>
          <Route exact path="/" element={Home} />
          <Route path="/about" element={About} />
          <Route
            path="/stocks/:symbol"
            render={props => <Stock stockData={stockData} {...props} />}
          />
          <Route
            path="/stocks"
            render={props => <Dashboard {...props} stockData={stockData} />}
          />
      </Routes>
    </main>
  );
}

export default Main;

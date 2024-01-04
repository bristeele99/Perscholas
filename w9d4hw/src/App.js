// LAB SOLUTION PROVIDED TO STUDENTS

import './App.css';
import React from 'react';
import stockData from './components/stock-data.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
// import { BrowserRouter } from 'react-router-dom';




function App(props) {
  console.log('App component rendered');
  return (
    <div>
      <Header />
      <Main stockData={stockData} />
    </div>
  );
}

export default App;
// export default BrowserRouter(App)

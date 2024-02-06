import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard(props) {
  console.log('Dashboard component rendered');
  console.log('Type of stockData:', typeof props.stockData);
  console.log('Content of stockData:', props.stockData);

  // Ensure that stockData is an array before mapping
  const stockDataArray = Array.isArray(props.stockData) ? props.stockData : [];

  // Map over the array and render each stock item
  const stockList = stockDataArray.map((stock, index) => (
    <Link key={index} to={`/stocks/${stock.symbol}`}>
      <li>Name: {stock.name}</li>
      <li>Symbol: {stock.symbol}</li>
      <li className="right">Price: {stock.lastPrice}</li>
      <li className="right">Change: {stock.change}</li>
    </Link>
  ));

  // Render the list of stocks
  return <ul>{stockList}</ul>;
}

export default Dashboard;

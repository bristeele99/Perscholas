import React from 'react';
import { useParams } from 'react-router-dom';

const Stock = ({ stockData }) => {
  console.log(stock);
  const { symbol } = useParams();
  const stock = stockData.find(d => d.symbol === symbol);

  if (!stock) {
    // Handle the case when the stock is not found
    return <div>Stock not found</div>;
  }

  return (
    <div>
      <h3>Name: {stock.name}</h3>
      <h3 className="price">Price: {stock.lastPrice}</h3>
    </div>
  );
};

export default Stock;


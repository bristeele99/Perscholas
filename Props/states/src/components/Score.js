import React from 'react';

function Score({ date, score }) {
  return (
    <li>
      Date: {date}, Score:{score}
    </li>
  );
}

export default Score;

import React from 'react';
import Score from './Score';

const Student = ({ student }) => {
  return (
    <div>
      <h2>{student.name}</h2>
      <p>{student.bio}</p>
      {student.scores.map((score, index) => (
        <Score key={index} date={score.date} score= {score.score}/>
      ))}
    </div>
  );
};

export default Student;
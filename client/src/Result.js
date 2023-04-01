import React from 'react';

function Result({ response }) {
  return (
    <div>
      <h2>ChatGPT Response:</h2>
      <p>{response}</p>
    </div>
  );
}

export default Result;

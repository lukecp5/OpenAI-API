import React, { useState } from 'react';
import Form from './Form';
import Result from './Result';

function App() {
  const [response, setResponse] = useState('');

  const handleResponse = (value) => {
    setResponse(value);
  }

  return (
    <div>
      {response === '' ? <Form onResponse={handleResponse} /> : <Result response={response} />}
    </div>
  );
}

export default App;

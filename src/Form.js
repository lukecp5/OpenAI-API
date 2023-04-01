/**
 *  >> Form Component 
 *#      In this component, we are using the useState hook to manage the state of the form inputs, and the handleSubmit
 *#  function to send the API request using the openai package. Note that we are setting the apiKey property of the 
 *#  openai object to the value of the REACT_APP_OPENAI_API_KEY environment variable, which we will define later.
 */

import React, { useState } from 'react';
import openai from 'openai';

function Form() {
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    openai.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const response = await openai.completions.create({
      prompt: `Language: ${language}\nDescription: ${description}`,
      temperature: 0.7,
      maxTokens: 60,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    });
    // create new page with the response
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Language:</label>
        <input type="text" value={language} onChange={e => setLanguage(e.target.value)} />

        <label>App Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;

const express = require('express');
const path = require('path');
const openai = require('openai');

// Initialize a new Express server instance
const app = express();

/**
 ** In this code, we are serving the static files from the open-ai-lab/client/build directory using 
 ** the express.static middleware. We are also defining an endpoint for handling the ChatGPT API 
 ** request, and sending the response back to the client using the res.send method. 
 ** 
 ** Finally, we are serving the React app by sending the index.html file in the open-ai-lab/client/build 
 ** directory for any GET requests that don't match any of the defined routes.
 */

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'open-ai-lab/client/build')));

// Endpoint for handling the ChatGPT API request
app.post('/api/chat', async (req, res) => {
  const { language, description } = req.body;
  openai.apiKey = process.env.OPENAI_API_KEY;
  const response = await openai.completions.create({
    prompt: `Language: ${language}\nDescription: ${description}`,
    temperature: 0.7,
    maxTokens: 60,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  });
  res.send(response.data.choices[0].text);
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatgpt-app/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);

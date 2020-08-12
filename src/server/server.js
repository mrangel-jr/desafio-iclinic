const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/luke', (req, res) => {
  request(
    { url: 'https://swapi.dev/api/people/1' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/darth', (req, res) => {
    request(
      { url: 'https://swapi.dev/api/people/4' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
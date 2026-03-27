require ('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// This is a "Route" - it listens for a GET request to your home page
app.get('/', (req, res) => {
  res.send('The backend is alive! ');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Secret Token Loaded: ${process.env.GITHUB_TOKEN ? 'YES ✅' : 'NO ❌'}`);
});
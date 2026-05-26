const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000; // Here is where we set the port!
const databasePath = '../frontend/users.json';

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  let userInfo = {};
  let users = {};
  
  if (fs.existsSync(databasePath)) {
    users = JSON.parse(fs.readFileSync(databasePath));
  }
  
  if (users[username]) {
    userInfo = users[username];
    res.json({ "oldUser": true, "data": userInfo, "password": users[username].password === password ? "correct" : "false"});
  } else {
    users[username] = {
      name: name,
      password: password,
      wasLesson: true,
      li: 0
    };
    fs.writeFileSync(databasePath, JSON.stringify(users, null, 4));
    res.json({ "oldUser": false, "data": users[username] });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
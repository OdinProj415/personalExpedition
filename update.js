const fs = require('fs');

// Get the data passed from the GitHub Action
const newDataRaw = process.argv[2];
const newData = JSON.parse(newDataRaw);

// 1. Read the existing file
const rawData = fs.readFileSync('users.json');
let users = JSON.parse(rawData);

// 2. Add the new user (your existing logic can go here!)
users.push(newData);

// 3. Write it back
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
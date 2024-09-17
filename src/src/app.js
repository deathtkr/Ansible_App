const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();
// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // Use environment variables
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


console.log('Database Host:', process.env.DB_HOST);  // Log the DB_HOST value

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/users/add', (req, res) => {
  const { userId, password } = req.body;
  const query = 'INSERT INTO users (userId, password) VALUES (?, ?)';

  connection.query(query, [userId, password], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Database error');
    } else {
      res.send('User added successfully!');
    }
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});


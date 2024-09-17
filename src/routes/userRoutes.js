uconst express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // Use environment variables
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Post request to add user to the database
router.post('/add', (req, res) => {
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

module.exports = router;


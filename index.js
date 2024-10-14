const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@word1',
    database: 'mysqldb'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    res.sendFile('./public/form.html');
});

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err) throw err;
        res.status(200).json(results);
    });
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if(err) throw err;
        res.status(200).json({ message: 'User added successfully', id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
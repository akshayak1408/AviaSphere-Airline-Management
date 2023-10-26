// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const app = express();

// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Pra123@bab',
//     database: 'project',
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.static('public')); // Assuming your HTML file is in a 'public' directory

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     const insertQuery = 'INSERT INTO register (email, name, password) VALUES (?, ?, ?)';
//     db.query(insertQuery, [email, name, password], (err, results) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).json({ error: 'An error occurred during registration' });
//         } else {
//             res.status(200).json({ message: 'Registration successful' });
//         }
//     });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Pra123@bab',
//     database: 'project',
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

// // Serve static files (e.g., your HTML file)
// app.use(express.static('public'));

// app.post('/registers', (req, res) => {
//     const { email, name, password } = req.body;

//     // Insert the data into the MySQL database
//     const insertQuery = 'INSERT INTO register (email, name, password) VALUES ("pra123@gmail.com", "prateek", "12345")';
//     db.query(insertQuery, [email, name, password], (err, results) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).json({ error: 'An error occurred during registration' });
//         } else {
//             res.status(200).json({ message: 'Registration successful' });
//         }
//     });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Pra123@bab',
//     database: 'project',
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

// // Serve static files (e.g., your HTML file)
// app.use(express.static('public'));

// // Add middleware to handle CORS if necessary
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;

//     // Insert the data into the MySQL database
//     const insertQuery = 'INSERT INTO register (name, email, password) VALUES (?, ?, ?)';
//     db.query(insertQuery, [name, email, password], (err, results) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).json({ error: 'An error occurred during registration' });
//         } else {
//             res.status(200).json({ message: 'Registration successful' });
//         }
//     });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });






const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pra123@bab',
    database: 'project',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/register.html');
});
// Serve your static files from the 'public' directory
// app.use(express.static('public'));

// Add middleware to handle CORS if necessary
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Handle the POST request for the registration form
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    // Insert the data into the MySQL database
    const insertQuery = 'INSERT INTO register (email, name, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [email, name, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred during registration' });
        } else {
            res.status(200).json({ message: 'Registration successful' });
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

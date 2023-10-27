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





const session = require('express-session');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views/admin.html'));

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
    res.sendFile(__dirname+'/public/home.html');
});



app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html');
});
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/public/register.html');
});


// Serve your static files from the 'public' directory
app.use(express.static('public'));

// Add middleware to handle CORS if necessary
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Assuming you get 'username' and 'password' from the login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided 'username' (email) and 'password' match a record in the database
    const loginQuery = 'SELECT * FROM register WHERE email = ? AND password = ?';
    
    db.query(loginQuery, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred during login' });
        } else if (results.length > 0) {
            // res.status(200).json({ message: 'Login successful' });
            res.redirect("/welcome");
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
            res.redirect("/");
        }
        res.end();
    });
});

// when login is success
app.get('/welcome',(req,res)=>{
    res.sendFile(__dirname+'/public/welcome.html');
});



// Assuming you get 'username' and 'password' from the adminlogin form
app.post('/adminlogin', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided 'username' (email) and 'password' match a record in the database
    const loginQueryadmin = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    
    db.query(loginQueryadmin, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred during login' });
        } else if (results.length > 0) {
            // res.status(200).json({ message: 'Login successful' });
            res.redirect("/admin");
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
            res.redirect("/");
        }
        res.end();
    });
});

// when adminlogin is success
// app.get('/admin',(req,res)=>{
//     res.sendFile(__dirname+'/public/admin.html');
// });

app.get('/admin', (req, res) => {
    // Query the database to get user data
    const getUsersQuery = 'SELECT * FROM register';
    db.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            // Render the 'admin' view (admin.ejs) and pass the data as a variable
            res.render('admin', { users: results });
        }
    });
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
            res.redirect("/login");

            // res.redirect(`/welcome?username=${username}&name=${results[0].name}`);

            // res.status(200).json({ message: 'Registration successful' });
        }
    });
});

// when registration is success
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

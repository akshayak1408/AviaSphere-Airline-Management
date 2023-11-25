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
// app.set('views', path.join(__dirname, 'views'));
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


// app.get('/home', (req, res) => {
//     res.render('home', { from: '', to: '', departure: '', return: '', travelers: 0 });
// });

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


// ADMIN DASHBOARD CONFIGURATION

// Add User
app.post('/admin/add-user', (req, res) => {
    const { name, email, password } = req.body;

    // Insert the data into the MySQL database
    const insertQuery = 'INSERT INTO register (email, name, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [email, name, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred during user addition' });
        } else {
            // Redirect back to the admin page
            res.redirect('/admin');
        }
    });
});

// Remove User
app.post('/admin/remove-user', (req, res) => {
    const { email } = req.body;

    // Delete the user from the MySQL database
    const deleteQuery = 'DELETE FROM register WHERE email = ?';
    db.query(deleteQuery, [email], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred during user removal' });
        } else {
            // Redirect back to the admin page
            res.redirect('/admin');
        }
    });
});


// Sample route to render the home page
app.get('/', (req, res) => {
    // Query to fetch airport data from the "airport" table
    const getAirportsQuery = 'SELECT * FROM airport';

    db.query(getAirportsQuery, (err, airports) => {
        if (err) {
            console.error('Error fetching airport data:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            // Render your 'home' EJS template and pass the airport data
            res.render('home', { airports: airports });
        }
    });
});

// Route for handling the search form submission
app.get('/search', (req, res) => {
    // Retrieve user inputs from the URL query parameters
    const { from, to, departure, return: travelers } = req.query;

    // You can perform any necessary processing with these values here
    // For example, you can query your database for flight data based on the user's search criteria.

    // Then, you can render a results page to display flight options.
    res.render('search-results', { from, to, departure, return: travelers });
});



/// Route for handling the flight search
app.get('/searchFlights', (req, res) => {
    res.render('flightSearch');
});

// Add a route to handle the search form submission
app.get('/searchFlights/results', (req, res) => {
    const { from, to, departure, return: returnDate, travelers } = req.query;

    // Query the database to fetch available flights based on the user input
    const searchFlightsQuery = `SELECT * FROM flights WHERE from_location = ? AND to_location = ? 
                                AND departure_date = ? AND arrival_date = ?`;

    db.query(searchFlightsQuery, [from, to, departure, returnDate], (err, results) => {
        if (err) {
            console.error('Error fetching flights:', err);
            res.status(500).json({ error: 'An error occurred while fetching flights' });
        } else {
            // Render the search results page (results.ejs) and pass the flight data
            res.render('results', { flights: results });
        }
    });
});


// New route to handle the booking and passenger details entry
app.get('/book/:flight_id', (req, res) => {
    const flightId = req.params.flight_id;

    // Fetch flight details based on flight ID
    const getFlightDetailsQuery = 'SELECT * FROM flights WHERE flight_id = ?';

    db.query(getFlightDetailsQuery, [flightId], (err, flightDetails) => {
        if (err) {
            console.error('Error fetching flight details:', err);
            res.status(500).send('An error occurred while fetching flight details');
        } else {
            // Render a new page (booking.ejs) and pass the flight details to the view
            res.render('booking', { flightDetails: flightDetails[0] });
        }
    });
});

// Route to handle passenger details submission
// app.post('/confirm-booking/:flight_id', (req, res) => {
//     const flightId = req.params.flight_id;
//     const {
//         passengerName,
//         age,
//         email,
//         contact,
//         address /* other passenger details */
//     } = req.body;

//     // Insert passenger details into the passengers table
//     const insertPassengerQuery =
//         'INSERT INTO passenger (flight_id, passenger_name, age, email, contact, address) VALUES (?, ?, ?, ?, ?, ?)';

//     db.query(
//         insertPassengerQuery,
//         [flightId, passengerName, age, email, contact, address],
//         (err, result) => {
//             if (err) {
//                 console.error('Error inserting passenger details:', err);
//                 res.status(500).send('An error occurred during booking');
//             } else {
//                 res.send('Booking confirmed!');
//                 // Handle success - Redirect, render a success page, or perform other actions
//             }
//         }
//     );
// });




// Route to handle passenger details submission
// app.post('/confirm-booking/:flight_id', (req, res) => {
//     const flightId = req.params.flight_id;
//     const {
//         passengerName,
//         age,
//         email,
//         contact,
//         address /* other passenger details */
//     } = req.body;

//     // Insert passenger details into the passengers table
//     const insertPassengerQuery =
//         'INSERT INTO passenger (flight_id, passenger_name, age, email, contact, address) VALUES (?, ?, ?, ?, ?, ?)';

//     db.query(
//         insertPassengerQuery,
//         [flightId, passengerName, age, email, contact, address],
//         (err, result) => {
//             if (err) {
//                 console.error('Error inserting passenger details:', err);
//                 res.status(500).send('An error occurred during booking');
//             } else {
//                 res.send('Booking confirmed!');
//                 // Handle success - Redirect, render a success page, or perform other actions
//             }
//         }
//     );
// });



// Route to handle passenger details submission
// Route to handle passenger details submission
app.post('/confirm-booking/:flight_id', (req, res) => {
    const flightId = req.params.flight_id;

    // Retrieve data for each passenger
    const passengers = [];
    let passengerCount = 1;

    while (req.body[`passengerName${passengerCount}`]) {
        const passenger = {
            passengerName: req.body[`passengerName${passengerCount}`],
            age: req.body[`age${passengerCount}`],
            email: req.body[`email${passengerCount}`],
            contact: req.body[`contact${passengerCount}`],
            address: req.body[`address${passengerCount}`]
        };
        passengers.push(passenger);
        passengerCount++;
    }

    // Now 'passengers' array contains details for all the passengers
    // Insert passenger details into the passengers table (you might have to adjust this query according to your schema)
    const insertPassengerQuery =
        'INSERT INTO passenger (flight_id, passenger_name, age, email, contact, address) VALUES ?';

    const passengerData = passengers.map(passenger => [
        flightId,
        passenger.passengerName,
        passenger.age,
        passenger.email,
        passenger.contact,
        passenger.address
    ]);

    db.query(insertPassengerQuery, [passengerData], (err, result) => {
        if (err) {
            console.error('Error inserting passenger details:', err);
            res.status(500).send('An error occurred during booking');
        } else {
            // res.send('Passenger Data Added!');
            res.render('addons', { passengerCount: passengers.length, flightDetails: { passengers: passengers } });
            // res.render('addons', { passengerCount: passengers.length });
            // Handle success - Redirect, render a success page, or perform other actions
        }
    });
});


// Assuming your existing imports and configurations are set up before this code snippet

// Handle the POST request for confirming add-ons
// app.post('/confirm-addons', (req, res) => {
//     const { passengerCount } = req.body;

//     // Array to store add-on details for each passenger
//     const addOns = [];

//     for (let i = 1; i <= passengerCount; i++) {
//         // Retrieve add-on details for each passenger
//         const seatPreference = req.body[`seatPreference${i}`];
//         const mealPreference = req.body[`mealPreference${i}`];
//         const xlSeatbelt = req.body[`xlSeatbelt${i}`] === 'on'; // Assuming a checkbox returns 'on' if checked
//         const childSeatbelt = req.body[`childSeatbelt${i}`] === 'on';
//         // Store add-on details for the passenger in an object
//         const passengerAddOns = {
//             seatPreference,
//             mealPreference,
//             xlSeatbelt,
//             childSeatbelt
//             // ... add more add-on fields as needed
//         };

//         // Push the add-on details for the passenger to the addOns array
//         addOns.push(passengerAddOns);
//     }
//     const insertAddOnsQuery =
//         'INSERT INTO addons (seat_preference, meal_preference, xl_seatbelt, child_seatbelt) VALUES ?';
//     // Now 'addOns' array contains add-on details for all the passengers
//     // You can process this data as per your requirements (e.g., save to the database, calculate total price, etc.)
//     const addOnsData = addOns.map(addon => [
//         addon.seatPreference,
//         addon.mealPreference,
//         addon.xlSeatbelt,
//         addon.childSeatbelt
//     ]);
    
//     // Example: Log add-on details for each passenger
//     // for (let i = 0; i < addOns.length; i++) {
//     //     console.log(`Add-ons for Passenger ${i + 1}:`, addOns[i]);
//     // }
//     db.query(insertAddOnsQuery, [addOnsData], (err, result) => {
//         if (err) {
//             console.error('Error inserting add-on details:', err);
//             res.status(500).send('An error occurred during add-ons confirmation');
//         } else {
//             res.send('Add-ons confirmed!');
//             // Handle success - Redirect, render a success page, or perform other actions
//         }
//     });

//     // Here you can perform actions such as saving the add-on details to a database, calculating total price, etc.

//     // Send a response back to the client (you can redirect or render a success page)
//     // res.send('Add-ons confirmed!'); // Modify this to your desired success message or redirection
// });

// addons original



// app.post('/confirm-addons', (req, res) => {
//     const { passengerCount } = req.body;

//     // Array to store add-on details for each passenger
//     const addOns = [];

//     for (let i = 1; i <= passengerCount; i++) {
//         // Retrieve add-on details for each passenger
//         const seatPreference = req.body[`seatPreference${i}`];
//         const mealPreference = req.body[`mealPreference${i}`];
//         const xlSeatbelt = req.body[`xlSeatbelt${i}`];
//         const childSeatbelt = req.body[`childSeatbelt${i}`];

//         // Store add-on details for the passenger in an object
//         const passengerAddOns = {
//             seatPreference,
//             mealPreference,
//             xlSeatbelt,
//             childSeatbelt
//         };

//         // Push the add-on details for the passenger to the addOns array
//         addOns.push(passengerAddOns);
//     }

//     const insertAddOnsQuery =
//         'INSERT INTO addons (seat_preference, meal_preference, xl_seatbelt, child_seatbelt) VALUES ?';

//     // Mapping add-ons data for MySQL insertion
//     const addOnsData = addOns.map(addon => [
//         addon.seatPreference,
//         addon.mealPreference,
//         addon.xlSeatbelt,
//         addon.childSeatbelt
//     ]);

//     // Inserting add-ons data into the database
//     db.query(insertAddOnsQuery, [addOnsData], (err, result) => {
//         if (err) {
//             console.error('Error inserting add-on details:', err);
//             res.status(500).send('An error occurred during add-ons confirmation');
//         } else {
//             res.send('Add-ons confirmed!');
//             // Handle success - Redirect, render a success page, or perform other actions
//         }
//     });
// });



// working addons

// Assuming you've already set up your express app and configured your MySQL connection

app.post('/confirm-addons', (req, res) => {
    const { seatPreference, mealPreference, xlSeatbelt, childSeatbelt } = req.body;

    // Prepare the form data into arrays (assuming they are arrays from your form)
    const seatPreferences = Array.isArray(seatPreference) ? seatPreference : [seatPreference];
    const mealPreferences = Array.isArray(mealPreference) ? mealPreference : [mealPreference];
    const xlSeatbelts = Array.isArray(xlSeatbelt) ? xlSeatbelt : [xlSeatbelt];
    const childSeatbelts = Array.isArray(childSeatbelt) ? childSeatbelt : [childSeatbelt];

    // Prepare an array to hold the data for bulk insertion
    const addonsData = [];

    // Make sure all arrays have the same length
    const dataLength = seatPreferences.length;
    if (dataLength === mealPreferences.length &&
        dataLength === xlSeatbelts.length &&
        dataLength === childSeatbelts.length) {

        for (let i = 0; i < dataLength; i++) {
            // Push each set of data as an array into addonsData
            addonsData.push([seatPreferences[i], mealPreferences[i], xlSeatbelts[i], childSeatbelts[i]]);
        }

        // Your MySQL query to insert multiple rows into addons table
        const insertQuery = 'INSERT INTO addons (seat_preference, meal_preference, xl_seatbelt, child_seatbelt) VALUES ?';

        // Execute the query with the prepared data for bulk insertion
        db.query(insertQuery, [addonsData], (err, result) => {
            if (err) {
                console.error('Error inserting add-on details:', err);
                res.status(500).send('An error occurred during add-ons confirmation');
            } else {
                // Calculate the fare after successfully inserting add-on details
                const baseFare = generateRandomNumber(3000, 4000); // Replace with your base fare calculation
                const taxes = generateRandomNumber(200, 500); // Replace with your taxes calculation
                const addons = generateRandomNumber(600, 800); // Replace with your addons calculation

                // Calculate total fare
                const totalFare = baseFare + taxes + addons;

                // Render the fare.ejs template and pass calculated values as variables
                res.render('fare', { baseFare, taxes, addons, totalFare });
            }
        });
    } else {
        res.status(400).send('Form data is inconsistent');
    }
});


function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// app.post('/confirm-addons', (req, res) => {
//     const { passengerCount } = req.body;

//     // Array to store add-on details for each passenger
//     const addOns = [];

//     for (let i = 1; i <= passengerCount; i++) {
//         // Retrieve add-on details for each passenger
//         const seatPreference = req.body[`seatPreference${i}`];
//         const mealPreference = req.body[`mealPreference${i}`];
//         const xlSeatbelt = req.body[`xlSeatbelt${i}`];
//         const childSeatbelt = req.body[`childSeatbelt${i}`];

//         // Store add-on details for the passenger in an object
//         const passengerAddOns = {
//             seatPreference,
//             mealPreference,
//             xlSeatbelt,
//             childSeatbelt
//         };

//         // Push the add-on details for the passenger to the addOns array
//         addOns.push(passengerAddOns);
//     }

//     const insertAddOnsQuery =
//         'INSERT INTO addons (seat_preference, meal_preference, xl_seatbelt, child_seatbelt) VALUES ?';

//     // Mapping add-ons data for MySQL insertion
//     const addOnsData = addOns.map(addon => [
//         addon.seatPreference,
//         addon.mealPreference,
//         addon.xlSeatbelt,
//         addon.childSeatbelt
//     ]);

//     // Inserting add-ons data into the database
//     if (addOnsData.length > 0) {
//         db.query(insertAddOnsQuery, [addOnsData], (err, result) => {
//             if (err) {
//                 console.error('Error inserting add-on details:', err);
//                 res.status(500).send('An error occurred during add-ons confirmation');
//             } else {
//                 res.send('Add-ons confirmed!');
//                 // Handle success - Redirect, render a success page, or perform other actions
//             }
//         });
//     } else {
//         res.send('No add-on details to insert');
//     }
// });

// POST route to handle generating the ticket
app.post('/generate-ticket', (req, res) => {
    // const passengerIds = Array.isArray(req.body.passengerId)
    //     ? req.body.passengerId // If multiple passengerIds are sent as an array
    //     : [req.body.passengerId]; // If a single passengerId is sent

    // const flightId = req.body.flightId; // Assuming flightId is sent from the form

    // // Fetch passenger details from the database using passengerIds
    // const fetchPassengerDetailsQuery = 'SELECT * FROM passenger WHERE id IN (?)';
    // db.query(fetchPassengerDetailsQuery, [passengerIds], (err, passengerData) => {
    //     if (err) {
    //         console.error('Error fetching passenger details:', err);
    //         res.status(500).send('Error fetching passenger details');
    //         return;
    //     }

    //     // Fetch flight details from the database using flightId
    //     db.query('SELECT * FROM flights WHERE id = ?', flightId, (err, flightData) => {
    //         if (err) {
    //             console.error('Error fetching flight details:', err);
    //             res.status(500).send('Error fetching flight details');
    //             return;
    //         }

    //         const flightDetails = flightData[0]; // Assuming a single flight is fetched

    //         // Fetch fare details or retrieve them from the request body
    //         const baseFare = req.body.baseFare; // Example: Fetching base fare from the request body
    //         const taxes = req.body.taxes; // Example: Fetching taxes from the request body
    //         const addons = req.body.addons; // Example: Fetching addons from the request body
    //         const totalFare = req.body.totalFare; // Example: Fetching total fare from the request body

            // Render the ticket.ejs template and pass the fetched and calculated variables
            res.send('Booking confirmed. Your ticket will be sent to you via email.');
    //     });
    // });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

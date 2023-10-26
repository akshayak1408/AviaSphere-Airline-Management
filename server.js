var express = require("express");
var router = express.Router();
var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pra123@bab",
  database: "project",
});
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});
var a=3;

// inserting into register table
router.post('/addPassenger', function (req, res, next) {//inserting name, email and password
    // console.log("hello");
    const PassengerId=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
//   const customerAddress=req.body.address;
//   const custPhone=req.body.c_phone;
//   const custEmail=req.body.email;
//   console.log(PassengerId);
    var query = `insert into register values(${email},'${PassengerId}','${password}')`;
    // var query1= `insert into customer_phone values(${customerId},${custPhone})`;
    // var query2=`insert into customer_email values(${customerId},'${custEmail}');`
    //  console.log(PassengerId);
    connection.query(query, function (err, rows, fields) {
      if (err) throw err;
      // res.json(rows);
      
    });
    // connection.query(query1, function (err, rows, fields) {
    //   if (err) throw err;
    //   // res.json(rows);
    // });
    // connection.query(query2, function (err, rows, fields) {
    //   if (err) throw err;
    //   // res.json(rows);
    //   res.render("index");
    // });
  });
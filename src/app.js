const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");
dotenv.config();

app.use(cors());

// line below to simplify
const queries = require("./queries");

// setup port for deployment or port 3000 as local
const port = process.env.PORT;

// setup for ejs as view engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
// const db = new Pool(dbParams);
// console.log("dbParams: ", dbParams);
// console.log(db);
// db.connect();

app.get("/", (req, res) => {
  let templateVars = { title: "Payments Inc." };
  res.render("home", templateVars);
});

//   res.json({ getUsers });
// });

// app.get("/", (req, res) => res.send("testing123"));

// app.get("/", (req, res) => {
//   const getUsers = queries.getUsers;
//   res.send(getUsers());
// });

// *** this works for database query in queries.js ***
app.get("/test", queries.getUsers);

app.get("/register", (req, res) => {
  // let templateVars = { };
  res.render("register");
});

app.post("/register", (req, res) => {
  // res.send("post to /register");
  console.log(req.body);
  for (let field in req.body) {
    if (!req.body[field]) {
      return res.send("Please fill out all fields");
    }
  }
  var regData = `
    insert into users (first_name, last_name, email, mobile_number, credit_card, password) 
    VALUES ($1), [req.body.first_name]`;
  // console.log(regData);

  // res.render("thank you", {
  //   title: "Data Saved",
  //   message: "Registration successful"
  // });
});

app.get("/login", (req, res) => {
  res.render("login");
  // res.redirect("/transfers");
});

app.get("/transfers", (req, res) => {
  res.render("transfers");
});

app.get("/transfers/new", (req, res) => {
  res.send("transfer form");
});

app.get("/approvals", (req, res) => {
  res.render("approvals");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// line below to simplify
const queries = require("./queries");

// setup port for deployment or port 3000 as local
const port = process.env.PORT; // || 3000
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

// app.get("/", (req, res) => {
//   //   // res.send("home page");

//   const getUsers = queries.getUsers;
//   //   // console.log(getUsers());

//   res.json({ getUsers });
// });

// *** this works ***
app.get("/", queries.getUsers);

// app.get("/", (req, res) => res.send("testing123"));

// app.get("/", (req, res) => {
//   const getUsers = queries.getUsers;
//   res.send(getUsers());
// });

app.get("/register", (req, res) => {
  res.send("registration page");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.send("post to /register");
});

app.get("/login", (req, res) => {
  res.send("login page");
});

app.get("/transfers", (req, res) => {
  res.send("transfers status page");
});

app.get("/transfers/new", (req, res) => {
  res.send("transfer form");
});

app.get("/approvals", (req, res) => {
  res.send("List of approvals");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

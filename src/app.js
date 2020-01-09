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

// *** this works for database query in queries.js ***
// app.get("/test", queries.getUsers);

// to serve up hardcoded data:
// app.get("/test", (req, res) => {
//   res.json({ name: "Jon", age: "40" });
// });

// ** the right pattern
app.get("/test", (req, res) => {
  queries.getUsers().then(data => res.json(data.rows));
});

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
  let formInputs = req.body;
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    credit_card,
    password
  } = formInputs;

  // queries.createUser(formInputs).then(data => res.json(data.rows));
  queries.createUser(formInputs);
  res.render("thankyou", {
    title: `Thank you ${first_name}!`,
    message1: "Registration successful",
    message2: "Please Select from options above"
  });
});

// app.post("/register", queries.createUser);

app.get("/login", (req, res) => {
  res.render("login");
  // res.redirect("/transfers");
});

app.get("/transfers", (req, res) => {
  queries.getTransfers().then(data => res.json(data.rows));
  // res.render("transfers");
});

app.get("/transfers/new", (req, res) => {
  res.render("transfer-form");
});

app.post("/transfers", (req, res) => {
  console.log("transfer form inputs: ", req.body);
  let TransferFormInputs = req.body;
  const {
    first_name,
    last_name,
    email,
    bank_name,
    transit_number,
    routing_number,
    amount
  } = TransferFormInputs;

  queries.createTransfer(TransferFormInputs);
  res.render("thankyou", {
    title: `Thank you. You have sent ${amount} to ${first_name}`,
    message1: `email to ${email} has been sent`,
    message2: "Please Select from options above"
  });
});

app.get("/approvals", (req, res) => {
  res.render("approvals");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

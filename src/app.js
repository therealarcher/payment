const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

// all queries in this file
const queries = require("./queries");

// setup port for deployment or port 3000 as local
const port = process.env.PORT;

// setup for ejs as view engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// app.use(express.json());

// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
// const db = new Pool(dbParams);
// console.log("dbParams: ", dbParams);
// console.log(db);
// db.connect();

app.get("/", (req, res) => {
  let templateVars = {
    title: "Payments Inc.",
    username: req.cookies["username"]
  };
  res.render("home", templateVars);
});

// *** this works for database query in queries.js ***
// app.get("/test", queries.getUsers);

// to serve up hardcoded data:
// app.get("/test", (req, res) => {
//   res.json({ name: "Jon", age: "40" });
// });

// ** working pattern
app.get("/test", (req, res) => {
  queries.getUsers().then(data => res.json(data.rows));
});

app.get("/register", (req, res) => {
  let templateVars = { username: req.cookies["username"] };
  res.render("register", templateVars);
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
  res.cookie("username", req.body.email);
  res.render("thankyou", {
    title: `Thank you ${first_name}!`,
    message1: "Registration successful",
    message2: "Please Select from options above"
  });
});

// app.post("/register", queries.createUser);

app.get("/login", (req, res) => {
  let templateVars = { username: req.cookies["username"] };
  res.render("login", templateVars);
  // res.redirect("/transfers");
});

app.post("/login", (req, res) => {
  console.log(req.body.email);
  let loginInputs = req.body;
  const { email, password } = loginInputs;
  // console.log(email, password);
  // console.log(req.cookies);

  res.cookie("username", req.body.email);
  let templateVars = { username: req.cookies["username"] };

  // console.log(username);
  res.render("thankyou", {
    title: "Thank you",
    message1: "Login successful",
    message2: "Please select from options above"
  });
});

// getting a unhandled promise rejection.
app.get("/transfers", (req, res) => {
  let templateVars = { username: req.cookies["username"] };
  // let transferData = queries.getTransfers().then(data => res.json(data.rows));
  res.render("transfers", { templateVars });
});

app.get("/transfers/new", (req, res) => {
  let templateVars = { username: req.cookies["username"] };
  res.render("transfer-form", templateVars);
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
  let templateVars = { username: req.cookies["username"] };
  res.render("approvals", templateVars);
});

app.post("/logout", (req, res) => {
  let templateVars = { username: req.cookies["username"] };
  // req.cookies = null;
  res.clearCookie("username", req.body.email);
  res.redirect("/login");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

const express = require("express");

const app = express();
// setup port for deployment or port 3000 as local
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home page");
});

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

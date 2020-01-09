require("dotenv").config();

const Pool = require("pg").Pool;
const dbParams = require("../lib/db.js");
const pool = new Pool(dbParams);
// console.log(dbParams);

const test = () => "hellotesting";

const getUsers = () => pool.query(`SELECT * FROM users`);

const createUser = inputs => {
  // const { first_name, last_name, email } = req.body;
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    credit_card,
    password
  } = inputs;

  pool.query(
    "INSERT INTO users (first_name, last_name, email, mobile_number, credit_card, password) VALUES ($1, $2, $3, $4, $5, $6)",
    [first_name, last_name, email, mobile_number, credit_card, password]
  );
};

const createTransfer = inputs => {
  const {
    first_name,
    last_name,
    email,
    bank_name,
    transit_number,
    routing_number,
    amount
  } = inputs;

  pool.query(
    "INSERT INTO user_transfers (first_name, last_name, email, bank_name, transit_number, routing_number, amount) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      first_name,
      last_name,
      email,
      bank_name,
      transit_number,
      routing_number,
      amount
    ]
  );
};

const getTransfers = () => {
  return pool.query(
    `SELECT first_name, last_name, amount, accepted FROM user_transfers`
  );
};
// const createUser = (req, res) => {
//   const { first_name, last_name, email } = req.body;

//   pool.query(
//     "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)",
//     [first_name, last_name, email],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       console.log(results);
//       res.status(201).send(`User added`);
//     }
//   );
// };

// const getUsers = (req, res) => {
//   pool.query("SELECT * FROM users", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// const getUsers = () => {
//   pool.query("SELECT * FROM users", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     console.log(results.rows[0]);
//     let usersObj = results.rows;
//     return usersObj;
//   });
// };

// const getUsers = results => {
//   pool.query("SELECT * FROM users").then(res => res.rows);
// };

// const getUsers = () => console.log("testing234");

// const getUsers = db
//   .query(
//     `
//   SELECT * FROM users;
// `
//   )
//   .then(res => {
//     return res.rows;
//   })
//   .catch(err => console.error("query error", err.stack));

// const getUsers = () => "testing123";

module.exports = { getUsers, createUser, createTransfer, getTransfers, test };

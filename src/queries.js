require("dotenv").config();

const Pool = require("pg").Pool;
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
// console.log(dbParams);

const getUsers = (request, response) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// const getUsers = db.query("SELECT * FROM users", (error, results) => {
//   if (error) {
//     throw error;
//   }
//   // console.log(results.rows);
//   return results.rows;
// });

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

module.exports = { getUsers };

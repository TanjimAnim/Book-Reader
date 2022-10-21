const dotenv = require("dotenv");

//connection to postgres database

const Pool = require("pg").Pool;
dotenv.config({ path: "../../.env" }); //getting env variables

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = pool;

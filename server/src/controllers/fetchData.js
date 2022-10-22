//api to get all users. for testing purpose.

const pool = require("../configs/db");

const fetchData = (request, response, next) => {
  pool.query(
    "SELECT * FROM accounts ORDER BY user_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = fetchData;

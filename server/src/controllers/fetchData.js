//api to get all user data

const pool = require("../configs/db");

const fetchData = async (req, res, next) => {
  const { email } = req.body;

  pool.query(
    `SELECT email,username FROM accounts WHERE email= $1;`,
    [email],
    (error, results) => {
      if (error) {
        next(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = fetchData;

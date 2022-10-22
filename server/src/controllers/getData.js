//api to get books

const pool = require("../configs/db");

const fetchData = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await pool.query(
      `SELECT email,user_id FROM accounts WHERE email= $1;`,
      [email]
    );

    if (existingUser.rows.length === 0) {
      throw new Error("user not found");
    } else {
      pool.query(
        `SELECT * FROM books where user_id=$1`,
        [existingUser.rows[0].user_id],
        (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              error: "Database error",
            });
          }
          res.json(data.rows);
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = fetchData;

const pool = require("../configs/db");

const logout = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await pool.query(
      `SELECT email,user_id,token FROM accounts WHERE email= $1;`,
      [email]
    );

    if (existingUser.rows[0].token) {
      await pool.query(
        `UPDATE accounts SET token='' WHERE user_id=$1 AND email=$2`,
        [existingUser.rows[0].user_id, existingUser.rows[0].email]
      );
      res.json({ message: "user logged out" });
    } else {
      throw new Error("this user is already logged out");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = logout;

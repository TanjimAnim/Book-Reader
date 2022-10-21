const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../configs/db");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingEmail = await pool.query(
      `SELECT email,password FROM accounts where email=$1`,
      [email]
    );
    if (
      existingEmail.rows.length != 0 &&
      (await bcrypt.compare(password, existingEmail.rows[0].password))
    ) {
      const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: "90d",
      });
      await pool.query(`UPDATE accounts SET token=$1 WHERE email=$2`, [
        token,
        existingEmail.rows[0].email,
      ]);

      return res.status(200).json({
        message: "user has signed in",
        email: `${email}`,
        token: `${token}`,
      });
    } else {
      res.status(400).json({
        error: "Password or Email is incorrect! Please try again",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = signin;

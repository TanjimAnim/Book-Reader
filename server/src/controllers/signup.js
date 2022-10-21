var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../configs/db");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //checking if the input are not empty
    if (!(email && password && username)) {
      return res.status(400).send("All inputs are required");
    }

    const existingEmail = await pool.query(
      `SELECT email FROM accounts WHERE email= $1;`,
      [email]
    );

    //checking if email does exist in database
    if (existingEmail.rows.length === 0) {
      const userToken = jwt.sign({ email: email }, process.env.SECRET, {
        expiresIn: "90d",
      });

      let hashedPassword = await bcrypt.hash(password, 8);
      pool.query(
        `INSERT INTO accounts (username, email, password, token) VALUES ($1,$2,$3,$4);`,
        [username, email, hashedPassword, userToken],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              error: "Database error",
            });
          } else {
            res.status(200).send({
              message: "User added to database",
              username: username,
              token: `${userToken}`,
            });
          }
        }
      );
    } else {
      return res
        .status(400)
        .send(
          "Email has already been registered. Please try again with another email"
        );
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = signup;

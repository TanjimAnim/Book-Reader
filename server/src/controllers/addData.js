//api to add books

const pool = require("../configs/db");

//slug package for making book name slugs
var slug = require("slug");

const addData = async (req, res, next) => {
  try {
    const { email, book_name, year, book_author } = req.body;

    //checking input
    if (
      book_name === undefined ||
      book_name === "" ||
      typeof book_name !== "string"
    ) {
      throw new Error("Error in book name");
    }
    if (
      year === undefined ||
      year === "" ||
      typeof parseInt(year) !== "number"
    ) {
      throw new Error("Error in year");
    }
    if (
      book_author === undefined ||
      book_author === "" ||
      typeof book_author !== "string"
    ) {
      throw new Error("Error in author");
    }
    const book_slug = slug(`${book_name}`);
    console.log(book_slug);

    const existingUser = await pool.query(
      `SELECT email,user_id FROM accounts WHERE email= $1;`,
      [email]
    );

    console.log(existingUser.rows);

    if (existingUser.rows.length === 0) {
      throw new Error("user not found");
    } else {
      pool.query(
        `INSERT INTO books(book_name, year, book_author,user_id,book_slug) VALUES ($1,$2,$3,$4,$5);`,
        [
          book_name,
          parseInt(year),
          book_author,
          existingUser.rows[0].user_id,
          book_slug,
        ],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              error: "Database error",
            });
          } else {
            res.status(200).send({
              message: "Book added",
            });
          }
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = addData;

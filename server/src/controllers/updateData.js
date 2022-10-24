const pool = require("../configs/db");

var slug = require("slug");

const updateData = async (req, res, next) => {
  try {
    const { email, book_name, year, book_author, book_id } = req.body;

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
    if (
      book_id === undefined ||
      book_id === "" ||
      typeof parseInt(book_id) !== "number"
    ) {
      throw new Error("Error in book_id");
    }

    const existingUser = await pool.query(
      `SELECT email,user_id FROM accounts WHERE email= $1;`,
      [email]
    );

    console.log(existingUser.rows);

    const getBookData = await pool.query(
      `SELECT * FROM books WHERE book_id=$1 AND user_id=$2`,
      [book_id, existingUser.rows[0].user_id]
    );

    console.log(getBookData.rows);

    if (getBookData.rows.length === 0) {
      throw new Error("book not found");
    } else {
      const book_slug = slug(`${book_name}`);
      console.log(book_slug);
      pool.query(
        `UPDATE books SET book_name=$1,year=$2,book_author=$3,book_slug=$4 WHERE book_id=$5 AND user_id=$6`,
        [
          book_name,
          parseInt(year),
          book_author,
          book_slug,
          getBookData.rows[0].book_id,
          existingUser.rows[0].user_id,
        ],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              error: "Database error",
            });
          } else {
            res.status(200).send({
              message: "book updated",
              book_name: `${book_name}`,
              year: `${year}`,
              book_author: `${book_author}`,
              book_slug: `${book_slug}`,
              book_id: `${getBookData.rows[0].book_id}`,
              user_id: `${existingUser.rows[0].user_id}`,
            });
          }
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateData;

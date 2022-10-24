//api to update summary

const pool = require("../configs/db");

const updateSummary = async (req, res, next) => {
  try {
    const { email, book_summary, book_id } = req.body;

    //checking input
    if (
      book_summary === undefined ||
      book_summary === "" ||
      typeof book_summary !== "string"
    ) {
      throw new Error("Error in book summary");
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
      pool.query(
        `UPDATE books SET book_summary=$1 WHERE book_id=$2 AND user_id=$3`,
        [
          book_summary,
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
              message: "summary updated",
              book_summary: `${book_summary}`,
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

module.exports = updateSummary;

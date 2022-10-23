//api to get books
const pool = require("../configs/db");

const deleteData = async (req, res, next) => {
  try {
    const { email, book_id } = req.body;

    if (
      book_id === "" ||
      book_id === undefined ||
      typeof parseInt(book_id) !== "number"
    ) {
      throw new Error("Error in book");
    }

    const existingUser = await pool.query(
      `SELECT email,user_id FROM accounts WHERE email= $1;`,
      [email]
    );

    const getBookData = await pool.query(
      `SELECT * FROM books WHERE book_id=$1 AND user_id=$2`,
      [book_id, existingUser.rows[0].user_id]
    );

    if (getBookData.rows.length === 0) {
      throw new Error("book not found");
    } else {
      await pool.query(`DELETE FROM books WHERE book_id=$1 AND user_id=$2`, [
        book_id,
        existingUser.rows[0].user_id,
      ]);
      res.json({ message: "Book deleted" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteData;

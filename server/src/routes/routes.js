const express = require("express");
const router = express.Router();

//importing dotenv file
require("dotenv").config();

//import controllers
const fetchData = require("../controllers/fetchData");
const signin = require("../controllers/signin");
const signup = require("../controllers/signup");
const auth = require("../middlewares/auth");
const addData = require("../controllers/addData");
const getData = require("../controllers/getData");
const deleteData = require("../controllers/deleteData");
const addFavorite = require("../controllers/addFavorite");
const removeFavorite = require("../controllers/removeFavorite");
const logout = require("../controllers/logout");
const updateData = require("../controllers/updateData");
const updateSummary = require("../controllers/updateSummary");

//route to get user data
router.get("/fetch-data", auth, fetchData);

//signup or registration of user
router.post("/signup", signup);

//signin of user
router.post("/signin", signin);

//adding books to database
router.post("/add-books", auth, addData);

//getting books
router.get("/get-books", auth, getData);

//deleting books
router.post("/delete-book", auth, deleteData);

//add a book as favorite
router.post("/add-favorite", auth, addFavorite);

//remove a book from favorite
router.post("/remove-favorite", auth, removeFavorite);

//logout api
router.post("/logout", auth, logout);

//update book data
router.post("/update-book", auth, updateData);

//update book summary
router.post("/update-summary", auth, updateSummary);

module.exports = router;

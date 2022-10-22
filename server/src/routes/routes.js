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

//example route to get all userdata
router.get("/", fetchData);

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

module.exports = router;

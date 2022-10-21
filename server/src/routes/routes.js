const express = require("express");
const router = express.Router();

//importing dotenv file
require("dotenv").config();

//import controllers
const fetchData = require("../controllers/fetchData");
const signin = require("../controllers/signin");
const signup = require("../controllers/signup");

//example route to get all userdata
router.get("/", fetchData);

//signup or registration of user
router.post("/signup", signup);

//signin of user
router.post("/signin", signin);

module.exports = router;

const express = require("express");
const router = express.Router();
const { marks } = require("../controller/controller.js");

/* GET home page. */
router.get("/", marks);

module.exports = router;

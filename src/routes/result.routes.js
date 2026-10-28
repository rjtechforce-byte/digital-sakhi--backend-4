const express = require("express");
const router = express.Router();
const getExamResult = require("../controllers/getExamResult");

router.get("/exam/result/:submitId", getExamResult.getResult );

module.exports = router;



const express = require("express");
const router = express.Router();

const { getAllUsersData } = require("../controllers/admin.controller");
const adminAuth = require("../middleware/adminAuth");

router.get("/users", adminAuth, getAllUsersData);

module.exports = router;

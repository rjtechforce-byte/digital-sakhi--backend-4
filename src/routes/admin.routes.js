

const express = require("express");
const router = express.Router();

const { getAllUsersData } = require("../controllers/admin.controller");
const adminAuth = require("../middleware/adminAuth");
const { getBlocks } = require("../controllers/admin.controller");


router.get("/users", adminAuth, getAllUsersData);
router.get("/blocks", adminAuth, getBlocks);

module.exports = router;

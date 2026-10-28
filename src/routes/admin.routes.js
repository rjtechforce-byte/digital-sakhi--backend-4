

const express = require("express");
const router = express.Router();

const { getAllUsersData } = require("../controllers/admin.controller");
const adminAuth = require("../middleware/adminAuth");
const { getBlocks } = require("../controllers/admin.controller");


// Admin login check: sirf password verify, database ko touch nahi karta
router.get("/admin/verify", adminAuth, (req, res) => {
  res.json({ ok: true });
});

router.get("/users", adminAuth, getAllUsersData);
router.get("/blocks", adminAuth, getBlocks);

module.exports = router;

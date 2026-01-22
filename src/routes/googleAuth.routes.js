const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const oauth2Client = require("../config/googleSheet");

// Step 1: Google login
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/spreadsheets"],
    prompt: "consent",
  });
  res.redirect(url);
});

// Step 2: Google callback
router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // TEMP: token in memory (production me file/db me save karna)
    console.log("✅ Google OAuth connected");

    res.send("Google Sheets connected successfully. You can close this tab.");
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).send("Google OAuth failed");
  }
});

module.exports = router;

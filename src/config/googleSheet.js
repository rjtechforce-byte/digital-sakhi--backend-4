const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GS_CLIENT_EMAIL,
    private_key: process.env.GS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

module.exports = sheets;

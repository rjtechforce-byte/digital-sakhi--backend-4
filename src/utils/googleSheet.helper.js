
const { google } = require("googleapis");
const oauth2Client = require("../config/googleSheet");

const sheets = google.sheets({
  version: "v4",
  auth: oauth2Client,
});

const SPREADSHEET_ID = process.env.GS_SHEET_ID;


async function addRowToSheet(row) {
  if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
    console.warn("⚠️ Google OAuth token not found, skipping sheet write");
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          row.name || "",
          row.phone || "",
          row.email || "",
          row.address || "",
          row.score || "",
          row.result || "",
          row.certificateUrl || "",
          new Date().toLocaleString(),
        ],
      ],
    },
  });
}

module.exports = { addRowToSheet };


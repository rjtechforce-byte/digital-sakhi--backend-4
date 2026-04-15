const { google } = require("googleapis");
const oauth2Client = require("../config/googleSheet");

const sheets = google.sheets({
  version: "v4",
  auth: oauth2Client,
});

const SPREADSHEET_ID = process.env.GS_SHEET_ID;

// 🔥 NEW FUNCTION (UPGRADE)
async function upsertRowToSheet(row) {
  try {
    if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
      console.warn("⚠️ Google OAuth token not found, skipping sheet write");
      return;
    }

    // 🔹 Step 1: Get all rows
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:I",
    });

    const rows = res.data.values || [];

    // 🔹 Step 2: Find row by EMAIL (index 2)
    const rowIndex = rows.findIndex(r => r[2] === row.email);

    const newRow = [
      row.name || "",
      row.phone || "",
      row.email || "",
      row.address || "",
      row.block || "",
      row.score || "",
      row.result || "",
      row.certificateUrl || "",
      new Date().toLocaleString(),
    ];

    if (rowIndex !== -1) {
      // ✅ UPDATE EXISTING ROW
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A${rowIndex + 1}:I${rowIndex + 1}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [newRow],
        },
      });

      console.log("✅ Sheet row updated");
    } else {
      // ✅ INSERT NEW ROW
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [newRow],
        },
      });

      console.log("✅ New row added to sheet");
    }

  } catch (err) {
    console.error("❌ Sheet upsert error:", err.message);
  }
}

module.exports = { upsertRowToSheet };


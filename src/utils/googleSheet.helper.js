const { google } = require("googleapis");
const oauth2Client = require("../config/googleSheet");

const sheets = google.sheets({
  version: "v4",
  auth: oauth2Client,
});

const SPREADSHEET_ID = process.env.GS_SHEET_ID;

async function upsertRowToSheet(row) {
  try {
    console.log("🔥 Sheet function called for:", row.email);

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:I",
    });

    const rows = res.data.values || [];
    console.log("📊 Rows fetched:", rows.length);

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
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A${rowIndex + 1}:I${rowIndex + 1}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [newRow] },
      });

      console.log("✅ Sheet row updated");
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [newRow] },
      });

      console.log("✅ New row added to sheet");
    }

  } catch (err) {
    console.error("❌ Sheet upsert error:", err.message);
  }
}

module.exports = { upsertRowToSheet };

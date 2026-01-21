const sheets = require("../config/googleSheet");

const SPREADSHEET_ID = process.env.GS_SHEET_ID;

async function addRowToSheet(row) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        row.name,
        row.phone,
        row.email,
        row.address,
        row.score || "",
        row.result || "",
        row.certificateUrl || "",
        new Date().toLocaleString()
      ]]
    }
  });
}

module.exports = { addRowToSheet };

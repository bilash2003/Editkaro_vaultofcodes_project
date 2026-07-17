

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.formType === "subscribe") {
    const sheet = getOrCreateSheet(ss, "Subscribers", ["Timestamp", "Email"]);
    sheet.appendRow([data.submittedAt, data.email]);
  } else if (data.formType === "contact") {
    const sheet = getOrCreateSheet(ss, "Contact", ["Timestamp", "Name", "Email", "Phone", "Category", "Message"]);
    sheet.appendRow([data.submittedAt, data.name, data.email, data.phone, data.category, data.message]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name, headerRow) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headerRow);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  const data = {};
  e.postData.contents.split("&").forEach(pair => {
    let [key, val] = pair.split("=");
    data[decodeURIComponent(key)] = decodeURIComponent(val.replace(/\+/g, " "));
  });
  sheet.appendRow([new Date(), data.name, data.email, data.mobile, data.whatsapp, data.address, data.products]);
  MailApp.sendEmail("youradmin@email.com", "🛒 New Order", JSON.stringify(data, null, 2));
  MailApp.sendEmail(data.email, "✅ Order Confirmation", "Thanks " + data.name + ", we got your order!");
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
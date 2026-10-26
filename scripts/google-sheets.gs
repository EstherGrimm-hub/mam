function doPost(event) {
  const payload = JSON.parse(event.postData.contents || "{}");
  const properties = PropertiesService.getScriptProperties();
  if (!payload.secret || payload.secret !== properties.getProperty("WEBHOOK_SECRET")) {
    return json_({ success: false, error: "Unauthorized" });
  }

  const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) return json_({ success: false, error: "Missing spreadsheet configuration" });
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("Đơn hàng") || spreadsheet.insertSheet("Đơn hàng");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Mã đơn", "Ngày tạo", "Họ tên", "SĐT", "Tỉnh/thành", "Quận/huyện", "Phường/xã", "Địa chỉ", "Thanh toán", "Sản phẩm", "Tạm tính", "Vận chuyển", "Tổng", "Ghi chú", "Trạng thái"]);
  }

  if (payload.action === "lookupOrder") {
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return json_({ found: false });
    const rows = sheet.getRange(2, 1, lastRow - 1, 15).getValues();
    const match = rows.find((row) => String(row[0]) === payload.orderId && normalizePhone_(row[3]) === normalizePhone_(payload.phone));
    return json_(match ? { found: true, status: match[14] || "Đã tiếp nhận" } : { found: false });
  }

  if (payload.action !== "createOrder" || !payload.orderId || !payload.customer) {
    return json_({ success: false, error: "Invalid order payload" });
  }

  const customer = payload.customer;
  const itemSummary = (payload.items || []).map((item) => `${item.name} × ${item.quantity} (${item.lineTotal}đ)`).join("; ");
  sheet.appendRow([
    payload.orderId,
    payload.createdAt,
    customer.name,
    customer.phone,
    customer.province,
    customer.district,
    customer.ward,
    customer.address,
    payload.paymentMethod,
    itemSummary,
    payload.subtotal,
    payload.shipping,
    payload.total,
    customer.note,
    "Đã tiếp nhận",
  ]);
  return json_({ success: true });
}

function normalizePhone_(value) {
  const phone = String(value || "").replace(/[ .-]/g, "");
  if (phone.indexOf("+84") === 0) return "0" + phone.slice(3);
  if (phone.indexOf("84") === 0) return "0" + phone.slice(2);
  return phone;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
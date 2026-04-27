const { summarizeCart } = require("../lib/store");
const { sendJson } = require("./_lib/response");

module.exports = (req, res) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { message: "Method not allowed" });
    return;
  }

  try {
    const summary = summarizeCart(req.body?.items || []);
    sendJson(res, 200, summary);
  } catch (error) {
    sendJson(res, 400, { message: "No se pudo procesar el carrito." });
  }
};

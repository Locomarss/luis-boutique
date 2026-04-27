const { getProductById } = require("../lib/store");
const { sendJson } = require("./_lib/response");

module.exports = (req, res) => {
  const product = getProductById(req.query?.id);

  if (!product) {
    sendJson(res, 404, { message: "Producto no encontrado" });
    return;
  }

  sendJson(res, 200, { product });
};

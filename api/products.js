const { getProducts } = require("../lib/store");
const { sendJson } = require("./_lib/response");

module.exports = (req, res) => {
  const category = req.query?.category || null;
  sendJson(res, 200, { products: getProducts(category) });
};

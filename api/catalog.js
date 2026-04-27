const { getCatalog } = require("../lib/store");
const { sendJson } = require("./_lib/response");

module.exports = (req, res) => {
  sendJson(res, 200, getCatalog());
};

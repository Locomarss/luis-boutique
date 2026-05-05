const { getLiveCatalog, saveLiveCatalog } = require("../../lib/live-catalog");
const { sendJson } = require("../_lib/response");

async function parseBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      sendJson(res, 200, await getLiveCatalog());
      return;
    }

    if (req.method === "POST") {
      const body = await parseBody(req);
      if (!body.catalog) {
        sendJson(res, 400, { message: "Falta el catalogo a publicar." });
        return;
      }
      sendJson(res, 200, await saveLiveCatalog(body.catalog));
      return;
    }

    sendJson(res, 405, { message: "Metodo no permitido." });
  } catch (error) {
    sendJson(res, 500, { message: error.message || "No se pudo procesar la solicitud live." });
  }
};

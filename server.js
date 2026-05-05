const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const {
  getCatalog,
  getProducts,
  getProductById,
  getCategories,
  summarizeCart,
} = require("./lib/store");
const { getLiveCatalog, saveLiveCatalog } = require("./lib/live-catalog");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const stream = fs.createReadStream(filePath);

  stream.on("error", () => {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  });

  res.writeHead(200, { "Content-Type": contentType });
  stream.pipe(res);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 25_000_000) {
        reject(new Error("Body too large"));
      }
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

async function handleApi(req, res, parsedUrl) {
  const pathname = parsedUrl.pathname;

  if (req.method === "GET" && pathname === "/api/products") {
    const category = parsedUrl.searchParams.get("category");
    sendJson(res, 200, { products: getProducts(category) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/catalog") {
    sendJson(res, 200, getCatalog());
    return true;
  }

  if (req.method === "GET" && pathname === "/api/live/catalog") {
    try {
      sendJson(res, 200, await getLiveCatalog());
    } catch (error) {
      sendJson(res, 500, { message: error.message || "No se pudo cargar el catalogo live." });
    }
    return true;
  }

  if (req.method === "GET" && pathname.startsWith("/api/products/")) {
    const id = pathname.replace("/api/products/", "");
    const product = getProductById(id);

    if (!product) {
      sendJson(res, 404, { message: "Producto no encontrado" });
      return true;
    }

    sendJson(res, 200, { product });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/categories") {
    sendJson(res, 200, { categories: getCategories() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/cart") {
    try {
      const body = await parseBody(req);
      const summary = summarizeCart(body.items || []);
      sendJson(res, 200, summary);
    } catch (error) {
      sendJson(res, 400, { message: "No se pudo procesar el carrito." });
    }
    return true;
  }

  if (req.method === "POST" && pathname === "/api/live/catalog") {
    try {
      const body = await parseBody(req);
      if (!body.catalog) {
        sendJson(res, 400, { message: "Falta el catalogo a publicar." });
        return true;
      }
      sendJson(res, 200, await saveLiveCatalog(body.catalog));
    } catch (error) {
      sendJson(res, 500, { message: error.message || "No se pudo guardar el catalogo live." });
    }
    return true;
  }

  return false;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const isApi = parsedUrl.pathname.startsWith("/api/");

  if (isApi) {
    const handled = await handleApi(req, res, parsedUrl);
    if (!handled) {
      sendJson(res, 404, { message: "Ruta no encontrada" });
    }
    return;
  }

  const safePath =
    parsedUrl.pathname === "/"
      ? path.join(ROOT, "index.html")
      : path.join(ROOT, parsedUrl.pathname.replace(/^\/+/, ""));

  const resolvedPath = path.resolve(safePath);

  if (!resolvedPath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(resolvedPath)) {
    const stats = fs.statSync(resolvedPath);
    if (stats.isFile()) {
      sendFile(res, resolvedPath);
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(resolvedPath, "index.html");
      if (fs.existsSync(indexPath)) {
        sendFile(res, indexPath);
        return;
      }
    }
  }

  if (parsedUrl.pathname === "/owner" || parsedUrl.pathname === "/owner/") {
    const ownerIndex = path.join(ROOT, "owner", "index.html");
    if (fs.existsSync(ownerIndex)) {
      sendFile(res, ownerIndex);
      return;
    }
  }

  if (parsedUrl.pathname === "/nosotros") {
    const aboutPath = path.join(ROOT, "nosotros.html");
    if (fs.existsSync(aboutPath)) {
      sendFile(res, aboutPath);
      return;
    }
  }

  if (parsedUrl.pathname === "/tienda") {
    const storePath = path.join(ROOT, "index.html");
    if (fs.existsSync(storePath)) {
      sendFile(res, storePath);
      return;
    }
  }

  if (parsedUrl.pathname === "/") {
    sendFile(res, path.join(ROOT, "index.html"));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`LUIS BOUTIQUE running at http://localhost:${PORT}`);
});

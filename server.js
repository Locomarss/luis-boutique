const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const {
  getProducts,
  getProductById,
  getCategories,
  summarizeCart,
} = require("./lib/store");

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
      if (body.length > 1_000_000) {
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

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    sendFile(res, resolvedPath);
    return;
  }

  sendFile(res, path.join(ROOT, "index.html"));
});

server.listen(PORT, () => {
  console.log(`LUIS BOUTIQUE running at http://localhost:${PORT}`);
});

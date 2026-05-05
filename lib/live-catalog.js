const fs = require("fs");
const path = require("path");

const LOCAL_CATALOG_PATH = path.join(__dirname, "..", "data", "catalog.json");
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_TABLE = process.env.SUPABASE_CATALOG_TABLE || "lb_catalog";
const SUPABASE_ROW_ID = process.env.SUPABASE_CATALOG_ROW_ID || "catalog";

function getLocalCatalog() {
  return JSON.parse(fs.readFileSync(LOCAL_CATALOG_PATH, "utf8"));
}

function saveLocalCatalog(catalog) {
  const updatedAt = new Date().toISOString();
  const payload = {
    ...catalog,
    updatedAt
  };

  fs.writeFileSync(LOCAL_CATALOG_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return {
    catalog: payload,
    remote: false,
    mode: "local-file",
    message: "Cambios guardados solo en este equipo. Otros dispositivos no veran esto hasta conectar un backend en la nube.",
    updatedAt
  };
}

function isSupabaseEnabled() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseRequest(method, query, body) {
  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}${query || ""}`;
  const response = await fetch(url, {
    method,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation,resolution=merge-duplicates"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  let payload = {};

  try {
    payload = text ? JSON.parse(text) : {};
  } catch (error) {
    payload = { message: text || "Respuesta invalida de Supabase." };
  }

  if (!response.ok) {
    throw new Error(payload.message || payload.error_description || "No se pudo conectar con Supabase.");
  }

  return payload;
}

async function getLiveCatalog() {
  if (!isSupabaseEnabled()) {
    return {
      catalog: getLocalCatalog(),
      remote: false,
      mode: "local-fallback",
      message: "Supabase aun no esta configurado en el servidor. Los cambios que guardes aqui solo se reflejan en este equipo.",
      updatedAt: null
    };
  }

  const rows = await supabaseRequest("GET", `?id=eq.${encodeURIComponent(SUPABASE_ROW_ID)}&select=id,payload,updated_at`);
  const row = Array.isArray(rows) ? rows[0] : null;

  if (!row || !row.payload) {
    const seeded = await saveLiveCatalog(getLocalCatalog());
    return {
      catalog: seeded.catalog,
      remote: true,
      mode: "supabase",
      message: "Catalogo inicial subido a Supabase.",
      updatedAt: seeded.updatedAt
    };
  }

  return {
    catalog: row.payload,
    remote: true,
    mode: "supabase",
    message: "Catalogo servido desde Supabase.",
    updatedAt: row.updated_at || row.payload.updatedAt || null
  };
}

async function saveLiveCatalog(catalog) {
  if (!isSupabaseEnabled()) {
    return saveLocalCatalog(catalog);
  }

  const updatedAt = new Date().toISOString();
  const payload = {
    ...catalog,
    updatedAt
  };

  const rows = await supabaseRequest("POST", "", [
    {
      id: SUPABASE_ROW_ID,
      payload,
      updated_at: updatedAt
    }
  ]);

  const row = Array.isArray(rows) ? rows[0] : null;

  return {
    catalog: row && row.payload ? row.payload : payload,
    remote: true,
    mode: "supabase",
    message: "Cambios guardados en Supabase.",
    updatedAt: row && row.updated_at ? row.updated_at : updatedAt
  };
}

module.exports = {
  getLocalCatalog,
  saveLocalCatalog,
  getLiveCatalog,
  saveLiveCatalog,
  isSupabaseEnabled,
  SUPABASE_TABLE,
  SUPABASE_ROW_ID
};

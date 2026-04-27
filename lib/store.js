const fs = require("fs");
const path = require("path");

const catalogPath = path.join(__dirname, "..", "data", "catalog.json");

function readCatalog() {
  return JSON.parse(fs.readFileSync(catalogPath, "utf8"));
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function getProducts(category) {
  const catalog = readCatalog();
  const products = catalog.products.map((product) => ({
    ...product,
    priceLabel: formatMoney(product.price),
    originalPriceLabel: formatMoney(product.originalPrice)
  }));

  if (!category || category === "todos") {
    return products;
  }

  if (category === "nuevo") {
    return products.filter((product) => product.isNewArrival || product.status === "new");
  }

  if (category === "ofertas") {
    return products.filter((product) => product.status === "sale" || product.status === "offer");
  }

  return products.filter((product) => product.category === category);
}

function getProductById(id) {
  return getProducts().find((product) => product.id === id || product.slug === id) || null;
}

function getCategories() {
  const catalog = readCatalog();
  return catalog.categories;
}

function getCatalog() {
  return readCatalog();
}

function summarizeCart(items = []) {
  const catalog = readCatalog();
  const detailedItems = items
    .map((item) => {
      const product = catalog.products.find((entry) => entry.id === item.productId);
      if (!product) return null;

      const color = product.colors.find((entry) => entry.id === item.colorId) || product.colors[0];
      const size = product.sizes.find((entry) => entry.label === item.sizeLabel) || product.sizes[0];
      const quantity = Math.max(1, Number(item.quantity || 1));
      const subtotal = product.price * quantity;

      return {
        key: item.key,
        productId: product.id,
        name: product.name,
        categoryLabel: product.categoryLabel,
        colorId: color.id,
        colorName: color.name,
        sizeLabel: size.label,
        quantity,
        price: product.price,
        priceLabel: formatMoney(product.price),
        subtotal,
        subtotalLabel: formatMoney(subtotal),
        image: color.images[0]
      };
    })
    .filter(Boolean);

  const total = detailedItems.reduce((sum, entry) => sum + entry.subtotal, 0);

  return {
    items: detailedItems,
    total,
    totalLabel: formatMoney(total)
  };
}

module.exports = {
  getCatalog,
  getProducts,
  getProductById,
  getCategories,
  summarizeCart
};

const categoryConfigs = [
  {
    id: "zapatos",
    label: "Zapatos",
    names: ["Pulse Runner", "Velocity Street", "Altitude Court", "Scarlet Motion", "Urban Sprint", "Metro Glide", "Rapid Core", "Aero Shift", "District Pace", "Crimson Track"],
    priceStart: 68,
    images: ["photo-1542291026-7eec264c27ff", "photo-1543508282-6319a3e2621f", "photo-1600185365483-26d7a4cc7519"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    badge: "New Drop"
  },
  {
    id: "polos",
    label: "Polos",
    names: ["Essential Fit", "Studio Crew", "Redline Tee", "Minimal Motion", "Core Prestige", "Downtown Basics", "Weekend Cotton", "Modern Layer", "Signature Flow", "Urban Ease"],
    priceStart: 24,
    images: ["photo-1521572163474-6864f9cf17ab", "photo-1576566588028-4147f3842f27", "photo-1503341504253-dff4815485f1"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Soft Touch"
  },
  {
    id: "pantalones",
    label: "Pantalones",
    names: ["Tailored Flex", "Street Utility", "Cloud Jogger", "Clean Cargo", "Avenue Flow", "Balance Fit", "Axis Relax", "Modern Cut", "Travel Ease", "Metro Utility"],
    priceStart: 44,
    images: ["photo-1473966968600-fa801b869a1a", "photo-1552902865-b72c031ac5ea", "photo-1515886657613-9f3515b0c78f"],
    sizes: ["28", "30", "32", "34", "36"],
    badge: "Flex Fabric"
  },
  {
    id: "gorras",
    label: "Gorras",
    names: ["Crown Curve", "Scarlet Peak", "Daily Snap", "Club Bill", "Velocity Cap", "Clean Visor", "Metro Shade", "Field Script", "Shift Panel", "Game Day"],
    priceStart: 18,
    images: ["photo-1521369909029-2afed882baee", "photo-1517841905240-472988babdf9", "photo-1507679799987-c73779587ccf"],
    sizes: ["Unitalla"],
    badge: "Limited"
  },
  {
    id: "medias",
    label: "Medias",
    names: ["Stride Socks", "Cloud Ankles", "Daily Support", "Scarlet Rib", "Active Duo", "Studio Pair", "Core Pack", "Street Cushion", "Move Basics", "Clean Lines"],
    priceStart: 8,
    images: ["photo-1586350977771-b3b0abd50c82", "photo-1617952236317-7583a1ea4c20", "photo-1608256246200-53e8b47b2f80"],
    sizes: ["S/M", "L/XL"],
    badge: "2 Pack"
  },
  {
    id: "cadenas",
    label: "Cadenas simples",
    names: ["Metro Chain", "Fine Scarlet", "Minimal Link", "Daily Shine", "Silver Path", "Clean Gold", "Urban Edge", "Studio Layer", "Pulse Chain", "Orbit Line"],
    priceStart: 16,
    images: ["photo-1617038220319-276d3cfab638", "photo-1617038260897-41a1f14a8ca0", "photo-1619119069152-a2b331eb392a"],
    sizes: ["40 cm", "45 cm", "50 cm"],
    badge: "Layering"
  },
  {
    id: "pasamontanas",
    label: "Pasamontañas",
    names: ["Night Guard", "Storm Knit", "Shadow Layer", "Cold Shift", "Street Shield", "Focus Mask", "Redline Cover", "Urban Glacier", "Core Guard", "Move Shield"],
    priceStart: 14,
    images: ["photo-1524504388940-b1c1722653e1", "photo-1515886657613-9f3515b0c78f", "photo-1521572267360-ee0c2909d518"],
    sizes: ["Unitalla"],
    badge: "Cold Ready"
  },
  {
    id: "boxers",
    label: "Boxers",
    names: ["Core Boxer", "Soft Motion", "Daily Support", "Redline Comfort", "Flex Trio", "Urban Base", "Air Cotton", "Stretch Flow", "Minimal Fit", "All Day Pack"],
    priceStart: 12,
    images: ["photo-1594938298603-c8148c4dae35", "photo-1600180758890-6b94519a8ba6", "photo-1596755389378-c31d21fd1273"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Comfort Pack"
  }
];

const variantPalette = [
  { id: "crimson", name: "Crimson Red", swatch: "#d51317" },
  { id: "obsidian", name: "Obsidian Black", swatch: "#161616" },
  { id: "pearl", name: "Pearl White", swatch: "#f4f4f4" }
];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function makeImage(id, signature, width = 900, height = 1100) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80&sig=${signature}`;
}

function buildProducts() {
  return categoryConfigs.flatMap((category, categoryIndex) =>
    category.names.map((name, index) => {
      const productId = `${category.id}-${index + 1}`;
      const basePrice = category.priceStart + index * 2;
      const variants = variantPalette.map((variant, variantIndex) => ({
        id: variant.id,
        name: variant.name,
        swatch: variant.swatch,
        images: category.images.map((imageId, imageIndex) =>
          makeImage(imageId, categoryIndex * 100 + index * 10 + variantIndex * 3 + imageIndex + 1)
        )
      }));

      return {
        id: productId,
        slug: productId,
        category: category.id,
        categoryLabel: category.label,
        name: `LB ${name}`,
        subtitle: `${category.label} premium con identidad urbana`,
        description: "Diseñado para un look limpio, cómodo y moderno. Ideal para elevar el outfit diario con una vibra premium y minimalista.",
        price: basePrice,
        priceLabel: priceFormatter.format(basePrice),
        badge: category.badge,
        isFeatured: index < 3,
        sizes: category.sizes,
        variants
      };
    })
  );
}

const products = buildProducts();

function getProducts(category) {
  if (!category || category === "todos") {
    return products;
  }

  return products.filter((product) => product.category === category);
}

function getProductById(id) {
  return products.find((product) => product.id === id || product.slug === id) || null;
}

function getCategories() {
  return [{ id: "todos", label: "Todos" }].concat(
    categoryConfigs.map((category) => ({ id: category.id, label: category.label }))
  );
}

function summarizeCart(items = []) {
  const detailedItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) {
        return null;
      }

      const variant = product.variants.find((entry) => entry.id === item.variantId) || product.variants[0];
      const quantity = Math.max(1, Number(item.quantity) || 1);

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        priceLabel: priceFormatter.format(product.price),
        quantity,
        subtotal: product.price * quantity,
        subtotalLabel: priceFormatter.format(product.price * quantity),
        size: item.size || product.sizes[0],
        variantId: variant.id,
        variantName: variant.name,
        image: variant.images[0]
      };
    })
    .filter(Boolean);

  const total = detailedItems.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items: detailedItems,
    total,
    totalLabel: priceFormatter.format(total)
  };
}

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  summarizeCart
};

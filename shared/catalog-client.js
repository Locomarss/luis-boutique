(function () {
  const DRAFT_KEY = "lb-owner-draft-v3";
  const CHANNEL_NAME = "lb-live-catalog";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  }

  function getBroadcastChannel() {
    if (!("BroadcastChannel" in window)) {
      return null;
    }
    if (!window.__lbCatalogChannel) {
      window.__lbCatalogChannel = new BroadcastChannel(CHANNEL_NAME);
    }
    return window.__lbCatalogChannel;
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveDraft(catalog) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(catalog));
    const channel = getBroadcastChannel();
    if (channel) {
      channel.postMessage({ type: "catalog:update", catalog });
    }
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    const channel = getBroadcastChannel();
    if (channel) {
      channel.postMessage({ type: "catalog:clear" });
    }
  }

  function mergeCatalog(baseCatalog) {
    const draft = loadDraft();
    return draft ? draft : baseCatalog;
  }

  function productById(catalog, productId) {
    return catalog.products.find((product) => product.id === productId) || null;
  }

  function colorById(product, colorId) {
    return product.colors.find((color) => color.id === colorId) || product.colors[0];
  }

  function sizeByLabel(product, label) {
    return product.sizes.find((size) => size.label === label) || product.sizes[0];
  }

  function isFreshProduct(product) {
    if (!product.createdAt) {
      return false;
    }
    const createdAt = new Date(product.createdAt).getTime();
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return now - createdAt <= sevenDays;
  }

  function productBadge(product) {
    if (isFreshProduct(product)) {
      return "NUEVO";
    }
    if (product.status === "sale") {
      return "REBAJAS";
    }
    if (product.status === "offer") {
      return "OFERTA";
    }
    return product.badgeText || "DROP";
  }

  function summarizeCart(catalog, cartItems) {
    const items = (cartItems || [])
      .map((entry) => {
        const product = productById(catalog, entry.productId);
        if (!product) {
          return null;
        }

        const color = colorById(product, entry.colorId);
        const size = sizeByLabel(product, entry.sizeLabel);
        const quantity = Math.max(1, Number(entry.quantity || 1));
        const subtotal = Number(product.price || 0) * quantity;

        return {
          key: entry.key,
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
          image: (color.images && color.images[0]) || color.coverImage || "",
          badgeText: productBadge(product)
        };
      })
      .filter(Boolean);

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      items,
      total,
      totalLabel: formatMoney(total)
    };
  }

  async function fileToDataUrl(file, maxSize) {
    const image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = new Image();
        preview.onload = () => resolve(preview);
        preview.onerror = reject;
        preview.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const limit = maxSize || 1400;
    const ratio = Math.min(1, limit / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * ratio));
    canvas.height = Math.max(1, Math.round(image.height * ratio));

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.84);
  }

  function makeProductId(name) {
    const base = (name || "producto")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 36);
    return `${base || "producto"}-${Date.now().toString().slice(-6)}`;
  }

  function buildEmptyProduct(catalog) {
    const firstCategory = catalog.categories[0] || { id: "ropa", label: "Ropa" };
    const id = makeProductId("nuevo-producto");
    const now = new Date().toISOString();

    return {
      id,
      slug: id,
      name: "Nuevo producto",
      category: firstCategory.id,
      categoryLabel: firstCategory.label,
      description: "Describe aqui el producto para que el cliente entienda rapido de que se trata.",
      price: 1500,
      originalPrice: 1800,
      status: "new",
      badgeText: "NUEVO",
      featured: false,
      isNewArrival: true,
      createdAt: now,
      updatedAt: now,
      stock: 6,
      colors: [
        {
          id: "color-rojo",
          name: "Rojo",
          hex: "#d51317",
          available: true,
          stock: 6,
          images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&h=1100&q=80"],
          coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&h=1100&q=80"
        }
      ],
      sizes: [
        { label: "S", available: true, stock: 2 },
        { label: "M", available: true, stock: 2 },
        { label: "L", available: true, stock: 2 }
      ]
    };
  }

  window.CatalogClient = {
    CHANNEL_NAME,
    clone,
    formatMoney,
    mergeCatalog,
    loadDraft,
    saveDraft,
    clearDraft,
    getBroadcastChannel,
    productById,
    colorById,
    sizeByLabel,
    summarizeCart,
    fileToDataUrl,
    buildEmptyProduct,
    makeProductId,
    isFreshProduct,
    productBadge
  };
})();

(function () {
  function formatMoney(value) {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
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
        const subtotal = product.price * quantity;

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
          image: color.images[0],
          status: product.status
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

  function buildEmptyProduct(catalog) {
    const category = catalog.categories[0];

    return {
      id: `nuevo-${Date.now()}`,
      slug: `nuevo-${Date.now()}`,
      name: "Nuevo producto",
      category: category.id,
      categoryLabel: category.label,
      description: "Describe aqui el producto.",
      price: 1000,
      originalPrice: 1200,
      status: "new",
      badgeText: "NEW DROP",
      featured: false,
      isNewArrival: true,
      stock: 5,
      colors: [
        {
          id: "color-1",
          name: "Rojo",
          hex: "#d51317",
          available: true,
          stock: 5,
          images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&h=1100&q=80"
          ]
        }
      ],
      sizes: [
        { label: "S", available: true, stock: 2 },
        { label: "M", available: true, stock: 2 },
        { label: "L", available: true, stock: 1 }
      ]
    };
  }

  async function sha256(text) {
    const bytes = new TextEncoder().encode(text);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("");
  }

  window.CatalogClient = {
    clone,
    formatMoney,
    productById,
    colorById,
    sizeByLabel,
    summarizeCart,
    buildEmptyProduct,
    sha256
  };
})();

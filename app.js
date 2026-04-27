const state = {
  catalog: null,
  filter: "todos",
  cart: JSON.parse(localStorage.getItem("lb-cart-v2") || "[]"),
  selectedProductId: null,
  selectedColorId: null,
  selectedSizeLabel: null,
  selectedPhotoIndex: 0
};

const page = document.body.dataset.page;
const backdrop = document.getElementById("panelBackdrop");
const cartPanel = document.getElementById("cartPanel");
const settingsPanel = document.getElementById("settingsPanel");

async function fetchCatalog() {
  const response = await fetch("./data/catalog.json?v=" + Date.now());
  if (!response.ok) {
    throw new Error("No se pudo cargar el catalogo");
  }
  return response.json();
}

function saveCart() {
  localStorage.setItem("lb-cart-v2", JSON.stringify(state.cart));
}

function formatMoney(value) {
  return window.CatalogClient.formatMoney(value);
}

function toggleTheme() {
  const html = document.documentElement;
  const next = html.classList.contains("dark") ? "light" : "dark";
  html.classList.toggle("dark", next === "dark");
  localStorage.setItem("lb-theme", next);
  const button = document.getElementById("themeToggle");
  if (button) {
    button.textContent = next === "dark" ? "☀️" : "🌙";
  }
}

function applyTheme() {
  const theme = localStorage.getItem("lb-theme") || "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
  const button = document.getElementById("themeToggle");
  if (button) {
    button.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function openPanel(name) {
  backdrop.classList.add("visible");
  if (name === "cart") {
    cartPanel.classList.add("open");
  }
  if (name === "settings") {
    settingsPanel.classList.add("open");
  }
}

function closePanels() {
  cartPanel.classList.remove("open");
  settingsPanel.classList.remove("open");
  backdrop.classList.remove("visible");
}

function bindCommonUI() {
  document.getElementById("cartButton")?.addEventListener("click", () => openPanel("cart"));
  document.getElementById("menuButton")?.addEventListener("click", () => openPanel("settings"));
  document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
  backdrop?.addEventListener("click", closePanels);

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", closePanels);
  });

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const header = document.getElementById("siteHeader");
    if (!header) {
      return;
    }
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setHeroFromCatalog() {
  const heroTitle = document.getElementById("heroTitle");
  const heroText = document.getElementById("heroText");
  const heroImage = document.getElementById("heroImage");

  if (heroTitle) heroTitle.textContent = state.catalog.store.heroTitle;
  if (heroText) heroText.textContent = state.catalog.store.heroText;
  if (heroImage) {
    const firstNew = state.catalog.products.find((product) => product.isNewArrival) || state.catalog.products[0];
    heroImage.src = firstNew.colors[0].images[0];
  }
}

function filteredProducts() {
  if (state.filter === "todos") {
    return state.catalog.products;
  }
  if (state.filter === "nuevo") {
    return state.catalog.products.filter((product) => product.isNewArrival || product.status === "new");
  }
  if (state.filter === "ofertas") {
    return state.catalog.products.filter((product) => product.status === "sale" || product.status === "offer");
  }
  return state.catalog.products.filter((product) => product.category === state.filter);
}

function renderFilters() {
  const target = document.getElementById("filters");
  if (!target) return;

  const filters = [
    { id: "todos", label: "Todos" },
    { id: "nuevo", label: "Nuevo" },
    { id: "ofertas", label: "Ofertas" },
    ...state.catalog.categories
  ];

  target.innerHTML = filters
    .map((filter) => `<button class="filter-chip ${filter.id === state.filter ? "active" : ""}" data-filter="${filter.id}">${filter.label}</button>`)
    .join("");

  target.onclick = (event) => {
    const chip = event.target.closest("[data-filter]");
    if (!chip) return;
    state.filter = chip.dataset.filter;
    renderFilters();
    renderProducts();
  };
}

function badgeMarkup(product) {
  return `<span class="badge-shell"><span class="badge-pill">${product.badgeText}</span></span>`;
}

function cardMarkup(product) {
  return `
    <button class="product-card" data-product="${product.id}">
      <figure>
        <img src="${product.colors[0].images[0]}" alt="${product.name}" loading="lazy" />
        <div class="card-badge">${badgeMarkup(product)}</div>
      </figure>
      <div class="product-meta">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p>${product.categoryLabel}</p>
          <span class="inventory-note">Stock: ${product.stock}</span>
        </div>
        <div class="price-line">
          <strong class="current-price">${formatMoney(product.price)}</strong>
          ${product.originalPrice > product.price ? `<span class="old-price">${formatMoney(product.originalPrice)}</span>` : ""}
        </div>
      </div>
    </button>
  `;
}

function renderNewArrivals() {
  const target = document.getElementById("newArrivals");
  if (!target) return;
  const items = state.catalog.products.filter((product) => product.isNewArrival).slice(0, 3);
  target.innerHTML = items.map(cardMarkup).join("");
}

function renderProducts() {
  const target = document.getElementById("productsGrid");
  if (!target) return;

  const products = filteredProducts().filter((product) => !product.isNewArrival || state.filter !== "todos");
  target.innerHTML = products.map(cardMarkup).join("");
}

function cartKey(productId, colorId, sizeLabel) {
  return `${productId}::${colorId}::${sizeLabel}`;
}

function addToCart() {
  const product = window.CatalogClient.productById(state.catalog, state.selectedProductId);
  const color = window.CatalogClient.colorById(product, state.selectedColorId);
  const size = window.CatalogClient.sizeByLabel(product, state.selectedSizeLabel);

  if (!color.available || !size.available) {
    return;
  }

  const key = cartKey(product.id, color.id, size.label);
  const current = state.cart.find((item) => item.key === key);
  if (current) {
    current.quantity += 1;
  } else {
    state.cart.push({
      key,
      productId: product.id,
      colorId: color.id,
      sizeLabel: size.label,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  closeProductModal();
}

function renderCart() {
  const summary = window.CatalogClient.summarizeCart(state.catalog, state.cart);
  const target = document.getElementById("cartList");
  document.getElementById("cartCount").textContent = String(summary.items.reduce((sum, item) => sum + item.quantity, 0));
  document.getElementById("cartTotal").textContent = summary.totalLabel;

  if (!summary.items.length) {
    target.innerHTML = `<div class="empty-card section-card"><p class="section-text">Tu carrito esta vacio. Agrega productos desde la tienda.</p></div>`;
    return;
  }

  target.innerHTML = summary.items
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>${item.colorName} · ${item.sizeLabel}</p>
            <p>${item.priceLabel}</p>
            <div class="cart-controls">
              <div class="qty-box">
                <button class="qty-btn" data-cart-action="minus" data-key="${item.key}">-</button>
                <strong>${item.quantity}</strong>
                <button class="qty-btn" data-cart-action="plus" data-key="${item.key}">+</button>
              </div>
              <button class="remove-btn" data-cart-action="remove" data-key="${item.key}">🗑</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  target.onclick = (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const item = state.cart.find((entry) => entry.key === button.dataset.key);
    if (!item) return;

    if (button.dataset.cartAction === "plus") item.quantity += 1;
    if (button.dataset.cartAction === "minus") item.quantity -= 1;
    if (button.dataset.cartAction === "remove" || item.quantity <= 0) {
      state.cart = state.cart.filter((entry) => entry.key !== button.dataset.key);
    }

    saveCart();
    renderCart();
  };
}

function selectedProduct() {
  return window.CatalogClient.productById(state.catalog, state.selectedProductId);
}

function openProductModal(productId) {
  const product = window.CatalogClient.productById(state.catalog, productId);
  if (!product) return;

  state.selectedProductId = product.id;
  state.selectedColorId = product.colors[0].id;
  state.selectedSizeLabel = product.sizes[0].label;
  state.selectedPhotoIndex = 0;
  renderProductModal();
  const modal = document.getElementById("productModal");
  modal.classList.add("open");
  backdrop.classList.add("visible");
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("open");
  if (!cartPanel.classList.contains("open") && !settingsPanel.classList.contains("open")) {
    backdrop.classList.remove("visible");
  }
}

function renderProductModal() {
  const product = selectedProduct();
  if (!product) return;
  const color = window.CatalogClient.colorById(product, state.selectedColorId);
  const size = window.CatalogClient.sizeByLabel(product, state.selectedSizeLabel);

  document.getElementById("modalCategory").textContent = product.categoryLabel;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalPrice").textContent = formatMoney(product.price);
  document.getElementById("modalOriginalPrice").textContent = product.originalPrice > product.price ? formatMoney(product.originalPrice) : "";
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalPhoto").src = color.images[state.selectedPhotoIndex] || color.images[0];
  document.getElementById("modalStock").textContent = `Disponibles: ${Math.max(0, color.stock)} en color ${color.name} y ${Math.max(0, size.stock)} en talla ${size.label}.`;

  document.getElementById("modalThumbs").innerHTML = color.images
    .map((image, index) => `<button class="thumb-btn ${index === state.selectedPhotoIndex ? "active" : ""}" data-thumb="${index}"><img src="${image}" alt="${product.name} ${index + 1}" /></button>`)
    .join("");

  document.getElementById("modalColors").innerHTML = product.colors
    .map(
      (entry) => `<button class="color-chip ${entry.id === color.id ? "active" : ""} ${entry.available ? "" : "unavailable"}" data-color="${entry.id}" style="--chip-color:${entry.hex}" aria-label="${entry.name}" title="${entry.name}"></button>`
    )
    .join("");

  document.getElementById("modalSizes").innerHTML = product.sizes
    .map(
      (entry) => `<button class="size-chip ${entry.label === size.label ? "active" : ""} ${entry.available ? "" : "unavailable"}" data-size="${entry.label}">${entry.label}</button>`
    )
    .join("");
}

function bindStorePage() {
  setHeroFromCatalog();
  renderNewArrivals();
  renderFilters();
  renderProducts();

  document.getElementById("productsGrid").onclick = (event) => {
    const card = event.target.closest("[data-product]");
    if (card) openProductModal(card.dataset.product);
  };

  document.getElementById("newArrivals").onclick = (event) => {
    const card = event.target.closest("[data-product]");
    if (card) openProductModal(card.dataset.product);
  };

  document.getElementById("modalClose").onclick = closeProductModal;
  document.getElementById("productModal").onclick = (event) => {
    if (event.target.id === "productModal") {
      closeProductModal();
    }
  };

  document.getElementById("modalThumbs").onclick = (event) => {
    const button = event.target.closest("[data-thumb]");
    if (!button) return;
    state.selectedPhotoIndex = Number(button.dataset.thumb);
    renderProductModal();
  };

  document.getElementById("modalColors").onclick = (event) => {
    const button = event.target.closest("[data-color]");
    if (!button) return;
    const product = selectedProduct();
    const color = product.colors.find((entry) => entry.id === button.dataset.color);
    if (!color || !color.available) return;
    state.selectedColorId = button.dataset.color;
    state.selectedPhotoIndex = 0;
    renderProductModal();
  };

  document.getElementById("modalSizes").onclick = (event) => {
    const button = event.target.closest("[data-size]");
    if (!button) return;
    const product = selectedProduct();
    const size = product.sizes.find((entry) => entry.label === button.dataset.size);
    if (!size || !size.available) return;
    state.selectedSizeLabel = button.dataset.size;
    renderProductModal();
  };

  document.getElementById("addToCartButton").onclick = addToCart;
}

function bindAboutPage() {
  const about = state.catalog.about;
  document.getElementById("aboutHeadline").textContent = about.headline;
  document.getElementById("aboutIntro").textContent = about.intro;

  const blocks = [
    ...about.paragraphs.map((text, index) => ({
      title: index === 0 ? "Nuestra energia" : "Como trabajamos",
      text
    })),
    ...about.highlights.map((item) => ({
      title: item.label,
      text: item.value
    }))
  ];

  document.getElementById("aboutBlocks").innerHTML = blocks
    .map(
      (block) => `
        <article class="about-block reveal visible">
          <p class="eyebrow">${block.title}</p>
          <p class="about-text">${block.text}</p>
        </article>
      `
    )
    .join("");

  const video = document.getElementById("aboutVideo");
  const source = document.getElementById("aboutVideoSource");
  video.poster = about.video.poster;
  source.src = about.video.src;
  video.load();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(video);
}

function bindCheckout() {
  document.getElementById("checkoutButton").onclick = () => {
    const summary = window.CatalogClient.summarizeCart(state.catalog, state.cart);
    if (!summary.items.length) return;

    const lines = [
      "Hola, quiero comprar los siguientes productos:",
      ...summary.items.map((item) => `- ${item.name} | ${item.colorName} | ${item.sizeLabel} | x${item.quantity} | ${item.subtotalLabel}`),
      `Total: ${summary.totalLabel}`
    ];

    window.open(`https://wa.me/${state.catalog.store.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };
}

async function init() {
  applyTheme();
  bindCommonUI();
  state.catalog = await fetchCatalog();
  renderCart();
  bindCheckout();

  if (page === "store") bindStorePage();
  if (page === "about") bindAboutPage();
}

init().catch((error) => {
  console.error(error);
});

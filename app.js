const translations = {
  es: {
    navStore: "Tienda",
    navAbout: "Nosotros",
    cartEyebrow: "Carrito",
    cartTitle: "Tu pedido",
    totalLabel: "Total",
    checkoutButton: "Comprar por WhatsApp",
    menuEyebrow: "Menu",
    menuTitle: "Preferencias",
    themeTitle: "Modo de color",
    themeText: "Cambia entre vista clara y oscura.",
    languageTitle: "Idioma",
    languageText: "Escoge Espanol, Ingles o Creole.",
    pageLinksTitle: "Paginas",
    pageLinksText: "Ve a la tienda o entra a la pagina de nosotros.",
    heroEyebrow: "Compras directas",
    heroActionProducts: "Ver nuevos productos",
    heroActionAbout: "Entrar a nosotros",
    carouselSectionEyebrow: "Carrusel",
    carouselSectionTitle: "Coleccion destacada",
    newEyebrow: "Nuevos productos",
    newTitle: "Lo nuevo primero.",
    newPill: "NUEVO",
    catalogEyebrow: "Catalogo",
    catalogTitle: "Explora todo lo disponible.",
    catalogText: "Filtra por categoria, ofertas o nuevos productos sin salir de la pagina.",
    colorsLabel: "Colores",
    sizesLabel: "Tallas",
    addToCart: "Agregar al carrito",
    termsLabel: "Terminos y condiciones",
    aboutEyebrow: "Nosotros",
    goStoreButton: "Entrar a la tienda",
    cartEmpty: "Tu carrito esta vacio. Agrega productos desde la tienda.",
    quantityLabel: "Cantidad",
    filtersAll: "Todos",
    filtersNew: "Nuevo",
    filtersOffers: "Ofertas",
    stockText: "Disponibles",
    whatsappIntro: "Hola, quiero comprar los siguientes productos:",
    whatsappTotal: "Total",
    whatsappImages: "Imagen",
    stockSentence: "Disponibles: {colorStock} en color {colorName} y {sizeStock} en talla {sizeLabel}.",
    aboutBlock1Title: "La boutique",
    aboutBlock2Title: "Como trabajamos",
    aboutBlock3Title: "Compra rapida"
  },
  en: {
    navStore: "Store",
    navAbout: "About",
    cartEyebrow: "Cart",
    cartTitle: "Your order",
    totalLabel: "Total",
    checkoutButton: "Buy on WhatsApp",
    menuEyebrow: "Menu",
    menuTitle: "Preferences",
    themeTitle: "Theme",
    themeText: "Switch between light and dark mode.",
    languageTitle: "Language",
    languageText: "Choose Spanish, English, or Creole.",
    pageLinksTitle: "Pages",
    pageLinksText: "Go to the store or the about page.",
    heroEyebrow: "Direct shopping",
    heroActionProducts: "See new products",
    heroActionAbout: "Go to about",
    carouselSectionEyebrow: "Carousel",
    carouselSectionTitle: "Featured collection",
    newEyebrow: "New products",
    newTitle: "Newest first.",
    newPill: "NEW",
    catalogEyebrow: "Catalog",
    catalogTitle: "Explore everything available.",
    catalogText: "Filter by category, offers, or new products without leaving the page.",
    colorsLabel: "Colors",
    sizesLabel: "Sizes",
    addToCart: "Add to cart",
    termsLabel: "Terms and conditions",
    aboutEyebrow: "About",
    goStoreButton: "Go to store",
    cartEmpty: "Your cart is empty. Add products from the store.",
    quantityLabel: "Qty",
    filtersAll: "All",
    filtersNew: "New",
    filtersOffers: "Offers",
    stockText: "Available",
    whatsappIntro: "Hi, I want to buy the following products:",
    whatsappTotal: "Total",
    whatsappImages: "Image",
    stockSentence: "Available: {colorStock} in color {colorName} and {sizeStock} in size {sizeLabel}.",
    aboutBlock1Title: "The boutique",
    aboutBlock2Title: "How we work",
    aboutBlock3Title: "Fast purchase"
  },
  ht: {
    navStore: "Boutik",
    navAbout: "Sou nou",
    cartEyebrow: "Panyen",
    cartTitle: "Koman ou",
    totalLabel: "Total",
    checkoutButton: "Achte sou WhatsApp",
    menuEyebrow: "Menu",
    menuTitle: "Preferans",
    themeTitle: "Mòd koulè",
    themeText: "Chanje ant mòd klè ak mòd nwa.",
    languageTitle: "Lang",
    languageText: "Chwazi Panyòl, Anglè oswa Kreyòl.",
    pageLinksTitle: "Paj",
    pageLinksText: "Ale nan boutik la oswa paj sou nou an.",
    heroEyebrow: "Acha dirèk",
    heroActionProducts: "Gade nouvo pwodwi",
    heroActionAbout: "Ale sou nou",
    carouselSectionEyebrow: "Karousèl",
    carouselSectionTitle: "Koleksyon vedèt",
    newEyebrow: "Nouvo pwodwi",
    newTitle: "Nouvo yo an premye.",
    newPill: "NOUVO",
    catalogEyebrow: "Katalòg",
    catalogTitle: "Gade tout sa ki disponib.",
    catalogText: "Filtre pa kategori, òf, oswa nouvo pwodwi san kite paj la.",
    colorsLabel: "Koulè",
    sizesLabel: "Gwosè",
    addToCart: "Ajoute nan panyen",
    termsLabel: "Tèm ak kondisyon",
    aboutEyebrow: "Sou nou",
    goStoreButton: "Antre nan boutik la",
    cartEmpty: "Panyen ou vid. Ajoute pwodwi soti nan boutik la.",
    quantityLabel: "Kantite",
    filtersAll: "Tout",
    filtersNew: "Nouvo",
    filtersOffers: "Ofri",
    stockText: "Disponib",
    whatsappIntro: "Bonjou, mwen vle achte pwodwi sa yo:",
    whatsappTotal: "Total",
    whatsappImages: "Imaj",
    stockSentence: "Disponib: {colorStock} nan koulè {colorName} ak {sizeStock} nan gwosè {sizeLabel}.",
    aboutBlock1Title: "Boutik la",
    aboutBlock2Title: "Kijan nou travay",
    aboutBlock3Title: "Acha rapid"
  }
};

const appState = {
  page: document.body.dataset.page,
  language: localStorage.getItem("lb-language-v3") || "es",
  cart: JSON.parse(localStorage.getItem("lb-cart-v3") || "[]"),
  catalog: null,
  baseCatalog: null,
  filter: "all",
  selectedProductId: null,
  selectedColorId: null,
  selectedSizeLabel: null,
  selectedImageIndex: 0,
  slideIndex: 0,
  slideTimer: null
};

function t(key) {
  return translations[appState.language][key] || translations.es[key] || key;
}

function setStoredLanguage(language) {
  appState.language = language;
  localStorage.setItem("lb-language-v3", language);
}

function setStoredCart() {
  localStorage.setItem("lb-cart-v3", JSON.stringify(appState.cart));
}

function applyTheme() {
  const theme = localStorage.getItem("lb-theme-v3") || "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
  const button = document.getElementById("themeToggle");
  if (button) {
    button.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("lb-theme-v3", next);
  applyTheme();
}

function format(template, values) {
  return Object.keys(values).reduce((result, key) => result.replace(`{${key}}`, values[key]), template);
}

async function fetchCatalog() {
  const response = await fetch("./data/catalog.json?v=" + Date.now());
  if (!response.ok) {
    throw new Error("No se pudo cargar el catalogo principal.");
  }
  const catalog = await response.json();
  appState.baseCatalog = catalog;
  appState.catalog = window.CatalogClient.mergeCatalog(catalog);
}

function applyTranslations() {
  document.documentElement.lang = appState.language === "ht" ? "ht" : appState.language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  renderLanguageButtons();
}

function renderLanguageButtons() {
  const target = document.getElementById("languageRow");
  if (!target) return;
  const buttons = [
    { id: "es", label: "Espanol" },
    { id: "en", label: "English" },
    { id: "ht", label: "Creole" }
  ];

  target.innerHTML = buttons
    .map((entry) => `<button class="lang-btn ${entry.id === appState.language ? "active" : ""}" data-language="${entry.id}">${entry.label}</button>`)
    .join("");

  target.onclick = (event) => {
    const button = event.target.closest("[data-language]");
    if (!button) return;
    setStoredLanguage(button.dataset.language);
    renderPage();
  };
}

function getAvailableProductImage(product) {
  const color = product.colors.find((entry) => (entry.images || []).length) || product.colors[0];
  return (color && (color.images[0] || color.coverImage)) || "./assets/luis-boutique-logo.jpeg";
}

function isVisibleNew(product) {
  return window.CatalogClient.isFreshProduct(product) || product.status === "new" || product.isNewArrival;
}

function displayBadge(product) {
  return window.CatalogClient.productBadge(product);
}

function filteredProducts() {
  const list = appState.catalog.products || [];
  if (appState.filter === "all") return list;
  if (appState.filter === "new") return list.filter((product) => isVisibleNew(product));
  if (appState.filter === "offers") return list.filter((product) => product.status === "offer" || product.status === "sale");
  return list.filter((product) => product.category === appState.filter);
}

function renderHero() {
  if (appState.page !== "store") return;
  const heroTitle = document.getElementById("heroTitle");
  const heroText = document.getElementById("heroText");
  const heroVisual = document.getElementById("heroVisual");
  heroTitle.textContent = appState.catalog.store.heroTitle;
  heroText.textContent = appState.catalog.store.heroText;
  const newest = appState.catalog.products.find((product) => isVisibleNew(product)) || appState.catalog.products[0];
  heroVisual.src = getAvailableProductImage(newest);
}

function renderCarousel() {
  if (appState.page !== "store") return;
  const slides = appState.catalog.store.carouselSlides || [];
  const slidesTarget = document.getElementById("carouselSlides");
  const dotsTarget = document.getElementById("carouselDots");

  if (!slides.length) {
    slidesTarget.innerHTML = "";
    dotsTarget.innerHTML = "";
    return;
  }

  appState.slideIndex = ((appState.slideIndex % slides.length) + slides.length) % slides.length;
  const current = slides[appState.slideIndex];

  slidesTarget.innerHTML = slides
    .map((slide, index) => `<div class="carousel-slide ${index === appState.slideIndex ? "active" : ""}"><img src="${slide.image}" alt="${slide.title}" /></div>`)
    .join("");

  dotsTarget.innerHTML = slides
    .map((_, index) => `<button class="slide-dot ${index === appState.slideIndex ? "active" : ""}" data-slide-index="${index}" aria-label="Slide ${index + 1}"></button>`)
    .join("");

  document.getElementById("carouselEyebrow").textContent = current.eyebrow;
  document.getElementById("carouselTitle").textContent = current.title;
  document.getElementById("carouselText").textContent = current.text;

  dotsTarget.onclick = (event) => {
    const dot = event.target.closest("[data-slide-index]");
    if (!dot) return;
    appState.slideIndex = Number(dot.dataset.slideIndex);
    renderCarousel();
    resetCarouselTimer();
  };
}

function resetCarouselTimer() {
  if (appState.slideTimer) {
    window.clearInterval(appState.slideTimer);
  }
  if (appState.page !== "store") return;
  appState.slideTimer = window.setInterval(() => {
    appState.slideIndex += 1;
    renderCarousel();
  }, 5200);
}

function renderNewProducts() {
  if (appState.page !== "store") return;
  const target = document.getElementById("newGrid");
  const items = appState.catalog.products.filter((product) => isVisibleNew(product)).slice(0, 6);
  target.innerHTML = items.map(renderProductCard).join("");
}

function filterLabel(filter) {
  if (filter === "all") return t("filtersAll");
  if (filter === "new") return t("filtersNew");
  if (filter === "offers") return t("filtersOffers");
  const category = appState.catalog.categories.find((entry) => entry.id === filter);
  return category ? category.label : filter;
}

function renderFilters() {
  if (appState.page !== "store") return;
  const target = document.getElementById("filterRow");
  const filters = ["all", "new", "offers"].concat(appState.catalog.categories.map((entry) => entry.id));
  target.innerHTML = filters
    .map((filter) => `<button class="filter-chip ${filter === appState.filter ? "active" : ""}" data-filter="${filter}">${filterLabel(filter)}</button>`)
    .join("");

  target.onclick = (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    appState.filter = button.dataset.filter;
    renderFilters();
    renderProducts();
  };
}

function renderProductCard(product) {
  return `
    <button class="product-card" data-product-id="${product.id}">
      <figure>
        <img src="${getAvailableProductImage(product)}" alt="${product.name}" loading="lazy" />
        <span class="badge-tag">${displayBadge(product)}</span>
      </figure>
      <div class="product-meta">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-cat">${product.categoryLabel}</div>
          <div class="stock-note">${t("stockText")}: ${product.stock}</div>
        </div>
        <div class="price-stack">
          <strong class="price-now">${window.CatalogClient.formatMoney(product.price)}</strong>
          ${Number(product.originalPrice || 0) > Number(product.price || 0) ? `<span class="price-old">${window.CatalogClient.formatMoney(product.originalPrice)}</span>` : ""}
        </div>
      </div>
    </button>
  `;
}

function renderProducts() {
  if (appState.page !== "store") return;
  const target = document.getElementById("productsGrid");
  target.innerHTML = filteredProducts().map(renderProductCard).join("");
}

function renderCart() {
  const summary = window.CatalogClient.summarizeCart(appState.catalog, appState.cart);
  const count = summary.items.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = String(count);
  document.getElementById("cartTotal").textContent = summary.totalLabel;

  const target = document.getElementById("cartList");
  if (!summary.items.length) {
    target.innerHTML = `<div class="empty-card editor-card"><p class="panel-note">${t("cartEmpty")}</p></div>`;
    return;
  }

  target.innerHTML = summary.items
    .map(
      (item) => `
        <article class="cart-card">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>${item.colorName} · ${item.sizeLabel}</p>
            <p>${item.priceLabel}</p>
            <div class="cart-controls">
              <div class="qty-group">
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
    const item = appState.cart.find((entry) => entry.key === button.dataset.key);
    if (!item) return;

    if (button.dataset.cartAction === "plus") item.quantity += 1;
    if (button.dataset.cartAction === "minus") item.quantity -= 1;
    if (button.dataset.cartAction === "remove" || item.quantity <= 0) {
      appState.cart = appState.cart.filter((entry) => entry.key !== button.dataset.key);
    }

    setStoredCart();
    renderCart();
  };
}

function openPanel(name) {
  document.getElementById("panelBackdrop").classList.add("visible");
  document.getElementById(name === "cart" ? "cartPanel" : "settingsPanel").classList.add("open");
}

function closePanels() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("settingsPanel").classList.remove("open");
  document.getElementById("panelBackdrop").classList.remove("visible");
}

function selectedProduct() {
  return window.CatalogClient.productById(appState.catalog, appState.selectedProductId);
}

function selectedColor() {
  return window.CatalogClient.colorById(selectedProduct(), appState.selectedColorId);
}

function selectedSize() {
  return window.CatalogClient.sizeByLabel(selectedProduct(), appState.selectedSizeLabel);
}

function openProduct(productId) {
  const product = window.CatalogClient.productById(appState.catalog, productId);
  if (!product) return;
  appState.selectedProductId = product.id;
  appState.selectedColorId = product.colors[0]?.id || null;
  appState.selectedSizeLabel = product.sizes[0]?.label || null;
  appState.selectedImageIndex = 0;
  renderProductModal();
  document.getElementById("productModal").classList.add("open");
  document.getElementById("panelBackdrop").classList.add("visible");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("open");
  if (!document.getElementById("cartPanel").classList.contains("open") && !document.getElementById("settingsPanel").classList.contains("open")) {
    document.getElementById("panelBackdrop").classList.remove("visible");
  }
}

function renderProductModal() {
  const product = selectedProduct();
  if (!product) return;
  const color = selectedColor();
  const size = selectedSize();

  document.getElementById("modalCategory").textContent = product.categoryLabel;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalPrice").textContent = window.CatalogClient.formatMoney(product.price);
  document.getElementById("modalPriceOld").textContent = Number(product.originalPrice || 0) > Number(product.price || 0) ? window.CatalogClient.formatMoney(product.originalPrice) : "";
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalMainPhoto").src = color.images[appState.selectedImageIndex] || color.images[0] || "./assets/luis-boutique-logo.jpeg";

  document.getElementById("modalThumbList").innerHTML = (color.images || [])
    .map((image, index) => `<button class="thumb-btn ${index === appState.selectedImageIndex ? "active" : ""}" data-thumb-index="${index}"><img src="${image}" alt="${product.name} ${index + 1}" /></button>`)
    .join("");

  document.getElementById("modalColorRow").innerHTML = product.colors
    .map(
      (entry) => `<button class="color-chip ${entry.id === color.id ? "active" : ""} ${entry.available ? "" : "sold-out"}" data-color-id="${entry.id}" style="--chip:${entry.hex}" title="${entry.name}" aria-label="${entry.name}"></button>`
    )
    .join("");

  document.getElementById("modalSizeRow").innerHTML = product.sizes
    .map(
      (entry) => `<button class="size-chip ${entry.label === size.label ? "active" : ""} ${entry.available ? "" : "sold-out"}" data-size-label="${entry.label}">${entry.label}</button>`
    )
    .join("");

  document.getElementById("modalStockNote").textContent = format(t("stockSentence"), {
    colorStock: Math.max(0, Number(color.stock || 0)),
    colorName: color.name,
    sizeStock: Math.max(0, Number(size.stock || 0)),
    sizeLabel: size.label
  });
}

function addSelectedProductToCart() {
  const product = selectedProduct();
  const color = selectedColor();
  const size = selectedSize();
  if (!product || !color.available || !size.available) return;

  const key = `${product.id}::${color.id}::${size.label}`;
  const existing = appState.cart.find((entry) => entry.key === key);
  if (existing) {
    existing.quantity += 1;
  } else {
    appState.cart.push({
      key,
      productId: product.id,
      colorId: color.id,
      sizeLabel: size.label,
      quantity: 1
    });
  }

  setStoredCart();
  renderCart();
  closeProduct();
}

function bindStorePage() {
  document.getElementById("productsGrid").onclick = (event) => {
    const card = event.target.closest("[data-product-id]");
    if (card) openProduct(card.dataset.productId);
  };

  document.getElementById("newGrid").onclick = (event) => {
    const card = event.target.closest("[data-product-id]");
    if (card) openProduct(card.dataset.productId);
  };

  document.getElementById("carouselPrev").onclick = () => {
    appState.slideIndex -= 1;
    renderCarousel();
    resetCarouselTimer();
  };

  document.getElementById("carouselNext").onclick = () => {
    appState.slideIndex += 1;
    renderCarousel();
    resetCarouselTimer();
  };
}

function bindModal() {
  document.getElementById("modalClose")?.addEventListener("click", closeProduct);
  document.getElementById("productModal")?.addEventListener("click", (event) => {
    if (event.target.id === "productModal") closeProduct();
  });

  document.getElementById("modalThumbList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-thumb-index]");
    if (!button) return;
    appState.selectedImageIndex = Number(button.dataset.thumbIndex);
    renderProductModal();
  });

  document.getElementById("modalColorRow")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-color-id]");
    if (!button) return;
    const color = selectedProduct().colors.find((entry) => entry.id === button.dataset.colorId);
    if (!color || !color.available) return;
    appState.selectedColorId = button.dataset.colorId;
    appState.selectedImageIndex = 0;
    renderProductModal();
  });

  document.getElementById("modalSizeRow")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-size-label]");
    if (!button) return;
    const size = selectedProduct().sizes.find((entry) => entry.label === button.dataset.sizeLabel);
    if (!size || !size.available) return;
    appState.selectedSizeLabel = button.dataset.sizeLabel;
    renderProductModal();
  });

  document.getElementById("addToCartButton")?.addEventListener("click", addSelectedProductToCart);
}

function renderAboutPage() {
  if (appState.page !== "about") return;

  document.getElementById("aboutHeadline").textContent = appState.catalog.about.headline;
  document.getElementById("aboutIntro").textContent = appState.catalog.about.intro;

  const paragraphs = appState.catalog.about.paragraphs || [];
  const highlights = appState.catalog.about.highlights || [];
  const blocks = [
    { title: t("aboutBlock1Title"), text: paragraphs[0] || appState.catalog.about.intro },
    { title: t("aboutBlock2Title"), text: paragraphs[1] || appState.catalog.store.heroText },
    { title: t("aboutBlock3Title"), text: highlights.map((entry) => `${entry.label}: ${entry.value}`).join(" · ") }
  ];

  document.getElementById("aboutGrid").innerHTML = blocks
    .map(
      (block) => `
        <article class="about-block reveal visible">
          <span class="eyebrow">${block.title}</span>
          <p class="about-text">${block.text}</p>
        </article>
      `
    )
    .join("");

  const video = document.getElementById("aboutVideo");
  const source = document.getElementById("aboutVideoSource");
  video.poster = appState.catalog.about.video.poster;
  source.src = appState.catalog.about.video.src;
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

function renderCheckoutAction() {
  document.getElementById("checkoutButton").onclick = () => {
    const summary = window.CatalogClient.summarizeCart(appState.catalog, appState.cart);
    if (!summary.items.length) return;

    const lines = [
      t("whatsappIntro"),
      ...summary.items.flatMap((item) => [
        `- ${item.name} | ${item.colorName} | ${item.sizeLabel} | x${item.quantity} | ${item.subtotalLabel}`,
        `${t("whatsappImages")}: ${item.image}`
      ]),
      `${t("whatsappTotal")}: ${summary.totalLabel}`
    ];

    window.open(`https://wa.me/${appState.catalog.store.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };
}

function renderPage() {
  applyTranslations();
  if (!appState.catalog) return;

  if (appState.page === "store") {
    renderHero();
    renderCarousel();
    renderNewProducts();
    renderFilters();
    renderProducts();
    resetCarouselTimer();
  }

  if (appState.page === "about") {
    renderAboutPage();
  }

  renderProductModal();
  renderCart();
}

function listenForOwnerDrafts() {
  const channel = window.CatalogClient.getBroadcastChannel();
  if (channel) {
    channel.onmessage = (event) => {
      if (event.data?.type === "catalog:update") {
        appState.catalog = event.data.catalog;
        renderPage();
      }
      if (event.data?.type === "catalog:clear") {
        appState.catalog = window.CatalogClient.clone(appState.baseCatalog);
        renderPage();
      }
    };
  }

  window.addEventListener("storage", (event) => {
    if (event.key === "lb-owner-draft-v3") {
      appState.catalog = window.CatalogClient.mergeCatalog(appState.baseCatalog);
      renderPage();
    }
  });
}

function bindCommonEvents() {
  document.getElementById("cartButton")?.addEventListener("click", () => openPanel("cart"));
  document.getElementById("menuButton")?.addEventListener("click", () => openPanel("settings"));
  document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
  document.getElementById("panelBackdrop")?.addEventListener("click", () => {
    closePanels();
    closeProduct();
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", closePanels);
  });

  let lastScroll = window.scrollY;
  window.addEventListener("scroll", () => {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    if (window.scrollY > lastScroll && window.scrollY > 120) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
    lastScroll = window.scrollY;
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

async function init() {
  applyTheme();
  bindCommonEvents();
  bindModal();
  await fetchCatalog();
  renderCheckoutAction();
  listenForOwnerDrafts();

  if (appState.page === "store") {
    bindStorePage();
  }

  renderPage();
}

init().catch((error) => {
  console.error(error);
});

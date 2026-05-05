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
    cartTitle: "Komand ou",
    totalLabel: "Total",
    checkoutButton: "Achte sou WhatsApp",
    menuEyebrow: "Menu",
    menuTitle: "Preferans",
    themeTitle: "Mod koule",
    themeText: "Chanje ant mod kle ak mod nwa.",
    languageTitle: "Lang",
    languageText: "Chwazi Panyol, Angle oswa Kreyol.",
    pageLinksTitle: "Paj",
    pageLinksText: "Ale nan boutik la oswa paj sou nou an.",
    heroEyebrow: "Acha direk",
    heroActionProducts: "Gade nouvo pwodwi",
    heroActionAbout: "Ale sou nou",
    carouselSectionEyebrow: "Karousel",
    carouselSectionTitle: "Koleksyon vedet",
    newEyebrow: "Nouvo pwodwi",
    newTitle: "Nouvo yo an premye.",
    newPill: "NOUVO",
    catalogEyebrow: "Katalag",
    catalogTitle: "Gade tout sa ki disponib.",
    catalogText: "Filtre pa kategori, ofri oswa nouvo pwodwi san kite paj la.",
    colorsLabel: "Koule",
    sizesLabel: "Gwose",
    addToCart: "Ajoute nan panyen",
    termsLabel: "Tem ak kondisyon",
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
    stockSentence: "Disponib: {colorStock} nan koule {colorName} ak {sizeStock} nan gwose {sizeLabel}.",
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
  slideTimer: null,
  syncMeta: null,
  pollTimer: null
};

function t(key) {
  return translations[appState.language][key] || translations.es[key] || key;
}

function format(template, values) {
  return Object.keys(values).reduce((result, key) => result.replace(`{${key}}`, values[key]), template);
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
    button.textContent = theme === "dark" ? "Sun" : "Moon";
  }
}

function toggleTheme() {
  const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("lb-theme-v3", next);
  applyTheme();
}

async function fetchBaseCatalog() {
  const response = await fetch(`./data/catalog.json?v=${Date.now()}`);
  if (!response.ok) {
    throw new Error("No se pudo cargar el catalogo principal.");
  }
  appState.baseCatalog = await response.json();
}

async function fetchActiveCatalog() {
  const live = await window.CatalogClient.fetchLiveCatalog(appState.baseCatalog);
  appState.syncMeta = live;
  appState.catalog = window.CatalogClient.loadDraft() || live.catalog;
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
  const colors = product.colors || [];
  const color = colors.find((entry) => (entry.images || []).length) || colors[0];
  return (color && ((color.images || [])[0] || color.coverImage)) || "./assets/luis-boutique-logo.jpeg";
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
  document.getElementById("heroTitle").textContent = appState.catalog.store.heroTitle;
  document.getElementById("heroText").textContent = appState.catalog.store.heroText;
  const newest = (appState.catalog.products || []).find((product) => isVisibleNew(product)) || appState.catalog.products[0];
  document.getElementById("heroVisual").src = newest ? getAvailableProductImage(newest) : "./assets/luis-boutique-logo.jpeg";
}

function currentSlideList() {
  return appState.catalog.store.carouselSlides || [];
}

function renderCarousel() {
  if (appState.page !== "store") return;

  const slides = currentSlideList();
  const slidesTarget = document.getElementById("carouselSlides");
  const dotsTarget = document.getElementById("carouselDots");

  if (!slides.length) {
    slidesTarget.innerHTML = "";
    dotsTarget.innerHTML = "";
    return;
  }

  appState.slideIndex = Math.min(appState.slideIndex, slides.length - 1);

  slidesTarget.innerHTML = slides
    .map(
      (slide, index) => `
        <article class="carousel-slide ${index === appState.slideIndex ? "active" : ""}">
          <img src="${slide.image}" alt="${slide.title}" />
        </article>
      `
    )
    .join("");

  dotsTarget.innerHTML = slides
    .map(
      (slide, index) =>
        `<button class="slide-dot ${index === appState.slideIndex ? "active" : ""}" data-slide-index="${index}" aria-label="${slide.title}"></button>`
    )
    .join("");

  const activeSlide = slides[appState.slideIndex];
  document.getElementById("carouselEyebrow").textContent = activeSlide.eyebrow;
  document.getElementById("carouselTitle").textContent = activeSlide.title;
  document.getElementById("carouselText").textContent = activeSlide.text;
}

function moveSlide(direction) {
  const slides = currentSlideList();
  if (!slides.length) return;
  appState.slideIndex = (appState.slideIndex + direction + slides.length) % slides.length;
  renderCarousel();
  resetCarouselTimer();
}

function resetCarouselTimer() {
  window.clearInterval(appState.slideTimer);
  if (appState.page !== "store" || !currentSlideList().length) return;
  appState.slideTimer = window.setInterval(() => {
    moveSlide(1);
  }, 5000);
}

function renderNewProducts() {
  if (appState.page !== "store") return;
  const target = document.getElementById("newGrid");
  const items = (appState.catalog.products || []).filter((product) => isVisibleNew(product)).slice(0, 6);
  target.innerHTML = items.map(renderProductCard).join("");
}

function filterLabel(filter) {
  if (filter === "all") return t("filtersAll");
  if (filter === "new") return t("filtersNew");
  if (filter === "offers") return t("filtersOffers");
  const category = (appState.catalog.categories || []).find((entry) => entry.id === filter);
  return category ? category.label : filter;
}

function renderFilters() {
  if (appState.page !== "store") return;
  const target = document.getElementById("filterRow");
  const filters = ["all", "new", "offers"].concat((appState.catalog.categories || []).map((entry) => entry.id));
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
  const badge = displayBadge(product);
  return `
    <button class="product-card" data-product-id="${product.id}">
      <figure>
        <img src="${getAvailableProductImage(product)}" alt="${product.name}" />
        <span class="status-pill card-pill">${badge}</span>
      </figure>
      <div class="product-copy">
        <div class="product-copy-row">
          <strong>${product.name}</strong>
          <span>${window.CatalogClient.formatMoney(product.price)}</span>
        </div>
        <p>${product.categoryLabel}</p>
      </div>
    </button>
  `;
}

function renderProducts() {
  if (appState.page !== "store") return;
  const target = document.getElementById("productsGrid");
  const items = filteredProducts();
  target.innerHTML = items.length ? items.map(renderProductCard).join("") : `<div class="empty-state">No hay productos visibles para este filtro ahora mismo.</div>`;
}

function renderCart() {
  const summary = window.CatalogClient.summarizeCart(appState.catalog, appState.cart);
  document.getElementById("cartCount").textContent = String(summary.items.reduce((sum, item) => sum + item.quantity, 0));
  document.getElementById("cartTotal").textContent = summary.totalLabel;

  const target = document.getElementById("cartList");
  if (!summary.items.length) {
    target.innerHTML = `<p class="panel-note">${t("cartEmpty")}</p>`;
    return;
  }

  target.innerHTML = summary.items
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image || "./assets/luis-boutique-logo.jpeg"}" alt="${item.name}" />
          <div class="cart-item-copy">
            <strong>${item.name}</strong>
            <span>${item.colorName} / ${item.sizeLabel}</span>
            <span>${item.priceLabel}</span>
            <div class="cart-qty-row">
              <button class="qty-btn" data-cart-change="-1" data-cart-key="${item.key}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-cart-change="1" data-cart-key="${item.key}">+</button>
              <button class="ghost-btn ghost-btn-small" data-cart-remove="${item.key}">Eliminar</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
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

function currentColor(product) {
  return window.CatalogClient.colorById(product, appState.selectedColorId);
}

function currentSize(product) {
  return window.CatalogClient.sizeByLabel(product, appState.selectedSizeLabel);
}

function openProduct(productId) {
  const product = window.CatalogClient.productById(appState.catalog, productId);
  if (!product) return;

  appState.selectedProductId = product.id;
  appState.selectedColorId = (product.colors || [])[0]?.id || null;
  appState.selectedSizeLabel = (product.sizes || [])[0]?.label || null;
  appState.selectedImageIndex = 0;
  renderProductModal();
  document.getElementById("productModal").classList.add("open");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("open");
}

function renderOptionChip({ label, active, disabled, color }, attributes) {
  const style = color ? `style="--chip:${color}"` : "";
  const disabledClass = disabled ? "sold-out" : "";
  return `<button class="color-chip ${active ? "active" : ""} ${disabledClass}" ${style} ${attributes}>${label}</button>`;
}

function renderProductModal() {
  const product = selectedProduct();
  if (!product) return;

  const color = currentColor(product);
  const size = currentSize(product);
  const images = (color && color.images && color.images.length ? color.images : [color?.coverImage].filter(Boolean)) || [];

  document.getElementById("modalCategory").textContent = product.categoryLabel;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalPrice").textContent = window.CatalogClient.formatMoney(product.price);
  document.getElementById("modalPriceOld").textContent = product.originalPrice ? window.CatalogClient.formatMoney(product.originalPrice) : "";
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalMainPhoto").src = images[appState.selectedImageIndex] || getAvailableProductImage(product);

  document.getElementById("modalThumbList").innerHTML = images
    .map(
      (image, index) => `
        <button class="thumb-btn ${index === appState.selectedImageIndex ? "active" : ""}" data-thumb-index="${index}">
          <img src="${image}" alt="${product.name} ${index + 1}" />
        </button>
      `
    )
    .join("");

  document.getElementById("modalColorRow").innerHTML = (product.colors || [])
    .map((entry) =>
      renderOptionChip(
        {
          label: entry.name,
          active: entry.id === appState.selectedColorId,
          disabled: !entry.available || Number(entry.stock || 0) <= 0,
          color: entry.hex
        },
        `data-color-id="${entry.id}"`
      )
    )
    .join("");

  document.getElementById("modalSizeRow").innerHTML = (product.sizes || [])
    .map((entry) =>
      renderOptionChip(
        {
          label: entry.label,
          active: entry.label === appState.selectedSizeLabel,
          disabled: !entry.available || Number(entry.stock || 0) <= 0
        },
        `data-size-label="${entry.label}"`
      )
    )
    .join("");

  document.getElementById("modalStockNote").textContent = format(t("stockSentence"), {
    colorStock: color ? color.stock : 0,
    colorName: color ? color.name : "-",
    sizeStock: size ? size.stock : 0,
    sizeLabel: size ? size.label : "-"
  });
}

function addToCart() {
  const product = selectedProduct();
  if (!product) return;

  const color = currentColor(product);
  const size = currentSize(product);
  if (!color || !size) return;

  const key = `${product.id}:${color.id}:${size.label}`;
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
  openPanel("cart");
}

function changeCartQuantity(key, delta) {
  const item = appState.cart.find((entry) => entry.key === key);
  if (!item) return;
  item.quantity = Math.max(1, Number(item.quantity || 1) + delta);
  setStoredCart();
  renderCart();
}

function removeCartItem(key) {
  appState.cart = appState.cart.filter((entry) => entry.key !== key);
  setStoredCart();
  renderCart();
}

function renderAboutPage() {
  if (appState.page !== "about") return;

  document.getElementById("aboutHeadline").textContent = appState.catalog.about.headline;
  document.getElementById("aboutIntro").textContent = appState.catalog.about.intro;

  const paragraphs = appState.catalog.about.paragraphs || [];
  const highlights = appState.catalog.about.highlights || [];

  document.getElementById("aboutGrid").innerHTML = `
    <article class="content-card">
      <span class="eyebrow">${t("aboutBlock1Title")}</span>
      <p class="panel-note">${paragraphs[0] || ""}</p>
    </article>
    <article class="content-card">
      <span class="eyebrow">${t("aboutBlock2Title")}</span>
      <p class="panel-note">${paragraphs[1] || ""}</p>
    </article>
    <article class="content-card">
      <span class="eyebrow">${t("aboutBlock3Title")}</span>
      <div class="highlight-stack">
        ${highlights.map((item) => `<div class="highlight-row"><strong>${item.label}</strong><span>${item.value}</span></div>`).join("")}
      </div>
    </article>
  `;

  const video = document.getElementById("aboutVideo");
  const videoSource = document.getElementById("aboutVideoSource");
  if (video && videoSource) {
    video.poster = appState.catalog.about.video.poster || "";
    videoSource.src = appState.catalog.about.video.src || "";
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
      { threshold: 0.55 }
    );

    observer.observe(video);
  }
}

function renderCheckoutAction() {
  document.getElementById("checkoutButton").onclick = () => {
    const summary = window.CatalogClient.summarizeCart(appState.catalog, appState.cart);
    if (!summary.items.length) return;

    const lines = [
      t("whatsappIntro"),
      ...summary.items.flatMap((item) => [
        `- ${item.name} / ${item.colorName} / ${item.sizeLabel} x${item.quantity} (${item.subtotalLabel})`,
        item.image ? `${t("whatsappImages")}: ${item.image}` : null
      ].filter(Boolean)),
      `${t("whatsappTotal")}: ${summary.totalLabel}`
    ];

    const whatsappNumber = appState.catalog.store.whatsappNumber || "18099077400";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
        refreshRemoteCatalog(true);
      }
    };
  }

  window.addEventListener("storage", (event) => {
    if (event.key === window.CatalogClient.DRAFT_KEY) {
      appState.catalog = window.CatalogClient.mergeCatalog(appState.baseCatalog);
      renderPage();
    }
  });
}

async function refreshRemoteCatalog(forceRender) {
  const live = await window.CatalogClient.fetchLiveCatalog(appState.baseCatalog);
  appState.syncMeta = live;
  if (window.CatalogClient.loadDraft()) {
    appState.catalog = window.CatalogClient.loadDraft();
  } else {
    appState.catalog = live.catalog;
  }
  if (forceRender !== false) {
    renderPage();
  }
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
    const current = window.scrollY;
    if (current > lastScroll && current > 120) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastScroll = current;
  });

  document.getElementById("cartList")?.addEventListener("click", (event) => {
    const changeButton = event.target.closest("[data-cart-change]");
    if (changeButton) {
      changeCartQuantity(changeButton.dataset.cartKey, Number(changeButton.dataset.cartChange));
      return;
    }

    const removeButton = event.target.closest("[data-cart-remove]");
    if (removeButton) {
      removeCartItem(removeButton.dataset.cartRemove);
    }
  });
}

function bindStorePage() {
  document.getElementById("productsGrid").addEventListener("click", (event) => {
    const productButton = event.target.closest("[data-product-id]");
    if (productButton) {
      openProduct(productButton.dataset.productId);
    }
  });

  document.getElementById("newGrid").addEventListener("click", (event) => {
    const productButton = event.target.closest("[data-product-id]");
    if (productButton) {
      openProduct(productButton.dataset.productId);
    }
  });

  document.getElementById("carouselPrev").addEventListener("click", () => moveSlide(-1));
  document.getElementById("carouselNext").addEventListener("click", () => moveSlide(1));
  document.getElementById("carouselDots").addEventListener("click", (event) => {
    const button = event.target.closest("[data-slide-index]");
    if (!button) return;
    appState.slideIndex = Number(button.dataset.slideIndex);
    renderCarousel();
    resetCarouselTimer();
  });
}

function bindModal() {
  document.getElementById("modalClose")?.addEventListener("click", closeProduct);
  document.getElementById("addToCartButton")?.addEventListener("click", addToCart);

  document.getElementById("productModal")?.addEventListener("click", (event) => {
    if (event.target.id === "productModal") {
      closeProduct();
      return;
    }

    const thumbButton = event.target.closest("[data-thumb-index]");
    if (thumbButton) {
      appState.selectedImageIndex = Number(thumbButton.dataset.thumbIndex);
      renderProductModal();
      return;
    }

    const colorButton = event.target.closest("[data-color-id]");
    if (colorButton) {
      const product = selectedProduct();
      const color = window.CatalogClient.colorById(product, colorButton.dataset.colorId);
      if (!color || !color.available || Number(color.stock || 0) <= 0) return;
      appState.selectedColorId = color.id;
      appState.selectedImageIndex = 0;
      renderProductModal();
      return;
    }

    const sizeButton = event.target.closest("[data-size-label]");
    if (sizeButton) {
      const product = selectedProduct();
      const size = window.CatalogClient.sizeByLabel(product, sizeButton.dataset.sizeLabel);
      if (!size || !size.available || Number(size.stock || 0) <= 0) return;
      appState.selectedSizeLabel = size.label;
      renderProductModal();
    }
  });
}

function startRemotePolling() {
  if (appState.pollTimer) {
    window.clearInterval(appState.pollTimer);
  }

  appState.pollTimer = window.CatalogClient.startPolling(async () => {
    if (window.CatalogClient.loadDraft()) {
      return;
    }
    await refreshRemoteCatalog(true);
  }, 15000);
}

async function init() {
  applyTheme();
  bindCommonEvents();
  bindModal();
  await fetchBaseCatalog();
  await fetchActiveCatalog();
  renderCheckoutAction();
  listenForOwnerDrafts();

  if (appState.page === "store") {
    bindStorePage();
  }

  startRemotePolling();
  renderPage();
}

init().catch((error) => {
  console.error(error);
  window.alert("No se pudo abrir LUIS BOUTIQUE: " + error.message);
});

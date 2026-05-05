const ownerState = {
  catalog: null,
  selectedProductId: null,
  syncMeta: null,
  draftChanged: false
};

function ownerCatalog() {
  return ownerState.catalog;
}

function selectedProduct() {
  return ownerCatalog().products.find((product) => product.id === ownerState.selectedProductId) || ownerCatalog().products[0];
}

async function fetchPublishedCatalog() {
  const response = await fetch(`../data/catalog.json?v=${Date.now()}`);
  if (!response.ok) {
    throw new Error("No se pudo cargar el catalogo publicado.");
  }
  return response.json();
}

function markDraftChanged() {
  ownerState.draftChanged = true;
  renderSyncBanner();
}

function saveDraftOnly() {
  syncAllEditors();
  ownerCatalog().updatedAt = new Date().toISOString();
  window.CatalogClient.saveDraft(ownerCatalog());
  markDraftChanged();
}

function renderSyncBanner(extraMessage) {
  const target = document.getElementById("ownerSyncStatus");
  const snapshot = window.CatalogClient.loadStatusSnapshot();
  const status = ownerState.syncMeta;
  const mode = status?.remote ? "Nube activa" : "Respaldo local";
  const detail = extraMessage || status?.message || (status?.remote ? "Los cambios se pueden publicar a Supabase." : "Todavia estas trabajando sin Supabase activa.");
  const lastUpdate = snapshot?.savedAt || status?.updatedAt || ownerCatalog()?.updatedAt || null;

  target.innerHTML = `
    <div class="owner-status-row">
      <span class="status-pill">${mode}</span>
      <span class="owner-help">${lastUpdate ? `Ultimo movimiento ${window.CatalogClient.relativeTimeLabel(lastUpdate)}.` : "Aun no hay publicaciones remotas."}</span>
    </div>
    <p class="owner-help">${detail}</p>
  `;
}

function renderOwnerList() {
  const target = document.getElementById("ownerProductList");
  target.innerHTML = ownerCatalog().products
    .map(
      (product) => `
        <button class="owner-list-btn ${product.id === ownerState.selectedProductId ? "active" : ""}" data-product-id="${product.id}">
          <strong>${product.name}</strong>
          <div class="owner-help">${product.categoryLabel} · ${window.CatalogClient.formatMoney(product.price)}</div>
        </button>
      `
    )
    .join("");

  target.onclick = (event) => {
    const button = event.target.closest("[data-product-id]");
    if (!button) return;
    syncAllEditors();
    ownerState.selectedProductId = button.dataset.productId;
    renderOwnerList();
    renderProductEditor();
  };
}

function renderCategoryOptions(selectedId) {
  return ownerCatalog().categories
    .map((category) => `<option value="${category.id}" ${category.id === selectedId ? "selected" : ""}>${category.label}</option>`)
    .join("");
}

function fillGeneralEditor() {
  document.getElementById("storeNameInput").value = ownerCatalog().store.name;
  document.getElementById("whatsappInput").value = ownerCatalog().store.whatsappNumber;
  document.getElementById("heroTitleInput").value = ownerCatalog().store.heroTitle;
  document.getElementById("heroTextInput").value = ownerCatalog().store.heroText;
  document.getElementById("aboutHeadlineInput").value = ownerCatalog().about.headline;
  document.getElementById("aboutIntroInput").value = ownerCatalog().about.intro;
  document.getElementById("aboutVideoInput").value = ownerCatalog().about.video.src;
}

function syncGeneralEditor() {
  ownerCatalog().store.name = document.getElementById("storeNameInput").value.trim();
  ownerCatalog().store.whatsappNumber = document.getElementById("whatsappInput").value.trim();
  ownerCatalog().store.heroTitle = document.getElementById("heroTitleInput").value.trim();
  ownerCatalog().store.heroText = document.getElementById("heroTextInput").value.trim();
  ownerCatalog().about.headline = document.getElementById("aboutHeadlineInput").value.trim();
  ownerCatalog().about.intro = document.getElementById("aboutIntroInput").value.trim();
  ownerCatalog().about.video.src = document.getElementById("aboutVideoInput").value.trim();
}

function syncProductEditor() {
  syncGeneralEditor();
  const product = selectedProduct();
  if (!product) return;

  const categoryId = document.getElementById("productCategoryInput").value;
  const category = ownerCatalog().categories.find((entry) => entry.id === categoryId);

  product.name = document.getElementById("productNameInput").value.trim();
  product.slug = product.slug || product.id;
  product.category = categoryId;
  product.categoryLabel = category ? category.label : categoryId;
  product.price = Number(document.getElementById("productPriceInput").value || 0);
  product.originalPrice = Number(document.getElementById("productOriginalPriceInput").value || 0);
  product.status = document.getElementById("productStatusInput").value;
  product.badgeText = document.getElementById("productBadgeInput").value.trim();
  product.stock = Number(document.getElementById("productStockInput").value || 0);
  product.description = document.getElementById("productDescriptionInput").value.trim();
  product.createdAt = document.getElementById("productCreatedAtInput").value
    ? new Date(`${document.getElementById("productCreatedAtInput").value}T12:00:00`).toISOString()
    : product.createdAt;
  product.updatedAt = new Date().toISOString();
}

function renderSlideEditor() {
  const target = document.getElementById("slideEditorList");
  const slides = ownerCatalog().store.carouselSlides || [];

  target.innerHTML = slides
    .map(
      (slide, index) => `
        <div class="mini-card" data-slide-index="${index}">
          <div class="mini-row">
            <div class="field"><label>Eyebrow</label><input data-slide-field="eyebrow" value="${slide.eyebrow}" /></div>
            <div class="field"><label>Titulo</label><input data-slide-field="title" value="${slide.title}" /></div>
            <div class="field full"><label>Texto</label><textarea data-slide-field="text">${slide.text}</textarea></div>
            <div class="field full"><label>Imagen</label><input data-slide-field="image" value="${slide.image}" /></div>
          </div>
          <div class="upload-line">
            <label class="ghost-btn" for="slideUpload-${index}">Subir imagen real</label>
            <input id="slideUpload-${index}" data-slide-upload="${index}" type="file" accept="image/*" hidden />
            <span class="owner-help">Puedes subir una imagen desde tu equipo o pegar un enlace directo.</span>
          </div>
          <div class="mini-actions">
            <button class="small-btn" data-slide-move="up" data-slide-index="${index}">Subir</button>
            <button class="small-btn" data-slide-move="down" data-slide-index="${index}">Bajar</button>
            <button class="ghost-btn" data-remove-slide="${index}">Quitar slide</button>
          </div>
        </div>
      `
    )
    .join("");
}

function syncSlides() {
  document.querySelectorAll("[data-slide-index]").forEach((card) => {
    const index = Number(card.dataset.slideIndex);
    const slide = ownerCatalog().store.carouselSlides[index];
    if (!slide) return;
    slide.eyebrow = card.querySelector("[data-slide-field='eyebrow']").value.trim();
    slide.title = card.querySelector("[data-slide-field='title']").value.trim();
    slide.text = card.querySelector("[data-slide-field='text']").value.trim();
    slide.image = card.querySelector("[data-slide-field='image']").value.trim();
  });
}

function renderColorEditor(product) {
  const target = document.getElementById("colorsEditor");
  target.innerHTML = product.colors
    .map(
      (color, index) => `
        <div class="mini-card" data-color-index="${index}">
          <div class="mini-row">
            <div class="field"><label>Nombre</label><input data-color-field="name" value="${color.name}" /></div>
            <div class="field"><label>Hex</label><input data-color-field="hex" value="${color.hex}" /></div>
            <div class="field"><label>Stock</label><input type="number" min="0" data-color-field="stock" value="${color.stock}" /></div>
            <div class="field">
              <label>Disponible</label>
              <select data-color-field="available">
                <option value="true" ${color.available ? "selected" : ""}>Si</option>
                <option value="false" ${!color.available ? "selected" : ""}>No</option>
              </select>
            </div>
            <div class="field full"><label>Imagen 1</label><input data-color-image="0" value="${(color.images || [])[0] || ""}" /></div>
            <div class="field full"><label>Imagen 2</label><input data-color-image="1" value="${(color.images || [])[1] || ""}" /></div>
            <div class="field full"><label>Imagen 3</label><input data-color-image="2" value="${(color.images || [])[2] || ""}" /></div>
          </div>
          <div class="upload-line">
            <label class="ghost-btn" for="colorUpload-${index}">Subir imagen real</label>
            <input id="colorUpload-${index}" data-color-upload="${index}" type="file" accept="image/*" multiple hidden />
            <span class="owner-help">Sube hasta 3 fotos del mismo color.</span>
          </div>
          <div class="mini-actions">
            <button class="ghost-btn" data-remove-color="${index}">Quitar color</button>
          </div>
        </div>
      `
    )
    .join("");
}

function renderSizeEditor(product) {
  const target = document.getElementById("sizesEditor");
  target.innerHTML = product.sizes
    .map(
      (size, index) => `
        <div class="mini-card" data-size-index="${index}">
          <div class="mini-row">
            <div class="field"><label>Talla</label><input data-size-field="label" value="${size.label}" /></div>
            <div class="field"><label>Stock</label><input type="number" min="0" data-size-field="stock" value="${size.stock}" /></div>
            <div class="field full">
              <label>Disponible</label>
              <select data-size-field="available">
                <option value="true" ${size.available ? "selected" : ""}>Si</option>
                <option value="false" ${!size.available ? "selected" : ""}>No</option>
              </select>
            </div>
          </div>
          <div class="mini-actions">
            <button class="ghost-btn" data-remove-size="${index}">Quitar talla</button>
          </div>
        </div>
      `
    )
    .join("");
}

function renderProductEditor() {
  const product = selectedProduct();
  if (!product) return;

  document.getElementById("productNameInput").value = product.name;
  document.getElementById("productCategoryInput").innerHTML = renderCategoryOptions(product.category);
  document.getElementById("productPriceInput").value = product.price;
  document.getElementById("productOriginalPriceInput").value = product.originalPrice || 0;
  document.getElementById("productStatusInput").value = product.status || "standard";
  document.getElementById("productBadgeInput").value = product.badgeText || "";
  document.getElementById("productStockInput").value = product.stock || 0;
  document.getElementById("productDescriptionInput").value = product.description || "";
  document.getElementById("productCreatedAtInput").value = product.createdAt ? new Date(product.createdAt).toISOString().slice(0, 10) : "";

  renderColorEditor(product);
  renderSizeEditor(product);
}

function syncColors() {
  const product = selectedProduct();
  document.querySelectorAll("[data-color-index]").forEach((card) => {
    const index = Number(card.dataset.colorIndex);
    const color = product.colors[index];
    if (!color) return;
    color.name = card.querySelector("[data-color-field='name']").value.trim();
    color.hex = card.querySelector("[data-color-field='hex']").value.trim();
    color.stock = Number(card.querySelector("[data-color-field='stock']").value || 0);
    color.available = card.querySelector("[data-color-field='available']").value === "true";
    color.images = [0, 1, 2]
      .map((slot) => card.querySelector(`[data-color-image='${slot}']`).value.trim())
      .filter(Boolean);
    color.coverImage = color.images[0] || color.coverImage || "";
  });
}

function syncSizes() {
  const product = selectedProduct();
  document.querySelectorAll("[data-size-index]").forEach((card) => {
    const index = Number(card.dataset.sizeIndex);
    const size = product.sizes[index];
    if (!size) return;
    size.label = card.querySelector("[data-size-field='label']").value.trim();
    size.stock = Number(card.querySelector("[data-size-field='stock']").value || 0);
    size.available = card.querySelector("[data-size-field='available']").value === "true";
  });
}

function syncAllEditors() {
  syncSlides();
  syncProductEditor();
  syncColors();
  syncSizes();
  ownerCatalog().updatedAt = new Date().toISOString();
}

function rerenderAll() {
  renderOwnerList();
  renderProductEditor();
  renderSlideEditor();
  renderSyncBanner();
}

async function handleColorUpload(input) {
  const product = selectedProduct();
  const color = product.colors[Number(input.dataset.colorUpload)];
  if (!color || !input.files.length) return;
  const files = Array.from(input.files).slice(0, 3);
  color.images = [];
  for (const file of files) {
    color.images.push(await window.CatalogClient.fileToDataUrl(file, 1100));
  }
  color.coverImage = color.images[0] || color.coverImage || "";
  saveDraftOnly();
  rerenderAll();
}

async function handleSlideUpload(input) {
  const slide = ownerCatalog().store.carouselSlides[Number(input.dataset.slideUpload)];
  if (!slide || !input.files[0]) return;
  slide.image = await window.CatalogClient.fileToDataUrl(input.files[0], 1400);
  saveDraftOnly();
  rerenderAll();
}

function addProduct() {
  syncAllEditors();
  const product = window.CatalogClient.buildEmptyProduct(ownerCatalog());
  ownerCatalog().products.unshift(product);
  ownerState.selectedProductId = product.id;
  saveDraftOnly();
  rerenderAll();
}

function deleteProduct() {
  if (ownerCatalog().products.length <= 1) {
    window.alert("Debes dejar al menos un producto en el catalogo.");
    return;
  }
  const confirmed = window.confirm("Seguro que quieres eliminar este producto?");
  if (!confirmed) return;
  ownerCatalog().products = ownerCatalog().products.filter((product) => product.id !== ownerState.selectedProductId);
  ownerState.selectedProductId = ownerCatalog().products[0].id;
  saveDraftOnly();
  rerenderAll();
}

function addColor() {
  const product = selectedProduct();
  product.colors.push({
    id: `color-${Date.now()}`,
    name: "Nuevo color",
    hex: "#cccccc",
    available: true,
    stock: 1,
    images: [],
    coverImage: ""
  });
  saveDraftOnly();
  renderProductEditor();
}

function addSize() {
  const product = selectedProduct();
  product.sizes.push({
    label: "Nueva",
    available: true,
    stock: 1
  });
  saveDraftOnly();
  renderProductEditor();
}

function addSlide() {
  ownerCatalog().store.carouselSlides.push({
    id: `slide-${Date.now()}`,
    eyebrow: "COLECCION DESTACADA",
    title: "Nuevo slide",
    text: "Edita este texto desde la consola owner.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&h=1500&q=80"
  });
  saveDraftOnly();
  renderSlideEditor();
}

function moveSlide(index, direction) {
  const slides = ownerCatalog().store.carouselSlides;
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (nextIndex < 0 || nextIndex >= slides.length) return;
  const temp = slides[index];
  slides[index] = slides[nextIndex];
  slides[nextIndex] = temp;
  saveDraftOnly();
  renderSlideEditor();
}

function downloadDraft() {
  syncAllEditors();
  const blob = new Blob([JSON.stringify(ownerCatalog(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "luis-boutique-catalog.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

async function importDraft(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  ownerState.catalog = parsed;
  ownerState.selectedProductId = ownerState.catalog.products[0]?.id || null;
  window.CatalogClient.saveDraft(ownerState.catalog);
  ownerState.draftChanged = true;
  fillGeneralEditor();
  rerenderAll();
}

async function resetToPublished() {
  const confirmed = window.confirm("Se perdera el borrador local actual. Quieres volver al catalogo publicado?");
  if (!confirmed) return;
  window.CatalogClient.clearDraft();
  const base = await fetchPublishedCatalog();
  const live = await window.CatalogClient.fetchLiveCatalog(base);
  ownerState.catalog = live.catalog;
  ownerState.syncMeta = live;
  ownerState.selectedProductId = ownerState.catalog.products[0]?.id || null;
  ownerState.draftChanged = false;
  fillGeneralEditor();
  rerenderAll();
}

async function publishChanges() {
  syncAllEditors();
  const confirmed = window.confirm("Confirmas que quieres publicar estos cambios?");
  if (!confirmed) return;

  try {
    const payload = await window.CatalogClient.publishCatalog(ownerCatalog());
    ownerState.syncMeta = payload;
    ownerState.catalog = payload.catalog || ownerCatalog();
    ownerState.draftChanged = false;
    window.CatalogClient.saveDraft(ownerState.catalog);
    renderSyncBanner(payload.message || "Cambios publicados.");
    window.alert(payload.message || "Cambios publicados.");
  } catch (error) {
    renderSyncBanner(error.message);
    window.alert(`No se pudo publicar: ${error.message}`);
  }
}

function bindGeneralAutosave() {
  [
    "storeNameInput",
    "whatsappInput",
    "heroTitleInput",
    "heroTextInput",
    "aboutHeadlineInput",
    "aboutIntroInput",
    "aboutVideoInput",
    "productNameInput",
    "productCategoryInput",
    "productPriceInput",
    "productOriginalPriceInput",
    "productStatusInput",
    "productBadgeInput",
    "productStockInput",
    "productDescriptionInput",
    "productCreatedAtInput"
  ].forEach((id) => {
    document.getElementById(id).addEventListener("input", saveDraftOnly);
    document.getElementById(id).addEventListener("change", saveDraftOnly);
  });
}

function bindOwnerEvents() {
  document.getElementById("addProductButton").addEventListener("click", addProduct);
  document.getElementById("deleteProductButton").addEventListener("click", deleteProduct);
  document.getElementById("addColorButton").addEventListener("click", addColor);
  document.getElementById("addSizeButton").addEventListener("click", addSize);
  document.getElementById("addSlideButton").addEventListener("click", addSlide);
  document.getElementById("publishButton").addEventListener("click", publishChanges);
  document.getElementById("saveDraftButton").addEventListener("click", () => {
    saveDraftOnly();
    renderSyncBanner("Borrador guardado. La tienda del mismo navegador ya puede verlo sin recargar.");
  });
  document.getElementById("downloadDraftButton").addEventListener("click", downloadDraft);
  document.getElementById("clearDraftButton").addEventListener("click", resetToPublished);
  document.getElementById("importDraftInput").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    await importDraft(file);
    event.target.value = "";
  });

  document.getElementById("colorsEditor").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-color]");
    if (removeButton) {
      selectedProduct().colors.splice(Number(removeButton.dataset.removeColor), 1);
      saveDraftOnly();
      renderProductEditor();
    }
  });

  document.getElementById("sizesEditor").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-size]");
    if (removeButton) {
      selectedProduct().sizes.splice(Number(removeButton.dataset.removeSize), 1);
      saveDraftOnly();
      renderProductEditor();
    }
  });

  document.getElementById("slideEditorList").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-slide]");
    if (removeButton) {
      ownerCatalog().store.carouselSlides.splice(Number(removeButton.dataset.removeSlide), 1);
      saveDraftOnly();
      renderSlideEditor();
      return;
    }

    const moveButton = event.target.closest("[data-slide-move]");
    if (moveButton) {
      moveSlide(Number(moveButton.dataset.slideIndex), moveButton.dataset.slideMove);
    }
  });

  document.getElementById("colorsEditor").addEventListener("change", async (event) => {
    const uploadInput = event.target.closest("[data-color-upload]");
    if (uploadInput) {
      await handleColorUpload(uploadInput);
      return;
    }
    saveDraftOnly();
  });

  document.getElementById("colorsEditor").addEventListener("input", saveDraftOnly);
  document.getElementById("sizesEditor").addEventListener("input", saveDraftOnly);
  document.getElementById("sizesEditor").addEventListener("change", saveDraftOnly);
  document.getElementById("slideEditorList").addEventListener("input", saveDraftOnly);
  document.getElementById("slideEditorList").addEventListener("change", async (event) => {
    const uploadInput = event.target.closest("[data-slide-upload]");
    if (uploadInput) {
      await handleSlideUpload(uploadInput);
      return;
    }
    saveDraftOnly();
  });

  bindGeneralAutosave();
}

async function initOwner() {
  const published = await fetchPublishedCatalog();
  const live = await window.CatalogClient.fetchLiveCatalog(published);
  ownerState.syncMeta = live;
  ownerState.catalog = window.CatalogClient.loadDraft() || live.catalog;
  ownerState.selectedProductId = ownerState.catalog.products[0]?.id || null;
  fillGeneralEditor();
  renderOwnerList();
  renderProductEditor();
  renderSlideEditor();
  renderSyncBanner();
  bindOwnerEvents();
}

initOwner().catch((error) => {
  console.error(error);
  window.alert("No se pudo abrir la consola owner: " + error.message);
});

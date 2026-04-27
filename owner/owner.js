const ownerState = {
  catalog: null,
  repo: "Locomarss/luis-boutique",
  branch: "main",
  token: "",
  selectedProductId: null
};

function ownerElements() {
  return {
    login: document.getElementById("ownerLogin"),
    dashboard: document.getElementById("ownerDashboard"),
    accessCode: document.getElementById("accessCode"),
    githubToken: document.getElementById("githubToken"),
    repoName: document.getElementById("repoName"),
    branchName: document.getElementById("branchName"),
    loginMessage: document.getElementById("loginMessage"),
    productList: document.getElementById("ownerProductList")
  };
}

async function loadCatalog() {
  const response = await fetch("../data/catalog.json?v=" + Date.now());
  if (!response.ok) throw new Error("No se pudo cargar data/catalog.json");
  ownerState.catalog = await response.json();
}

function currentProduct() {
  return ownerState.catalog.products.find((product) => product.id === ownerState.selectedProductId) || ownerState.catalog.products[0];
}

function setMessage(text, isError) {
  const message = document.getElementById("loginMessage");
  message.textContent = text;
  message.style.color = isError ? "#d51317" : "";
}

function fillGeneralFields() {
  document.getElementById("storeName").value = ownerState.catalog.store.name;
  document.getElementById("whatsNumber").value = ownerState.catalog.store.whatsappNumber;
  document.getElementById("heroTitleInput").value = ownerState.catalog.store.heroTitle;
  document.getElementById("heroTextInput").value = ownerState.catalog.store.heroText;
  document.getElementById("aboutHeadlineInput").value = ownerState.catalog.about.headline;
  document.getElementById("aboutIntroInput").value = ownerState.catalog.about.intro;
  document.getElementById("aboutVideoInput").value = ownerState.catalog.about.video.src;
  document.getElementById("lastUpdatedText").textContent = `Ultima actualizacion registrada: ${new Date(ownerState.catalog.updatedAt).toLocaleString("es-DO")}`;
}

function syncGeneralFields() {
  ownerState.catalog.store.name = document.getElementById("storeName").value.trim();
  ownerState.catalog.store.whatsappNumber = document.getElementById("whatsNumber").value.trim();
  ownerState.catalog.store.heroTitle = document.getElementById("heroTitleInput").value.trim();
  ownerState.catalog.store.heroText = document.getElementById("heroTextInput").value.trim();
  ownerState.catalog.about.headline = document.getElementById("aboutHeadlineInput").value.trim();
  ownerState.catalog.about.intro = document.getElementById("aboutIntroInput").value.trim();
  ownerState.catalog.about.video.src = document.getElementById("aboutVideoInput").value.trim();
}

function renderProductList() {
  const target = ownerElements().productList;
  target.innerHTML = ownerState.catalog.products
    .map(
      (product) => `
        <button class="product-pill ${product.id === ownerState.selectedProductId ? "active" : ""}" data-product-id="${product.id}">
          <strong>${product.name}</strong>
          <div class="muted">${product.categoryLabel} · ${window.CatalogClient.formatMoney(product.price)}</div>
        </button>
      `
    )
    .join("");

  target.onclick = (event) => {
    const button = event.target.closest("[data-product-id]");
    if (!button) return;
    ownerState.selectedProductId = button.dataset.productId;
    renderProductList();
    renderProductEditor();
  };
}

function renderCategoryOptions(selected) {
  return ownerState.catalog.categories
    .map((category) => `<option value="${category.id}" ${category.id === selected ? "selected" : ""}>${category.label}</option>`)
    .join("");
}

function renderProductEditor() {
  const product = currentProduct();
  if (!product) return;

  document.getElementById("productName").value = product.name;
  document.getElementById("productCategory").innerHTML = renderCategoryOptions(product.category);
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productOriginalPrice").value = product.originalPrice;
  document.getElementById("productStatus").value = product.status;
  document.getElementById("productBadgeText").value = product.badgeText;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productNewArrival").value = String(product.isNewArrival);

  document.getElementById("colorsEditor").innerHTML = product.colors
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
            <div class="field full"><label>Imagen 1</label><input data-color-image="0" value="${color.images[0] || ""}" /></div>
            <div class="field full"><label>Imagen 2</label><input data-color-image="1" value="${color.images[1] || ""}" /></div>
            <div class="field full"><label>Imagen 3</label><input data-color-image="2" value="${color.images[2] || ""}" /></div>
          </div>
          <div class="mini-actions"><button class="ghost-btn" data-remove-color="${index}">Quitar color</button></div>
        </div>
      `
    )
    .join("");

  document.getElementById("sizesEditor").innerHTML = product.sizes
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
          <div class="mini-actions"><button class="ghost-btn" data-remove-size="${index}">Quitar talla</button></div>
        </div>
      `
    )
    .join("");
}

function syncProductEditor() {
  syncGeneralFields();
  const product = currentProduct();
  if (!product) {
    return;
  }
  const categoryId = document.getElementById("productCategory").value;
  const category = ownerState.catalog.categories.find((item) => item.id === categoryId);

  product.name = document.getElementById("productName").value.trim();
  product.category = categoryId;
  product.categoryLabel = category ? category.label : categoryId;
  product.price = Number(document.getElementById("productPrice").value || 0);
  product.originalPrice = Number(document.getElementById("productOriginalPrice").value || 0);
  product.status = document.getElementById("productStatus").value;
  product.badgeText = document.getElementById("productBadgeText").value.trim();
  product.description = document.getElementById("productDescription").value.trim();
  product.stock = Number(document.getElementById("productStock").value || 0);
  product.isNewArrival = document.getElementById("productNewArrival").value === "true";

  document.querySelectorAll("[data-color-index]").forEach((card) => {
    const index = Number(card.dataset.colorIndex);
    const color = product.colors[index];
    color.name = card.querySelector("[data-color-field='name']").value.trim();
    color.hex = card.querySelector("[data-color-field='hex']").value.trim();
    color.stock = Number(card.querySelector("[data-color-field='stock']").value || 0);
    color.available = card.querySelector("[data-color-field='available']").value === "true";
    color.images = [0, 1, 2]
      .map((position) => card.querySelector(`[data-color-image='${position}']`).value.trim())
      .filter(Boolean);
  });

  document.querySelectorAll("[data-size-index]").forEach((card) => {
    const index = Number(card.dataset.sizeIndex);
    const size = product.sizes[index];
    size.label = card.querySelector("[data-size-field='label']").value.trim();
    size.stock = Number(card.querySelector("[data-size-field='stock']").value || 0);
    size.available = card.querySelector("[data-size-field='available']").value === "true";
  });
}

function addProduct() {
  const product = window.CatalogClient.buildEmptyProduct(ownerState.catalog);
  ownerState.catalog.products.unshift(product);
  ownerState.selectedProductId = product.id;
  renderProductList();
  renderProductEditor();
}

function deleteProduct() {
  if (!ownerState.selectedProductId) return;
  if (ownerState.catalog.products.length <= 1) {
    window.alert("Debes dejar al menos un producto en el catalogo.");
    return;
  }
  const confirmed = window.confirm("Seguro que quieres eliminar este producto?");
  if (!confirmed) return;
  ownerState.catalog.products = ownerState.catalog.products.filter((product) => product.id !== ownerState.selectedProductId);
  ownerState.selectedProductId = ownerState.catalog.products[0]?.id || null;
  renderProductList();
  renderProductEditor();
}

async function publishCatalog() {
  syncProductEditor();
  const confirmed = window.confirm("Confirmas publicar estos cambios a la nube?");
  if (!confirmed) return;

  ownerState.catalog.updatedAt = new Date().toISOString();

  const repo = ownerState.repo;
  const branch = ownerState.branch;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${ownerState.token}`
  };

  const getResponse = await fetch(`https://api.github.com/repos/${repo}/contents/data/catalog.json?ref=${branch}`, { headers });
  if (!getResponse.ok) {
    throw new Error("No se pudo leer el archivo remoto data/catalog.json");
  }

  const remoteFile = await getResponse.json();
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(ownerState.catalog, null, 2))));

  const saveResponse = await fetch(`https://api.github.com/repos/${repo}/contents/data/catalog.json`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "Update catalog from owner console",
      content,
      sha: remoteFile.sha,
      branch
    })
  });

  if (!saveResponse.ok) {
    const problem = await saveResponse.text();
    throw new Error(problem);
  }

  document.getElementById("lastUpdatedText").textContent = "Cambios publicados. GitHub Pages puede tardar unos segundos en reflejarlos.";
  window.alert("Cambios publicados correctamente.");
}

function bindOwnerEvents() {
  document.getElementById("addProductButton").addEventListener("click", addProduct);
  document.getElementById("deleteProductButton").addEventListener("click", deleteProduct);
  document.getElementById("previewBuyerButton").addEventListener("click", () => window.open("../index.html", "_blank"));
  document.getElementById("publishButton").addEventListener("click", async () => {
    try {
      await publishCatalog();
      renderProductList();
      renderProductEditor();
    } catch (error) {
      window.alert("No se pudo publicar: " + error.message);
    }
  });

  document.getElementById("addColorButton").addEventListener("click", () => {
    currentProduct().colors.push({
      id: `color-${Date.now()}`,
      name: "Nuevo color",
      hex: "#bbbbbb",
      available: true,
      stock: 1,
      images: []
    });
    renderProductEditor();
  });

  document.getElementById("addSizeButton").addEventListener("click", () => {
    currentProduct().sizes.push({
      label: "Nueva",
      available: true,
      stock: 1
    });
    renderProductEditor();
  });

  document.getElementById("colorsEditor").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-color]");
    if (!button) return;
    currentProduct().colors.splice(Number(button.dataset.removeColor), 1);
    renderProductEditor();
  });

  document.getElementById("sizesEditor").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-size]");
    if (!button) return;
    currentProduct().sizes.splice(Number(button.dataset.removeSize), 1);
    renderProductEditor();
  });
}

async function unlockOwnerApp() {
  try {
    if (!ownerState.catalog) {
      await loadCatalog();
    }

    const accessCode = ownerElements().accessCode.value;
    const codeHash = await window.CatalogClient.sha256(accessCode);

    if (codeHash !== ownerState.catalog.security.ownerCodeHash) {
      setMessage("Codigo incorrecto. Intenta otra vez.", true);
      return;
    }

    ownerState.token = ownerElements().githubToken.value.trim();
    ownerState.repo = ownerElements().repoName.value.trim();
    ownerState.branch = ownerElements().branchName.value.trim();
    ownerState.selectedProductId = ownerState.catalog.products[0].id;

    ownerElements().login.classList.remove("active");
    ownerElements().dashboard.classList.add("active");
    fillGeneralFields();
    renderProductList();
    renderProductEditor();
    bindOwnerEvents();
  } catch (error) {
    setMessage("No se pudo abrir la consola: " + error.message, true);
  }
}

document.getElementById("unlockButton").addEventListener("click", unlockOwnerApp);

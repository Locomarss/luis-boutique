# LUIS BOUTIQUE

Proyecto con dos experiencias separadas:

- `index.html`: tienda para compradores
- `nosotros.html`: pagina de informacion de la boutique
- `owner/index.html`: consola separada para duenos

## Lo nuevo

- Logo real integrado desde la imagen original
- Header pegado arriba, sin efecto flotante
- Precios en pesos dominicanos
- Pagina principal de entrada: tienda
- Pagina `Nosotros` aparte con video que se reproduce al entrar en pantalla
- Carrito lateral con cerrar al tocar afuera
- Botones `-`, `+` y eliminar articulo en carrito
- Productos nuevos arriba
- Filtros `Todos`, `Nuevo`, `Ofertas` y categorias
- Colores y tallas no disponibles en gris con raya diagonal
- Consola de duenos separada para editar catalogo y publicar cambios

## Catalogo editable

Toda la informacion editable esta en:

`data/catalog.json`

Desde ahi salen:

- Nombre de tienda
- WhatsApp
- Textos principales
- Video de `Nosotros`
- Productos
- Colores
- Tallas
- Stock
- Estado visual `new`, `sale`, `offer`, `standard`

## Consola owner

La consola de duenos publica cambios al mismo repositorio usando GitHub API.

Campos que puedes editar:

- Nombre del producto
- Categoria
- Precio actual
- Precio original
- Stock visible
- Badge
- Estado visual
- Si sale arriba en `Nuevos productos`
- Colores
- Tallas
- Imagenes por color
- Textos generales de tienda y nosotros

## Ejecutar localmente

```bash
node server.js
```

Luego abre:

- `http://localhost:3000/`
- `http://localhost:3000/nosotros.html`
- `http://localhost:3000/owner/`

## API local

- `GET /api/catalog`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`
- `POST /api/cart`

## Publicado

- Tienda: `https://locomarss.github.io/luis-boutique/`
- Nosotros: `https://locomarss.github.io/luis-boutique/nosotros.html`
- Owner: `https://locomarss.github.io/luis-boutique/owner/`

## Nota de seguridad

La consola owner esta separada y pide codigo de acceso mas token de GitHub para publicar cambios.
Como esta desplegada en GitHub Pages, esta proteccion es ligera y pensada para este flujo sin backend dedicado.
Si luego quieres seguridad fuerte de verdad, lo correcto es migrar la consola owner a un backend con autenticacion real.

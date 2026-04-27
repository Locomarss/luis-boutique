# LUIS BOUTIQUE

Tienda online inspirada en una experiencia premium tipo Nike, personalizada para `LUIS BOUTIQUE`.

## Incluye

- SPA responsive y adaptativa
- Header inteligente con hover shimmer y auto-hide al hacer scroll
- Secciones `Nosotros` y `Tienda`
- Carrusel con imagen y video
- Catálogo por categorías con más de 80 productos de prueba
- Detalle de producto con variantes, tallas e imágenes dinámicas
- Carrito lateral con checkout por WhatsApp
- Sidebar de configuración con modo claro/oscuro e idiomas
- API REST para productos, categorías y resumen de carrito
- Estructura lista para desplegar en Vercel sin dependencias externas

## Stack

- Frontend: HTML, CSS y JavaScript
- Backend local: Node.js nativo con `http`
- Backend deploy-ready: funciones serverless en `api/`
- Datos: `lib/store.js`
- Esquema SQL editable: `database/schema.sql`

## Ejecutar localmente

```bash
node server.js
```

Luego abre `http://localhost:3000`.

## API REST

- `GET /api/products`
- `GET /api/products?category=zapatos`
- `GET /api/products/:id`
- `GET /api/categories`
- `POST /api/cart`

## Personalización

- Logo temporal `LB`: [index.html](C:/Users/yadie/OneDrive/Escritorio/luis-boutique/index.html)
- Diseño visual: [styles.css](C:/Users/yadie/OneDrive/Escritorio/luis-boutique/styles.css)
- Productos y categorías: [lib/store.js](C:/Users/yadie/OneDrive/Escritorio/luis-boutique/lib/store.js)
- Textos, idiomas y lógica UI: [app.js](C:/Users/yadie/OneDrive/Escritorio/luis-boutique/app.js)

## Deploy en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repo en Vercel.
3. Vercel servirá `index.html` y las rutas de `api/`.

## Nota

Por las restricciones de instalación en esta ruta de OneDrive, el proyecto quedó implementado sin dependencias externas para asegurar que funcione y sea editable aquí mismo. Si quieres, en la siguiente iteración puedo migrarlo a React/Next.js y conectarlo a MySQL o MongoDB real en una ruta fuera de OneDrive o con permisos de instalación completos.

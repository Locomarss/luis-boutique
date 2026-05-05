# LUIS BOUTIQUE

Proyecto dividido en tres vistas:

- `index.html`: tienda para compradores
- `nosotros.html`: pagina de informacion de la boutique
- `owner/index.html`: consola separada para duenos

## Mejoras principales

- Logo real integrado
- Header fijo arriba con ocultar/mostrar al hacer scroll
- Cambio de idioma: Espanol, English y Creole
- Carrusel editable desde owner
- Productos nuevos arriba y badge automatico por 7 dias
- Filtros `Todos`, `Nuevo`, `Ofertas` y categorias
- Precios en pesos dominicanos
- Carrito con `-`, `+`, eliminar y cierre al tocar afuera
- Colores y tallas agotados en gris con raya diagonal
- Subida de imagen real para productos y carrusel
- Owner mas simple y sin login
- Borrador local con previsualizacion casi en tiempo real
- Capa `live` preparada para publicar a Supabase sin romper la version estatica

## Como funciona ahora

La app trabaja en dos modos:

1. `Modo local`
Se apoya en `data/catalog.json` y en el borrador del navegador. Esto funciona en GitHub Pages aunque no haya backend.

2. `Modo nube`
Si el backend tiene configurado Supabase, la tienda lee y publica el catalogo completo desde la nube usando `/api/live/catalog`.

## Supabase

El proyecto ya viene preparado para usar Supabase en el backend sin login en la pagina owner.

Variables de entorno esperadas:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_CATALOG_TABLE`
- `SUPABASE_CATALOG_ROW_ID`

Valores recomendados:

- `SUPABASE_CATALOG_TABLE=lb_catalog`
- `SUPABASE_CATALOG_ROW_ID=catalog`

SQL base:

- [database/supabase.sql](./database/supabase.sql)

Importante:

- Esta opcion `sin login` no es segura de verdad.
- Si alguien tiene el link del owner y el backend publica sin auth, podria editar.
- Es una solucion comoda, no una proteccion real.

## Catalogo editable

Archivo base:

- `data/catalog.json`

El owner hace esto:

- guarda borrador local para previsualizar
- permite importar/exportar JSON
- publica el catalogo completo al endpoint live cuando confirmas cambios

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
- `GET /api/live/catalog`
- `POST /api/live/catalog`

## Publicado

- Tienda: `https://locomarss.github.io/luis-boutique/`
- Nosotros: `https://locomarss.github.io/luis-boutique/nosotros.html`
- Owner: `https://locomarss.github.io/luis-boutique/owner/`

## Nota practica

Si quieres que el modo nube quede realmente activo para todos los dispositivos, el siguiente paso es desplegar este repo en Vercel y poner ahi las variables de entorno de Supabase. La tienda seguira funcionando en GitHub Pages mientras tanto, pero el guardado compartido en la nube depende de ese backend.

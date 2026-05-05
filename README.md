# LUIS BOUTIQUE

Proyecto dividido en dos experiencias:

- `index.html`: tienda para compradores
- `nosotros.html`: pagina de informacion de la boutique
- `owner/index.html`: consola separada para duenos

## Mejoras principales

- Logo real integrado
- Header fijo arriba
- Cambio de idioma: Espanol, English y Creole
- Carrusel editable desde la pagina owner
- Productos nuevos arriba y badge automatico por 7 dias
- Filtros `Todos`, `Nuevo`, `Ofertas` y categorias
- Precios en pesos dominicanos
- Carrito con `-`, `+`, eliminar y cierre al tocar afuera
- Colores y tallas agotados en gris con raya diagonal
- Subida de imagen real para productos y carrusel
- Pagina owner mas simple y sin login
- Borrador en vivo con actualizacion casi en tiempo real en el mismo navegador

## Catalogo editable

El archivo base sigue siendo:

`data/catalog.json`

La pagina owner trabaja sobre ese catalogo y guarda un borrador local en el navegador.

## Como funciona la pagina owner

- No pide inicio de sesion
- Si alguien tiene el link, puede editar en ese navegador
- Los cambios se ven al instante en la pagina del comprador abierta en el mismo navegador
- Puedes descargar el catalogo en JSON
- Puedes importar un catalogo JSON
- Puedes volver al catalogo publicado

## Importante

Como esta version esta montada en GitHub Pages, no hay backend privado. Eso significa:

- si cierras sesion del navegador o cambias de dispositivo, el borrador no viaja solo
- para un sistema de cuentas reales con correo y contrasena hace falta un backend real o un servicio de auth

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

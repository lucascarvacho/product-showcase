# Vue Product Showcase

Proyecto del Módulo 7 (Desarrollo de aplicaciones front-end con Vue) — catálogo interactivo de productos.

## Estado actual: Lección 1 — Componentes y ciclo de vida

Estructura base creada:
- `App.vue`: layout raíz (Header + router-view + Footer)
- `AppHeader.vue` / `AppFooter.vue`
- `ProductList.vue`: usa el ciclo de vida `created()` para cargar productos (datos estáticos por ahora)
- `ProductCard.vue`: card reutilizable con botón "Ver" y estrella de favorito (sin lógica aún)
- Rutas base (`vue-router`): Home, Catálogo, Favoritos, Detalle, Editar

## Instalación

```bash
npm install
npm run serve
```

La app queda disponible en `http://localhost:8080`.

## API mock (json-server)

```bash
npm run api
```

Levanta `db.json` en `http://localhost:3001`. Los productos "por defecto" tienen `isDefault: true`;
los que cree el usuario se guardarán con `isDefault: false` (o sin esa propiedad) — esto se conecta
en la Lección 2 (consumo de API) y Lección 3 (Vuex).

## Justificaciones técnicas

- **Vue 3 + Vuex 4 + Vue Router 4**: stack actual recomendado para Vue 3, mantenido y compatible con Vue CLI.
- **Persistencia real vía json-server**: los productos creados por el usuario se guardan mediante
  peticiones REST (POST/PUT/DELETE), no solo en el estado de Vuex, para que la demo sea consistente
  entre recargas.
- **Proxy en `vue.config.js`**: evita problemas de CORS entre el front (puerto 8080) y json-server (puerto 3001).

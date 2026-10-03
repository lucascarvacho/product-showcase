import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import FavoritosView from '../views/FavoritosView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductEditView from '../views/ProductEditView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalogo', name: 'catalogo', component: CatalogoView },
  { path: '/favoritos', name: 'favoritos', component: FavoritosView },
  { path: '/producto/:id', name: 'producto-detalle', component: ProductDetailView, props: true },
  { path: '/producto/:id/editar', name: 'producto-editar', component: ProductEditView, props: true }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

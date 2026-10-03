<template>
  <div>
    <h2 class="text-h5 mb-4">Favoritos</h2>

    <div v-if="cargando" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <p v-else-if="productosFavoritos.length === 0" class="text-medium-emphasis">
      Aún no hay productos favoritos.
    </p>

    <v-row v-else>
      <v-col v-for="producto in productosFavoritos" :key="producto.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :producto="producto" :es-favorito="true" @toggle-favorito="toggleFavorito" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'FavoritosView',
  components: { ProductCard },
  computed: {
    ...mapState('productos', ['lista', 'cargando']),
    ...mapState('favoritos', { idsFavoritos: 'ids' }),
    productosFavoritos() {
      return this.lista.filter((p) => this.idsFavoritos.includes(p.id))
    }
  },
  created() {
    if (this.lista.length === 0) this.fetchProductos()
  },
  methods: {
    ...mapActions('productos', ['fetchProductos']),
    ...mapActions('favoritos', ['toggleFavorito'])
  }
}
</script>

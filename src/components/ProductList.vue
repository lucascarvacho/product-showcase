<template>
  <section>
    <CategoryFilter :categorias="categoriasDisponibles" @cambiar="cambiarCategoria" />

    <div v-if="cargando" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-2">Cargando productos...</p>
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal" class="my-4">
      <div class="d-flex align-center justify-space-between flex-wrap ga-2">
        <span>Ocurrió un error al cargar los productos.</span>
        <v-btn size="small" variant="outlined" @click="fetchProductos">Reintentar</v-btn>
      </div>
    </v-alert>

    <p v-else-if="productosFiltrados.length === 0" class="text-center py-8 text-medium-emphasis">
      No hay productos para mostrar en esta categoría.
    </p>

    <v-row v-else>
      <v-col
        v-for="producto in productosFiltrados"
        :key="producto.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard
          :producto="producto"
          :es-favorito="esFavorito(producto.id)"
          @toggle-favorito="toggleFavorito"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'

export default {
  name: 'ProductList',
  components: { ProductCard, CategoryFilter },
  computed: {
    ...mapState('productos', ['cargando', 'error']),
    ...mapGetters('productos', ['categoriasDisponibles', 'productosFiltrados']),
    ...mapGetters('favoritos', ['esFavorito'])
  },
  created() {
    this.fetchProductos()
  },
  methods: {
    ...mapActions('productos', ['fetchProductos']),
    ...mapActions('filtros', ['cambiarCategoria']),
    ...mapActions('favoritos', ['toggleFavorito'])
  }
}
</script>

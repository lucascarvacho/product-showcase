<template>
  <div>
    <v-btn to="/" variant="text" class="mb-4">&larr; Volver</v-btn>

    <div v-if="cargando" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal">
      No se pudo cargar el producto.
      <template v-slot:append>
        <v-btn size="small" variant="outlined" @click="fetchProductos">Reintentar</v-btn>
      </template>
    </v-alert>

    <v-row v-else-if="producto">
      <v-col cols="12" sm="5" md="4">
        <div class="position-relative">
          <v-img :src="producto.imagen" :alt="producto.nombre" rounded="lg"></v-img>
          <v-btn
            class="detalle-fav"
            icon
            variant="tonal"
            @click="toggleFavorito(producto.id)"
          >
            <img
              :src="esFavorito(producto.id) ? '/images/favorito-activo.png' : '/images/favorito-inactivo.png'"
              width="26"
              height="26"
              alt=""
            />
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" sm="7" md="8">
        <h2 class="text-h5 mb-2">{{ producto.nombre }}</h2>
        <p><strong>Marca:</strong> {{ producto.marca }}</p>
        <p><strong>Categoría:</strong> {{ producto.categoria }}</p>
        <p><strong>Precio:</strong> ${{ producto.precio.toLocaleString('es-CL') }}</p>
        <p><strong>Descripción:</strong> {{ producto.descripcion }}</p>

        <div v-if="!producto.isDefault" class="d-flex ga-2 mt-4">
          <v-btn color="primary" :to="{ name: 'producto-editar', params: { id: producto.id } }">
            Editar
          </v-btn>
          <v-btn color="error" variant="outlined" @click="onEliminar">Eliminar</v-btn>
        </div>
      </v-col>
    </v-row>

    <p v-else>Producto no encontrado.</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductDetailView',
  props: {
    id: { type: [String, Number], required: true }
  },
  computed: {
    ...mapState('productos', ['cargando', 'error']),
    ...mapGetters('productos', ['obtenerPorId']),
    ...mapGetters('favoritos', ['esFavorito']),
    producto() {
      return this.obtenerPorId(this.id)
    }
  },
  created() {
    if (this.$store.state.productos.lista.length === 0) {
      this.fetchProductos()
    }
  },
  methods: {
    ...mapActions('productos', ['fetchProductos', 'eliminarProducto']),
    ...mapActions('favoritos', ['toggleFavorito']),
    async onEliminar() {
      if (confirm('¿Eliminar este producto?')) {
        await this.eliminarProducto(this.producto.id)
        this.$router.push('/catalogo')
      }
    }
  }
}
</script>

<style scoped>
.detalle-fav { position: absolute; bottom: 0.5rem; right: 0.5rem; }
</style>

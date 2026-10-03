<template>
  <v-card class="product-card">
    <v-img :src="producto.imagen" :alt="producto.nombre" height="160" cover></v-img>

    <v-btn
      class="product-card__fav"
      icon
      size="small"
      variant="tonal"
      :aria-label="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      @click="$emit('toggle-favorito', producto.id)"
    >
      <img
        :src="esFavorito ? '/images/favorito-activo.png' : '/images/favorito-inactivo.png'"
        width="20"
        height="20"
        alt=""
      />
    </v-btn>

    <v-card-title class="text-body-1">{{ producto.nombre }}</v-card-title>
    <v-card-subtitle>${{ producto.precio.toLocaleString('es-CL') }}</v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" variant="flat" block :to="{ name: 'producto-detalle', params: { id: producto.id } }">
        Ver
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    producto: { type: Object, required: true },
    esFavorito: { type: Boolean, default: false }
  },
  emits: ['toggle-favorito']
}
</script>

<style scoped>
.product-card { position: relative; }
.product-card__fav {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

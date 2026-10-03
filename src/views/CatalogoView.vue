<template>
  <div>
    <div class="d-flex flex-wrap justify-space-between align-center ga-2 mb-4">
      <h2 class="text-h5">Catálogo</h2>
      <v-btn color="primary" @click="mostrarModal = true">Agregar Producto</v-btn>
    </div>
    <ProductList />

    <ProductFormModal v-model="mostrarModal" />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
import ProductFormModal from '@/components/ProductFormModal.vue'

export default {
  name: 'CatalogoView',
  components: { ProductList, ProductFormModal },
  data() {
    return { mostrarModal: false }
  }
}
</script>

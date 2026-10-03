<template>
  <v-select
    class="category-filter"
    label="Categoría"
    :items="opciones"
    v-model="seleccionada"
    variant="outlined"
    density="comfortable"
    max-width="280"
    @update:model-value="$emit('cambiar', seleccionada)"
  ></v-select>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categorias: { type: Array, default: () => [] }
  },
  emits: ['cambiar'],
  data() {
    return { seleccionada: '' }
  },
  computed: {
    opciones() {
      return [{ title: 'Todas', value: '' }, ...this.categorias.map((c) => ({ title: c, value: c }))]
    }
  }
}
</script>

<style scoped>
.category-filter { max-width: 280px; margin-bottom: 1rem; }
</style>

<template>
  <v-footer color="primary" class="text-center d-flex flex-column">
    <div>Product Show Case &copy; {{ anioActual }}</div>
    <div>Contacto: +569 75867097</div>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return { anioActual: new Date().getFullYear() }
  }
}
</script>

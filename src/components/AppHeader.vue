<template>
  <div>
  <v-app-bar color="primary" elevation="2">
    <v-btn icon variant="text" class="d-flex d-md-none" @click="drawer = !drawer">
      <span class="menu-icon">☰</span>
    </v-btn>

    <v-img src="/images/logo.png" alt="Product Show Case" max-height="36" max-width="36" contain class="ml-2"></v-img>
    <v-app-bar-title class="ml-2">Product Show Case</v-app-bar-title>

    <v-spacer></v-spacer>

    <div class="d-none d-md-flex">
      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/catalogo" variant="text">Catálogo</v-btn>
      <v-btn to="/favoritos" variant="text">Favoritos</v-btn>
    </div>

    <v-btn icon @click="toggleTema" :title="esOscuro ? 'Cambiar a claro' : 'Cambiar a oscuro'">
      <img
        :src="esOscuro ? '/images/tema-claro.png' : '/images/tema-oscuro.png'"
        width="24"
        height="24"
        alt=""
      />
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" title="Home" @click="drawer = false"></v-list-item>
      <v-list-item to="/catalogo" title="Catálogo" @click="drawer = false"></v-list-item>
      <v-list-item to="/favoritos" title="Favoritos" @click="drawer = false"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return { drawer: false }
  },
  computed: {
    esOscuro() {
      return this.$vuetify.theme.global.name === 'dark'
    }
  },
  methods: {
    toggleTema() {
      const nuevo = this.esOscuro ? 'light' : 'dark'
      this.$vuetify.theme.global.name = nuevo
      localStorage.setItem('tema', nuevo)
    }
  },
  created() {
    const guardado = localStorage.getItem('tema')
    if (guardado) this.$vuetify.theme.global.name = guardado
  }
}
</script>

<style scoped>
.menu-icon { font-size: 1.5rem; line-height: 1; color: white; }
</style>

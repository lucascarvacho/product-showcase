const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implementación de eventos de nodo, si se necesitan más adelante
      return config
    }
  }
})

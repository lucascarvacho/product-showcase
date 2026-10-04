const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // IMPORTANTE: cambia 'vue-product-showcase' por el nombre EXACTO de tu repositorio en GitHub
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-product-showcase/' : '/',
  devServer: {
    // Evita problemas de CORS: el front llama a /api/... y
    // Vue CLI lo redirige internamente al json-server (puerto 3001).
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: { '^/api': '' }
      }
    }
  }
})

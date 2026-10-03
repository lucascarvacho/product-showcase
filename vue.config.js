const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
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

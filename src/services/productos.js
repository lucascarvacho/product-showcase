import productosApi from './productos.api'
import productosLocal from './productos.local'

// En desarrollo (npm run serve) se usa siempre la API real (Axios + json-server),
// tal como pide la consigna del módulo. Solo la build publicada en GitHub Pages
// (VUE_APP_USE_LOCAL_DATA=true en .env.production) usa el modo local/demo,
// porque GitHub Pages no puede correr un servidor como json-server.
const usarDatosLocales = process.env.VUE_APP_USE_LOCAL_DATA === 'true'

export default usarDatosLocales ? productosLocal : productosApi

import datosIniciales from '../../db.json'

const CLAVE = 'productos-demo'

function leerLista() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado) return JSON.parse(guardado)
  const inicial = JSON.parse(JSON.stringify(datosIniciales.productos))
  localStorage.setItem(CLAVE, JSON.stringify(inicial))
  return inicial
}

function guardarLista(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

function siguienteId(lista) {
  const max = lista.reduce((acc, p) => Math.max(acc, Number(p.id) || 0), 0)
  return max + 1
}

// Simula la forma de respuesta de Axios ({ data: ... }) para no tener que
// cambiar nada en los componentes ni en el store.
export default {
  getAll() {
    return Promise.resolve({ data: leerLista() })
  },
  getById(id) {
    const encontrado = leerLista().find((p) => String(p.id) === String(id))
    if (!encontrado) return Promise.reject(new Error('Producto no encontrado'))
    return Promise.resolve({ data: encontrado })
  },
  create(producto) {
    const lista = leerLista()
    const nuevo = { ...producto, id: siguienteId(lista) }
    lista.push(nuevo)
    guardarLista(lista)
    return Promise.resolve({ data: nuevo })
  },
  update(id, producto) {
    const lista = leerLista()
    const idx = lista.findIndex((p) => String(p.id) === String(id))
    if (idx === -1) return Promise.reject(new Error('Producto no encontrado'))
    lista[idx] = { ...producto, id: lista[idx].id }
    guardarLista(lista)
    return Promise.resolve({ data: lista[idx] })
  },
  remove(id) {
    const lista = leerLista().filter((p) => String(p.id) !== String(id))
    guardarLista(lista)
    return Promise.resolve({ data: {} })
  }
}

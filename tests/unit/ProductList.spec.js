import { mount, flushPromises } from '@vue/test-utils'
import { createStore } from 'vuex'
import ProductList from '@/components/ProductList.vue'
import productosModule from '@/store/modules/productos'
import filtrosModule from '@/store/modules/filtros'
import favoritosModule from '@/store/modules/favoritos'
import productosService from '@/services/productos'

// Reemplaza el servicio real por un mock controlado en la prueba
jest.mock('@/services/productos')

function crearStoreDePrueba() {
  return createStore({
    modules: {
      productos: productosModule,
      filtros: filtrosModule,
      favoritos: favoritosModule
    }
  })
}

describe('ProductList.vue', () => {
  it('muestra un mensaje de error y un botón de reintentar cuando la API falla', async () => {
    productosService.getAll.mockRejectedValue(new Error('Network Error'))

    const wrapper = mount(ProductList, {
      global: {
        plugins: [crearStoreDePrueba()],
        stubs: ['router-link']
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Ocurrió un error al cargar los productos')
    expect(wrapper.text()).toContain('Reintentar')
  })

  it('muestra los productos cuando la API responde correctamente', async () => {
    productosService.getAll.mockResolvedValue({
      data: [{ id: 1, nombre: 'Producto A', categoria: 'Audio', precio: 1000, imagen: '' }]
    })

    const wrapper = mount(ProductList, {
      global: {
        plugins: [crearStoreDePrueba()],
        stubs: ['router-link']
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Producto A')
    expect(wrapper.text()).not.toContain('Ocurrió un error')
  })
})

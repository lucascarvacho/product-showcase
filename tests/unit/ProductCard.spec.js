import { shallowMount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard.vue', () => {
  const producto = {
    id: 1,
    nombre: 'Producto Test',
    precio: 19990,
    imagen: 'https://placehold.co/400x300'
  }

  it('renderiza correctamente el nombre y el precio del producto', () => {
    const wrapper = shallowMount(ProductCard, {
      props: { producto },
      global: { stubs: ['router-link'] }
    })

    expect(wrapper.text()).toContain('Producto Test')
    expect(wrapper.text()).toContain('19.990')
  })

  it('emite "toggle-favorito" con el id del producto al hacer click en la estrella', async () => {
    const wrapper = shallowMount(ProductCard, {
      props: { producto },
      global: { stubs: ['router-link'] }
    })

    await wrapper.find('.product-card__fav').trigger('click')

    expect(wrapper.emitted('toggle-favorito')).toBeTruthy()
    expect(wrapper.emitted('toggle-favorito')[0]).toEqual([1])
  })
})

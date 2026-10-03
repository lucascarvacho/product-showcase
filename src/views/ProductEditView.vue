<template>
  <div>
    <p v-if="cargando">Cargando...</p>

    <p v-else-if="!producto">Producto no encontrado.</p>

    <div v-else>
      <h2 class="text-h5 mb-4">Editar producto</h2>

      <v-row>
        <v-col cols="12" sm="5" md="4">
          <div class="position-relative">
            <v-img :src="form.imagen" :alt="form.nombre" rounded="lg"></v-img>
            <v-btn
              class="editar-fav"
              icon
              variant="tonal"
              @click="toggleFavorito(producto.id)"
            >
              <img
                :src="esFavorito(producto.id) ? '/images/favorito-activo.png' : '/images/favorito-inactivo.png'"
                width="22"
                height="22"
                alt=""
              />
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="7" md="8">
          <v-form ref="formulario" v-model="formValido">
            <v-text-field v-model="form.nombre" label="Nombre" :rules="[reglas.requerido]"></v-text-field>
            <v-text-field v-model="form.marca" label="Marca" :rules="[reglas.requerido]"></v-text-field>
            <v-text-field v-model="form.categoria" label="Categoría" :rules="[reglas.requerido]"></v-text-field>
            <v-text-field
              v-model.number="form.precio"
              label="Precio"
              type="number"
              :rules="[reglas.requerido, reglas.positivo]"
            ></v-text-field>
            <v-textarea v-model="form.descripcion" label="Descripción" rows="3"></v-textarea>
            <v-text-field v-model="form.imagen" label="URL de la imagen"></v-text-field>
          </v-form>

          <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
            No se pudo guardar el producto. Intenta de nuevo.
          </v-alert>

          <div class="d-flex ga-2">
            <v-btn color="primary" variant="flat" :loading="guardando" @click="guardar">Guardar</v-btn>
            <v-btn variant="outlined" :disabled="guardando" @click="cancelar">Cancelar</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductEditView',
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      formValido: false,
      guardando: false,
      error: false,
      form: { nombre: '', marca: '', categoria: '', precio: null, descripcion: '', imagen: '' },
      reglas: {
        requerido: (v) => (v !== null && v !== '') || 'Campo obligatorio',
        positivo: (v) => v > 0 || 'Debe ser mayor a 0'
      }
    }
  },
  computed: {
    ...mapState('productos', ['cargando']),
    ...mapGetters('productos', ['obtenerPorId']),
    ...mapGetters('favoritos', ['esFavorito']),
    producto() {
      return this.obtenerPorId(this.id)
    }
  },
  created() {
    if (this.$store.state.productos.lista.length === 0) {
      this.fetchProductos().then(this.cargarFormulario)
    } else {
      this.cargarFormulario()
    }
  },
  methods: {
    ...mapActions('productos', ['fetchProductos', 'editarProducto']),
    ...mapActions('favoritos', ['toggleFavorito']),
    cargarFormulario() {
      if (!this.producto) return
      this.form = {
        nombre: this.producto.nombre,
        marca: this.producto.marca,
        categoria: this.producto.categoria,
        precio: this.producto.precio,
        descripcion: this.producto.descripcion,
        imagen: this.producto.imagen
      }
    },
    cancelar() {
      this.$router.push({ name: 'producto-detalle', params: { id: this.id } })
    },
    async guardar() {
      const { valid } = await this.$refs.formulario.validate()
      if (!valid) return

      this.guardando = true
      this.error = false
      try {
        await this.editarProducto({
          id: this.id,
          producto: { ...this.producto, ...this.form }
        })
        this.$router.push({ name: 'producto-detalle', params: { id: this.id } })
      } catch (err) {
        console.error('Error al editar producto:', err)
        this.error = true
      } finally {
        this.guardando = false
      }
    }
  }
}
</script>

<style scoped>
.editar-fav { position: absolute; bottom: 0.5rem; right: 0.5rem; }
</style>

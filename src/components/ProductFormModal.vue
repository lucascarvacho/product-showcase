<template>
  <v-dialog v-model="abierto" max-width="480" persistent>
    <v-card>
      <v-card-title>Agregar un nuevo producto</v-card-title>

      <v-card-text>
        <v-form ref="formulario" v-model="formValido">
          <v-text-field
            v-model="form.nombre"
            label="Nombre"
            :rules="[reglas.requerido]"
          ></v-text-field>

          <v-text-field
            v-model="form.marca"
            label="Marca"
            :rules="[reglas.requerido]"
          ></v-text-field>

          <v-text-field
            v-model="form.categoria"
            label="Categoría"
            :rules="[reglas.requerido]"
          ></v-text-field>

          <v-text-field
            v-model.number="form.precio"
            label="Precio"
            type="number"
            :rules="[reglas.requerido, reglas.positivo]"
          ></v-text-field>

          <v-textarea
            v-model="form.descripcion"
            label="Descripción"
            rows="3"
          ></v-textarea>

          <v-text-field
            v-model="form.imagen"
            label="URL de la imagen (opcional)"
            hint="Si la dejas vacía, se usa una imagen de referencia"
            persistent-hint
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-alert v-if="error" type="error" variant="tonal" class="mx-4 mb-2">
        No se pudo guardar el producto. Intenta de nuevo.
      </v-alert>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" :disabled="guardando" @click="cancelar">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" :loading="guardando" @click="agregar">Agregar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductFormModal',
  props: {
    modelValue: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'creado'],
  data() {
    return {
      formValido: false,
      guardando: false,
      error: false,
      form: {
        nombre: '',
        marca: '',
        categoria: '',
        precio: null,
        descripcion: '',
        imagen: ''
      },
      reglas: {
        requerido: (v) => (v !== null && v !== '' ) || 'Campo obligatorio',
        positivo: (v) => v > 0 || 'Debe ser mayor a 0'
      }
    }
  },
  computed: {
    abierto: {
      get() {
        return this.modelValue
      },
      set(valor) {
        this.$emit('update:modelValue', valor)
      }
    }
  },
  methods: {
    ...mapActions('productos', ['crearProducto']),
    resetForm() {
      this.form = { nombre: '', marca: '', categoria: '', precio: null, descripcion: '', imagen: '' }
      this.error = false
      if (this.$refs.formulario) this.$refs.formulario.resetValidation()
    },
    cancelar() {
      this.resetForm()
      this.abierto = false
    },
    async agregar() {
      const { valid } = await this.$refs.formulario.validate()
      if (!valid) return

      this.guardando = true
      this.error = false
      try {
        const nuevoProducto = {
          ...this.form,
          imagen: this.form.imagen || 'https://placehold.co/400x300?text=Producto',
          isDefault: false
        }
        const creado = await this.crearProducto(nuevoProducto)
        this.resetForm()
        this.abierto = false
        this.$emit('creado', creado)
      } catch (err) {
        console.error('Error al crear producto:', err)
        this.error = true
      } finally {
        this.guardando = false
      }
    }
  }
}
</script>

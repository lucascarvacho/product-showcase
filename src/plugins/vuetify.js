import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#2c7be5',
          secondary: '#f5a623'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#5b9bd5',
          secondary: '#f5a623'
        }
      }
    }
  }
})

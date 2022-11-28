import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme: ThemeDefinition = {
  colors: {
    primary: '#2a73c5',
  },
}

const darkTheme: ThemeDefinition = {
  colors: {

  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  defaults: {
    global: {
      flat: true,
    },
    VBtn: {
      minWidth: 0,
    },
  },
})

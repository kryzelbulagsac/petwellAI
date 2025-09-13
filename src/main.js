//import './assets/main.css'

import { createApp } from 'vue'

// Vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi' // 👈 Import icon se
// t
import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // 👈 Set default icon set
    aliases,
    sets: {
      mdi,
    },
  },
})

app.use(router)
app.use(vuetify)

app.mount('#app')

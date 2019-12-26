import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'
import { mdiAccount } from '@mdi/js'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', mdiAccount
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.red.darken3, // #C62828
        secondary: colors.blue.darken4, // #0D47A1
        accent: colors.grey.darken1 // #757575
      },
      dark: {
        primary: colors.deepOrange.darken3, // #D84315
        secondary: colors.deepPurple.darken4, // #311B92
        accent: colors.blueGrey.darken2 // #455A64
      }
    }
  }
})

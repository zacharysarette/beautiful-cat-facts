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
        primary: colors.red.darken3
      },
      dark: {
        primary: colors.red.darken1
      }
    }

  }
})

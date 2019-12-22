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
        primary: colors.red.darken3,
        secondary: colors.lime.darken4,
        game: colors.teal.base
      },
      dark: {
        primary: colors.deepOrange.base,
        secondary: colors.cyan.darken4,
        game: colors.lightGreen.darken3
      }
    }

  }
})

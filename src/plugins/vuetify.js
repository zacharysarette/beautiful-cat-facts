import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
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

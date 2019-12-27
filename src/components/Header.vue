<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-progress-linear
    :active="loading"
    :indeterminate="loading"
    absolute
    bottom
    color="lime accent-1"
    >
    </v-progress-linear>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn
        color="primary"
        @click="refreshCats"
        v-if="!gameOn"
        elevation="0"
      >
        New Fact Cards
        <v-icon right>
          mdi-refresh
        </v-icon>
      </v-btn>
      <v-btn
        color="primary"
        @click="startGame"
        v-if="!gameOn"
        elevation="0"
      >
        Game
        <v-icon right>
          mdi-cards-playing-outline
        </v-icon>
      </v-btn>
      <v-switch
        :append-icon="darkThemeOn ? 'mdi-brightness-3' : 'mdi-white-balance-sunny'"
        v-model="darkThemeOn"
        class="ma-2"
        :color="darkThemeOn ? 'white' : 'yellow'"
      >
      </v-switch>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { title } from '../const'
import { eventBus } from '../main'
import { mdiCardsPlayingOutline } from '@mdi/js'
export default {
  name: 'Header',
  mdiCardsPlayingOutline,
  methods: {
    startGame () {
      eventBus.$emit('startGameClicked')
    },
    refreshCats () {
      eventBus.$emit('refreshCatsClicked')
    }
  },
  data () {
    return {
      title: title,
      darkThemeOn: false
    }
  },
  props: ['loading', 'gameOn'],
  watch: {
    darkThemeOn () {
      this.$vuetify.theme.dark = this.darkThemeOn
    }
  }
}
</script>

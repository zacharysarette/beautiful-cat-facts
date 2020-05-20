<template>
<v-card
    :loading ="loading"
    width="200px"
    height="400px"
    v-ripple
    @click="checkCard"
    v-show="correct"
    style="margin:16px"
    elevation-24
    tile
    >
  <div v-if="loading">
    <h2>Loading...</h2>
  </div>
  <div v-else>
    <v-card-title >
      Cat Fact
      <v-spacer/>
      {{ number === 1 ? 'A' : number }}
      <v-icon v-if="mark === 0">mdi-cards-spade</v-icon>
      <v-icon color="red" v-if="mark === 1">mdi-cards-heart</v-icon>
      <v-icon v-if="mark === 2">mdi-cards-club</v-icon>
      <v-icon color="red" v-if="mark === 3">mdi-cards-diamond</v-icon>
    </v-card-title>
    <v-img
    :src="catPicSource"
    lazy-src="../assets/catLoading.png"
    width="200px"
    height="200px"
    >
    </v-img>
    <v-card-text style="height: 132px; max-height: 132px; overflow-y: scroll;">
      {{ info }}
    </v-card-text>
  </div>
</v-card>
</template>

<script>
import { mdiCardsSpade, mdiCardsClub, mdiCardsDiamond, mdiCardsHeart } from '@mdi/js'
import { eventBus } from '../main'
export default {
  name: 'CatCard',
  created () {
    eventBus.$on('gameOver', () => {
      this.canClick = false
    })
    eventBus.$on('startGame', () => {
      this.canClick = true
    })
  },
  mdiCardsSpade,
  mdiCardsClub,
  mdiCardsDiamond,
  mdiCardsHeart,
  props: ['info', 'catPicSource', 'loading', 'mark', 'number', 'correct'],
  data: () => ({
    canClick: false
  }),
  methods: {
    checkCard () {
      if (this.canClick) {
        eventBus.$emit('cardWasClicked', { mark: this.mark, number: this.number })
      }
    }
  }
}
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 16px;
}
/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #9E9E9E;
  border-radius: 5px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #DD2C00;
  border-radius: 5px;
}
</style>

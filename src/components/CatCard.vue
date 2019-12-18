<template>
<v-card
    max-width="200px"
    v-ripple
>
  <v-card-title >Cat Fact
    <v-spacer/>
    {{ randNum2 === 1 ? 'A' : randNum2 }}
    <v-icon v-if="randNum === 0">mdi-cards-spade</v-icon>
    <v-icon v-if="randNum === 1">mdi-cards-heart</v-icon>
    <v-icon v-if="randNum === 2">mdi-cards-club</v-icon>
    <v-icon v-if="randNum === 3">mdi-cards-diamond</v-icon>
  </v-card-title>
  <v-img
    :src="catPicSource"
    max-width="200px"
    max-height="200px"
    >
  </v-img>
  <v-card-text>
    {{ info }}
  </v-card-text>
</v-card>
</template>

<script>
import { mdiCardsSpade, mdiCardsClub, mdiCardsDiamond, mdiCardsHeart } from '@mdi/js'
export default {
  name: 'CatCard',
  created () {
    this.randNum = Math.floor(Math.random() * 4)
    this.randNum2 = Math.floor((Math.random() * 10) + 1)
  },
  mdiCardsSpade,
  mdiCardsClub,
  mdiCardsDiamond,
  mdiCardsHeart,
  randNum: 1,
  randNum2: 1,
  props: ['info', 'catPicSource'],

  data: () => ({
  })
}
</script>

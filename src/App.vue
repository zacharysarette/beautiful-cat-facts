<template>
  <v-app>
    <app-header
      :gameOn="gameOn"
      :loading="picsLoading"
    >
    </app-header>
    <v-content>
      <v-alert type="warning" v-if="errored">
      {{ error }}
      </v-alert>
      <div v-show="gameOn">
        <app-game :numberOfCards="numberOfCards">
        </app-game>
      </div>
      <v-container>
        <v-col cols="12">
          <v-row v-if="!picsLoading">
            <app-cat-card
              v-for="(cat, i) in catInfo"
              :key ="cat.id"
              :info="cat.fact"
              :mark="cards[i].mark"
              :number="cards[i].number"
              :correct="true"
              :catPicSource="catPics[i].url"
              :loading="loading"
            >
            </app-cat-card>
          </v-row>
        </v-col>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import { catFactsUrl, catPicsUrl } from './const'

import CatCard from './components/CatCard'
import Game from './components/Game'
import Header from './components/Header'
import Footer from './components/Footer'

import { eventBus } from './main'

import axios from 'axios'
axios.defaults.timeout = 5000
export default {
  name: 'App',
  created: async function () {
    eventBus.$on('updateCards', (cards) => {
      this.cards = cards
    })
    eventBus.$on('refreshCatsClicked', () => {
      this.refreshCats()
    })
    eventBus.$on('closeGameClicked', () => {
      this.gameOn = false
    })
    eventBus.$on('startGame', () => {
      this.gameOn = true
    })
  },
  components: {
    appCatCard: CatCard,
    appGame: Game,
    appHeader: Header,
    appFooter: Footer
  },
  methods: {
    async refreshCats () {
      this.picsLoading = true
      this.textLoading = true
      await this.getCatFacts()
      await this.getCatPics()
    },
    async getCatFacts () {
      await axios
        .get(catFactsUrl + this.numberOfCards)
        .then(response => (this.catInfo = response.data.data))
        .catch(error => {
          this.error = error
          this.errored = true
        })
        .finally(() => (this.textLoading = false))
    },
    async getCatPics () {
      await axios
        .get(catPicsUrl + this.numberOfCards)
        .then(response => (this.catPics = response.data))
        .catch(error => {
          this.error = error
          this.errored = true
        })
        .finally(() => (this.picsLoading = false))
    }
  },
  data () {
    return {
      numberOfCards: 12,
      catPics: null,
      catInfo: 'this is cat data',
      error: null,
      errored: false,
      picsLoading: true,
      textLoading: true,
      cards: [],
      gameOn: false
    }
  },
  computed: {
    loading () {
      return this.picsLoading && this.textLoading && this.cards === []
    }
  },
  mounted: async function () {
    await this.refreshCats()
  }
}
</script>

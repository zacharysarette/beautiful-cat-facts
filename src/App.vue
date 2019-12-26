<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
      <v-btn
        color="primary"
        @click="refreshCats"
        v-if="!gameOn"
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
      <v-progress-linear
      :active="picsLoading"
      :indeterminate="picsLoading"
      absolute
      bottom
      color="lime accent-1"
      >
      </v-progress-linear>
    </v-app-bar>
    <v-content>

    <div v-if="gameOn">
      <app-game
        :text="gameTask.text"
        :score="gameScore"
      >
      </app-game>
    </div>
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
          :loading="loading">
          </app-cat-card>
        </v-row>
      </v-col>
      <div v-if="errored">
        <p>
          {{ error }}
        </p>
      </div>
    </v-content>
    <v-footer
    color="primary"
    app left-justify>
    <v-spacer />
    <span class="white--text">
      {{ copyright }}
    </span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  getRandomCardMark,
  getRandomCardNumber,
  getRandomNumber,
  coinFlip
} from './utils'
import {
  marks,
  title,
  copyright,
  catFactsUrl,
  catPicsUrl
} from './const'
import CatCard from './components/CatCard'
import Game from './components/Game'
import { eventBus } from './main'
import {
  mdiBrain,
  mdiCardsPlayingOutline
} from '@mdi/js'
import axios from 'axios'
axios.defaults.timeout = 5000
export default {
  name: 'App',
  created () {
    eventBus.$on('cardWasClicked', (data) => {
      if (this.gameOn) {
        this.checkCard(data)
      }
    })
    eventBus.$on('restartGame', () => {
      this.restartGame()
    })
    eventBus.$on('closeGame', () => {
      this.closeGame()
    })
  },
  components: {
    appCatCard: CatCard,
    appGame: Game
  },
  mdiBrain,
  mdiCardsPlayingOutline,
  methods: {
    async refreshCats () {
      this.makeCards()
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
    },
    startGame () {
      this.gameOn = true
      this.taskNumber = this.getTaskNumber()
      eventBus.$emit('startGame')
    },
    restartGame () {
      this.gameScore = 0
      eventBus.$emit('startGame')
    },
    closeGame () {
      this.gameScore = 0
      this.gameOn = false
    },
    checkCard (data) {
      if (this.gameTask.task(data)) {
        this.gameScore += 100
      }
      this.taskNumber = this.getTaskNumber()
    },
    getTaskNumber () {
      this.makeCards()
      this.isMarkTask = coinFlip()
      return getRandomNumber(0, this.cards.length - 1)
    },
    makeCards () {
      this.cards = []
      for (let index = 0; index < this.numberOfCards; index++) {
        const randomMark = getRandomCardMark()
        const randomNumber = getRandomCardNumber()
        this.cards.push({
          mark: randomMark,
          number: randomNumber
        })
      }
    }
  },
  data () {
    return {
      title: title,
      copyright: copyright,
      numberOfCards: 12,
      catPics: '',
      catInfo: 'this is cat data',
      error: null,
      errored: false,
      picsLoading: true,
      textLoading: true,
      darkThemeOn: false,
      gameScore: 0,
      gameOn: false,
      taskNumber: 0,
      cards: [],
      isMarkTask: false
    }
  },
  computed: {
    loading () {
      return this.picsLoading && this.textLoading
    },
    gameTask () {
      if (this.cards === []) {
        this.makeCards()
      }
      const randomCard = this.cards[this.taskNumber]
      const markText = marks[randomCard.mark]
      if (this.isMarkTask) {
        return {
          text: 'Find a ' + markText,
          task (card) {
            return card.mark === randomCard.mark
          }
        }
      }
      const numText =
        randomCard.number === 1 ? 'n Ace' : ' ' + randomCard.number
      return {
        text: 'Find a' + numText,
        task (card) {
          return card.number === randomCard.number
        }
      }
    }
  },
  watch: {
    darkThemeOn () {
      this.$vuetify.theme.dark = this.darkThemeOn
    }
  },
  mounted: async function () {
    await this.refreshCats()
  }
}
</script>

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
      <v-btn elevation="0" color="primary" @click="refreshCats">
        New Fact Cards
        <v-icon right>
          mdi-refresh
        </v-icon>
      </v-btn>
      <v-btn elevation="0" color="primary" @click="startGame">
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
    <v-content>
    <div v-if="gameOn">
      <app-game
        :text="gameTask.text"
        :score="gameScore"
      >
      </app-game>
    </div>
      <v-col cols="12">
        <v-row>
          <app-cat-card
          v-for="(cat, i) in catInfo"
          :key ="cat.id"
          :info="cat.fact"
          :mark="getMark()"
          :number="getNumber()"
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
      this.picsLoading = true
      this.textLoading = true
      await this.getCatFacts()
      await this.getCatPics()
    },
    async getCatFacts () {
      await axios
        .get('https://catfact.ninja/facts?limit=32')
        .then(response => (this.catInfo = response.data.data))
        .catch(error => {
          this.error = error
          this.errored = true
        })
        .finally(() => (this.textLoading = false))
    },
    async getCatPics () {
      await axios
        .get('https://api.thecatapi.com/v1/images/search?limit=32')
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
      if (this.gameData[this.taskNumber].task(data)) {
        this.gameScore += 100
      }
      this.taskNumber = this.getTaskNumber()
    },
    getMark () {
      return Math.floor(Math.random() * 4)
    },
    getNumber () {
      return Math.floor((Math.random() * 10) + 1)
    },
    getTaskNumber () {
      return Math.floor(Math.random() * this.gameData.length)
    }
  },
  data () {
    return {
      title: 'Beautiful Cat Facts',
      copyright: 'Created by Zach Sarette in 2019',
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
      marks: ['spade', 'heart', 'club', 'diamond'],
      gameData: [
        {
          text: 'Find a spade',
          task (card) {
            return card.mark === 0
          }
        },
        {
          text: 'Find a heart',
          task (card) {
            return card.mark === 1
          }
        },
        {
          text: 'Find a club',
          task (card) {
            return card.mark === 2
          }
        },
        {
          text: 'Find a diamond',
          task (card) {
            return card.mark === 3
          }
        },
        {
          text: 'Find an Ace',
          task (card) {
            return card.number === 1
          }
        },
        {
          text: 'Find a 2',
          task (card) {
            return card.number === 2
          }
        },
        {
          text: 'Find a 3',
          task (card) {
            return card.number === 3
          }
        },
        {
          text: 'Find a 4',
          task (card) {
            return card.number === 4
          }
        },
        {
          text: 'Find a 5',
          task (card) {
            return card.number === 5
          }
        },
        {
          text: 'Find a 6',
          task (card) {
            return card.number === 6
          }
        },
        {
          text: 'Find a 7',
          task (card) {
            return card.number === 7
          }
        },
        {
          text: 'Find an 8',
          task (card) {
            return card.number === 8
          }
        },
        {
          text: 'Find a 9',
          task (card) {
            return card.number === 9
          }
        },
        {
          text: 'Find a 10',
          task (card) {
            return card.number === 10
          }
        }
      ]
    }
  },
  computed: {
    loading () {
      return this.picsLoading && this.textLoading
    },
    gameTask () {
      return this.gameData[this.taskNumber]
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

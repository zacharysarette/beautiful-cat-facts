<template>
    <v-alert color="accent">
        <audio id="myAudio">
          <source src="../assets/meow.ogg" type="audio/ogg">
         </audio>
      <v-row>
        <v-col>
          <h4 class="gameText">
            Task: {{ gameTask.text }}
          </h4>
        </v-col>
        <v-col>
          <h4 class="gameText">
            Score: {{ gameScore }}
          </h4>
        </v-col>
        <v-col>
          <h4 class="gameText">
            Time Left: {{ secondsLeft }} seconds
          </h4>
        </v-col>
      </v-row>
      <v-toolbar color="secondary" v-if="gameOver">
        <v-toolbar-title class="white--text">
          Game Over
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            color="secondary"
            @click="closeGame"
            elevation="0"
          >
            Close
          </v-btn>
          <v-btn
            color="secondary"
            @click="restartGame"
            elevation="0"
          >
          Restart
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-alert>
</template>

<script>
import {
  getRandomCardMark,
  getRandomCardNumber,
  getRandomNumber,
  coinFlip
} from '../utils'
import { marks, gameSeconds } from '../const'
import { eventBus } from '../main'

export default {
  created () {
    this.makeCards()
    eventBus.$on('cardWasClicked', (data) => {
      if (this.gameOn) {
        this.checkCard(data)
      }
    })
    eventBus.$on('startGameClicked', () => {
      this.startGame()
    })
  },
  props: ['numberOfCards'],
  data () {
    return {
      gameScore: 0,
      secondsLeft: gameSeconds,
      interval: setInterval(this.timer, 1000),
      gameOver: false,
      taskNumber: 0,
      isMarkTask: false,
      gameOn: false,
      cards: []
    }
  },
  methods: {
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
      eventBus.$emit('updateCards', this.cards)
    },
    timer () {
      this.secondsLeft -= 1
      if (this.secondsLeft < 1) {
        eventBus.$emit('gameOver')
        this.gameOver = true
        this.stopTimer()
      }
    },
    stopTimer () {
      clearInterval(this.interval)
    },
    restartGame () {
      this.gameScore = 0
      this.startGame()
    },
    startGame () {
      this.gameOver = false
      this.secondsLeft = gameSeconds
      this.gameOn = true
      this.taskNumber = this.getTaskNumber()
      this.stopTimer()
      this.interval = setInterval(this.timer, 1000)
      eventBus.$emit('startGame')
    },
    closeGame () {
      eventBus.$emit('closeGameClicked')
      this.gameScore = 0
      this.gameOn = false
    },
    checkCard (data) {
      if (this.gameTask.task(data)) {
        this.gameScore += 100
        document.getElementById('myAudio').play()
      }
      this.taskNumber = this.getTaskNumber()
    },
    getTaskNumber () {
      this.makeCards()
      this.isMarkTask = coinFlip()
      return getRandomNumber(0, this.cards.length - 1)
    }
  },
  computed: {
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
  }
}
</script>

<style>
.gameText {
  border-radius: 25px;
  background-color:#333;
  padding:10px;
  color:#fff;
}
</style>

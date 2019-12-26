<template>
    <v-alert color="accent">
        <v-row>
        <v-col>
          <h4 class="gameText">Task: {{ text }}</h4>
        </v-col>
        <v-col>
        <h4 class="gameText">Score: {{ score }}</h4>
        </v-col>
        <v-col>
        <h4 class="gameText">Time Left: {{ secondsLeft }} seconds</h4>
        </v-col>
        </v-row>
      <v-toolbar color="secondary" v-if="gameOver">
      <v-toolbar-title class="gameOverText">Game Over</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <v-btn color="secondary" @click="closeGame">Close</v-btn>
      <v-btn color="secondary" @click="restartGame">Restart</v-btn>
      </v-toolbar-items>
      </v-toolbar>
    </v-alert>
</template>

<script>
import { eventBus } from '../main'
export default {
  props: [ 'text', 'score' ],
  data () {
    return {
      secondsLeft: 30,
      interval: setInterval(this.timer, 1000),
      gameOver: false
    }
  },
  methods: {
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
      eventBus.$emit('restartGame')
      this.secondsLeft = 30
      this.gameOver = false
      this.interval = setInterval(this.timer, 1000)
    },
    closeGame () {
      eventBus.$emit('closeGame')
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

.gameOverText {
  color:#fff;
}
</style>

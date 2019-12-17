<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>
    <v-content>
      <app-cat-card :info="catInfo" :catPicSource="catPic"></app-cat-card>
      <div v-if="loading">Loading...</div>
      <v-content v-else>
        <p> Loaded</p>
      </v-content>
      <div v-if="errored"><p>{{ error }}</p></div>
    </v-content>
  </v-app>
</template>

<script>
import CatCard from './components/CatCard'
import axios from 'axios'
axios.defaults.timeout = 5000
export default {
  name: 'App',
  components: {
    appCatCard: CatCard
  },
  data () {
    return {
      catPic: '',
      catInfo: 'this is cat data',
      error: null,
      errored: false,
      loading: true
    }
  },
  mounted: async function () {
    await axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then(response => (this.catPic = response.data[0].url))
      .catch(error => {
        this.error = error
        this.errored = true
      })
      .finally(() => (this.loading = false))
    await axios
      .get('https://catfact.ninja/fact')
      .then(response => (this.catInfo = response.data.fact))
      .catch(error => {
        this.error = error
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

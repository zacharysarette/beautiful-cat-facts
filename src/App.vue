<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>{{ title }}</h1>
      <v-spacer/>
      <v-switch :append-icon="darkThemeOn ? 'mdi-brightness-3' : 'mdi-white-balance-sunny'" v-model="darkThemeOn" class="ma-2" :color="darkThemeOn ? 'white' : 'yellow'">
      </v-switch>
    </v-app-bar>
    <v-content>
      <v-col cols="12">
        <v-row>
          <app-cat-card
          v-for="(cat, i) in catInfo"
          :key ="cat.id"
          :info="cat.fact"
          :catPicSource="catPics[i].url">
          </app-cat-card>
        </v-row>
      </v-col>
      <div v-if="loading">Loading...</div>
      <v-content v-else>
        <p> Loaded</p>
      </v-content>
      <div v-if="errored"><p>{{ error }}</p></div>
    </v-content>
    <v-footer
    color="primary"
    app left-justify>
    <v-spacer />
    <span class="white--text">{{ copyright }}</span>
    </v-footer>
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
      title: 'Beautiful Cat Facts',
      copyright: 'Created by Zach Sarette in 2019',
      catPics: '',
      catInfo: 'this is cat data',
      error: null,
      errored: false,
      loading: true,
      darkThemeOn: false
    }
  },
  watch: {
    darkThemeOn () {
      this.$vuetify.theme.dark = this.darkThemeOn
    }
  },
  mounted: async function () {
    await axios
      .get('https://api.thecatapi.com/v1/images/search?limit=12')
      .then(response => (this.catPics = response.data))
      .catch(error => {
        this.error = error
        this.errored = true
      })
      .finally(() => (this.loading = false))
    await axios
      .get('https://catfact.ninja/facts?limit=12')
      .then(response => (this.catInfo = response.data.data))
      .catch(error => {
        this.error = error
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

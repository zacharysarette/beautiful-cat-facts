<template>
  <v-footer color="primary" app left-justify>
    <v-spacer />
    <span class="white--text">
      {{ copyright }}
    </span>
  </v-footer>
</template>

<script>
import { copyright } from '../const'
export default {
  data () {
    return {
      copyright: copyright
    }
  }
}
</script>

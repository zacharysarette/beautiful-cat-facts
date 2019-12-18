<template>
<v-card
    max-width="200px"
    v-ripple
>
  <v-card-title>Cat Fact</v-card-title>
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
export default {
  name: 'CatCard',
  props: ['info', 'catPicSource'],
  data: () => ({
  })
}
</script>

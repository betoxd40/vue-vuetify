<template>
  <v-container v-if="isLoading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green">
      </v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4 v-for="(item, index) in apiResponse" :key="index" mb-2>
        <v-card>
          <v-img :src="item.Poster" aspect-ratio="1"></v-img>

          <v-card-title primary-title>
            <div>
              <h2>{{ item.Title }}</h2>
              <div>Year: {{ item.Year }}</div>
              <div>Type: {{ item.Type }}</div>
              <div>IMDB-id: {{ item.imdbID }}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="goToMovie(item.imdbID)"
              >View</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiResponse: [],
      isLoading: true,
      error: false
    }
  },
  mounted() {
    this.getApiInfo(this.name)
  },
  watch: {
    name(value) {
      this.getApiInfo(value)
    }
  },
  methods: {
    getApiInfo: async function(value) {
      try {
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=b76b385c&s=${value}&Content-Type=application/json%27`
        )
        console.log(res)
        this.apiResponse = res.data.Search
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.error = true
        this.isLoading = false
      }
    },
    goToMovie(id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style></style>

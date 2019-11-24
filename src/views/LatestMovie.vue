<template>
  <v-container v-if="isLoading">
    <div class="text-center">
      <v-progress-circular
        indeterminate
        :size="150"
        :width="8"
        color="green"
      ></v-progress-circular>
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
            <v-btn color="green" @click="goToMovie(item.imdbID)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      apiResponse: [],
      isLoading: true,
      error: false
    }
  },
  async mounted() {
    this.getApiInfo()
  },
  methods: {
    getApiInfo: async function() {
      try {
        const res = await axios.get(
          `http://www.omdbapi.com/?s=mummy&apikey=b76b385c&page=1&type=movie&Content-Type=application/json`
        )
        this.apiResponse = res.data.Search
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.error = true
        this.isLoading = false
      }
    },
    goToMovie: function(id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

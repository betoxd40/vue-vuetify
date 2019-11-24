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
  <v-container v-else>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn color="green" dark @click.stop="dialog = true">
            View Ratings
          </v-btn>
          <v-dialog v-model="dialog" max-width="500">
            <v-card>
              <v-card-title class="headline">User Ratings</v-card-title>

              <v-card-text>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </v-card-text>
              <v-card-text>
                <table style="width:100%" border="1">
                  <tr>
                    <th>Source</th>
                    <th>Ratings</th>
                  </tr>
                  <tr v-for="(rating, index) in this.ratings" :key="index">
                    <td align="center">{{ ratings[index].Source }}</td>
                    <td align="center">{{ ratings[index].Value }}</td>
                  </tr>
                </table>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiResponse: '',
      isLoading: true,
      error: false,
      dialog: false,
      ratings: null
    }
  },
  async mounted() {
    this.getApiInfo()
  },
  methods: {
    getApiInfo: async function() {
      try {
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=b76b385c&i=${this.id}&Content-Type=application/json%27`
        )
        this.apiResponse = res.data
        this.ratings = this.apiResponse.Ratings
        this.ratings.forEach(element => {
          element.Value = parseFloat(element.Value.split(/\/|%/)[0])
          element.Value =
            element.Value <= 10 ? element.Value / 2 : element.Value / 20
        })
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.error = true
        this.isLoading = false
      }
    }
  }
}
</script>

<style></style>

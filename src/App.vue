<template>
  <v-app>
    <v-app-bar>
      <v-container class="d-flex align-center py-0">
        <v-app-bar-title class="pl-0">
          <div class="d-flex align-center">Ribbon</div>
        </v-app-bar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-sheet>
        <section id="filter">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <h2 class="text-h4">Giving Forms</h2>

                <p class="text-primary mt-3">In Beta now!</p>

                <p class="mt-3">See all those that have given in one place!</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ProgressBar v-if="isActionRunning"></ProgressBar>
                <table v-if="donors">
                  <DonorTable :items="donors.data"></DonorTable>
                </table>
              </v-col>
            </v-row>
          </v-container>
        </section>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import DonorTable from "./components/Donor-table.vue";
import ProgressBar from "./components/Progress-bar.vue";

export default {
  name: "App",
  components: {
    DonorTable,
    ProgressBar,
  },
  data() {
    return {
      donors: null,
      isActionRunning: false,
    };
  },
  mounted() {
    this.isActionRunning = true;
    axios.get("https://interview.ribbon.giving/api/donors").then((response) => {
      this.donors = response.data;
      this.isActionRunning = false;
    });
  },
  methods: {
    async submit() {
      // Send message to server.
    },
  },
};
</script>

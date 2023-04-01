<template>
  <div>
    <input class="search-input" v-model="searchQuery" type="text" placeholder="Search by name" />
    <v-data-table :headers="headers" :items="filteredDonors" class="table"> </v-data-table>
  </div>
</template>
<script>
export default {
  name: "Donor-table",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredDonors() {
      return this.items.filter((donor) => {
        return donor.full_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  data() {
    return {
      searchQuery: "",
      headers: [
        { text: "Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Total Donations", value: "total_donations" },
        { text: "First Donations", value: "first_donation" },
      ],
    };
  },
};
</script>
<style>
body {
  color: rgba(58, 58, 64, 0.87);
}
.table > tr {
  background-color: rgba(58, 58, 64, 0.05);
}
.table tr:hover {
  background-color: rgba(58, 58, 64, 0.03);
}
.progress-bar {
  height: 5px;
  background-color: #00754A;
  transition: width 0.5s;
}
</style>

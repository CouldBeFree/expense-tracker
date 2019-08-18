<template>
  <v-data-table
          :headers="headers"
          :items="tableItems"
          :items-per-page="5"
          class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    name: "DataTable",
    headers: [
      {text: 'Date', value: 'Date'},
      {text: 'Description', value: 'Description'},
      {text: 'Category', value: 'Category'},
      {text: 'Account', value: 'Account'},
      {text: 'Amount', value: 'Amount'}
    ],
    computed: {
      tableItems: function () {
      
      }
    }
  }
</script>

<style scoped>

</style>
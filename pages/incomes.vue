<template>
  <v-container>
    <v-layout justify-center>
      <date-picker></date-picker>
    </v-layout>
    <h2>Incomes</h2>
    <modal></modal>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import Modal from "../components/Modal";
  
  export default {
    name: "incomes",
    components: {
      DatePicker,
      Modal
    }
  }
</script>

<style scoped>

</style>
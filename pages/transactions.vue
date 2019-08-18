<template>
  <v-container>
    <v-layout justify-center>
      <date-picker></date-picker>
    </v-layout>
    <modal></modal>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import Modal from "../components/Modal";
  
  export default {
    name: "transactions",
    components: {
      DatePicker,
      Modal
    },
    computed: {
    
    }
  }
</script>

<style scoped>

</style>
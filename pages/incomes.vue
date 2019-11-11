<template>
  <v-container>
    <v-layout justify-center>
      <date-picker :target="'incomes'"></date-picker>
    </v-layout>
    <h2 class="text-center mt-2 mb-2">Incomes</h2>
    <data-table
      :options="incomes"
      @delete="removeItem"
    ></data-table>
    <modal v-model="isOpen"></modal>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import Modal from "../components/Modal";
  import DataTable from "../components/DataTable";
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "incomes",
    data(){
      return{
        isOpen: false,
        currentDate: new Date().toISOString().substr(0, 10)
      }
    },
    components: {
      DatePicker,
      Modal,
      DataTable
    },
    async mounted(){
      await this.getIncomes(this.currentDate);
    },
    computed: {
      ...mapState('incomes', {
        incomes: state => state.incomes
      })
    },
    methods: {
      ...mapActions({
        getIncomes: 'incomes/getIncomes'
      }),
      removeItem(){

      }
    }
  }
</script>

<style scoped>

</style>

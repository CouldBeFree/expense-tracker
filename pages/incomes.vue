<template>
  <v-container>
    <v-layout justify-center>
      <date-picker></date-picker>
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
  import { mapGetters, mapMutations } from 'vuex'
  
  export default {
    name: "incomes",
    data(){
      return{
        isOpen: false
      }
    },
    components: {
      DatePicker,
      Modal,
      DataTable
    },
    computed: {
      ...mapGetters([
        'incomes'
      ])
    },
    methods: {
      ...mapMutations([
        'removeIncomeItem'
      ]),
      removeItem(item){
        this.removeIncomeItem(item.id)
      }
    }
  }
</script>

<style scoped>

</style>
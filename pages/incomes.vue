<template>
  <v-container>
    <v-layout justify-center>
      <date-picker @date="onDateSelect"></date-picker>
    </v-layout>
    <h2 class="text-center mt-2 mb-2">Incomes</h2>
    <data-table
      :options="incomes"
      @delete="removeItem"
      @edit="editItem"
    ></data-table>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import DataTable from "../components/DataTable";
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: "incomes",
    data(){
      return{
        isOpen: false
      }
    },
    components: {
      DatePicker,
      DataTable
    },
    async mounted(){
      await this.getIncomes();
    },
    computed: {
      ...mapState('incomes', {
        incomes: state => state.incomes
      })
    },
    methods: {
      ...mapActions('incomes', ['getIncomes']),
      ...mapMutations('common', ['setDate']),
      ...mapMutations('incomes', ['setCurrentIncome']),
      removeItem(item){
        console.log(item);
      },
      editItem(item){
        this.isOpen = true;
        this.setCurrentIncome(item);
      },
      async onDateSelect(val){
        this.setDate(`${val}-01`);
        await this.getIncomes();
      }
    }
  }
</script>

<style scoped>

</style>

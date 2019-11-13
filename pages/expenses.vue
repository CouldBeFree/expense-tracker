<template>
  <v-container>
    <v-layout justify-center>
      <date-picker @date="onDateSelect"></date-picker>
    </v-layout>
    <h2 class="text-center mt-2 mb-2">Expenses</h2>
    <data-table
            @delete="removeItem"
            @edit="editItem"
            :options="expenses"
    ></data-table>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import DataTable from "../components/DataTable";
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: "expenses",
    components: {
      DatePicker,
      DataTable
    },
    data(){
      return{
        isOpen: false
      }
    },
    computed: {
      ...mapState('expenses', {
        expenses: state => state.expenses
      })
    },
    methods: {
      ...mapActions('expenses', ['getExpenses']),
      ...mapMutations('common', ['setDate']),
      removeItem(item){
        this.removeExpenseItem(item.id)
      },
      editItem(item){
        this.isOpen = true;
      },
      async onDateSelect(val){
        this.setDate(`${val}-01`);
        await this.getExpenses();
      }
    },
    async mounted(){
      await this.getExpenses();
    }
  }
</script>

<style scoped>

</style>

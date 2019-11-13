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
    <income-dialog v-model="isIncomeOpen"></income-dialog>
    <expense-dialog v-model="isExpenseOpen"></expense-dialog>
    <action-buttons
            @income="onAction"
            @expense="onAction"
    ></action-buttons>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import DataTable from "../components/DataTable";
  import ActionButtons from "../components/ActionButtons";
  import ExpenseDialog from "../components/ExpenseDialog";
  import IncomeDialog from "../components/IncomeDialog";
  
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: "incomes",
    data(){
      return{
        isIncomeOpen: false,
        isExpenseOpen: false
      }
    },
    components: {
      DatePicker,
      DataTable,
      ActionButtons,
      ExpenseDialog,
      IncomeDialog
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
      ...mapActions('incomes', ['getIncomes', 'removeIncome']),
      ...mapMutations('common', ['setDate']),
      ...mapMutations('incomes', ['setCurrentIncome']),
      async removeItem(item){
        await this.removeIncome(item._id);
        await this.getIncomes();
      },
      editItem(item){
        this.isIncomeOpen = true;
        this.setCurrentIncome(item);
      },
      async onDateSelect(val){
        this.setDate(`${val}-01`);
        await this.getIncomes();
      },
      onAction(val){
        if(val === 'expense') {
          this.isExpenseOpen = true;
        } else{
          this.isIncomeOpen = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>

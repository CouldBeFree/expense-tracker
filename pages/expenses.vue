<template>
  <v-container>
    <v-layout justify-center>
      <date-picker @date="onDateSelect"></date-picker>
    </v-layout>
    <h2 class="text-center mt-2 mb-2">Expenses</h2>
    <data-table
            @delete="onRemove"
            @edit="editItem"
            :options="expenses"
    ></data-table>
    <income-dialog v-model="isIncomeOpen"></income-dialog>
    <expense-dialog v-model="isExpenseOpen"></expense-dialog>
    <action-buttons
        @income="onAction"
        @expense="onAction"
    ></action-buttons>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title>Are u sure to remove this expense?</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" :loading="expensesLoading" text @click="removeItem">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import DataTable from "../components/DataTable";
  import ActionButtons from "../components/ActionButtons";
  import ExpenseDialog from "../components/ExpenseDialog";
  import IncomeDialog from "../components/IncomeDialog";

  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: "expenses",
    middleware: 'auth',
    components: {
      DatePicker,
      DataTable,
      ActionButtons,
      ExpenseDialog,
      IncomeDialog
    },
    data(){
      return{
        isIncomeOpen: false,
        isExpenseOpen: false,
        dialog: false,
        itemId: null
      }
    },
    computed: {
      ...mapState('expenses', {
        expenses: state => state.expenses,
        expensesLoading: state => state.expensesLoading
      })
    },
    methods: {
      ...mapActions('expenses', ['getExpenses', 'removeExpense']),
      ...mapMutations('common', ['setDate']),
      ...mapMutations('expenses', ['setCurrentExpense']),
      async removeItem(){
        await this.removeExpense(this.itemId);
        await this.getExpenses();
        this.dialog = false;
      },
      editItem(item){
        const copy = {...item};
        this.isExpenseOpen = true;
        this.setCurrentExpense(copy);
      },
      async onDateSelect(val){
        this.setDate(`${val}-01`);
        await this.getExpenses();
      },
      onAction(val){
        if(val === 'expense') {
          this.isExpenseOpen = true;
        } else{
          this.isIncomeOpen = true;
        }
      },
      onRemove(item){
        this.dialog = true;
        this.itemId = item._id;
      },
    },
    async mounted(){
      await this.getExpenses();
    }
  }
</script>

<style scoped>

</style>

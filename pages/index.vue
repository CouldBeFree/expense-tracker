<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <balance-card
            :balance="this.total.incomes - this.total.expenses"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
            xs4
            :incomes="this.total.incomes"
            :path="'/incomes'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
            xs4
            :expenses="this.total.expenses"
            :path="'/expenses'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
            xs4
            :savings="this.total.incomes - this.total.expenses"
        ></balance-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-card height="300">
          <pie-card
              :label="'Incomes'"
              :options="incomes"
          ></pie-card>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card height="300">
          <pie-card
               :label="'Expense'"
               :options="expenses"
          ></pie-card>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <bar-card></bar-card>
      </v-flex>
      <v-flex xs6>
        <total-card
            :income="this.total.incomes"
            :expenses="this.total.expenses"
            :savings="this.total.incomes - this.total.expenses"
        ></total-card>
      </v-flex>
    </v-layout>
    <income-dialog @saveIncome="getTotal" v-model="isIncomeOpen"></income-dialog>
    <expense-dialog @saveExpense="getTotal" v-model="isExpenseOpen"></expense-dialog>
    <action-buttons
        @income="onAction"
        @expense="onAction"
    ></action-buttons>
  </v-container>
</template>

<script>
  import BalanceCard from "../components/BalanceCard";
  import PieCard from "../components/PieCard";
  import BarCard from "../components/BarCard";
  import TotalCard from "../components/TotalCard";
  import ActionButtons from "../components/ActionButtons";
  import ExpenseDialog from "../components/ExpenseDialog";
  import IncomeDialog from "../components/IncomeDialog";

  import { mapActions, mapState } from 'vuex';

  export default {
    middleware: 'auth',
    components: {
      BalanceCard,
      PieCard,
      BarCard,
      TotalCard,
      ActionButtons,
      ExpenseDialog,
      IncomeDialog
    },
    data(){
      return {
        isIncomeOpen: false,
        isExpenseOpen: false
      }
    },
    methods: {
      ...mapActions({
        getIncomes: 'incomes/getIncomes',
        getExpenses: 'expenses/getExpenses',
        getTotal: 'common/getTotal'
      }),
      onAction(val){
        if(val === 'expense') {
          this.isExpenseOpen = true;
        } else{
          this.isIncomeOpen = true;
        }
      }
    },
    async mounted() {
      await this.getTotal();
    },
    computed: {
      ...mapState('common', {
        total: state => state.total
      }),
      ...mapState('expenses', {
        expenses: state => state.expenses
      }),
      ...mapState('incomes', {
        incomes: state => state.incomes
      })
    }
  }
</script>

<style>
  body{
    background: #ededee;
  }
</style>

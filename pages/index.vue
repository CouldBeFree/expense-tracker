<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <balance-card
          balance="0"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
          xs4
          incomes="0"
          :path="'/incomes'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
          xs4
          expenses= "0"
          :path="'/expenses'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
          xs4
          savings="0"
        ></balance-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-card height="300">
          <pie-card
            label="expense"
          ></pie-card>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card height="300">
          <pie-card
            label="income"
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
          income="100"
          expenses="100"
          savings="100"
        ></total-card>
      </v-flex>
    </v-layout>
    <income-dialog v-model="isIncomeOpen"></income-dialog>
    <expense-dialog v-model="isExpenseOpen"></expense-dialog>
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
  
  import { mapActions } from 'vuex';

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
        getExpenses: 'expenses/getExpenses'
      }),
      onAction(val){
        if(val === 'expense') {
          this.isExpenseOpen = true;
        } else{
          this.isIncomeOpen = true;
        }
      }
    },
    mounted() {

    }
  }
</script>

<style>
  body{
    background: #ededee;
  }
</style>

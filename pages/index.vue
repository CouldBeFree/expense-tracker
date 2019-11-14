<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <balance-card
            v-if="isEmpty"
            :balance="this.total.incomes[0].total - this.total.expenses[0].total"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
            v-if="isEmpty"
            xs4
            :incomes="this.total.incomes[0].total"
            :path="'/incomes'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
            v-if="isEmpty"
            xs4
            :expenses="this.total.expenses[0].total"
            :path="'/expenses'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
            v-if="isEmpty"
            xs4
            :savings="this.total.incomes[0].total - this.total.expenses[0].total"
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
        <!--<v-card height="300">
          <pie-card
              label="income"
          ></pie-card>
        </v-card>-->
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <bar-card></bar-card>
      </v-flex>
      <v-flex xs6>
        <total-card
            v-if="isEmpty"
            :income="this.total.incomes[0].total"
            :expenses="this.total.expenses[0].total"
            :savings="this.total.incomes[0].total - this.total.expenses[0].total"
        ></total-card>
      </v-flex>
    </v-layout>
    <income-dialog @save="getTotal" v-model="isIncomeOpen"></income-dialog>
    <expense-dialog @save="getTotal" v-model="isExpenseOpen"></expense-dialog>
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
        isExpenseOpen: false,
        incomes: 1,
        expenses: 1
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
      isEmpty: function () {
        return Object.keys(this.total).length
      }
    }
  }
</script>

<style>
  body{
    background: #ededee;
  }
</style>

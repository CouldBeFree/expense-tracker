<template>
  <v-container>
    <v-layout justify-center>
      <date-picker @date="onDateSelect"></date-picker>
    </v-layout>
    <h2 class="text-center mt-2 mb-2">Incomes</h2>
    <data-table
      :options="incomes"
      @delete="onRemove"
      @edit="editItem"
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
          <v-card-title>Are u sure to remove this income?</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" :loading="incomesLoading" text @click="removeItem">Remove</v-btn>
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

  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: "incomes",
    middleware: 'auth',
    data(){
      return{
        isIncomeOpen: false,
        isExpenseOpen: false,
        dialog: false,
        itemId: null
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
        incomes: state => state.incomes,
        incomesLoading: state => state.incomesLoading
      })
    },
    methods: {
      ...mapActions('incomes', ['getIncomes', 'removeIncome']),
      ...mapMutations('common', ['setDate']),
      ...mapMutations('incomes', ['setCurrentIncome']),
      async removeItem(){
        await this.removeIncome(this.itemId);
        await this.getIncomes();
        this.dialog = false;
      },
      editItem(item){
        const copy = {...item};
        this.isIncomeOpen = true;
        this.setCurrentIncome(copy);
      },
      async onDateSelect(val){
        this.setDate(`${val}-01`);
        await this.getIncomes();
      },
      onRemove(item){
        this.dialog = true;
        this.itemId = item._id;
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

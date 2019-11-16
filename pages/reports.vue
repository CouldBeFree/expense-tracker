<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-card class='pt-4'>
      <v-layout justify-center>
        <date-picker @date="onDateSelect"></date-picker>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <div class='mt-4'>
            <v-layout>
              <v-flex xs8>
                <pie-card
                  v-if="refactoredData.length"
                  label='expense'
                  :options='expenses'
                ></pie-card>
              </v-flex>
              <v-flex xs4>
                <expenses-list
                  v-if="refactoredData.length"
                  v-for='(item, i) in refactoredData'
                  :category='item.category'
                  :amount='item.amount'
                  :percent='percentCount(item.amount)'
                  :key='i'
                ></expenses-list>
              </v-flex>
            </v-layout>
          </div>
          <div class='d-flex flex-column justify-center align-center' style='height: 80vh'>
            <div>
              <v-icon color='primary' size='100'>mdi-chart-arc</v-icon>
            </div>
            <p class='font-weight-light'>No data</p>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  import PieCard from '../components/PieCard';
  import ExpensesList from '../components/ExpensesList';
  import DatePicker from "../components/DatePicker";

  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    middleware: 'auth',
    name: 'reports',
    components: {
      DatePicker,
      PieCard,
      ExpensesList
    },
    data(){
      return {
        isOpen: false,
        test: true
      }
    },
    computed: {
      ...mapState('expenses', {
        expenses: state => state.expenses
      }),
      ...mapState('common', {
        total: state => state.total
      }),
      refactoredData: function () {
        let holder = {};
        this.expenses.forEach(el => {
          if (holder.hasOwnProperty(el.category)) {
            holder[el.category] = holder[el.category] + +el.amount;
          } else {
            holder[el.category] = +el.amount;
          }
        });

        let target = [];
        for (let prop in holder) {
          target.push({ category: prop, amount: holder[prop] });
        }
        return target;
      }
    },
    methods: {
      percentCount(amount){
        return ((amount/this.total.expenses) * 100).toFixed(2)
      },
      ...mapActions('common', ['getTotal']),
      ...mapActions('expenses', ['getExpenses']),
      ...mapMutations('common', ['setDate']),
      async onDateSelect(val){
        this.setDate(`${val}-01`);
        await this.getExpenses();
        await this.getTotal();
      }
    },
    mounted(){
      this.getTotal();
    }
  }
</script>

<style scoped>

</style>

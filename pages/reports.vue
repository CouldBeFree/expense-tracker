<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-card class='pt-4'>
      <v-layout justify-center>
        <date-picker></date-picker>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <div class='mt-4'>
            <v-layout>
              <v-flex xs8>
                <pie-card
                  label='expense'
                  :options='expense'
                ></pie-card>
              </v-flex>
              <v-flex xs4>
                <!--<expenses-list
                  v-for='(item, i) in refactoredData'
                  :category='item.category'
                  :amount='item.amount'
                  :percent='percentCount(item.amount)'
                  :key='i'
                ></expenses-list>-->
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
        isOpen: false
      }
    },
    computed: {
      /*refactoredData: function () {
        let holder = {};
        this.expense.forEach(el => {
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
      }*/
    },
    methods: {
      percentCount(amount){
        return ((amount/this.count.expenses) * 100).toFixed(2)
      }
    }
  }
</script>

<style scoped>

</style>

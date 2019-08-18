<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-card class="pt-2">
      <v-layout justify-center>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <div class="text-center">
              <v-btn x-large v-on="on" rounded color="primary" dark>{{formatDate(date)}}</v-btn>
            </div>
          </template>
          <v-date-picker v-model="date" type="month" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <div v-if="expense.length" class="mt-4">
            <v-layout>
              <v-flex xs8>
                <pie-card
                  label="expense"
                  :options="expense"
                ></pie-card>
              </v-flex>
              <v-flex xs4>
                <expenses-list
                  v-for="(item, i) in refactoredData"
                  :category="item.category"
                  :amount="item.amount"
                  :percent="percentCount(item.amount)"
                  :key="i"
                ></expenses-list>
              </v-flex>
            </v-layout>
          </div>
          <div v-else class="d-flex flex-column justify-center align-center" style="height: 80vh">
            <div>
              <v-icon color="primary" size="100">mdi-chart-arc</v-icon>
            </div>
            <p class="font-weight-light">No data</p>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  import PieCard from "../components/PieCard";
  import ExpensesList from "../components/ExpensesList";
  import { mapGetters } from 'vuex';

  export default {
    name: "reports",
    components: {
      PieCard,
      ExpensesList
    },
    data(){
      return {
        date: new Date().toISOString().substr(0, 7),
        menu: false,
        modal: false
      }
    },
    computed: {
      ...mapGetters([
        'expense',
        'count'
      ]),
      refactoredData: function () {
        let holder = {};
        this.expense.forEach(el => {
          if (holder.hasOwnProperty(el.category)) {
            holder[el.category] = holder[el.category] + el.amount;
          } else {
            holder[el.category] = el.amount;
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
      formatDate(date) {
        const monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        let index = date.slice(-2);
        if(+index[0] === 0){
          index = index.slice(-1);
        }
        let month = date.slice(0, -3);

        return `${month} ${monthNames[index - 1]}`;
      },
      percentCount(amount){
        return ((amount/this.count.expenses) * 100).toFixed(2)
      }
    }
  }
</script>

<style scoped>

</style>

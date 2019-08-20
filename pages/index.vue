<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <balance-card
          :balance="count.balance || '0'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
          xs4
          :incomes="count.incomes || '0'"
          :path="'/incomes'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
          xs4
          :expenses="count.expenses || '0'"
          :path="'/expenses'"
        ></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card
          xs4
          :savings="count.balance || '0'"
        ></balance-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <v-card height="300">
          <pie-card
            label="expense"
            :options="expense"
          ></pie-card>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card height="300">
          <pie-card
            label="income"
            :options="incomes"
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
          :income="count.incomes"
          :expenses="count.expenses"
          :savings="count.balance"
        ></total-card>
      </v-flex>
    </v-layout>
    <modal
       v-model="isOpen"
    ></modal>
  </v-container>
</template>

<script>
  import BalanceCard from "../components/BalanceCard";
  import PieCard from "../components/PieCard";
  import BarCard from "../components/BarCard";
  import TotalCard from "../components/TotalCard";
  import Modal from "../components/Modal";
  import { mapGetters } from 'vuex';

  export default {
    components: {
      BalanceCard,
      PieCard,
      BarCard,
      TotalCard,
      Modal
    },
    data(){
      return {
        isOpen: false
      }
    },
    computed: {
      ...mapGetters([
        'incomes',
        'expense',
        'count'
      ])
    }
  }
</script>

<style>
  body{
    background: #ededee;
  }
</style>

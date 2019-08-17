<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <balance-card :balance="count.balance || '0'"></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card :path="'/incomes'" xs4 :incomes="count.incomes || '0'"></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card :path="'/expenses'" xs4 :expenses="count.expenses || '0'"></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card :path="'/savings'" xs4 :savings="count.balance || '0'"></balance-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <pie-card
          label="expense"
          :options="expense"
        ></pie-card>
      </v-flex>
      <v-flex xs6>
        <pie-card
          label="income"
          :options="incomes"
        ></pie-card>
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
    <v-speed-dial
      v-model="fab"
      style="right: 45px; bottom: 60px"
      fixed
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :transition="transition"
      >
      <template v-slot:activator>
        <v-btn
          color="blue darken-4"
          v-model="fab"
          fab
          dark
          fixed
          bottom
          right
          medium
        >
          <v-icon medium>mdi-tooltip-plus-outline</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="openModal('income')"
      >
        <v-icon medium>mdi-currency-usd</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="openModal('expense')"
      >
        <v-icon medium>mdi-arrow-bottom-right</v-icon>
      </v-btn>
    </v-speed-dial>
    <modal
      v-model="isOpen"
      :label="label"
      @data="getData"
    ></modal>
  </v-container>
</template>

<script>
import BalanceCard from "../components/BalanceCard";
import PieCard from "../components/PieCard";
import BarCard from "../components/BarCard";
import TotalCard from "../components/TotalCard";
import Modal from "../components/Modal";
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  data(){
    return{
      fab: false,
      direction: 'top',
      transition: 'slide-y-reverse-transition',
      top: false,
      right: true,
      bottom: true,
      left: false,
	    isOpen: false,
      label: ''
    }
  },
  methods: {
	  openModal(val){
	  	this.isOpen = true;
	  	this.label = val;
    },
	  getData(val){
		  this.setData([this.label, val])
	  },
    ...mapMutations(['setData'])
  },
  computed: {
  	...mapState({

    }),
    ...mapGetters([
      'incomes',
      'expense'
    ]),
    count: function () {
  	  let incomesCopy = this.incomes.map(el => ({...el}));
  	  let expensesCopy = this.expense.map(el => ({...el}));
      let incomesCount = 0;
      let expensesCount = 0;
      for(let i in incomesCopy){
        incomesCount = incomesCopy[i].amount += incomesCount
      }
      for(let i in expensesCopy){
        expensesCount = expensesCopy[i].amount += expensesCount
      }
      return {
        incomes: +incomesCount,
        expenses: +expensesCount,
        balance: +incomesCount - expensesCount
      }
    }
  },
  components: {
    BalanceCard,
    PieCard,
    BarCard,
    TotalCard,
    Modal
  }
}
</script>

<style>
  body{
    background: #ededee;
  }
</style>

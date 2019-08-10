<template>
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <Balance-card :balance="1000"></Balance-card>
      </v-flex>
      <v-flex xs4>
        <Balance-card :path="'/incomes'" xs4 :incomes="1000"></Balance-card>
      </v-flex>
      <v-flex xs4>
        <Balance-card :path="'/expenses'" xs4 :expenses="1000"></Balance-card>
      </v-flex>
      <v-flex xs4>
        <Balance-card :path="'/savings'" xs4 :savings="1200"></Balance-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <Pie-card expense="expense"></Pie-card>
      </v-flex>
      <v-flex xs6>
        <Pie-card income="income"></Pie-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BalanceCard from "../components/BalanceCard";
import PieCard from "../components/PieCard";

export default {
  components: {
    BalanceCard,
    PieCard
  }
}
</script>

<style>
  body{
    background: #ededee;
  }

  .wrapper{
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }
</style>

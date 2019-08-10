<template>
  <!--<div class="wrapper grid-list-xl">-->
  <v-container grid-list-lg grid-list-md grid-list-xs>
    <v-layout>
      <v-flex xs4>
        <balance-card :balance="1000"></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card :path="'/incomes'" xs4 :incomes="1000"></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card :path="'/expenses'" xs4 :expenses="1000"></balance-card>
      </v-flex>
      <v-flex xs4>
        <balance-card :path="'/savings'" xs4 :savings="1200"></balance-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!--</div>-->
</template>

<script>
import balanceCard from "../components/balanceCard";

export default {
  components: {
    balanceCard
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

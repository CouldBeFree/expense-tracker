<template>
    <v-card nuxt :to="path">
        <v-layout align-center justify-space-between>
            <v-flex>
                <v-icon v-if="balance" color="blue darken-4" x-large>mdi-cash-usd</v-icon>
                <v-icon v-else-if="incomes" color="green" x-large>mdi-finance</v-icon>
                <v-icon v-else-if="expenses" color="red" x-large>mdi-call-received</v-icon>
                <v-icon v-else-if="savings" color="indigo" x-large>mdi-home-currency-usd</v-icon>
            </v-flex>
            <v-flex>
                <div v-if="balance" class="pr-1">
                    <div class="font-weight-light text-lg-right">Current Balance</div>
                    <div style="color: #0D47A1; font-size: 18px; font-weight: bold;" class="text-lg-right">$ {{balance}}</div>
                </div>
                <div v-else-if="incomes" class="pr-1">
                    <div class="font-weight-light text-lg-right">Incomes</div>
                    <div style="color: #4CAF50; font-size: 18px; font-weight: bold;" class="text-lg-right">$ {{incomes}}</div>
                </div>
                <div v-else-if="expenses" class="pr-1">
                    <div class="font-weight-light text-lg-right">Expenses</div>
                    <div style="color: #F44336; font-size: 18px; font-weight: bold;" class="text-lg-right">$ {{expenses}}</div>
                </div>
                <div v-else-if="savings" class="pr-1">
                    <div class="font-weight-light text-lg-right">Savings</div>
                    <div style="color: #3F51B5; font-size: 18px; font-weight: bold;" class="text-lg-right">$ {{savings || 0}}</div>
                </div>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: "balanceCard",
    props: ['balance', 'incomes', 'expenses', 'savings', 'path']
  }
</script>

<style scoped>

</style>
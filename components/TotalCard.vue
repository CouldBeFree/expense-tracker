<template>
    <v-card>
        <v-card-title class="subtitle-1">TOTAL</v-card-title>
        <v-card-text>
            <v-layout justify-space-between>
                <v-flex class="subtitle-1 ">
                    <span style="color: green;">Total income</span>
                </v-flex>
                <v-flex class="text-right subtitle-1 ">
                    <span style="color: green;">$ {{income}}</span>
                </v-flex>
            </v-layout>
            <v-layout justify-space-between>
                <v-flex class="subtitle-1">
                    <span style="color: red">Total expenses</span>
                </v-flex>
                <v-flex class="text-right subtitle-1">
                    <span style="color: red">$ {{expenses}}</span>
                </v-flex>
            </v-layout>
            <v-layout justify-space-between>
                <v-flex class="subtitle-1">
                    <span style="color: #263238;">Savings</span>
                </v-flex>
                <v-flex class="text-right subtitle-1">
                    <span style="color: #263238;">$ {{savings}}</span>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    name: "TotalCard",
    props: ['income', 'expenses', 'savings']
  }
</script>

<style scoped>

</style>
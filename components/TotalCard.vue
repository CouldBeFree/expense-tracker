<template>
    <v-card>
        <v-card-title class="subtitle-1">TOTAL</v-card-title>
        <v-card-text>
            <v-layout justify-space-between>
                <v-flex class="subtitle-1 ">
                    <span style="color: green;">Total income</span>
                </v-flex>
                <v-flex class="text-right subtitle-1 ">
                    <span style="color: green;">$ 50000</span>
                </v-flex>
            </v-layout>
            <v-layout justify-space-between>
                <v-flex class="subtitle-1">
                    <span style="color: red">Total expenses</span>
                </v-flex>
                <v-flex class="text-right subtitle-1">
                    <span style="color: red">$ 10000</span>
                </v-flex>
            </v-layout>
            <v-layout justify-space-between>
                <v-flex class="subtitle-1">
                    <span style="color: #263238;">Savings</span>
                </v-flex>
                <v-flex class="text-right subtitle-1">
                    <span style="color: #263238;">$ 40000</span>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    name: "TotalCard"
  }
</script>

<style scoped>

</style>
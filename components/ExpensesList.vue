<template>
  <div class="pr-3">
    <div class="d-flex align-center justify-content-between">
      <div class="d-flex align-center">
        <div v-if="category === 'Clothing'">
          <v-icon x-large color="blue darken-2">mdi-hanger</v-icon>
        </div>
        <div v-else-if="category === 'Food'">
          <v-icon x-large color="blue darken-2">mdi-food-variant</v-icon>
        </div>
        <div v-else-if="category === 'Health Care'">
          <v-icon x-large color="blue darken-2">mdi-medical-bag</v-icon>
        </div>
        <div v-else-if="category === 'Home'">
          <v-icon x-large color="blue darken-2">mdi-home</v-icon>
        </div>
        <div v-else-if="category === 'Payments'">
          <v-icon x-large color="blue darken-2">mdi-credit-card-outline</v-icon>
        </div>
        <div v-else-if="category === 'Recreation'">
          <v-icon x-large color="blue darken-2">mdi-bike</v-icon>
        </div>
        <div class="ml-2">
          <p class="mb-0 title">{{category}}</p>
          <p class="mb-0" style="color: grey">Percentage</p>
        </div>
      </div>
      <div class="text-right">
        <p class="mb-0 subtitle-1 font-weight-bold">$ {{amount}}</p>
        <p class="mb-0" style="color: grey">{{percent}} %</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ExpensesList",
    props: ['category', 'amount', 'percent']
  }
</script>

<style scoped>
  .justify-content-between{
    justify-content: space-between;
  }
</style>
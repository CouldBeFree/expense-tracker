<template>
    <div>
        <div class="d-flex align-center">
            <div v-if="category === 'Clothing'">
                <v-icon x-large color="blue darken-2">mdi-hanger</v-icon>
            </div>
            <div class="ml-2">
                <p class="mb-0 title">{{category}}</p>
                <p class="mb-0">Percentage</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ExpensesList",
    props: ['category']
  }
</script>

<style scoped>

</style>
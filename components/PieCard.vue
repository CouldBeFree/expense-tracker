<template>
    <v-card>
        <chartjs-doughnut
                :labels="labels"
                :datasets="datasets"
                :option="option"
        >
        </chartjs-doughnut>
    </v-card>
</template>

<script>

  export default {
    name: "PieCard",
    props: ['expense', 'income'],
    data() {
      return {
        labels: ['Apples', 'Bananas', 'Grapes'],
        datasets: [
          {
            data: [20, 30, 50],
            backgroundColor: ['Red', 'Yellow', 'Purple']
          }
        ],
        option: {
          title: {
            display: true,
            position: 'bottom',
            text: this.expense || this.income
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
<template>
    <no-ssr>
        <v-card>
            <chartjs-doughnut
                    :labels="labels"
                    :datasets="datasets"
                    :option="option"
            >
            </chartjs-doughnut>
        </v-card>
    </no-ssr>
</template>

<script>

  export default {
    name: "PieCard",
    props: ['label'],
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
            text: this.label
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
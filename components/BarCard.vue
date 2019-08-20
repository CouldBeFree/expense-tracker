<template>
    <client-only>
        <v-card>
            <v-card-title class="subtitle-1">Incomes x Expenses for the last 6 months</v-card-title>
            <chartjs-bar
                    :labels="mylabels"
                    :datasets="mydatasets"
            ></chartjs-bar>
        </v-card>
    </client-only>
</template>

<script>
  export default {
    name: "BarCard",
    data(){
      return {
        mylabels: ["January", "February", "March", "April", "May", "June"],
        mydatasets:[{
          label: "Incomes",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
          {
            label: "Expenses",
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: [20, 50, 20, 41, 26, 85, 20],
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
<template>
    <no-ssr>
        <v-card>
            <chartjs-doughnut
              :labels="labelsData"
              :datasets="chartData"
              :option="option"
              :bind="true"
            >
            </chartjs-doughnut>
          {{chartData}}
        </v-card>
    </no-ssr>
</template>

<script>
  import {expenses, incomes} from '~/common/colors';

  export default {
    name: "PieCard",
    props: ['label', 'options'],
    data() {
      return {
        option: {
          title: {
            display: true,
            position: 'bottom',
            text: this.label
          }
        }
      }
    },
	  computed: {
		  refactoredData: function () {
        let holder = {};
        this.options.forEach(el => {
          if (holder.hasOwnProperty(el.category)) {
            holder[el.category] = holder[el.category] + el.amount;
          } else {
            holder[el.category] = el.amount;
          }
        });

        let target = [];
        for (let prop in holder) {
          target.push({ category: prop, amount: holder[prop] });
        }
        return target;
      },
      labelsData: function () {
        return this.refactoredData.map(el => el.category)
      },
      chartData: function () {
        let data = this.refactoredData.map(el => el.amount);
	      let colors = this.label === 'expense' ? this.labelsData.map(key => expenses[key.toLowerCase()]) : this.labelsData.map(key => incomes[key.toLowerCase()]);
	      //let labels = this.refactoredData.map(el => el.category);
        return [{
        	data: data,
	        backgroundColor: colors,
	        hoverBackgroundColor: colors
        }]
      }
	  }
  }
</script>

<style scoped>

</style>

<template>
    <client-only>
        <div v-if="options.length">
            {{refactoredData}}
            <chartjs-doughnut
                    :labels="labels"
                    :option="option"
                    :data="data"
                    :bind="true"
                    :backgroundcolor="colors"
                    :hoverbackgroundcolor="colors"
            >
            </chartjs-doughnut>
        </div>
        <div v-else class="d-flex justify-center align-center" style="height: 100%">
            <v-icon color="primary" size="100">mdi-chart-arc</v-icon>
        </div>
    </client-only>
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
      /*refactoredData: function () {
        let holder = {};
        this.options.forEach(el => {
          if (holder.hasOwnProperty(el.category)) {
            holder[el.category] = holder[el.category] * el.amount;
          } else {
            holder[el.category] = el.amount;
          }
        });

        let target = [];
        for (let prop in holder) {
          target.push({ category: prop, amount: holder[prop] });
        }
        return target;
      },*/
	  /*refactoredData: function(){
		let counts = this.options.reduce((prev, curr) => {
		  let count = prev.get(curr.category) || 0;
		  prev.set(curr.category, curr.amount + count);
		  return prev;
		}, new Map());

		let reducedObjArr = [...counts].map(([category, amount]) => {
		  return {category, amount}
		});
        return reducedObjArr;
      },*/
	  refactoredData: function(){
		let grouped = Array.from(
		 this.options.reduce((m, { category, amount }) => m.set(category, (m.get(category) || 0) + amount), new Map),
		 ([category, amount]) => ({ category, amount })
		);

		return grouped;
      },
      labels: function () {
        return this.refactoredData.map(el => el.category)
      },
      data: function(){
        return this.refactoredData.map(el => el.amount)
      },
      colors: function () {
        return this.label === 'expense' ? expenses : incomes;
      }
    }
  }
</script>

<style scoped>

</style>

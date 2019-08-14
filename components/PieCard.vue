<template>
    <no-ssr>
        <v-card>
            <chartjs-doughnut
                    :labels="labels"
                    :option="option"
                    :data="data"
                    :bind="true"
                    :backgroundcolor="colors"
                    :hoverbackgroundcolor="colors"
            >
            </chartjs-doughnut>
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

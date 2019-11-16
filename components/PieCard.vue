<template>
    <no-ssr>
        <div v-if="options">
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
        <div v-else style="height: 100%" class="d-flex justify-center align-center">
            <div>
                <v-icon color="primary" size="100">mdi-chart-arc</v-icon>
                <p class="font-weight-medium">
                    <span v-if="label === 'Expense'">No expenses</span>
                    <span v-if="label === 'Incomes'">No incomes</span>
                </p>
            </div>
        </div>
    </no-ssr>
</template>

<script>
    import { expensesColor, incomesColor } from '~/common/colors';
    
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
                        holder[el.category] = holder[el.category] + +el.amount;
                    } else {
                        holder[el.category] = +el.amount;
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
                return this.label === 'expense' ? expensesColor : incomesColor;
            }
        }
    }
</script>

<style scoped>

</style>

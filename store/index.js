export default {
  state: {
    incomes: [],
    expenses: []
  },
  mutations: {
    setData(state, payload){
      if(payload[0] === 'income'){
        state.incomes.push(payload[1])
      } else {
        state.expenses.push(payload[1])
      }
    }
  },
  actions: {
  
  },
  getters: {
    incomes: state => state.incomes,
    expense: state => state.expenses,
    balance: state => {
      /*const initIncomes = [...state.incomes];
      const initExpenses = [...state.expenses];
      let incomes = 0;
      let expenses = 0;
      for(let i in initIncomes){
        incomes = initIncomes[i].amount += incomes
      }
      for(let i in initExpenses){
        expenses = initExpenses[i].amount += expenses
      }
      return incomes - expenses;*/
    }
  }
}

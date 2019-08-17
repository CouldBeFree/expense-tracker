export default {
  state() {
    return {
      incomes: [],
      expenses: []
    }
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
    expense: state => state.expenses
  }
}

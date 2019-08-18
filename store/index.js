export default {
  state() {
    return {
      incomes: [],
      expenses: [
        {
          amount:100,
          category:"Clothing",
          date:"2019-08-18",
          description:"",
          type:"expense",
        },
        {
          amount:100,
          category:"Food",
          date:"2019-08-18",
          description:"",
          type:"expense",
        },
        {
          amount:100,
          category:"Health Care",
          date:"2019-08-18",
          description:"",
          type:"expense",
        },
        {
          amount:100,
          category:"Home",
          date:"2019-08-18",
          description:"",
          type:"expense",
        },
        {
          amount:100,
          category:"Payments",
          date:"2019-08-18",
          description:"",
          type:"expense",
        },
        {
          amount:100,
          category:"Recreation",
          date:"2019-08-18",
          description:"",
          type:"expense",
        }
      ]
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
    expense: state => state.expenses,
    count: state => {
      let incomesCopy = state.incomes.map(el => ({...el}));
      let expensesCopy = state.expenses.map(el => ({...el}));
      let incomesCount = 0;
      let expensesCount = 0;
      for(let i in incomesCopy){
        incomesCount = incomesCopy[i].amount += incomesCount
      }
      for(let i in expensesCopy){
        expensesCount = expensesCopy[i].amount += expensesCount
      }
      return {
        incomes: +incomesCount,
        expenses: +expensesCount,
        balance: +incomesCount - expensesCount
      }
    }
  }
}

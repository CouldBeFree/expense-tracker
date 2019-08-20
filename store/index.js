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
          id: 1
        },
        {
          amount:100,
          category:"Food",
          date:"2019-08-18",
          description:"",
          type:"expense",
          id: 12
        },
        {
          amount:100,
          category:"Health Care",
          date:"2019-08-18",
          description:"",
          type:"expense",
          id: 123
        },
        {
          amount:100,
          category:"Home",
          date:"2019-08-18",
          description:"",
          type:"expense",
          id: 1434
        },
        {
          amount:100,
          category:"Payments",
          date:"2019-08-18",
          description:"",
          type:"expense",
          id: 1123
        },
        {
          amount:100,
          category:"Recreation",
          date:"2019-08-18",
          description:"",
          type:"expense",
          id: 11231
        }
      ],
      details: {},
      currentItem: '',
      loading: false
    }
  },
  mutations: {
    setData(state, payload){
      if(payload[0] === 'income'){
        state.incomes.push(payload[1])
      } else {
        state.expenses.push(payload[1])
      }
    },
    removeExpenseItem(state, payload){
      const index = state.expenses.findIndex(el => el.id === payload);
      state.expenses.splice(index, 1);
    },
    removeIncomeItem(state, payload){
      const index = state.incomes.findIndex(el => el.id === payload);
      state.incomes.splice(index, 1);
    },
    setEditedObject(state, payload){
      state.objectToEdit = payload;
    },
    editObject(state, payload){
      state.objectToEdit[payload[0]] = payload[1]
    },
    setDetailsParams(state){
      state.currentItem === 'income' ? state.incomes.push(state.details) : state.expenses.push(state.details)
    },
    setParams(state, payload){
      state.details[payload[0]] = payload[1]
    },
    setCurrentItem(state, payload){
      state.currentItem = payload;
    },
    setLoading(state, payload){
      state.loading = payload;
    }
  },
  actions: {
    saveParams({state, commit}){
      commit('setLoading', true);
      setTimeout(() => {
        //state.currentItem === 'income' ? state.incomes.push(state.details) : state.expenses.push(state.details)
        commit('setDetailsParams');
      }, 2000);
      commit('setLoading', false);
    }
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

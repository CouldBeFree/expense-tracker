import Vue from 'vue';

export const state = () => ({
  expenses: [],
  expensesLoading: false,
  expenseDetails: {},
  error: ''
});

export const mutations = {
  setLoading(state, payload){
    state.expensesLoading = payload;
  },
  removeExpenseItem(state, payload){
    const index = state.expenses.findIndex(el => el.id === payload);
    state.expenses.splice(index, 1);
  },
  setError(state, error){
    state.error = error;
  },
  setExpenseParams(state, [param, value]){
    Vue.set(state.expenseDetails, param, value);
  },
  setExpenses(state, expenses){
    state.expenses = expenses;
  }
};

export const actions = {
  async getExpenses({ commit }, payload){
    const currentToken = localStorage.getItem('authToken');
    try{
      const { data } = await this.$axios.get('expenses', {
        headers: {"Authorization" : `Bearer ${currentToken}`},
        params: {
          date: payload
        }
      });
      commit('setExpenses', data.data);
    }catch ({response}) {
      commit('setError', response.data.error);
    }
  },
  async saveExpense({state, commit}){
    const currentToken = localStorage.getItem('authToken');
    commit('setLoading', true);
    try{
      await this.$axios.post('expenses/set', state.expenseDetails, { headers: {"Authorization" : `Bearer ${currentToken}`} });
    }catch ({response}) {
      commit('setError', response.data.error);
    }
    commit('setLoading', false);
  }
};
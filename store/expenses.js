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
  }
};

export const actions = {
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
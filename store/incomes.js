import Vue from 'vue';

export const state = () => ({
  incomes: [],
  incomesLoading: false,
  incomeDetails: {},
  error: ''
});

export const mutations = {
  setLoading(state, payload){
    state.incomesLoading = payload;
  },
  removeExpenseItem(state, payload){
    const index = state.expenses.findIndex(el => el.id === payload);
    state.expenses.splice(index, 1);
  },
  setError(state, error){
    state.error = error;
  },
  setIncomeParams(state, [param, value]){
    Vue.set(state.incomeDetails, param, value);
  }
};

export const actions = {
  async saveIncome({state, commit}){
    const currentToken = localStorage.getItem('authToken');
    commit('setLoading', true);
    try{
      await this.$axios.post('expenses/set', state.incomeDetails, { headers: {"Authorization" : `Bearer ${currentToken}`} });
    }catch ({response}) {
      commit('setError', response.data.error);
    }
    commit('setLoading', false);
  }
};
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
  removeIncomeItem(state, payload){
    const index = state.expenses.findIndex(el => el.id === payload);
    state.expenses.splice(index, 1);
  },
  setError(state, error){
    state.error = error;
  },
  setIncomeParams(state, [param, value]){
    Vue.set(state.incomeDetails, param, value);
  },
  setIncomes(state, incomes){
    state.incomes = incomes
  }
};

export const actions = {
  async getIncomes({ commit, rootState }){
    const currentToken = localStorage.getItem('authToken');
    try{
      const { data } = await this.$axios.get('incomes', {
        headers: {"Authorization" : `Bearer ${currentToken}`},
        params: {
          date: rootState.common.date
        }
      });
      commit('setIncomes', data.data);
    }catch ({response}) {
      commit('setError', response.data.error);
    }
  },
  async saveIncome({state, commit}){
    const currentToken = localStorage.getItem('authToken');
    commit('setLoading', true);
    try{
      await this.$axios.post('incomes/set', state.incomeDetails, { headers: {"Authorization" : `Bearer ${currentToken}`} });
    }catch ({response}) {
      commit('setError', response.data.error);
    }
    commit('setLoading', false);
  }
};

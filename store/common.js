export const state = () => ({
  date: new Date().toISOString().substr(0, 10),
  loading: false,
  error: '',
  total:{}
});

export const mutations = {
  setDate(state, date){
    state.date = date;
  },
  setError(state, error){
    state.error = error;
  },
  setLoading(state, loading){
    state.loading = loading;
  },
  setTotal(state, total){
    state.total = total;
  }
};

export const actions = {
  async getTotal({commit, state}){
    const currentToken = localStorage.getItem('authToken');
    commit('setLoading', true);
    try{
      const { data } = await this.$axios.get('/total', {
        headers: {"Authorization" : `Bearer ${currentToken}`},
        params: { date: state.date }});
      commit('setTotal', data);
    }catch ({response}) {
      console.error(response.data.error);
    }
    commit('setLoading', false);
  }
};

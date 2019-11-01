export const state = () => ({
  token: '',
  user: {},
  loading: false,
  error: ''
});

export const mutations = {
  setLoading(state, payload){
    state.loading = payload;
  },
  setToken(state, token){
    state.token = token;
    this.$router.push({ path: '/' });
    if(process.browser){
      localStorage.setItem('authToken', token);
    }
  }
};

export const actions = {
  async registerUser({state, commit}, payload){
    commit('setLoading', true);
    const { data } = await this.$axios.post('auth/register', payload);
    commit('setStatus', data);
    commit('setLoading', false);
  },
  async loginUser({state, commit}, payload){
    commit('setLoading', true);
    const { data } = await this.$axios.post('auth/login', payload);
    data.token ? commit('setToken', data.token) : commit('setError', data.error);
    commit('setLoading', false);
  }
};

export const state = () => ({
  token: '',
  user: {},
  loading: false,
  error: '',
  snackbar: false
});

export const mutations = {
  setLoading(state, payload){
    state.loading = payload;
  },
  setToken(state, token){
    state.token = token;
  },
  setError(state, error){
    state.error = error;
  },
  showSnackBar(state, val){
    state.snackbar = val;
  },
  setUser(state, user){
    state.user = user
  }
};

export const actions = {
  async registerUser({state, commit}, payload){
    commit('setLoading', true);
    commit('setError', '');
    try{
      const { data } = await this.$axios.post('auth/register', payload);
      const { token, success, error } = data;
      localStorage.setItem('authToken', token);
      commit('setToken', token);
      await this.$router.push({ path: '/' });
    }catch ({ response }) {
      commit('setError', response.data.error);
    }
    commit('setLoading', false);
  },
  async loginUser({state, commit}, payload){
    commit('setLoading', true);
    commit('setError', '');
    try{
      const { data } = await this.$axios.post('auth/login', payload);
      const { token, success } = data;
      localStorage.setItem('authToken', token);
      commit('setToken', token);
      await this.$router.push({ path: '/' });
    }catch ({ response }) {
      commit('setError', response.data.error);
    }
    commit('setLoading', false);
  },
  async getUser({state, commit}){
    commit('setLoading', true);
    const { data } = await this.$axios.get('auth/me', { headers: {"Authorization" : `Bearer ${state.token}`} });
    const user = data.data[0];
    commit('setUser', user);
    commit('setLoading', false);
  }
};

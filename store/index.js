import Vue from 'vue';

export default {
  state() {
    return {
      incomes: [],
      details: {},
      currentItem: '',
      error: '',
      status: '',
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
      state.currentItem === 'income' ? state.incomes.push(state.details) : state.expenses.push(state.details);
      state.details = {};
    },
    setParams(state, [param, value]){
      Vue.set(state.details, param, value);
    },
    setCurrentItem(state, payload){
      state.currentItem = payload;
    },
    setLoading(state, payload){
      state.loading = payload;
    },
    setError(state, error){
      state.error = error
    }
  },
  actions: {

  },
  getters: {
    incomes: state => state.incomes,
    status: state => state.status,
    error: state => state.error
  }
}

export const state = () => ({
  expenses: [],
  loading: false
});

export const mutations = {
  setLoading(state, payload){
    state.loading = payload;
  },
  removeExpenseItem(state, payload){
    const index = state.expenses.findIndex(el => el.id === payload);
    state.expenses.splice(index, 1);
  },
};

export const actions = {

};

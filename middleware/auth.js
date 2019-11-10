export default async function ({ store, redirect }) {
  if(process.client){
    //const currentDate = new Date().toISOString().substr(0, 10);
    const token = store.state.auth.token;
    if(!token){
      store.commit('auth/showSnackBar', true);
      return redirect('/login');
    }
    // await store.dispatch('expenses/getExpenses', currentDate);
    // await store.dispatch('incomes/getIncomes', currentDate);
  }
}

export default async function ({ store, redirect }) {
  if(process.client){
    const token = store.state.auth.token;
    if(!token){
      store.commit('auth/showSnackBar', true);
      return redirect('/login');
    }
  }
}

<template>
 <v-container>
   <h4 class="text-center">A penny saved is a penny earned.</h4>
   <v-layout justify-center>
     <v-flex xs4>
       <v-form ref="form">
         <v-text-field
           label="Username"
           v-model="username"
           type="text"
           :rules="[v => !!v || 'Name is required']"
         ></v-text-field>
         <v-text-field
           v-model="password"
           label="Password"
           type="password"
           :rules="[v => !!v || 'Password is required']"
         ></v-text-field>
         <v-text-field
           v-model="email"
           label="Email"
           type="email"
           :rules="[v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid']"
         ></v-text-field>
         <div class="d-flex justify-end">
           <v-btn
             color="primary"
             :loading="loading"
             @click="submit"
           >
             Register
           </v-btn>
         </div>
       </v-form>
       <div>
         <p class="text-center mt-5">If you already have an account you can login <nuxt-link :to="'/login'">login</nuxt-link></p>
       </div>
       <v-alert
               v-if="error"
               dense
               outlined
               type="error"
               transition="scale-transition"
       >
         {{error}}
       </v-alert>
     </v-flex>
   </v-layout>
 </v-container>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'

 export default {
   name: "register",
   data(){
     return{
       username: '',
       password: '',
       email: ''
     }
   },
   mounted(){
     this.setError('');
   },
   methods: {
     async submit(){
       const payload = {
         username: this.username,
         password: this.password,
         email: this.email
       };
       if(this.$refs.form.validate()){
         this.registerUser(payload);
       }
     },
     ...mapActions('auth', ['registerUser']),
     ...mapMutations('auth', ['setStatus', 'setError'])
   },
   computed: {
     ...mapState('auth', {
       loading: state => state.loading,
       error: state => state.error
     })
   }
 }
</script>

<style scoped>

</style>

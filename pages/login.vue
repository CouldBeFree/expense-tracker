<template>
  <v-container>
    <h4 class="text-center">When I was young I thought that money was the most important thing in life. Now that I am old I know that it is.</h4>
    <v-layout justify-center>
      <v-flex xs4>
        <v-form ref="form">
          <v-text-field
              label="Email"
              type="email"
              :rules="[v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid']"
              v-model="email"
          ></v-text-field>
          <v-text-field
              label="Password"
              type="password"
              :rules="[v => !!v || 'Password is required']"
              v-model="password"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn
                color="primary"
                @click="submit"
                :loading="loading"
            >
              Login
            </v-btn>
          </div>
        </v-form>
        <div>
          <p class="text-center mt-5">If dont have an account you can register <nuxt-link :to="'/register'">register</nuxt-link></p>
        </div>
        <v-alert
            v-if="error"
            dense
            outlined
            type="error"
            transition="scale-transition"
        >
          Invalid credentials
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "login",
    data(){
      return{
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions({
        loginUser: 'auth/loginUser'
      }),
      async submit(){
        const user = {
          email: this.email,
          password: this.password
        };
        if(this.$refs.form.validate()){
          await this.loginUser(user);
        }
      }
    },
    computed:{
      ...mapState("auth", {
        token: state => state.token,
        error: state => state.error,
        loading: state => state.loading
      })
    }
  }
</script>

<style scoped>

</style>

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
            >
              Login
            </v-btn>
          </div>
        </v-form>
        <v-alert class="mt-2" :type="type" v-if="user && isVisible" transition="scale-transition">
          {{token ? 'You successfuly logged in' : error}}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    name: "login",
    data(){
      return{
        email: '',
        password: '',
        isVisible: false
      }
    },
    methods: {
      ...mapActions([
        'loginUser'
      ]),
      submit(){
        const user = {
          email: this.email,
          password: this.password
        };
        if(this.$refs.form.validate()){
          this.isVisible = true;
          this.loginUser(user);
          setTimeout(() => {
            this.isVisible = false
          }, 5000)
        }
      }
    },
    computed:{
      ...mapGetters([
        'user',
        'token',
        'error'
      ]),
      type: function () {
        return this.user ? 'info' : 'error'
      }
    }
  }
</script>

<style scoped>

</style>
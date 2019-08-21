<template>
  <v-container>
    <h4 class="text-center">When I was young I thought that money was the most important thing in life. Now that I am old I know that it is.</h4>
    <v-layout justify-center>
      <v-flex xs4>
        <v-form ref="form">
          <v-text-field
              label="Username"
              type="text"
              :rules="[v => !!v || 'Name is required']"
              v-model="username"
          ></v-text-field>
          <v-text-field
              label="Password"
              type="text"
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        username: '',
        password: ''
      }
    },
    methods: {
      submit(){
        this.$refs.form.validate();
      }
    }
  }
</script>

<style scoped>

</style>
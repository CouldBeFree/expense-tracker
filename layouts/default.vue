<template>
  <v-app>
    <v-content>
      <div class="wrap">
        <v-snackbar
            :top="true"
            :color="color"
            :value="snackbar"
        >
          {{ text }}
          <v-btn
              color="white"
              text
              @click="closeSnackbar"
          >
            Close
          </v-btn>
        </v-snackbar>
        <NavBar elevation="5"></NavBar>
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
	import NavBar from "../components/NavBar";
	import { mapState, mapMutations, mapActions } from "vuex"

	export default {
		components: {
			NavBar
		},
		data () {
			return {
        text: 'You need to login to access this page',
        color: 'error'
			}
		},
    mounted(){
      const currentToken = localStorage.getItem('authToken');

      if(currentToken){
        this.setToken(currentToken);
      }
    },
    methods: {
      ...mapMutations("auth", ["showSnackBar", "setToken"]),
      ...mapActions("auth", ["getUser"]),
      closeSnackbar(){
        this.showSnackBar(false);
      }
    },
    computed: {
		  ...mapState("auth", {
		    snackbar: state => state.snackbar,
        token: state => state.token
      })
    }
	}
</script>

<style>
  .wrap{
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
</style>

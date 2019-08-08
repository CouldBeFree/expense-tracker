<template>
  <v-app>
    <v-content>
      <div class="wrap">
        <NavBar></NavBar>
        <nuxt />
      </div>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
	import NavBar from "../components/NavBar";

	export default {
		components: {
			NavBar
		},
		data () {
			return {

			}
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

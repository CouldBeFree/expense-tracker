<template>
  <v-app>
    <v-content>
      <div class="wrap">
        <NavBar elevation="5"></NavBar>
        <nuxt />
      </div>
    </v-content>
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

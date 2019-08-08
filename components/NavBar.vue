<template>
  <ul class="nav">
    <li>
      <nuxt-link to="/">Dashboard</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/reports">Reports</nuxt-link>
    </li>
  </ul>
</template>

<script>
	export default {
		name: "NavBar"
	}
</script>

<style scoped>
  .nav{
    background: #ffffff;
  }
</style>

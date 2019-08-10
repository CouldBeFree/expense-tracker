<template>
  <div class="nav">
    <nuxt-link to="/" exact>
      <v-layout column align-center>
        <v-icon>mdi-home</v-icon>
        <span>Dashboard</span>
      </v-layout>
    </nuxt-link>
    <nuxt-link to="/reports" exact>
      <v-layout column align-center>
        <v-icon>mdi-chart-line</v-icon>
        <span>Reports</span>
      </v-layout>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped lang="scss">
  .nav{
    background: #ffffff;

    a{
      text-decoration: none;

      .layout{
        padding: 10px 5px;
        color: #646464;

        &:hover{
          background: rgba(0,0,0,.12);
        }
      }

      &.nuxt-link-active{
        span{
          color: #3350b9;
        }

        i{
          color: #3350b9 !important;
          caret-color: #3350b9 !important;
        }
      }
    }
  }
</style>

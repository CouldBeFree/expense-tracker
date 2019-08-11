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
    transition-property: box-shadow, opacity;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

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

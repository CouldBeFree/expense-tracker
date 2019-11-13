<template>
  <div>
    <v-speed-dial
            v-model="fab"
            style="right: 45px; bottom: 60px"
            fixed
            :top="false"
            :bottom="true"
            :right="true"
            :left="false"
            :direction="'top'"
            :transition="'slide-y-reverse-transition'"
    >
      <template v-slot:activator>
        <v-btn
                color="blue darken-4"
                v-model="fab"
                fab
                dark
                fixed
                bottom
                right
                medium
        >
          <v-icon medium>mdi-tooltip-plus-outline</v-icon>
        </v-btn>
      </template>
      <v-btn
              fab
              dark
              small
              color="green"
              @click="$emit('income', 'income')"
      >
        <v-icon medium>mdi-currency-usd</v-icon>
      </v-btn>
      <v-btn
              fab
              dark
              small
              color="red"
              @click="$emit('expense', 'expense')"
      >
        <v-icon medium>mdi-arrow-bottom-right</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>

  export default {
    name: "Modal",
    props: ['value'],
    data(){
      return{
        fab: false
      }
    }
  }
</script>

<style scoped>

</style>

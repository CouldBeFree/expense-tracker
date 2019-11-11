<template>
  <v-dialog
          ref='dialog'
          v-model='modal'
          :return-value.sync='date'
          persistent
          full-width
          width='290px'
  >
    <template v-slot:activator='{ on }'>
      <div class='text-center'>
        <v-btn x-large v-on='on' rounded color='primary' dark>{{formatDate(date)}}</v-btn>
      </div>
    </template>
    <v-date-picker v-model='date' type='month' scrollable>
      <v-spacer></v-spacer>
      <v-btn text color='primary' @click='modal = false'>Cancel</v-btn>
      <v-btn text color='primary' @click='$refs.dialog.save(date)'>OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
  export default {
    name: "DatePicker",
    props: ["target"],
    data(){
      return{
        date: new Date().toISOString().substr(0, 7),
        menu: false,
        modal: false
      }
    },
    methods: {
      formatDate(date) {
        const monthNames = [
          'January', 'February', 'March',
          'April', 'May', 'June', 'July',
          'August', 'September', 'October',
          'November', 'December'
        ];
        let index = date.slice(-2);
        if(+index[0] === 0){
          index = index.slice(-1);
        }
        let month = date.slice(0, -3);

        return `${month} ${monthNames[index - 1]}`;
      }
    }
  }
</script>

<style scoped>

</style>

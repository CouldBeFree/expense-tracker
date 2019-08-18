<template>
  <v-container>
    <v-card class="pt-2">
      <v-layout justify-center>
        <date-picker></date-picker>
      </v-layout>
      <h2>Expenses</h2>
      <data-table
        @delete="removeItem"
        @edit="editItem"
        :options="expense"
      ></data-table>
    </v-card>
    <modal
      v-model="isOpen"
    ></modal>
  </v-container>
</template>

<script>
  import DatePicker from "../components/DatePicker";
  import Modal from "../components/Modal";
  import DataTable from "../components/DataTable";
  import { mapGetters, mapMutations } from 'vuex'
  
  export default {
    name: "expenses",
    components: {
      DatePicker,
      Modal,
      DataTable
    },
    data(){
      return{
        isOpen: false
      }
    },
    computed: {
      ...mapGetters([
        'expense'
      ])
    },
    methods: {
      ...mapMutations([
        'removeExpenseItem',
        'setEditedObject'
      ]),
      removeItem(item){
        this.removeExpenseItem(item.id)
      },
      editItem(item){
        this.isOpen = true;
        this.setEditedObject(item);
      }
    }
  }
</script>

<style scoped>

</style>
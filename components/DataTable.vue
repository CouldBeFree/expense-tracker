<template>
  <no-ssr>
    <div>
      <v-data-table
              :headers="headers"
              :items="options"
              :items-per-page="10"
              class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </no-ssr>
</template>

<script>
  
  export default {
    name: "DataTable",
    props: ['options'],
    data(){
      return{
        headers: [
          {text: 'Date', value: 'date'},
          {text: 'Category', value: 'category'},
          {text: 'Amount', value: 'amount'},
          {text: 'Description', value: 'description'},
          { text: 'Actions', value: 'action', sortable: false },
        ]
      }
    },
    methods: {
      editItem(item){
        this.$emit('edit', item);
      },
      deleteItem(item){
        this.$emit('delete', item);
      }
    }
  }
</script>

<style scoped>

</style>
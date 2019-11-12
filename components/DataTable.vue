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
            @click="$emit('edit', item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="$emit('delete', item)"
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
    }
  }
</script>

<style scoped>

</style>

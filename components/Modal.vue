<template>
  <v-dialog :value="value" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">{{label.charAt(0).toUpperCase() + label.slice(1)}}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-layout wrap>
            <v-flex xs6>
              <v-text-field
                      label="Insert value"
                      type="number"
                      v-model="amount"
                      prefix="$"
                      prepend-icon="mdi-calculator"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                      type="text"
                      label="Description"
                      prepend-icon="mdi-comment-text"
                      v-model="description"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                      :items="selectOptions"
                      label="Category"
                      prepend-icon="mdi-format-list-bulleted"
                      v-model="category"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="clearForm">Close</v-btn>
        <v-btn color="blue darken-1" :disabled="!amount" @click="setData">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "Modal",
    props: ['value', 'label'],
    data(){
      return{
        description: '',
        amount: 0,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        category: '',
        items: ['Clothing', 'Food', 'Health Care', 'Home', 'Payments', 'Recreation']
      }
    },
    methods: {
      setData(){
        let data = {
          description: this.description,
          amount: +this.amount,
          date: this.date,
          category: this.category
        };
	      this.$emit('data', data);
	      this.clearForm();
      },
      clearForm(){
      	this.amount = 0;
      	this.date = new Date().toISOString().substr(0, 10);
      	this.description = '';
	      this.$emit('input', false);
      }
    },
    computed: {
	    selectOptions: function () {
        let options;
        let expenses = ['Clothing', 'Food', 'Health Care', 'Home', 'Payments', 'Recreation'];
        let incomes = ['Salary', 'Other', 'Rewards', 'Gift'];
		    options = this.label === 'income' ? incomes : expenses;
		    this.category = options[0];
		    return options;
	    }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <v-dialog :value="value" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="label">{{uppercase(label)}}</span>
          <span v-else>{{uppercase(objectToEdit.type)}}</span>
          {{objectToEdit}}
          {{amount}}
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  label="Insert value"
                  type="number"
                  :value="objectToEdit.amount || amount"
                  @input="getAmount"
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
                      :value="objectToEdit.date || date"
                      @input="getDate"
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
          <v-btn color="blue darken-1" :disabled="!amount" @click="saveData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        @click="openModal('income')"
      >
        <v-icon medium>mdi-currency-usd</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="openModal('expense')"
      >
        <v-icon medium>mdi-arrow-bottom-right</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  
  export default {
    name: "Modal",
    props: ['value'],
    data(){
      return{
        fab: false,
        label: '',
        isOpen: false,
        description: '',
        amount: 0,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        category: '',
        items: ['Clothing', 'Food', 'Health Care', 'Home', 'Payments', 'Recreation']
      }
    },
    methods: {
      ...mapMutations([
        'setData',
        'editObject'
      ]),
      getAmount(val){
        if(!this.objectToEdit){
          this.amount = val;
        } else {
          this.editObject(['amount', val])
        }
      },
      getDate(val){
        if(!this.objectToEdit){
          this.date = val;
        } else {
          this.editObject(['date', val])
        }
      },
      saveData(){
        let data = {
          description: this.description,
          amount: +this.amount,
          date: this.date,
          category: this.category,
          type: this.label,
          id: this.randomId()
        };
        this.setData([this.label, data]);
        this.$emit('input', false);
        this.clearForm();
      },
      uppercase(word){
        if(!word){
          return
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      },
      randomId(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      },
      openModal(val){
        this.$emit('input', true);
        this.label = val;
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
      },
      ...mapState([
        'objectToEdit'
      ])
    }
  }
</script>

<style scoped>

</style>

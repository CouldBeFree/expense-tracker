<template>
  <div>
    <v-dialog :value="value" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="label">{{uppercase(label)}}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                        label="Insert value"
                        type="number"
                        :value="details.amount"
                        :rules="[v => !!v || 'Amount is required']"
                        @input="setParams(['amount', $event])"
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
                            :value="details.date"
                            :placeholder="date"
                            @input="setParams(['date', $event])"
                            :rules="[v => !!v || 'Date is required']"
                            label="Picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="saveDate">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                        type="text"
                        label="Description"
                        prepend-icon="mdi-comment-text"
                        @input="setParams(['description', $event])"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                        :items="selectOptions"
                        label="Category"
                        :rules="[v => !!v || 'Category is required']"
                        prepend-icon="mdi-format-list-bulleted"
                        :placeholder="category"
                        @input="setParams(['category', $event])"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" @click="saveData">Save</v-btn>
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
  import { mapMutations, mapState, mapActions } from 'vuex';

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
        'editObject',
        'setParams',
        'setCurrentItem',
        'setDetailsParams'
      ]),
      ...mapActions([
        'saveParams'
      ]),
      saveDate(){
        this.$refs.menu.save(this.date);
        this.setParams(['date', this.date])
      },
      closeForm(){
        this.$refs.form.resetValidation();
        this.$emit('input', false);
      },
      saveData(){
        if(this.$refs.form.validate()){
          this.setDetailsParams();
          this.$refs.form.reset();
          //this.clearForm();
          this.$emit('input', false);
        }
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
        this.setCurrentItem(val);
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
        'details'
      ])
    }
  }
</script>

<style scoped>

</style>

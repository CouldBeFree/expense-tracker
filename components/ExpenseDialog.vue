<template>
  <div>
    <v-dialog :value="value" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Expense</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                    label="Insert value"
                    type="number"
                    :value="expenseDetails.amount"
                    :rules="[v => !!v || 'Amount is required']"
                    @input="onInput($event, 'amount')"
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
                        :value="expenseDetails.date"
                        :placeholder="date"
                        @input="onInput($event, 'date')"
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
                    :value="expenseDetails.description"
                    label="Description"
                    prepend-icon="mdi-comment-text"
                    @input="onInput($event, 'description')"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                    :items="selectOptions"
                    hide-details
                    menu-props="auto"
                    :rules="[v => !!v || 'Category is required']"
                    prepend-icon="mdi-format-list-bulleted"
                    @input="onInput($event, 'category')"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeForm">Close</v-btn>
          <v-btn color="blue darken-1" :loading="expensesLoading" @click="saveData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex';

  export default {
    name: "ExpenseDialog",
    props: ['value'],
    data(){
      return{
        date: new Date().toISOString().substr(0, 10),
        selectOptions: ['Clothing', 'Food', 'Health Care', 'Home', 'Payments', 'Recreation'],
        menu: false
      }
    },
    methods: {
      ...mapActions('expenses', ['saveExpense']),
      ...mapMutations("expenses", ['setExpenseParams']),
      onInput(val, category){
        this.setExpenseParams([category, val]);
      },
      saveDate(){
        this.$refs.menu.save(this.date);
        this.setExpenseParams(['date', this.date]);
      },
      closeForm(){
        this.$refs.form.resetValidation();
        this.$emit('input', false);
      },
      async saveData(){
        if(this.$refs.form.validate()){
          await this.saveExpense();
          this.$refs.form.reset();
          this.$emit('input', false);
        }
      }
    },
    computed: {
      ...mapState('expenses', {
        expenseDetails: state => state.expenseDetails,
        expensesLoading: state => state.expensesLoading
      })
    }
  }
</script>

<style scoped>

</style>

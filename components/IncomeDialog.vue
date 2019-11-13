<template>
  <div>
    <v-dialog :value="value" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Income</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                    label="Insert value"
                    type="number"
                    :value="incomeDetails.amount"
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
                        :value="incomeDetails.date"
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
                    :value="incomeDetails.description"
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
          <v-btn color="blue darken-1" :loading="incomesLoading" @click="saveData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex';

  export default {
    name: "IncomeDialog",
    props: ['value'],
    data(){
      return{
        date: new Date().toISOString().substr(0, 10),
        selectOptions: ['Salary', 'Other', 'Rewards', 'Gift'],
        menu: false
      }
    },
    methods: {
      ...mapActions('incomes', ['saveIncome']),
      ...mapMutations("incomes", ['setIncomeParams']),
      onInput(val, category){
        this.setIncomeParams([category, val]);
      },
      saveDate(){
        this.$refs.menu.save(this.date);
        this.setIncomeParams(['date', this.date]);
      },
      closeForm(){
        this.$refs.form.resetValidation();
        this.$emit('input', false);
      },
      async saveData(){
        if(this.$refs.form.validate()){
          await this.saveIncome();
          this.$refs.form.reset();
          this.$emit('input', false);
        }
      }
    },
    computed: {
      ...mapState('incomes', {
        incomeDetails: state => state.incomeDetails,
        incomesLoading: state => state.incomesLoading
      })
    }
  }
</script>

<style scoped>

</style>

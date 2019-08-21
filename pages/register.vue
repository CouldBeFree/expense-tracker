<template>
    <v-container>
        <h4 class="text-center">A penny saved is a penny earned.</h4>
        <v-layout justify-center>
            <v-flex xs4>
                <v-form ref="form">
                    <v-text-field
                        label="Username"
                        v-model="username"
                        type="text"
                        :rules="[v => !!v || 'Name is required']"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="[v => !!v || 'Password is required']"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        :rules="[v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid']"
                    ></v-text-field>
                    <div class="d-flex justify-end">
                        <v-btn
                            color="primary"
                            @click="submit"
                        >
                            Register
                        </v-btn>
                    </div>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "register",
        data(){
            return{
                username: '',
                password: '',
                email: ''
            }
        },
        methods: {
            submit(){
                this.$refs.form.validate();
            }
        }
    }
</script>

<style scoped>

</style>
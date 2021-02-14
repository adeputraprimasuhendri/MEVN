<template>
    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card overflow-hidden">
                        <div class="card-body pt-0">
                            <div class="p-2">
                                <div class="mt-3 mb-3 text-center">
                                    <h2>MEVN</h2>
                                </div>
                                <form @submit.prevent="userLogin" class="form-horizontal text-left" action="index.html">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input v-model="email" type="text" class="form-control"
                                            placeholder="Enter username">
                                    </div>

                                    <div class="form-group">
                                        <label for="userpassword">Password</label>
                                        <input v-model="password" type="password" class="form-control"
                                            placeholder="Enter password">
                                    </div>

                                    <div class="mt-3">
                                        <button class="btn btn-primary btn-block waves-effect waves-light"
                                            type="submit">Log In</button>
                                    </div>


                                </form>
                            </div>

                        </div>
                    </div>
                    <div class="mt-3 text-center">
                        <div>
                            <p>© 2021 MEVN</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async userLogin() {
                await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    },
                }).then(res => {
                    console.log(res.data);
                    this.$router.push("/")
                });
            }
        }
    }
</script>
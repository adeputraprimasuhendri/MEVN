<template>
    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card overflow-hidden">
                        <div class="card-body pt-0">
                            <div class="p-2">
                                <div class="mt-3 mb-3 text-center">
                                    <h2>MEVN REGISTRATION</h2>
                                </div>
                                <form @submit.prevent="register" class="form-horizontal text-left">
                                    <div class="form-group">
                                        <label for="username">Fullname</label>
                                        <input v-model="fullname" type="text" class="form-control"
                                            placeholder="Enter Fullname">
                                    </div>
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
                                    <div class="form-group">
                                        <label for="userpassword">Confirm Password</label>
                                        <input v-model="confirm_password" type="password" class="form-control"
                                            placeholder="Confirm password">
                                    </div>
                                    <div class="mt-3">
                                        <button class="btn btn-primary btn-block waves-effect waves-light"
                                            type="submit">Submit</button>
                                    </div>
                                    <div class="mt-3">
                                        <span>Already have account? <router-link to="/login">Login</router-link>
                                        </span>
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
                fullname: '',
                email: '',
                password: '',
                confirm_password: ''
            }
        },
        methods: {
            async register() {
                var axios = require('axios');
                var data = JSON.stringify({ "fullname": this.fullname, "email": this.email, "password": this.password, "confirm_password": this.confirm_password });
                var config = {
                    method: 'post',
                    url: 'http://147.139.181.78:3000/api/auth/signup',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                    .then(res => {
                        res.data.status ? this.$router.push("/login") : alert(res.data.message)
                    })
            }
        }
    }
</script>
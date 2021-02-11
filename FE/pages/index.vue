<template>
  <div class="container">
    <div>
      <h1 class="title">
        MEVN
      </h1>
      <table class="table table-bordered">
        <tr>
          <th>Fullname</th>
          <th>Email</th>
          <th>Password</th>
          <th>
            <button class="btn btn-sm btn-primary" v-b-modal.modal-1>Add</button>
          </th>
        </tr>
        <tr v-for="user in datauser">
          <td>{{user.fullname}}</td>
          <td>{{user.email}}</td>
          <td>{{user.password}}</td>
          <th><button class="btn btn-sm btn-danger" @click="deleteuser(user._id)">Del</button></th>
        </tr>
      </table>
      <b-modal id="modal-1" title="Add User" hide-footer="true">
        <b-form-input v-model="fullname" placeholder="Fullname"></b-form-input>
        <b-form-input v-model="email" placeholder="Email"></b-form-input>
        <b-form-input v-model="password" placeholder="Passowrd"></b-form-input>
        <b-button variant="outline-primary" @click="adduser">Simpan</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
  var axios = require('axios');
  export default {
    async fetch() {
      var dataitem = {
        method: 'get',
        url: 'http://147.139.181.78:3000/member'
      };
      axios(dataitem)
        .then(res => {
          this.datauser = res.data;
        })
    },
    fetchOnServer: false,
    data() {
      return {
        fullname: '',
        email: '',
        password: '',
        datauser: []
      }
    },
    methods: {
      deleteuser(id) {
        var dataitem = {
          method: 'delete',
          url: 'http://147.139.181.78:3000/member/' + id
        };
        axios(dataitem)
          .then(res => {
            this.$fetch()
          })
      },
      adduser() {
        var data = JSON.stringify({ "fullname": this.fullname, "email": this.email, "password": this.password });
        var dataitem = {
          method: 'post',
          url: 'http://147.139.181.78:3000/member',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        axios(dataitem)
          .then(res => {
            this.$bvModal.hide('modal-1');
            this.$fetch()
          })
      }
    },
  }
</script>
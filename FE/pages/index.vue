<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="mb-3 text-center text-md-left">
            Bootstrap<span class="text-vue-green">Vue</span> Member</h1>
      <table class="table">
        <tr>
          <th>Fullname</th>
          <th>Email</th>
          <th>Password</th>
          <th class="text-center">
            <button class="btn btn-sm btn-info" v-b-modal.modal-1>Add Member</button>
          </th>
        </tr>
        <tr v-for="user in datauser">
          <td>{{user.fullname}}</td>
          <td>{{user.email}}</td>
          <td>********</td>
          <th class="text-center"><button class="btn btn-sm btn-danger" @click="deleteuser(user._id)">Delete</button></th>
        </tr>
      </table>
      <b-modal id="modal-1" title="Form Member BootstrapVue" hide-footer="true">
        <b-form-input v-model="fullname" placeholder="Fullname" class="mb-2"></b-form-input>
        <b-form-input v-model="email" placeholder="Email" class="mb-2"></b-form-input>
        <b-form-input v-model="password" placeholder="Password" class="mb-2"></b-form-input>
        <b-button variant="info" class="btn-block" @click="adduser">Save</b-button>
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
<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand href="#">MEVN + Docker</b-navbar-brand>
      </div>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            Welcome
          </template>
          <b-dropdown-item href="#" @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <Nuxt />
  </div>
</template>
<script>
  const axios = require('axios');
  export default {
    middleware: 'auth',
      methods: {
          async logout() {
            this.$auth.logout();
            this.$router.push("/login")
          }
      }
  }
</script>
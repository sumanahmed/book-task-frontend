<template>
  <div>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto"> 
        <li class="nav-item dropdown">
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right mt-3">
            <a href="#" class="dropdown-item" @click.prevent="logout">
              <i class="fas fa-sign-out-alt mr-2"></i> Sign Out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import config from '@/config'
export default {
  name:'Navbar',   
  data () {
    return {
      loader: false,
      locale: 'en'
    }
  },
  computed : {
    authUser: function () {
      return this.$store.state.authUser
    }
  },
  methods:{
    logout(){ 
      this.$router.push('/auth/login');
      config.postData('/logout')
      localStorage.removeItem('accessToken') 
    }
  }
}
</script>
<template>
    <div class="login-box" style="margin:30px auto;">
      <div class="card">
        <div class="card-body login-card-body">
          <div class="login-logo"><img style="width: 120px;" :src="'../images/logo.jpg'"/></div>
          <b-overlay :show="loader">
            <p class="login-box-msg">Register Now</p>    
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(register)">  
                <ValidationProvider name="First Name" vid="firstName" v-slot="{errors}" rules="required">       
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" name="firstName" v-model="form.firstName" placeholder="First Name" required>
                    <div class="input-group-append">
                      <div class="input-group-text"><span class="fas fa-envelope"></span></div>
                    </div>
                     <!-- <span class="text-danger show-error" v-if="errors.firstName">{{ errors.firstName[0] }}</span>  -->
                    <span class="text-danger show-error">{{ errors[0] }}</span>  
                  </div>
                </ValidationProvider>
                <ValidationProvider name="Last Name" vid="lastName" v-slot="{errors}" rules="required">       
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" name="firstName" v-model="form.lastName" placeholder="First Name" required>
                    <div class="input-group-append">
                      <div class="input-group-text"><span class="fas fa-envelope"></span></div>
                    </div>
                     <!-- <span class="text-danger show-error" v-if="errors.firstName">{{ errors.firstName[0] }}</span>  -->
                    <span class="text-danger show-error">{{ errors[0] }}</span>  
                  </div>
                </ValidationProvider>
                <ValidationProvider name="Email Address" vid="email" v-slot="{errors}" rules="required">       
                  <div class="input-group mb-3">
                    <input type="email" class="form-control" name="firstName" v-model="form.email" placeholder="Email Address" required>
                    <div class="input-group-append">
                      <div class="input-group-text"><span class="fas fa-envelope"></span></div>
                    </div>
                    <span class="text-danger show-error">{{ errors[0] }}</span>  
                  </div>
                </ValidationProvider>
                <ValidationProvider name="Password" vid="password" v-slot="{errors}" rules="required"> 
                  <div class="input-group mb-3">
                    <input type="password" class="form-control" name="password" v-model="form.password" placeholder="Password" required>
                    <div class="input-group-append">
                      <div class="input-group-text"><span class="fas fa-lock"></span></div>
                    </div>
                    <span class="text-danger show-error" v-if="errors.password">{{ errors.password[0] }}</span>  
                  </div>
                </ValidationProvider>
                <div class="row pb-3">
                  <div class="col-8">
                    <div class="icheck-primary">
                      <input type="checkbox" id="remember" name="remember" value="1" >
                      <label for="remember">Remember Me</label>
                    </div>
                  </div>
                  <div class="col-4">
                    <button type="submit" @click.prevent="login" class="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>  
              </form>  
            </ValidationObserver> 
            <div class="row">
                <div class="col-6">
                 <router-link to="/auth/login">Login</router-link>
                </div>
              </div>
          </b-overlay>   
        </div>
      </div>
    </div>
</template>
<script>
import config from '@/config'
export default {
  name:'Register',
  data(){
    return{
      loader: false,
      menuLoading: false,
      form:{
        email:'',
        firstName:'',
        lastName:'',
        password:''
      },
      errors:[],
    }
  },
  methods:{
    async login(){
      this.loader = true
      const response = await config.postData("/register", this.form)
      this.loader = false  
      if(response.success){
        this.$toast.success({
          title: 'Success',
          message: 'Registration Successfully',
          color: '#218838'
        })
        this.$router.push('/auth/login')
      } else {
        this.$refs.form.setErrors(response.errors)
        this.$toast.error({
          title: 'Error',
          message: 'Sorry, Something went wrong',
          color: '#dc3545'
        })
      }
    }
    
  }
}
</script>
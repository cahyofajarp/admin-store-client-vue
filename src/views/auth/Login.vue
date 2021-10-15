<template>

  <div class="container p-5">
    <section class="section-register mb-5">
      <div class="container mt-3 mb-5">
        <div class="row">
          <div class="col-md-7 register-bg pr-3 mb-3">
              <div class="text-bg-resgiter">
                <h3>The Best Shoes In The World</h3>
                <p>Yeah, you not wrong choice ,now the best shoes are yours, with low prices and good quality let's buy now suitable for sports and play</p>
                <hr>
              </div>
          </div>
          <div class="col-md-5 pl-3">
            <div class="heading-sign">
              
              <h5 class="text-center mb-3"><b>Login Now.</b></h5>
              <!-- <div class="text-small  text-center mt-2 mb-3"><small >Shopee the best shoes in the world, <br>Now shoes the best in world in your hands.</small></div> -->
            </div>
            <div class="card pb-4" style="border-top:2px solid #ca1515;border-radius:1.5rem">
              <div class="text-center mt-3 mb-2"><h4> <b style="color:#ca1515;font-family: 'Cookie';font-size:45px">Shoesweet!</b></h4></div>
              <hr style="width:10%;border:2px solid #ca1515;margin:0 auto" class="mb-3">
              <div class="card-body">
                 <div v-if="validation.message" class="mt-2 alert alert-danger">
                    {{ validation.message }}
                </div>
                <div class="form">
                  <form @submit.prevent="login">
                     
                    <div class="form-group">
                      <label for="">Email</label>
                      <div class="small mb-2"><small>Email Active.</small></div>
                      <input type="text" name="" v-model="user.email" placeholder="Email" class="form-control">
                      <div v-if="validation.email" class="mt-2 alert alert-danger">
                          {{ validation.email[0] }}
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label for="">Password</label>
                      <input type="password" name="" v-model="user.password" placeholder="Password" class="form-control">
                      <div v-if="validation.password" class="mt-2 alert alert-danger">
                          {{ validation.password[0] }}
                      </div>
                    </div>

                    <div v-if="loader">
          
                      <button type="submit" class="btn-block btn mt-5 btn-login" style="background-color:#ca1515;color:white"> 
                          <i class="mdi mdi-send"></i> <b>Sign In</b>
                      </button>

                    </div>
                    <div v-else>
                      <button type="submit" class="btn-block btn mt-5 btn-login" style="background-color:#ca1515;color:white"> 
                          <i class="mdi mdi-spin mdi-loading"></i> Processcing ...
                      </button>
                    </div>
                  </form>
                </div>

                <div class="sign-in-text mt-5">
                  <p class="text-center">Don't have an account ? <router-link :to="{ name: 'register' }" class="text-primary">Sign Up !</router-link></p>
                </div>
                <!-- <div class="social-media">
                    <h3 class="text-center">Or with Social Media</h3>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive,ref,computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup(){

    const user = reactive({
        email : '',
        password : ''
    })
    const loader = ref(true);

    const validation = ref([]);
    
    const store = useStore();
    
    const router = useRouter();

    const getUser = computed(() => store.state.auth.userData);
    
    const  login = async  () =>{
      
      loader.value = false;
      // this.$swal('Hello word!')

      // let email = user.email;
      // let password = user.password; 
      
      await store.dispatch('auth/login',user)
      .then((response) => {
          router.replace({
            name : 'dashboard'
          });
          
          console.log(response);
          loader.value = true;
      })
      .catch((err) => {
          validation.value = err
          console.log(err);
          loader.value = true;
      })
    }

    return {
      user,
      login,
      validation,
      loader,
      getUser
    }
  }

}
</script>

<style lang="css" scoped>
hr{
  border:1px solid #ca1515;
  width: 13%;
}
.text-bg-resgiter h3{
  font-family: 'Cookie';
  color:white;
  font-size: 50px;
  text-align: center;
  margin-top:40%;
  
}
.text-bg-resgiter p{
  color:white;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.social-media h3{
  font-family: 'Cookie';
  margin-top:10%;
}
.register-bg{
    background-image: url("/img/autumn-wander-livefolk-feet.jpg");
    background-size: cover;
    width: 100%;
    height: 700px;
    background-position-x: 50%;
    border-radius: 1.5rem;
    background-repeat: no-repeat;
}
.btn-login:hover{
  background-color: red;
}
</style>
<template>

<div class="show-loading-email" style="width:40%;position:fixed;left:60%;z-index:99" v-if="loading.loading">
    <div class="alert alert-primary alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Loading ...</strong> Please wait we are sending email verification, Check your email after this.
        <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click=" messageWishlist.messageWishlistSuccess =''">
            <span aria-hidden="true">&times;</span>
        </button> -->
    </div>
</div>

<div class="show-loading-email" style="width:40%;position:fixed;left:60%;z-index:99" v-if="loading.success">
    <div class="alert alert-success alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Success!</strong> Yeay, Success sending email, please check your email now.
        <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click=" messageWishlist.messageWishlistSuccess =''">
            <span aria-hidden="true">&times;</span>
        </button> -->
    </div>
</div>

  <section class="section-verification p-4">
    
      <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        
                        <h5 class="mb-4" style="font-weight:bold">Verification Your Email Now!</h5>
                        <p>A fresh verification link has been sent to your email address.</p>
                        <p>Before proceeding, please check your email for a verification link.</p>
                        <p>If you did not receive the email</p>

                        <button class="btn btn-email mt-3" @click="sendEmail">Verify Now!</button>

                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="img-cart-empty mb-3" style="
                    position: relative;
                    width: 100%;
                    text-align: center;">
                    <img src="/img/empty-cart/3298067.jpg" alt="" style="width:80%;margin:0 auto">
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import Api from '@/api/Api';
import { reactive,onMounted,computed } from 'vue';
import {useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {

        const router = useRouter();
        const store  = useStore();
        
        const loading = reactive({
            success : false,
            loading : false,
        });

        const emailData = computed(() => store.state.auth.checkEmail);

        const getEmailCheck = onMounted(() => {
            store.dispatch('auth/checkEmailVerified')
            .then(() => {
                if(emailData.value == true){
                    router.push({name : 'dashboard'});
                }
            })            
        })

        const sendEmail = async () => {
            loading.loading = true;
            loading.success = false;
            const token = localStorage.getItem('token');
            if(!token){
                router.push({name : 'login'});
            }

            Api.defaults.headers.common['Authorization'] = 'Bearer '+token 
            
            await Api.post('/email/verification-notification')
            .then((response) => {
                loading.loading = false;
                loading.success = true;
                setTimeout(() => {
                    loading.success = false;
                },3000)
                console.log(response.data.message);
            })
            .catch((error) => {
                loading.loading = false;
                loading.success = false;
                console.log(error);
            })

        }

        return {
            loading,
            sendEmail,
            getEmailCheck
        }
    }
}
</script>

<style scoped>
.alert-primary {
    color: #ffe5e6;
    background-color: #bc343e;
    border-color: #b92f39;
}
h5{
    position:relative;
    display:block;
}
h5:before{content: '';
    position: absolute;
    background-color: #ca1515;
    width: 10%;
    height: 3px;
    bottom: 0;
    left: 0;
    top: 21px;
}
p{
    line-height: 15px;
}
.card{
    padding-top: 100px;
    border:0px dotted #ca1515;
}
.btn-email{
    font-size: 14px;
    color: #ffffff;
    background: #ca1515;
    font-weight: 600;
    border: none;
    text-transform: uppercase;
    display: inline-block;
    padding: 12px 40px;
    border-radius: 50px;
}
</style>
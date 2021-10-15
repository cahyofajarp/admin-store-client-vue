<template>

<NavbarComponent />
  <router-view />    
<FooterComponent />

</template>

<script>


import { useTimer } from 'vue-timer-hook';
import { watch,ref,onMounted } from 'vue';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';


import FooterComponent from '@/components/footer/FooterComponent';
import NavbarComponent from '@/components/navbar/NavbarComponent';

export default {
  name: 'App',
  components: {
    FooterComponent,
    NavbarComponent
  },
  setup(){
    
    const store = useStore();
    
    // const dataCountDown = reactive({
    //     start_flashsale : '',
    //     countDown       : 0,

    // })
    
    
    const inFlashsale = ref(false);

    const timer = ref(0);
    
    const getFlashsale = onMounted(async () => {
      
      inFlashsale.value = false;
      
      console.log('ss')

      await  store.dispatch('flashsale/getFlashsaleProduct')
      .then((response) => {
          console.log(response);
          if(response.data){
            
            inFlashsale.value = true;
            console.log(response);
            const time = new Date( response.data.flashsale_master.start_flashsale);
            
            time.setSeconds(time.getSeconds() + response.data.countDown); 
            // time.setSeconds(21600); // 10 minutes timer
            timer.value =  useTimer(time);
          }
          
          
      })
    })
    
    watch( async () => {
        if(timer.value.isExpired) {
            
            inFlashsale.value = false;
            // const token = store.state.auth.token;

            // await store.dispatch('auth/refreshToken',token)
            
            let flashsales = [];
            let title = '';
            let countDown = 0;
            
            store.commit('flashsale/GET_FLASHSALE',{flashsales,title,countDown});
            let flashsaleEmpty = {};

            store.commit('cart/FLASHSALE',flashsaleEmpty,{root:true});
            
            await store.dispatch('flashsale/deleteProductFlashsale');

            console.log('IsExpired')
        }
    })

    return {
      getFlashsale,
      // checkEmailVerified

    }
  }
}
</script>

<style>
.product__item__text .rating i{
    
    margin-right: 2px;
}
</style>

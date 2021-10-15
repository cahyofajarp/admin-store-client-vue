<template>
<section class="section-flashsale mt-5 mb-5" v-if="inFlashsale">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mb-5">
               <div class="float-left">
                    <h3 class="title-flashsale mb-3" style="font-weight:bold;#ca1515">Flashsale </h3>
                    <h6>{{ titleFlashsale }}</h6>
                    <hr style="width:50%;border:2px solid #ca1515;margin-left:0;">
               </div>
                <div class="countdown text-center">
                   <!-- <b> Timer :</b> <span>10</span><span>:</span><span>10</span> -->
                     <div>
                         <p>{{timer.isRunning ? 'Running' : 'Not running'}}</p>
                        Timer : <span>{{timer.days}}</span> <span>: </span> <span>{{timer.hours}}</span> <span>:</span> <span>{{timer.minutes}}</span> <span>:</span> <span>{{timer.seconds}}</span>
                    </div>
                    <!-- <div v-else>  
                        <p>Loading ... </p>
                    </div> -->
                </div>
            </div>
            <div class="col-lg-12 "  v-if="inFlashsale">
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6" v-for="(flashsale,index) in flashsales" :key="index">
                       <router-link :to="{ name : 'product_detail',params : { slug: flashsale.product.slug } }" style="color:black">
                            <div class="card card-product">
                                <div class="card-body card-border-bottom" style="padding: 0;">
                                    <div class="img-product-flashsale">
                                        
                                        <img :src="flashsale.product.productgallery_thumbnails != null ?  flashsale.product.productgallery_thumbnails.product_gallery.image  : '/img/imageonline-co-placeholder-image.png' " alt="" style="width:100%;border-radius:1rem">
                                        
                                        <ul class="product__hover__new">
                                            <li>
                                                <a href="image" class="image-popup">
                                                    <span class="arrow_expand"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="icon_heart_alt"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="icon_bag_alt"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="text-product" style="padding: 50px 10px 30px 10px">
                                        <div class="title-product text-center" style="font-size:14px;">
                                            {{ flashsale.product.title }}
                                        </div>
                                        <div class="rating text-center mb-3">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>  
                                        
                                        <div class="discount text-center mb-2" v-if="flashsale.discount != 0">
                                            <span style="text-decoration:line-through" class="text-muted">
                                                <small>Rp.{{  moneyFormat(flashsale.product.price )}}</small>
                                            </span>
                                            <span style="color:#ca1515;margin-left:10px" ><small>-{{ flashsale.discount }}%</small></span>
                                        </div>
                                        <div class="price-product text-center"> 
                                            <b> Rp.{{ moneyFormat(calculateDiscountCustom(flashsale.product.price,flashsale.discount))   }}</b> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>

import { onMounted,computed,watch, reactive,ref } from 'vue';
import { useStore } from 'vuex';
import { useTimer } from 'vue-timer-hook';

export default {
    setup() {
        const store = useStore();
        
        const inFlashsale = ref(false);

        const dataCountDown = reactive({
            start_flashsale : '',
            countDown       : 0,

        })

        const timer = ref(0);

        const getFlashsale = onMounted(async () => {
            
            inFlashsale.value = false;

            await  store.dispatch('flashsale/getFlashsaleProduct')
            .then((response) => {
                
            if(response.data){
                dataCountDown.start_flashsale = response.data.flashsale_master.start_flashsale;

                dataCountDown.countDown = response.data.countDown;
                
                const time = new Date(dataCountDown.start_flashsale);
                
                time.setSeconds(time.getSeconds() + dataCountDown.countDown); 
                // time.setSeconds(21600); // 10 minutes timer
                timer.value =  useTimer(time);
                
                inFlashsale.value = true;
                }
            })
        })
        
        const flashsales = computed(() => {
            return store.state.flashsale.flashsales;
        })

        const titleFlashsale = computed(() => {
            return store.state.flashsale.title;
        })

        
        watch( async () => {
            
            if(timer.value.isExpired) {
                
                inFlashsale.value = false;
                let flashsales = [];
                let title = '';
                let countDown = 0;

                store.commit('flashsale/GET_FLASHSALE',{flashsales,title,countDown});
                
                console.log('IsExpired')
            }
            else if(dataCountDown.countDown == 0){
                inFlashsale.value = false;
            }
        })

        return {
            getFlashsale,
            flashsales,
            titleFlashsale,
            timer,
            dataCountDown,
            inFlashsale,
            
            
        }
    }
}
</script>

<style scoped lang="css">
.section-flashsale .card .card-border-bottom::after{
    content: '';
    position: absolute;
    text-align: center;
    bottom: 0;
    left: 45%;
    background: #ca1515;
    width: 10%;
    height: 4px;
}
.card-product{
    border:0;
    cursor: pointer;
}
.img-product-flashsale .product__hover__new li:hover  a{
    transform: rotateZ(360deg);
    background:#ca1515 ;
    color:white;
}
.section-flashsale .card-product:hover .product__hover__new li{
    opacity: 1;
    top: -70px;
}
.img-product-flashsale .product__hover__new{
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
}
.img-product-flashsale .product__hover__new li {
    list-style: none;
    display: inline-block;
    margin-right: 10px;
    opacity: 0;
    position:relative;
    top:0px;
}
.img-product-flashsale .product__hover__new li:nth-child(1){
    -webkit-transition: all 0.4s ease 0.1s;
    -o-transition: all 0.4s ease 0.1s;
    transition: all 0.4s ease 0.1s;
}
.img-product-flashsale .product__hover__new li:nth-child(2){
    -webkit-transition: all 0.4s ease 0.15s;
    -o-transition: all 0.4s ease 0.15s;
    transition: all 0.4s ease 0.15s;
}
.img-product-flashsale .product__hover__new li:nth-child(3){
    -webkit-transition: all 0.4s ease 0.2s;
    -o-transition: all 0.4s ease 0.2s;
    transition: all 0.4s ease 0.2s;
}
.img-product-flashsale .product__hover__new li a {
    font-size: 18px;
    color: #111111;
    display: block;
    height: 45px;
    width: 45px;
    background: #ffffff;
    line-height: 48px;
    text-align: center;
    border-radius: 50%;
    -webkit-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}
.section-flashsale .card-product{
    border-radius: 0 0 1rem 1rem;
}
.section-flashsale .card-product .rating{
    font-size: 10px;
    color: #e3c01c;
}
.section-flashsale .card-product .img-product-flashsale{
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.countdown span{
    color: #ca1515;
    position: relative;
    font-weight: bold;
    left: 30px;
    font-size: 25px;
}
.section-flashsale .card-product {
    padding: 30px 0 0 30px  0;
}
</style>
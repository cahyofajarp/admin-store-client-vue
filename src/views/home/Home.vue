<template>
<section class="categories">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6 p-0">
                <div class="categories__item categories__large__item set-bg"
                data-setbg="img/categories/category-1.jpg" :style="{ backgroundImage: 'url('+bigCategory.image+')' }">
                <div class="opacity d-flex align-items-center">
                    <div class="categories__text" style="color:white">
                    <h1>{{ bigCategory.title_category }}</h1>
                    <p style="">{{ bigCategory.text_desc_category }}</p>
                    <a href="#">Shop now</a>
                </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 p-0" v-for="(categoryH,index) in showCategory" :key="index">
                    <div class="categories__item set-bg" data-setbg="img/categories/category-2.jpg" :style="{ backgroundImage:'url('+categoryH.image+')' }">
                        <div class="opacity d-flex align-items-center">
                            <div class="categories__text">
                                <h4>{{ categoryH.title_category }}</h4>
                                <p>358 items</p>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</section>
<!-- Categories Section End -->
<SliderComponent />
<ProductHomeComponent />


<!-- Banner Section Begin -->
<template v-if="productHightlight">
    <section v-if="productHightlight.image" class="banner set-bg banner-custom"  style="background-size:cover;" :style="{backgroundImage:'url('+productHightlight.image+')'}">
        <div class="opacity">
            <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row  text-center justify-content-center">
                        <div class="col-lg-6">
                            <div class="section-air-jordan text-center" style="padding-top:20%">
                                <h3 class="text-center text-white" style="position:relative">{{ productHightlight.title }}</h3>
                                <p class="text-center text-white" style="
                                margin-top: 32px;
                                font-size: 18px;line-height:1.5">
                                {{ productHightlight.description }}</p>

                                <router-link :to="{name : 'product_detail',params : { slug:productHightlight.product.slug }}" class="btn btn-custom-red mt-3"> <i class="mdi mdi-cart"></i> SHOP NOW</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>

<!-- Banner Section End -->

<!-- Discount Section Begin -->
<!-- <section class="discount mt-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 p-0">
                <div class="discount__pic">
                    <img src="img/discount.jpg" alt="">
                </div>
            </div>
            <div class="col-lg-6 p-0">
                <div class="discount__text">
                    <div class="discount__text__title">
                        <span>Discount</span>
                        <h2>Summer 2019</h2>
                        <h5><span>Sale</span> 50%</h5>
                    </div>
                    <div class="discount__countdown" id="countdown-time">
                        <div class="countdown__item">
                            <span>22</span>
                            <p>Days</p>
                        </div>
                        <div class="countdown__item">
                            <span>18</span>
                            <p>Hour</p>
                        </div>
                        <div class="countdown__item">
                            <span>46</span>
                            <p>Min</p>
                        </div>
                        <div class="countdown__item">
                            <span>05</span>
                            <p>Sec</p>
                        </div>
                    </div>
                    <a href="#">Shop now</a>
                </div>
            </div>
        </div>
    </div>
</section> -->
<!-- Discount Section End -->

<FlashsaleComponent />
<!-- Services Section Begin -->
<section class="services spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <i class="fa fa-car"></i>
                    <h6>Free Shipping</h6>
                    <p>For all oder over $99</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <i class="fa fa-money"></i>
                    <h6>Money Back Guarantee</h6>
                    <p>If good have Problems</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <i class="fa fa-support"></i>
                    <h6>Online Support 24/7</h6>
                    <p>Dedicated support</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <i class="fa fa-headphones"></i>
                    <h6>Payment Secure</h6>
                    <p>100% secure payment</p>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Services Section End -->
<InstagramComponent />
</template>

<script>
// import carousel from 'vue-owl-carousel'
import InstagramComponent from '@/components/socialmedia_gallery/InstagramComponent';
import SliderComponent from '@/components/slider/SliderComponent';
import ProductHomeComponent from '@/components/product-home/ProductHomeComponent';
import FlashsaleComponent from '@/components/flashsale/FlashsaleComponent';

import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default {
    components : {
        SliderComponent,
        ProductHomeComponent,
        InstagramComponent,
        FlashsaleComponent
        // carousel 
    },
    setup(){
        const store = useStore();

        const loadCategory = onMounted(() => {
            store.dispatch('home/getCategoryHome');
        })
        
        const loadProductHightlight = onMounted(() => {
            store.dispatch('productHome/getHighlightProduct');  
        })

        const showCategory = computed(() => store.state.home.categoryHomepage);
        
        const bigCategory = computed(() => store.state.home.bigCategory);
        
        const productHightlight = computed(() => store.state.productHome.productHightlight);
        
        return {
            loadCategory,
            showCategory,
            bigCategory,
            loadProductHightlight,
            productHightlight,
        }
    }
}
</script>

<style lang="css" scoped>
.categories__large__item .opacity .categories__text{
    padding-left: 70px !important;
}
.categories__item .opacity .categories__text{
    padding-left: 30px;
}
.categories__text h1,p,a{
    color:white;
}
.categories__text h4{
    color:white;
}
.categories__item{
    padding-left: 0 ;
}
.opacity{
    background-color: rgb(0 0 0 / 34%);
    width:100%;
    height:100%;
}
.banner-custom .section-air-jordan h3:after{
    
    content: '';
    width: 25%;
    bottom: -20px;
    left: 34%;
    position: absolute;
    height: 5px;
    background: #ca1515;
}
.btn-custom-red{
    background: #ca1515;
    color:white;
    padding:10px 60px;
    border-radius: 0;

}
.btn-custom-red:hover{
    background:white;
    color:#ca1515;
}
</style>
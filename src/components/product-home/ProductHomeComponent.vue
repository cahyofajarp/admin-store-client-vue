<template>
  
<section class="product spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4">
                <div class="section-title">
                    <h4>New product</h4>
                </div>
            </div>
            <!-- <div class="col-lg-8 col-md-8">
                <ul class="filter__controls">
                    <li class="active" data-filter="*">All</li>
                    <li data-filter=".women">Women’s</li>
                    <li data-filter=".men">Men’s</li>
                    <li data-filter=".kid">Kid’s</li>
                    <li data-filter=".accessories">Accessories</li>
                    <li data-filter=".cosmetic">Cosmetics</li>
                </ul>
            </div> -->
        </div>
        <div class="row property__gallery">
            <div class="col-lg-3 col-md-3 col-sm-6 mix accessories" v-for="(product,index) in productHome" :key="index">
                <router-link :to="{ name : 'product_detail',params :{slug: product.slug} }">
                    <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="" style="background-size:contain">
                        <div class="product-img">
                            <img style="
                            width: 100%;
                            height: 360px;
                            object-fit: contain;" 
                            :src="product.productgallery_thumbnails != null ?  product.productgallery_thumbnails.product_gallery.image  : '/img/imageonline-co-placeholder-image.png' " alt="">
                    
                        </div>
                         <div v-if="product.flashsale_products.length > 0">
                            <div class="label text-dark" v-if="product.flashsale_products[0].flashsale != null">
                                <span class="badge badge-danger" >Flashsale</span> <small style="color:#ca1515">-{{ product.flashsale_products[0].discount }}%</small>
                            </div>  
                            <div class="label text-dark" v-else-if="product.discount != 0">
                                <span class="badge badge-success">Discount</span> <small style="color:#ca1515">-{{ product.discount }}%</small>
                            </div>
                            
                            <div class="label text-dark" v-else>
                                <span class="badge badge-warning">New</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="label text-dark" v-if="product.discount != 0">
                                <span class="badge badge-success">Discount</span> <small style="color:#ca1515">-{{ product.discount }}%</small>
                            </div>
                    
                            <div class="label text-dark" v-else>
                                <span class="badge badge-warning">New</span>
                            </div>
                        </div>
                        
                        <ul class="product__hover">
                            <li><a href="image" class="image-popup"><span class="arrow_expand"></span></a></li>
                            <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                            <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6><a href="#">{{ product.title }}</a></h6>
                        <div class="rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>       
                        <!-- <div class="txt-discount float-right" v-if="product.discount != 0">
                            <small style="color:#ca1515">-{{ product.discount }}%</small>
                        </div> -->
                        <div v-if="product.flashsale_products.length > 0">
                            <div  class="txt-discount float-right" v-if="product.flashsale_products[0].flashsale != null">
                                <small style="color:#ca1515">-{{ product.flashsale_products[0].discount }}%</small>
                            </div>
                            
                            <div class="txt-discount float-right" v-else>
                                <small style="color:#ca1515" v-if="product.discount != 0">-{{ product.discount }}%</small>
                            </div>
                        </div>

                        <div v-if="product.flashsale_products.length > 0">
                            <div class="product__price" v-if="product.flashsale_products[0].flashsale != null"> 
                                Rp.{{ moneyFormat(calculateDiscountCustom(product.price,product.flashsale_products[0].discount))   }} 
                                <span >
                                    <small>Rp.{{ moneyFormat(product.price) }}</small>
                                </span> 
                            </div>
                        
                            <div class="product__price" v-else> 
                                Rp.{{ moneyFormat(calculateDiscount(product)) }} 
                                <span v-if="product.discount != 0">
                                    <small>Rp.{{ moneyFormat(product.price) }}</small>
                                </span> 
                            </div>
                        </div>
                        
                        <div class="product__price" v-else> 
                            Rp.{{ moneyFormat(calculateDiscount(product)) }} 
                            <span v-if="product.discount != 0">
                                <small>Rp.{{ moneyFormat(product.price) }}</small>
                            </span> 
                        </div>    
                    </div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</section>


</template>

<script>
import { useStore } from 'vuex';
import { onMounted,computed } from 'vue';

export default {
    setup(){
        
        const store = useStore();

        const getProductHome  = onMounted(() => {
            store.dispatch('productHome/getProductHome');  
        });

        const productHome = computed(() => store.state.productHome.productHome);
        
        return {
            getProductHome,
            productHome,
        }

    }
}
</script>

<style>

</style>
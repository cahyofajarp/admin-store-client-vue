<template>

<div class="show-error-wishlish" v-if="state.success" :style="[ state.success ? {'right': '0'} : {'right': '-32%'} ]">
    <div class="alert alert-success alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Success alert!</strong> Success deleted wishlist product.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div> 

<div class="show-error-wishlish" v-if="state.warning" :style="[ state.warning ? {'right': '0'} : {'right': '-32%'} ]">
    <div class="alert alert-warning alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Warning alert!</strong> Oops :( , You mush choose product to delete. 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div> 
<section class="section-wishlist mb-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-12" style="border-bottom:1px solid #e5e7e9">
                <div class="container">
                     <div class="navbar-wishlist mt-5">
                       <button class="btn px-4 py-2"> <i class="mdi mdi-heart" style="
                        font-size: 18px;"></i> Wishlist</button>
                       <!-- <button class="btn px-4 py-2">  Terakhir Dilihat</button> -->
                    </div>
                </div>
            </div>

            <div class="col-lg-12 mt-3">
                <div class="row mb-3">
                    <div class="col-lg-6">
                         <div class="alert alert-success" role="alert" style="background:transparent;border:0;font-size:15px">
                            <strong>Noted : </strong> Data semua wishlist anda bisa cari product favorite anda disini. 
                        </div>
                        <div class="search-bar-wishlist d-flex" style="width:80%;margin-left:18px">
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control" placeholder="Search Wishlist" style="outline:none" v-model="search_wishlist">
                                <div class="input-group-append">
                                    <button class="input-group-text btn-search px-4" id="basic-addon2" style="position:relative"></button>
                                </div>
                            </div>
                            <div class="button-delete ml-3" v-if="state.showButtonDelete && products.length > 0">
                                <button class="btn btn-danger" @click="deleteWishlistProduct"><i class="mdi mdi-delete"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <button @click="deleteWishlist" class="btn py-2 px-4 float-right btn-wishlist-delete" style="margin-top:13%"><i class="mdi mdi-heart" style="
                        font-size: 18px;"></i> Ubah Wishlist</button>
                    </div>
                </div>

                <div class="row mt-5" v-if="!state.loadingProducts && state.emptyProducts == false">
                    <div class="col-lg-2 col-md-4" v-for="(product,index) in products" :key="index" >
                        <div class="" style="position:relative">
                        <label :for="product.id" style="cursor:pointer">
                             <div class="edit-wishlist" :class="[!state.showButtonDelete ? 'd-none' : '']">
                            <div class="input-checkbox">
                                <input type="checkbox" :id="product.id" :name="product.slug" v-model="product_id" :value=" product.product_id">
                            </div>
                        </div>
                            <router-link :event="state.clickable ? 'click' : ''" :to="{ name : 'product_detail',params :{slug: product.product.slug} }">
                                <div class="product__item pb-3" style="border-top:1px dotted #e6e6e6;position:relative">
                                    
                                    <div class="product__item__pic set-bg" data-setbg="" style="background-size:contain">
                                        <div class="product-img">
                                            <img style="
                                            width: 100%;
                                            height: 360px;
                                            object-fit: contain;" 
                                            :src="product.product.productgallery_thumbnails != null ?  product.product.productgallery_thumbnails.product_gallery.image  : '/img/imageonline-co-placeholder-image.png' " alt="">
                                    
                                        </div>
                                    
                                    <div v-if="product.product.flashsale_products.length > 0">
                                        <div class="label text-dark" v-if="product.product.flashsale_products[0].flashsale != null">
                                            <span class="badge badge-danger" >Flashsale</span> <small style="color:#ca1515">-{{ product.product.flashsale_products[0].discount }}%</small>
                                        </div>  
                                        <div class="label text-dark" v-else-if="product.product.discount != 0">
                                            <span class="badge badge-success">Discount</span> <small style="color:#ca1515">-{{ product.product.discount }}%</small>
                                        </div>
                                        
                                        <div class="label text-dark" v-else>
                                            <span class="badge badge-warning">New</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="label text-dark" v-if="product.product.discount != 0">
                                            <span class="badge badge-success">Discount</span> <small style="color:#ca1515">-{{ product.product.discount }}%</small>
                                        </div>
                                
                                        <div class="label text-dark" v-else>
                                            <span class="badge badge-warning">New</span>
                                        </div>
                                    </div>

                                        <!-- <ul class="product__hover">
                                            <li><a href="image" class="image-popup"><span class="arrow_expand"></span></a></li>
                                            <li><a href="#" @click.prevent="addToWishlist(product)"><span class="icon_heart_alt"></span></a></li>
                                            <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                                        </ul> -->
                                    </div>
                                    <div class="product__item__text">
                                        <h6><a href="#">{{ product.product.title }}</a></h6>
                                        <div class="rating">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>

                                        <div v-if="product.product.flashsale_products.length > 0">
                                            <div  class="txt-discount float-right" v-if="product.product.flashsale_products[0].flashsale != null">
                                                <small style="color:#ca1515">-{{ product.product.flashsale_products[0].discount }}%</small>
                                            </div>
                                            
                                            <div class="txt-discount float-right" v-else>
                                                <small style="color:#ca1515" v-if="product.product.discount != 0">-{{ product.product.discount }}%</small>
                                            </div>
                                        </div>

                                        <div v-if="product.product.flashsale_products.length > 0">
                                            <div class="product__price" v-if="product.product.flashsale_products[0].flashsale != null"> 
                                                Rp.{{ moneyFormat(calculateDiscountCustom(product.product.price,product.product.flashsale_products[0].discount))   }} 
                                                <span >
                                                    <small>Rp.{{ moneyFormat(product.product.price) }}</small>
                                                </span> 
                                            </div>
                                        
                                            <div class="product__price" v-else> 
                                                Rp.{{ moneyFormat(calculateDiscount(product.product)) }} 
                                                <span v-if="product.product.discount != 0">
                                                    <small>Rp.{{ moneyFormat(product.product.price) }}</small>
                                                </span> 
                                            </div>
                                        </div>
                                        
                                        <div class="product__price" v-else> 
                                            Rp.{{ moneyFormat(calculateDiscount(product.product)) }} 
                                            <span v-if="product.product.discount != 0">
                                                <small>Rp.{{ moneyFormat(product.product.price) }}</small>
                                            </span> 
                                        </div>
                                        
                                    </div>
                                </div>
                            </router-link>
                        </label>
                       
                        </div>
                    </div>
                </div>

                <div class="row" v-if="state.loadingProducts">
                    <div class="col-lg-2 col-md-4 mb-2" v-for="(loading,index) in state.loadingShow" :key="index">
                        <div class="card card-custom d-flex justify-content-center align-items-center" style="width:110%">
                            <div class="text-center">
                                <!-- <span>Loading ...</span>  -->
                                <br>
                                <h2 class="mt-3" style="
                                font-family: Cookie;
                                color: rgb(202 21 21 / 15%);">
                                <b>Shoesweet</b></h2>
                            </div>
                        </div>
                    </div> 
                </div>

                <div class="row" v-if="state.emptyProducts">
                        <div class="col-md-12 mt-5">
                        <h4 class="text-center" style="color:#ababab">Oops, Tidak ada product wishlist yang tersedia :(</h4>
                        
                        <div class="d-flex justify-content-center">
                                <img src="/img/empty-cart/3369473.jpg" alt="" style="width:40%">
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>

import { useRouter } from 'vue-router';
import {useStore } from 'vuex';
import { onMounted,computed,ref,watch,reactive } from 'vue';

export default {
    
    setup(){
        const store = useStore();

        const router = useRouter();

        const search_wishlist = ref('');

        const product_id = ref([]);

        const state = reactive({
            loadingFilter       : true,
            loadingProducts     : false,
            showProducts        : false,
            loadingShow         : 6,
            emptyProducts       : false,
            showButtonDelete    : false,
            success             : false,
            warning             : false
        });

        const products = computed(() => store.state.wishlist.wishlists);
        
        const wishlist_data = computed(() => store.state.wishlist.wishlist_data);

        onMounted(() => {
            state.loadingProducts = true;
            store.dispatch('wishlist/getProductWishlist')
            .then((response) => {  
                console.log(response.data.wishlists);
                    state.loadingProducts = false;
                    if(response.data.wishlists.length > 0 || products.value.length > 0){
                        state.emptyProducts = false;
                        state.loadingProducts = false;
                    }else{
                        state.emptyProducts = true;
                        state.loadingProducts = false;

                    }
            })    
            
        })

        const deleteWatch = watch([product_id], async (newValues) => {
            console.log(newValues[0])
        });

         const searchWatch = watch([search_wishlist],  (newValues) => {

            if(wishlist_data.value.length > 0){
                state.loadingProducts = true;

                state.emptyProducts = false;
                state.delayKeyword = newValues[0].length;

                setTimeout(function() {
                    state.delayKeyword2 = newValues[0].length;

                    if(state.delayKeyword == state.delayKeyword2){
                        store.dispatch('wishlist/searchWishlist',newValues[0] + ' ')
                        .then((response) => {
                            state.loadingProducts = true;

                            if(response.data.wishlists.length > 0){
                                state.loadingProducts = false
                            }
                            else{
                                state.emptyProducts = true;
                                state.loadingProducts = false;
                            }
                        })
                    }
                },1000);
            }
        });

        const deleteWishlistProduct = async () => {
            
            const token = store.state.auth.token;

            if(!token){
                return router.push({name : 'login'});
            }

            // await store.dispatch('auth/refreshToken',token)
            
            if(product_id.value.length > 0){
                await store.dispatch('wishlist/deleteWishlist',product_id.value)
                .then((response) => {

                    state.showButtonDelete = false;
                    state.success = true;

                    if(response.data.wishlists.length == 0){
                        store.commit('wishlist/GET_WISHLISTS_DATA',[]);
                        state.emptyProducts = true;
                    }

                    setTimeout(function() {
                        state.success = false;
                    },3000)
                })

            }else{
                state.warning = true;

                setTimeout(function() {
                    state.warning = false;
                },3000)
            }
            
        }

        const deleteWishlist = () => {
            if(products.value.length > 0){
                if(state.loadingProducts == false){
                    state.showButtonDelete = !state.showButtonDelete;
                }
            }
        }

        return {
            products,
            searchWatch,
            search_wishlist,
            state,
            deleteWishlist,
            product_id,
            deleteWatch,
            deleteWishlistProduct,wishlist_data
        }
    }
}
</script>

<style lang="css">

.show-error-wishlish{
    width:30%;
    position: fixed;
    z-index: 99;
    right: -32%;
    transition: all 2s cubic-bezier(0.71, 0.72, 0, 1.02);

}
.section-wishlist  .edit-wishlist{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgb(171 159 159 / 56%);
}
.section-wishlist .edit-wishlist .input-checkbox{
    padding:10px;
}
.section-wishlist .btn-wishlist-delete{
    background: rgb(202, 21, 21);
    border-radius: 100px;
    color:white;
    transition:all 0.2s ease-in;
    outline:none;
    box-shadow:5px 4px 33px #00000057;
}
.section-wishlist .btn-wishlist-delete:hover{
    background: #bf1515;
}
.section-wishlist .navbar-wishlist button{
    color:rgb(202, 21, 21);
    font-weight: 500;
    position: relative;
}

.section-wishlist .navbar-wishlist button:before{
    content: '';
    position: absolute;
    height: 2px;
    bottom: 0;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
    width: 100%;
    left: 0;
    background-color: rgb(202, 21, 21);
}

.btn-search:after {
    content: '';
    background-size: 24px;
    background-image: url(https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/af2f34c3.svg);
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.card-custom{
    height: 400px;
    background: #fbfbfb;
    border: none;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 62px, #ddd 181px);
    background-size: 600px;
    -webkit-animation: shine-lines 1s infinite linear;
    animation: shine-lines 1s infinite linear;
}


</style>
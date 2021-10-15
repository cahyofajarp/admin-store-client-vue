<template>
 <!-- Page Preloder -->
    <div id="preloder">
        <div class="loader"></div>
    </div>
    <template v-if="showNav">
          
    <!-- Offcanvas Menu Begin -->
    <div class="offcanvas-menu-overlay " @click.prevent="closeCart" :class="[showRightCart.showAll == false && showRightCart.showBlank == true || showRightCart.showAll == true && showRightCart.showBlank == true ? 'active' : '']"></div>
    <!-- <div class="offcanvas-menu-wrapper">
        <div class="offcanvas__close">+</div>
        <ul class="offcanvas__widget">
            <li><span class="icon_search search-switch"></span></li>
            <li><a href="#"><span class="icon_heart_alt"></span>
                <div class="tip">2</div>
            </a></li>
            <li><a href="#"><span class="icon_bag_alt"></span>
                <div class="tip">2</div>
            </a></li>
        </ul>

        <div class="offcanvas__logo">
            <a href="" style="font-family:'Cookie'">Shoesweet</a>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div class="offcanvas__auth">
            <a href="#">Login</a>
            <router-link :to="{ name: 'register' }">Register</router-link>
        </div>
    </div> -->
    <!-- Offcanvas Menu End -->
    <section class="flashsale" v-if="getFlashsaleName != null">
        <div v-if=" getFlashsaleName.title">
            <div class="container">
            <div class="text-flashsale text-center">
                <h4 class="mb-2 text-white"><b>Flashsale</b> Alert!</h4>
                <p style="font-size:15px">{{ getFlashsaleName.title }}!</p>
            </div>
        </div>
        </div>
    </section>
    
    <section class="top-header">
       <div class="container">
            <div class="row">
            <div class="col-md-4 col-lg-3">
                <div class="header__logo" style="padding:0 ">
                        <router-link :to="{ name: 'home'}" style="font-family:'Cookie';color:#fff;margin-top: 18px;
                    font-weight: bold;font-size:45px" class="ml-3">Shoesweet.com</router-link>
                </div>
            </div>
            <div class="col-md-7 col-lg-7 text-center">
                <div class="form-search-data" :style="[showRightCart.showAll == false && showRightCart.showBlank != true || showRightCart.showAll == true && showRightCart.showBlank == true ? {  } : {'z-index':'99' }]">
                    <form action="" style="padding:20px 0 0px">
                    <div class="input-group mb-3 ">
                        <input type="text" class="form-control" @click="showSearch(search_navbar)" placeholder="Mau belanja sepatu apa ?" style="outline:none" v-model="search_navbar">
                        <div class="input-group-append">
                            <button class="input-group-text btn-search px-4" id="basic-addon2" style="position:relative;background-color:#fff"></button>
                        </div>
                    </div>
                    </form>

                    <div class="show-product-content" :class="[!state.showProductSearch ? 'd-none' : '']">
                        <div class="snippet" data-title=".dot-pulse" v-if="state.loader">
                            <div class="stage" style="
                            width: 10%;
                            position:absolute;
                            left:45%;
                            top:4%;
                            ">
                                <div class="dot-pulse"></div>
                            </div>
                        </div>
                        <template v-if="state.getData">
                            <div class="per-section">
                                <div class="header-category" style="
                                    background: #eef0f2;
                                    padding: 5px;">
                                    <h6 class="text-right  pr-2" style="font-size:12px">Popular Category</h6>
                                </div>
                                <div class="data-category">
                                    <ul class="list-unstyled text-left">
                                        <li v-for="(category,index) in categorySearch" :key="index">
                                            <a href="" @click.prevent="toCategory(category.slug)">{{ category.name }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="per-section">
                                <div class="header-category" style="
                                    background: #eef0f2;
                                    padding: 5px;">
                                    <h6 class="text-right  pr-2" style="font-size:12px">Popular Product</h6>
                                </div>
                                <div class="data-category">
                                    <ul class="list-unstyled text-left">
                                        <li v-for="(product,index) in productSearch" :key="index">
                                            <router-link @click="hideOverlay" :to="{name :'product_detail',params :{slug:product.slug}  }">{{ product.title }}</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>    

                        </template>
                        <template v-else-if="state.emptyProduct">
                            <div class="text-search">
                                <h5 style="font-size:15px;margin-top:5%;">Oops tidak ada produk dengan kata : <b>{{ search_navbar }}</b></h5>
                                <div class="img-cart-empty">
                                    <img src="/img/empty-cart/3298067.jpg" alt="" style="width:50%">
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="text-search">
                                <h5 style="font-size:14px;margin-top:5%">Sedang mencari ...</h5>
                            </div>
                        </template>
                    </div>
                </div>

            </div>
            <div class="col-md-2 col-lg-2">
                <div class="header__right mr-3">
                        <div class="header__right__auth" v-if="isLogin == ''">
                            <router-link :to="{ name: 'login' }">Login</router-link>
                            <router-link :to="{ name: 'register' }">Register</router-link>
                        </div>
                        <ul class="header__right__widget" v-if="isLogin !== ''">
                            <!-- <li><span class="icon_search search-switch"></span></li> -->
                            <li> 
                                <router-link :to="{ name :'wishlist'}">
                                <span class="icon_heart_alt"></span>
                                     <div class="tip">{{ wishlistCount ? wishlistCount : 0 }}</div>
                                </router-link>
                            </li>
                            <li>
                                <a href="#" @click.prevent="showCart"><span class="icon_cart_alt"></span>
                                    <div class="tip">{{ carts ? carts.length > 0 ? cartCount : 0 : 0 }}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>
       </div>
    </section>
    <!-- Header Section Begin -->
    <header class="header" style="position: sticky;
    top: 0;
    box-shadow: rgb(91 91 91 / 10%) 0px 13px 10px;
    z-index: 90;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-3 col-lg-2">
                    <div class="header__logo" style="padding:0;opacity:0" id="show-logo">
                        <router-link :to="{ name: 'home'}" style="font-family:'Cookie';color:#ca1515;margin-top: 18px;
                    font-weight: bold;" class="h1 ml-3">Shoesweet</router-link>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-7">
                    <nav class="header__menu ml-5">
                        <ul>
                            <li  :class="{active: $route.name==='home'}"> <router-link :to="{ name: 'home' }">Home</router-link></li>
                            <li  :class="{active: $route.name==='product'}"><router-link :to="{name : 'product'}">Products</router-link></li>
                            <li  :class="{active: $route.name==='flashsale'}"><router-link :to="{name : 'product'}">Flashsale</router-link></li>
                            <li><a href="./shop.html">All Brand</a></li> 
                            <li><a href="">All Category</a></li>
                    
                            <li  :class="{active: $route.name==='order'}"><router-link :to="{name : 'order'}"><i class="mdi mdi-cart"></i> Order</router-link></li>
                            <!-- <li>
                                <a href="#">Pages</a>
                                <ul class="dropdown">
                                    <li><a href="./product-details.html">Product Details</a></li>
                                    <li><a href="./shop-cart.html">Shop Cart</a></li>
                                    <li><a href="./checkout.html">Checkout</a></li>
                                    <li><a href="./blog-details.html">Blog Details</a></li>
                                </ul>
                            </li>
                          
                            <li><a href="./contact.html">Contact</a></li> -->
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-3">
                    <div class="header-right text-right" style="padding:27px 0 0px" v-if="isLogin !== ''">
                        <ul class="list-unstyled">
                            <li>
                             <router-link :to="{name : 'dashboard'}" style="
                            
                                font-size: 12px;
                                text-transform: uppercase;
                                color: #111111;
                                font-weight: 500;
                                padding: 2px 0;
                                position: relative;">
                                <span class="mdi mdi-account" style="font-size:18px;position:relative;top:1px"></span>
                               <span>Dashboard</span>
                            </router-link>
                        </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div class="canvas__open">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </header>
    <!-- Header Section End -->

    <section class="right-content float-right"   :class="[showRightCart.showAll == true && showRightCart.showBlank == true ? 'active' : '']" :style="[carts ? carts.length > 1 ? 'overflow-y:scroll' : '' : '']">
        <div class="container" >
            <div @click.prevent="closeCart" class="close-right-content float-right" style="cursor:pointer">
                <i class="mdi mdi-close"></i>
            </div>
            <div class="header-text text-center p-3" >
                <h4>Keranjang Belanja</h4>
                
            </div>
            <hr>
            <div class="cart-wrapper" v-if="carts ? carts.length > 0 : ''" id="contentCart" ref="contentCart">
                <div class="row">
                    <div class="col-md-12 mb-4" style="border-bottom:1px solid #f3f2f2" v-for="(cart,index) in carts" :key="index">
                        <div class="cart-item row">
                            <div class="col-md-5">
                                <div class="cart-img">
                                    <img :src="cart.product_gallery.image" alt="" style="border-radius: 1rem;">
                                </div>
                            </div>
                            <div class="col-md-7">
                                <div class="cart-content ">
                                    <div class="text-titile-product mb-2">
                                        <b>{{ cart.product.title }}</b>
                                    </div>
                                    <div class="uk-prouct mb-1">
                                        <small>{{ cart.size.sizes_name }}</small>
                                    </div>
                                    
                                    
                                    <div class="price-product mb-2 " style="color: #dc3545;font-weight: bold;" v-if="cart.product.flashsale_products.length > 0">
                                         <!-- <small>Rp.{{ moneyFormat(cart.product.price) }}</small> -->
                                        Rp.{{ moneyFormat(calculateDiscountCustom(cart.product.price,cart.product.flashsale_products[0].discount))   }}  
                                        <small  style="
                                            color: #b1b0b0;
                                            text-decoration: line-through;
                                            display: inline-block;" 
                                        ><span>Rp {{ moneyFormat(cart.product.price) }}</span></small>
                                    </div>

                                    <div class="price-product mb-2 " style="color: #dc3545;font-weight: bold;" v-else>
                                        Rp.{{ moneyFormat(calculateDiscount(cart.product))   }}  <small  v-if="cart.product.discount != 0" style="
                                            color: #b1b0b0;
                                            text-decoration: line-through;
                                            display: inline-block;" 
                                        ><span>Rp {{ moneyFormat(cart.product.price) }}</span></small>
                                    </div>

                                    <!-- <div  class="txt-discount float-right" v-if="cart.product.flashsale_products.length > 0">
                                        <small style="color:#ca1515">-{{ cart.product.flashsale_products[0].discount }}%</small>
                                    </div> -->

                                    <!-- <div class="txt-discount float-right" v-else>
                                        <small style="color:#ca1515" v-if="cart.product.discount != 0">-{{ cart.product.discount }}%</small>
                                    </div>

                                    <div class="product__price" v-if="cart.product.flashsale_products.length > 0"> Rp.{{ moneyFormat(calculateDiscountCustom(cart.product.price,product.flashsale_products[0].discount))   }} <span ><small>Rp.{{ moneyFormat(cart.product.price) }}</small></span> </div>
                                        <div class="product__price" v-else> Rp.{{ moneyFormat(calculateDiscount(cart.product)) }} <span v-if="cart.product.discount != 0"><small>Rp.{{ moneyFormat(cart.product.price) }}</small></span> </div> -->
                                    <!-- </div> -->


                                    <div class="color-product">
                                        <div class="color-border float-left" style="box-shadow:rgb(148 148 148) -1px -1px 25px 1px" :style="[{'background':cart.color.color_name}]"></div>
                                        <div class="text-color"><small>{{ cart.color.color_name }}</small></div>
                                    </div>
                                    <div class="quantity">
                                        <div class="pro-qty">
                                            <span class="dec qtybtn" @click="updateQtyCart(cart,'dec',cart.color_id)">-</span>
                                            <input type="text" :value="cart.qty" readonly>
                                            <span class="inc qtybtn" @click="updateQtyCart(cart,'inc',cart.color_id)">+</span>
                                        </div>
                                    </div>

                                    <div class="delete-button" @click.prevent="deleteCart(cart)"><a href="#">Hapus</a></div>
                                    <div class="loader-update-qty p-3" v-if="loader">Proscessing ...</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="total-price mb-4">
                          Total :  <b style="color:#dc3545">Rp.{{ moneyFormat(cartTotal) }}</b>
                        </div>
                        <button type="button" class="btn btn-danger btn-block" style="padding:10px"><b><i class="mdi mdi-money"></i> CHECKOUT NOW!</b></button>
                        <router-link :to="{ name : 'cart'}" @click="closeCart" class="btn btn-primary btn-block"  style="padding:10px;color:white;
                        background-color: #009688;
                        border-color: #06867a;"><i class="mdi mdi-cart"></i> SEE MY CART</router-link>
                    </div>
                </div>
            </div>

            <div class="img-content-empty-cart" v-else>
                <div class="img-cart-empty">
                    <img src="/img/empty-cart/3298067.jpg" alt="">
                </div>
                <div class="text-cart-empty">
                    <h5 class="mb-5">Oops Keranjang Kosong! :( </h5>
                    <router-link @click="closeCart" :to="{name : 'product'}" class="btn btn-danger btn-block" ref="MyID">SHOP NOW!</router-link>
                    <router-link :to="{ name : 'cart'}" @click="closeCart" class="btn btn-primary btn-block"  style="padding:10px;color:white;
                        background-color: #009688;
                        border-color: #06867a;"><i class="mdi mdi-cart"></i> SEE MY CART</router-link>
                </div>
            </div>
        </div>    
    </section>  

    </template>
</template>

<script>
import { computed,onMounted,ref,reactive,watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
// import Auth from '@/api/Auth';

export default {
   
    setup(){
        
        const store = useStore();

        const route = useRoute();
        
        const router = useRouter();

        const loader = ref(false);
        
        const showNav = ref(true);
        
        const search_navbar = ref('');
        
        const types = ref(null);

        const state = reactive({
            loader            : false,
            getData           : false,
            showProductSearch : false,
            emptyProduct      : false,
        });

        const isLogin = computed(() => {
            return store.state.auth.token;
        });

        const cartCount = computed(() => {
            return store.state.cart.cartCount;
        });

        const cartTotal = computed(() => {
            return store.state.cart.cartTotal;
        });

        const getFlashsaleName = computed(() => {
            return store.state.cart.flashsale
        });

        const showRightCart = computed(() => {
            return store.state.cart.show;
        });

        const product_gal = computed(() => {
            return store.state.cart.product_gallery;
        })

        const wishlistCount = computed(() => {
            return store.state.wishlist.wishlistCount;
        })

        const productSearch = computed(() => {
            return store.state.search.products;
        })
        const categorySearch = computed(() => {
            return store.state.search.categories;
        })

        const getAllCart = onMounted( async () => {
            const token = store.state.auth.token;

            if(token){
                await store.dispatch('cart/getAllCart');
            }
            
        })
        
        const getCartTotal = onMounted( async () => {
            
            const token = store.state.auth.token;
            
            if(token){
                await store.dispatch('cart/cartTotal');
            }
            
        })
        
        const carts = computed(() => {
            return store.state.cart.carts;
        })

        const hideOverlay = () => {
            
            closeCart();

            state.showProductSearch = false;

            let products = [];
            let categories = [];
            
            store.commit('search/GET_DATA',{ products,categories });

        }
        const toCategory = async (slug) => {
            hideOverlay();
            
            await store.dispatch('search/changeRoute',true);

            await router.push({ path: '/product', query: { category_product: slug } });
        }

        const watchSearch = watch([search_navbar],async  (newValues) => {
            showSearch(newValues[0]);
            
        })

        const showSearch = async (keyword) => {
            
            state.emptyProduct = false;
            
            let data = {
                showAll : false,
                showBlank : true
            };

            store.dispatch('cart/setShowCart',data);

            state.showProductSearch = false;
            let products = [];
            let categories = [];

            store.commit('search/GET_DATA',{products,categories});
            
            if(search_navbar.value.length > 0){
                state.loader = true;
                state.showProductSearch = true;
                state.getData = false;
                await store.dispatch('search/search',keyword)
                .then((response) => {

                    if(response){
                        state.loader = false;
                    }

                    if(response.data.products.length > 0 || response.data.categories.length > 0){
                        state.getData = true;
                        state.emptyProduct = false;
                    }else{
                        state.emptyProduct = true;
                        state.getData = false;
                    }
                })
            }
            
            
        }
        const checkEmail = computed(() => {
            return store.state.auth.checkEmail;
        });

        const checkEmailVerified = onMounted(async() => {

            await store.dispatch('auth/checkEmailVerified')
            .then(() => {
                console.log('success')
            })
            .catch((error) => {
                console.log(error);
                if(!checkEmail.value){
                    router.push({name : 'verification-email'});
                }   
            })


        })

        const getCartCount = onMounted( async () => {
            if(route.name == 'login' || route.name == 'register' || route.name== 'verification-email'){
                showNav.value = false;
            }

            const token = store.state.auth.token;

            if(token){
                await store.dispatch('cart/getCartCount');   
            }
        })

        const getWishlistCount = onMounted(async () => {
            const token = store.state.auth.token;

            if(token){
                await store.dispatch('wishlist/getProductWishlist');
            }
        })

        const showCart = () => {
            // showRightCart.value = true;
            let data = {
                    showAll : true,
                    showBlank : true
            }

            document.querySelector("body").style.overflow = "hidden";
            document.querySelector('.right-content').style.overflowY="auto";
            store.dispatch('cart/setShowCart',data)
        }

        //close cart
        const closeCart =   () => {
            document.querySelector("body").style.overflow = "auto";
            document.querySelector('.right-content').style.overflowY="hidden";
            state.showProductSearch = false;

            let data = {
                    showAll : false,
                    showBlank : false
            }

            store.dispatch('cart/setShowCart',data)
        }

        //delete cart
        const deleteCart = async (cart) => {
            
            let index = store.state.cart.carts.indexOf(cart);

            await store.state.cart.carts.splice(index,1);

            store.commit('cart/CART_COUNT',store.state.cart.carts.length);
            
            await store.dispatch('cart/deleteCartItem',cart.id);
            
            console.log(carts.value.length);
        }
        
        //update qty in cart
        const updateQtyCart = async (cart,type,color_id) => {

            loader.value = true;
            
            types.value = type;

            await store.dispatch('cart/updateQtyCart',{ cart,type,color_id })

            setTimeout(() => {
                loader.value = false;
            },1000);
        }

        // disabled navbar if page is login anda register dll
        const wacthRoute = watch(() => route.name,(routeData) => {

            showNav.value = true;

            if(routeData == 'login' || routeData == 'register' || route.name== 'verification-email'){
                showNav.value = false;
            }
            console.log(routeData);
        })

        // sticky navbar xixixi
        const sticky = onMounted(() => {
            let element = document.querySelector('.top-header');
            // console.log(window.getComputedStyle(element).height);
            window.addEventListener('scroll',()=>{
                if(window.scrollY >= parseInt(window.getComputedStyle(element).height)){
                    document.querySelector('#show-logo').style.opacity = '1';
                    document.querySelector('.header').style.padding = "8px";
                }
                else{
                    document.querySelector('#show-logo').style.opacity = '0';
                    document.querySelector('.header').style.padding = "0px";
                }
            });

        })

        return {
            sticky,
            showNav,
            isLogin,
            cartCount,
            getCartCount,
            showCart,
            showRightCart,
            closeCart,
            getAllCart,
            carts,
            deleteCart,
            updateQtyCart,
            loader,
            getCartTotal,
            cartTotal,
            types,
            product_gal,
            getFlashsaleName,
            wishlistCount,
            getWishlistCount,
            state,
            showSearch,
            search_navbar,
            wacthRoute,
            productSearch,
            categorySearch,
            hideOverlay,
            toCategory,
            watchSearch,
            checkEmailVerified
            
        }
    }
}
</script>

<style lang="css" scoped>
input {
 outline:none;
}

.header{
    transition : all 0.2s ease-in-out;

}

.show-product-content .data-category ul li{
    padding:5px 5px 5px 10px;
}
.show-product-content .data-category ul li a{
    color:black;
    font-size: 13px;  
    display: block;
}
.show-product-content .data-category ul li a:hover{
    color:#ca1515;
}

.form-search-data{
    position: relative;
}
.form-search-data .show-product-content{
    padding-bottom: 30px;
    width: 90%;
    top: 69px;
    z-index: 99;
    position: absolute;
    background: white;
}
.header__right .header__right__auth a{
    color:white;
    font-size:14px;
}
.header__right__widget li a .tip {
    background: #ffffff;
    color: #483c3c;
}

.header__right__widget li, .header__right__widget li a{
    color:white;
}
.top-header{
    background-color: #ca1515;
}
form{
    width: 90%;
    padding: 20px 0px 0px;
}
.input-group input:focus{
    outline:none;
}
.input-group input{
    border:none;
    border-radius: 0;
    padding:24px;
}
.btn-search{
    border:none;
    padding:24px;
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
.flashsale .container{
    padding: 30px;
}
.flashsale {
    background-color:rgb(187 23 23) ;
}
.flashsale .container .text-flashsale p{
    color:white;
}
.delete-button{
    
    margin-top: 13px;
    float: left;
    margin-left: 8px;
    font-size: 11px;
}
.delete-button a{
    color:#7d7d7d;
}
.promo-product{
    background-color: #3f51b5;
    width: 100%;
    padding: 1.5rem;
}
.promo-product .text-promo p{
    font-size: 20px;
    color:white;
    text-align: center;
}
.header__menu ul li a{
    font-size:12px;
}
.right-content{
    overflow-y:auto ;
    background: #fff;
    width: 450px;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 99;
    padding:1rem;
    position: fixed;
    transform:translateX(200%);
    transition :transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);
}
/* .cart-wrapper .cart-item .cart-img img{
    width: 80%;
} */

.right-content.active { 
    transform:translateX(0%);
    transition :transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);

}

.cart-wrapper .cart-item .color-product .color-border{
    
    width: 15px;
    height: 15px;
    background: black;
    border-radius: 100px;
}

.cart-wrapper .cart-item .color-product .text-color{
    position: relative;
    top: -5px;
    left: 4px;
}
.offcanvas-menu-overlay{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    content: "";
    z-index: 98;
     transition :transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);

    visibility: hidden;
}
.offcanvas-menu-overlay.active{
    visibility: visible;  transition :transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);

}
</style>
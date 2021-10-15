<template>
<div class="show-error-wishlish" v-if="messageCart.messageCartError != ''" :style="[ messageCart.messageCartError != '' ? {'right': '0'} : {'right': '-32%'} ]">
    <div class="alert alert-warning alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Warning alert!</strong> {{ messageCart.messageCartError }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="messageCart.messageCartError =''">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
    <!-- Breadcrumb Begin -->
    <div class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                        <!-- <a href="#">Women’s </a> -->
                        <span>{{ product.slug }} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End -->

    <!-- Lader change color -->
    <div class="loader-change-color bg-white" v-if="loaderChangeColor"><i class='mdi mdi-spin mdi-loading'></i> Tunggu ya ... </div> 
    <!-- Product Details Section Begin -->
    <section class="product-details spad">
        <div class="container">
            <div class="float-right alert-empty-stock" v-if="state.showProductDetail" :class="[empty_stock_alert ? 'active' : '']">
                <div class="alert alert-danger">
                    Product ini tidak tersedia silahkan check terlebih dahulu stock product.
                </div>
            </div>
            <div class="row"  v-if="state.showProductDetail">
                <div class="col-lg-6">
                    <div class="product__details__pic">
                        <div class="product__details__pic__left product__thumb nice-scroll">
                            <a @click.prevent="changeImage(product_gallery.image,index)" class="pt" :class="index == active ? 'active' : '' " href="" v-for="(product_gallery,index) in product_galleries" :key="index">
                                <img :src="product_gallery.image" alt="">
                            </a>
                        </div>
                        
                        <div class="product__details__slider__content" style="max-height:500px">
                            <div class="product__details__pic__slider" style="height:410px">
                                <img data-hash="product-1" class="product__big__img" :src="bigImage" alt="" style="width:100%;object-fit:contain;height:100%">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="product__details__text">
                        <h6 class="mb-3" v-if="state.showDataFlashsale" style="color:#ca1515">{{ product.flashsale_products[0].flashsale.title }}</h6>
                        <h3>{{ product.title }} <span>Brand: Spech Indonesia - Instagram : <a href="">@spech_indonesia</a></span></h3>
                        <div class="rating" style="margin-right:2px">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <span>( 138 reviews )</span>
                        </div>
                        <!-- <div class="" v-if="product.discount != 0">
                            <small style="color:#ca1515">Hemat {{ product.discount }}%</small>
                        </div> -->
                        <!-- <div class="product__details__price ">
                            Rp.{{ moneyFormat(calculateDiscount(product))   }} <span v-if="product.discount != 0">Rp {{ moneyFormat(product.price) }}</span> 
                        </div> -->
                                       
                        <div  class="" v-if="state.showDataFlashsale">
                            <small style="color:#ca1515">Hemat -{{ product.flashsale_products[0].discount }}%</small>
                        </div>

                        <div class="" v-else>
                            <small style="color:#ca1515" v-if="product.discount != 0">Hemat -{{ product.discount }}%</small>
                        </div>

                        <div class="product__details__price" v-if="state.showDataFlashsale"> Rp.{{ moneyFormat(calculateDiscountCustom(product.price,product.flashsale_products[0].discount))   }} <span ><small>Rp.{{ moneyFormat(product.price) }}</small></span> </div>
                        <div class="product__details__price" v-else> Rp.{{ moneyFormat(calculateDiscount(product)) }} <span v-if="product.discount != 0"><small>Rp.{{ moneyFormat(product.price) }}</small></span> </div>
                         
<!--                        
                        <p>Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret fugit, sed quia consequuntur
                        magni lores eos qui ratione voluptatem sequi nesciunt.</p> -->
                        <div class="product__details__button">
                            <div class="quantity">
                                <span>Quantity:</span>
                                <div class="pro-qty">
                                    <span class="dec qtybtn" @click="dataCart.qty > 1 ? dataCart.qty-- : ''">-</span>
                                    <input type="text" v-model="dataCart.qty">
                                    <span class="inc qtybtn" @click="dataCart.qty < 5 ? dataCart.qty++ : ''">+</span>
                                </div>
                                <div class="text-danger" v-if="dataCart.qty == 5">Quantity has been Max</div>
                            </div>
                            <a href="#" @click.prevent="addToCart(product)" class="cart-btn"><span class="icon_cart"></span> Add to cart</a>
                            <ul>
                                <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span class="icon_adjust-horiz"></span></a></li>
                            </ul>
                        </div>

                        <div class="loading-add-to-cart" v-if="loader">
                            <p class="" style="color:red"> <i class="mdi mdi-spin mdi-loading"></i> Tunggu ya kak, Sedang di proses!</p>
                        </div>
                        <div class="product__details__widget">
                            <ul>
                                <li>
                                    <span>Availability:</span>
                                    <div class="stock__checkbox">
                                        <label for="stockin" :style="[stock != null ? parseInt(stock.stock) == 0 ?  {'color': 'red','font-weight': 'bold'} : '' :  {'color': 'red','font-weight': 'bold'}]">
                                            {{ stock != null  ?  parseInt(stock.stock) == 0 ? 'Out of' : 'In' : 'Out of' }} Stock (<b>{{ stock != null ? stock.stock : 0 }} pcs</b>)
                                            <input type="checkbox" id="stockin" :checked="stock != null && parseInt(stock.stock) != 0" readonly disabled>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Available color: </span>
                                    <div class="color__checkbox">
                                        <label :for="color.color_name" v-for="(color,index) in colors" :key="index">
                                            
                                           <input type="radio" :value="color.id" v-model="dataCart.color_id" :id="color.color_name" :checked="color.id == dataCart.color_id ? true : false">
                                            <span @click="changeColorImage(color.id)" class="checkmark" style="box-shadow:-1px -1px 12px #949494" :style="[{ 'background' : color.color_name }]"></span>
                                            
                                        </label>
                                    </div>

                                </li>
                                <li class="mt-4">
                                    <span>Available size:</span>
                                    <div class="size__btn">

                                        <label :for="size.sizes_name" 
                                               @click="changeRadio(size.id)" 
                                               :class="[size.id == sizeActive ? 'active' : '']"
                                               v-for="(size,index) in product.sizes" 
                                               :key="index"  >

                                            <input  type="radio"
                                                :id="size.sizes_name" 
                                                :value="size.id" :checked="size.id == dataCart.size_id ? true : false"
                                                v-model="dataCart.size_id" 
                                                >
                                            {{size.sizes_name }} 
                                        </label>
                                    </div>
                                </li>
                                
                                <!-- <li>
                                    <span>Promotions:</span>
                                    <p>Free shipping</p>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="product__details__tab">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Specification</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews ( 2 )</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                <h6>Description</h6>
                                <div v-html="product.content "></div>
                            </div>
                            
                            <div class="tab-pane" id="tabs-2" role="tabpanel">
                                <h6>Specification</h6>
                                <p>test.</p>
                            </div>
                            <div class="tab-pane" id="tabs-3" role="tabpanel">
                                <h6>Reviews ( 2 )</h6>
                                <p>test</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
            <div class="row"  v-if="state.showProductDetail">
                <div class="col-lg-12 text-center">
                    <div class="related__title">
                        <h5>RELATED PRODUCTS</h5>
                    </div>
                </div>
                   <div class="col-lg-3 col-md-4 col-sm-6 mix accessories" v-for="(productR,index) in productRelated" :key="index">
                <router-link :to="{ name : 'product_detail',params :{slug: productR.slug} }">
                    <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="" style="background-size:contain">
                        <div class="product-img">
                            <img style="
                            width: 100%;
                            height: 360px;
                            object-fit: contain;" 
                            :src="productR.productgallery_thumbnails != null ?  productR.productgallery_thumbnails.product_gallery.image  : '/img/imageonline-co-placeholder-image.png' " alt="">
                    
                        </div>
                        <div class="label new">New </div>
                        <ul class="product__hover">
                            <li><a href="image" class="image-popup"><span class="arrow_expand"></span></a></li>
                            <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                            <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6><a href="#">{{ productR.title }}</a></h6>
                        <div class="rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div  class="txt-discount float-right" v-if="state.showDataFlashsale">
                            <small style="color:#ca1515">-{{ product.flashsale_products[0].discount }}%</small>
                        </div>

                        <div class="txt-discount float-right" v-else>
                            <small style="color:#ca1515" v-if="product.discount != 0">-{{ product.discount }}%</small>
                        </div>
                        
                        <div class="product__price" v-if="state.showDataFlashsale"> 
                            Rp.{{ moneyFormat(calculateDiscountCustom(product.price,product.flashsale_products[0].discount))   }} <span >
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
                </div>
                </router-link>
            </div>
            </div>


            <div class="row" v-if="!state.showProductDetail">
                <div class="col-lg-6">
                    <div class="product__details__pic">
                        <div class="product__details__pic__left product__thumb nice-scroll">
                            <a class="pt" >
                                <p alt="" class=" custom-text-loader" style="width:100%;padding:40px"></p>
                            </a> 
                             <a class="pt" >
                                <p alt="" class=" custom-text-loader" style="width:100%;padding:40px"></p>
                            </a> 
                             <a class="pt" >
                                <p alt="" class=" custom-text-loader" style="width:100%;padding:40px"></p>
                            </a> 
                             <a class="pt" >
                                <p alt="" class=" custom-text-loader" style="width:100%;padding:40px"></p>
                            </a> 
                        </div>
                        
                        <div class="product__details__slider__content">
                            <div class="product__details__pic__slider">
                                <!-- <img data-hash="product-1" class="product__big__img" :src="bigImage" alt=""> -->
                                <div class="custom-text-loader" style="max-height: 400px;height: 400px;width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="product__details__text">
                        <h3 class="custom-text-loader" style="padding:20px"></h3>
                        <div class="rating custom-sub-text-loader" style="margin-right:2px;width:30%">
                        </div>
                        <div class="custom-sub-text-loader" style="width:20%">
                            
                        </div>
                        <div class="product__details__price custom-text-loader mt-3" style="width:60%">

                        </div>
<!--                        
                        <p>Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret fugit, sed quia consequuntur
                        magni lores eos qui ratione voluptatem sequi nesciunt.</p> -->
                        <div class="product__details__button custom-text-loader" >
                           
                        </div>

                        <div class="product__details__widget">
                            <ul>
                                <li class="custom-sub-text-loader" style="width:70%">
                                    
                                </li>
                                <li class="custom-sub-text-loader" style="width:70%">
                                   

                                </li>
                                <li class="custom-sub-text-loader" style="width:70%">
                                   
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12  mt-5 mb-5" >
                   <div class="custom-text-loader mb-2" style="width:100%;padding:50px" >
                       
                   </div>
                   <div class="custom-text-loader" style="width:100%;padding:50px" >
                       
                   </div>
                </div>
            </div>
            <div class="row"  v-if="!state.showProductDetail">
                    <div class="col-lg-3 col-md-4 col-sm-6" v-for="(loading,index) in state.loadingShow" :key="index">
                    <div class="card card-custom d-flex justify-content-center align-items-center">
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

        </div>
    </section>
    <!-- Product Details Section End -->
  <InstagramComponent />
</template>

<script>
import InstagramComponent from '@/components/socialmedia_gallery/InstagramComponent';
import { onMounted,computed,ref,watch,reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute,useRouter } from 'vue-router';

export default {
    components : {
        InstagramComponent,
    },

    setup(){

        const store = useStore();

        const route = useRoute();
        
        const router = useRouter();
    
        const loader = ref(false);

        const showCartCom = ref(true);
        //qty product
        const qty = ref(1);
        
        //active 
        const active = ref(0);
        
        const dataCart = reactive({
            product_id: '',
            product_gallery : '',
            size_id: '',
            color_id: '',
            qty : 1,
            price : '',
            weight : ''

        });

        const messageCart = reactive({
            messageCartError:'',
        });

        const state = reactive({
            loadingShow:4,
            showProductDetail : false,
            showDataFlashsale : false,

        });
        
        const empty_stock_alert = ref(false);

        const sizeActive =  computed(() => {
            return store.state.productDetail.size;
        });

        const calculateDiscountAndFlashsale = (product) => {
            if(state.showDataFlashsale){
                return product.price - (product.price * (product.flashsale_products[0].discount) / 100);
            }
            else{
                return product.price - (product.price * (product.discount)/100)
            }
        }

        //detail_product
        const detail_product = onMounted(() => {
            
            window.scrollTo(0, 0)
            state.showProductDetail = false;
            store.dispatch('productDetail/getProductDetail',route.params.slug)
            .then((response) => {
                console.log(response);
                if(response.data.product.flashsale_products.length > 0){
                    if(response.data.product.flashsale_products[0].flashsale != null){
                        state.showDataFlashsale = true;
                    }
                }
                // console.log(calculateDiscountAndFlashsale(response.data.product));
                state.showProductDetail = true;
                dataCart.size_id = response.data.product.sizes[0].id;
                dataCart.color_id = parseInt(response.data.product.productgallery_thumbnails.color_id);
                dataCart.product_id = response.data.product.id;
                dataCart.price = calculateDiscountAndFlashsale(response.data.product)
                dataCart.weight = response.data.product.weight;
                dataCart.product_gallery = response.data.product.productgallery_thumbnails.product_gallery.id;
            });
        });
        
        const productRelated = computed(() => {
            return store.state.productDetail.related_product;
        })

        const product = computed(() => {
            return store.state.productDetail.product;
        });
 
        const bigImage = computed(() => {
            return store.state.productDetail.bigImage;
        });   
        const product_galleries = computed(() => {
            return store.state.productDetail.product_galleries;
        })
        const stock = computed(() => {
            return store.state.productDetail.stock;
        })

        const colors = computed(() => {
            return store.state.productDetail.colors;
        })

        const colorProduct = computed(() => {
            return store.state.productDetail.colorProduct;
        })

        const loaderChangeColor = computed(() => {
            return store.state.productDetail.loaderChangeColor;
        });
        
        const changeColorImage = (color_id) => {
            // console.log(color_id);
            let slug = route.params.slug;
            let size_id = dataCart.size_id;
            store.dispatch('productDetail/changeColorImage',{slug,color_id,size_id})
              .then(response => {
                dataCart.product_gallery = response.data.product_galleries[0].id;
            })
        }  
        
        const changeRadio =  (size) => {

            let slug = route.params.slug;
            let color_id = dataCart.color_id;
            // console.log(size);
            store.dispatch('productDetail/changeSize',{slug,color_id,size})
          
        }

         function changeImage(image,index){
             store.dispatch('productDetail/changeImage',image);
            active.value = index;
        }
        
        
        const data = reactive({
            showAll : false,
            showBlank : false
        })

        const addToCart =  ( async () => {

            loader.value = true;

            const token = store.state.auth.token;

            if(!token){
                return router.push({name : 'login'});
            }
            
        

            await store.dispatch('cart/addToCart',dataCart)
            .then((response) => {
                
                document.querySelector("body").style.overflow = "hidden";
                document.querySelector('.right-content').style.overflowY="auto";

                if(response.data.success == false){   

                    data.showAll = false;
                    data.showBlank =  true;
                    

                    store.dispatch('cart/setShowCart',data);
                    empty_stock_alert.value = true;

                    setTimeout(() => {
                    
                        data.showAll = false;
                        data.showBlank =  false;

                        store.dispatch('cart/setShowCart',data);
                        empty_stock_alert.value = false;
                    
                    },3000);
                    
                } else{
                    data.showAll = true;
                    data.showBlank =  true;
                    store.dispatch('cart/setShowCart',data);

                }

                loader.value = false;
            
            })
            .catch((error) => {
                loader.value = false;
                messageCart.messageCartError = error.message;
            })
        });

        watch(() => route.params.slug, async slug => {
            // console.log(slug);
            window.scrollTo(0, 0)
            
            state.showProductDetail = false;
            dataCart.qty = 1;
           if(slug){
            await store.dispatch('productDetail/getProductDetail',slug)
            .then((response) => {
                state.showProductDetail = true;
                dataCart.size_id = response.data.product.sizes[0].id;
                dataCart.color_id = parseInt(response.data.product.productgallery_thumbnails.color_id);
                dataCart.product_id = response.data.product.id;
                dataCart.price = calculateDiscountAndFlashsale(response.data.product)
                // dataCart.price = calculateDiscount(response.data.product)
                dataCart.weight = response.data.product.weight;
                dataCart.product_gallery = response.data.product.productgallery_thumbnails.product_gallery.id;
            });
           }
        })

       
        return {
            detail_product,
            product,
            bigImage,
            changeImage,
            active,
            qty,
            productRelated,
            addToCart,
            showCartCom,
            loader,
            stock,
            colors,
            colorProduct,
            changeColorImage,
            loaderChangeColor,
            changeRadio,
            sizeActive,
            dataCart,
            empty_stock_alert,
            product_galleries,
            state,
            messageCart
        }
    }
}
</script>

<style scoped>
.show-error-wishlish{
    width:30%;
    position: fixed;
    z-index: 99;
    right: -32%;
    transition: all 2s cubic-bezier(0.71, 0.72, 0, 1.02);

}
.alert-empty-stock{
    position: fixed;
    z-index: 100;
    left: 26%;
    top: 50%;
    transform:translateY(200%);
    visibility:hidden;
    transition :transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);

}
.alert-empty-stock.active{
     transform:translateY(-100%);
    visibility:visible;
    transition :transform .5s cubic-bezier(.645, .045, .355, 1),visibility .5s cubic-bezier(.645, .045, .355, 1),-webkit-transform .5s cubic-bezier(.645, .045, .355, 1);

}
.product__details__widget ul li .color__checkbox label input:checked~.checkmark:after{
    border-color: #a9a9a9;
}
.product__details__widget ul li .size__btn label.active{
    color: #ffffff;
    background: #ca1515;
}
.product__details__widget ul li .size__btn label{
    font-size: 14px;
    padding: 10px;
    border-radius: 4px;
    background: #e6e6e6;
    color: #666666;
    text-transform: uppercase;
    cursor: pointer;
    margin-right: 10px;
    display: inline-block;
    margin-bottom: 0;
}
.product__details__text .rating i{
    margin-right:2px;
}
.product__details__widget ul li .color__checkbox label{
    margin-right:27px;
}
.loader-change-color{
    position:fixed;
    left:40%;
    top:50%;
    background-color: white;
    z-index: 98;
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
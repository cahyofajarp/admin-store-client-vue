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
                        <span>Shopping cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End -->

    <!-- Shop Cart Section Begin -->
    <section class="shop-cart spad">
        <div class="container"  v-if="carts.length > 0">
            <div class="row">
                <div class="col-lg-12">
                    <div class="shop__cart__table">
                       <div class="table-responsive">
                            <table class="" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Weight</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cart,index) in carts" :key="index">
                                    <td class="cart__product__item">
                                        
                                        <img :src="cart.product_gallery.image" alt="" style="width: 26%;border-radius: 1rem;">
                                        <div class="cart__product__item__title">
                                            <h6 style="font-size:15px">{{ cart.product.title }}</h6>
                                           
                                        </div>
                                    </td>

                                    <td style="width:250px">
                                        {{ cart.weight }} (gram)
                                    </td>
                                    <td class="cart__price text-dark">
                                        
                                        <!-- Rp.{{ moneyFormat(calculateDiscount(cart.product)) }} 
                                        <div class="" v-if="cart.product.discount != 0">
                                            <small class="" style="color:#ca1515">Discount -{{ cart.product.discount }}%</small>
                                        </div> -->
                                         <div v-if="cart.product.flashsale_products.length > 0">
                                            <div  class="txt-discount" v-if="cart.product.flashsale_products[0].flashsale != null">
                                                <small style="color:#ca1515" class="blink_me">Flashsale -{{ cart.product.flashsale_products[0].discount }}%</small>
                                            </div>
                                            
                                            <div class="txt-discount " v-else>
                                                <small style="color:#ca1515" class="blink_me" v-if="cart.product.discount != 0">Discount -{{ cart.product.discount }}%</small>
                                            </div>
                                        </div>
                                        
                                        <div class="txt-discount " v-else>
                                            <small style="color:#ca1515" class="blink_me" v-if="cart.product.discount != 0">Discount -{{ cart.product.discount }}%</small>
                                        </div>

                                        <div v-if="cart.product.flashsale_products.length > 0">
                                            <div class="product__price" v-if="cart.product.flashsale_products[0].flashsale != null"> 
                                                Rp.{{ moneyFormat(calculateDiscountCustom(cart.product.price,cart.product.flashsale_products[0].discount))   }} 
                                                <span >
                                                    <small style=" text-decoration: line-through;">Rp.{{ moneyFormat(cart.product.price) }}</small>
                                                </span> 
                                            </div>
                                        
                                            <div class="product__price" v-else> 
                                                Rp.{{ moneyFormat(calculateDiscount(cart.product)) }} 
                                                <span v-if="cart.product.discount != 0">
                                                    <small style=" text-decoration: line-through;">Rp.{{ moneyFormat(cart.product.price) }}</small>
                                                </span> 
                                            </div>
                                        </div>
                                    
                                        <div class="product__price" v-else> 
                                            Rp.{{ moneyFormat(calculateDiscount(cart.product)) }} 
                                            <span v-if="cart.product.discount != 0">
                                                <small style=" text-decoration: line-through;">Rp.{{ moneyFormat(cart.product.price) }}</small>
                                            </span> 
                                        </div>
                                   

                                    </td>
                                    <td class="cart__quantity">
                                        <div class="pro-qty">
                                            <input type="text" :value="cart.qty">
                                        </div>
                                    </td>
                                    <td class="cart__total">Rp.{{ moneyFormat(cart.price) }}</td>
                                    <td class="cart__close"><span class="icon_close" @click="deleteCart(cart)"></span></td>
                                </tr>
                            </tbody>
                        </table>
                       </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="cart__btn">
                        <router-link :to="{name : 'product'}"> <i class="mdi mdi-cart"></i> Continue Shopping</router-link>
                    </div>
                </div>
            </div>
            
            <div class="row mb-5">
                <div class="col-md-7">
                    <div class="address_customer">
                        <div class="card card-custom-cart">
                            <div class="card-body">
                                <!-- <h4 style="color:#ca1515;font-weight:100;border-bottom">Data Customer Checkout </h4> -->
                                <form action="" class="mt-5">
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <label for="" class="label-form">Nama Lengkap : </label>
                                                <input type="text" class="form-control" placeholder="Nama Lengkap" v-model="state.name">
                                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                                    Masukkan Nama Lengkap
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <label for="" class="label-form">No WA / No Telp : </label>
                                                <input type="text" class="form-control" placeholder="No WA / No Telp" v-model="state.phone">
                                                <div v-if="validation.phone" class="mt-2 alert alert-danger">
                                                    Masukkan No Telp / WA
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <div class="form-group">
                                                <label for="" class="label-form">Provinsi : </label>
                                                <select name="" id="" class="form-control" @change="getCities" v-model="state.province_id">
                                                    <option value="">-- Pilih Provinsi -- </option>
                                                    <option :value="province.province_id" v-for="(province,index) in state.provinces" :key="index">{{ province.name }}</option>
                                                </select>
                                            </div>
                                        </div>

                                         <div class="col-md-12 mb-2">
                                            <div class="form-group">
                                                <label for="" class="label-form">Kota / Kabutapen : </label>
                                                <select name="" id="" class="form-control" @change="getCourier" v-model="state.city_id">
                                                    <option value="">-- Pilih Kabupaten / Kota --</option>
                                                    <option :value="city.city_id" v-for="(city,index) in state.cities" :key="index">{{ city.name }}</option>
                                                </select>
                                            </div>
                                        </div> 
                                          
                                        <div class="col-md-12 mb-2">
                                            <div class="form-group" v-if="state.courier">
                                               <div class="product__details__widget">
                                                    <ul>
                                                        <li>
                                                            <span>Kurir Pengiriman :</span>
                                                            <div class="color__checkbox">
                                                               <label for="" class="pl-3 ">
                                                                    JNE
                                                                <label for="jne">
                                                                    <input type="radio" value="jne" v-model="state.courier_type" name="courier" id="jne" @change="getOngkir" :checked="state.checkedStatus">
                                                                    <span class="checkmark"></span> 
                                                                </label>
                                                               </label>
                                                                <label class="pl-3 ">
                                                                        TIKI
                                                                    <label for="tiki">
                                                                        <input type="radio" value="tiki" v-model="state.courier_type" name="courier" id="tiki" @change="getOngkir" :checked="state.checkedStatus">
                                                                        <span class="checkmark"></span> 
                                                                    </label>
                                                                </label>
                                                               <label for="" class="pl-3 ">
                                                                    POS
                                                                <label for="pos">
                                                                    <input type="radio" value="pos" v-model="state.courier_type" name="courier" id="pos" @change="getOngkir" :checked="state.checkedStatus" >
                                                                    <span class="checkmark"></span> 
                                                                </label>
                                                               </label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12 mb-2">
                                            
                                             <p v-if="state.showCost">Loading ... </p>
                                            <div class="form-group" v-if="state.cost">
                                               <div class="product__details__widget">
                                                    <ul>
                                                        <li v-if="!state.showCost">
                                                            <span class="d-block">Service Kurir :</span><br>
                                                            <div class="color__checkbox mt-3">
                                                               <label v-for="(value,index) in state.costs" :key="index" class="pl-3 d-block" style="font-size:14px">
                                                                    
                                                                    <label :for="value.service" class="mr-3 pl-2" @change="getCostService">
                                                                        <input type="radio" name="cost" :value="value.cost[0].value+'|'+value.service" :id="value.service" v-model="state.costService">
                                                                        <span class="checkmark"></span> 
                                                                    </label>
                                                                    {{ value.service }} - Rp. {{ moneyFormat(value.cost[0].value) }}
                                                               </label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <div class="form-group" style="
                                                border-top: 1px solid #ebebeb;
                                                padding-top: 35px;">
                                                <label for="" class="label-form">Alamat Lengkap : </label>
                                                <textarea name="" class="form-control" style="height:150px" placeholder="Alamat Lengkap : &#10;&#10;&#10;&#10;Contoh: Perum. Griya Palem Indah, B-17 Jombang Jawa Timur 61419" v-model="state.address"></textarea>
                                                <div v-if="validation.address   " class="mt-2 alert alert-danger">
                                                    Masukkan Alamat
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-md-5">
                    <div class="cart__total__procced mt-5">
                        <h6>Cart total </h6>
                        <ul>
                            <li>Total Cart 
                             <span>Rp.{{ moneyFormat(cartTotal) }}</span></li>
                             <li>Berat Total <span>{{ weightTotal }} (gram) </span></li>
                             <li>Kurir <span>{{ courier_type }}</span></li>
                             <li>Kurir Service <span> {{ cost_service }}</span></li>
                             <li>Ongkos Kirim  <span>Rp.{{ moneyFormat(courier_cost) }}</span></li>
                             <li><hr></li>
                             <li v-if="state.loadingGrandTotal"> <small>Loading ...</small> </li>
                            <li>Grand Total <span>Rp.{{ moneyFormat(state.grandTotal) }}</span></li>
                        </ul>
                        <a href="#" class="primary-btn" @click.prevent="checkout">Proceed to checkout</a>
                    </div>
                </div>
            </div>

            <!-- <div class="row">
                <div class="col-lg-6">
                    <div class="discount__content">
                        <h6>Discount codes</h6>
                        <form action="#">
                            <input type="text" placeholder="Enter your coupon code">
                            <button type="submit" class="site-btn">Apply</button>
                        </form>
                    </div>
                </div>
            </div> -->

        </div>

        <div class="container" v-else>
            <h4 class="mb-5 text-center" style="color:#ca1515;font-weight:bold">Oops Keranjang Kosong! :( </h4>
            <div class="img-content-empty-cart">
                <div class="img-cart-empty d-flex justify-content-center">
                    <img src="/img/empty-cart/3298067.jpg" alt="" style="width:40%">
                </div>
                <div class="text-cart-empty d-flex mt-5">
                    <router-link @click="closeCart" :to="{name : 'product'}" class="btn btn-danger" ref="MyID" style="margin:0 auto;width:37%">SHOP NOW!</router-link>
                </div>
            </div>
        </div>
    </section>
    <!-- Shop Cart Section End -->
  <InstagramComponent />
</template>

<script>
import  { onMounted,computed,reactive } from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import InstagramComponent from '@/components/socialmedia_gallery/InstagramComponent';
import Api from '@/api/Api';

export default {
    components : {
        InstagramComponent
    },

    setup() {
        const store = useStore();
        
        const router = useRouter();
        const messageCart = reactive({
            messageCartError:'',
        });
        const state = reactive({
            name            : '',
            phone           : '',
            address         : '',
            
            provinces       : [],
            province_id     : '',
            
            cities          : [],
            city_id         : '',

            courier         : false, 
            courier_type    : '', 

            cost            : false,  
            costs           : '', 
            costService     : '', 
            
            courier_cost    : 0,
            courier_service : '',
            grandTotal      : 0,

            checkedStatus   : false,
            showCost        : false,
            loadingGrandTotal : false,

        });

        const getAllCart = onMounted(  async () => {
            
            // const token = store.state.auth.token;

            //  await store.dispatch('auth/refreshToken',token)
        
             await store.dispatch('cart/getTotalWeight');

             await store.dispatch('cart/getAllCart');

            
        })
        
        const provinces = onMounted(async () => {
            await Api.get('/rajaongkir/province')
            .then(response => {
                state.provinces = response.data.data;
                // console.log(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
        })
        const cartTotal = computed(() => {
            return store.state.cart.cartTotal;
        });

        const getTotalCart = onMounted( async () => {
            await store.dispatch('cart/cartTotal');
        });
        
        const carts = computed(() => {
            return store.state.cart.carts;
        })

        const deleteCart = (async (cart) => {
            let index = store.state.cart.carts.indexOf(cart);

            await store.state.cart.carts.splice(index,1);
            
            store.commit('cart/CART_COUNT',store.state.cart.carts.length);

            // const token = store.state.auth.token;
            
            // await store.dispatch('auth/refreshToken',token)
            
            state.loadingGrandTotal = true;
            
            await store.dispatch('cart/deleteCartItem',cart.id)
            .then((response) => {
                state.loadingGrandTotal = false;

                if(courier_cost.value){
                    state.grandTotal = parseInt(response.data.total) + parseInt(courier_cost.value);
                }
                if(carts.value.length == 0){
                    state.grandTotal = 0;
                }
            })
        });

        const weightTotal = computed(() => {
            return store.state.cart.totalWeight;
        })

        const cost_service = computed(() => {
            let shipping = state.costService.split('|');

            return shipping[1];
        }); 
        
        const courier_cost = computed(() => {
            let shipping = state.costService.split('|');

            return shipping[0];
        });
        
        const courier_type = computed(() => {
            return state.courier_type.toUpperCase();
        });


        const clear = () => {
            state.courier       = false ;
            state.cost          = false ;
            state.courier_type  = '';
            state.costService   = '';
            state.checkedStatus = false;
            state.grandTotal    = 0;
            
        }

        const getCities = () => {

            clear();
            
            Api.get('/rajaongkir/cities',{
               params : {
                    province_id : state.province_id
               }
            })
            .then((response) => {
                state.cities = response.data.data;
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        
        const getOngkir =  () => {
            state.grandTotal    = 0;
            state.showCost = true;
            state.costService = '';
            // console.log(state.city_id,weightTotal.value,state.courier_type);
             Api.post('/rajaongkir/check-ongkir',{
                city_destination : state.city_id,
                weight           : weightTotal.value,
                courier          : state.courier_type
            })
            .then((response) => {
                console.log(response);
                state.cost = true;
                state.costs = response.data.data[0].costs
                state.showCost = false;
            })
            .catch((err) => {
                console.log(err);
            })
        }

        const getCourier = () => {
            clear();
            state.courier       = true;
        }
        
        const getCostService = async () => {
            state.loadingGrandTotal = true;
            let shipping = state.costService.split('|');

            state.courier_cost = shipping[0];
            state.courier_service = shipping[1];


            // const token = store.state.auth.token;
            
            // await store.dispatch('auth/refreshToken',token)
            
            // const new_token = store.state.auth.token;
            
            // Api.defaults.headers.common['Authorization'] = "Bearer" +new_token
            
            await Api.get('/cart/price')
            .then((response) => {
                state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost);
                state.loadingGrandTotal = false;
            })
        }  
           //define state validation
        const validation = reactive({
            name:       false, // <-- validation name
            phone:      false, // <-- validation phone
            address:    false  // <-- validation address 
        })

        const checkout = async () => {
            
            validation.name = !state.name ? true : false;
           
            validation.phone = !state.phone ? true : false;
           
            validation.address = !state.address ? true : false;

            
            // const token = store.state.auth.token;
            
            // await store.dispatch('auth/refreshToken',token)
            
            // const new_token = store.state.auth.token;
            
            // Api.defaults.headers.common['Authorization'] = "Bearer" +new_token

                
            if(state.name && state.phone && state.address && weightTotal.value){
              

                let data = {
                    name            : state.name,
                    phone           : state.phone,
                    province        : state.province_id,
                    city            : state.city_id,
                    courier         : state.courier_type,
                    cost            : state.courier_cost,
                    service         : state.courier_service,
                    weight          : weightTotal.value,
                    address         : state.address,
                    grand_total     : state.grandTotal
                }

                await store.dispatch('cart/checkout',data)
                .then((response) => {
                    router.push({
                        name   : 'order_detail',
                        params : {
                            snap_token : response.data[0].snap_token
                        } 
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
            }

           
        }

        return {
            carts,
            getAllCart,
            getTotalCart,
            deleteCart,
            cartTotal,
            state,
            provinces,
            getCities,
            getOngkir,
            getCourier,
            weightTotal,
            getCostService,
            cost_service,
            courier_type,
            courier_cost,
            validation,
            checkout,
            messageCart
            
        }
    }
}
</script>

<style scoped>
.card-custom-cart {
    border:none;
}
.address_customer .card-custom-cart .form-group .label-form{
    font-size: 14px;
    font-weight: 600;
    color: #111111;
}

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
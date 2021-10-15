<template>
   <!-- Breadcrumb Begin -->
    <div class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <router-link :to="{name :'home'}"><i class="fa fa-home"></i> Home</router-link>
                        <span>Order</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End -->
    
    <!-- Shop Section Begin -->
    <section class="shop spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-12">
                   <div class="sidebar__categories" v-if="!orderShow">
                            <div class="section-title">
                                <h4 class="mb-3">Start Menu</h4><br>
                                <small class="text-muted">Data Order</small>
                            </div>
                            <div class="categories__accordion">
                                <div class="accordion" id="accordionExample">
                                    <div class="card"  >
                                        <div class="card-heading">
                                            <router-link :to="{name : 'home'}">
                                                Home
                                            </router-link> 
                                        </div>
                                    </div>
                                     <div class="card"  >
                                        <div class="card-heading">
                                            <router-link :to="{name : 'order'}">
                                                All Orders
                                            </router-link> 
                                        </div>
                                    </div>
                                     <div class="card"  >
                                        <div class="card-heading">
                                            <router-link :to="{name : 'cart'}">
                                                Cart
                                            </router-link> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <!-- Loading categories__accordion -->
                    <div class="sidebar__categories" v-if="orderShow">
                        <div class="section-title">
                            <p class="custom-text-loader" style="width:30%"></p>
                            <p class="custom-text-loader" style="width:20%"></p>
                        </div>
                        
                            <div class="categories__accordion">
                                <div class="accordion" id="accordionExample">
                                    <div class="card"  style="border-bottom:0 !important;width:100%;">
                                        <div class="card-heading custom-text-loader">
                                        </div>
                                    </div>
                                        <div class="card"  style="border-bottom:0 !important;width:100%">
                                        <div class="card-heading custom-text-loader">
                                        </div>
                                    </div>
                                        <div class="card"  style="border-bottom:0 !important;width:100%">
                                        <div class="card-heading custom-text-loader">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                
                <div class="col-lg-9 col-md-9">
                   <div v-if="!orderShow">
                        <div class="card-header p-4" style="border:none;background-color:#ececec">
                        <span style="font-size:15px;padding-right:10px"><i class="mdi mdi-cart"></i> Belanja pada tanggal : {{ order.order_date  }}</span>
                        <span class="status_order_data badge badge-warning" >{{ order.status }}</span>
                        <span style="font-size:15px;padding-left:10px" class="order_code">INVOICE : <b>{{ order.invoice }}</b></span>
                        <div class="mt-4">
                            <button  class="btn btn-danger px-4 py-2" style="border-radius:100px;font-size:15px" @click="payment(order.snap_token)"> BAYAR SEKARANG</button>
                        </div>
                    </div>
                   <div class="card" style="border:none">
                           <div class="order_data mb-2 p-3 float-left card-body ">
                               
                               <div class="order_data_product row " style="border-top:1px solid #f2f2f2 !important" v-for="(product,index) in productInOrder" :key="index">
                                   <div class="order_img col-md-5 mt-4 mb-3">
                                      <div class="d-flex justify-content-center">
                                           <img :src="product.product_gallery.image" alt="" style="margin:0 auto;width:60%;border-radius: 1rem">
                                      </div>
                                   </div>
                                    <div class="col-md-7 mt-4 mb-3">
                                        <div class="order_product_price mt-2" style="margin-left:0%">
                                            <div class="order_product_name mb-3">
                                                <h5 class="mb-2"><b>{{ product.product.title }} </b></h5>
                                                <small style="color#ca1515">Brand : <a href="">@spech_indonesia</a></small>
                                            </div>
                                            <!-- <h6 class="price_list_order mb-3">Price : <b class="" style="color:#ca1515;">Rp.{{ moneyFormat(product.product.price) }}</b></h6> -->
                        
                                            <table style="width:100%">
                                                <tr style="padding:100px">
                                                    <th>Price</th>
                                                    <td></td>
                                                    <td>
                                                         <div class="txt-discount" v-if="product.product.discount != 0">
                                                            <small style="color:#ca1515"> -{{ product.product.discount }}%</small>
                                                        </div>
                                                        <b  style="color:#ca1515">Rp.{{ moneyFormat(calculateDiscount(product.product))   }}</b>  <span v-if="product.product.discount != 0"><small class="text-muted" style="text-decoration: line-through;">Rp.{{ moneyFormat(product.product.price) }}</small></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Quantity</th>
                                                    <td>:</td>
                                                    <td> x<b>{{ product.qty }}</b></td>
                                                </tr>
                                                <tr>
                                                    <th>Size</th>
                                                    <td>:</td>
                                                    <td> <b>{{ product.size.sizes_name}}</b></td>
                                                </tr>
                                                <tr>
                                                    <th>Color</th>
                                                    <td>:</td>
                                                    <td>
                                                        <div class="color-border float-left mr-3" style="box-shadow:rgb(148 148 148) -1px -1px 25px 1px" :style="[{'background': product.color.color_name }]"> </div> <span style="font-weight:bold">{{ product.color.color_name }}</span></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3"><hr></td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td>:</td>
                                                    <td> <b style="color:#ca1515;">Rp.{{ moneyFormat(product.price) }}</b></td>
                                                </tr>
                                            </table>

                                        </div>
                                    </div>
                               </div>
                                
                                <div class="row mt-2">
                                    <div class="col-md-5"></div>
                                    <div class="col-md-7">
                                        <!-- <p class="text-muted">Pembayan success dilakukan, Terima kasih atas kepercayaan anda :)</p>      -->
                                        <p class="text-muted">Silahkan lakukan <b>pembayaran</b> agar product bisa di proses!</p>      
                                        <div class="order_grand_total mt-3 float-right" >
                                            <div class="card mb-4" style="
                                                background: #ca1515;
                                                color: white;
                                                border: none !important;
                                                border-radius: 1rem;">
                                                <div class="card-body">
                                                    <span>Ongkos Kirim : <b>Rp.{{ moneyFormat(order.cost_courier) }}</b></span>
                                                </div>
                                            </div>
                                            <h6 class="float-right"><span>Grand Total : <b style="color:#ca1515">Rp.{{ moneyFormat(grandTotal)  }} </b></span></h6>
                                        </div>
                                    </div>
                                </div>
                           </div>
                   </div>
                   </div>

                <div v-if="orderShow">
                    <div class="card mb-5" style="border:none;"  v-for="(orderLoading,index) in manyShowOrder" :key="index">
                        <div class="card-header custom-text-loader" style="border:none;width:100%;padding:22px">
                            <div class="order_date mb-2">
                            <span style="font-size:15px;padding-right:10px"> </span>
                        </div>
                    </div>
                    <div class="order_data mb-2 p-3 float-left card-body " style="border:0">
                        <div class="order_data_product row " style="border-bottom:1px solid #f2f2f2 !important;margin-bottom:10px" >
                            <div class="order_img col-md-4 mt-4 mb-3">
                                <div class="d-flex justify-content-center  custom-text-loader" style="width:100%;height:100%">
                                </div>
                            </div>

                            <div class="col-md-8 mt-4 mb-3">
                                <div class="order_product_price mt-2" style="margin-left:0%">
                                    <div class="order_product_name mb-2">
                                        <p href="" class="custom-text-loader" style="width:60%;padding:12px"></p>
                                        <p class="custom-text-loader" style="width:60%;"></p>
                                        <p class="custom-text-loader" style="width:50%;"></p>
                                        <p class="custom-text-loader" style="width:40%;"></p>
                                        <p class="custom-text-loader" style="width:55%;"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order_data_product row " style="border-bottom:1px solid #f2f2f2 !important;margin-bottom:10px" >
                            <div class="order_img col-md-4 mt-4 mb-3">
                                <div class="d-flex justify-content-center  custom-text-loader" style="width:100%;height:100%">
                                </div>
                            </div>

                            <div class="col-md-8 mt-4 mb-3">
                                <div class="order_product_price mt-2" style="margin-left:0%">
                                    <div class="order_product_name mb-2">
                                        <p href="" class="custom-text-loader" style="width:60%;padding:12px"></p>
                                        <p class="custom-text-loader" style="width:60%;"></p>
                                        <p class="custom-text-loader" style="width:50%;"></p>
                                        <p class="custom-text-loader" style="width:40%;"></p>
                                        <p class="custom-text-loader" style="width:55%;"></p>
                                    </div>
                                    

                                </div>
                            </div>
                        </div>

                        <div class="order_data_product row " style="border-bottom:1px solid #f2f2f2 !important;margin-bottom:10px" >
                            <div class="order_img col-md-4 mt-4 mb-3">
                                <div class="d-flex justify-content-center  custom-text-loader" style="width:100%;height:100%">
                                </div>
                            </div>

                            <div class="col-md-8 mt-4 mb-3">
                                <div class="order_product_price mt-2" style="margin-left:0%">
                                    <div class="order_product_name mb-2">
                                        <p href="" class="custom-text-loader" style="width:60%;padding:12px"></p>
                                        <p class="custom-text-loader" style="width:60%;"></p>
                                        <p class="custom-text-loader" style="width:50%;"></p>
                                        <p class="custom-text-loader" style="width:40%;"></p>
                                        <p class="custom-text-loader" style="width:55%;"></p>
                                    </div>
                                    

                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-5"></div>
                            <div class="col-md-7">
                                <!-- <p class="text-muted mt-3">Pembayan success dilakukan, Terima kasih atas kepercayaan anda <i class="mdi mdi-check"></i></p> -->
                                <p class="custom-text-loader mt-5" style="width:100%"></p>    
                                <p class="custom-text-loader " style="width:80%"></p>           
                                
                            </div>
                        </div>
                    </div>
                    </div>
                     </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shop Section End -->
</template>

<script>

import { computed, onMounted,ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Api from '@/api/Api';

export default {
    setup(){
        const manyShowOrder = ref(1);
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const grandTotal = ref('');
        const orderShow = ref(true);

        const order = computed(() => {
            return store.getters['order/detailOrder'];
        })
        
        const total = computed(() => {
            return store.state.order.grandTotal;
        })

        const productInOrder = computed(() => {
            return store.state.order.productInOrder;
        })

        const getOrderDetail = onMounted(async () => {
            orderShow.value = true;
            // const token = store.state.auth.token;
            
            // await store.dispatch('auth/refreshToken',token)
            
            const new_token = store.state.auth.token;
            
            Api.defaults.headers.common['Authorization'] = "Bearer "+new_token;
            
            await store.dispatch('order/detailOrder',route.params.snap_token)
            .then((response) => {
                orderShow.value = false;
                grandTotal.value = parseInt(response.data.data.cost_courier) + parseInt(response.data.totalOrder);
            });
           
        })
        
        const payment = (snap_token) => {

            window.snap.pay(snap_token, {
                onSuccess : function () {
                    router.push({name: 'order_detail', params:{snap_token: snap_token}})  
                },
                onPending : function () {
                    router.push({name: 'order_detail', params:{snap_token: snap_token}})  
                },
                onError : function () {
                    router.push({name: 'order_detail', params:{snap_token: snap_token}})  
                },
            })
        }

        return {
            getOrderDetail,
            order,
            productInOrder,
            grandTotal,
            total,
            manyShowOrder,
            payment,
            orderShow
        }
    }
}
</script>

<style scoped>
table tr th{
    padding:10px;
}
.color-border{
    width: 15px;
    height: 15px;
    border-radius: 100px;
}
</style>
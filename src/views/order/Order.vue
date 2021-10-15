
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
                <div class="sidebar__categories" v-if="!showOrdersLoader">
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
                <div class="sidebar__categories" v-if="showOrdersLoader">
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
                <div class="form-search-date" v-if="!showOrdersLoader">
                    <h6 class="text-search mb-3"><b>Search By Date :</b> </h6>
                    <div class="row">
                        <div class="col-lg-10">
                            <div class="row">
                                <div class="col-lg-5 col-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >
                                                <i class="mdi mdi-calendar-text"></i>
                                            </span>
                                        </div>
                                        <input type="date" class="form-control"  
                                        v-model="date.from_date">
                                    </div>
                                </div>
                                <div class="col-lg-5 col-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >
                                                <i class="mdi mdi-calendar-text"></i>
                                            </span>
                                        </div>
                                        <input type="date" class="form-control"
                                         v-model="date.to_date">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-6">
                                    <button class="btn btn-secondary btn-search" 
                                    @click="searchByDate">Cari!  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-search-date" v-if="showOrdersLoader">
                    <h6 class="text-search mb-3 custom-text-loader" style="width:20%"></h6>
                      <div class="row">
                        <div class="col-lg-10">
                            <div class="row">
                                <div class="col-lg-5 col-12">
                                    <div class="custom-text-loader" style="width:100%;padding:14px"></div>
                                </div>
                                <div class="col-lg-5 col-12">
                                    <div class="custom-text-loader" style="width:100%;padding:14px"></div>
                                </div>
                                <div class="col-lg-2 col-6">
                                    <button class="custom-text-loader" style="padding:14px"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card" style="border:none">
                    <div class="card-body">
                        <div class="order_status"  v-if="!showOrdersLoader">
                                <span style="font-size:14px"><b>Status</b></span>
                                <router-link :to="{name : 'order'}">
                                    <div class="status_order_detail active">
                                        <span>Semua</span>
                                    </div>
                                </router-link>
                                <div class="status_order_detail">
                                    <span><a href="">Berhasil</a></span>
                                </div>
                                <div class="status_order_detail">
                                    <span><a href="">Tidak Berhasil</a></span>
                                </div>
                                <div class="status_order_detail">
                                    <span><a href="">Dibatalkan</a> </span>
                                </div>
                        </div>
                        <div class="order_status"  v-if="showOrdersLoader">
                            <p class="custom-text-loader" style="width:10%;float:left;padding:15px 30px"></p>
                            <div class="status_order_detail custom-text-loader " style="width:15%;padding:15px 30px">
                            </div>
                            <div class="status_order_detail custom-text-loader" style="width:15%;padding:15px 30px">

                            </div>
                            <div class="status_order_detail custom-text-loader" style="width:15%;padding:15px 30px">

                            </div>
                            <div class="status_order_detail custom-text-loader" style="width:15%;padding:15px 30px">

                            </div>
                        </div>
                        <hr>
                        <div v-if="!orderShow">
                            <div class="card mb-5" style="border:none;" 
                                v-for="(order,index) in orders" :key="index">
                                <div class="card-header" style="border:none">
                                    <div class="order_date mb-2">
                                    <span style="font-size:15px;padding-right:10px">
                                        <i class="mdi mdi-cart"></i> 
                                        Belanja pada tanggal : {{ moment( order.created_at).format("dddd, D MMM Y HH:mm") }} 
                                    </span>
                                    <span class="status_order_data badge badge-warning" >
                                        {{ order.status }}
                                    </span>
                                    <span style="font-size:15px;padding-left:10px" class="order_code">I
                                        NVOICE : <b>{{ order.invoice }}</b>
                                    </span>
                                    <div class="line mt-3" style="padding:2px;width:10%;background:#ca1515"></div>
                                    <div style="" class="mt-3">
                                        <router-link :to="{name : 'order_detail',params : {snap_token : order.snap_token}}" 
                                        style="color:#ca1515;"><i class="mdi mdi-eye"></i> 
                                            Lihat Order Detail</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="order_data mb-2 p-3 float-left card-body " >
                                <div class="order_data_product row " style="border-bottom:1px solid #f2f2f2 !important" v-for="(product,index) in order.orders" :key="index">
                                    <div class="order_img col-md-4 mt-4 mb-3">
                                        <div class="d-flex justify-content-center">
                                            <img :src="product.product_gallery.image" alt="" style="width:50%;border-radius:1rem;margin:0 auto">
                                        </div>
                                    </div>

                                    <div class="col-md-8 mt-4 mb-3">
                                        <div class="order_product_price mt-2" style="margin-left:0%">
                                            <div class="order_product_name mb-2">
                                                <router-link :to="{name : 'product_detail',params: {slug : product.product.slug }} "><h5 class="mb-2"><b>{{ product.product.title }}</b></h5></router-link>
                                                <small style="color#ca1515">Brand : <a href="">@spech_indonesia</a></small>
                                            </div>
                                            <table style="width:100%">
                                                <tr>
                                                    <td>Price</td>
                                                    <td></td>
                                                    <td>
                                                        <div class="txt-discount mb-2" v-if="product.product.discount != 0">
                                                                <small style="color:#ca1515">Hemat -{{ product.product.discount }}%</small>
                                                        </div>

                                                        <b  style="color:#ca1515">Rp.{{ moneyFormat(calculateDiscount(product.product))   }}</b>  <span v-if="product.product.discount != 0"><small class="text-muted" style="text-decoration: line-through;">Rp.{{ moneyFormat(product.product.price) }}</small></span>
                                                    </td>
                                                </tr>
                                                
                                            </table>
                                            

                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-5"></div>
                                    <div class="col-md-7">
                                        <!-- <p class="text-muted mt-3">Pembayan success dilakukan, Terima kasih atas kepercayaan anda <i class="mdi mdi-check"></i></p> -->
                                        <p class="text-muted text-right mt-5" style="font-size:15px">Total sudah termasuk ongkir silahkan cek detail order untuk melihat ongkir.</p>           
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div v-if="emptyOrder">
                            <div class="card" style="border:0">
                                <h4 class="text-center">Oops, Tidak ada order pada tanggal ini :(</h4>
                                <h6 v-if="messageIfError" class="text-center mt-3" style="color:red">Error : {{ messageIfError }}</h6>
                                <div class="d-flex justify-content-center">
                                    <img src="/img/empty-cart/3369473.jpg" alt="" style="width:65%">
                                </div>
                            </div>
                        </div>
                        <!-- Loading content -->
                            
                        <div v-show="orderShow && !emptyOrder">
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

                        <PaginationComponent :style="[!orderShow ? { 'opacity' : '1','visibility': 'visible' } : { 'opacity' : '0','visibility': 'hidden' }]"
                        :currentPage ="pagination.currentPage"
                        :totalRows  ="pagination.rows"
                        :perPage    ="pagination.perPage"
                        :maxPagination = "5"
                        :setActive    ="pagination.active"

                        @getPage="getPagePaginate($event)"
                        />

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Shop Section End -->

<InstagramComponent/>
</template>

<script>

import InstagramComponent from '@/components/socialmedia_gallery/InstagramComponent';
import PaginationComponent from '@/components/pagination/PaginationComponent';

import { computed, onMounted,reactive,watch,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute } from 'vue-router'
// import Api from '@/api/Api';
import moment from 'moment';

export default {
  components : {
    InstagramComponent,
    PaginationComponent
  },

    setup() {
        const store = useStore();

        const date = reactive({
            from_date : '',
            to_date   : '',
        });
        const pagination = reactive({
            currentPage : 0,
            rows        : 0,
            perPage     : 0,
            page        : 1,
            active      : 1,

        });

        const orderShow = ref(true);
        
        const emptyOrder = ref(false);
        const messageIfError = ref('');
        const manyShowOrder = ref(1);
        
        const showOrdersLoader = ref(true);

        const router = useRouter();
        const route = useRoute();

        const getAllOrders = async (slug) => {
            
            let page = slug.page ? slug.page : 1;

            if(slug.from_date || slug.to_date){

                date.from_date = slug.from_date;
                date.to_date   = slug.to_date;
            }
            
            // const token = store.state.auth.token;
            
            // await store.dispatch('auth/refreshToken',token)
            
            await store.dispatch('order/getAllOrders',{
                page,
                date
            })
            .then((response) => {

                emptyOrder.value = false;

                showOrdersLoader.value = false;
                
                if(response.data.success == true){
                    
                    pagination.currentPage  = response.data.data.current_page;
                    pagination.rows         = response.data.data.total;
                    pagination.perPage      = response.data.data.per_page;

                    orderShow.value = false;

                    if(response.data.data.data.length == 0){
                        emptyOrder.value = true;
                        messageIfError.value = '';
                    }
                }
            })  
            .catch((error) => {
                showOrdersLoader.value = false;
                messageIfError.value = error.message;
                alert(error.message);
                orderShow.value = true;
                emptyOrder.value = true;
            })
        }


        const clearData = () => {
            date.from_date          = '';
            date.to_date            = '';
            // pagination.currentPage  = 1;
        }

        onMounted(() => {
            getAllOrders(route.query);
        })

        const orders = computed(() => {
            return store.state.order.orders;
        })

        const getPagePaginate  = async (event) => {
            
            // window.scrollTop(1000);

            pagination.page  = event;
            
            let dataPage        = event > 1 ? event : [];

            let pageRoute       = { page : dataPage };

            const filterDate    =  { from_date: route.query.from_date,to_date:route.query.to_date };
       
            const newRouteQuery =  { ...pageRoute,...filterDate };
            
            // console.log(event);

            router.replace({query : newRouteQuery });
        }


        const searchByDate =  () => {
            
            orderShow.value = false;

            // const token = store.state.auth.token;
            
            // store.dispatch('auth/refreshToken',token)

            let to_date = date.to_date ? date.to_date : [];
            let from_date = date.from_date ? date.from_date : [];
            
            router.replace({query : { from_date: from_date,to_date:to_date } });
        }

        const watchDate = watch(() => route.query, async(slug) => {        

            if(!slug.from_date && !slug.to_date && !slug.page){
                clearData();
            }

            emptyOrder.value = false;
            orderShow.value = true;

            getAllOrders(route.query);

        }) 

        return {
            getAllOrders,
            orders,
            date,
            searchByDate,
            watchDate,
            moment,
            orderShow,
            manyShowOrder,
            emptyOrder,
            messageIfError,
            showOrdersLoader,
            pagination,
            getPagePaginate
            
        }

    }
}
</script>

<style lang="css" scoped>
.order_data{
    padding: 1rem;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #efefef;
}
.categories__accordion .card-heading a:after, .categories__accordion .card-heading>a.active[aria-expanded=false]:after{
    display:none;
}
.order_status .status_order_detail{
    display: inline-block;
    margin-left: 50px;
    border: 1px dotted#fff4f4;
    padding: 6px 30px;
    border-radius: 100px;
    background-color: #ca1515;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.2s ease-in-out;
}
.order_status .status_order_detail.active a{
    color: #ca1515;
}
.order_status .status_order_detail a{
    color: white;
}


.order_status .status_order_detail.active{
    background-color: whitesmoke;
    color: #726161;
    border: 1px solid #ca1515;
}
.order_status .status_order_detail:hover {
    background-color: whitesmoke;
    border: 1px dotted #ececec;;
}
.order_status .status_order_detail:hover a{
    color: #ca1515;
}

.order_status .status_order_detail span{
    font-size:13px;
}
.card-link-hover:hover{
    background-color: red;
}
</style>



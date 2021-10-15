<template>
<div class="show-error-wishlish" v-if="messageWishlist.messageWishlistError != ''" :style="[ messageWishlist.messageWishlistError != '' ? {'right': '0'} : {'right': '-32%'} ]">
    <div class="alert alert-warning alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Warning alert!</strong> {{ messageWishlist.messageWishlistError }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click=" messageWishlist.messageWishlistError =''">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>  

<div class="show-error-wishlish" v-if="messageWishlist.messageWishlistSuccess != ''" :style="[ messageWishlist.messageWishlistSuccess != '' ? {'right': '0'} : {'right': '-32%'} ]">
    <div class="alert alert-success alert-dismissible" role="alert" style="line-height:30px;box-shadow:7px 6px 49px #00000030">
        <strong>Success alert!</strong> {{ messageWishlist.messageWishlistSuccess }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click=" messageWishlist.messageWishlistSuccess =''">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
<div class="loader-wishlist" v-if="messageWishlist.loaderWishlist">
    <span>Tunggu ya ....</span>
</div>
<!-- Breadcrumb Begin -->
<div class="breadcrumb-option">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="breadcrumb__links">
                    <a href="./index.html"><i class="fa fa-home"></i> Home</a>
                    <span>Shop</span> 
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
            <div class="col-lg-3 col-md-3">
                
                <div class="shop__sidebar" v-if="!state.loadingFilter">


                    <div class="sidebar__categories">
                        <div class="section-title">
                            <h4 class="mb-3">Categories    
                            </h4><br>
                            <small class="text-muted">Last 5 Category Product, Let me show you my best product.</small>
                        </div>
                        <div class="categories__accordion">
                            <div class="accordion" id="accordionExample">
                                <div class="card" >
                                    <div class="card-heading">
                                        <router-link :to="{name : 'product'}">
                                            All Category 
                                        </router-link>
                                    </div>
                                </div>
                                <div class="card" v-for="(category,index) in categories" :key="index" >
                                    <label :for="category.id">
                                            <div class="card-heading">
                                            <a :style="[ $route.query.category_product == category.slug ? { 'color':'#ca1515','font-weight':'bold' } : '']">
                                                {{ category.name }} 
                                            </a> 

                                            <input style="visibility:hidden;position: absolute;" type="radio" :id="category.id" :value="category.slug" name="category" v-model="category_slug">
                                        
                                        </div>
                                        
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar__filter">
                        <div class="section-title">
                            <h4>Shop by price</h4>
                        </div>
                        <div class="filter-range-wrap">
                            <!-- <div class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                            data-min="33" data-max="99"></div> -->
                            <div class="range-slider">
                                <div class="price-input">
                                    <p class="mb-2">Price:</p>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Rp.</span>
                                        </div>
                                        <input type="number" class="form-control" id="minamount" placeholder="Harga Minimum" v-model="priceFilter.from_price" @keyup.enter="filterPrice">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Rp.</span>
                                        </div>
                                            <input type="number" class="form-control"  id="maxamount" placeholder="Harga Maximum"  v-model="priceFilter.to_price" @keyup.enter="filterPrice">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- <a href="#">Filter</a> -->
                    </div>
                    <div class="sidebar__sizes">
                        <div class="section-title">
                            <h4>Shop by size</h4>
                        </div>
                        <div class="size__list">
                            <label :for="size.sizes_name" v-for="(size,index) in sizes" :key="index">
                                {{ size.sizes_name }}
                                <input type="checkbox" :id="size.sizes_name" :value="size.id" v-model="sizeRef">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div class="sidebar__color">
                        <div class="section-title">
                            <h4>Shop by Color </h4>
                        </div>
                        <div class="size__list color__list">
                            <!-- <template v-for="(checked,index) in checkedData[1]" :key="index"> -->
                                <label :for="color.color_name" v-for="(color,index) in colors" :key="index" >
                                    {{ color.color_name }}
                                    <input type="checkbox" :id="color.color_name" :value="color.id" v-model="colorRef">
                                    <span class="checkmark"></span>
                                </label>
                            <!-- </template> -->
                        </div>
                        
                    </div>
                </div>

                    <div class="shop__sidebar loader-sidebar" v-if="state.loadingFilter">
                    <div class="sidebar__categories">
                        <div class="section-title custom-loader custom-section-title">
                            <h4 class="mb-3 custom-text-loader"></h4>
                            <div class="text-muted custom-sub-text-loader"></div>
                            <div class="text-muted custom-sub-text-loader"></div>
                        </div>
                        <div class="categories__accordion custom_categories_loader">
                            <div class="accordion" id="accordionExample">
                                <div class="card card-for-loader" v-for="(loader,index) in state.loadingShow" :key="index">
                                    <div class="card-heading">
                                        <a href="" class="custom-sub-text-loader"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar__filter">
                        <div class="section-title custom-section-title">
                            <h4 class="custom-text-loader"></h4>
                        </div>
                        <div class="filter-range-wrap">
                            <div class="range-slider">
                                <div class="price-input">
                                    <p class="custom-text-loader" style="width:40%"></p>
                                    <div class="input-group mb-3" v-for="(loader,index) in (state.loadingShow - 4)" :key="index">
                                        <div class="custom-sub-text-loader"  >
                                            
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <!-- <a href="#">Filter</a> -->
                    </div>
                    <div class="sidebar__sizes">
                        <div class="section-title custom-section-title">
                            <h4 class="custom-text-loader"></h4>
                        </div>
                        <div class="size__list">
                            <div class="custom-sub-text-loader mb-3" style="width:50%" v-for="(loader,index) in (state.loadingShow)" :key="index">
                                
                            </div>
                        </div>
                    </div>
                    <div class="sidebar__color">
                        <div class="section-title custom-section-title">
                            <h4 class="custom-text-loader"></h4>
                        </div>
                        <div class="size__list color__list">
                                <div class="custom-sub-text-loader mb-3" style="width:50%" v-for="(loader,index) in (state.loadingShow)" :key="index">
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="col-lg-9 col-md-9">
                    <div class="row" v-if="state.showProducts" >
                    <div class="col-lg-3 col-md-4" v-for="(product,index) in products" :key="index">
                        
                        <router-link :to="{ name : 'product_detail',params :{slug: product.slug} }" replace>
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
                                        <li><a href="#" @click.prevent="addToWishlist(product)"><span class="icon_heart_alt"></span></a></li>
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
                
                    <!-- <template v-if="state.showProducts"> -->
                        <PaginationComponent :style="[state.showProducts ? { 'opacity' : '1','visibility': 'visible' } : { 'opacity' : '0','visibility': 'hidden' }]"
                        :currentPage ="pagination.currentPage"
                        :totalRows  ="pagination.rows"
                        :perPage    ="pagination.perPage"
                        :maxPagination = "5"
                        :setActive    ="pagination.active"

                        @getPage="getPagePaginate($event)"
                        />
                    <!-- </template> -->
                    <!-- <pagination/> -->
                    <div class="row" v-if="state.emptyProducts">
                        <div class="col-md-12">
                        <h4 class="text-center">Oops, Tidak ada product yang tersedia :(</h4>
                        <div class="d-flex justify-content-center">
                                <img src="/img/empty-cart/3369473.jpg" alt="" style="width:65%">
                        </div>
                    </div>
                </div>

                <div class="row" v-if="state.loadingProducts">
                        <div class="col-lg-3 col-md-4 mb-2" v-for="(loading,index) in state.loadingShow + 6" :key="index">
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
        </div>
    </div>
</section>
<!-- Shop Section End -->

<InstagramComponent/>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter,useRoute } from 'vue-router';
import { onMounted,computed,watch,ref,reactive } from 'vue';

import PaginationComponent from '@/components/pagination/PaginationComponent';
import InstagramComponent from '@/components/socialmedia_gallery/InstagramComponent';

export default {
  components : { 
    PaginationComponent,
    InstagramComponent,
  },

  setup () {



    // function store (vue x) , router for (router or change page) , route for read url params
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // state category active
    const category_active = ref(0);
    
    // state for message wishlist
    const messageWishlist = reactive({
        messageWishlistError : '',
        messageWishlistSuccess : '',
        loaderWishlist : false
    });

    // state for loader
    const state = reactive({
        loadingFilter   : true,
        loadingProducts : false,
        showProducts    : false,
        loadingShow     : 6,
        emptyProducts   : false,
        prevColor       : 0,
        prevSize        : 0,
        prevCategory    : '',
    });

    // state for filter //
    const colorRef = ref([]);

    const category_slug = ref('');

    const sizeRef = ref([]);

    const data = ref(true);
    
    const priceFilter = reactive({
        from_price  : '',
        to_price    : '',
    });

    const pagination = reactive({
        currentPage : 0,
        rows        : 0,
        perPage     : 0,
        page        : 1,
        active      : 1,
    });


    // function clear data when access this page
    const clearData = () => {
        colorRef.value = [];
        sizeRef.value  = [];
        category_slug.value = '';
        priceFilter.from_price ='';
        priceFilter.to_price = '';
        pagination.page = 1;
        state.prevColor = 0;
        state.prevSize = 0;
        pagination.showData = 0;
    }

    
    // get product filter function
    const getProductFilter =  async (slug) => {

        let newValues = [];

        let category_slugs = '';
        
       if(slug.color || slug.size){

            const myArr             = slug.size ? slug.size.length > 0 ? slug.size.split('&'):  [] : [];
            
            const myArr2            = slug.color ? slug.color.length > 0 ? slug.color.split('&'):  [] : [];
            
            newValues               = [[...myArr],[...myArr2]]; // get data from my Arr and myArr2 and merge

            colorRef.value          = newValues[1]; // get data value from new Values index 1

            sizeRef.value           = newValues[0]; // get data value from new Values index 0
       }

       else{
            const myArr             = [];
            
            const myArr2            = [];

            newValues               = [[...myArr],[...myArr2]]; // get data from my Arr and myArr2 and merge
        }

        // ---------------------------------- part category filter ----------------------------------

        category_slugs          = slug.category_product; // get data values from params 

        category_slug.value     = category_slugs; // assign ref category_slug = category_slugs from params

        state.prevCategory      = category_slugs;

        // ---------------------------------- part category filter ----------------------------------

        
        // ---------------------------------- part pagination filter -----------------------------
        let page = slug.page ? slug.page : 1;
        // ---------------------------------- part pagination filter -----------------------------


        // ---------------------------------- part price filter ----------------------------------

        priceFilter.from_price  = slug.from_price ? slug.from_price : ''; // assign value from params from_price
        
        priceFilter.to_price    = slug.to_price ? slug.to_price : ''; // assign value from params to_price
       
       console.log(priceFilter);
        // ---------------------------------- part price filter ----------------------------------

        
        //----------------------------------- section loading -----------------------------------

        state.loadingProducts   = true;  

        state.loadingFilter     = true;
        
        state.emptyProducts     = false;
        
        state.showProducts      = false;
        
        state.loadingProducts   = true;

        //----------------------------------- section loading -----------------------------------

         await store.dispatch('product/filter',{ newValues, category_slugs,priceFilter,page })
        .then((response) => {
            // console.log(response.data.products);
            // loading --------------------

            state.emptyProducts = false;
            state.loadingProducts = true;
            
            // loading --------------------

            if(response.data.products.data.length > 0){

                pagination.currentPage  = response.data.products.current_page;
                pagination.rows         = response.data.products.total;
                pagination.perPage      = response.data.products.per_page;

                //  clearData();
                
                 // loading --------------------
                state.loadingProducts   = false;
                state.showProducts      = true;
                state.loadingFilter     = false;
                
                // loading --------------------

            }else if(response.data.products.data.length == 0){
                
                //------- loading --------------------
                state.loadingProducts   = false;
                state.showProducts      = false;
                state.emptyProducts     = true;
                state.loadingFilter     = false;
                //------- loading --------------------
            }
        })

     
    }

    const getPagePaginate   = async (event) => {
        // filter()
        if(data.value == true){
            pagination.page  = event;
            
            let dataPage        = event > 1 ? event : [];

            let pageRoute       = { page : dataPage };


            let priceRoute      = { from_price: route.query.from_price,to_price:route.query.to_price };

            let filterRoute     = { category_product: route.query.category_product, color:route.query.color, size:route.query.size }

            const newRouteQuery =  { ...pageRoute,...filterRoute,...priceRoute };
            
            // console.log(event);

            router.replace({query : newRouteQuery });

        }
        
    }

    // filter price function
    const filterPrice = async () => {
        // let routeData  = route.query;
        
        let from_price          = priceFilter.from_price != '' ? priceFilter.from_price : [];
        let to_price            = priceFilter.to_price != '' ? priceFilter.to_price : [];

        const filterRoute       = { category_product: route.query.category_product, color:route.query.color, size:route.query.size };
        const priceRoute        = { from_price: from_price,to_price:to_price };

        const newRouteQuery     =  {...filterRoute,...priceRoute };
        
        router.replace({query : newRouteQuery });
        
    }

    const getDataSearchRoute = computed(() => {
        return store.state.search.changeRouteSearch;
    });
    
    // wacth filter color size anda category
    const filter =  watch([sizeRef,colorRef,category_slug,getDataSearchRoute], (newValues, prevValues) => {
        console.log(newValues[3]);
        let prev1               = prevValues[1].length == 0 ? newValues[1].length : prevValues[1].length;

        let prev2               = prevValues[0].length == 0 ? newValues[0].length : prevValues[0].length;

        let prev3               = state.prevCategory == '' ? '' : prevValues[2] ;

        let check1              = prevValues[0].length + prevValues[1].length + prev3;

        //------------------------------------------------------------------------------------------------------------

        state.prevColor         = prevValues[1].length == 0 ? newValues[1].length - 1 : prevValues[1].length;

        state.prevSize          = prevValues[0].length == 0 ? newValues[0].length - 1 : prevValues[0].length;
        
        //-------------------------------------------------------------------------------------------------------------
        let size                = newValues[0].length > 0  ?  newValues[0].join().split(',').join('&') : [];

        let color               = newValues[1].length > 0  ?  newValues[1].join().split(',').join('&') : [];
        
        let category_s          = newValues[2] ? newValues[2] : [];
        
        //--------------------------------------------------------------------------------------------------------------
        
        const pageRoute         = { page : route.query.page };

        const filterRoute       = { category_product: category_s, color: color, size: size };
        
        const priceRoute        = { from_price : route.query.from_price, to_price : route.query.to_price };

        let newRouteQuery       =  null; 

        newRouteQuery = { ...pageRoute,...filterRoute,...priceRoute };

        let isCheck = false;       

        if(color != '' && state.prevColor > newValues[1].length || state.prevColor < newValues[1].length && prev1 != 0 && check1 != 0){
            isCheck = true;
        }
        
        else if(size != '' && state.prevSize > newValues[0].length || state.prevSize < newValues[0].length && prev2 != 0 && check1 != 0){
            isCheck = true;
        }
        else if(newValues[2] != '' &&  prevValues[2] != newValues[2] && check1 != 0){
            // newRouteQuery = { ...filterRoute };
            isCheck = true;    
        }

        //----------------------------------------------------------------------------------------------------------------------

        if(route.query.page != null && isCheck == true && newValues[3] == false){
            newRouteQuery = { ...filterRoute,...priceRoute };   
             
        }else if(newValues[3] == true){
            newRouteQuery = { category_product : route.query.category_product };
        }
        
        store.commit('search/CHANGE_ROUTE',false);


        router.replace({query : newRouteQuery });

    },{ deep: true })
    
    // watch route when url change or get data from route parameter
    const changeUrl =  watch(() => route.query, async slug => {

        if(!slug.page && !slug.size && !slug.color && !slug.category_product && !slug.from_price && !slug.to_price){
           clearData();
        }
    

        await getProductFilter(slug);
        
    })
    // add wishlist function
    const addToWishlist = async (product) => {
            
        messageWishlist.loaderWishlist = true;

        const token = store.state.auth.token;
        
        if(!token){
            router.push({name : 'login'});
        }

        // await store.dispatch('auth/refreshToken',token)
        
        await store.dispatch('wishlist/addToWishlist',product)
        .then((response) => {
            messageWishlist.messageWishlistSuccess = response.data.message;
            messageWishlist.loaderWishlist = false;

            setTimeout(function() {
                messageWishlist.messageWishlistSuccess = '';
            },3000)

        })
        .catch((error) => {
            
            messageWishlist.messageWishlistError = error.message;
            messageWishlist.loaderWishlist = false;

            setTimeout(function() {
                messageWishlist.messageWishlistError = '';
            },3000)
            console.log(error);
        })
    }

    // on mounted product Filter
    onMounted(() => {
        
        getProductFilter(route.query);
    })

    //get categories from state product
    const categories = computed(() => {
        return store.state.product.categories;
    })

    // get all product from product 
    const products = computed(() => {
        return store.state.product.products;
    });
    
    // get colors from state product
    const colors = computed(() => {
        return store.state.product.colors;
    });

    // get sizes from state product
    const sizes = computed(() => {
        return store.state.product.sizes;
    });
    
    // filter by color function 
    const sendColor = ((color_key,slug) => {
        store.dispatch('product/sendColor',{color_key,slug});
    })

    
    
    // active category
    const changeCategory = (index,slug) => {
        category_active.value = index;
        category_slug.value = slug;
    }

    return {
        products,
        sendColor,
        categories,
        colors,
        sizes,
        colorRef,
        sizeRef,
        filter,
        changeCategory,
        state,
        changeUrl,
        category_slug,
        priceFilter,
        filterPrice,
        addToWishlist,
        messageWishlist,
        pagination,
        getPagePaginate,
        router
    }
  }
}
</script>

<style scoped>
.loader-wishlist{
    background: white;
    position: fixed;
    left:50%;
    top:40%;
    z-index: 99;
}
.show-error-wishlish{
    width:30%;
    position: fixed;
    z-index: 99;
    right: -32%;
    transition: all 2s cubic-bezier(0.71, 0.72, 0, 1.02);
}
.filter-range-wrap .range-slider .price-input:after{
    display:none;
}
.categories__accordion .card-heading.active a:after{
    display :none;
}
.filter-range-wrap .range-slider .price-input input{
    max-width: 100%;
    border:1px solid #ced4da;
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

.loader-sidebar .custom-loader .custom-text-loader {
    border:none;
    padding: 10px;
    border-radius: 3px;
    width: 80%;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 62px, #ddd 181px);
    background-size: 600px;
    -webkit-animation: shine-lines 1s infinite linear;
    animation: shine-lines 1s infinite linear;
}
.custom-section-title h4:after{
    display: none;
}
.loader-sidebar .custom-loader .custom-sub-text-loader{
    border:none;
    margin-top:5px;
    padding: 8px;
    border-radius: 3px;
    width: 100%;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 62px, #ddd 181px);
    background-size: 600px;
    -webkit-animation: shine-lines 1s infinite linear;
    animation: shine-lines 1s infinite linear;
}
.custom-text-loader{
     border:none;
    padding: 10px;
    border-radius: 3px;
    width: 80%;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 62px, #ddd 181px);
    background-size: 600px;
    -webkit-animation: shine-lines 1s infinite linear;
    animation: shine-lines 1s infinite linear;
}
.custom-sub-text-loader{
    border:none;
    margin-top:5px;
    padding: 9px;
    border-radius: 3px;
    width: 80%;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 62px, #ddd 181px);
    background-size: 600px;
    -webkit-animation: shine-lines 1s infinite linear;
    animation: shine-lines 1s infinite linear;
}

.custom_categories_loader .card-heading a:after, .custom_categories_loader .card-heading>a.active[aria-expanded=false]:after {
    display:none;
}
.categories__accordion .card-for-loader{
    border:none !important;
}
.sidebar__filter .custom-text-loader{
     border:none;
    padding: 10px;
    border-radius: 3px;
    width: 90%;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 62px, #ddd 181px);
    background-size: 600px;
    -webkit-animation: shine-lines 1s infinite linear;
    animation: shine-lines 1s infinite linear;
}
</style>


<template>

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
    <section class="shop spad" >
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3">
                    <div class="shop__sidebar">
                        <div class="sidebar__categories">
                            <div class="section-title">
                                <h4 class="mb-3">Categories</h4><br>
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
                                        <div class="card-heading" :class="[index == category_active ? 'active' : '']">
                                            <router-link :to="{ name : 'product_category', params : { category_slug : category.slug } }" @click="changeCategory(index)">
                                                {{ category.name }}
                                            </router-link>
                                        </div>
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
                                            <input type="number" class="form-control" id="minamount" placeholder="Harga Minimum">
                                        </div>

                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Rp.</span>
                                            </div>
                                                <input type="number" class="form-control"  id="maxamount" placeholder="Harga Maximum" >
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
                                <h4>Shop by Color</h4>
                            </div>
                            <div class="size__list color__list">
                                <label :for="color.color_name" v-for="(color,index) in colors" :key="index" >
                                    {{ color.color_name }}
                                    <input type="checkbox" :id="color.color_name" :value="color.id" v-model="colorRef">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-9">
                    <div class="row" v-if="state.showProducts" >
                        <div class="col-lg-4 col-md-6" v-for="(product,index) in products" :key="index">
                            
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
                                      <div class="label new">New </div>
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
                                      <div class="txt-discount float-right" v-if="product.discount != 0">
                                            <small style="color:#ca1515">-{{ product.discount }}%</small>
                                      </div>
                                      <div class="product__price"> Rp.{{ moneyFormat(calculateDiscount(product))   }} <span v-if="product.discount != 0"><small>Rp.{{ moneyFormat(product.price) }}</small></span> </div>
                                  </div>
                              </div>
                          </router-link>
                        </div>
                        
                        <div class="col-lg-12 text-center">
                            <div class="pagination__option">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#"><i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    </div>

                     <div class="row" v-if="state.emptyProducts">
                         <div class="col-md-12">
                            <h4 class="text-center">Oops, Tidak ada product pada category ini :(</h4>
                            <div class="d-flex justify-content-center">
                                 <img src="/img/empty-cart/3369473.jpg" alt="" style="width:65%">
                            </div>
                        </div>
                    </div>

                    <div class="row" v-if="state.loadingProducts">
                         <div class="col-lg-4 col-md-6 mb-2" v-for="(loading,index) in state.loadingShow" :key="index">
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
import { onMounted,computed,watch,ref,reactive } from 'vue';

import InstagramComponent from '@/components/socialmedia_gallery/InstagramComponent';
import { useRoute } from 'vue-router';

export default {
  components : {
    InstagramComponent,
  },

  setup () {
    const store = useStore();
    const route = useRoute();
    const colorRef = ref([]);
    const category_active = ref(0);
    const sizeRef = ref([]);

    const state = reactive({
        loadingProducts : false,
        showProducts    : false,
        loadingShow     : 6,
        emptyProducts   : false,
    });
    
    onMounted(() => {
        
        state.loadingProducts = true;

        store.dispatch('product/getProductByCategory',route.params.category_slug)
        .then((response) => {

            state.loadingProducts = true;
           if(response.data.products.length > 0){

                state.loadingProducts = false;
                state.showProducts = true;

            }else if(response.data.products.length == 0){
                state.loadingProducts = false;
                state.showProducts = false;
                state.emptyProducts = true;
            }
        })
    })

    const categories = computed(() => {
        return store.state.product.categories;
    })

    const products = computed(() => {
        return store.state.product.products;
    });
    const colors = computed(() => {
        return store.state.product.colors;
    });
    const sizes = computed(() => {
        return store.state.product.sizes;
    });

    const changeCategory = (index) => {
        
        state.loadingProducts = true;
        state.showProducts = false;
        state.emptyProducts = false;
        category_active.value = index;
    }
    
    const filter =  watch([sizeRef,colorRef], (newValues) => {
        
        let category_slug = route.params.category_slug;

        store.dispatch('product/filter',{ newValues,category_slug }); 
    })
    
    const watchRoute = watch(() => route.params.category_slug, async slug => {
        
       if(slug){
        console.log(state.loadingProducts);
        await store.dispatch('product/getProductByCategory',slug)
        
         .then((response) => {
           
           state.loadingProducts = true;
           
           if(response.data.products.length > 0){
                state.loadingProducts = false;
                state.showProducts = true;
            }else if(response.data.products.length == 0){
                state.loadingProducts = false;
                state.showProducts = false;
                state.emptyProducts = true;
            }

        })
       }

    })

    return {
        state,
        products,
        categories,
        colors,
        sizes,
        colorRef,
        sizeRef,
        filter,
        changeCategory,
        category_active,
        watchRoute
    }
  }
}
</script>

<style scoped>
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

</style>


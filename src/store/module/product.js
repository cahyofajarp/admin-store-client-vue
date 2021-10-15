
import Api from '../../api/Api';

const product = {
    
    namespaced :true,

    state : {
        products : [],
        categories : [],
        colors : [],
        sizes : [],
 
    },

    mutations : {
        GET_PRODUCTS(state,products) {
            state.products  = products;
        },
        GET_CATEGORIES(state,categories) {
            state.categories = categories;
        },
        GET_COLORS(state,colors) {
            state.colors = colors;
        },
        GET_SIZES(state,sizes) {
            state.sizes = sizes;
        },
    },

    actions :{
         getProducts({commit}){
            return new Promise((resolve) => {
                Api.get('/product')
                .then((response) => {
                    
                    // console.log(response.data.products[0].productgallery_thumbnails.product_gallery)
                    commit('GET_PRODUCTS',response.data.products);
                    commit('GET_CATEGORIES',response.data.categories);
                    commit('GET_COLORS',response.data.colors);
                    commit('GET_SIZES',response.data.sizes);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        },

        filter({ commit },{ newValues, category_slugs,priceFilter, page }) {
            
              return new Promise((resolve) => {
                Api.post(`/product/filterColor?page=`+page,{
                    colors : newValues[1],
                    sizes : newValues[0],
                    category_slug : category_slugs,
                    price : priceFilter
                })
                .then((response) => {
                    console.log(response);
                    resolve(response); 
                    commit('GET_PRODUCTS',response.data.products.data);
                    commit('GET_CATEGORIES',response.data.categories);
                    commit('GET_COLORS',response.data.colors);
                    commit('GET_SIZES',response.data.sizes);
                })
             })
        },
        
        getProductByCategory({commit},category_slug){
           return new Promise((resolve) => {
                Api.get(`/category/`+category_slug)
                .then((response) => {    
                    commit('GET_PRODUCTS',response.data.products);
                    commit('GET_CATEGORIES',response.data.categories);
                    commit('GET_COLORS',response.data.colors);
                    commit('GET_SIZES',response.data.sizes);

                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                })
           })
        },


        sendColor({ color_key,slug }){ 
            Api.get(`/product/`+slug,{
                color_key : color_key
            });
        },
    },

    getters : {

    }
}

export default product
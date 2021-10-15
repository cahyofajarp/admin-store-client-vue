import Api from '../../api/Api';

const productDetail = {
    namespaced :true,

    state :{
        product : {},
        product_galleries : [],
        bigImage : '',
        related_product:[],
        stock : {},
        colors : [],
        colorProduct : null,
        loaderChangeColor: false,
        size : null
    },

    mutations : {
        GET_PRODUCT_DETAIL(state,product) {
            state.product = product;
        },
        SET_IMAGE(state,image){
            state.bigImage = image;
        },
        GET_RELATED_PRODUCT(state,related_product){
            state.related_product = related_product;
        },
        GET_STOCK(state,stock){
            state.stock = stock;
        },
        GET_COLORS(state,{colors,colorProduct}){
            state.colors = colors;
            state.colorProduct = colorProduct;
        },
        GET_SIZE(state,size){
            state.size = size;
        },
        GET_PRODUCT_GALLERIES(state,product_galleries){
            state.product_galleries = product_galleries;
        }
    },

    actions :{
        getProductDetail({commit},slug){
           return new Promise((resolve) => {
                Api.get(`/product/`+slug)
                .then((response) => {
                    
                    commit('GET_PRODUCT_DETAIL',response.data.product);
                    
                    commit('SET_IMAGE',response.data.product_galleries[0].image);

                    commit('GET_PRODUCT_GALLERIES',response.data.product_galleries);
                    
                    commit('GET_RELATED_PRODUCT',response.data.related);
                    
                    commit('GET_STOCK',response.data.stock);

                    let colors = response.data.product.colors;
                    let colorProduct = response.data.product.productgallery_thumbnails.color_id;
                    
                    commit('GET_COLORS',{colors, colorProduct});
                    
                    commit('GET_SIZE',response.data.product.sizes[0].id);

                    resolve(response);

                })
                .catch((error) => {
                    console.log(error);
                })
           })
        },

        changeImage({commit},image){
            commit('SET_IMAGE',image);
        },
         changeColorImage({state,commit}, {slug,color_id,size_id}){
            return new Promise((resolve) => {
                 Api.get(`/product/`+slug+`/`+color_id+`/`+size_id+`/change-color`)
                .then((response) => {
    
                    commit('GET_PRODUCT_DETAIL',response.data.product);
                    commit('GET_PRODUCT_GALLERIES',response.data.product_galleries);
                    commit('SET_IMAGE',response.data.product_galleries[0].image);
                    commit('GET_STOCK',response.data.stock);
                    resolve(response);
                    state.loaderChangeColor = false;
                });
            })
        },
        
        changeSize({commit,state},{slug,color_id,size}){
            
            state.loaderChangeColor = true;
          
            Api.get(`/product/`+slug+`/`+color_id+`/`+size+`/change-color`)
            .then((response) => {
                commit('GET_STOCK',response.data.stock);
                commit('GET_SIZE',size);
                
                state.loaderChangeColor = false;
            });

            
        }
        
    },

    getters :{
        size(state){
            return state.size;
        }
    }
}

export default productDetail
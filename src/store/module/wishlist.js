import Api from '../../api/Api';

const wishlist = {
    namespaced : true,
    state : {
        wishlists : [],
        wishlist_data : [],
        wishlistCount : 0,
    },
    mutations : {
        GET_WISHLISTS(state,wishlists) {
            state.wishlists = wishlists;
        },
        GET_WISHLIST_COUNT(state,wishlistCount){
            state.wishlistCount = wishlistCount;
        },
        GET_WISHLISTS_SEARCH(state,wishlists){
            state.wishlists = wishlists;
        },
        GET_WISHLISTS_DATA(state,wishlist_data){
            state.wishlist_data = wishlist_data;
        }
    },
    actions : {
         getProductWishlist({ commit }){
            return new Promise((resolve) => {
                
                const token = localStorage.getItem('token');

                Api.defaults.headers.common['Authorization'] = "Bearer " + token
                
                 Api.get(`/product-wishlist/wishlist`)
                .then((response) => {
                    console.log(response);
                    commit('GET_WISHLISTS',response.data.wishlists);
                    commit('GET_WISHLISTS_DATA',response.data.wishlists);

                    commit('GET_WISHLIST_COUNT',response.data.wishlistCount);
                    
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        },

        async addToWishlist({commit},product){

            return new Promise((resolve,reject) => {
                
                const token = localStorage.getItem('token');

                Api.defaults.headers.common['Authorization'] = "Bearer " +token
                
                Api.post(`/product-wishlist/wishlist/store`,{
                    product_id :product.id
                })
                .then((response) => {
                    resolve(response);
                    commit('GET_WISHLIST_COUNT',response.data.wishlistCount);
                })
                .catch((error) => {
                    reject(error.response.data);
                    console.log(error);
                })
            })
        },
        
         searchWishlist({ commit }, keyword){
           return new Promise((resolve) => {
                 Api.post(`/product-wishlist/wishlist/search`,{
                    keyword: keyword
                })
                .then((response) => {
                    resolve(response);
                    if(response.data.wishlists.length  > 0){
                        commit('GET_WISHLISTS_SEARCH',response.data.wishlists);
                    }else{
                        commit('GET_WISHLISTS_SEARCH',[]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
           })
        },
        
         deleteWishlist({ commit },product_id) {

           return new Promise((resolve,reject) => {
                const token = localStorage.getItem('token');

                Api.defaults.headers.common['Authorization'] = "Bearer " +token
                
                Api.delete(`/product-wishlist/wishlist/delete`,{
                    data : {
                        product_id : product_id
                    }
                })
                .then((response) => {
                    console.log(response);
                    commit('GET_WISHLISTS',response.data.wishlists);
                    commit('GET_WISHLIST_COUNT',response.data.wishlistCount);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                })
           })
        }
    },
    getters : {

    }
}

export default wishlist
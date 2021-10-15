import Api from '../../api/Api';

const cart = {
    namespaced :true,

    state :{
        carts:[],
        cartCount : 0,
        show : { showAll : false,showBlank: false },
        cartTotal : 0,
        totalWeight : 0,
        isFlahsale : false,
        flashsale : {},
        wishlistCount : 0,
        wishlists : [],
    },

    mutations : {
      
        GET_CART(state,carts){
            state.carts = carts;
        },
        CART_COUNT(state,cartCount) {
            state.cartCount = cartCount;
        },
        SHOW_CART(state,show){
            state.show = show;
        },
        SET_SHOW_CART(state,show){
            state.show = show;
        },
        CART_TOTAL(state,cartTotal){
            state.cartTotal = cartTotal;
        },
        TOTAL_WEIGHT(state,totalWeight) {
            state.totalWeight = totalWeight;
        },
        CLEAR_CART(state) {
            state.carts = [];
            state.cartTotal = 0;
            state.totalWeight = 0;
            state.cartCount = 0;
        },
        FLASHSALE_FINISH(state,isFlashsale){
            state.isFlahsale = isFlashsale;
        },
        FLASHSALE(state,flashsale){
            state.flashsale = flashsale;
        },
        
        GET_WISHLIST_COUNT(state,wishlistCount){
            state.wishlistCount = wishlistCount;
        },
        
        GET_WISHLIST(state,wishlists){
            state.wishlists = wishlists;
        }
    },

    actions :{
        async getTotalWeight({commit}){
            await Api.get('/cart/weight')
            .then((response) => {
                commit('TOTAL_WEIGHT',response.data.total);
            })
        },

        async getCartCount({commit}){
            
            const token = localStorage.getItem('token');
            
            Api.defaults.headers.common['Authorization'] = "Bearer "+ token;

            await Api.get('/cart/cartCount')
            .then(response => {

                commit('CART_COUNT',response.data.cartCount);
            })
            .catch((err) => {
                console.log(err);
            })
        },
        setShowCart({commit},show){
            commit('SET_SHOW_CART',show);
            // console.log(show);
        },

        async addToCart({ commit }, product){
            // return new Promise((resolve,reject) => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            Api.defaults.headers.common['Authorization'] = "Bearer "+ token

            return new Promise((resolve,reject) => {
                 Api.post('/cart',{
                    product_id:product.product_id,
                    color_id : product.color_id,
                    size_id : product.size_id,
                    price : product.price,
                    qty : product.qty,
                    weight : product.weight,
                    customer_id : user.id,
                    product_galleries_id : product.product_gallery
                })
                .then((response) => {
                    
                    commit('CART_COUNT',response.data.cartCount);
                    
                    if(response.data.success == true){
                        Api.get('/cart')
                            .then((response) => {
                                commit('GET_CART',response.data.cart)  
                            })
                                
                        Api.get('/cart/price',{
                                customer_id : user.id
                            })
                            .then((response) => {
                                commit('CART_TOTAL',response.data.total)
                            })
    
                            commit('SHOW_CART',true);
                    }
                    resolve(response);
                })
                .catch((error) => {
                    reject(error.response.data);
                })
            })
            // })
        },

        getAllCart({commit}){
            
            const token = localStorage.getItem('token');

            Api.defaults.headers.common['Authorization'] = "Bearer "+ token

            Api.get('/cart')
            .then((response) => {
                // console.log(response);
                commit('FLASHSALE',response.data.flashsale);
                commit('GET_CART',response.data.cart);
            })
        },

         deleteCartItem({ commit },cart_id){
            
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            // Api.defaults.headers.common['Authorization'] = "Bearer " +token

           return new Promise((resolve) => {
                Api.delete('/cart/remove',{
                    data : {
                        cart_id : cart_id
                    }
                })
                .then(() => {
                    
                    Api.get('/cart/cartCount')
                    .then(response => {
                        commit('CART_COUNT',response.data.cartCount);
                    })

                    Api.get('/cart/price',{
                        customer_id : user.id
                    })
                    .then((response) => {
                        commit('CART_TOTAL',response.data.total)
                        resolve(response);
                    })
                })
           })

        },

        updateQtyCart({ commit },{ cart,type,color_id }){
            console.log(type)

            const token = localStorage.getItem('token');

            const user = JSON.parse(localStorage.getItem('user'));
            
            let cart_price = cart.product.price - (cart.product.price * (cart.product.discount)/100);

            Api.defaults.headers.common['Authorization'] = "Bearer "+ token

            Api.post('/cart/updateQty',{
                product_id : cart.product.id,
                color_id : color_id,
                customer_id : user.id,
                weight : cart.product.weight,
                price : cart_price,
                type : type,
            })
            .then(() => {

                Api.get('/cart/price',{
                    customer_id : user.id
                })
                .then((response) => {
                    commit('CART_TOTAL',response.data.total)
                })

                Api.get('/cart')
                .then((response) => {
                    commit('GET_CART',response.data.cart)
                })
                
                Api.get('/cart/cartCount')
                .then(response => {
                    commit('CART_COUNT',response.data.cartCount);
                })

                
            })
        },

        cartTotal({ commit }){
            
            const token = localStorage.getItem('token');

            const user = JSON.parse(localStorage.getItem('user'));

            Api.defaults.headers.common['Authorization'] = "Bearer "+ token;

            Api.get('/cart/price',{
                customer_id : user.id
            })
            .then((response) => {
                commit('CART_TOTAL',response.data.total)
            })
        },

        checkout({ commit },data) {
            return new Promise((resolve,reject) => {
                Api.post('/checkout',data)
                .then((response) => {
                    resolve(response);

                    Api.post('/cart/removeAll')
                    .then(() => {
                        commit('CLEAR_CART')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                })
                .catch(error => {
                    reject(error)
                 })
            })
        },

        async getWishlist({commit}){
            
            const token = localStorage.getItem('token');

            Api.defaults.headers.common['Authorization'] = "Bearer" +token
            
            await Api.get(`/product-wishlist/wishlist`)
            .then((response) => {
                console.log(response);
                commit('GET_WISHLIST',response.data.wishlists);
                commit('GET_WISHLIST_COUNT',response.data.wishlistCount);
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },

    getters :{

    }
}

export default cart
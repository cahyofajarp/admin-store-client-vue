import Api from '../../api/Api';

const flashsale = {
    namespaced: true,

    state : {
        flashsales : [],
        title : '',
        countDown : 0,
        flashsale_master : {}
    },
    mutations : {
        GET_FLASHSALE(state,{flashsales,title,countDown}){
            state.flashsales = flashsales;
            state.title = title;
            state.countDown = countDown;
        },

        FLASHSALE_MASTER(state,flashsale_master){
            state.flashsale_master = flashsale_master
        }
    },
    actions : {
         getFlashsaleProduct({commit}){
            return new Promise((resolve) => {
                Api.get('/product/flashsale')
                .then((response) => {
                    resolve(response);
                    console.log(response);
                    if(response.data){
                        let flashsales = response.data.flashsales;
                        let title =  response.data.flashsales[0].flashsale.title;
                        let countDown = response.data.countDown;
                        let flashsale_master = response.data.flashsale_master;
                        
                        commit('FLASHSALE_MASTER',flashsale_master);
                        commit('GET_FLASHSALE',{flashsales,title,countDown});
                    }

                })
            })
        },

        deleteProductFlashsale({commit}) {
            Api.post('/product/flashsale/finish')
            .then((response) => {

                    const token = localStorage.getItem('token');
                    const user = JSON.parse(localStorage.getItem('user'));
                    
                    Api.defaults.headers.common['Authorization'] = "Bearer "+ token

                    // console.log(response);

                    let flashsales = response.data.flashsales;
                    let title =  '';
                    let countDown = response.data.countDown;
                    let flashsale_master = response.data.flashsale_master;

                    commit('FLASHSALE_MASTER',flashsale_master);
                    commit('GET_FLASHSALE',{flashsales,title,countDown});

                    Api.get('/cart')
                    .then((response) => {
                        commit('cart/GET_CART',response.data.cart, { root: true })  
                    })
                    
                    Api.get('/cart/cartCount')
                    .then(response => {
                        commit('cart/CART_COUNT',response.data.cartCount, { root: true });
                    })

                    Api.get('/cart/price',{
                        customer_id : user.id
                    })
    
                    .then((response) => {
                        commit('cart/CART_TOTAL',response.data.total, { root: true })
                    })
            })
        }
    },
    getters : {
        
    }

}

export default flashsale
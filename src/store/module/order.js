import Api from "../../api/Api";

const order = {
    namespaced : true,

    state : {
        orders         : [],
        detailOrder    : {},
        productInOrder : [],
        grandTotal     : 0,
    },
    
    mutations : {
        DETAIL_ORDER(state,{newDataorder,totalPrice}){
            state.detailOrder = newDataorder;
            state.grandTotal = totalPrice;
        },
        PRODUCT_IN_ORDER(state,product_in_order){
            state.productInOrder = product_in_order;
        },
        GET_ALL_ORDERS(state,orders){
            state.orders = orders;
        }
    },

    actions : {

        getAllOrders({commit},{page,date}){
            return new Promise((resolve,reject) => {
                
                let token = localStorage.getItem('token');
                
                Api.defaults.headers.common['Authorization'] = "Bearer "+token;

                Api.get(`/orders`,{
                    params : {
                        page      : page,
                        from_date : date.from_date,
                        to_date : date.to_date
                    }
                })
                .then((response) => {
                    console.log(response);
                    resolve(response);
                    commit('GET_ALL_ORDERS',response.data.data.data);
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error.response.data);
                    reject(error.response.data);
                })
            })
        },

        detailOrder({commit},snap_token) {
            return new Promise((resolve) => {
                
                    
                Api.get(`/order/${snap_token}`)
                .then((response) => {
                    resolve(response);
                    console.log(response);

                    let dataorder = response.data.data;
                    let newDataorder = {...dataorder,order_date : response.data.order_date};
                    
                    let totalPrice = response.data.totalOrder;

                    commit('DETAIL_ORDER',{newDataorder,totalPrice});
                    commit('PRODUCT_IN_ORDER',response.data.data.orders);
    
                })
            })
        },

        searchByDate({ commit },date){

           return new Promise((resolve,reject) => {
                let token = localStorage.getItem('token');
                Api.defaults.headers.common['Authorization'] = "Bearer "+token;
                
                Api.get('/order-search',{
                    params : {
                        from_date : date.from_date,
                        to_date : date.to_date
                    }
                })
                .then((response) => {
                    resolve(response);
                    commit('GET_ALL_ORDERS',response.data.data.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    reject(error.response.data);
                })
           })
        }
    },

    getters : {
        //getter detailOrder
        detailOrder(state) {
            return state.detailOrder
        },
    }
}

export default order
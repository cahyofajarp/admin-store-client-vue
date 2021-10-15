import Api from "../../api/Api";

const search = {
    namespaced : true,

    state : {
        products            : [],
        categories          : [],
        changeRouteSearch   : false,
    },
    mutations : {
        GET_DATA(state,{ products, categories }){
            state.products = products;
            state.categories = categories;
        },
        CHANGE_ROUTE(state,payload){
            state.changeRouteSearch = payload;
        }
    },

    actions : {
        search({commit}, keyword){
            return new Promise((resolve,reject) => {
                Api.post('/productSearch',{
                    // params : {
                        search : keyword
                    // }
                })
                .then((response) => {
                    let products = response.data.products;
                    let categories = response.data.categories;
                    commit('GET_DATA',{products,categories});
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        },
        changeRoute({commit},payload) {
            // let data = true;
            commit('CHANGE_ROUTE',payload);
        }
    },

    getters : {

    }
}

export default search;
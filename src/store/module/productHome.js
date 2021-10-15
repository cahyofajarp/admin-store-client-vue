import Api from '../../api/Api';

const productHome = {

    namespaced :true,

    state : {
        productHome : [],
        productHightlight : {}
    },

    mutations : {
        GET_PRODUCT_HOME(state,productHome) {
            state.productHome  = productHome;
        },
        GET_HIGHTLIGHT_PRODUCT(state,productHightlight) {
            state.productHightlight = productHightlight;
        }
    },

    actions :{
        async getProductHome({commit}){
            await Api.get('/productHome')
            .then((response) => {
                commit('GET_PRODUCT_HOME',response.data.product_home);
            })
            .catch((error) => {
                console.log(error);
            })
        },

        async getHighlightProduct({commit}) {
            await Api.get('/productHome/hightlight')
            .then((response) => {
                console.log(response);
                commit('GET_HIGHTLIGHT_PRODUCT',response.data.product_hightlight);
            })
        }
    },

    getters : {

    }
}

export default productHome
import Api from '../../api/Api';

const home = {
    namespaced:true,
    
    state : {
        categoryHomepage: [],
        bigCategory : {},
    },
    mutations : {
        GET_CATEGORY_HOME(state,categoriesHome){
            state.categoryHomepage = categoriesHome;
        },
        
        GET_BIG_CATEGORY_HOME(state,big_category){
            state.bigCategory = big_category;
        }
    },
    actions : {
        getCategoryHome({state,commit}) {
            Api.get('/categoryHome')
            .then(response => {
                let big_category = response.data.big_category;
                // console.log(big_category);
                let categories = response.data.categories;
                state.bigCategory = big_category;

                commit('GET_CATEGORY_HOME',categories);
                commit('GET_BIG_CATEGORY_HOME',big_category);
            })
            .catch(err => {
                console.log(err);
            });
        }
    },

    getters : {
        
    }

}

export default home 
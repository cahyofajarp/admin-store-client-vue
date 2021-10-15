import Api from '../../api/Api';
// import Auth from '@/api/Auth';

const auth = {
    namespaced: true,
    
    state : {
        token       : localStorage.getItem('token') || '',
        user        : JSON.parse(localStorage.getItem('user')) || {},
        userData    : null,
        authStatus  : false,
        checkEmail  : false,
    },

    mutations : {
        AUTH_SUCCESS(state,token,user){
            state.token = token;
            state.user = user;

        },
        NEW_TOKEN(state,token){
            state.token = token;

        },
        GET_USER(state,user) {
            state.user = user;
        },
        AUTH_LOGOUT(state){
            state.token = '';
            state.user = {}
        },

        SET_AUTHENTICATED(state,authStatus){
            state.authStatus = authStatus;
        },

        SET_USER(state,setUser){
            state.userData = setUser;
        },
        CHECK_EMAIL_VERIFIED(state,emailCheck){
            state.checkEmail = emailCheck;
        }
    },

    actions : {
        register({commit},user) {
            return new Promise((resolve,reject) => {
                Api.post('/register',{
                    name : user.name,
                    email : user.email,
                    password : user.password,
                    password_confirmation : user.password_confirmation,
                })
                .then((response) => {
                    
                    console.log(response);

                    const token = response.data.token;
                    const user  = response.data.user;

                    localStorage.setItem('token',token);
                    localStorage.setItem('user', JSON.stringify(user));

                    Api.defaults.headers.common['Authorization'] = "Bearer "+ token;

                    commit('AUTH_SUCCESS',token,user);

                    resolve(response); 
                })
                .catch((error) => {
                    localStorage.removeItem('token');

                    reject(error);
                })
            })
        },

        login({commit,dispatch}, user){
            return new Promise((resolve,reject) => {
                Api.post('/login',{
                    email    : user.email,
                    password : user.password
                })
                .then((response) => {
                    const token = response.data.token;
                    const user  = response.data.user 

                    localStorage.setItem('token',token);
                    localStorage.setItem('user', JSON.stringify(user));

                    Api.defaults.headers.common['Authorization'] = "Bearer "+ token

                    commit('AUTH_SUCCESS',token,user);

                    commit('GET_USER',user);

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

                    dispatch('checkEmailVerified');
                    resolve(response);

                })
                .catch((err) => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');

                    reject(err.response.data);
                })
            })
        },

        logout({commit}){
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT');

                localStorage.removeItem('token');
                localStorage.removeItem('user');


                delete Api.defaults.headers.common['Authorization'];

                resolve();
            });
        },

        checkEmailVerified({commit}){
            return new Promise((resolve,reject) => {
                Api.get('/checkVerified')
                .then(() => {
                    commit('CHECK_EMAIL_VERIFIED',true);
                    resolve();
                })
                .catch((error) => {
                    commit('CHECK_EMAIL_VERIFIED',false);
                    reject(error.response.data);
                })
            })
        }
        // refreshToken({ commit },token){
        //      return new Promise((resolve,reject) => {
        //          Api.post('/checkToken',{
        //             token : token
        //         })
        //         .then((response) => {
        //             console.log(response);
        //             // if(response.data.success == false && response.data.message == "Token Expired"){
        //             //     if(response.data.new_token){
        //             //         // router.push({name : 'dashboard'})
                            
        //             //         const tokenLocal = response.data.new_token;
                            
        //             //         localStorage.setItem('token',response.data.new_token);
                            
        //             //         commit('NEW_TOKEN',tokenLocal)
                            
        //             //         resolve(response);
        //             //     }
                        
        //             // }
        //             // else{
        //             //     resolve(response)

        //             // }
                    
        //         })
        //         .catch(err => {
        //             Api.post('/refresh')
        //             reject(err);

        //         }) 
        //      })
             
        // },

        //------------------------ different way -----------------------------------------------

        // async login({ dispatch }, payload ){
        //     await Auth.get('/sanctum/csrf-cookie');
        //     await Auth.post('/login',payload);

        //     dispatch('user')
        // },

        // async user({commit}){
        //     await Api.get('/user')
        //     .then((response) => {
        //         commit('SET_AUTHENTICATED',true);
        //         commit('SET_USER',response.data);
        //     })
        //     .catch((error) => {
        //         commit('SET_AUTHENTICATED',false);
        //         commit('SET_USER',null);
        //         console.log(error);
        //     })
        // }
    },

    getters : {
        currentUser(state){
            return state.user
        },

        isLoggedIn(state){
            return state.token;
        },

        checkEmail(state){
            return state.checkEmail;
        }
    }
}

export default auth
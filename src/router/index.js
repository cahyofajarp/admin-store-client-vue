//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//import store vuex
import store from '@/store'
// import {computed} from 'vue';

//define a routes
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '@/views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '@/views/auth/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "login" */ '@/views/home/Home.vue'),
    },
    {
        path: '/product',
        name: 'product',
        component: () => import( /* webpackChunkName: "login" */ '@/views/product/Product.vue'),
    },
    
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "login" */ '@/views/dashboard/Dashboard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/email/verification',
        name: 'verification-email',
        component: () => import( /* webpackChunkName: "login" */ '@/views/email/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    
    {
        path: '/product/:slug',
        name: 'product_detail',
        component: () => import( /* webpackChunkName: "login" */ '@/views/product_detail/ProductDetail.vue'),
    
    }, 
    {
        path: '/product/category/:category_slug',
        name: 'product_category',
        component: () => import( /* webpackChunkName: "login" */ '@/views/product_category/ProductCategory.vue'),
    
    }, 
    
    {
        path: '/cart',
        name: 'cart',
        component: () => import( /* webpackChunkName: "login" */ '@/views/cart/Cart.vue'),
        meta: {
            requiresAuth: true
        },
        
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () => import( /* webpackChunkName: "login" */ '@/views/order/Order.vue'),
        meta: {
            requiresAuth: true
        }
        
    },
    
    {
        path: '/customer/order/:snap_token',
        name: 'order_detail',
        component: () => import( /* webpackChunkName: "login" */ '@/views/order/OrderDetail.vue'),
        meta: {
            requiresAuth: true
        },
        
    },
    
    {
        path: '/product/wishlist',
        name: 'wishlist',
        component: () => import( /* webpackChunkName: "login" */ '@/views/wishlist/Index.vue'),
        meta: {
            requiresAuth: true
        },
        
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes
})


// const checkEmailVerified = onMounted(async() => {
//     await store.dispatch('auth/checkEmailVerified')

//     if(!checkEmail.value){
//         router.push({name : 'verification-email'});
//     }   
// })

router.beforeEach(async (to, from, next) => {
    // window.scrollTo(0, 0)
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(store.getters['auth/isLoggedIn']){ 
            // if(store.getters['auth/checkEmail'] == false){
            //     next('/email/verification');
            //     return;
            // }
                next();
                return;
        }
        next('/login');
    }
    else{
        next();
    }

})


export default router
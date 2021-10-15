import { createStore } from 'vuex';
import auth from './module/auth';
import home from './module/home';
import slider from './module/slider';
import productHome from './module/productHome';
import productDetail from './module/productDetail';
import cart from './module/cart';
import product from './module/product';
import order from './module/order';
import flashsale from './module/flashsale';
import wishlist from './module/wishlist';
import search from './module/search';

export default createStore({
    modules : {
        auth,
        home,
        slider,
        productHome,
        productDetail,
        cart,
        product,
        order,
        flashsale,
        wishlist,
        search,
    }
});
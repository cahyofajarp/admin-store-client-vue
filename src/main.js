import { createApp } from 'vue'
import App from './App.vue'

// import jQuery from 'jquery';
// window.$ = jQuery;

// import './index.css'
//import router
import router from './router'
import store from './store';

// import './index.css'

/** Jquery */

// import '../public/js/main.js';

// import VueSwal from 'vue-swal'
import  VueSweetalert2  from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(VueSweetalert2);
//gunakan router di vue js dengan plugin "use"
app.use(router)
app.use(store)

app.mixin({
    
    methods: {

        //money thousands
        moneyFormat(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price * (product.discount)/100)
        },

        calculateDiscountCustom(price,discount) {
            return price - (price * (discount)/100);
        }

    }
});

app.mount('#app')
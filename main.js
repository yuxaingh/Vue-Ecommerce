import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router.js';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';
import product_data from './product.js';

Vue.use(VueRouter);
Vue.use(Vuex);
//Router Config
const RouterConfig = {
    //Use HTML5 history router mode
    mode: 'history',
    routes: Routers
}
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

//Remove duplicate in array
function getFilterArray(array){
    const res = [];
    const json = {};
    for(let i = 0; i < array.length; i++){
        const _self = array[i];
        if(!json[_self]){
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}

const store = new Vuex.Store({
    state: {
        productList: [],
        cartList: []
    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
        }
    },
    mutations: {
        setProductList(state, data) {
            state.productList = data;
        },
        addCart(state, id){
            const isAdded = state.cartList.find(item => item.id === id);
            if(isAdded){
                isAdded.count++;
            }else{
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        editCartCount(state, payload){
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        deleteCart(state, id){
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        emptyCart(state){
            state.cartList = [];
        }
    },
    actions: {
        getProductList(context){
            //Simulate retreiving data through ajax 
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        },
        buy(context){
            //Simulates ajax buy process
            return new Promise(resolve => {
                context.commit('emptyCart');
                resolve();
            }, 500);
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});
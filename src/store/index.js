import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const url = "http://localhost:8000/products";
const headers = { Accept: "application/json" };


export default new Vuex.Store({

    state: {
        products: [],
    },
    mutations: { //synchronous
        setProducts(state, payload) {
            state.products = payload;
        }
    },
    actions: { //asynchronous
        async getProducts(state) {
            const products = await fetch(url, { headers });
            const prods = await products.json();
            state.commit("setProducts", prods);
            console.log(prods);
        }
    },
})

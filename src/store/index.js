import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//var url;
//const headers = { Accept: "application/json" };

export default new Vuex.Store({
    state: {
        products: [],
        inCart: [],
        hiredConsultants: [],
        user: {
            isAuthenticated: false,
            name: "",
            email: "",
            idToken: "",
            accessToken: "",
            partner: false
        },
        endpoints: {
            login: "http://localhost:3000/login",
            partnercheck: "http://localhost:8000/check",
            products: "http://localhost:8000/products",
            hiredConsultants: "http://localhost:8000/hiredConsultants",
            consultant: "http://localhost:8080/Consultant"
        },
    },
    getters: {
        products: state => state.products,
        inCart: state => state.inCart,
        hiredConsultants: state => state.hiredConsultants,
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload;
        },
        addToCart(state, payload) {
            console.log('test');
            console.log(payload);

            if (state.inCart.length === 1) {
                state.inCart.pop();
            }
            // Only 1 investor in cart

            state.inCart.push(payload);

        },
        removeFromCart(state, item) {
            state.inCart.splice(item, 1);
        },
        logout(state) {
            state.user.isAuthenticated = false;
            state.user.name = "";
            state.user.email = "";
            state.user.idToken = "";
            state.user.accessToken = "";
            state.user.partner = "";
        },
        login(state, payload) {
            state.user.isAuthenticated = true;
            state.user.name = payload.name;
            state.user.email = payload.email;
            state.user.idToken = payload.idToken;
            state.user.accessToken = payload.accessToken;
        },
        /*setUrls(state) {
            state.endpoints.login = process.env.VUE_APP_AUTH_URL;
            state.endpoints.products = process.env.VUE_APP_PRODUCTS_URL;
            url = state.endpoints.products;
            console.log(process.env);
        },*/
        SET_PARTNER(state, partner) {
            state.user.partner = partner;
        },
        hireItem(state, payload) {
            console.log("test2");
            state.hiredConsultants.push(payload);
        }
    },
    actions: {
        async checkPartner({state, commit}) {
            let accessToken = state.user.accessToken;
            console.log("checking partner access", state.endpoints.partnercheck);
            const AuthStr = 'Bearer '.concat(accessToken);
            const AuthHeader = {'Authorization': AuthStr};
            console.log("AuthToken=", AuthHeader);
            let response = await fetch(state.endpoints.partnercheck, {
                method: 'GET',
                headers: {
                    'Authorization': AuthStr
                }
            });
            console.log("partneraccess", response);
            if (response.ok) {
                commit('SET_PARTNER', true);
                console.log("TRUE");
            } else {
                commit('SET_PARTNER', false);
                console.log("FALSE");
            }
        },
        registerProduct({state}, obj) {
            let productsurl = state.endpoints.products;
            console.log(productsurl);
            let accessToken = state.user.accessToken;
            const AuthStr = 'Bearer '.concat(accessToken);
            console.log(AuthStr);
            console.log(obj);
            axios(productsurl, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': AuthStr
                },
                credentials: 'include',
                data: obj
            })
                .then(response => {
                    console.log('Response:', response);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        async getProducts({state}) {
            const products = await fetch(state.endpoints.products);
            console.log(products);
            const prods = await products.json();
            console.log(state);
            //state.products("setProducts", prods);
            state.products = prods;
            console.log(prods);
        },
        hireItem({state}, item) {
            const itemFetch = fetch(state.endpoints.hiredConsultants + '/' + item.id);
            const itemJson = itemFetch.json();

            console.log(itemJson);

            console.log("can we get here??")
        }
    },
    modules: {}
})
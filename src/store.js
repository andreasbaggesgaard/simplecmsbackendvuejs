import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from "@/router/index"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        UserAuth: false
    },
    getters: {
        GetAuthStatus(state) {
            return state.UserAuth;
        }
    },
    mutations: {  
        SetAuthStatus (state, payload) {
            state.UserAuth = payload;
        }
    }, 
    actions: {
        UserIsAuthenticated ({commit}) {
          let self = this; 
            commit('SetAuthStatus', true);  
        }


    } 
});
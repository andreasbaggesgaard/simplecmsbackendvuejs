import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from "@/router/index"
//import { config } from "../test"

Vue.use(Vuex)

// Simplecms API calls
const api = "http://simplecmsapi.azurewebsites.net/api/"
// Project
const apiGetProject = api + "project/"
const apiGetAllProject = api + "project/all/"

// User
const apiGetUserAuth = api + "user/authenticated"
const apiPostLogin = api + "user/login"
const apiUserLogout = api + "user/logout"


export const store = new Vuex.Store({
    state: {
        Project: [],
        UserAuth: "",
        UserID: "",
        ApiSuccess: "0",
        ApiError: "0",
        Configured: ""
    },
    getters: {
        GetProjectObject: state => state.Project,
        GetAuthStatus: state => state.UserAuth,
        GetApiResponse(state) {
            let obj = {s: state.ApiSuccess, e: state.ApiError}
            return obj;
        },
        GetConfigStatus(state) {
            return state.Configured;
        }
    },
    mutations: {    
        SetAuthStatus (state, payload) {
            state.UserAuth = payload;
        },
        SetUserID (state, payload) {
            state.UserID = payload;
        },
        SetApiSuccess (state, payload) {
            state.ApiSuccess = payload;
        },
        SetApiError (state, payload) {
            state.ApiError = payload;
        },
        SetConfigured (state, payload) {
            state.Configured = payload;
        },
        SetProject (state, payload) {
            state.Project = payload;
        },
        GetUserID (state) {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", "uid.txt", false); 
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        state.UserID = allText;
                    }                   
                }
            }
            rawFile.send(null);
        },
        GetProject (state) {
            axios.get(apiGetProject + state.UserID)
            .then(function (response) {
                state.Project = response.data;
                response.data.configured === false ? state.Configured = false : state.Configured = true;
                console.log(response);  
            })
            .catch(function (error) { console.log(error); });
        },
        UserIsAuthenticated (state) {
            var uid = state.UserID;
            console.log(uid);
            localStorage.getItem('simplecmsloggedinTrue') === null ? state.UserAuth = false : state.UserAuth = true;
            
            /*axios.get(apiGetUserAuth)
            .then(function (response) { console.log("auth? " + response.data); })
            .catch(function (error) { console.log(error); });  */          
        },
    }, 
    actions: {
        Login (context, { u, p }) {
            console.log(u);
            console.log(p);
            let obj = { Username: u, Password: p};
            axios.post(apiPostLogin, obj)
            .then(function (response) { 
                localStorage.setItem('simplecmsloggedinTrue', true); 
                console.log(response.status); 
                context.commit('SetAuthStatus', true); 
                context.commit('SetApiSuccess', "200");
                context.commit('SetApiError', "0");
            })
            .catch(function (error) { context.commit('SetApiError', "400"); context.commit('SetApiSuccess', "0"); });
        }, 
        Logout (context) {
            localStorage.removeItem('simplecmsloggedinTrue');
            context.commit('SetAuthStatus', false); 
            //axios.post(apiUserLogout).then(function (response) {console.log(response);}).catch(function (error) {console.log(error);});
        },      
        EditProject (context, project) {
            let obj = {
              ID: context.state.UserID,
              Name: project.Name,
              Background: project.Background,
              NavbarColor: project.NavbarColor,
              Theme: project.Theme,
              Configured: project.Configured
            }
            axios.put(apiGetProject + context.state.UserID, obj)
            .then(function (response) {
                console.log(response);
                context.commit('SetProject', obj);
                context.commit('SetConfigured', true); 
            })
            .catch(function (error) { console.log(error); }); 
        }
    } 
});
 


import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from "@/router/index"
//import { config } from "../test"
import orderBy from "lodash/orderBy"

//TODO: setup with modules

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
// Items
const apiGetItems = api + "item/";
const apiNewItem = api + "item/new";
const apiDeleteItem = api + "item/";
// Contenttypes
const apiGetContentTypes = api + "contenttype/";
// Pages
const apiGetPages = api + "pages/";
const apiNewPage = api + "pages/new";
const apiDeletePage = api + "pages/";
// Templates
const apiGetTemplates = api + "template/";


export const store = new Vuex.Store({
    state: {
        Dialog: false,
        Project: [],
        UserAuth: "",
        UserID: "",
        ApiSuccess: 0,
        ApiError: 0,
        Configured: "",
        Items: [],
        PageItems: [],
        SelectedItemID: "",
        ContentTypes: [],
        Pages: [],
        Templates: []
    },
    getters: {
        GetDialogVal: state => state.Dialog,
        GetProjectObject: state => state.Project,
        GetAuthStatus: state => state.UserAuth,
        GetConfigStatus: state => state.Configured,
        GetAllItems: state => state.Items,
        GetEditItem: state => state.Items.filter(item => item.id == state.SelectedItemID),
        GetAllContentTypes: state => state.ContentTypes,
        GetAllPages: state => state.Pages,
        GetAllTemplates: state => state.Templates,
        GetApiResponse(state) {
            let obj = {s: state.ApiSuccess, e: state.ApiError}
            return obj;
        },
        GetISorted(state) {
            let items = orderBy(state.PageItems, ['sortNumber'], ['asc']);
            return items;
        },
    },
    mutations: {   
        SetDialog (state, payload) {
            state.Dialog = payload;
        }, 
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
        SetSelectedItemID (state, payload) {
            state.SelectedItemID = payload;
        },
        SetItems(state, payload) {
            state.Items = payload;
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
            }).catch(function (error) { console.log(error); });
        },
        UserIsAuthenticated (state) {
            var uid = state.UserID;
            console.log(uid);
            localStorage.getItem('simplecmsloggedinTrue') === null ? state.UserAuth = false : state.UserAuth = true;           
            /*axios.get(apiGetUserAuth)
            .then(function (response) { console.log("auth? " + response.data); })
            .catch(function (error) { console.log(error); });  */          
        },
        GetItems (state) {
            axios.get(apiGetItems + state.UserID)
            .then(function (response) {
                state.Items = response.data;
            }).catch(function (error) { console.log(error); });
        },
        GetPageItems (state, pageid) {
            axios.get(apiGetItems + state.UserID + "/" + pageid)
            .then(function (response) {
                state.PageItems = response.data;
            }).catch(function (error) { console.log(error); });
        },
        GetContentTypes (state) {
            axios.get(apiGetContentTypes)
            .then(function (response) {
                state.ContentTypes = response.data;
            }).catch(function (error) { console.log(error); });
        },
        GetPages (state) {
            axios.get(apiGetPages + state.UserID)
            .then(function (response) {
                state.Pages = response.data;
                //console.log("pages " + JSON.stringify(response));  
            }).catch(function (error) { console.log(error); });
        },
        GetTemplates (state) {
            axios.get(apiGetTemplates + state.UserID)
            .then(function (response) {
                state.Templates = response.data;
                //console.log("templates " + JSON.stringify(response));  
            }).catch(function (error) { console.log(error); });
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
                context.commit('SetApiSuccess', 200);
                context.commit('SetApiError', 0);
                if(!context.state.Project.configured) { router.push('/setup'); } else { router.push('/admin'); }               
            })
            .catch(function (error) { context.commit('SetApiError', 400); context.commit('SetApiSuccess', 0); });
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
        },
        NewItem (context, item) {
            let obj = {
              Name: item.Name,
              Title: item.Title,
              Text: item.Text,
              Image: item.Image,
              SortNumber: 100,
              PageID: item.PageID, 
              ProjectID: context.state.UserID
            }
            console.log(obj);
            axios.post(apiNewItem, obj)
            .then(function (response) {
                console.log(response); 
            }).catch(function (error) { console.log(error); }); 
        },
        DeleteItem (context, id) {
            axios.delete(apiDeleteItem + id)
            .then(function (response) { console.log(response); })
            .catch(function (error) { console.log(error); }); 
        },
        EditItem (context, item) {
            let obj = {
              ID: item.ID,
              Name: item.Name,
              Title: item.Title,
              Text: item.Text,
              Image: item.Image,
              SortNumber: item.SortNumber,
              //PageID: item.pageID
            }
            axios.put(apiGetItems + obj.ID, obj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) { console.log(error); }); 
        },
        NewPage (context, page) {
            let obj = {
              Name: page.Name,
              Title: page.Title,
              Text: page.Text,
              Image: page.Image,
              TemplateID: page.TemplateID, 
              ProjectID: context.state.UserID
            }
            axios.post(apiNewPage, obj)
            .then(function (response) { console.log(response); }).catch(function (error) { console.log(error); }); 
        },
        DeletePage (context, id) {
            axios.delete(apiDeletePage + id)
            .then(function (response) { console.log(response); })
            .catch(function (error) { console.log(error); }); 
        },
        EditPage (context, page) {
            let obj = {
              ID: page.ID,
              Name: page.Name,
              Title: page.Title,
              Text: page.Text,
              Image: page.Image,
              TemplateID: page.TemplateID
            }
            axios.put(apiGetPages + obj.ID, obj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) { console.log(error); }); 
        },
    } 
});
 


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
const apiGetItems = api + "item/"
const apiNewItem = api + "item/new"
const apiDeleteItem = api + "item/"
// Contenttypes
const apiGetContentTypes = api + "contenttype/"
// Pages
const apiGetPages = api + "pages/"
const apiNewPage = api + "pages/new"
const apiDeletePage = api + "pages/"
// Templates
const apiGetTemplates = api + "template/"
// menu
const apiGetMenu = api + "menu/"
const apiNewMenu = api + "menu/new"
const apiDeleteMenuItem = api + "menu/";


export const store = new Vuex.Store({
    state: {
        Dialog: false,
        DialogEdit: false,
        DialogClose: false,
        DialogClose2: false,
        Project: [],
        UserAuth: "",
        UserID: "",
        ApiSuccess: "",
        ApiError: "",
        Configured: "",
        Items: [],
        PageItems: [],
        SelectedItemID: "",
        ContentTypes: [],
        Pages: [],
        Templates: [],
        UploadedImage: "",
        ImageCleared: false,
        ItemImage: "",
        MenuItem: []
    },
    getters: {
        GetDialogVal: state => state.Dialog,
        GetDialogEditVal: state => state.DialogEdit,
        GetDialogClose: state => state.DialogClose,
        GetDialogClose2: state => state.DialogClose2,
        GetProjectObject: state => state.Project,
        GetAuthStatus: state => state.UserAuth,
        GetConfigStatus: state => state.Configured,
        GetAllItems: state => state.Items,
        GetPageItemsIndex: state => state.PageItems.length,
        GetEditItem: state => state.Items.filter(item => item.id == state.SelectedItemID),
        GetAllContentTypes: state => state.ContentTypes,
        GetAllPages: state => state.Pages,
        GetAllTemplates: state => state.Templates,
        GetUploadedImage: state => state.UploadedImage,
        GetImageCleared: state => state.ImageCleared,
        GetItemImage: state => state.ItemImage,
        GetMenuItem: state => state.MenuItem,
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
        SetEditDialog (state, payload) {
            state.DialogEdit = payload;
        }, 
        SetDialogClose (state, payload) {
            state.DialogClose = payload;
        }, 
        SetDialogClose2 (state, payload) {
            state.DialogClose2 = payload;
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
        SetPages(state, payload) {
            state.Pages = payload;
        },
        SetPageItems(state, payload) {
            state.PageItems = payload;
        },
        SetUploadedImage(state, payload) {
            state.UploadedImage = payload;
        },
        SetImageCleared(state, payload) {
            state.ImageCleared = payload;
        },
        SetItemImage(state, payload) {
            state.ItemImage = payload;
        },
        SetMenuItem(state, payload) {
            state.MenuItem = payload;
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
            axios.get(apiGetUserAuth)
            .then(function (response) { console.log("auth? " + response.data); })
            .catch(function (error) { console.log(error); });          
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
            }).catch(function (error) { console.log(error); });
        },
        GetMenuItems (state) {
            axios.get(apiGetMenu + state.UserID)
            .then(function (response) {
                state.MenuItem = response.data;
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
              SortNumber: item.Index + 1,
              ContentTypeID: item.ContentTypeID,
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
              SortNumber: item.SortNumber
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
        NewMenuItem (context, menuitem) {
            let obj = {
              PageID: menuitem.PageID,  
              ProjectID: context.state.UserID
            }
            console.log("post menu: ", obj);
            axios.post(apiNewMenu, obj)
            .then(function (response) { console.log(response); }).catch(function (error) { console.log(error); }); 
        },
        DeleteMenuItem (context, id) {
            console.log("delete menu: ", id);
            axios.delete(apiDeleteMenuItem + id)
            .then(function (response) { console.log(response); })
            .catch(function (error) { console.log(error); }); 
        },
    } 
});
 


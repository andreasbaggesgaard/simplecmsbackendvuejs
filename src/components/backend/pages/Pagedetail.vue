<template>
  <div>

    <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container id="editor-page">
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>

      <el-breadcrumb separator-class="el-icon-arrow-right" id="bread">
        <el-breadcrumb-item :to="{ path: '/admin' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/pages' }">Pages</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.params.id}}</el-breadcrumb-item>
      </el-breadcrumb>

      <div>
          <el-row :gutter="0" type="flex" justify="center">
            <el-col :xs="24" :span="12">
              <h2 class="e-title">Page editor</h2>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :md="14">
              <el-alert
                title=""
                type="info"
                description="Here you have two options. Edit what you have already filled out, and assign items to the this page."
                show-icon style="margin-bottom:4%;" :closable="false">
              </el-alert>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="24">
              <h3 class="hr hr--1">Step 1 - Edit page info</h3>
            </el-col>
          </el-row>

    <el-row>
      <el-col :xs="24" :span="12">

        <el-row style="padding-left:5%;padding-right:5%;">
            <el-col :xs="24" :sm="12" :md="12"  v-for="(template, index) in JSON.parse(Templates)" :key="index" style="padding:5px">
              <el-card :body-style="{ padding: '10px' }" v-bind:class="{ selected01: template.id == templateID }">
               <img v-bind:src="template.previewImage" class="image" style="max-height:140px;">
                <div style="padding: 0px;">
                  <h3 style="font-weight:lighter">{{template.name}}</h3> 
                  <div class="bottom clearfix">
                    <button type="text" class="mybutton02 button" v-bind:class="{ selected02: template.id == templateID }" @click="GetT(template)" v-bind:id="template.id">Select</button>
                  </div>  
                </div>
                <input type="hidden" v-bind:value="template.id == templateID ? preTemplateName = template.name : ''" />
              </el-card>
            </el-col>
          </el-row>
          
      </el-col>
      <el-col :xs="24" :span="11">

          <div v-for="page in Pages">
              <div v-if="page.id == $route.params.id">
              <input type="hidden" v-bind:value="templateID = page.templateID" />
              <input type="hidden" v-bind:value="pageTitle = page.title" />
              <input type="hidden" v-bind:value="pageText = page.text" />
              <input type="hidden" v-bind:value="pageImg = page.image" />
                  <el-form :xs="24" :span="8" ref="pageForm">
                    <el-form-item label="* Name">
                        <el-input v-model="page.name"></el-input>
                      </el-form-item>

                      <el-form-item label="Title">
                        <el-input v-model="page.title"></el-input>
                      </el-form-item>

                      <el-form-item label="Text">
                        <el-input v-model="page.text"></el-input>
                      </el-form-item>

                      <el-form-item label="Image"><br />  
                          <div v-if="removeImage && !imageUploaded">
                                <uploadimage original="" bool="true"></uploadimage>  
                            </div>
                            <div v-else>
                                <uploadimage v-bind:original="pageImg" bool="true"></uploadimage>  
                            </div>                
                          <el-button type="text" v-if="!imageUploaded && pageImg.length > 0" @click="RemoveImage()">Remove image</el-button>
                          <input type="hidden" v-bind:value="imageUploaded = UploadedImage" />
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="submitForm('pageForm', page)" style="display: none;" id="og-button">Save</el-button>
                      </el-form-item>
                  </el-form>
              </div>
           </div>
      </el-col>
    </el-row>

        <div id="items-container" v-loading="loading">
          <el-row>
            <el-col :md="24">
              <h3 class="hr">Step 2 - Assign items to this page</h3>
              <p id="how-to">When you have created an item, then you can drag them up and down in the list to the right. The preview of the page will be displayed accordingly to the template you have selected.</p>


                <el-button type="primary" class="hr--2" plain @click="OpenDialog">Create new item +</el-button>

                <el-dialog
                  title=""
                  :visible.sync="Dialog"
                  width="70%"
                  :before-close="handleClose">
                  <createitem :pid="$route.params.id"></createitem>                 
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="Dialog = false">Close</el-button>           
                  </span>
                </el-dialog>

                <el-dialog
                  title=""
                  :visible.sync="EditDialog"
                  width="70%"
                  :before-close="handleClose">
                 <itemdetail v-bind:itemID="selectedItemID"></itemdetail>                
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="EditDialog = false">Close</el-button>       
                  </span>
                </el-dialog>

            </el-col>
          </el-row>

            <el-row v-loading="loadingItems" id="iSection">

              <el-tooltip content="Something wrong ? Try to refresh." placement="top">
                <el-button type="text" icon="el-icon-refresh" plain @click="Refresh()" style="float:left;margin-left:5%">Refresh</el-button>
              </el-tooltip><br /><br />

              <el-col :xs="24" :span="12" id="pp-con">

              <el-card id="page-preview">
                  <el-tooltip class="" effect="dark" content="Edit step 1 and you'll see the changes here" placement="top">
                  <el-row id="pre-top">
                        <el-col :md="12">
                            <h3 v-if="pageTitle">{{pageTitle}}</h3>
                            <h5 style="font-weight:lighter" v-if="pageText">{{pageText}}</h5>
                        </el-col>
          
                      <el-col :md="12" id="pre-img">
                          <div v-if="removeImage && !imageUploaded">
                              <p>No image</p>
                          </div>
                          <div v-else>
                              <img v-if="!imageUploaded" v-bind:src="pageImg" alt="" width="100%" />
                              <img v-else v-bind:src="imageUploaded" alt="" width="100%" />
                          </div>                      
                      </el-col>
                  </el-row> 
                </el-tooltip>
                <br />
                <layout :selectedID="selectedPreTemplateName" :templateID="preTemplateName" :preview="true" :data="0" :page="0"></layout>

              </el-card>

              </el-col>

               <el-col :xs="24" :span="12">
          
                <div id="drag-container">

                  <draggable v-model="itemOrder" v-if="ItemsNumber > 0" :options="{draggable:'.drag-box'}" @change="log" @start="drag=true" @end="drag=false">

                    <div v-for="(item, index) in itemOrder" :key="index" class="drag-box" v-bind:id="item.sortNumber = index + 1">
                        <div class="drag-img">
                          <img src="../../../assets/arrow.png" width="15" height="auto" id="drag-icon" />                      
                        </div>
                        <div class="drag-text">
                        <el-tag type="info">{{index + 1}}</el-tag>
                          <h3>{{item.name}}</h3> 
                        </div>
                        <div class="drag-action">
                            <el-button @click="handleEdit(item)" class="drag-button">Edit</el-button>
                            <el-button @click="handleDelete(item)" class="drag-button" type="danger">Delete</el-button>
                        </div>
                    </div>                  

                </draggable>
                <el-alert title="This page has no items yet." type="warning" show-icon :closable="false" id="iWarning" v-else></el-alert>
                

                </div>

              </el-col>
                <el-button type="primary" plain @click="back">Cancel</el-button>
                <el-button type="primary" @click="SavePage()" >Save page</el-button>
          </el-row>

        </div>


  </div>

    </el-container>
  </el-container>

  </div>
</template>

<script>
import $ from "jquery"
import sidenav from "@/components/backend/Sidenav"
import draggable from 'vuedraggable'
import createitem from "@/components/backend/items/CreateItem"
import compareArrays from 'lodash/isequal'
import forEach from 'lodash/foreach'
import layout from '@/components/backend/items/Layout'
import itemdetail from '@/components/backend/items/Itemdetail'
import uploadimage from '@/components/backend/Uploadimage'


  export default {
    data() {
      return {
        id: "",
        loading: false,
        loadingItems: false,
        templateID: "",
        selectedID: "",
        preTemplateName: "",
        selectedPreTemplateName: "",
        dialogVisible: false,
        itemOrder: [],
        newItemOrder: [],
        pageTitle: "",
        pageText: "",
        pageImg: "",
        selectedItemID: "",
        close: "",
        close2: "",
        imageUploaded: "",
        removeImage: false,
        imageForUpload: ""
      }
    },
    beforeCreate () {
      this.$store.commit('GetUserID');
      this.$store.commit('GetPages'); 
      this.$store.commit('GetTemplates'); 
      this.$store.commit('GetPageItems', this.$route.params.id);  
      this.$store.commit('SetImageCleared', false); 
      this.itemOrder = [];
      this.newItemOrder = [];
    },
    created () {   
      this.$store.commit('SetUploadedImage', "");
      this.loadingItems = true; 
      let self = this;
      setTimeout(function(){ 
        self.itemOrder = self.$store.getters.GetISorted;
        self.newItemOrder = self.$store.getters.GetISorted;
        self.loadingItems = false;
       }, 3000);             
    },
    watch: {
        Dialog: function(val) {
          if(val == false && this.close != true) { 
            this.resetItems();
          }
        },
        EditDialog: function(val) {
          if(val == false) { 
            if(!this.close2) {
              this.resetItems();
            } else {
              this.rebuildItems();
            }           
          }
        }
    },
    methods: { 
      Refresh () {
        this.resetItems();
      },
      RemoveImage () {
        this.removeImage = true;
      },
      SavePage () {
        $("#og-button").click();
      },
      resetItems () {
          this.loadingItems = true;          
          this.itemOrder = [];
          let self = this;
          setTimeout(function(){ 
            self.$store.commit('GetPageItems', self.$route.params.id);
            self.$store.commit('GetItems'); 
          }, 2000);
          setTimeout(function(){ 
            self.itemOrder = self.$store.getters.GetISorted;
            self.loadingItems = false; 
          }, 5000); 
      },
      rebuildItems () {      
          this.itemOrder = [];
          this.itemOrder = this.$store.getters.GetISorted;
      },
      OpenDialog () {
        this.$store.commit('SetDialog', true);
        this.$store.commit('SetDialogClose', true);
      },
      handleClose(done) {    
        this.$store.commit('SetDialogClose', false);    
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      back () {
        this.$router.push("/pages");
      },
      FetchPages(name) {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          self.$store.commit('GetPages');   
          self.$store.getters.GetAllPages;
          self.$router.push("/pages");          
          self.$message({
              type: 'success',
              message: name + ' saved'
            });
          self.loading = false;
          self.$store.commit('SetUploadedImage', ""); 
        }, 3000); 
      },
      GetT (template) {
        this.selectedID = template.id;
        this.selectedPreTemplateName = template.name;
        $('.el-card').removeClass('selected01');
        $('.mybutton02').removeClass('selected02');
        $("#" + template.id).parent().parent().parent().parent().addClass('selected01');
        $("#" + template.id).addClass('selected02');
        console.log(this.selectedID);
      },
       submitForm(formName, page) {          
        if (page.name != "") {

          if(!compareArrays(this.newItemOrder, this.itemOrder)) {
            let self = this;
            forEach(this.itemOrder, function(value, key){
              let itm = {
                  ID: value.id,
                  Name: value.name,
                  Title: value.title,
                  Text: value.text,
                  Image: value.image,
                  SortNumber: value.sortNumber
                }
                self.$store.dispatch('EditItem', itm);  
                console.log("val? " , value)
            });
          }  

          if(this.imageUploaded) {
            this.imageForUpload = this.imageUploaded;
          } else { this.imageForUpload = page.image } 

          let obj = {
            ID: page.id,
            Name: page.name,
            Title: page.title,
            Text: page.text,
            Image: this.removeImage ? "" : this.imageForUpload,
            TemplateID: this.selectedID == "" ? this.templateID : this.selectedID
          }
          this.$store.dispatch('EditPage', obj);    
          this.FetchPages(page.name);                  
        } else { 
          this.$message.error('The name has to be filled out.');
          return false;            
          }
      },
      handleEdit(item) {
        this.selectedItemID = item.id;
        this.$store.commit('SetEditDialog', true);
        this.$store.commit('SetDialogClose2', true); 
        this.$store.commit('SetItemImage', ""); 
      },
      handleDelete(item) {
        this.$confirm('This will permanently delete ' + item.name + '. Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel', 
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeleteItem', item.id);    
          this.resetItems();   
          let self = this;  
          setTimeout(function(){ 
            self.$message({
              type: 'success',
              message: 'Delete completed'
            });
          }, 5000); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });   
      },
      log: function (evt){
				console.log(evt)
			}
    },
    computed: {
        Pages () {
          return this.$store.getters.GetAllPages;
        },
        Templates () {
          return JSON.stringify(this.$store.getters.GetAllTemplates);
        },
        UploadedImage () {
            return this.$store.getters.GetUploadedImage;
        },
        ImageCleared () {
            return this.$store.getters.GetImageCleared;
        },
        ItemsNumber () {
          return this.$store.getters.GetPageItemsIndex;
        },
        Dialog: {
          get() {
            this.close = this.$store.getters.GetDialogClose;
            return this.$store.getters.GetDialogVal;
          },
          set(val) {
            this.$store.commit('SetDialog', val)
          }          
        },
        EditDialog: {
          get() {
            this.close2 = this.$store.getters.GetDialogClose2;
            return this.$store.getters.GetDialogEditVal;
          },
          set(val) {
            this.$store.commit('SetEditDialog', val)
          }          
        },
        
    },
    components: {
      sidenav,
      draggable,
      createitem,
      layout,
      itemdetail,
      uploadimage
    } 
  };
</script>

<style>
.hr {
  border-top: 1px solid lightgrey;
  padding-top:2%;
  margin-left:1%;
  margin-right:1%;
  font-weight:500;
}
.hr--1 {
  padding-bottom:2%;
}
.hr--2 {
  margin-bottom:4%;
}
.e-title {
  padding-top: 1%;
  padding-bottom: 1%;
}
#editor-page {
  /*min-height:1500px;*/
}
#how-to {
  width: 60%;
  margin: 0 auto;
  max-width: 700px;
  margin-bottom:2%;
}
.el-dialog {
  margin-top: 5vh !important;
}
.drag-box {
  border: 1px solid lightgrey;
  margin-bottom: 1%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 485px;
  max-height: 60px;
}
.drag-box h3 {
  font-weight: 300;
}
.drag-img {
  flex: 1;
}
.drag-text {
  flex: 3;
  font-size: 0.8rem;
}
.drag-action {
  flex: 2;
  min-width: 161px;
}
.drag-box:hover {
  cursor: pointer;
}
.drag-box:active {
  border: 1px solid black;
  font-weight: bolder !important;
  background: #f2f2f2;
}
#drag-icon {
  opacity: 0.6;
}
#drag-container {
  margin-bottom: 15%;
}
.drag-text .el-tag {
  float: left;
  margin-top: 3%;
}
.el-tag:active {
  
}
#items-container {
  min-height: 650px;
}
#pp-con {
    display: flex;
  align-items: center;
  justify-content: center;
}
#page-preview {
  min-width:80%;
  max-width: 80%;
  min-height:400px;
  height: 100%;
  margin-bottom: 20%;
}
.drag-button {
  float: left;
  font-size: 0.7rem;
}
#pre-top {
  border: 3px dotted lightgrey;
}
#pre-img {
  border-left: 3px dotted lightgrey;
  min-height: 105px;
}
#iWarning {
  width: 90% !important;
}
#iSection {
  margin-bottom: 10%;
}
</style>

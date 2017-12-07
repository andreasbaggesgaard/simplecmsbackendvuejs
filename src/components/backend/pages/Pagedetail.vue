<template>
  <div>

    <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container id="editor-page">
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>

      <div v-loading="loading">
          <el-row :gutter="0" style="padding-top:5%" type="flex" justify="center">
            <el-col :xs="24" :span="12">
            <el-button type="primary" plain @click="back">Cancel</el-button><br />
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
            <el-col :xs="24" :sm="12" :md="12"  v-for="(link, index) in JSON.parse(Templates)" :key="index" style="padding:5px">
              <el-card :body-style="{ padding: '10px' }" v-bind:class="{ selected01: link.id == templateID }">
               <img v-bind:src="link.previewImage" class="image">
                <div style="padding: 0px;">
                  <h3 style="font-weight:lighter">{{link.name}}</h3> 
                  <div class="bottom clearfix">
                    <button type="text" class="mybutton02 button" v-bind:class="{ selected02: link.id == templateID }" @click="GetT" v-bind:id="link.id">Select</button>
                  </div>  
                </div>
              </el-card>
            </el-col>
          </el-row>
          
      </el-col>
      <el-col :xs="24" :span="11">

          <div v-for="page in Pages">
              <div v-if="page.id == $route.params.id">
              <input type="hidden" v-bind:value="templateID = page.templateID" />
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

                      <el-form-item label="Image">
                        <el-input v-model="page.image"></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="submitForm('pageForm', page)">Save</el-button>
                      </el-form-item>
                  </el-form>
              </div>
           </div>
      </el-col>
    </el-row>

        <div id="items-container">
          <el-row>
            <el-col :md="24">
              <h3 class="hr">Step 2 - Assign items to this page</h3>
              <p id="how-to">When you have created an item, then you can drag them up and down in the list to the right. The preview of the page will be listed accordingly to the template you have selected.</p>


                <el-button type="primary" class="hr--2" plain @click="OpenDialog">Create new item +</el-button>

                <el-dialog
                  title=""
                  :visible.sync="Dialog"
                  width="70%"
                  :before-close="handleClose">
                  <createitem></createitem>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="Dialog = false">Close</el-button>           
                  </span>
                </el-dialog>

            </el-col>
          </el-row>

            <el-row v-loading.fullscreen.lock="loadingItems">
              <el-col :xs="24" :span="12" id="pp-con">

              <el-card id="page-preview">
                <el-row v-if="selectedID == 1 || templateID == 1 &&  selectedID != 2">
                    <el-col v-model="itemOrder" :md="12" v-for="(item, index) in itemOrder" :key="index">
                        {{item.name}}
                    </el-col>
                </el-row> 
                <el-row v-else-if="selectedID == 2 || templateID == 2 && selectedID != 1">
                    <el-col v-model="itemOrder" :md="6" v-for="(item, index) in itemOrder" :key="index">
                        {{item.name}}
                    </el-col>
                </el-row> 
              </el-card>

              </el-col>

               <el-col :xs="24" :span="12">


          <!--<el-table
            :data="JSON.parse(exampleList)"
            style="width: 100%"
            v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p v-if="props.row.title">Title: {{ props.row.title }}</p>
                <p v-if="props.row.text">Text: {{ props.row.text }}</p>
                <p v-if="props.row.image">Image: {{ props.row.image }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Title">
            </el-table-column>
            </el-table-column>
            <el-table-column
              label="">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>-->
          
                <div id="drag-container">
                  <draggable v-model="itemOrder">

                    <div v-for="(text, index) in itemOrder" :key="index" class="drag-box" v-bind:id="text.sortNumber = index + 1">
                        <div class="drag-img">
                          <img src="../../../assets/arrow.png" width="15" height="auto" id="drag-icon" />                      
                        </div>
                        <div class="drag-text">
                        <el-tag type="info">{{index + 1}}</el-tag>
                          <h3>{{text.name}}</h3> 
                        </div>
                        <div class="drag-action">
                            asda
                        </div>
                      </div>

                  </draggable>
                </div>

              </el-col>

          </el-row>
        </div>


  </div>

    </el-container>
  </el-container>

  </div>
</template>

<script>
import $ from "jquery";
import sidenav from "@/components/backend/Sidenav"
import draggable from 'vuedraggable'
import createitem from "@/components/backend/items/CreateItem"
import compareArrays from 'lodash/isequal';
import forEach from 'lodash/foreach';


  export default {
    data() {
      return {
        id: "",
        loading: false,
        loadingItems: false,
        templateID: "",
        selectedID: "",
        dialogVisible: false,
        itemOrder: [],
        newItemOrder: []
      }
    },
    beforeCreate () {
      this.$store.commit('GetUserID');
      this.$store.commit('GetPages'); 
      this.$store.commit('GetTemplates');   
      this.$store.commit('GetPageItems', this.$route.params.id);   
    },
    created () {   
      this.loadingItems = true; 
      let self = this;
      setTimeout(function(){ 
        self.itemOrder = self.$store.getters.GetISorted;
        self.newItemOrder = self.$store.getters.GetISorted;
        self.loadingItems = false;
       }, 1500);             
    },
    watch: {
        Dialog: function(val) {
          if(val == false) { 
            this.loadingItems = true;          
            this.itemOrder = [];
            let self = this;
            setTimeout(function(){ 
              self.$store.commit('GetPageItems', self.$route.params.id);
            }, 1000);
            setTimeout(function(){ 
              self.itemOrder = self.$store.getters.GetISorted;
              self.loadingItems = false; 
            }, 2000); 
          }
        }
    },
    methods: { 
      OpenDialog () {
        this.dialogVisible = true;
        this.$store.commit('SetDialog', true);
      },
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      back () {
        this.$router.push("/pages");
      },
      FetchPages() {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          self.$store.commit('GetPages');   
          self.$store.getters.GetAllPages;
          self.$router.push("/pages");          
          self.$notify({
            title: 'Success',
            message: 'Page updated',
            type: 'success'
          });
          self.loading = false;
        }, 1500); 
      },
      GetT (e) {
        this.selectedID = e.target.id;
        $('.el-card').removeClass('selected01');
        $('.mybutton02').removeClass('selected02');
        $(e.target).parent().parent().parent().parent().addClass('selected01');
        $(e.target).addClass('selected02');
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
                  SortNumber: value.sortNumber,
                  //PageID: value.pageID
                }
                self.$store.dispatch('EditItem', itm);  
                console.log("val? " , value)
            });
          }         
          let obj = {
            ID: page.id,
            Name: page.name,
            Title: page.title,
            Text: page.text,
            Image: page.image,
            TemplateID: this.selectedID == "" ? this.templateID : this.selectedID
          }
          this.$store.dispatch('EditPage', obj);    
          this.FetchPages();  
                  
        } else { 
          this.$notify({
              title: 'Warning',
              message: 'The name has to be filled out.',
              type: 'warning'
            });
          return false;            
          }
      },
    },
    computed: {
        Pages () {
          return this.$store.getters.GetAllPages;
        },
        Templates () {
          return JSON.stringify(this.$store.getters.GetAllTemplates);
        },
        itemsList: {
          get() {
            //return this.$store.getters.GetISorted;
          },
          set(val) {
            //this.$store.commit('SetItems', val);
            //this.newItemOrder = val;
            //console.log(this.newItemOrder)
          }
        },
        Dialog: {
          get() {
            return this.$store.getters.GetDialogVal;
          },
          set(val) {
            this.$store.commit('SetDialog', val)
          }
          
        }
        
    },
    components: {
      sidenav,
      draggable,
      createitem
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
  flex: 4;
  font-size: 0.8rem;
}
.drag-action {
  flex: 1;
}
.drag-box:hover {
  cursor: pointer;
}
.drag-box:active {
  border: 1px solid black;
  font-weight: bolder !important;
  background: #FBFBFB;
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
  background: red !important;
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
}
</style>

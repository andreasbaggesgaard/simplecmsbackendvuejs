<template>
  <div>

  <el-container style="height: 100%; border: 1px solid #eee;">

    <sidenav></sidenav>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>

    
   <el-row>

   <el-breadcrumb separator-class="el-icon-arrow-right" id="bread">
      <el-breadcrumb-item :to="{ path: '/admin' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Pages</el-breadcrumb-item>
  </el-breadcrumb>

   <el-dialog
      title=""
      :visible.sync="help"
      width="70%">
      <h3>Shortcuts:</h3>
      <p @click="GoToWebsite()" id="gotowebsite">Go to the frontpage of your website</p>
      <h3>Guides:</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/WwWucO2KXEY" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>                
      <span slot="footer" class="dialog-footer">
        <el-button @click="help = false">Close</el-button>           
      </span>
    </el-dialog>


       <el-button size="small" style="float:right; margin:2%;" @click="OpenHelp">Need help <i class="el-icon-question"></i></el-button>
      <el-col :md="24">
          <el-tabs type="card" v-bind:value="tabsValue" @tab-click="handleClick" style="padding-left:2%;padding-right:1%;">
            <el-tab-pane name="Pages" label="Pages"><span slot="label" @click="RefreshPages()"><i class="el-icon-document"></i> Pages </span>

<el-row :gutter="0" style="padding-top:3%">
  <div v-if="newPage">
  
    <el-button type="primary" plain @click="cancel">Cancel</el-button><br /><br />
    <h3>Create a new page</h3>
    <p>Title, text and image will be shown at the top of your page. You can also skip them, and just use <b>items.</b></p><br/>

    <el-row>
      <el-col :xs="24" :span="12">

        <el-row>
          <el-alert title="The template is the layout of your page. New will be added regularly." type="info" show-icon :closable="false"></el-alert><br />
            <el-col :xs="24" :sm="12" :md="12"  v-for="(link, index) in JSON.parse(Templates)" :key="index" style="padding:5px">
              <el-card :body-style="{ padding: '10px' }">
               <img v-bind:src="link.previewImage" class="image" style="max-height:140px;">
                <div style="padding: 0px;">
                  <h3 style="font-weight:lighter">{{link.name}}</h3> 
                  <div class="bottom clearfix">
                    <button type="text" class="mybutton02 button" @click="GetT" v-bind:id="link.id">Select</button>
                  </div>  
                </div>
              </el-card>
            </el-col>
          </el-row>
          
      </el-col>
      <el-col :xs="24" :span="12">

        <el-form :model="pageForm" :xs="24" :span="8" ref="pageForm" :rules="rules" style="padding-left:5%;padding-right:5%;">
          
          <el-form-item prop="name" label="Name">
            <el-input v-model="pageForm.name" placeholder="Give your page a name that makes sense"></el-input>
          </el-form-item>
          
          <el-form-item prop="title" label="Title">
            <el-input v-model="pageForm.title"></el-input>
          </el-form-item>
          
          <el-form-item prop="text" label="Text">
            <el-input type="textarea" v-model="pageForm.text"></el-input>
          </el-form-item>

          <el-form-item prop="image" label="Image"><br />
            <uploadimage original="" bool="true"></uploadimage>
            <input type="hidden" v-bind:value="imageUploaded = UploadedImage" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('pageForm')">Create</el-button>
            <el-button @click="resetForm('pageForm')">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

  </div>

  <div else v-bind:class="{ active: newPage }">
  

      <el-col :xs="24" :span="7" class="items-col" style="margin-top:"> 
        <el-button type="primary" plain @click="create">Create new page +</el-button>
      </el-col>

      <el-col :xs="24" :span="17" class="items-col">

         <el-row type="flex" justify="center">
            <el-col :md="24">
              <el-alert
                title="Pages info"
                type="info"
                description="When you have created a page, you can edit it and assign items to it. They are the elements on the page, and will be listed accordingly to the selected template."
                show-icon style="margin-bottom:4%;" :closable="false">
              </el-alert>
            </el-col>
          </el-row>

          <el-table
            :data="JSON.parse(Pages)"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p v-if="props.row.title">Title: {{ props.row.title }}</p>
                <p v-if="props.row.text">Text: {{ props.row.text }}</p>
                <img v-if="props.row.image" v-bind:src="props.row.image" alt="" width="100"/>
                <p v-if="props.row.templateID">Template: {{ props.row.templateID }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name">
            </el-table-column>
            <el-table-column
              prop="templateID"
              label="Template">
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
          </el-table>

      </el-col>

      </div>
    </el-row>
                    
    </el-tab-pane>

    <!-- Items -->
    <el-tab-pane name="Items" label="Items"><span slot="label"  @click="RefreshItems()"><i class="el-icon-date"></i> Items </span>
              
              <items></items>
                         
        </el-tab-pane>
      </el-tabs>
  </el-col>
</el-row>


  </el-container>
</el-container>

  </div>
</template>

<script>
import $ from "jquery";
import sidenav from "@/components/backend/Sidenav"
import items from "@/components/backend/items/Items"
import uploadimage from '@/components/backend/Uploadimage'

  export default {
    data() {
      return {
        tabsValue: "Pages",
        loading: false,
        newPage: false,
        selected: false,
        help: false,
        selectedID: "",
        imageUploaded: "",
        pageForm: {
          name: "",
          title: "",
          text: "",
          image: ""
        },
        rules: {
          name: [
            { required: true, message: 'Please fill in name', trigger: 'blur' }
          ],
        }
      }
    },
    beforeCreate () {
      this.$store.commit('GetUserID');
      this.$store.commit('GetPages');         
      this.$store.commit('GetTemplates');   
    },
    created () {
    },
    computed: {
      Pages () {
        return JSON.stringify(this.$store.getters.GetAllPages);      
      },
      Templates () {
        return JSON.stringify(this.$store.getters.GetAllTemplates);
      },
      UploadedImage () {
          return this.$store.getters.GetUploadedImage;
      },
    },
    methods: { 
      GoToWebsite () {
        this.$router.push("/");
      },
      RefreshItems () {
        this.$store.commit('GetItems');
      },
      RefreshPages () {
        this.$store.commit('GetPages');
      },
      tableRowClassName({row, rowIndex}) { 
        /*if (row.used == true) {
          return 'warning-row';
        } else if (rowIndex == 10) {
          return 'success-row';
        }
        return '';*/
      },
      OpenHelp () {
        this.help = true;
      },
      handleClick(tab, event) {
        console.log(tab, event);
        this.tabsValue = tab.name;
      },
      create () {
        this.newPage = true;
      },
      cancel () {
        this.newPage = false;
        this.selected = false;
      },
      GetT (e) {
        this.selected = true;
        this.selectedID = e.target.id;
        $('.el-card').removeClass('selected01');
        $('.mybutton02').removeClass('selected02');
        $(e.target).parent().parent().parent().parent().addClass('selected01');
        $(e.target).addClass('selected02');
        console.log(this.selectedID);
      },
      FetchPages(name) {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          self.$store.commit('GetPages'); 
          self.loading = false;
          self.$message({
            type: 'success',
            message: 'Page created: ' + name
          });
        }, 4000);
      },
      ReFetchPages() {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          self.$store.commit('GetPages'); 
          self.loading = false;
        }, 4000);
      },
      submitForm(formName) {     
          if(this.selectedID == "") {
            this.$notify({
                title: 'Warning',
                message: 'Select a template',
                type: 'warning'
              });
            return false;
          } else {
            this.$refs[formName].validate((valid) => {       
              if (valid) {
                let obj = {
                  Name: this.pageForm.name,
                  Title: this.pageForm.title,
                  Text: this.pageForm.text,
                  Image: this.imageUploaded,
                  TemplateID: this.selectedID
                }
                this.$store.dispatch('NewPage', obj);    
                let self = this; 
                this.FetchPages(obj.Name);            
                $('html, body').animate({ scrollTop: 0 }, 'fast');
                this.newPage = false;
                this.selected = false;
                this.selectedID = "";
                this.resetForm(formName);     
              } else { return false; }
            });
          }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({ name: 'pagedetail', params: { id: row.id }});
      },
      handleDelete(index, row) {
        console.log(index, row);

        this.$confirm('This will permanently delete ' + row.name + '. Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel', 
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeletePage', row.id);    
          this.ReFetchPages();    
          let self = this; 
          setTimeout(function(){ 
            self.$message({
              type: 'success',
              message: 'Delete completed'
            });
          }, 4000);           
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
      
      }
    },
    components: {
      sidenav,
      items,
      uploadimage
    } 
  };
</script>

<style>
.el-table {
      border-left: 1px solid #e6ebf5;
      border-right: 1px solid #e6ebf5;
      border-top: 1px solid #e6ebf5;
}
 .el-table .warning-row {
    color: red;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .cell {
    text-align: center;
  }
  .items-col {
    padding-right:1%;
  }
  .active {
    display: none;
  }
.el-table__expanded-cell {
  text-align:left;
}
#gotowebsite {
  text-decoration: underline;
}
#gotowebsite:hover {
  cursor: pointer;
}
</style>

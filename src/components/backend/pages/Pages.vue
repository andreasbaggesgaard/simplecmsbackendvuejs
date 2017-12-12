<template>
  <div>

  <el-container style="height: 100%; border: 1px solid #eee;">

    <sidenav></sidenav>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>

    
   <el-row>
       <el-button size="small" style="float:right; margin:2%;">Need help <i class="el-icon-question"></i></el-button>
      <el-col :md="24">
          <el-tabs type="card" v-bind:value="tabsValue" @tab-click="handleClick" style="padding-left:2%;padding-right:1%;">
            <el-tab-pane name="Pages" label="Pages"><span slot="label"><i class="el-icon-date"></i> Pages </span>


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
               <img v-bind:src="link.previewImage" class="image">
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

          <el-form-item prop="image" label="Image">
            <el-input v-model="pageForm.image"></el-input>
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
    <el-tab-pane name="Items" label="Items"><span slot="label"><i class="el-icon-date"></i> Items </span>
              
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

  export default {
    data() {
      return {
        tabsValue: "Pages",
        loading: false,
        newPage: false,
        selected: false,
        selectedID: "",
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
        /*let self = this; 
        setTimeout(function(){ 
          self.loading = false;
        }, 2000);    */
    },
    computed: {
      Pages () {
        return JSON.stringify(this.$store.getters.GetAllPages);      
      },
      Templates () {
        return JSON.stringify(this.$store.getters.GetAllTemplates);
      }
    },
    methods: { 
      tableRowClassName({row, rowIndex}) { 
        if (row.used == true) {
          return 'warning-row';
        } else if (rowIndex == 10) {
          return 'success-row';
        }
        return '';
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
      FetchPages() {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          self.$store.commit('GetPages');   
          self.$store.getters.GetAllPages;
          self.loading = false;
        }, 1000); 
      },
      submitForm(formName) {          
          this.$refs[formName].validate((valid) => {       
          if (valid) {
            let obj = {
              Name: this.pageForm.name,
              Title: this.pageForm.title,
              Text: this.pageForm.text,
              Image: this.pageForm.image,
              TemplateID: this.selectedID
            }
            this.$store.dispatch('NewPage', obj);    
            let self = this; 
            this.FetchPages();            
            this.$notify({
              title: 'Success',
              message: 'Page created',
              type: 'success'
            });
            this.newPage = false;
            this.selected = false;
            this.selectedID = "";
            this.resetForm(formName);           
          } else { return false; }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({ name: 'page', params: { id: row.id }});
      },
      handleDelete(index, row) {
        console.log(index, row);

        this.$confirm('This will permanently delete ' + row.name + '. Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel', 
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeletePage', row.id);    
          this.FetchPages();       
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
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
      items
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
</style>

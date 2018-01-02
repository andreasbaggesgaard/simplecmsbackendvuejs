<template>
  <div>
    <h3>Create a new item</h3>
    <p>Select one of the content types</p>
    <input type="hidden" v-bind:value="pageid = pid" />
    <el-row>
      <el-col :xs="24" :span="12">

        <el-row style="padding-left:5%;padding-right:5%;">

            <el-col :xs="24" :sm="12" :md="12"  v-for="(link, index) in JSON.parse(ContentTypes)" :key="index" style="padding:5px">
              <el-card class="cardb" :body-style="{ padding: '10px' }">
                <div style="padding: 0px;">
                  <h3 style="font-weight:lighter">{{link.name}}</h3> 
                  <div class="bottom clearfix">
                    <button type="text" class="mybutton02 button createb" @click="GetCT" v-bind:id="link.id">Select</button>
                  </div>  
                </div>
              </el-card>
            </el-col>
          </el-row>
          
      </el-col>
      <el-col :xs="24" :span="12">

        <el-form :model="itemsForm" :xs="24" :span="8" ref="itemsForm" :rules="rules" style="padding-left:5%;padding-right:5%;">
          
          <el-form-item prop="name" label="Name">
            <el-input v-model="itemsForm.name" placeholder="Give your item a name that makes sense"></el-input>
          </el-form-item>
          
          <div v-if="selected">
          <el-form-item prop="title" label="Title" v-if="selectedID == '1' || selectedID == '4' || selectedID == '5' || selectedID == '6'">
            <el-input v-model="itemsForm.title"></el-input>
          </el-form-item>
          
          <el-form-item prop="text" label="Text" v-if="selectedID == '4' || selectedID == '5' || selectedID == '7' || selectedID == '2'">
            <el-input type="textarea" v-model="itemsForm.text"></el-input>
          </el-form-item>

          <el-form-item prop="image" label="Image" v-if="selectedID == '5' || selectedID == '6' || selectedID == '7' || selectedID == '3'">
            <br />
            <uploadimage original="" bool="false"></uploadimage>
            <input type="hidden" v-bind:value="itemsForm.image = ItemImage" />
          </el-form-item>
          
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('itemsForm')" v-if="selected">Create</el-button>
            <el-button type="primary" @click="submitForm('itemsForm')" v-else disabled>Create</el-button>
            <el-button @click="resetForm('itemsForm')" v-if="selected">Reset</el-button>
            <el-button @click="resetForm('itemsForm')" v-else disabled>Reset</el-button>
          </el-form-item>
        </el-form>
        <input type="hidden" v-bind:value="iNumber = ItemsNumber" />
      </el-col>
    </el-row>
  
  </div>
</template>

<script>
import $ from "jquery";
import uploadimage from '@/components/backend/Uploadimage';

  export default {
    props:['pid'],
    data() {
      return {
        pageid: "",
        loading: true,
        newItem: false,
        selected: false,
        selectedID: "",
        iNumber: "",
        itemsForm: {
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
      //this.$store.commit('GetItems'); 
      this.$store.commit('GetContentTypes');          
    },
    created () {
        this.loading = false;  
        this.$store.commit('SetItemImage', "");  
    },
    computed: {
      ContentTypes () {
        return JSON.stringify(this.$store.getters.GetAllContentTypes);
      },
      ItemsNumber () {
        return this.$store.getters.GetPageItemsIndex;
      },
      ItemImage () {
          return this.$store.getters.GetItemImage;
      }
    },
    methods: { 
      /*create () {
        this.newItem = true;
      },
      cancel () {
        this.newItem = false;
        this.selected = false;
      },*/
      GetCT (e) {
        this.selected = true;
        this.selectedID = e.target.id;
        $('.cardb').removeClass('selected01');
        $('.createb').removeClass('selected02');
        $(e.target).parent().parent().parent().parent().addClass('selected01');
        $(e.target).addClass('selected02');
        console.log(this.selectedID);
      },
      FetchItems() {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          //self.$store.commit('GetItems');   
          //self.$store.getters.GetAllItems;
          self.loading = false;
            self.$message({
              type: 'success',
              message: 'Item created'
            });
        }, 4500); 
          /*this.loading = true;          
          this.itemOrder = [];
          let self = this;
          setTimeout(function(){ 
            self.$store.commit('GetPageItems', self.pageid);
          }, 1000);
          setTimeout(function(){ 
            self.itemOrder = self.$store.getters.GetISorted;
            self.loading = false; 
          }, 2000); */
      },
      submitForm(formName) {          
          this.$refs[formName].validate((valid) => {       
          if (valid) {
            let obj = {
              Name: this.itemsForm.name,
              Title: this.itemsForm.title,
              Text: this.itemsForm.text,
              Image: this.itemsForm.image,
              ContentTypeID: this.selectedID,
              PageID: this.$route.params.id,
              Index: this.iNumber
            }
            this.$store.dispatch('NewItem', obj);  
            this.$store.commit('SetDialog', false);  
            let self = this; 
            this.FetchItems();        
            $('.cardb').removeClass('selected01');
            $('.createb').removeClass('selected02');
            this.newItem = false;
            this.selected = false;
            this.selectedID = "";
            this.resetForm(formName);       
            this.$store.commit('SetDialogClose', false);   
          } else { return false; }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components: {
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
</style>

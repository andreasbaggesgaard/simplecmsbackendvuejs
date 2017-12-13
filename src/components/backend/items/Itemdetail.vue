<template>
  <div>


        <div v-for="item in Items">
          <div v-if="item.id == itemID">
              <h3>Edit item</h3>

              <div v-if="item.id == $route.params.id">
                <el-button type="primary" plain @click="back">Go back</el-button>
              </div>

            <el-form ref="itemForm" :model="itemForm">
              <el-form-item label="Name">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>

                  <el-form-item label="Title" v-if="item.title">
                    <el-input v-model="item.title"></el-input>
                  </el-form-item>
 
                  <el-form-item label="Text" v-if="item.text">
                    <el-input v-model="item.text"></el-input>
                  </el-form-item>

                  <el-form-item label="Image" v-if="item.image">
                    <br />
                    <uploadimage v-bind:original="item.image" bool="false"></uploadimage>  
                    <input type="hidden" v-bind:value="newImage = ItemImage" />                
                  </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('itemForm', item)">Edit</el-button>
                </el-form-item>
                <input type="hidden" v-bind:value="itemid = itemID" />
                <input type="hidden" v-bind:value="itemForm.sortnumber = item.sortNumber" />
            </el-form>

          </div>
          <!--<div v-else-if="item.id == $route.params.id">
          
          
          </div>-->

        </div>



  </div>
</template>

<script>
import $ from "jquery";
import uploadimage from '@/components/backend/Uploadimage';

  export default {
    props:["itemID"],
    data() {
      return {
          loading: true,
          itemid: "",
          newImage: "",
          itemForm: {
            sortnumber: ""
          }
      }
    },
    methods: { 
      FetchItems() {
        //this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          /*self.$store.commit('GetItems');   
          self.$store.getters.GetAllItems;
          self.loading = false;*/
          self.$message({
              type: 'success',
              message: 'Item updated'
            }); 
        }, 3000); 
      },
      back () {
        this.$router.push("/pages");
      },
       submitForm(formName, item) {
          if (item.name != "") {     
            let obj = {
              ID: this.itemid ? this.itemid : this.$route.params.id,
              Name: item.name,
              Title: item.title,
              Text: item.text,
              Image: this.newImage.length > 0 ? this.newImage : item.image,
              SortNumber: this.itemForm.sortnumber,
            }
            this.$store.dispatch('EditItem', obj);  
            this.$store.commit('SetDialog', false);  
            let self = this; 
            this.FetchItems();        
            this.$store.commit('SetEditDialog', false);  
            this.$store.commit('SetDialogClose2', false);  
          } else { 
            this.$notify({
              title: 'Warning',
              message: 'The name has to be filled out.',
              type: 'warning'
            });
            return false; 
           }
      }
    },
    beforeCreate () {    
      this.$store.commit('GetUserID');
      this.$store.commit('GetItems');        
    },
    created () {           
      this.$store.commit('SetDialogClose2', true); 
      this.$store.commit('SetItemImage', ""); 
    },
    computed: {
        Items () {
          return this.$store.getters.GetAllItems;
        },
        ItemImage () {
          return this.$store.getters.GetItemImage;
        }
    },
    components: {
      uploadimage
    }
  };
</script>

<style>

</style>

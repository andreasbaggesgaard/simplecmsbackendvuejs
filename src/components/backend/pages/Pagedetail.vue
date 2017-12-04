<template>
  <div>

    <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container >
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>

          <el-row :gutter="0" style="padding-top:5%" type="flex" justify="center">
            <el-col :xs="24" :span="12">
            <el-button type="primary" plain @click="back">Cancel</el-button><br /><br />
              <h3>Page editor</h3>
            </el-col>
          </el-row>

    <el-row v-loading="loading">
      <el-col :xs="24" :span="12">

        <el-row style="padding-left:5%;padding-right:5%;">
          <el-alert title="The template is the layout of your page. New will be added regularly." type="info" show-icon :closable="false"></el-alert><br />
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
                    <el-form-item label="Name">
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
        

    </el-container>
  </el-container>

  </div>
</template>

<script>
import $ from "jquery";
import sidenav from "@/components/backend/Sidenav"

  export default {
    data() {
      return {
        id: "",
        loading: false,
        templateID: "",
        selectedID: "",
      }
    },
    beforeCreate () {
      this.$store.commit('GetPages'); 
      this.$store.commit('GetTemplates');       
    },
    created () {           
      
    },
    methods: { 
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
        }
    },
    components: {
      sidenav
    } 
  };
</script>

<style>

</style>

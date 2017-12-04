<template>
  <div>

    <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>
      <input type="hidden" v-model="id = $route.params.id" />

          <el-row :gutter="0" style="padding-top:5%" type="flex" justify="center">

          <el-col :xs="24" :span="12">
            <el-button type="primary" plain @click="back">Cancel</el-button><br /><br />

            <el-form :xs="24" :span="8" ref="itemForm" v-loading="loading">
               <el-form-item label="Name" v-if="SelectedItem[0].name">
                  <el-input v-model="SelectedItem[0].name"></el-input>
                </el-form-item>

                <el-form-item label="Title" v-if="SelectedItem[0].title">
                  <el-input v-model="SelectedItem[0].title"></el-input>
                </el-form-item>

                <el-form-item label="Text" v-if="SelectedItem[0].text">
                  <el-input v-model="SelectedItem[0].text"></el-input>
                </el-form-item>

                <el-form-item label="Image" v-if="SelectedItem[0].image">
                  <el-input v-model="SelectedItem[0].image"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('itemForm')">Edit</el-button>
                </el-form-item>
              </el-form>

            </el-col>
          </el-row>

    </el-container>
  </el-container>

  </div>
</template>

<script>
import sidenav from "@/components/backend/Sidenav"

  export default {
    data() {
      return {
        id: "",
        loading: true
      }
    },
    methods: { 
      back () {
        this.$router.push("/items");
      },
       submitForm(formName) {

      }
    },
    beforeCreate () {
      this.$store.commit('GetItems');       
    },
    created () {           
      let self = this;
      setTimeout(function(){ 
          self.$store.commit('SetSelectedItemID', self.id);
          self.loading = false;
      }, 1000);
    },
    computed: {
        SelectedItem () {
          return this.$store.getters.GetEditItem;
        }
    },
    components: {
      sidenav
    } 
  };
</script>

<style>

</style>

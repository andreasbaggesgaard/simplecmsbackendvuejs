<template>
  <div>

   <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>

         <el-row type="flex" justify="center">
            <el-col :md="20">
              <el-alert
                title="Menu info"
                type="info"
                description="This is the full overview of all your items. You can also do everything from inside the 'Pages' section, which is where you actually use the items. "
                show-icon style="margin-bottom:4%;margin-top:4%;" :closable="false">
              </el-alert>
            </el-col>
          </el-row>
{{menuList}}
        <el-transfer
          v-loading="loading"
          v-model="menuList"
          :props="{
            key: 'id',
            label: 'name'
          }"
          :titles="['Pages', 'Menu']"
          :button-texts="['Remove from menu', 'Add to menu']"
          :data="Pages">
        </el-transfer>
{{loadedList}}<br />{{menuList}}

      <el-button type="primary" @click="SaveMenu()">Save</el-button>

    </el-container>
  </el-container>

  </div>
</template>

<script>
import sidenav from "@/components/backend/Sidenav"
import forEach from 'lodash/foreach'

  export default {
    data() {
      return {
        loadedList: [],
        menuList: [],
        loading: false
      }
    },
    beforeCreate () {
      this.$store.commit('GetUserID');
      this.$store.commit('GetPages'); 
      this.$store.commit('GetMenuItems'); 
    },
    created () {
        let self = this;
        this.loading = true;
        setTimeout(function(){ 
          self.fetchMenuItems(self.$store.getters.GetMenuItem);
          self.loading = false;
        }, 2000);    
    },
    computed: {
      Pages: {
        get() {
            return this.$store.getters.GetAllPages;
          },
          set(val) {
            this.$store.commit('SetPages', val)
          }        
      },
      /*MenuItems: {
        get() {
            let self = this;
            forEach(this.$store.getters.GetMenuItem, function(value, key){
              self.menuList.push(value.pageID);
            });      
            return this.menuList;
          },
          set(val) {
            this.$store.commit('SetMenuItem', val)
          }      
      },*/
    },
    methods: { 
      fetchMenuItems (source) {
        let self = this;
        forEach(source, function(value, key){
          self.menuList.push(value.pageID);
          self.loadedList.push(value.pageID);
        });
      },
      SaveMenu () {
        this.loading = true;
        let self = this; 
        if(this.loadedList.length > 0) {
            forEach(self.loadedList, function(value, key){
                self.$store.dispatch('DeleteMenuItem', value);  
            });
        }
        setTimeout(function(){ 
            forEach(self.menuList, function(value, key){
                  let obj = {
                      PageID: value
                    }
                  self.$store.dispatch('NewMenuItem', obj); 
                  self.$store.commit('SetMenuItem', value);
              }); 
            //self.loadeList = [];
            //self.menuList = [];
            self.fetchMenuItems(self.menuList); 
            self.loading = false;
          }, 2000); 
          
      }
    },
    components: {
      sidenav
    }
  };
</script>

<style>
.el-checkbox__label {
  display: inline-block !important;
  
}
</style>

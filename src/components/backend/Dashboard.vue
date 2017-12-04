<template>
  <div>

<div v-if="!User">

  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="16" :md="8" :lg="8">
      <login></login>
    </el-col>
  </el-row>
 
 </div>
<div v-else>

    <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>
      
        <links></links>
      
    </el-container>
  </el-container>

  </div>
    
 </div>

  </div>
</template>

<script>
import sidenav from "@/components/backend/Sidenav"
import login from "@/components/backend/Login"
import links from "@/components/backend/Links"
import { mapGetters } from 'vuex'

  export default {
     data() {
        return {
           fullscreenLoading: true,
        } 
      },
      methods: {

      },
      computed: {
        User () {
          return this.$store.getters.GetAuthStatus;
        },
      },
      beforeCreate () {
        this.$store.commit('GetUserID');
        this.$store.commit('GetProject');
        this.$store.commit('UserIsAuthenticated');       
        let self = this;
        setTimeout(function(){ 
            self.fullscreenLoading = false;  
        }, 1500);
      },
      created () {  
                    
      }, 
      components: {
          sidenav,
          login,
          links
      }
    }; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 body {
    margin: 0;
  }
</style>

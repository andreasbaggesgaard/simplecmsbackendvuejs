<template>
  <div>

<div v-if="!User" v-loading.fullscreen.lock="fullscreenLoading">

 <el-row type="flex" justify="center" >
  <el-col :xs="24" :sm="16" :md="12" :lg="12">
    <login></login>
  </el-col>
</el-row>
 
 </div>
<div v-else>

    <sidenav v-loading.fullscreen.lock="fullscreenLoading"></sidenav>

    <!--<div v-if="Project.configured">
        <sidenav v-loading.fullscreen.lock="fullscreenLoading"></sidenav>
    </div>

    <div v-else>
        <setup ></setup>
    </div>-->
    
 </div> 





  </div>
</template>

<script>
import sidenav from "@/components/backend/Sidenav"
import login from "@/components/backend/Login"
import setup from "@/components/backend/Projectsetup"

  export default {
     data() {
        return {
           fullscreenLoading: true,
           pro: []
        } 
      },
      methods: {
            open6() {
              this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
              }).then(() => {
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
      computed: {
        Project () {
            return this.$store.getters.GetProjectObject;
        },
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
            //self.$router.push('/admin');
            self.fullscreenLoading = false;  
        }, 1500);
      },
      created () {  
        let self = this;
        setTimeout(function(){ 
          self.pro = self.$store.getters.GetProjectObject;
          console.log("pro " + self.pro.configured)
        }, 1000);

        setTimeout(function(){ 
            if(!self.pro.configured) {
              self.open6();
            }
        }, 3000);
                    
      }, 
      components: {
          sidenav,
          login,
          setup
      }
    }; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 body {
    margin: 0;
  }
</style>

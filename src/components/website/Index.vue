<template>
  <div>
  
<navbar></navbar>

<br /><br />
<h2><i class="el-icon-info"></i> Frontpage option not yet available</h2>

  </div>
</template>

<script>
import navbar from "@/components/website/Navbar"

  export default {
     data() {
        return {
        } 
      },
      beforeCreate () {
        this.$store.commit('GetUserID');
        this.$store.commit('GetPages'); 
        this.$store.commit('GetItems');   
      },
      computed: {

      },
      created () {
        
      }, 
      components: {
        navbar
      }
    }; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

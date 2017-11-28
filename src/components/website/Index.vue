<template>
  <div>

 <div v-if="User">
  hello
 </div>
 <div v-else>
 no go
 </div>




  </div>
</template>

<script>


  export default {
     data() {
        return {
        } 
      },
      computed: {
        User () {
          return this.$store.getters.GetAuthStatus;
        }
      },
      created () {
        this.$store.dispatch('UserIsAuthenticated');
      }, 
      components: {
          
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

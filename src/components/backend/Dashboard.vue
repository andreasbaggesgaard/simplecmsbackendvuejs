<template>
  <div>

 
<sidenav></sidenav>



  </div>
</template>

<script>
import sidenav from "@/components/backend/Sidenav"

  export default {
     data() {
        return {
        } 
      },
      components: {
          sidenav
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

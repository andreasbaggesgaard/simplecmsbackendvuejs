<template>
  <div>
  
  <el-aside width="100%" style="min-height: auto%;min-width:200px;">
    <el-menu  style="height: 1200px; min-height: 100%" background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <router-link to="admin"><el-menu-item index="1">
        <template slot="title"><i class="el-icon-message"></i>Home</template>
      </el-menu-item></router-link>
      <router-link to="pages"><el-menu-item index="2">
        <template slot="title"><i class="el-icon-message"></i>Pages</template>
      </el-menu-item></router-link>
      <router-link to="menu"><el-menu-item index="3">
        <template slot="title"><i class="el-icon-message"></i>Menu</template>
      </el-menu-item></router-link>
      <el-menu-item index="4">
        <template slot="title"><i class="el-icon-message"></i>Theme</template>
      </el-menu-item>
      <el-menu-item index="5">
        <template slot="title"><i class="el-icon-message"></i>Configuration</template>
      </el-menu-item>
      <el-menu-item index="6">
        <template slot="title"><i class="el-icon-message"></i>Profile</template>
      </el-menu-item>
       <el-menu-item index="7" @click="Logout()">
        <template slot="title"><i class="el-icon-message"></i>Logout</template>
      </el-menu-item>
    </el-menu>
  </el-aside>


  </div>
</template>

<script>

  export default {
    data() {
      return {
       
      }
    },
    methods: {
      Logout () {
        this.$store.dispatch('Logout');
        this.$notify.info({
          title: 'Info',
          message: 'You have logged out.'
        });
        this.$router.push('/admin');     
      }
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

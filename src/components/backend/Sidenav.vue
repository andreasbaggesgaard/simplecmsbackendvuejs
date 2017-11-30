<template>
  <div>

 
  <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="15%" style="min-height: auto%;">
    <el-menu :default-openeds="['', '']" style="min-height: 100%">
       <el-menu-item index="1">
        <template slot="title"><i class="el-icon-message"></i>Homepage</template>
      </el-menu-item>
      <el-menu-item index="2">
        <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
      </el-menu-item>
      <el-menu-item index="3">
        <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
      </el-menu-item>
      <el-menu-item index="4">
        <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
      </el-menu-item>
      <el-menu-item index="5">
        <template slot="title"><i class="el-icon-message"></i>Profile</template>
      </el-menu-item>
       <el-menu-item index="6" @click="Logout()">
        <template slot="title"><i class="el-icon-message"></i>Logout</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px; height:0px;">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="Date" width="140">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="120">
        </el-table-column>
        <el-table-column prop="address" label="Address">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>


  </div>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02', 
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods: {
      Logout () {
        this.$store.dispatch('Logout');
        this.$notify.info({
          title: 'Info',
          message: 'You have logged out.'
        });
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

<template>
  <div>

   <el-container style="height: 100%; border: 1px solid #eee;">

      <sidenav></sidenav>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height:0px;"></el-header>
{{Pages}}
        <el-transfer
          v-model="menuList"
          :props="{
            key: 'id',
            label: 'name'
          }"
          :titles="['Pages', 'Menu']"
          :button-texts="['Remove from menu', 'Add to menu']"
          :data="Pages">
        </el-transfer>
{{menuList}}
    </el-container>
  </el-container>

  </div>
</template>

<script>
import sidenav from "@/components/backend/Sidenav"

  export default {
    data() {
      return {
        menuList: [4,5]
      }
    },
    beforeCreate () {
      this.$store.commit('GetUserID');
      this.$store.commit('GetPages'); 
    },
    created () {
      //this.menuList.push([1,2]);
    },
    computed: {
      Pages: {
        get() {
            return this.$store.getters.GetAllPages;
          },
          set(val) {
            this.$store.commit('SetPages', val)
          }        
      }
    },
    methods: { 
      
    },
    components: {
      sidenav
    }
  };
</script>

<style>

</style>

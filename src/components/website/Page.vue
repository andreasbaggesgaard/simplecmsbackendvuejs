<template>
  <div>
  
<navbar></navbar>

<layout :selectedID="0" :templateID="tempID" :preview="false" :data="Items" :page="currentPage"></layout>

  </div>
</template>

<script>
import navbar from "@/components/website/Navbar"
import forEach from 'lodash/foreach'
import layout from '@/components/backend/items/Layout'
import orderBy from 'lodash/orderBy'


  export default { 
     data() {
        return {
          currentPage: "",
          pageItems: [],
          templateid: "",
          tempID: ""
        } 
      },
      beforeCreate () {
        this.pageItems = [];
        this.$store.commit('GetUserID');
        this.$store.commit('GetPages'); 
        this.$store.commit('GetItems');  
        this.$store.commit('GetTemplates');  
      },
      methods: {

      },
      computed: {
          Items () {
              let self = this;
              this.pageItems = [];
              
              forEach(this.$store.getters.GetAllPages, function(value, key){
                  if(value.name == self.$route.params.name) {
                    self.currentPage = value;
                    self.templateid = value.templateID;
                  }
              });

              forEach(this.$store.getters.GetAllTemplates, function(val, i){
                  if(val.id == self.templateid) {
                    self.tempID = val.name;
                  }
              });
              
              forEach(this.$store.getters.GetAllItems, function(value, key){
                  if(value.pageID == self.currentPage.id) {
                    self.pageItems.push(value);             
                  }
              });
            let items = orderBy(this.pageItems, ['sortNumber'], ['asc']);

            return items;
        },
      },
      components: {
        navbar,
        layout
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

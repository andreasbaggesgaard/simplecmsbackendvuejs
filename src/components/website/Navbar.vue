<template>
  <div>

<div class="menu">
  <ul>
      <li v-for="(item, i) in MenuItems" :key="i" @click="handleSelect" v-bind:id="item.name"><router-link :to="{ name: 'page', params: { name: item.name }}" v-bind:id="item.name">{{item.name}}</router-link></li>
  </ul>
  <span class="p-name" v-if="Project.name">{{Project.name}}</span>
</div>

  </div>
</template>

<script>
import forEach from 'lodash/foreach'
import $ from 'jquery'

  export default {
     data() {
        return {
          pages: [],
          menuItems: [],
          length: 0
        } 
      },
      beforeCreate () {
        this.$store.commit('GetUserID');
        this.$store.commit('GetProject');
        this.$store.commit('GetPages'); 
        this.$store.commit('GetMenuItems'); 
      },
      computed: {
        MenuItems () {
          let self = this;
          this.menuItems = [];
          
          forEach(this.$store.getters.GetAllPages, function(value, key){

              forEach(self.$store.getters.GetMenuItem, function(val, i){
                  if(value.id == val.pageID) {
                    self.menuItems.push(value);          
                  }
              });

          });

          return this.menuItems;
        },
        Project () {
          return this.$store.getters.GetProjectObject;
        }
      },
      methods: {
        handleSelect(e) {
          //console.log("id ", e.target.id);
          //$('body').find('.active').removeClass('active');
          //$('#' + e.target.id).addClass('active');
        }
      },
      created () {
        
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
  .menu {
    border-bottom: solid 1px #e6e6e6;
    height: 70px;
  }
  .menu li {
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    cursor: pointer; 
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 2px solid transparent;
        list-style: none;
        font-size: 14px;
        transition: border-color .3s,background-color .3s,color .3s;
        padding: 0 20px;
  }
  .menu li:first-child {
    /*color: #409EFF;*/
  }
  .menu li a {
    color: #000;
  }
  .menu li a:active {
    color: #409EFF;
  }
  .active a {
    color: #409EFF !important;
  }
  .p-name {
    float: right;
    margin-top: 1.2%;
    margin-right: 5%;
  }

</style>

<template>
  <div class="links">

    <el-row style="padding-left:5%;padding-right:5%;">
      <el-col :xs="24" :span="11" v-for="(link, index) in links" :key="index" style="margin:2%">
        <el-card :body-style="{ padding: '10px' }">
          <div v-html="link.image"></div>
          <div style="padding: 0px;">
            <h2>{{link.title}}</h2> 
            <p>{{link.text}}</p>
            <div class="bottom clearfix">
              <time class="time"></time>
              <router-link v-bind:to='link.link'>Select</router-link>
            </div> 
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'links',
    data() {
      return {
        links: [
             { title: "Pages", image: '<i class="el-icon-document"></i>', text: "bb", link: "pages"}, 
             { title: "Menu", image: "src/assets/logo.png", text: "bb", link: ""},
             { title: "Theme", image: "src/assets/logo.png", text: "bb", link: ""}
          ]
      }
    },
    methods: { 
    } 
  };
</script>

<style>

</style>

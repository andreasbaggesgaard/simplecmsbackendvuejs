<template>
  <div>

    <el-row style="padding-left:5%;padding-right:5%;">
      <el-col :xs="24" :span="11" v-for="(link, index) in links" :key="index" style="margin:2%">
        <el-card :body-style="{ padding: '10px' }">
          <img v-bind:src="link.image" class="image">
          <div style="padding: 0px;">
            <h2>{{link.title}}</h2> 
            <p>{{link.text}}</p>
            <div class="bottom clearfix">
              <time class="time"></time>
              <el-button type="text">Select</el-button>
            </div> 
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: [
             { title: "Pages", image: "src/assets/logo.png", text: "bb", id: "theme01"}, 
             { title: "Items", image: "src/assets/logo.png", text: "bb", id: "theme02"},
             { title: "Menu", image: "src/assets/logo.png", text: "bb", id: "theme02"},
             { title: "Theme", image: "src/assets/logo.png", text: "bb", id: "theme02"}
          ]
      }
    },
    methods: { 
    } 
  };
</script>

<style>

</style>

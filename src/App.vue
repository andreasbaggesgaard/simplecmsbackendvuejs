<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none !important;
}
.router-link-active li, .router-link-active li i {
  color: rgb(255, 208, 75) !important;
}
  .mybutton {
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #d8dce5;
    color: #5a5e66;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 400;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
        border: none;
    color: #000;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
  }
  .selected01 {
    box-shadow: 0 0px 0px 0 rgba(0,0,0,.1);
    /*border: 1px solid #409EFF;*/
    /*color:#67c23a;*/
  }
  .selected02 {
    color: #409EFF !important;
    border: 1px solid #409EFF !important;
  }

.mybutton02 {
      display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #d8dce5;
    color: #5a5e66;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
  .mybutton02:focus, .mybutton02:hover {
    background: #fff;
    border-color: #409EFF;
    color: #409EFF;
}
.el-alert__title, .el-alert__description {
  font-size: 0.9rem !important;
}
.el-aside {
  height: 100%;
  margin-left:-0.4%;
}
.el-container {
  /*margin-left:-1%;
  margin-right:-1%;*/
}
</style>

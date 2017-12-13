<template>
  <div>


<h2 class="title">Hi! We can see it is your first time logging in :-)</h2>
<h3 class="subtitle">Go through the initial configuration, and you will be good to go!</h3><br />

 <el-steps :space="200" :active="active" simple>
  <el-step title="Step 1" icon="el-icon-edit-outline"></el-step>
  <el-step title="Step 2" icon="el-icon-setting"></el-step>
  <el-step title="Step 3" icon="el-icon-picture-outline"></el-step>
</el-steps><br /><br/>

<div class="steps">
<el-form class="setup-form">

        <div v-show="show1">
        <h3 class="subtitle">What do you want to call your website ?</h3><br />
          <el-form-item>
            <el-input v-model="name" placeholder="E.g. Copenhagen Bikeshop"></el-input>
          </el-form-item>
        </div>

        <div v-show="show2" class="transition-box">
        
        <el-row>
          <el-col :span="11" v-for="(theme, index) in themes" :key="index" style="margin:2%">
            <el-card :body-style="{ padding: '0px' }">
              <img v-bind:src="theme.image" class="image">
              <div style="padding: 14px;">
                <span>{{theme.title}}</span> 
                <div class="bottom clearfix"><br />
                  <button type="text" class="mybutton02 button sbutton" @click="GetTheme" v-bind:id="theme.id">Select</button>
                </div> 
              </div>
            </el-card>
          </el-col>
        </el-row>
        </div>



        <div v-show="show3" class="transition-box">
        <h3 class="subtitle">Choose the color for the background. White is often a safe choice, so we have preselected it for you ;-)</h3>
        <h4 class="subtitle">You can always change the configuration later on.</h4>
        <div class="block">
          <el-color-picker v-model="color"></el-color-picker><br />
          <p style="font-weight: lighter">{{color}}</p>
        </div>
        
        </div>
    </el-form>
</div>

<br />
<el-button @click="prev" v-if="show2 || show3" class="sbutton">Previous</el-button>
<el-button @click="prev" v-else disabled class="sbutton">Previous step</el-button>
<el-button type="primary" @click="next" v-if="show1 || show2" class="sbutton">Next</el-button>
<el-button type="success" @click="PutProject" v-else class="sbutton">Finish</el-button>

  </div>
</template>

<script>
import $ from "jquery";

  export default {
     data() {
        return {
           active: 1,
           show1: true,
           show2: false,
           show3: false,
           back: false,
           name: "",
           color: "#FFF",
           selectedTheme: "",
           themes: [
             { title: "theme01", image: "src/assets/logo.png", id: "theme01"}, 
             { title: "theme02", image: "src/assets/logo.png", id: "theme02"}
             ]
        } 
      },
      methods: {
          prev() {
            if(this.active == 1) { this.active == 1; } 
            else { this.active -= 1; }
            this.current();
          },
          next() {
            if (this.active == 3) { this.active = 3; }
            else { this.active += 1;}
            this.current();
          },
          current() {
            if(this.active == 1) {
              this.show1 = true; this.show2 = false; this.show3 = false;
            } else if(this.active == 2) {
              this.show1 = false; this.show2 = true; this.show3 = false;
            } else if(this.active == 3) {
              this.show1 = false; this.show2 = false; this.show3 = true;
            }
          },
          GetTheme(e) {
            e.preventDefault();
            this.selectedTheme = e.target.id;
            $('.el-card').removeClass('selected01');
            $('.mybutton02').removeClass('selected02');
            $(e.target).parent().parent().parent().parent().addClass('selected01');
            $(e.target).addClass('selected02');
            console.log(this.selectedTheme);
          },
          PutProject() {
            let obj = {
              Name: this.name,
              Background: this.color,
              NavbarColor: "not yet",
              Theme: this.selectedTheme,
              Configured: true
            }
            this.$store.dispatch('EditProject', obj);           
            this.$router.push('/admin');     
            this.$message({
              message: 'The setup was complete.',
              type: 'success'
            });     
          }
      },
      computed: {
       
      },
      beforeCreate () {
        this.$store.commit('GetUserID');
      },
      created () {
                  
      }, 
      components: {

      }
    }; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 body {
    margin: 0;
  }
  .title {
    font-weight: 500;
  }
  .subtitle {
    font-weight: lighter;
  }
  .hide {
    opacity: 0.5;
  }
  .sbutton {
    min-width: 134px;
  }
  .steps {
    /*min-height: 200px;*/
  }
  .setup-form {
    max-width: 500px;
    margin: 0 auto;
  }
  body {
    min-height:1200px;
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
    font-weight: 500;
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
    /*color:#67c23a;*/
  }
  .selected02 {
    color: #409EFF;
  }
</style>

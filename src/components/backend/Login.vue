<template>
  <div>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Simplecms</span>
  </div>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" style="">

  <el-form-item label="Username" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item><br />
  
  <el-form-item label="Password" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item><br />

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>

</el-form>





</el-card>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: 'Please fill in username', trigger: 'blur' },
            //{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in password', trigger: 'blur' },
            //{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {                 
        this.$refs[formName].validate((valid) => {       
          if (valid) {
            let self = this;
            this.$store.dispatch('Login', { u: this.ruleForm.username, p: this.ruleForm.password });
            let obj = this.$store.getters.GetApiResponse;
            setTimeout(function(){              
               console.log("apierror " + obj.e);
               console.log("apisuccess " + obj.s);
               if(obj.e === 400) {
                  self.$notify.error({
                      title: "Error",
                      message: 'Username and password do not match.'
                  });
               } else if(obj.s === 200) {
                 self.$message({
                    message: 'Welcome to your CMS dashboard.',
                    type: 'success'
                  });
               }
            }, 1000);
           
          } else { return false; }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    beforeCreate () {
        this.$store.commit('GetUserID');
        this.$store.commit('GetProject');
    },
    created () {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-notification__title, el-notification__content {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
body {
  background: #FBFBFB;
}
.el-form-item__label {
  padding-right: 5%;
}
</style>

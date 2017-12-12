<template>
  <div>

 <input type="hidden" v-bind:value="isPage = bool" />

<el-row v-loading="loading">

<div v-if="isPage == 'true'">
  <el-col :md="12">
    <input type="file" v-on:change="onUploadImage" id="input">   
  </el-col>
  <el-col :md="12">
    <p v-if="!original.length > 0 && !imageUrl.length > 0">You haven't chosen an image yet.</p>
    <img v-bind:src="imageUrl.length > 0 ? imageUrl : original" id="image" width="100%" height="auto" v-else /> 
    <el-button v-if="imageUrl.length > 0" type="text" @click="ClearImage()">Clear uploaded image</el-button>
  </el-col>
</div>

<div v-else>
  <el-col :md="12">
    <input type="file" v-on:change="onUploadImage" id="input2">   
  </el-col>
    <el-col :md="12">
    <p v-if="!original.length > 0 && !itemImageUrl.length > 0">No image yet.</p>
    <img v-bind:src="itemImageUrl.length > 0 ? itemImageUrl : original" id="image" width="100%" height="auto" v-else /> 
    <el-button v-if="itemImageUrl.length > 0" type="text" @click="ClearImage()">Clear uploaded image</el-button>
  </el-col>
</div>

</el-row>



  </div>
</template>


<script>
import $ from "jquery";
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyASAkk9WhPH8xZN0c52L3N2zEntPG8KRsE",
  authDomain: "simplecmsvue.firebaseapp.com",
  databaseURL: "https://simplecmsvue.firebaseio.com",
  projectId: "simplecmsvue",
  storageBucket: "simplecmsvue.appspot.com",
  messagingSenderId: "812485353549"
};
firebase.initializeApp(config);

  export default {
    props:["original", "bool"],
    data() {
      return {
        loading: false,
        imageUrl: '',
        imageName: '',
        isPage: false,
        itemImageUrl: '',
        itemImageName: ''
      }
    },
    methods: { 
        ClearImage () {
          /*firebase.storage().ref().child('images/' + this.imageName).delete().then(function() {
          }).catch(function(error) {
              console.log(error);
          });*/
          if(this.isPage == "true") { 
              this.$store.commit('SetUploadedImage', "");
              this.$store.commit('SetImageCleared', true);
              this.imageUrl = "";
              $('#input').val('');
          } else {
             this.$store.commit('SetItemImage', "");
             this.itemImageUrl = "";
             $('#input2').val('');
          }
          
        },
        onUploadImage (e) {
          this.loading = true;
          let self = this;
          let file = e.target.files[0];  
          let metadata = {'contentType': file.type}
          let uploadTask = firebase.storage().ref().child('images/' + file.name)
          .put(file, metadata).then(function(snapshot) {
              if(self.isPage == "true") {
                console.log(snapshot);
                self.imageUrl = snapshot.downloadURL;
                self.imageName = snapshot.metadata.name;
                self.loading = false;
                self.$store.commit('SetUploadedImage', self.imageUrl);
                self.$store.commit('SetImageCleared', false); 
              } else {   
                console.log(snapshot);
                self.itemImageUrl = snapshot.downloadURL;
                self.itemImageName = snapshot.metadata.name;
                self.loading = false;         
                self.$store.commit('SetItemImage', self.itemImageUrl);
              }
              
            }).catch(function(error) {
                console.error('Upload failed:', error);
         }); 
      }
    }

    } 
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

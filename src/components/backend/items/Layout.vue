<template>
  <div>

<div v-if="preview">

  <el-row v-if="selectedID == 1 || templateID == 1 &&  selectedID != 2">
      <el-col v-model="itemOrder" :md="12" v-for="(item, index) in itemOrder" :key="index" class="item">        

      <el-tooltip v-bind:content="item.name" placement="top">
        <el-card :body-style="{ padding: '0px' }" id="pre-card">
          <img v-bind:src="item.image" alt="" v-if="item.image" class="image" />
            <div style="padding: 14px;" v-if="item.title || item.text">
              <span id="pre-title" v-if="item.title">{{item.title}}</span>
              <div class="bottom clearfix">
                <p id="pre-text" v-if="item.text">{{item.text}}</p>
              </div>
            </div>
        </el-card>
      </el-tooltip>

      </el-col>
  </el-row> 
  
  <el-row v-else-if="selectedID == 2 || templateID == 2 && selectedID != 1">
      <el-col v-model="itemOrder" :md="6" v-for="(item, index) in itemOrder" :key="index" class="item">

    <el-tooltip v-bind:content="item.name" placement="top">
        <el-card :body-style="{ padding: '0px' }" id="pre-card">
          <img v-bind:src="item.image" alt="" v-if="item.image" class="image" />
            <div style="padding: 14px;" v-if="item.title || item.text">
              <span id="pre-title" v-if="item.title">{{item.title}}</span>
              <div class="bottom clearfix">
                <p id="pre-text" v-if="item.text">{{item.text}}</p> 
              </div>
            </div>
        </el-card>
    </el-tooltip>

      </el-col>
  </el-row> 

</div>
<div v-else>

<el-row v-if="templateID == 1">
      <el-col v-model="itemOrder" :md="12" v-for="(item, index) in itemOrder" :key="index" class="item">
          <img v-bind:src="item.image" alt="" v-if="item.image" />
          <h5 v-if="item.title">{{item.title}}</h5>
          <p v-if="item.text">{{item.text}}</p>
      </el-col>
  </el-row> 

  <el-row v-else-if="templateID == 2">
      <el-col v-model="itemOrder" :md="6" v-for="(item, index) in itemOrder" :key="index" class="item">
          <img v-bind:src="item.image" alt="" v-if="item.image" />
          <h5 v-if="item.title">{{item.title}}</h5>
          <p v-if="item.text">{{item.text}}</p>
      </el-col>
  </el-row> 

</div>


  </div>
</template>

<script>


  export default {
    props: ['selectedID','templateID', 'preview'],
    data() {
      return {
        id: "",
        loading: true
      }
    },
    methods: { 

    },
    beforeCreate () {
    
    },
    created () {           

    },
    computed: {
        itemOrder () {
          return this.$store.getters.GetISorted;
        }
    },
    components: {

    } 
  };
</script>

<style>
.item {
  
  margin-bottom: 2%;
}
  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  #pre-text {
    font-size: smaller;
  }
  #pre-title {
    font-size: smaller;
  }
  #pre-card {
    border: 3px dotted lightgrey !important;
    box-shadow: none !important;
    margin:3%;
  }
</style>

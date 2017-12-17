<template>
  <div>

<div v-if="preview == true">

  <el-row v-if="selectedID == 'Template01' || templateID == 'Template01' && selectedID != 'Template02'">
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
  
  <el-row v-else-if="selectedID == 'Template02' || templateID == 'Template02' && selectedID != 'Template01'">
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

<el-row>
  <div class="jumbo">
    <el-col :xs="12" v-bind:class="[page.image ? 'el-col-md-12' : 'el-col-md-24']">
        <h3 v-if="page.title">{{page.title}}</h3>
        <h5 style="font-weight:lighter" v-if="page.text">{{page.text}}</h5>
    </el-col>
    <el-col :md="12">
        <img v-bind:src="page.image" alt="" width="100%" />        
    </el-col>
  </div> 
</el-row>


<el-row v-if="templateID == 'Template01'" class="t">
      <el-col v-model="data" :md="12" v-for="(item, index) in data" :key="index" class="item--page">
       <div :body-style="{ padding: '0px' }">
          <img v-bind:src="item.image" alt="" v-if="item.image" width="50%"/>
          <h5 v-if="item.title">{{item.title}}</h5>
          <p v-if="item.text">{{item.text}}</p>
        </div>
      </el-col>
  </el-row> 

  <el-row v-else-if="templateID == 'Template02'" class="t">
      <el-col v-model="data" :md="6" v-for="(item, index) in data" :key="index" class="item--page">
        <div :body-style="{ padding: '0px' }">
          <img v-bind:src="item.image" alt="" v-if="item.image" width="100%" />
          <h5 v-if="item.title">{{item.title}}</h5>
          <p v-if="item.text">{{item.text}}</p>
        </div>
      </el-col>
  </el-row> 

</div>


  </div>
</template>

<script>


  export default {
    props: ['selectedID','templateID', 'preview', 'data', 'page'],
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
    font-weight: bolder;
  }
  #pre-card {
    border: 3px dotted lightgrey !important;
    box-shadow: none !important;
    margin:3%;
  }
  .item--page {
    padding: 2%;
  }
  .t {
    margin-left: 5%;
    margin-right: 5%;
  }


.jumbo {
  padding-top: 3%;
  margin: 0 auto;
  background: lightgrey;
  min-height:390px;
}
.jumbo img {
  max-width: 350px;
}

</style>

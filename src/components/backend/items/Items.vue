<template>
  <div>

      <el-col :xs="24" :span="24" class="items-col">

          <el-row type="flex" justify="center">
            <el-col :md="20">
              <el-alert
                title="Items info"
                type="info"
                description="This is the full overview of all your items. You can also do everything from inside the 'Pages' section, which is where you actually use the items. "
                show-icon style="margin-bottom:4%;margin-top:4%;" :closable="false">
              </el-alert>
            </el-col>
          </el-row>

          <el-table
            :data="JSON.parse(Items)"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p v-if="props.row.title">Title: {{ props.row.title }}</p>
                <p v-if="props.row.text">Text: {{ props.row.text }}</p>
                <img v-if="props.row.image" v-bind:src="props.row.image" alt="" width="100"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Title">
            </el-table-column>
            </el-table-column>
            <el-table-column
              prop="pageID"
              label="Used on page">
            </el-table-column>
            <el-table-column
              prop="used"
              label="" >
            </el-table-column>
            <el-table-column
              label="">
              <template slot-scope="scope">
                <el-button
                disabled
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>

      </el-col>

      </div>
    </el-row>


  </div>
</template>

<script>
import $ from "jquery";
import sidenav from "@/components/backend/Sidenav"

  export default {
    data() {
      return {
        loading: true,
        newItem: false,
        selected: false,
        selectedID: "",
        itemsForm: {
          name: "",
          title: "",
          text: "",
          image: ""
        },
        rules: {
          name: [
            { required: true, message: 'Please fill in name', trigger: 'blur' }
          ],
        }
      }
    },
    beforeCreate () {
      this.$store.commit('GetUserID');
      this.$store.commit('GetItems');      
    },
    created () {
      this.loading = false;
    },
    computed: {
      Items() {
        return JSON.stringify(this.$store.getters.GetAllItems);      
      },
    },
    methods: { 
      tableRowClassName({row, rowIndex}) {
        /*if (row.used == true) {
          return 'warning-row';
        } else if (rowIndex == 10) {
          return 'success-row';
        }
        return '';*/
      },
      create () {
        this.newItem = true;
      },
      cancel () {
        this.newItem = false;
        this.selected = false;
      },
      FetchItems() {
        this.loading = true;
        let self = this; 
        setTimeout(function(){ 
          self.$store.commit('GetItems');   
          self.$store.getters.GetAllItems;
          self.loading = false;
        }, 1000); 
      },
      submitForm(formName) {          
          this.$refs[formName].validate((valid) => {       
          if (valid) {
            let obj = {
              Name: this.itemsForm.name,
              Title: this.itemsForm.title,
              Text: this.itemsForm.text,
              Image: this.itemsForm.image,
            }
            this.$store.dispatch('NewItem', obj);    
            let self = this; 
            this.FetchItems();            
            this.$notify({
              title: 'Success',
              message: 'Item created',
              type: 'success'
            });
            this.newItem = false;
            this.selected = false;
            this.selectedID = "";
            this.resetForm(formName);           
          } else { return false; }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({ name: 'item', params: { id: row.id }});
      },
      handleDelete(index, row) {
        console.log(index, row);

        this.$confirm('This will permanently delete ' + row.name + '. Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DeleteItem', row.id);    
          this.FetchItems();       
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
      
      }
    },
    components: {
      sidenav
    } 
  };
</script>

<style>
.el-table {
      border-left: 1px solid #e6ebf5;
      border-right: 1px solid #e6ebf5;
      border-top: 1px solid #e6ebf5;
      margin-bottom: 10%;
}
 .el-table .warning-row {
    color: red;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .cell {
    text-align: center;
  }
  .items-col {
    padding-right:1%;
  }
  .active {
    display: none;
  }
.el-table__expanded-cell {
  text-align:left;
}
</style>

<template>
 <div class="messageSetting">
     <div class="common-top-title">机器人回复设置</div>
     <div class="main">
       <div class="title">问题回复<el-button size="small" class="create-question" type="danger" @click="addhand()">+新建问题</el-button></div>
        <div class="table">
          <el-table
          ref="multipleTable"
          :data="messageData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            label="序号"
             prop="sort"
            width="120">
          </el-table-column>
          <el-table-column
            prop="title"
            label="问题"
            width="240">
          </el-table-column>
          <el-table-column
            prop="reply"
            label="回复"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="是否启用"
            width="100">
            <template slot-scope="scope">
              <el-switch
              @change="changeStatus(scope.row.id)"
                v-model="scope.row.enable"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
    			inactive-value="0">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button @click="edithandleClick(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
                <el-button @click="deletehandleClick(scope.row.id,scope.$index)" type="text" size="small">删除</el-button>
                <el-button @click="uphandleClick(scope.row.id,scope.$index)" type="text" size="small">上移</el-button>
                <el-button @click="downhandleClick(scope.row.id,scope.$index)" type="text" size="small">下移</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
     </div>
       <el-dialog
          title="提示"
          :visible.sync="dialogSettingVisible"
          width="30%">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="问题" prop="title">
                  <el-input size="small" v-model.trim="ruleForm.title"></el-input>
                </el-form-item>
                  <el-form-item label="回复" prop="reply">
                  <el-input size="small" type="textarea" v-model.trim="ruleForm.reply"></el-input>
                </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogSettingVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </span>
        </el-dialog>
 </div>
</template>

<script>
import messageSetting from "../../js/messageSetting";
 export default {
   data () {
     return {
     	enableNum:1,
       isadd:false,
         index:0,
       ruleForm:{
         title:'',
         reply:'',
         id:'',
         sort:'',
       },
       rules:{
          title: [
            { required: true, message: '请输入问题', trigger: 'blur' },
            { min: 1, max:50, message: '长度在 1到 50 个字符', trigger: 'blur' }
          ],
          reply: [
            { required: true, message: '请输入回复', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
       },
       dialogSettingVisible:false,
        currentPage:1,
        messageData: [],
        multipleSelection: [],
        total:0,
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('messageSetting', function(id){
		    that.fetch();
		})
   },
   components: {

   },
    methods: {
   	fetch(){
     messageSetting.getMessageSetting("/RobotReply/index",this);
   	},
      changeStatus(id){
          var data = {
            id:id
          }
          messageSetting.enableSettingListData("/RobotReply/enable",data,this);
      },
      uphandleClick(id,index){

          var data = {
            id:id,
            position:'up'
          }
          messageSetting.moveSettingListData("/RobotReply/move",data,this,index);
      },
      downhandleClick(id,index){

          var data = {
            id:id,
            position:'down'
          }
          messageSetting.moveSettingListData("/RobotReply/move",data,this,index);
      },
      deletehandleClick(id,index){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id:id
          }
          messageSetting.deleteSettingListData("/RobotReply/delete",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      edithandleClick(data,index){
        this.dialogSettingVisible = true;
        // var data = {
              this.ruleForm.title = data.title;
              this.ruleForm.reply = data.reply;
              this.ruleForm.id = data.id;
              this.index = index;
              this.isadd = false;
        // }
        // messageSetting.getMessageSetting("/RobotReply/edit",data,this);
      },
      addhand(){
          this.dialogSettingVisible = true;
          this.ruleForm.title = '';
          this.ruleForm.reply = '';
          this.ruleForm.id = '';
          this.isadd = true;
      },
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isadd){
              var data = this.ruleForm;
              messageSetting.addSettingListData("/RobotReply/create",data,that);
            }else{
              var data = this.ruleForm;
              messageSetting.editSettingListData("/RobotReply/edit",data,that,this.index);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(){

      }
    }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.messageSetting{
  background:@backgroundfff;
  .main{
    .title{
      position: relative;
      padding:20px;
      .create-question{
        position: absolute;
        right:20px;
        top:10px;
      }
    }
    .table{
      padding:0 20px 40px 20px;
    }
  }
}
 
</style>

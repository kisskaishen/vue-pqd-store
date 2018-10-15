<template>
 <div class="applicationForPresentation">
   <div class="common-top-title">账户金额</div>
   <div class="main">
     <div class="left">
       <div class="present-balance">可提现余额</div>
       <div class="balance">
         <span class="count"><span class="colorCash">{{tableData.amount_money}}</span>元</span>
         <el-button @click="dialogVisibleWithdrawals=true">提现</el-button>
         <el-button @click="dialogVisibleBindingAccount=true">绑定账户</el-button>
       </div>
     </div>
     <div class="right">
       <div class="store-margin">店铺保证金</div>
       <div class="cash">
       <span class="colorCash">{{tableData.margin}}</span>元</div>
     </div>
   </div>
   <div class="list">
     <div class="title">提现记录</div>
      <div class="table-list">
          <el-table
          :data="listData"
          border
          style="width: 100%">
          <el-table-column
            prop="sw_id"
            label="申请编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="withdrawal_money"
            label="提现余额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="withdrawal_type"
            label="提现方式">
          </el-table-column>
          <el-table-column
            prop="withdrawal_code"
            label="提现账户">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="handletime"
            label="处理时间">
          </el-table-column>
        </el-table>
      </div>
      
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size=15
          layout="total, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
   </div>
   <el-dialog
    title="提现"
    :visible.sync="dialogVisibleWithdrawals"
    width="30%">
    <div class="withdrawals">
        <div class="title">可提现金额:<span class="colorCash fontCash">{{tableData.amount_money}}</span>元</div>
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="支付宝账户:">
            <div class="width-120"><el-input disabled v-model.trim="form.withdrawal_code"></el-input></div>
          </el-form-item>
          <el-form-item label="提现金额:">
            <div class="width-120 left"><el-input v-model.trim="form.withdrawal_money"></el-input></div><span class="left margin-left-10">元</span>
          </el-form-item>
          <div class="colorCash center">注：当天只能提现一次，且提现金额为500的倍数</div>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleWithdrawals = false">取 消</el-button>
      <el-button type="primary" @click="submitwithdrawals()">确 定</el-button>
    </span>
  </el-dialog>
   <el-dialog
    title="绑定账户"
    :visible.sync="dialogVisibleBindingAccount"
    width="30%">
    <div class="binding-account">
        <el-form ref="bindingAccount" :model="bindingAccount" label-width="200px">
          <el-form-item label="支付宝账户:">
            <div class="width-120"><el-input v-model.trim="bindingAccount.withdrawal_code"></el-input></div>
          </el-form-item>
          <el-form-item label="支付宝姓名:">
            <div class="width-120 left"><el-input v-model.trim="bindingAccount.withdrawal_name"></el-input></div>
          </el-form-item>
          <el-form-item label="提现手机号:">
            <div class="width-120 left"><el-input disabled v-model.trim="bindingAccount.withdrawal_phone"></el-input></div>
          </el-form-item>
          <el-form-item label="手机验证码:">
            <div class="width-80 left"><el-input v-model.trim="bindingAccount.verifycode"></el-input></div>
            <el-button class="left margin-left-10 verification" @click="getVerification()">验证码</el-button>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleBindingAccount = false">取 消</el-button>
      <el-button type="primary" @click="bindingAccountBtn()">确 定</el-button>
    </span>
  </el-dialog>
 </div>
</template>

<script>
import applicationForPresentation from "../../js/applicationForPresentation";

 export default {
   data () {
     return {
       dialogVisibleBindingAccount:false,
       dialogVisibleWithdrawals:false,
       form:{
          withdrawal_code:'',
          withdrawal_money:''
       },
       bindingAccount:{
         withdrawal_code:'',
         withdrawal_name:'',
         withdrawal_phone:'',
         verifycode:''
       },
       currentPage4:1,
        tableData:{},
        listData:[],
        total:0,
     }
   },
   created(){
     var data = {
       "page":1
     }
     applicationForPresentation.getAccountFund("/api/withdrawal/data",data,this);
     applicationForPresentation.getCreate("/api/withdrawal/create",this);
   },
   components: {

   },
   watch:{
     dialogVisibleBindingAccount(old,news){
       if(old == false){
       }
     }
   },
   methods:{
     getVerification(){
       var verification = document.getElementsByClassName('verification')[0];
       verification.setAttribute("disabled",true);
        var data = {
            withdrawal_phone:this.bindingAccount.withdrawal_phone
        }
        applicationForPresentation.getVerificationCode("/api/withdrawal/send_sms",data,this);
     },
     bindingAccountBtn(){
       var data = this.bindingAccount;
       applicationForPresentation.bindingAccountPost("/api/withdrawal/bind",data,this)
     },
     submitwithdrawals(){
       if(this.form.withdrawal_money>this.tableData.amount_money){
         this.$message("提现余额不足"+this.form.withdrawal_money);
       }else{
          if(this.form.withdrawal_money/5==0&&this.form.withdrawal_money!=''){
            var data = this.form;
            applicationForPresentation.isWithdrawals("/api/withdrawal/store",data,this);
          }else{
            this.$message("请输入500的倍数");
          }
       }
     },
     handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        var page = val;
        var data = {
          "page":page
        }
         applicationForPresentation.getAccountFund("/api/withdrawal/data",data,this);
      },
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.applicationForPresentation{
  .withdrawals{
    .title{
      text-align: center;
      margin-bottom:20px;
    }
  }
  .main{
    overflow: hidden;
    background:@backgroundfff;
    padding:20px;
    .left{
      float:left;
      padding-left:160px;
      .present-balance{
        font-size:@font16;
        font-weight:bold;
        padding-bottom:20px;
      }
      .balance{
        .count{
          margin-right:20px;
        }
      }
    }
    .right{
      padding-left:300px;
      float:left;
      text-align: center;
      .store-margin{
        font-size:@font16;
        font-weight:bold;
        padding-bottom:20px;
      }
    }
  }
  .list{
    padding:20px;
    background:@backgroundfff;
    .table-list{
      margin:20px 0;
    }
  }
}
 
</style>

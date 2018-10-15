<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/revenueRecord.less";
@import "../../less/storeInfo.less";
.form-create{
    width:380px;
    margin:0 auto;
    .text_forward_center{
        text-align: center;
    }
    .text_forward_left{
        .left_label{
            width:90px;
            text-align: right;
            margin-right:10px;
            display: inline-block;
        }
    }
}
.search_btn{
    overflow: hidden;
    .search_content{
        float:left;
        width:50%;
        overflow: hidden;
        span{
            width:120px;
            float:left;
        }
        .width-120{
            width:120px;
            float:left;
            color:red;
            font-size:16px;
        }
    }
}
</style>
<template>
 <div class="shopCoupons">
     <div class="common-top-title">资金管理</div>
     <div class="count_module">
         <ul class="show_num">
             <li class="item">
                 <div class="warp">
                    <div class="tit amount">销售总金额</div>
                    <div class="tit cash">{{storeMoneyStatistics.total_balance_amount}}</div>
                    <div class="tit"><el-button size="small" @click="selectPutForWard()" type="danger">可提现对账单</el-button></div>
                 </div>
             </li>
             <li class="item">
                 <div class="warp">
                    <div class="tit money">可提现余额</div>
                    <div class="tit cash">{{storeMoneyStatistics.total_withdraw_money}}</div>
                    <div class="tit"><el-button size="small" @click="putForward()" type="danger">提现</el-button></div>
                 </div>
             </li>
             <li class="item">
                 <div class="warp">
                    <div class="tit withdrawal">提现账户</div>
                    <div class="tits">账号：{{storeMoneyStatistics.withdrawal_code}}</div>
                    <div class="tit"><el-button size="small" @click="putForwardPass()" type="danger">提现密码</el-button></div>
                 </div>
             </li>
             <li class="item">
                 <div class="warp">
                    <div class="tit margin">店铺保证金</div>
                    <div class="tit cash">{{storeMoneyStatistics.margin}}</div>
                    <div class="tit"><el-button size="small" @click="recharge()" type="danger">充值</el-button></div>
                 </div>
             </li>
         </ul>
     </div>
     <div class="common-top-title">账户记录</div>
     <div class="statistics">
           <div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="订单记录" name="first">
                    <!-- <order-record></order-record> -->
                </el-tab-pane>
                <el-tab-pane label="退款记录" name="second">
                    <!-- <refund></refund> -->
                </el-tab-pane>
                <el-tab-pane label="提现记录" name="third">
                    <!-- <forward></forward> -->
                </el-tab-pane>
                <el-tab-pane label="罚款记录" name="fourth">
                    <!-- <fine></fine> -->
                </el-tab-pane>
                 <el-tab-pane label="保证金" name="five">
                </el-tab-pane>
                </el-tab-pane>
                 <el-tab-pane label="收支记录" name="six">
                </el-tab-pane>
            </el-tabs>
            <component v-bind:is="currentTabComponent"></component>
        </div>
     </div>
     <el-dialog
        title="创建账号"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="form-create">
            <el-form ref="editData" :rules="rules" :model="editData" label-width="100px">
                <el-form-item label="账号角色:" prop="name">
                    <div class="width-controll">
                        <el-input size="small" v-model.trim="editData.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账号名称:" prop="createnum">
                    <div class="width-controll">
                        <el-input size="small" v-model.trim="editData.createnum"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="登陆密码:" prop="expirationday">
                    <div class="width-controll">
                        <el-input size="small" v-model.trim="editData.expirationday"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="确认密码:" prop="expirationday">
                    <div class="width-controll">
                        <el-input size="small" v-model.trim="editData.expirationday"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账号状态:" prop="limit_take">
                    <div class="width-controll">
                        <el-select size="small" v-model="editData.limit_take" placeholder="1张">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="createdShopCoupons('editData')">确 定</el-button>
        </span>
        </el-dialog>
<el-dialog
title="提现"
:visible.sync="putForwardDialog"
width="40%">
<div class="form-create">
    <el-form ref="editData" :rules="putForwardRules" :model="putForwardForm" label-width="100px">
        <div class="text_forward_center">可提现金额：<span class='cash_color'>¥{{storeMoneyStatistics.total_withdraw_money}}</span></div>
        <div class="text_forward_center">提现账号：{{storeMoneyStatistics.withdrawal_code}}</div>
        <!-- <div class="text_forward_left"><div class="left_label">提现金额:</div> <el-button @click="selectPutForWard()" type="text">请选择可提现订单</el-button><span v-show="isCheckCash">已选提现金额<span style="color:red">{{isCheckCash}}</span></span></div> -->
        <el-form-item label="提现金额:">
            <div class="width-controll">
                <!-- <el-input size="small" :maxlength='26' type="text" v-model="putForwardForm.withdrawal_money"></el-input> -->
                <input type="text" maxlength="14" class="self_input_valiate" v-model.trim="putForwardForm.withdrawal_money" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onpropertychange="if(isNaN(value)) value=value.substring(0,value.length-1);">
                <div v-show="storeCode!=0" style="color:red">提现金额只能输入500整数倍(如:500,1000)</div>
            </div>
        </el-form-item>
        <el-form-item label="提现密码:">
            <div class="width-controll">
                <el-input size="small" :maxlength='26' type="password" v-model.trim="putForwardForm.withdrawal_password"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="手机号码:">
            <div class="width-controll">
                <el-input disabled size="small" v-model.trim="mobile"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="手机验证码:">
            <div class="width-controll">
                <div class="code_width">
                    <input type="text" maxlength="6" class="self_input_valiate" v-model.trim="putForwardForm.verifycode" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                    <!-- <el-input :maxlength='6' v-model="putForwardForm.verifycode"></el-input> -->
                </div>
                <div class="code_width">
                    <div class="code_width_right">
                        <el-button size="small" id="getCode" type="primary" @click="getCode('application')">{{codeTitle}}</el-button>
                    </div>
                </div>
            </div>
        </el-form-item>
    </el-form>
</div>
<span slot="footer" class="dialog-footer">
    <el-button size="small" @click="putForwardDialog = false">取 消</el-button>
    <el-button size="small" type="primary" @click="submitForm('editData')">确 定</el-button>
</span>
</el-dialog>
<!--添加可使用的商品-->
<el-dialog width="80%" title="提现详情" :visible.sync="dialogTableVisible">
  <!-- <el-form :model="form" class="search_admin_list_table">
	<div class="search_btn">
		<div class="search_content">
			<span>已选可提现金额：</span>
			<div class="width-120">
				¥{{isCheckCash}}
			</div>
		</div>
		<div class="search_content">
			<span>剩余可提现金额：</span>
			<div class="width-120">
				¥{{presented}}
			</div>
		</div>
	</div>
  </el-form> -->
		<!--row-key="order_sn"
		  :reserve-selection="true"-->
  <div class="dialog_table">
  	  <el-table
        border
	    ref="multipleTable"
	    :data="tableData9"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="60">
	    </el-table-column>
	    <el-table-column
	      prop="order_sn"
	      label="订单编号">
	    </el-table-column>
	    <el-table-column
	      prop="goods_id"
	      label="商品ID">
	    </el-table-column>
	    <el-table-column
	      prop="goods_name"
	      label="商品名称"
          width="300">
	    </el-table-column>
	    <el-table-column
	      prop="spec_key_name"
	      label="商品规格">
	    </el-table-column>
	    <el-table-column
	      prop="goods_price"
	      label="商品单价(元)">
	    </el-table-column>
	    <el-table-column
	      prop="goods_num"
	      label="商品数量">
	    </el-table-column>
	    <!-- <el-table-column
	      prop="total_amount"
	      label="结算总计(元)">
	    </el-table-column> -->
	    <el-table-column
	      prop="withdraw_money"
	      label="可提现金额(元)">
	    </el-table-column>
	    <el-table-column
	      prop="order_amount"
	      label="实付金额(元)">
	    </el-table-column>
	    <el-table-column
	      prop="pqd_coupon_price"
	      label="平台优惠卷(元)">
	    </el-table-column>
	    <el-table-column
	      prop="expenses_money"
	      label="退款金额(元)">
	    </el-table-column>
	  </el-table>
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChangeForward"
          :current-page="currentPage9"
          :page-size = 'pageSize'
          layout="total, prev, pager, next, jumper"
          :total='total9'>
        </el-pagination>
      </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="selectGoods()">确 定</el-button>
  </div>
</el-dialog>
<!--添加可使用的商品-->
<el-dialog width="600px" title="提现密码" :visible.sync="dialogTableVisiblePass">
<div class="form-create">
    <el-form ref="editData" :rules="putForwardRules" :model="putForwardForm" label-width="100px">
        <el-form-item label="手机号码:">
            <div class="width-controll">
                <el-input disabled size="small" v-model.trim="mobile"></el-input>
            </div>
        </el-form-item>
        <el-form-item label="手机验证码:" >
            <div class="width-controll">
                <div class="code_width">
                    <!-- <el-input :maxlength='6' v-model="putForwardForm.verifycode"></el-input> -->
                    <input size="small" type="text" maxlength="6" class="self_input_valiate" v-model.trim="putForwardForm.verifycode" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                </div>
                <div class="code_width">
                    <div class="code_width_right">
                        <el-button size="small" id="getCode" type="primary" @click="getCode('putWard')">{{codeTitle}}</el-button>
                    </div>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="设置密码:" >
            <div class="width-controll">
                <el-input size="small" type="password" :maxlength='26' v-model.trim="putForwardForm.new_password"></el-input>
                <div style="color:red">提现密码8-16位，数字和字母组合。</div>
            </div>
        </el-form-item>
        <el-form-item label="重复密码:" >
            <div class="width-controll">
                <el-input size="small" type="password" :maxlength='26' v-model.trim="putForwardForm.confirm_password"></el-input>
            </div>
        </el-form-item>
    </el-form>
</div>
  <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogTableVisiblePass = false">取 消</el-button>
    <el-button size="small" type="primary" @click="editPass()">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import account from '../../js/account';

import orderRecord from "./module/orderRecord";
import refund from "./module/refund";
import forward from "./module/forward";
import fine from "./module/fine";
import bond from "./module/Bond";
import recordRevenueAndExpenditure from "./module/recordRevenueAndExpenditure";

// 引入日期组件
import pickerData from '../../components/picker';
 export default {
   data () {
     return {
     	mobile:'',
         storeCode:'',
         presented:0,
         dialogTableVisiblePass:false,
         isCheckCash:0,
         checkCash:0,
         pageSize:5,
         tableData9:[],
         currentPage9:1,
         total9:0,
         multipleSelection:[],
         dialogTableVisible:false,
         codeTitle:'获取验证码',
         putForwardRules:{
            name: [
                { required: true, message: '请输入1活动名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
         },
         putForwardForm:{
             name:''
         },
         putForwardDialog:false,
         currentTabComponent:'orderRecord',
         storeMoneyStatistics:{},
         activeName: 'first',  //  first  second
         radio3: '订单记录',
         rules:{
             name: [
                { required: true, message: '请输入优惠券名称', trigger: 'blur' },
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
             money: [
                { required: true, message: '请输入面额', trigger: 'blur' },
                { min: 1, max:9999, message: '长度在 1 到 9999 个字符', trigger: 'blur' }
            ],
             condition: [
                { required: true, message: '请输入使用条件', trigger: 'blur' },
                { min: 1, max: 50000, message: '长度在 1 到 50000 个字符', trigger: 'blur' }
            ],
             createnum: [
                { required: true, message: '请输入创建张数', trigger: 'blur' },
                { min: 1, max:50000, message: '最多创建5万张', trigger: 'blur' }
            ],
             expirationday: [
                { required: true, message: '请输入有效期天数', trigger: 'blur' },
                { min: 1, max: 30, message: '最大不超过30天', trigger: 'blur' }
            ],
             limit_take: [
                { required: true, message: '请选择每人限领张数', trigger: 'blur' },
                { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
            ]
         },
         use_start_time:'',
         use_end_time:'',
         form:{
             name:''
         },
         centerDialogVisible:false,
         coupon_name:'',
         coupon_status:0,
         tableData:[],
         editData:{

         },
         sTime:'',
         eTime:'',
         bond:'',
         options:[
             {
               "label":'全部',
               "value":0
             },
             {
               "label":'领取中',
               "value":1
             },
             {
               "label":'已领完',
               "value":2
             },
             {
               "label":'已结束',
               "value":3
             }
         ]
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('revenueRecord', function(id){
		    that.fetch();
		})
	   	this.bond = this.$route.query.bond;
	   	if(this.bond){
	   		this.activeName = 'five';
	   		this.currentTabComponent = 'bond';
	   	}
   },
   components:{
       pickerData,orderRecord,refund,forward,fine,bond,recordRevenueAndExpenditure
    },
    watch:{

    },
   methods:{
   	recharge(){
   		this.$router.push('/store/accountFund/recharge')
   	},
   	fetch(){
       account.storeMoneyStatistics("/Fundmanagement/storeMoneyStatistics",this);
       var mobile = localStorage.getItem("mobile");
       this.mobile = mobile;
   	},
       editPass(){
       	if(this.putForwardForm.verifycode==''){
       		this.$message({
                   type:'info',
                   message:'验证码不能为空'
               })
               return
       	}else if(this.putForwardForm.new_password==undefined){
       		this.$message({
                   type:'info',
                   message:'密码不能为空'
               })
               return
       	}else if(this.putForwardForm.new_password!=this.putForwardForm.confirm_password){
       		this.$message({
                   type:'info',
                   message:'两次密码不一致'
               })
               return
       	}else {
       		var re =  /^(?![^a-zA-Z]+$)(?!\D+$)/;
       		var newPass  = this.putForwardForm.new_password;
       		if (re.test(newPass)){
       			if(newPass.length>7){
		            var data = {
		                verifycode: this.putForwardForm.verifycode,
		                new_password: this.putForwardForm.new_password,
		                confirm_password: this.putForwardForm.confirm_password,
		            }
		            account.editPassword("Withdrawal/editPassword",data,this)
       			}else{
	       			this.$message({
	                   type:'info',
	                   message:'提现密码8-16位，数字和字母组合'
	               })
	               return
       			}
       		}else{
       			this.$message({
                   type:'info',
                   message:'提现密码8-16位，数字和字母组合'
               })
               return
       		}
       	}
       },
       submitForm(){
           var money = this.putForwardForm.withdrawal_money;
           if(money==undefined){
               this.$message({
                   type:'info',
                   message:'提现金额不能为空'
               })
               return
           }
           if(money<0){
               this.$message({
                   type:'info',
                   message:'提现金额不能为负数'
               })
               return
           }
           if(this.storeCode!=0){
            if(money%500!=0){
                this.$message({
                    type:'info',
                    message:'提现只能是500的倍数'
                })
                return
            }
           }
           if(this.putForwardForm.withdrawal_password==undefined){
               this.$message({
                   type:'info',
                   message:'请输入提现密码'
               })
               return
           }
           if(this.putForwardForm.verifycode==undefined){
               this.$message({
                   type:'info',
                   message:'请输入验证码'
               })
               return
           }
           var data = {
               withdrawal_money:this.putForwardForm.withdrawal_money,
               withdrawal_password:this.putForwardForm.withdrawal_password,
               verifycode:this.putForwardForm.verifycode,
           }
            account.withdrawalMoney("Withdrawal/withdrawalMoney",data,this)
       },
       selectGoods(){
       	/*数组去重*/
       		if(this.multipleSelection.length==0){
       			this.$message({
       				type:'info',
       				message:'请先选择订单'
       			})
       			return
       		}
            var arrs = [];
            this.multipleSelection.forEach((value, index) => {
                    arrs.push(value.order_sn)
            });
           var data = {
               order_sns:arrs,
           }
            account.applicationWithdrawal("Withdrawal/applicationWithdrawal",data,this)
       },
       handleCurrentChangeForward(val){
           var data = {
               page:val,
               pageSize:this.pageSize
           }
           account.getWithdrawOrder("Withdrawal/getWithdrawOrder",data,this)
       },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // this.isCheckCash = 0;
        // var that = this;
        // this.multipleSelection.forEach((value, index) => {
        //        that.isCheckCash +=  (Math.floor(value.withdraw_money * 1000) / 1000);
        // });
        // that.isCheckCash = that.isCheckCash.toFixed(2);
        // that.presented = that.storeMoneyStatistics.total_withdraw_money- that.isCheckCash;
        // that.presented = that.presented.toFixed(2);
      },
        getCode(type){
           var getCode = document.getElementById("getCode");
               getCode.disabled = true;
           var t = 60;
           var timer;
           var that = this;
           if(type=="edit"){
                var data = {
                    tem: "store_edit_account_tem"
                }
           }else if(type=="bind"){
                var data = {
                    tem: "store_bing_account_tem"
                }
            }else if(type=="putWard"){
                var data = {
                    tem: "application_withdrawal_tem"
                }
           }else if(type=="application"){
                var data = {
                    tem: "application_withdrawal_tem"
                }
           }
            account.sendSms("SmsLog/sendSms",data,this)
           timer = setInterval(function(){
                t--;
                that.codeTitle = '('+t+')后重新发送';
                if(t<1){
                    clearInterval(timer);
                    getCode.disabled = false;
                    that.codeTitle = '获取验证码';
                }
           },1000)
       },
       selectPutForWard(){
           var data = {
               page:1,
               pageSize:this.pageSize
           }
           account.getWithdrawOrder("Withdrawal/getWithdrawOrder",data,this)
       },
       putForward(){
           this.putForwardForm.verifycode = '';
           this.putForwardDialog = true;
       } ,
       putForwardPass(){
           this.putForwardForm.verifycode = '';
           this.dialogTableVisiblePass = true;
       } ,
       handleClick(tab, event) {
        if(tab.name=='first'){
            this.currentTabComponent = 'orderRecord';
        }else if(tab.name=='second'){
            this.currentTabComponent = 'refund';
        }else if(tab.name=='third'){
            this.currentTabComponent = 'forward';
        }else if(tab.name=='fourth'){
            this.currentTabComponent = 'fine';
        }else if(tab.name=='five'){
            this.currentTabComponent = 'bond';
        }else if(tab.name=='six'){
            this.currentTabComponent = 'recordRevenueAndExpenditure';
        }
      },
       createdShopCoupons(formName){
           var that = this;
           this.$refs[formName].validate((valid) => {
            if (valid) {
                var data = {
                    name:that.editData.name,
                    money:that.editData.money,
                    condition:that.editData.condition,
                    createnum:that.editData.createnum,
                    use_start_time:that.editData.use_start_time?that.editData.use_start_time:that.sTime,
                    use_end_time:that.editData.use_end_time?that.editData.use_end_time:that.eTime,
                    limit_take:that.editData.limit_take,
                    expirationday:that.editData.expirationday
                }
                shopCoupons.editShopCoupons("/api/coupon/store",data,that);
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       change(msg){
            if(msg){
            this.use_start_time = msg[0];
            this.use_end_time = msg[1];
            }else{
            this.use_start_time = '';
            this.use_end_time = '';
            }
       },
       editCoupons(id){
           this.centerDialogVisible = true;
           shopCoupons.editCoupons("/api/coupon/show/"+id,this);
       },
       deleteCoupons(index,id){
           var msg = "删除";
            this.$confirm('您确定要'+msg+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: msg+'成功!'
                    });
                shopCoupons.deleteShopCoupons("/api/coupon/destroy/"+id,index,this);
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
       },
       suspendCoupons(index,status,id){
           var that = this;
           var msg = '';
           if(status==1){
              msg = "暂停"
           }else{
               msg = "开启"
           }
            this.$confirm('您确定要'+msg+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    if(status==1){
                        that.tableData[index].status = 0
                    }else{
                        that.tableData[index].status = 1
                    }
                    this.$message({
                        type: 'success',
                        message: msg+'成功!'
                    });
                    var data = {
                        id:id,
                        status:status
                    }
                    shopCoupons.isSuspendCoupons("/api/coupon/status",data,that)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
       },
     change(msg){
      if(msg){
        this.sTime = msg[0];
        this.eTime = msg[1];
       }else{
        this.sTime = '';
        this.eTime = '';
       }
     },
       searchQueryShopCoupons(){
            var data = {
                'coupon_name':this.coupon_name,
                'page':1,
                'coupon_status':this.coupon_status,
                'start':this.sTime!='NaN-0NaN-0NaN'?this.sTime:0,
                'end':this.eTime!='NaN-0NaN-0NaN'?this.eTime:0
            }
            shopCoupons.getShopCoupons("/api/coupon/index",data,this);
       },
   }
 }
</script>

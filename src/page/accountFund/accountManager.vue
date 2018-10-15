<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/storeInfo.less";
.warp_withdrawal{
	padding:0 0 10px 0;
}
</style>
<template>
 <div class="account_manager">
     <div class="common-top-title">账户管理</div>
     <div class="content">
         <div class="account"  v-show="withdrawalCode==''">
             <div class="account_title">暂未绑定提现用户</div>
             <div class="return_url"><el-button @click="bingAccount()" size="small" type="text">立刻绑定>></el-button></div>
         </div>
         <div class="account" v-show="withdrawalCode!=''">
             <div class="account_title">我的账户</div>
             <div class="return_url">账号：{{withdrawalCode}}<span><el-button @click="editAccount()" size="small" type="text">修改>></el-button></span> </div>
         </div>
     </div>

<el-dialog
title="修改账户"
:visible.sync="editAccountDialog"
width="400px">
<div class="form-create">
    <el-form ref="editData" :rules="rulesEdit" :model="editData" label-width="100px">
    	<div class="warp_withdrawal">
	        <el-form-item label="支付宝账户:" prop="withdrawal_code">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" v-model.trim="editData.withdrawal_code"></el-input>
	            </div>
	        </el-form-item>
       </div>
    	<div class="warp_withdrawal">
	        <el-form-item label="支付宝姓名:" prop="withdrawal_name">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" v-model.trim="editData.withdrawal_name"></el-input>
	            </div>
	        </el-form-item>
       </div>
    	<div class="warp_withdrawal">
	        <el-form-item label="提现账号:" prop="name">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" disabled v-model.trim="editData.name"></el-input>
	            </div>
	        </el-form-item>
       </div>
    	<div class="warp_withdrawal">
	        <el-form-item label="手机号码:">
	            <div class="width-controll">
	                <el-input disabled size="small" v-model.trim="mobile"></el-input>
	            </div>
	        </el-form-item>
       </div>
    	<div class="warp_withdrawal">
	        <el-form-item label="手机验证码:" prop="verifycode">
	            <div class="width-controll">
	                <div class="code_width">
	                    <input type="text" :maxlength="6" class="self_input_valiate" v-model.trim="editData.verifycode" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
	                </div>
	                <div class="code_width">
	                    <div class="code_width_right">
	                        <el-button size="small" id="getCode" type="primary" @click="getCode('edit')">{{codeTitle}}</el-button>
	                    </div>
	                </div>
	            </div>
	        </el-form-item>
       </div>
    </el-form>
</div>
<span slot="footer" class="dialog-footer">
    <el-button size="small" @click="editAccountDialog = false">取 消</el-button>
    <el-button size="small" type="primary" @click="submitForm('editData')">确 定</el-button>
</span>
</el-dialog>
<el-dialog
title="绑定/编辑账户"
:visible.sync="bindingAccountDialog" width = "400px">
<div class="form-create">
    <el-form ref="bingData" :rules="rulesBind" :model="bingData" label-width="100px">
    	<div class="warp_withdrawal">
	        <el-form-item label="支付宝账户:" prop="withdrawal_code">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" v-model.trim="bingData.withdrawal_code"></el-input>
	            </div>
	        </el-form-item>
	    	<div class="warp_withdrawal">
    	</div>
	        <el-form-item label="支付宝姓名:" prop="withdrawal_name">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" v-model.trim="bingData.withdrawal_name"></el-input>
	            </div>
	        </el-form-item>
    	</div>
    	<div class="warp_withdrawal">
	        <el-form-item type="password" label="提现密码:" prop="password">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" type="password"  v-model.trim="bingData.password"></el-input>
	            </div>
	        </el-form-item>
    	</div>
    	<div class="warp_withdrawal">
	        <el-form-item label="重复密码:" prop="confirm_password">
	            <div class="width-controll">
	                <el-input :maxlength="50" size="small" type="password"  v-model.trim="bingData.confirm_password"></el-input>
	            </div>
	        </el-form-item>
    	</div>
    	<div class="warp_withdrawal">
	        <el-form-item label="手机验证码:" prop="verifycode">
	            <div class="width-controll">
	                <div class="code_width">
	                    <!--<el-input :maxlength="8" size="small" v-model="bingData.verifycode"></el-input>-->
	                    <input type="text" :maxlength="6" class="self_input_valiate" v-model.trim="bingData.verifycode" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
	                </div>
	                <div class="code_width">
	                    <div class="code_width_right">
	                        <el-button size="small" id="getCode" type="primary" @click="getCode('bind')">{{codeTitle}}</el-button>
	                    </div>
	                </div>
	            </div>
	        </el-form-item>
    	</div>
    </el-form>
</div>
<span slot="footer" class="dialog-footer">
    <el-button size="small" @click="bindingAccountDialog = false">取 消</el-button>
    <el-button size="small" type="primary" @click="submitFormBingData('bingData')">确 定</el-button>
</span>
</el-dialog>
 </div>
</template>

<script>
import account from "../../js/account";

 export default {
   data () {
     return {
     	mobile:'',
         withdrawalCode:'',
         form:{
            verifycode:'',
            withdrawal_name:'',
            withdrawal_code:'',
         },
         rulesEdit:{
             withdrawal_name: [
                { required: true, message: '请输入提现账户名称', trigger: 'blur' },
                { min: 1, max: 50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
             withdrawal_code: [
                { required: true, message: '请输入提现账号', trigger: 'blur' },
                { min: 1, max: 50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
         },
         rulesBind:{
             withdrawal_code: [
                { required: true, message: '请输入支付宝账户', trigger: 'blur' },
                { min: 1, max:50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
             withdrawal_name: [
                { required: true, message: '请输入支付宝姓名', trigger: 'blur' },
                { min: 1, max:50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
             password: [
                { required: true, message: '请输入提现密码', trigger: 'blur' },
                { min: 1, max:50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
             confirm_password: [
                { required: true, message: '请输入确认密码', trigger: 'blur' },
                { min: 1, max:50, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
         },
         codeTitle:'获取验证码',
         editData:{
            verifycode:'',
            withdrawal_name:'',
            withdrawal_code:'',
         },
         bingData:{
            withdrawal_code:'',
            withdrawal_name:'',
            verifycode:'',
            password:'',
            confirm_password:'',
         },
         editAccountDialog:false,
         bindingAccountDialog:false,
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('accountManager', function(id){
		    that.fetch();
		})
   },
   components: {

   },
   methods:{
   	fetch(){
        account.seeWithdrawalAccount("Withdrawal/seeWithdrawalAccount",this);
       var mobile = localStorage.getItem("mobile");
       this.mobile = mobile;
   	},
       submitFormBingData(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
            	if(this.bingData.verifycode==''){
            		this.$message({
            			type:'info',
            			message:'请您输入验证码'
            		})
            		return
            	}else if(this.bingData.password!=this.bingData.confirm_password){
            		this.$message({
            			type:'info',
            			message:'密码不一致'
            		})
            		return
            	}
                var data = {
                    withdrawal_code:this.bingData.withdrawal_code,
                    withdrawal_name:this.bingData.withdrawal_name,
                    verifycode:this.bingData.verifycode,
                    password:this.bingData.password,
                    confirm_password:this.bingData.confirm_password,
                }
                account.bindAccount("Withdrawal/bindAccount",data,this)

            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
            	if(this.editData.verifycode==''){
            		this.$message({
            			type:'info',
            			message:'请您输入验证码'
            		})
            		return
            	}
                var data = {
                    verifycode:this.editData.verifycode,
                    withdrawal_name:this.editData.withdrawal_name,
                    withdrawal_code:this.editData.withdrawal_code,
                }
                account.editAccount("Withdrawal/editAccount",data,this)
            } else {
                return false;
            }
            });
        },
       bingAccount(){
         this.bindingAccountDialog = true;
       },
       editAccount(){
         this.editAccountDialog = true;
         this.editData.name = this.withdrawalCode;
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
                account.sendSms("SmsLog/sendSms",data,this)
           }else if(type=="bind"){
            var data = {
                tem: "store_bing_account_tem"
            }
            account.sendSms("SmsLog/sendSms",data,this)
           }
           timer = setInterval(function(){
                t--;
                that.codeTitle = '('+t+')后重新发送';
                if(t<1){
                    clearInterval(timer);
                    getCode.disabled = false;
                    that.codeTitle = '获取验证码';
                }
           },1000)
       }
   }
 }
</script>




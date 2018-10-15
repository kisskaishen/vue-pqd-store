<template>
 <div class="passwordSecurity">
     <div class="common-top-title">店铺安全信息</div>
     <div class="main">
         <div class="info">
             <span>账户名：{{storeInfoForm.merchant_name}}</span>
             <span>店铺名：{{storeInfoForm.store_name}}</span>
             <span>QQ：{{storeInfoForm.qq}}</span>
        </div>
        <div class="edit-pwd">
            <div class="edit_pwd_warp">
                <div class="item">
                    <div class="search-input">
                        <div class="leftLable">当前密码：</div><div class="rightLable">
                            <el-input size="small" type="password" v-model.trim="ruleForm.oldpwd" placeholder=""></el-input></div>
                    </div>
                </div>
                <div class="item">
                    <div class="search-input">
                        <div class="leftLable">新密码：</div>
                        <div class="rightLable">
                            <el-input size="small" type="password" v-model.trim="ruleForm.newpwd" placeholder=""></el-input>
                        </div>
                    </div>
                    <!-- <div style="color:#aaa;margin-left:400px">不少于6个字符，必须包含数字、字母、特殊字符，其中任意两种</div> -->
                </div>
                <div class="items">
                    <div class="search-inputs">
                        <div class="leftLable"></div><div class="rightLable">不少于6个字符，必须包含数字、字母、特殊字符，其中任意两种</div>
                    </div>
                </div>
                <div class="item">
                    <div class="search-input">
                        <div class="leftLable">确认密码：</div><div class="rightLable"><el-input size="small" type="password" v-model.trim="ruleForm.repeatpwd" placeholder=""></el-input></div>
                    </div>
                </div>
                <div class="center"><el-button size="small" type="danger" @click="submitPassSecurity()">提交</el-button></div>
            </div>
        </div>
     </div>
 </div>
</template>

<script>
import passwordSecurity from "../../js/passwordSecurity";
import storeInfo from "../../js/storeInfo";
 export default {
   data () {
     return {
         storeInfoForm:{},
         input2:'',
         infoData:{},
         ruleForm:{
            oldpwd:'',
            newpwd:'',
            repeatpwd:'' 
         }
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('passwordSecurity', function(id){
		    that.fetch();
		})
   },
   components: {

   },
   methods:{
   	fetch(){
        storeInfo.getStoreInfo("/Store/storeInfo",this);
   	},
        submitPassSecurity(){
            if(this.ruleForm.newpwd==this.ruleForm.repeatpwd){
                var data = this.ruleForm;
                passwordSecurity.editPasswordSecurity("/Store/modifyPwd",data,this)
            }else if(this.ruleForm.newpwd==this.ruleForm.oldpwd){
                this.$message("新旧密码不能一样");
                this.ruleForm.newpwd = '';
                this.ruleForm.repeatpwd = '';
                return
            }else{
                this.$message("两次密码输入不一致");
                this.ruleForm.repeatpwd = '';
                return 
            }
        }
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.passwordSecurity{
    background:@backgroundfff;
    .main{
        padding:20px;
        .info{
            margin:0 auto;
            text-align: center;
            span{
                margin:0 10px;
            }
        }
        .edit-pwd{
            margin:20px 0;
            background:@backgroundeee;
            padding:40px 0;
            text-align: center;
            .edit_pwd_warp{
                width:340px;
                margin:0 auto;
            }
        }
    }
    .items{
        position: relative;
        height:20px;
        .search-inputs{
            .rightLable{
                position: absolute;
                white-space :  nowrap ;
                left:130px;
                color:#ccc;
                top:0;
            }
        }
    }
}
 
</style>

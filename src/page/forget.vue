
<style lang="less">
@import "./../less/config.less";
@import "../less/login.less";
</style>
<template>
 <div class="login">
      <div class="logo">
          <div class="login_warp">
              <img src="../img/login/logo.png" alt="">
          </div>
      </div>
      <div class="main">
        <div class="login_warp">
        <div class="swiper">
          <img class="swiper-login" src="../img/login/diannaobg.png" alt="">
        </div>
        <div class="sign-up">
          <div class="title">
            <div class="position">
              修改密码
            </div>
          </div>
          <div class="info">  
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
              <div class="item">  
                <el-form-item prop="phone">  
                  <div class="warp_input_bottom">
                      <input class="login_input" type="text" placeholder="登录账号" v-model.trim="ruleForm.phone"  maxLength='60'>
                  </div>
                </el-form-item>
              </div>   
              <div class="item">  
                <el-form-item prop="password">  
                  <div class="warp_input_bottom">
                      <input class="login_input" type="password" placeholder="新密码" v-model.trim="ruleForm.password"  maxLength='60'>
                  </div>
                </el-form-item>
              </div>            
              <div class="item"> 
              <el-form-item prop="repassword">  
                  <div class="warp_input_bottom">
                    <input class="login_input" type="password" placeholder="确认密码" v-model.trim="ruleForm.repassword"  maxLength='60'>               
                  </div>
              </el-form-item>
              </div>
            
            <div class="verification-code">
                    <div class="warp_input_bottom">
                <el-form-item prop="verifycode">
                        <div class="width-controll">
                            <div class="code_width">
                                <!-- <el-input v-model="ruleForm.verifycode"></el-input> -->
                                <input class="login_inputs" type="text" placeholder="验证码" v-model.trim="ruleForm.verifycode"  maxLength='6'>               
                            </div>
                            <div class="code_width">
                                <div class="code_width_right">
                                    <el-button size="small" id="getCode" type="primary" @click="getCode()">{{codeTitle}}</el-button>
                                </div>
                            </div>
                        </div>
                </el-form-item>
                    </div>
            </div> 
            <div class="center">
              <el-button type="danger" @click="submitForm('ruleForm')">确认</el-button>  
            </div>
            </el-form>
          </div>
        </div>
        </div>
      </div>
 </div>
    <!-- <div class="forget">
        <div class="forget_top">
            <div class="logo"><img src="../img/logo1.png" alt=""></div>
        </div>
        <div class="forget_main">
            <div class="forget_main_warp">
                <div class="title">找回密码</div>
                <div class="valiate">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="新密码" prop="password">
                            <el-input type="password" v-model="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="repassword">
                            <el-input type="password" v-model="ruleForm.repassword"></el-input>
                        </el-form-item>
                        <el-form-item label="手机验证码:" prop="verifycode">
                            <div class="width-controll">
                                <div class="code_width">
                                    <el-input v-model="ruleForm.verifycode"></el-input>
                                </div>
                                <div class="code_width">
                                    <div class="code_width_right">
                                        <el-button id="getCode" type="primary" @click="getCode()">{{codeTitle}}</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div> 
    </div> -->
</template>
<script>
import Getcode from './../js/forget';
 export default {
   data () {
     return {
         images:'',
         codeTitle:'获取验证码',
        ruleForm: {
          phone: '',
          password:'',
          captcha_code:'',
          verifycode:'',
        },        
        rules: {
          phone: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
            { min: 1, max:60, message: '密码必须是1到16位数组和字母的组合', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 60, message: '密码必须是6到60位数组和字母的组合', trigger: 'blur' }
          ],
          repassword: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { min: 6, max: 60, message: '密码必须是6到60位数组和字母的组合', trigger: 'blur' }
          ],
          captcha_code: [
            { required: true, message: '请输入图形验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
          ],
          verifycode: [
            { required: true, message: '请输入手机验证码', trigger: 'blur' },
            { min: 4, max: 6, message: '长度在 最多6 个字符', trigger: 'blur' }
          ],
        }
     }
   },
   created(){
       this.images = this.headerCommon+"/passport/capatch?"+new Date();
   },
   methods : {
    refreshCode() {
      this.images = this.headerCommon+"/passport/capatch?"+new Date();
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
                merchant_name:this.ruleForm.phone,
                verifycode:this.ruleForm.verifycode,
                newpwd:this.ruleForm.password,
                repeatpwd:this.ruleForm.repassword,
            }
            Getcode.forgetPwd('Passport/forgetPwd',data,this);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       getCode(){
         if(this.ruleForm.phone==''){
            this.$message({
              type:'info',
              message:'请先输入手机号码'
            })
            return 
         }
           var timer;
            clearInterval(timer);
           var getCode = document.getElementById("getCode");
               getCode.disabled = true;
           var t = 60;
           var that = this;
           var data = {
              merchant_name:this.ruleForm.phone,
           }
           Getcode.getcode('Passport/sendSms',data,this);
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
   },
   components: {

   }
 }
</script>

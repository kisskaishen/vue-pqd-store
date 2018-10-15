
<style lang="less" scoped>
@import "../less/config.less";
@import "../less/login.less";
.explain_link{
  text-align: center;
}
</style>
<template>
 <div class="login" @keydown="KeyDown();">
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
                  拼趣多管理后台
                </div>
              </div>
              <div class="info">  
                <el-form :model="ruleForm2" status-icon :rules="rulesLogin" ref="ruleForm2">
                  <div class="item">  
                    <el-form-item prop="user">  
                      <div class="warp_input_bottom">
                          <input id="user" class="login_input" type="text" placeholder="请输入账号" v-model.trim="ruleForm2.user"  maxLength='60'>
                      </div>
                    </el-form-item>
                  </div>            
                  <div class="item"> 
                  <el-form-item prop="pass">  
                      <div class="warp_input_bottom">
                        <input class="login_input" type="password" placeholder="请输入密码" v-model.trim="ruleForm2.pass"  maxLength='60'>               
                      </div>
                  </el-form-item>
                  </div>
                
                <div class="verification-code">
                    <div class="warp_input_bottom">
                      <div class="left">               
                        <el-form-item> 
                                <input class="login_input_120" type="text" placeholder="验证码" v-model.trim="code"  maxLength='4'>               
                        </el-form-item>
                      </div>
                      <div class="right">
                            <div class="code" @click="refreshCode()">
                                <img :src='images' alt="" style="width:130px;height:38px;"/>
                            </div>
                      </div>
                  </div>
                </div>
                <div class="remember-password">
                  <el-checkbox id = "remember" v-model="checked" @change="rememberPwd()">记住密码</el-checkbox>
                  <div class="forget"><router-link to="/store/forget" class="colorCashs">忘记密码?</router-link></div>
                </div> 
                <div class="remember-password">
                  <div class="explain_link">
                      推荐使用chrome浏览器<a target="_blank" style="color:blue;margin-left:10px;" href="https://www.google.cn/chrome/">chrome下载地址</a>
                  </div>
                </div> 
                <div class="center btn_margin">
                  <el-button id="sign_up" type="danger" @click="submitForm('ruleForm2')">确认登录</el-button>  
                </div>
                </el-form>
              </div>
            </div>
      </div>
      </div>
      <copy-right></copy-right>
 </div>
</template>

<script>
import identify from '../components/identify';
import copyRight from '../components/copyRight';
import login from '../js/login';
 export default {
   data () {
     return {
     	currentUrl:'',
       guids:'',
       flag:true,
       oldVal:{},
       images:'',
       capatchImg:'',
       identifyCodes: "1234567890",
      identifyCode: "",
      code:'',
       ruleForm2:{
        //  user:'9648',
        //  pass:'123456',
         user:'',
         pass:'',
         code:''
       },
       checked: false,
       itmes:[
         {
           imgs:"http://ooc3vwe04.bkt.clouddn.com/59b62f27e13e048564.jpg"
         },
         {
           imgs:"http://ooc3vwe04.bkt.clouddn.com/5a2520299169281907.jpg"
         }
       ],
       rulesLogin:{
         user:[
           {required:true,message:"请输入用户名",trigger:"blur"},
           {min:3,max:60,message:"用户名长度在3-60个字符",trigger:"blur"}
         ],
         pass:[
           {required:true,message:"请输入密码",trigger:"blur"},
           {min:6,max:60,message:"密码长度在6-60个字符",trigger:"blur"}
         ],
       }
     }
   },
   created(){			
   		var configUrl = {
   			preUrl: "mygladmin.pinquduo.top", 
   			preUrlStore: "store.pinquduo.top", 
   			testUrl: "testmygladmin.pinquduo.cn", 
   			testUrlStore: "teststore1.pinquduo.cn",
   			prodUrl: "mygladmin.pinquduo.cn", 
   			prodUrlStore: "sell.pinquduo.cn", 
   		}
			var currentHostTop = configUrl.preUrlStore;
			var currentHostCn = configUrl.testUrlStore;
			var currentHostCom = configUrl.prodUrlStore;
   		const root = process.env.API_ROOT;
			var topRoot  = 'http://storeapitest.pinquduo.top';
			var testRoot = 'https://storeapitest.pinquduo.cn';
			var comRoot  = 'https://storeapi.pqdshop.com';
			var k_host = window.location.host;
			
			if(k_host == currentHostTop){
				this.currentUrl = topRoot;
			}else if(k_host == currentHostCn){
				this.currentUrl = testRoot;
			}else if(k_host == currentHostCom){
				this.currentUrl = comRoot;
			}else if(k_host=='192.168.1.201:8087'){
				if(root=='http://storeapitest.pinquduo.top'){
					this.currentUrl = topRoot;
				}else if(root=='https://storeapitest.pinquduo.cn'){
					this.currentUrl = testRoot;
				}else if(root=='https://storeapi.pqdshop.com'){
					this.currentUrl = comRoot;
				
				}	
			}
     this.guids  = this.guid();
     this.images = this.currentUrl+"/passport/capatch?guid="+this.guids;
     var is_check = localStorage.getItem("is_check");
     if(is_check=='true'){
       var usernameItem = localStorage.getItem('dXNlcm5hbWU=');
       var passwordItem = localStorage.getItem('cGFzc3dvcmQ=');
        var username = this.$Base64.decode(usernameItem);
        var password = this.$Base64.decode(passwordItem);
        // this.oldVal.push({'user':username,"pass":password})
        this.oldVal.user = username;
        this.oldVal.pass = password;
        this.ruleForm2.user = username;
        this.ruleForm2.pass = password;
        this.checked = true;
     }
   },
   watch:{
      'ruleForm2':{
          handler:(val)=>{
            var _this = this;
            var check = localStorage.getItem("is_check");
            var remember = document.getElementById("remember");
            var user = document.getElementById("user");
            if(this.flag||this.flag==undefined){
                this.flag = false;
                return
            }else{
              if(check=='true'){
//                remember.click();
                return 
              }
            }
          },
          // 深度观察
          deep:true
      }
   },
  components:{
  	identify,copyRight
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
			KeyDown(){
			  if (event.keyCode == 13){
				var sign_up = document.getElementById("sign_up");
				sign_up.click();
			  }
			},
    guid() {
      function S4() {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },
    rememberPwd(){
        var username = this.$Base64.encode('username');
        var password = this.$Base64.encode('password');
        if(this.checked==true){
          /* 加密传输 */
          var user = this.$Base64.encode(this.ruleForm2.user)
          var pwd = this.$Base64.encode(this.ruleForm2.pass)
          localStorage.setItem(username,user)
          localStorage.setItem(password,pwd)
          localStorage.setItem("is_check",true)
        }else{
          localStorage.setItem(username,'')
          localStorage.setItem(password,'')
          localStorage.setItem("is_check",false)
        }
    },
    //表单
      submitForm(ruleForm2) {
        var that = this;
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
			        if(this.checked){
			        	localStorage.setItem("is_check",true)
			        }
                      /* 加密传输 */
              var username = this.$Base64.encode('username');
              var password = this.$Base64.encode('password');
              var user = this.$Base64.encode(this.ruleForm2.user)
              var pwd = this.$Base64.encode(this.ruleForm2.pass)
              localStorage.setItem(username,user)
              localStorage.setItem(password,pwd)
              var data = {
                      'username': that.ruleForm2.user, //"15868021803"
                      'password': that.ruleForm2.pass,
                      'capatch': that.code,
                      'guid':this.guids
                    }
              login.login("/Passport/login",data,that)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    // 验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
     this.guids  = this.guid();
     this.images = this.currentUrl+"/passport/capatch?guid="+this.guids;
      // this.identifyCode = "";
      // this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
 }
}
</script>


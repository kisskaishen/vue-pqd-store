<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/storeInfo.less";

</style>
<template>
 <div class="storeinfo">
     <div class="common-top-title">商家信息
         <div class="status">
             营业状态:
             <span class="colorStatus">{{storeInfoForm.state == 1 ? "营业中" : "停业中"}}</span>
         </div>
     </div>
     <div class="main">
        <el-form :model="storeInfoForm" :rules="rules" ref="storeInfoForm" label-width="140px" class="demo-ruleForm">
            <div class="shop-basic-information">
                <div class="common-bg-title">店铺基本信息</div>
                <div class="content" style="overflow: hidden;">
                    <div class="left">
                        <div class="store-id"><span class="labels">店铺ID：</span>{{storeInfoForm.storeid}}</div>
                        <div class="store-name"><span class="labels">店铺名称：</span>{{storeInfoForm.store_name}}</div>
                        <div class="store-detail">
                            <el-form-item label="店铺详情：" prop="introduce">
                                <!-- <el-input type="textarea" v-model="storeInfoForm.introduce"></el-input> -->
                                <el-input
                                    type="textarea"
                                    :maxlength="100"
                                    :autosize="{ minRows: 4, maxRows: 8}"
                                    placeholder="请输入内容"
                                    v-model.html="storeInfoForm.introduce">
                                </el-input>
                                <!--<div class="textareas_style" v-html="storeInfoForm.introduce">

                                </div>-->
                            </el-form-item>
                            <!-- <div class="name">店铺详情：</div>
                            <textarea class="textareas" v-model="introduce" name="" id="" cols="30" rows="10"></textarea> -->
                        </div>
                        <div class="info colorCash">限5-100字</div>
                    </div>
                    <div class="right">
                        <div class="store-logo">
                            <!-- <div class="logo">{{storeInfoForm.store_logo}}</div>  -->
                            <el-form-item label="店铺logo：" prop="store_logo">
                                <img class="img" v-show="storeInfoForm.store_logo" :src="storeInfoForm.store_logo" alt="">
                                <div class="upLoad_style">
                                    <el-upload
                                        ref="upload"
                                        class="upload-demo"
                                        :action='this.headerCommon+"/Store/setStoreLogo"'
                                        :headers = "this.headers"
                                        :limit="1"
                                        :show-file-list="false"
                                        :data="upLoadData"
                                        :on-success="successUpLoad"
                                        :on-exceed="onExceed"
                                        >
                                        <el-button size="small" type="primary">上传LOGO</el-button>
                                    </el-upload>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="msg">
                            <div class="item colorCash">为正方形图片(尺寸200*200)</div>
                            <div class="item colorCash">大小不能超过50kb</div>
                            <div class="item colorCash">请使用自己店铺的logo，避免造成侵权行为</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="access-basic-information">
                <div class="common-bg-title">入驻基本信息</div>
                <div class="content">
                    <div class="item">
                        <div class="search-input">
                            <div class="leftLable">入驻人姓名：</div><div class="rightLable">
                                <el-input size="small" disabled v-model.trim="storeInfoForm.show_ower_name" placeholder=""></el-input></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="search-input">
                            <div class="leftLable">店铺账号：</div><div class="rightLable">
                                <el-input size="small" disabled  v-model.trim="storeInfoForm.merchant_name" placeholder=""></el-input></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="search-input">
                            <div class="leftLable">入驻人身份证：</div><div class="rightLable">
                                <el-input size="small" disabled  v-model.trim="storeInfoForm.show_ower_idcard" placeholder=""></el-input></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="search-input">
                            <div class="leftLable">运营人手机号：</div><div class="rightLable">
                                <el-input disabled :maxlength="11" size="small" v-model.trim="storeInfoForm.mobile"></el-input></div>
                        </div>
                         <span class="change_mobile" @click="change_mobile()">换绑手机</span>
                    </div>
                    <div class="item">
                        <div class="search-input">
                            <div class="leftLable">运营人QQ号：</div><div class="rightLable">
                                <el-input :maxlength="20" size="small" v-model.trim="storeInfoForm.qq"></el-input></div>
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="logistics_information">
                <div class="common-bg-title">物流信息 <div class="add"><el-button size = 'mini' type="primary" @click="addAddress()">添加收货地址</el-button></div></div>
                <ul class="content">
                    <li v-for="(item,index) in addressList">
                      <div class="edit">
                          <div class="left_text">
                            <span class="name_left">收货人:</span>
                            <span class="name_center">{{item.consignee}}({{item.mobile}})</span>
                            <span class="name_right" v-show="item.is_default"><el-button size = 'mini' type="primary">默认地址</el-button></span>
                          </div>
                          <div class="right_text">
                              <el-button type="text" v-show="!item.is_default" @click="setDefault(addressList[index],index)">设置默认地址</el-button>
                              <el-button type="text" @click="editAddress(addressList[index],index)">编辑</el-button>
                              <el-button type="text" @click="deleteAddress(addressList[index],index)">删除</el-button>
                          </div>
                      </div>
                      <div class="edit">
                          <div class="left_text">
                            <span class="name_left">收货地址:</span>
                            <span class="name_center">{{item.address_base}}{{item.address}}</span>
                          </div>
                      </div>
                    </li>
                </ul>
            </div>
            <!-- </el-form> -->
            <div class="center">
                <el-button type="danger" size="small" @click="submitStoreInfo('storeInfoForm')">提交信息</el-button>
            </div>
        </el-form>
     </div>
<el-dialog
  title="换绑手机"
  :visible.sync="changeMobile"
  width="600px">
<el-form :model="ruleForm" :rules="oldrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<div class="verification-code">
	<div class="warp_input_bottom">
		<el-form-item prop="verifycode" label="验证码">
			<div class="width-controll">
					  <div class="code_width">
								<input  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" class="login_inputs" type="text" placeholder="请输入验证码" v-model.trim="ruleForm.verifycode"  maxLength='6'>
						</div>
						<div class="code_width">
							<div class="code_width_right">
								<el-button size="small" id="getCode" type="primary" @click="getCode()">{{codeTitles}}</el-button>
							</div>
						</div>
			</div>
		</el-form-item>
	</div>
</div>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="changeMobile = false">取 消</el-button>
    <el-button size="small" type="primary" @click="saveOldCode('ruleForm')">下一步</el-button>
  </span>
</el-dialog>

<el-dialog
  title="换绑手机"
  :visible.sync="changeMobileSec"
  width="600px">
<el-form :model="formNew" :rules="newrules" ref="formNew" label-width="100px" class="demo-ruleForm">
<div class="item">
	<el-form-item prop="newMobile" label="新手机号码">
	  <div class="warp_input_bottom">
	      <input :maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" class="login_input" type="text" placeholder="新手机号码" v-model.trim="formNew.newMobile" >
	  </div>
	</el-form-item>
</div>
<div class="verification-code">
	<div class="warp_input_bottom">
		<el-form-item prop="newCode" label="验证码">
			<div class="width-controll">
					  <div class="code_width">
								<input  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" class="login_inputs" type="text" placeholder="请输入验证码" v-model.trim="formNew.newCode"  maxLength='6'>
						</div>
						<div class="code_width">
							<div class="code_width_right">
								<el-button size="small" id="getCodes" type="primary" @click="getCodeNew()">{{codeTitle}}</el-button>
							</div>
						</div>
			</div>
		</el-form-item>
	</div>
</div>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="changeMobileSec = false">取 消</el-button>
    <el-button size="small" type="primary" @click="submitFormNewMobile('formNew')">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="退货地址"
  :visible.sync="dialogVisible"
  width="600px">
<el-form :model="ruleForm" :rules="addressrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="退货收件人" prop="consignee">
    <el-input size="small" type="text" v-model.trim="ruleForm.consignee"></el-input>
  </el-form-item>
  <el-form-item label="所在地区" required>
    <el-col :span="6">
        <el-form-item prop="province">
            <el-select size="small" v-model.trim="ruleForm.province" placeholder="请选择" @change = "changeProvinced">
                <el-option
                v-for="item in optionsProvinced"
                :key="item.region_id"
                :label="item.region_name"
                :value="item.region_id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-col>
    <el-col class="line" style="text-align:center" :span="1">-</el-col>
    <el-col :span="6">
        <el-form-item prop="city">
            <el-select size="small" v-model="ruleForm.city" @change = "changecity" placeholder="请选择">
                <el-option
                v-for="item in optionsCity"
                :key="item.region_id"
                :label="item.region_name"
                :value="item.region_id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-col>
    <el-col class="line" style="text-align:center" :span="1">-</el-col>
    <el-col :span="6">
        <el-form-item prop="district">
            <el-select size="small" @change = "changeDistrict" v-model="ruleForm.district" placeholder="请选择">
                <el-option
                v-for="item in optionsDistrict"
                :key="item.region_id"
                :label="item.region_name"
                :value="item.region_id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="详细地址" prop="address">
    <el-input size="small" type="text" v-model.trim="ruleForm.address"></el-input>
  </el-form-item>
   <!--prop="mobile"-->
  <el-form-item label="手机号码">
  	<div id="checkMobile" class="mobile">
  			<input type="text" :maxlength="11" class="self_input_valiate" v-model.trim="ruleForm.mobile" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  			<span v-show="isMobile" class="error_text">请输入手机号码或座机号码其中一项</span>
  	</div>
    <!--<el-input :maxlength="11" size="small" type="text" v-model="ruleForm.mobile"></el-input>-->
  </el-form-item>
  <el-form-item label="座机号码">
  	<div class="addTele">
  		<div id="checkAreaCode" class="tele areaCode">
  				<input type="text" placeholder="区号" :maxlength="11" class="self_input_valiate" v-model.trim="ruleForm.telephone1" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  				<span v-show="isAreaCode" class="error_text">请输入区号</span>
  		</div>
  		<div class="teles">-</div>
  		<div id="checkSeatNumber" class="tele seatNumber">
  				<input type="text" placeholder="座机号" :maxlength="11" class="self_input_valiate" v-model.trim="ruleForm.telephone2" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  				<span v-show="isSeatNumber" class="error_text">请输入座机号</span>
  		</div>
  		<div class="teles">-</div>
  		<div class="tele">
  				<input type="text" placeholder="分机号" :maxlength="11" class="self_input_valiate" v-model.trim="ruleForm.telephone3" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  		</div>
  	</div>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import storeInfo from "../../js/storeInfo";
import Getcode from '../../js/forget';
import customerServiceDetail from '../../js/customerServiceDetail';

 export default {
   data () {
     return {
     	isSeatNumber:false,
     	isAreaCode:false,
     	isMobile:false,
     	formNew:{
     		newMobile:'',
     		newCode:''
     	},
     	saveOldCodeVal:'',
     	changeMobileSec:false,
     	changeMobile:false,
         codeTitle:'获取验证码',
         codeTitles:'获取验证码',
         ruleForm:{
         		 telephone1:'',
         		 telephone2:'',
         		 telephone3:'',
             mobile:'',
             province:'',
             district:'',
             consignee:'',
             address:'',
             city:'',
             address_id:'',
             address_base:'',
         },
         dialogVisible:false,
         addressrules:{
            mobile: [
                { min:11, max: 11, message: '长度在11个字符', trigger: 'blur' }
            ],
            province: [
                { required: true, message: '请选择所在省', trigger: 'change' },
            ],
            district: [
                { required: true, message: '请选择所在区', trigger: 'change' },
            ],
            consignee: [
                { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                { min:2, max: 20, message: '长度在 2 到 20个字符', trigger: 'blur' }
            ],
            address: [
                { required: true, message: '请输入收件地址', trigger: 'blur' },
                { min: 3, max: 60, message: '长度在 3 到 60个字符', trigger: 'blur' }
            ],
            city: [
                { required: true, message: '请选择所在市', trigger: 'change' },
            ],
            address_id: [
                { required: true, message: '请输入运营人QQ号', trigger: 'blur' },
                { min: 6, max: 12, message: '长度在 6 到 12个字符', trigger: 'blur' }
            ],
            address_base: [
                { required: true, message: '请选择所在区域', trigger: 'blur' },
            ],
         },
         newrules:{
            newMobile: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
            ],
            newCode: [
                { required: true, message: '请输入验证码', trigger: 'change' },
            ],
         },
         oldrules:{
         	  verifycode: [
                { required: true, message: '请输入验证码', trigger: 'change' },
            ],
         },
         rules:{
            introduce: [
                { required: true, message: '请输入店铺信息', trigger: 'blur' },
                { min: 5, max: 100, message: '长度在 5 到 100个字符', trigger: 'blur' }
            ],
            store_logo: [
                { required: true, message: '请上传店铺LOGO', trigger: 'blur' },
            ],
            mobile: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
            ],
            qq: [
                { required: true, message: '请输入运营人QQ号', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20个字符', trigger: 'blur' }
            ],
            province: [
                { required: true, message: '请选择所在省', trigger: 'change' },
            ],
            district: [
                { required: true, message: '请选择所在区', trigger: 'change' },
            ],
            consignee: [
                { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                { min:2, max: 20, message: '长度在 2 到 20个字符', trigger: 'blur' }
            ],
            address: [
                { required: true, message: '请输入收件地址', trigger: 'blur' },
                { min: 3, max: 60, message: '长度在 3 到 60个字符', trigger: 'blur' }
            ],
            city: [
                { required: true, message: '请选择所在市', trigger: 'change' },
            ],
            address_id: [
                { required: true, message: '请输入运营人QQ号', trigger: 'blur' },
                { min: 6, max: 12, message: '长度在 6 到 12个字符', trigger: 'blur' }
            ],
            address_base: [
                { required: true, message: '请选择所在区域', trigger: 'blur' },
            ],
         },
         province_name:'',
         city_name:'',
         district_name:'',
         storeInfoForm:{
             verifycode:'',
            introduce:'',
            file:'',
            mobile:'',
            qq:'',
            address:'',
            address_base:'',
            address_id:'',
            city:'',
            consignee:'',
            district:'',
            mobiles:'',
            province:'',
         },
         upLoadData:{
             source:'storeLogo',
         },
         optionsProvinced:[],
         optionsCity:[],
         optionsDistrict:[],
         res:{},
         addressList:[],
         addressType:true,
         keys:'',
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('storeInfo', function(id){
		    that.fetch();
		})
   },
   watch:{
     storeInfoForm:{
       handler(val, oldVal){
         localStorage.setItem("mobile",val.mobile)
       },
         deep:true
     },
   	 ruleForm:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
                var checkMobile = document.getElementById("checkMobile");
                var checkAreaCode = document.getElementById("checkAreaCode");
                var checkSeatNumber = document.getElementById("checkSeatNumber");
                if(oldVal.mobile!=''){
                	checkMobile.className = "mobile";
                	this.isMobile = false;
                }
                if(oldVal.telephone1!=''){
                	checkAreaCode.className = "tele areaCode";
                	this.isAreaCode = false;
                	checkMobile.className = "mobile";
                	this.isMobile = false;
                }
                if(oldVal.telephone2!=''){
                	checkSeatNumber.className = "tele seatNumber";
                	this.isSeatNumber = false;
                	checkMobile.className = "mobile";
                	this.isMobile = false;
                }
            },
            deep:true
      }
   },
   components: {

   },
   methods:{
   	fetch(){
       storeInfo.getStoreInfo("/Store/storeInfo",this);
        var data = {
            action:"level_1",
        }
       customerServiceDetail.getaddress("/Storepublic/getRegion",data,this);
   	},
   	change_mobile(){
   		this.changeMobile = true;
   	},
   	saveOldCode(formName){
   		   this.$refs[formName].validate((valid) => {
          if (valid) {
          	var data = {
          		verifycode:this.ruleForm.verifycode
          	}
          	storeInfo.checkOldMobildSms("/Smslog/checkOldMobildSms",data,this);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   	},
   	submitFormNewMobile(formName){
   		  this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
            	mobile:this.formNew.newMobile,
            	verifycode:this.formNew.newCode,
            }
            storeInfo.updateStoreMobile("/Store/updateStoreMobile",data,this);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   	},
   	getCodeNew(){
           var that = this;
   					if(that.formNew.newMobile==''){
   						this.$message({
   							type:'info',
   							message:'请输入新手机号'
   						})
   						return
   					}else if(that.saveOldCodeVal==''){
   						this.$message({
   							type:'info',
   							message:'旧验证码输入错误'
   						})
   						return
   					}
   		      var timer;
            clearInterval(timer);
           var getCode = document.getElementById("getCodes");
               getCode.disabled = true;
           var t = 60;
           var data = {
	           	mobile:that.formNew.newMobile,
	           	verifycode:that.saveOldCodeVal,
              tem:'store_change_new_mobile',
           }
           Getcode.getcode('SmsLog/sendChangeNewMobile',data,this);
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
       getCode(){
           var timer;
            clearInterval(timer);
           var getCode = document.getElementById("getCode");
               getCode.disabled = true;
           var t = 60;
           var that = this;
           var data = {
              tem:'store_change_old_mobile',
           }
           Getcode.getcode('SmsLog/sendSms',data,this);
           timer = setInterval(function(){
                t--;
                that.codeTitles = '('+t+')后重新发送';
                if(t<1){
                    clearInterval(timer);
                    getCode.disabled = false;
                    that.codeTitles = '获取验证码';
                }
           },1000)
       },
       submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                    var checkMobile = document.getElementById("checkMobile");
                    var checkAreaCode = document.getElementById("checkAreaCode");
                    var checkSeatNumber = document.getElementById("checkSeatNumber");
//                  console.log(this.ruleForm.mobile)
//                  console.log(this.ruleForm.mobile==undefined)
//                  return
                    var telephone = this.ruleForm.telephone1+'-'+this.ruleForm.telephone2+'-'+this.ruleForm.telephone3;
                     if(this.ruleForm.mobile==''&&this.ruleForm.telephone1==''&&this.ruleForm.telephone2==''){
	                    	checkMobile.className = "mobile active";
	                    	this.isMobile = true;
	                    	return
                    }
                    if(this.ruleForm.telephone1==''&&this.ruleForm.telephone2!=''){
                    	checkAreaCode.className = "tele areaCode active";
                    	this.isAreaCode = true;
                    	return
                    }else if(this.ruleForm.telephone2==''&&this.ruleForm.telephone1!=''){
                    	checkSeatNumber.className = "tele seatNumber active";
                    	this.isSeatNumber = true;
                    	return
                    }else if(this.ruleForm.mobile==undefined&&this.ruleForm.telephone1==undefined&&this.ruleForm.telephone2==undefined){
	                    	checkMobile.className = "mobile active";
	                    	this.isMobile = true;
	                    	return
                    }
                if(this.addressType){
                    var addressDefault = '';
                    if(this.provinced_name&&this.city_name&&this.district_name){
                        addressDefault = this.provinced_name+this.city_name+this.district_name;
                    }else{
                        addressDefault = this.ruleForm.address_base;
                    }
                    var data = {
                        address_base:addressDefault,
                        mobile:this.ruleForm.mobile,
                        telephone:telephone,
                        consignee:this.ruleForm.consignee,
                        address:this.ruleForm.address,
                        district:this.ruleForm.district,
                        city:this.ruleForm.city,
                        province:this.ruleForm.province,
                        is_default:0,
                    }
                     storeInfo.addStoreAddress("/Store/addStoreAddress",data,this);
                }else{
                    var addressDefault = '';
                    if(this.provinced_name&&this.city_name&&this.district_name){
                        addressDefault = this.provinced_name+this.city_name+this.district_name;
                    }else{
                        addressDefault = this.ruleForm.address_base;
                    }
                    var data = {
                        address_id:this.ruleForm.address_id,
                        address_base:addressDefault,
                        telephone:telephone,
                        mobile:this.ruleForm.mobile,
                        consignee:this.ruleForm.consignee,
                        address:this.ruleForm.address,
                        district:this.ruleForm.district,
                        city:this.ruleForm.city,
                        province:this.ruleForm.province,
                        is_default:this.ruleForm.is_default,
                    }
                    storeInfo.editStoreAddress("/Store/editStoreAddress",data,this);
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       addAddress(){
         this.dialogVisible = true;
         this.ruleForm = {};
         this.addressType = true;
         this.keys = '';
       },
       setDefault(params,index){
           var self = this;
        this.$confirm('此操作将设置为默认地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var data = {
               address_id:params.address_id
           }
            storeInfo.setDefaultStoreConsignee("/Store/setDefaultStoreConsignee",data,self,params);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
       },
       editAddress(data,index){
           this.keys = index;
           this.dialogVisible = true;
           this.addressType = false;
           this.ruleForm.province = data.province;
           this.ruleForm.city = data.city;
           this.ruleForm.district = data.district;
           this.ruleForm.address = data.address;
           this.ruleForm.consignee = data.consignee;
           this.ruleForm.mobile = data.mobile;
           this.ruleForm.telephone1 = data.telephone1;
           this.ruleForm.telephone2 = data.telephone2;
           this.ruleForm.telephone3 = data.telephone3;
           this.ruleForm.address_id = data.address_id;
           this.ruleForm.address_base = data.address_base;
            if (data.city) {
                var params = {
                    action: 'parent_id',
                    value: data.province
                }
                customerServiceDetail.secondLevel("/Storepublic/getRegion", params, this);
                if (data.district) {
                    var params = {
                        action: 'parent_id',
                        value: data.city
                    }
                    customerServiceDetail.thirdLevel("/Storepublic/getRegion", params, this);
                }
            }
       },
       deleteAddress(params,index){
           if(params.is_default){
              this.$message({
                    type: 'info',
                    message:'默认地址不能删除'
                })
                return
           }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var data = {
               address_id:params.address_id
           }
           storeInfo.deleteStoreConsignee("/Store/deleteStoreConsignee",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

       },
       successUpLoad(response, file, fileList){
           if(response.code == 200){
               this.$message.warning({
                   type:'success',
                   message:response.msg
               });
               this.storeInfoForm.store_logo = response.data.url;
       				 localStorage.setItem("store_logo",response.data.url);
       				 eventBus.$emit("setStoreLogo", response.data.url)
           }else {
               this.$message.warning(`${ response.msg }`);
           }
           this.$refs.upload.clearFiles();
       },
       onExceed(files, fileList){
        var res = fileList[0].response;
          if(res.code==200){
              this.$message.warning(`${ res.msg }`);
              this.storeInfoForm.store_logo = response.data.url;
                    localStorage.setItem("store_logo",response.data.url)
          }else{
              this.$message.warning(`${ res.msg }`);
          }
           this.$refs.upload.clearFiles();
       },
       changeDistrict(val){
            let obj = {};
            obj = this.optionsDistrict.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.region_id === val;//筛选出匹配数据
            });
            this.district_name = obj.region_name;
       },
               //    选择市区
       changecity(val){
            let obj = {};
            obj = this.optionsCity.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.region_id === val;//筛选出匹配数据
            });
            this.city_name = obj.region_name;
           var data = {
               value:val,
               action:'parent_id'
           }
           customerServiceDetail.thirdLevel("/Storepublic/getRegion",data,this);
       },
               //    选择省级 获取市
       changeProvinced(val){
            let obj = {};
            obj = this.optionsProvinced.find((item)=>{//这里的userList就是上面遍历的数据源
                return item.region_id === val;//筛选出匹配数据
            });
            this.provinced_name = obj.region_name;
           var data = {
               action: 'parent_id',
               value: val
           }
           customerServiceDetail.secondLevel("/Storepublic/getRegion",data,this);
       },
       submitStoreInfo(formName){
           var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var address_base = that.provinced_name+that.city_name+that.district_name;
            var data = {
                verifycode:this.storeInfoForm.verifycode,
                store_logo:that.storeInfoForm.store_logo,
                introduce:that.storeInfoForm.introduce,
                mobile:that.storeInfoForm.mobile,
                qq:that.storeInfoForm.qq,
                address:that.storeInfoForm.address,
                consignee:that.storeInfoForm.consignee,
                address:this.addressList,
           }
           storeInfo.addStoreInfo("/Store/update",data,this)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        //    var data = {
        //         introduce:this.introduce,
        //         file:this.file,
        //         mobile:this.mobile,
        //         qq:this.qq,
        //         addr:{
		// 			province:this.addrs.province,
        //             city:this.addrs.city,
        //             district:this.addrs.district,
        //             address:this.addr.address,
        //             consignee:this.addr.consignee,
        //             address_id:this.addr.address_id,
        //             address_base:this.addr.address_base,
        //             mobile:this.addr.mobile,
        //         }
        //    }
        //    storeInfo.addStoreInfo("/api/shop/update",data,this)
       }
   }
 }
</script>

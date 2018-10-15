

<style lang="less" scoped>
@import "./../../less/config.less";
@import "./../../less/index.less";
#order_address a{
		color:#000;
}
  #canvas{
    width: 80%!important;
    height: auto!important;
  }
  .click_a{
    a{
      color:#000;
    }
  }
  .warp_show{
    width:213px;
    display: line-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .empty_notice_warp{
  	width:100%;
  	padding:20px 0;
  	text-align:center;
	  .empty_notice{
	  	width:140px;
	  	height:90px;
	  	margin:0 auto;
	  	display: inline-block;
	  }
  }
.mobile.active{
		.self_input_valiate{
			border:1px solid #f56c6c;
		}
	.error_text{
		color:#f56c6c;
		font-size:12px;
		position: absolute;
		left:10px;
		top:28px;
		width:160px;
		height:32px;
		display: block;
	}
}
.addTele{
	overflow: hidden;
	.tele{
		float:left;
		width:120px;
		position: relative;
		height:56px;
	}
	.active{
		.self_input_valiate{
			border:1px solid #f56c6c;
		}
	}
	.teles{
		float:left;
		margin:0 10px;
	}
	.error_text{
		color:#f56c6c;
		font-size:12px;
		position: absolute;
		left:10px;
		top:28px;
		width:160px;
		height:32px;
		display: block;
	}
}
.index{
  .el-form-item{
      margin-bottom:10px;
  }
}
.text_tips{
	color:red;
	text-align: center;
}
</style>
<template>
 <div class="index">
     <audio id="audio" src="../../../static/1.mp3"></audio>
      <div class="content">
        <div class="warp_left_index">
        <div class="top-mode">
          <el-row>
            <el-col :span="4">
              <div class="grid-content">
                <img class="store_img" :src="storeInfo.store_logo" alt="">
                <div class="store">
                  当前商户:{{storeInfo.store_name}}
                <div class="status">状态:{{storeInfo.state}}</div>
                <div class="code" @click.stop="showQrCode()">
                  店铺二维码 <img src="../../img/icon-code.png" alt="" />
                  <div class="storecodeWr" v-if="isQrCodeShow">
                      <span class="arrow-btm"></span>
                      <div id="qrCodeWrapIds">
                        <qriously ref="getQrCode" :value="storeInfo.erweima" :size="138"/>
                      </div>
                      <div style="text-align: center;">
                        <a  id="downLoad" :href="downerweima" target="_blank" download="store_qrcode.png">
                        </a>
                        <div @click="getQrCode()">下载二维码</div>
                      </div>
                  </div>
                </div>
                </div>
              </div>
            </el-col>
            <el-col :span="5"><div class="grid-cont">
              近30天成交量:<span class="count">{{lastday30.total_order_num?lastday30.total_order_num:0}}</span>件
              </div></el-col>
            <el-col :span="5"><div class="grid-cont">
              近30天成交额:<span class="count">{{lastday30.total_order_amount?lastday30.total_order_amount:0}}</span>元
              </div></el-col>
            <el-col :span="5"><div class="grid-cont">
              今日成交量:<span class="count">{{today.total_order_num?today.total_order_num:0}}</span>件
              </div></el-col>
            <el-col :span="5"><div class="grid-cont">
              今日成交额:<span class="count">{{today.total_order_amount?today.total_order_amount:0}}</span>元
              </div></el-col>
            <!-- <el-col :span="4">
              <div class="grid-content">
              <router-link :to='{path:"/communication"}'>客服联系</router-link>
              </div>
              </el-col> -->
          </el-row>
        </div>
        <div class="container">
          <div class="left-module">
            <div class="order-mode">
            	<div style="text-align:center;margin:0 auto;overflow: hidden;">
	              <el-row>
	                <span class="grid-contents" v-for="item in orderStatusStatistics" @click="entry(item.quick_search,item.url)">
	                  <el-col :span="4">
	                    <div class="grid-content" id="order_address">
	                    	<router-link :to="{path:item.url,query:{value:item.value,action:item.action}}">
		                      <div class="order">{{item.name}}</div>
		                      <div class="count"><span class="count">{{item.total_num?item.total_num:0}}</span>单</div>
	                    	</router-link>
	                    </div>
	                  </el-col>
	                </span>
	              </el-row>
	             </div>
            </div>
            <div class="store-echat">
              <div class="title">店铺销售额走势</div>
              <div id="mainSalesVolume" style="width:100%;height:380px"></div>
            </div>
            <div class="store-list">
              <div class="title">销售表格概览</div>
              <div id="mainSales">
                  <el-table
                    :data="tableData"
                    border
                    center
                    style="width: 100%">
                    <el-table-column
                      prop="time"
                      label="订单日期">
                    </el-table-column>
                    <el-table-column
                      prop="order_num"
                      label="订单总数(个)">
                    </el-table-column>
                    <el-table-column
                      prop="return_num"
                      label="退款退货(个)">
                    </el-table-column>
                    <el-table-column
                      prop="money"
                      label="成交金额(元)">
                    </el-table-column>
                    <el-table-column
                      prop="return_money"
                      label="退款金额(元)">
                    </el-table-column>
                  </el-table>
              </div>
            </div>
          </div>
        </div>
          <div class="right-module">
              <div class="contents">
                <div class="right-module-top1">
                  <div class="title">客服消息</div>
                  <div class="content" @click="set_is_conn()">
                    <!--<a href="/communication" target="_blank">
                        <img src="../../img/service.gif" alt="" />
                     </a>-->
                     <!--<router-link :to='{path:"/communication"}'>
                        <div class="customer_service">
                            暂时没有消息需要处理
                            <div class="tips" v-show="chatCount!=0">{{chatCount}}</div>
                        </div>
                    </router-link> -->
                    <a id="return_url">
                        <div class="customer_service" @click="entryhuanxin()">
                            		{{chatTitle}}
                            <div class="tips" v-show="chatCount!=0">{{chatCount}}</div>
                        </div>
                     </a>
                  </div>
                </div>
                <div class="right-module-top2 right-module-top1">
                  <div class="title">平台规则</div>
                  <div class="content click_a">
                     <router-link to="/shopRules"><div class="item">1.平台发货规则</div></router-link>
                     <router-link to="/agreement"><div class="item">2.平台合作协议</div></router-link>
                  </div>
                </div>
                <div class="right-module-top3 right-module-top1">
                  <div class="title">站内信</div>
                  <div v-show="msg_content.length!=0">
	                  <div class="content" v-for="(item,index) in  msg_content">
	                     <div class="warp_show" @click="showInfo(item)">{{index+1}}.&nbsp;{{item.msg_content}}</div> 
	                  </div>
                  </div>
                  <div class="empty_notice_warp" v-show="msg_content.length==0">
                  		<img class="empty_notice" src="../../img/login/empty.png" alt="" />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div> 

<el-dialog
    title="站内信"
    :visible.sync="showInfoDialog"
    width="40%"
    left>
    <div>{{showInfoData.msgTitle}}</div>
    <div>{{showInfoData.showInfo}}</div>
        <span slot="footer" center class="dialog-footer">
        <el-button size="small" @click="showInfoDialog=false">取 消</el-button>
        <el-button size="small" type="primary" @click="showInfoDialog=false">确 定</el-button>
        </span>
</el-dialog>

<el-dialog
  title="退货地址"
  :visible.sync="dialogVisible"
  :show-close = 'false'
  :close-on-click-modal = 'false'
  :close-on-press-escape = 'false'
  width="600px">
  <div class="text_tips">您的店铺还未填写退货地址，请先填写退货地址</div>
<el-form :model="ruleForm" :rules="addressrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="退货收件人" prop="consignee">
    <el-input size="small" type="text" v-model.trim="ruleForm.consignee"></el-input>
  </el-form-item>
  <el-form-item label="所在地区" required>
    <el-col :span="6">                                
        <el-form-item prop="province">    
            <el-select size="small" v-model="ruleForm.province" placeholder="请选择" @change = "changeProvinced">
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
  <el-form-item label="手机号码">
  	<div id="checkMobile" class="mobile">
  			<input type="text" :maxlength="11" class="self_input_valiate" v-model.number="ruleForm.mobile" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  			<span v-show="isMobile" class="error_text">请输入手机号码</span>
  	</div>
  </el-form-item>
  <el-form-item label="座机号码" prop="telephone">
  	<div class="addTele">
  		<div id="checkAreaCode" class="tele areaCode">
  				<input type="text" placeholder="区号" :maxlength="11" class="self_input_valiate" v-model.number="ruleForm.telephone1" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  				<span v-show="isAreaCode" class="error_text">请输入区号</span>
  		</div>
  		<div class="teles">-</div>
  		<div id="checkSeatNumber" class="tele seatNumber">
  				<input type="text" placeholder="座机号" :maxlength="11" class="self_input_valiate" v-model.number="ruleForm.telephone2" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  				<span v-show="isSeatNumber" class="error_text">请输入座机号</span>
  		</div>
  		<div class="teles">-</div>
  		<div class="tele">
  				<input type="text" placeholder="分机号" :maxlength="11" class="self_input_valiate" v-model.number="ruleForm.telephone3" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
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
import Vue from 'vue'
import Index from '../../js/index';
import leftMenu from '../../components/leftMenu'
import storeTop from '../../components/storeTop'
import webim from '../../js/webim/webim';
import WebIM from 'easemob-websdk';
import customerServiceDetail from '../../js/customerServiceDetail';
import storeInfo from "../../js/storeInfo";
WebIM.config = {
  xmppURL: 'im-api.easemob.com',
  apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // appkey: 'chengzi#pingquduo',
  appkey: '1165160929115391#pqd',
  // appkey: 'easemob-demo#chatdemoui',11122222222555
  https: true,
  isMultiLoginSessions: true,
  isAutoLogin: true,
  isWindowSDK: false,
  isSandBox: false,
  isDebug: false,
  autoReconnectNumMax: 3000000,
  autoReconnectInterval: 20,
  isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https\:$/.test(window.location.protocol),
  heartBeatWait: 4500,
  isHttpDNS: false,
  msgStatus: true,
  delivery: true,
  read: true,
  saveLocal: false,
  encrypt: {
    type: 'none'
  }
}
 export default {
   data () {
     return {     
         optionsCity:[],
         optionsDistrict:[],
         optionsProvinced:[],
     	provinced_name:'',
     	city_name:'',
     	district_name:'',
     	isSeatNumber:false,
     	isAreaCode:false,
     	isMobile:false,    
     	addressrules:{
            mobile: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
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
     	is_default_address:'',
     	dialogVisible:false,
     	is_chat:false,
     	chat_time:'',
     	downerweima:'',
     	chatTitle:'暂时没有消息需要处理',
       showInfoData:{
         showInfo:'',
          msgTitle:''
       },
       storePassword:'',
       storeId:'',
       showInfoDialog:false,
       chatCount:0,
       reconnection:false,
       initQCode: '你自定定义的值',
       initQCodeDown:'',
       msg_content:[],
       orderStatusStatistics:[],
       storeInfo:{},
        listData:{},
        lastday30:{
          total_order_num:0,
          total_order_amount:0,
        },
        today:{
          total_order_num:0,
          total_order_amount:0,
        },
        tableData: [],
        result:{},
        isQrCodeShow:false,
     }
   },
   created(){
        var datas = {
            action:"level_1",
        }
       customerServiceDetail.getaddress("/Storepublic/getRegion",datas,this);
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('index', function(id){
		    that.fetch();
		})
   },   
   watch:{
   	 ruleForm:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
//              console.log("b.c: "+JSON.stringify(val));//但是这两个值打印出来却都是一样的
                var checkMobile = document.getElementById("checkMobile");
                var checkAreaCode = document.getElementById("checkAreaCode");
                var checkSeatNumber = document.getElementById("checkSeatNumber");
                if(val.mobile!=''){
                	checkMobile.className = "mobile";
                	this.isMobile = false;
                }
                if(val.telephone1!=''){
                	checkAreaCode.className = "tele areaCode";
                	this.isAreaCode = false;
                	checkMobile.className = "mobile";
                	this.isMobile = false;
                }
                if(val.telephone2!=''){
                	checkSeatNumber.className = "tele seatNumber";
                	this.isSeatNumber = false;
                	checkMobile.className = "mobile";
                	this.isMobile = false;
                }
            },
            deep:true
      }
   },
     mounted(){
        document.addEventListener('click', this.handleBodyClick);
            var that = this;
            this.$im_conn.listen({
                onOpened: function(message) { //连接成功回调
					// console.log('连接成功回调')          
                },
                onClosed: function ( message ) {
                },         //连接关闭回调
                onTextMessage: function ( message ) {
                	var audio = document.getElementById("audio");
                	audio.play();
                    if(that.chatCount>=99){
                        that.chatCount=99;
                    }else {
                      that.chatCount++;
                    }
                    if(that.chatTitle){
                  		that.chatTitle = '您有新消息哦'
                    }
        	},onPictureMessage: function ( message ) {
                    if(that.chatCount>=99){
                        that.chatCount=99;
                    }else {
                      that.chatCount++;
                    }
                    if(that.chatTitle){
                  		that.chatTitle = '您有新消息哦'
                    }
              }, //收到图片消息
                onPresence: function ( message ) {
                    // 这里需要弹出面板标识有人要添加您为好友
                    if(message.type == 'subscribe') {
                        // that.privateUser = message.from;
                        // that.privateUserPanel = true;
                    }
                },
                onError: function ( message ) {
                  webim.getStoreInfo('Chat/getStoreInfo',this);
                  webim.chatInfo('Chat/getInfo', this);
                },          //失败回调
            });
            // window.addEventListener('scroll', this.handleScroll)
        },
   destroyed () {
     document.removeEventListener('click', this.handleBodyClick)
   },
   components: {
      leftMenu,storeTop,
   },
   methods:{         
   		submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                    var checkMobile = document.getElementById("checkMobile");
                    var checkAreaCode = document.getElementById("checkAreaCode");
                    var checkSeatNumber = document.getElementById("checkSeatNumber");
                    var telephone = this.ruleForm.telephone1+'-'+this.ruleForm.telephone2+'-'+this.ruleForm.telephone3;
                    if(this.ruleForm.mobile==''&&this.ruleForm.telephone1==''&&this.ruleForm.telephone2==''){
                    	checkMobile.className = "mobile active";
                    	this.isMobile = true;
                    	return
                    }
                    if(this.ruleForm.telephone1==''&&this.ruleForm.mobile==''){
                    	checkAreaCode.className = "tele areaCode active";
                    	this.isAreaCode = true;
                    	return
                    }else if(this.ruleForm.telephone2==''&&this.ruleForm.telephone1!=''){
                    	checkSeatNumber.className = "tele seatNumber active";
                    	this.isSeatNumber = true;
                    	return
                    }
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
                        is_default:'1',
                    }
                     storeInfo.addStoreAddress("/Store/addStoreAddress",data,this);
            } else {
                console.log('error submit!!');
                return false;
            }
            });
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
   	fetch(){
		this.setCookie("is_conn", 1, 1);
		this.chat_time = Date.parse( new Date());
	   	setInterval(()=>{
	   		var str = this.getCookie('is_chat');
	   		var is_conn = this.getCookie('is_conn');
	   		var datas = Date.parse( new Date());
	   		if(datas-4000>str&&is_conn==1){
			   	webim.getStoreInfo('Chat/getStoreInfo',this);
				webim.chatInfo('Chat/getInfo', this);
				this.setCookie("is_conn", 2, 1)
	   		}
	   	},5000)
	     Index.getIndexData('/Index/index',this);
	     Index.orderStatusStatistics('/Index/orderStatusStatistics',this);
	     Index.notice('/Index/notice',this);	
   	},
   	set_is_conn(){
   		var str_time = Date.parse( new Date());
   		if(str_time-this.chat_time<10000){
   			this.$message({
   				type:'info',
   				message:'聊天初始化还未完成，请十秒后再打开'
   			})
   			return
   		}else{
	   		this.setCookie("is_conn", 1, 1);
   			return_url.setAttribute("href","/communication");
   			return_url.setAttribute("target","_blank");
	   		return_url.click();
   		}
   	},
   	setCookie(name, value, day) {
        if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
          var expires = day * 24 * 60 * 60 * 1000;
         var date = new Date(+new Date()+expires);
         document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
       }else{
         document.cookie = name + "=" + escape(value);
       }
     },
   	getCookie(name) {
       var arr;
	      var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	       if (arr = document.cookie.match(reg))
	         return unescape(arr[2]);
	       else
	         return null;
    },
   	getQrCode(){
   		var qrCodeWrapIds = document.getElementById("qrCodeWrapIds");
   		var canvas = qrCodeWrapIds.getElementsByTagName("canvas")[0];
   		function convertCanvasToImage(canvas) {
			var image = new Image();
			image.src = canvas.toDataURL("image/png");
			return image;
		}
   		var imgs = convertCanvasToImage(canvas);
   		var downLoad = document.getElementById("downLoad");
   		this.downerweima = imgs.getAttribute("src");
   		let imgData = this.downerweima;
        downloadFile('store_qrcode.png', imgData);
	   	 function  downloadFile(fileName, content) {
	        let aLink = document.createElement('a');
	        let blob = base64ToBlob(content); //new Blob([content]);
	        let evt = document.createEvent("HTMLEvents");
	        evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
	        aLink.download = fileName;
	        aLink.href = URL.createObjectURL(blob);
	        aLink.click(URL.createObjectURL(blob))
	      }
	   	 function base64ToBlob(code) {
	        let parts = code.split(';base64,');
	        let contentType = parts[0].split(':')[1];
	        let raw = window.atob(parts[1]);
	        let rawLength = raw.length;
	        let uInt8Array = new Uint8Array(rawLength);
	        for (let i = 0; i < rawLength; ++i) {
	          uInt8Array[i] = raw.charCodeAt(i);
	        }
	        return new Blob([uInt8Array], {type: contentType});
	      }
	   	  
   	},
     entryhuanxin(){
       this.chatCount = 0;
       this.chatTitle = "暂时没有消息需要处理";
     },
     showInfo(params){
       this.showInfoData.showInfo = params.msg_content;
       this.showInfoData.msgTitle = params.msg_title;
        this.showInfoDialog  = true;
     },
     entry(params,url){

     },
     showQrCode(){
       this.isQrCodeShow = true;
       return false;
     },
     handleBodyClick(){
       this.isQrCodeShow = false;
     }
   }
 }
</script>

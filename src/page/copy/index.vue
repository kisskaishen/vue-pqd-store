

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
                  <div class="content">
                    <!-- <router-link :to='{path:"/communication"}'>
                        <div class="customer_service">
                            暂时没有消息需要处理
                            <div class="tips" v-show="chatCount!=0">{{chatCount}}</div>
                        </div>
                    </router-link> -->
                    <a href="/communication" target="_blank">
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
                     <router-link to="/agreement"><div class="item">1.平台发货规则</div></router-link>
                     <router-link to="/shopRules"><div class="item">2.平台合作协议</div></router-link>
                  </div>
                </div>
                <div class="right-module-top3 right-module-top1">
                  <div class="title">站内信</div>
                  <div class="content" v-for="(item,index) in  msg_content">
                     <div class="warp_show" @click="showInfo(item)">{{index+1}}.&nbsp;{{item.msg_content}}</div> 
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
 </div>
</template>

<script>
import Vue from 'vue'
import Index from '../../js/index';
import leftMenu from '../../components/leftMenu'
import storeTop from '../../components/storeTop'
import webim from '../../js/webim/webim';
import WebIM from 'easemob-websdk';
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
  autoReconnectNumMax: 3000000000,
  autoReconnectInterval: 2,
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
        webim.getStoreInfo('Chat/getStoreInfo',this);
        webim.chatInfo('Chat/getInfo', this);
	 Index.getIndexData('/Index/index',this);
	 Index.orderStatusStatistics('/Index/orderStatusStatistics',this);
	 Index.notice('/Index/notice',this);
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
     },
   destroyed () {
     document.removeEventListener('click', this.handleBodyClick)
   },
   watch:{
   		
   },
   components: {
      leftMenu,storeTop,
   },
   methods:{
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

<style lang="less" scoped>
@import '../../less/config.less';
@import '../../less/chat.less';
.reconnection{
    .title{
        text-align: center;
    }
}
.shop_name{
    span{
        display: inline-block;
      width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #00eb16;
        margin-right: 8px;  
    }
}
</style>
<template>
 <div class="self_chat"  @keydown="KeyDown();">
     <audio id="audio" src="../../../static/1.mp3"></audio>
     <el-dialog
        title="温馨提示"
        :visible.sync="reconnection"
        width="30%">
        <div class="reconnection">
            <div class="title">断线重连</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisibleAddress = false">取 消</el-button>
            <el-button size="small" type="primary" @click="reconnectionBtn()">确 定</el-button>
        </span>
     </el-dialog>
     <div class="left">
         <div class="top">
             <div class="shop_name">
                 <span></span>
                 {{nickname}}
             </div>
         </div>
        <ul class="contact" id="warpContact">
            <li v-for="(userItem,index) in sessionList" @click="getUserInfo(userItem.sessionId,index,userItem.userName,userItem.headPic)">
                <!-- {{userItem}} -->
                <div class="left_icon">
                    <img class="icon" :src="userItem.headPic" alt="">
                    <span class="news_tips" v-show="userItem.unread">
                        <span class="ricle"></span>
                    </span>
                </div>
                <div class="left_content">
                    <div class="title">{{userItem.userName}}<span class="times">{{new Date().formatChat(userItem.time)}}</span></div>
                    <div class="detail">{{userItem.msg}}</div>
                </div>
            </li>
        </ul>       
     </div>
     <div class="center_chat">
         <div class="top">{{currentName}}</div>
         <div class="content">
             <div class="warp" @scroll="handleScroll($event)">
                <div class="info_auto">
                    <div class="search_info">
                        <img src="../../img/loadingMore.gif" alt="" v-show="pageNum!=1">
                        <span v-show="pageNum==1">
                            没有更多消息了
                        </span>
                    </div>
                    <div class="shop_chat" v-for="(child,index) in currentMsgList">
                        <div class="times">
                            <!-- {{new Date().formatChat(child.ext.time)}} -->
                            <span v-if="index==0">
                                {{new Date().formatChat(child.ext.time)}}
                            </span>
                            <span  v-if="index>0&&child.ext.time-currentMsgList[index-1].ext.time>60">
                                {{new Date().formatChat(child.ext.time)}}
                            </span>
                        </div>
                        <div class="char_content">
                            <div class="right_name" v-show="child.from==recevierUserId">
                                <div class="chat_icon">
                                    <img :src="child.ext.senderUser | senderUser" alt="">
                                </div>
                                <div class="chat_info" v-show="child.data&&!child.ext.goods">
                                    {{child.data}}
                                </div>
                                <div class="chat_info" v-show="child.url">
                                    <img style="width:64px;height:64px" :src="child.url" alt="">
                                </div>
                                <div class="goodsLink" v-show="child.ext.goods">
                                    <dl class="tit_order_detail">
                                        <dt><img :src="child.ext.goods | getImgUrl" alt=""></dt>
                                        <dd>
                                            <div class="goods_name">{{child.ext.goods | getGoodsName}}</div>
                                            <div class="specifications">
                                                <span class="price">￥{{child.ext.goods | getPrice}}</span> <span class="num">{{child.ext.goods | getProm}}人团</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="left_name" v-show="child.from!=recevierUserId">
                                <div class="chat_icon">
                                    <img :src="child.ext.senderUser | senderUser" alt="">
                                </div>
                                <div class="chat_info" v-show="child.data&&!child.ext.goods">
                                    {{child.data}}
                                </div>
                                <div class="chat_info" v-show="child.url">
                                    <img style="width:80px;height:80px" class="show_imgs" :src="child.url" alt="">
                                </div>
                                <div class="goodsLink" v-show="child.ext.goods">
                                    <dl class="tit_order_detail">
                                        <dt><img :src="child.ext.goods | getImgUrl" alt=""></dt>
                                        <dd>
                                            <div class="goods_name">{{child.ext.goods | getGoodsName}}</div>
                                            <div class="specifications">
                                                <span class="price">￥{{child.ext.goods | getPrice}}</span> <span class="num">{{child.ext.goods | getProm}}人团</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
         </div>  
        <div class="input_chat">
            <div class="powel">
                <input type="file" id="images" @change="sendImg()" style="display:none">
                <span class="sendImg" @click="imgBtnClick()">
                    <img id="image" src="../../img/up_load.png" alt="">
                </span>
                <!-- <input type="file" id="images" accept="image/gif, image/jpg,image/png,image/bmp" style="display:none;">
                <img id="image" @change="upLoadImage()" src="../../img/up_load.png" alt=""> -->
            </div>
            <div class="input_center">
                <el-input
                class="textareas"
                type="textarea"
                :rows="3"
                placeholder="Enter发送消息"
                v-model.trim="textMsg">
                </el-input>
            </div>
            <div class="btn_input">
                <el-button size="small" class="btns" @click="sendPrivateText()" type="danger">发送</el-button>
            </div>
        </div>      
     </div>
     <div class="right_chat">
         <div class="top_chat">
             <ul class="list_chat" @click="selectTab()">
                 <li ids="1" class="active_child">商品推荐</li>
                 <li ids="2" class="active_child">最新订单</li>
                 <li ids="3" class="active_child" :class="{'active':show_thr==true}">快捷回复</li>
             </ul>
         </div>
         <div class="content">
            <div v-if="isNoChat" class="no_chat">请选择聊天对象</div>
            <div class="show_once" v-show="recommendation_commodity">
                <div class="title">店铺商品</div>    
                <div class="explain">以下商品按商品排位顺序进行展示</div>
                <ul class="show_goods">
                    <li v-for="its in recommendationData">
                        <dl class="goods_detail">
                            <dt class="goods_img">
                                <img :src="its.original_img" alt="">
                            </dt>
                            <dd class="goods_details">
                                <div class="psds goods_tit">{{its.goods_name}}</div>
                                <div class="psd price">￥{{its.prom_price}}</div>
                                <div class="psd store_count">库存：{{its.store_count}}</div>
                                <div class="psd sales">销量：{{its.sales}}</div>
                            </dd>
                            <dd class="send_info"><button @click="recommend(its)" class="btns_send">发送</button></dd>
                        </dl>
                    </li>
                </ul>
                <div class="paginations">
                    <div class="up_or_down">
                        <span class="up_arrow">共{{totalpage_commond}}页</span>
                        <span class="up_arrow" @click="upPage('commond')">上一页</span>
                        <span class="up_arrow">{{currentpage_commond}}</span>
                        <span class="up_arrow" @click="downPage('commond')">下一页</span>
                    </div>
                    <div class="explains">转到</div>
                    <div class="input_count">
                        <input class="input_return" v-model="downInputVal_commond" type="text">
                    </div>
                    <div class="right_arrow" @click="downInputPage('commond')">></div>
                </div>
            </div>   
            <div class="show_thr" v-show="show_thr">
                <div class="show_thr_top"><span class="editReply" @click="confrimEdit()">{{defaultText}}</span></div>
                <div class="show_thr_add">常用回复 <img @click="addReply()" class="addReply" src="../../img/chat_icon_add.png" alt=""></div>
                <ul class="edit_content">
                    <li v-for="(item,index) in quickreply">
                        <span class="text" @click="selectReply(item.content)">{{item.content}}</span>
                        <span class="right_show" v-show="show_editer">
                            <img @click="editReply(item.id,index)" class="chat_icon_add" src="../../img/chat_icon_fillin.png" alt="">
                            <img @click="deleteReply(item.id,index,item.content)" class="chat_icon_delete" src="../../img/chat_icon_delete.png" alt="">
                        </span>
                    </li>
                </ul>
            </div>
            <div class="show_sec" v-show="latest_order">
                <ul class="show_sec_tit" @click="getOrder()">
                    <li><span ids="1" class="default_class active">个人订单</span></li>  
                    <li><span ids="2" class="default_class">店铺订单</span></li>      
                </ul>  
                <div class="shop_order" v-show="orderCategoryStore">
                    <ul class="shop_order_status" @click="getOrderDetail()">
                        <li ids="5" class="order_class active">待支付订单</li> 
                        <li ids="6" class="order_class">待成团订单</li> 
                    </ul>
                    <div class="show_sec_order">
                        <ul class="order_style">
                            <p v-show="orderStoreData.length==0" class="no_order">暂无订单</p>
                            <li v-for="d in orderStoreData">
                                <div class="tit_order">订单号: {{d.order_sn}}</div>
                                <div class="tit_order">订单状态: <span class="status">{{d.order_state}}</span></div>
                                <div class="tit_order">下单时间: {{d.add_time}}</div>
                                <dl class="tit_order_detail">
                                    <dt><img :src="d.list_img" alt=""></dt>
                                    <dd>
                                        <div class="goods_name">{{d.goods_name}}</div>
                                        <div class="specifications">
                                            {{d.spec_key_name}} <span class="num">X{{d.goods_num}}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <div class="tit_order">实收金额：{{d.order_amount}}
                                    <span v-show="d.order_type=='10'">
                                        <button @click="chatCommunication(d.userInfo)" class="btns_send">对话</button>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <p v-show="false" class="no_order">暂无订单</p>
                    </div>
                <div class="paginations">
                    <div class="up_or_down">
                        <span class="up_arrow">共{{totalpage_store}}页</span>
                        <span class="up_arrow" @click="upPage('orderStore')">上一页</span>
                        <span class="up_arrow">{{currentpage_store}}</span>
                        <span class="up_arrow" @click="downPage('orderStore')">下一页</span>
                    </div>
                    <div class="explains">转到</div>
                    <div class="input_count">
                        <input class="input_return" v-model="downInputVal_store" type="text">
                    </div>
                    <div class="right_arrow" @click="downInputPage('orderStore')">></div>
                </div>
                </div>
                <div class="people_order" v-show="orderCategoryPeople">   
                    <ul class="show_sec_status" @click="selectStatus()">
                        <li ids="1" class="status_class active">未完成</li> 
                        <li ids="2" class="status_class">待发货</li> 
                        <li ids="3" class="status_class">待签收</li> 
                        <li ids="4" class="status_class">已签收</li> 
                        <li ids="5" class="status_class">退款中</li> 
                    </ul>
                    <div class="show_sec_order">
                        <ul class="order_style">
                            <p v-show="orderItem.length==0" class="no_order">暂无订单</p>
                            <li v-for="s in orderItem">
                                <div class="tit_order">订单号: {{s.order_sn}}</div>
                                <div class="tit_order">订单状态: <span class="status">{{s.order_state}}</span></div>
                                <div class="tit_order">下单时间: {{s.add_time}}</div>
                                <dl class="tit_order_detail">
                                    <dt>
                                        <img :src="s.list_img" alt="">
                                    </dt>
                                    <dd>
                                        <div class="goods_name">{{s.goods_name}}</div>
                                        <div class="specifications">
                                            {{s.spec_key_name}} <span class="num">X{{s.goods_num}}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <div class="tit_order">实收金额：{{s.order_amount}}
                                    <span v-if="s.order_type=='10'||s.order_type=='14'||s.order_type=='2'">
                                        <button @click="searchAddress(s.shippingInfo)" class="btns_send">地址</button>
                                    </span>
                                    <span v-if="s.order_type=='3'">
                                        <button @click="searchLogistics(s.order_id)" class="btns_send">查看物流</button>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <p v-show="false" class="no_order">暂无订单</p>
                    </div>
                    <div class="paginations">
                        <div class="up_or_down">
                            <span class="up_arrow">共{{totalpage_people}}页</span>
                            <span class="up_arrow" @click="upPage('peopleStore')">上一页</span>
                            <span class="up_arrow">{{currentpage_people}}</span>
                            <span class="up_arrow" @click="downPage('peopleStore')">下一页</span>
                        </div>
                        <div class="explains">转到</div>
                        <div class="input_count">
                            <input class="input_return" v-model="downInputVal_people" type="text">
                        </div>
                        <div class="right_arrow" @click="downInputPage('peopleStore')">></div>
                    </div>
                </div>
            </div> 
         </div>        
     </div>
     <el-dialog
        title="添加快捷回复"
        :visible.sync="dialogVisible"
        width="30%">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model.trim="textareas">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addReplyData()">确 定</el-button>
        </span>
        </el-dialog>
     <el-dialog
        title="编辑快捷回复"
        :visible.sync="dialogVisibleEdit"
        width="30%">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model.trim="textareas">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="addReplyDataEdit()">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 物流信息 -->
        <el-dialog
        title="物流信息"
        :visible.sync="dialogVisibleLogistics"
        width="30%">
        <el-form ref="logisticsInfo" :model="logisticsInfo" label-width="80px">
            <el-form-item label="订单号">
                <el-input disabled v-model.trim="logisticsInfo.logistics_name"></el-input>
            </el-form-item>
            <el-form-item label="物流公司">
                <el-input disabled v-model.trim="logisticsInfo.logistics_mobile"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input disabled v-model.trim="logisticsInfo.shipping_order"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleLogistics = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleLogistics = false">确 定</el-button>
        </span>
        </el-dialog>
     <el-dialog
        title="地址"
        :visible.sync="dialogVisibleAddress"
        width="30%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="收货人">
                <el-input v-model.trim="form.consignee"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model.trim="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <div class="width-120" style="float:left">
                    <el-select v-model.trim="form.province" placeholder="">
                        <el-option v-for="options in optionsProvinced" 
                        :label="options.region_name" 
                        :value="options.region_id" 
                        :key="options.region_id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="width-120 margin-left-10" style="float:left">
                    <el-select v-model.trim="form.city" placeholder="">
                        <el-option v-for="options in optionsCity"
                         :label="options.region_name" 
                         :value="options.region_id"
                         :key="options.region_id"
                         ></el-option>
                    </el-select>
                </div>
                <div class="width-120 margin-left-10" style="float:left">
                    <el-select v-model.trim="form.district" placeholder="">
                        <el-option v-for="options in optionsDistrict"
                         :label="options.region_name"
                          :value="options.region_id"
                          :key="options.region_id"
                          ></el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="详细">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleAddress = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleAddress = false">确 定</el-button>
        </span>
        </el-dialog>
 </div>
</template>
<script>
import md5 from 'js-md5';
import Vue from 'vue';
import webim from '../../js/webim/webim';
import WebIM from 'easemob-websdk';
Vue.prototype.$webim = WebIM;
let qs = require("qs");

/**获取地址 */
import getAddress from '../../js/customerServiceDetail';
WebIM.config = {
  xmppURL: 'im-api.easemob.com',
  apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // appkey: 'chengzi#pingquduo',
  appkey: '1165160929115391#pqd',
  // appkey: 'easemob-demo#chatdemoui',11122222222555
  https: false,
  isMultiLoginSessions: true,
  isAutoLogin: true,
  isWindowSDK: false,
  isSandBox: false,
  isDebug: false,
  autoReconnectNumMax: 3000,
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
     mounted(){
            var that = this;
            this.$im_conn.listen({
                onOpened: function(message) { //连接成功回调
					// console.log('连接成功回调')   
					console.log(new Date())
                },
                onClosed: function ( message ) {
					console.log(new Date())
                    // webim.getStoreInfo('Chat/getStoreInfo',this);
                    // webim.chatInfo('Chat/getInfo', this);
//                  console.log('连接关闭回调')
                },         //连接关闭回调
                onTextMessage: function ( message ) {
                	this.$route.meta.title = '您有新消息哦2';
                			
			     	var audio = document.getElementById("audio");
			  		audio.play();
                       console.log(message);
                    // this.flag = true;
                    webim.saveMsg(that,message);
                    webim.sessionListConduct(that,message);
                    // console.log('收到图文消息');
        	},onPictureMessage: function ( message ) {
			     	var audio = document.getElementById("audio");
			  		audio.play();
                  self_.sessionListConduct(message);
                  self_.saveMsg(message)
              }, //收到图片消息
                onPresence: function ( message ) {
                    // 这里需要弹出面板标识有人要添加您为好友
                    if(message.type == 'subscribe') {
                        // that.privateUser = message.from;
                        // that.privateUserPanel = true;
                    }
                },
                onError: function ( message ) {
                    var data = {
                        grant_type:"password",
                        password:md5("store"+this.storeId),
                        timestamp:new Date().getTime(),
                        username:"store"+this.storeId
                    }
                    webim.login_in(this.webimLogin,data,this);
                },          //失败回调
            });
            // window.addEventListener('scroll', this.handleScroll)
        },
     created(){   
     	eventBus.$on('news_notice', function(val) {　  
	        console.log("news_notice："+val)  
	        alert(val)
	    }) 
        this.$route.meta.title = '您有新消息哦1';
        webim.getStoreInfo('Chat/getStoreInfo',this);
      webim.chatInfo('Chat/getInfo', this);
     },
   data () {
     return {
     	tips_notice:'../../mp3/1.mp3',
         reconnection:false,
         pageNum:'1',
         timestamp:'',
         flag:false,
         isNoChat:true,//还没聊天对象
         optionsProvinced:'',
         optionsCity:'',
         optionsDistrict:'',
         dialogVisibleAddress:false,//显示隐藏地址栏
         form:{
             consignee:'',
             mobile:'',
             address:'',
             province:'',
             city:'',
             district:'',
         },
         storePic:'',//店铺头像
         recevierUserId:'',//接收者id
         width:"80px",
         height:"80px",
         curIndex:0,//回话列表索引
         msgList:{},//消息内容
         sessionList:[],//回话列表
         currentUser:'',//当前用户  正在聊天买家 
         currentHeadPic:'',//当前用户  正在聊天买家 头像
         currentName:'',
         textMsg:'',//发送的消息 textarea
         currentMsgList:[],
         logisticsInfo:{
            logistics_name:'',
            logistics_mobile:'',
            shipping_order:'',
         },
         dialogVisibleLogistics:false,//物流信息
         reply_id:'',//快捷回复id
         selectStatusPeolpe:'1',//个人订单状态 
         selectStatusStore:'1',//个人订单状态 
         selfStatus:'1',//分页选择时 type值
         orderStoreData:[],//店铺订单 状态查询订单
         orderItem:[],//个人订单  状态查询订单
         orderCategoryPeople:true,//个人订单
         orderCategoryStore:false,//店铺订单
         currentpage_commond:1,//当前页
         totalpage_commond:0,//总共多少页
         downInputVal_commond:1,//指定页数跳转
         currentpage_people:1,//当前页
         totalpage_people:0,//总共多少页
         downInputVal_people:1,//指定页数跳转
         currentpage_store:1,//当前页
         totalpage_store:0,//总共多少页
         downInputVal_store:1,//指定页数跳转
         recommendationData:[],//推荐商品集合
         contactPeople:[],//左边联系人
         quickreply:[],//快捷回复
         nickname:'',//nickname
         storeId:'',//商家id
         keys:'',//修改的第几个对象的值 
         dialogVisibleEdit:false,
         recommendation_commodity:false,
         latest_order:false,
         show_thr:false,
         defaultText:"编辑",
         show_editer:false,
         dialogVisible:false,
         textareas:'',
     }
   },
   filters: {
       original(obj){
           if(obj){
                return obj.original
           }
       },
       recevierUser(obj){
           if(obj){
                return obj.avatar
           }
       },
       senderUser(obj){
           if(obj){
                return obj.avatar
           }
       },
       getProm(obj){
           if(obj){
            return obj.prom
           }
       },
       getImgUrl(obj){
           if(obj){
            return obj.original
           }
       },
       getPrice(obj){
           if(obj){
            return obj.prom_price
           }
       },
       getGoodsName(obj){
           if(obj){
            return obj.goods_name
           }
       }
   },
   destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
    },
   methods:{
        KeyDown(){
            if (event.keyCode == 13){
                if(this.currentName==''){
                    this.$message({
                        type:'info',
                        message:'请先选择聊天对象'
                    })
                    return 
                }else{
                    if(this.textMsg!=''){
                        webim.sendMsg(this,'','text');
                    }else{
                        this.$message({
                            type:'info',
                            message:'请输入内容'
                        })
                        return 
                    }
                }
            }
        },
       reconnectionBtn(){
           var that = this;
            var options = {
                apiUrl: WebIM.config.apiURL,
                user: 'store' + that.storeId,
                pwd: that.storePassword,
                // user: '13590440499',
                // pwd: '123456jiang',
                appKey: WebIM.config.appkey,
                success: function (token) {
                    var tokens = token.access_token;
                    that.recevierUserId = token.user.username;
                    var encryptUsername = 'store' + that.storeId;
                    WebIM.utils.setCookie('webim_' + encryptUsername, tokens, 1);
                    webim.getList('Quickreply/getList', that);
                    webim.chatInfo('Chat/getInfo', that);
                    that.reconnection = false;
                },
                error: function () {
                }
            };
            that.$im_conn.open(options);
       },
       handleScroll(event){
                if(event.srcElement.scrollTop==0){
                    var data = {
                        storeId:this.storeId,
                        userId:this.currentUser, 
                        timestamp:this.timestamp,
                        page:'1',
                    }
                    webim.getHistoryChat("Chat/getQuery",data,this)
                }
       },
       chatCommunication(userInfo){
           /** 聊天交流  */
           var warpContact = document.getElementById("warpContact");
           var oLi = warpContact.getElementsByTagName("li");
           var user_id = userInfo.user_id;
           var dataJson = this.sessionList;
           for(var i=0;i<dataJson.length;i++){
               var sessionId = dataJson[i].sessionId;
               if(sessionId==user_id){
                    oLi[i].click();
               }
           }
       },
       recommend(val){
           /**推荐给买家  发送消息  */     	
           webim.sendMsg(this,val,'goods');
       },
       sendPrivateText(user){
            if(this.currentName==''){
                this.$message({
                    type:'info',
                    message:'请先选择聊天对象'
                })
                return 
            }else{
                if(this.textMsg!=''){
                    webim.sendMsg(this,'','text');
                }else{
                    this.$message({
                        type:'info',
                        message:'请输入内容'
                    })
                    return 
                }
            }
       },
       sendImg(){
            webim.sendImg(this);
       },
        imgBtnClick:function () {
          document.querySelector('#images').click();
        },
       searchLogistics(val){
           /** 查看物流  */
           var data = {
               order_id:val,
           }
           webim.getLogistics("goods/getCourier",data,this);
           
       },
       searchAddress(data){
            /** 查看地址  */ 
            this.form.consignee = data.consignee;
            this.form.mobile = data.mobile;
            this.form.address = data.address;
            this.form.province = data.province;
            this.form.city = data.city;
            this.form.district = data.district;
            getAddress.getaddress('/Area/areaList',this);
            var dataCity = {
                parent_id:data.province
            }
            getAddress.secondLevel('/Area/areaList',dataCity,this);
            var dataDistrict = {
                parent_id:data.city
            }
            getAddress.thirdLevel('/Area/areaList',dataDistrict,this);
           this.dialogVisibleAddress = true;       
       },
       selectReply(val){
           /** 选择快捷回复 */
           this.textMsg = val;
       },
       downInputPage(type){
           /**
            * type="commond" downInputVal 指定跳转页 商品推荐
            */
           console.log(type)
                if(type=="commond"){  
                    if(this.totalpage_commond<this.downInputVal_commond){
                        return 
                    }else if(this.downInputVal_commond<=this.totalpage_commond&&this.downInputVal_commond>0){
                        var goodsListData = {
                            store_id:this.storeId,
                            page:this.downInputVal_commond,
                            type:'3',
                        }
                        webim.goodsList('Goods/goodsRecommend',goodsListData,this,type);
                    }           
                }else if(type=="peopleStore"){
                    if(this.totalpage_people<this.downInputVal_people){
                        return 
                    }else if(this.downInputVal_people<=this.totalpage_people&&this.downInputVal_people>0){
                        var data = {
                                type:this.selectStatusPeolpe,
                                user_id:this.currentUser,
                                store_id:this.storeId,
                                page:this.downInputVal_people,
                        }
                        webim.orderData("Order/orderChatList",data,this)
                    }
                }else if(type=="orderStore"){
                    if(this.totalpage_store<this.downInputVal_store){
                        return 
                    }else if(this.downInputVal_store<=this.totalpage_store&&this.downInputVal_store>0){
                        /** Storeorder/orderStore */
                        var orderStoreData = {
                                store_id:this.storeId,
                                type:this.selectStatusStore,
                                page:this.downInputVal_store,
                        }
                        webim.orderStoreQuery("Order/orderChatList",orderStoreData,this);
                    }
                }
       },
       downPage(type){
           /**
            * type="commond" 下一页 商品推荐
            */		
            console.log(type)
                    if(type=="commond"){
                        if(this.currentpage_commond>=this.totalpage_commond){
                            return 
                        }else{
                            this.currentpage_commond++;
                            var goodsListData = {
                                store_id:this.storeId,
                                page:this.currentpage_commond,
                                type:'3',
                            }
                            webim.goodsList('Goods/goodsRecommend',goodsListData,this);
                        }
                    }else if(type=="peopleStore"){
                    	console.log(this.currentpage_people)
                    	console.log(this.totalpage_people)
                        if(this.currentpage_people>=this.totalpage_people){
                            return 
                        }else{
                            this.currentpage_people++;
                            var data = {
                                    type:this.selectStatusPeolpe,
                                    user_id:this.currentUser,
                                    store_id:this.storeId,
                                    page:this.currentpage_people,
                            }
                            webim.orderData("Order/orderChatList",data,this)
                        }
                    }else if(type=="orderStore"){
                        if(this.currentpage_store>=this.totalpage_store){
                            return 
                        }else{
                            this.currentpage_store++;
                            /** Storeorder/orderStore */
                            var orderStoreData = {
                                    store_id:this.storeId,
                                    type:this.selectStatusStore,
                                    page:this.currentpage_store,
                            }
                            webim.orderStoreQuery("Order/orderChatList",orderStoreData,this);
                        }
                    }
       },
       upPage(type){
           /**
            * type="commond"  上一页 商品推荐
            */
           if(type=="commond"){
               if(this.currentpage_commond<=1){
                   return 
               }else{
                   this.currentpage_commond--;
                    var goodsListData = {
                        store_id:this.storeId,
                        page:this.currentpage_commond,
                        type:'3',
                    }
                    webim.goodsList('Goods/goodsRecommend',goodsListData,this);
               }
           }else if(type=="peopleStore"){
               if(this.currentpage_people<=1){
                   return 
               }else{
                   this.currentpage_people--;
                    var data = {
                            type:this.selectStatusPeolpe,
                            user_id:this.currentUser,
                            store_id:this.storeId,
                            page:this.currentpage_people,
                    }
                    webim.orderData("Order/orderChatList",data,this)
               }
           }else if(type=="orderStore"){
               if(this.currentpage_store<=1){
                   return 
               }else{
                    this.currentpage_store--;
                    /** Storeorder/orderStore */
                    var orderStoreData = {
                            store_id:this.storeId,
                            type:this.selectStatusStore,
                            page:this.currentpage_store,
                    }
                    webim.orderStoreQuery("Order/orderChatList",orderStoreData,this);
               }
           }
       },
       getUserInfo(keys,index,name,HeadPic){
           if(this.flag==false){
                this.show_thr = true;
                this.isNoChat = false;
                this.flag=true;
           }
           var warpContact = document.getElementById("warpContact");
           var oLi = warpContact.getElementsByTagName("li");
           for(var i=0;i<oLi.length;i++){
               oLi[i].className = '';
           }
           oLi[index].className = "active";
           this.currentUser = keys;
           this.currentName = name;
           this.currentHeadPic = HeadPic;
    
            /** Quickreply/listData */
            // var getStoreInfoData = {
            //     store_id:this.storeId,
            // }
            if(!this.msgList[keys]){
                this.msgList[keys]=[];
            }
           this.index=index;
            this.currentMsgList=this.msgList[keys];
            this.curIndex=index;
            this.sessionList[index].unread=0;
            this.itemName=this.sessionList[index].userName;
            var data = {
                    storeId:this.storeId,
                    userId:this.currentUser, 
                    timestamp:'',
                    page:'1',
            }
            if(!this.sessionList[index].status){
                this.sessionList[index].status=true;
                if(this.currentMsgList){
                    if(this.currentMsgList.length<10){//当消息小于10条时拉取历史聊天记录
                     /*获取列表聊天信息 Chat/query * */
                        webim.getHistoryChat("Chat/getQuery",data,this);
                    }
                }else{
                    webim.getHistoryChat("Chat/getQuery",data,this)
                }
            }
            webim.goBottom(this);
       },
       addReplyData(){
           /*添加数据 */
           var data = {
                id:'',
                store_id:this.storeId,
                content:this.textareas,
           }
         webim.addContent("Quickreply/addContent",data,this,'add');
       },
       addReply(){
           /*添加数据 弹窗 */
           this.textareas = '';
           this.dialogVisible = true;
       },
       addReplyDataEdit(){
           /*编辑数据 */         
             var data = {
                id:this.reply_id,
                store_id:this.storeId,
                content:this.textareas,
           }
           webim.addReplyData("Quickreply/editContent",data,this,'edit');
       },
       editReply(id,value){
           /*编辑数据 弹窗*/
          let obj = {};
          obj = this.quickreply.find((item)=>{
              return item.id === id;
          });
           this.textareas = obj.content;
           this.keys = value;
           this.reply_id = id;
           this.dialogVisibleEdit = true;
       },
       deleteReply(id,value,content){      
           var data = {
                id:id,
                store_id:this.storeId,
           }
           webim.deleteReplyData("Quickreply/delContent",data,this,value);
       },
       confrimEdit(){
            /*是否开启确认编辑模式 */
            var editReply = document.getElementsByClassName("editReply")[0];
            if(this.defaultText == "确认编辑"){
                this.defaultText = "编辑";
                editReply.className = "editReply";
                this.show_editer = false;
            }else{               
                this.defaultText = "确认编辑";
                editReply.className = "editReply active";
                this.show_editer = true;
            }
       },
       selectTab(e){
           /*获取类目信息* */
           var e = e || window.event;
           var target = e.target;
           var activeChild = document.getElementsByClassName("active_child");
           var ids = '';
        //    if(this.currentUser==''){
        //        this.$message("请您先选择聊天对象")
        //        return 
        //    }
           if(target.nodeName.toLowerCase() == "li"){ 
                this.isNoChat = false;  
                ids = target.getAttribute("ids");
                for(var i=0;i<activeChild.length;i++){
                    activeChild[i].className = 'active_child';
                }
                target.className += " active";
                if(ids=='1'){
                   this.recommendation_commodity = true;
                   this.latest_order = false;
                   this.show_thr = false;
                    /** 商品推荐 Goods/goodsRecommend */
                    var goodsListData = {
                        store_id:this.storeId,
                        page:'1',
                        type:'3',
                    }
                    webim.goodsList('Goods/goodsRecommend',goodsListData,this);
                }else if(ids=='2'){
                   this.latest_order = true;
                   this.recommendation_commodity = false;
                   this.show_thr = false;
                    var data = {
                        type:'1',
                        userid:this.currentUser,
                        store_id:this.storeId,
                        page:'1',
                    }
                    webim.orderData("Order/orderChatList",data,this)
                }else if(ids=='3'){
                   this.show_thr = true;
                   this.latest_order = false;
                   this.recommendation_commodity = false;
                }
           }
       },
       getOrder(){
           /*获取订单列表* */
           var e = e || window.event;
           var target = e.target;
           var activeChild = document.getElementsByClassName("default_class");
           var idStr = target.getAttribute("ids");
           if(idStr=='1'){
               this.orderCategoryPeople = true;
               this.orderCategoryStore = false;
           }else if(idStr=='2'){
               this.orderCategoryPeople = false;
               this.orderCategoryStore = true;
           }
           if(target.nodeName.toLowerCase() == "span"){             
                for(var i=0;i<activeChild.length;i++){
                    activeChild[i].className = 'default_class';
                }
                target.className += " active";
           }
       },
       getOrderDetail(){
           /*  店铺订单  获取订单详情  Storeorder/orderStore * */
           var e = e || window.event;
           var target = e.target;
           var activeChild = document.getElementsByClassName("order_class");           
           var idStr = target.getAttribute("ids");
           if(target.nodeName.toLowerCase() == "li"){             
            for(var i=0;i<activeChild.length;i++){
                activeChild[i].className = 'order_class';
            }
            target.className += " active";
           }
           this.selectStatusStore = idStr;
           var data = {
                store_id:this.storeId,
                type:idStr,
                page:this.currentpage_store,
           }
            webim.orderStoreQuery("Order/orderChatList",data,this)
       },
       selectStatus(){
           /* 个人订单  状态订单  Order/orderChatList  * */
           var e = e || window.event;
           var target = e.target;
           var activeChild = document.getElementsByClassName("status_class");
           if(target.nodeName.toLowerCase() == "li"){             
            for(var i=0;i<activeChild.length;i++){
                activeChild[i].className = 'status_class';
            }
            target.className += " active";
           }           
           var idStr = target.getAttribute("ids");
           this.selectStatusPeolpe = idStr;
           var data = {
                type:idStr,
                user_id:this.currentUser,
                store_id:this.storeId,
                page:'1',
           }
            webim.orderData("Order/orderChatList",data,this)
       }
   },
   components: {

   }
 }
</script>



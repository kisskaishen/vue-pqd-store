<style lang="less" scoped>
@import '../../less/config.less';
@import '../../less/chat.less';
</style>
<template>
 <div class="self_chat">
     <div class="left">
         <div class="top">
             <div class="shop_name">{{nickname}}</div>
         </div>
        <ul class="contact">
            <li v-for="userItem in contactPeople" @click="getUserInfo(userItem.sessionId)">
                <div class="left_icon"><img class="icon" :src="userItem.headPic" alt=""></div>
                <div class="left_content">
                    <div class="title">{{userItem.userName}}<span class="times">{{userItem.time}}</span></div>
                    <div class="detail">{{userItem.msg}}</div>
                </div>
            </li>
        </ul>       
     </div>
     <div class="center_chat">
         <div class="top">采蘑菇的夜芷</div>
         <div class="content">
             <div class="warp">
                <div class="info_auto">
                    <div class="search_info">没有更多消息了</div>
                    <div class="shop_chat">
                        <div class="times">17:17</div>
                        <div class="char_content" v-for="(child,index) in chatData">
                            <div class="right_name" v-show="child.from==storeId">
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
                            <div class="left_name" v-show="child.from!=storeId">
                                <div class="chat_icon">
                                    <img :src="child.ext.senderUser | senderUser" alt="">
                                </div>
                                <div class="chat_info" v-show="child.data&&!child.ext.goods">
                                    {{child.data}}
                                </div>
                                <div class="chat_info" v-show="child.url">
                                    <img :src="child.url" alt="">
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
                <input type="file" value="上传">
                <img id="image" @change="upLoadImage()" src="../../img/up_load.png" alt="">
              <!-- <el-upload
                class="upload"
                ref="upload"
                action="http://a1.easemob.com/1165160929115391/pqd/chatfiles">
                    <img  src="../../img/up_load.png" alt="">
                </el-upload>    -->
            <!-- <el-upload
                class="avatar-uploader"
                ref="upload"
                :action='this.webimUpload'
                :on-success="successUpLoad"
                :on-exceed="onExceed">
                <img  src="../../img/up_load.png" alt="">
            </el-upload>                       -->
            </div>
            <div class="input_center">
                <el-input
                class="textareas"
                type="textarea"
                :rows="3"
                placeholder="Ctrl+Enter发送消息"
                v-model="textarea">
                </el-input>
            </div>
            <div class="btn_input">
                <el-button class="btns" @click="sendPrivateText()" type="danger">发送</el-button>
            </div>
        </div>      
     </div>
     <div class="right_chat">
         <div class="top_chat">
             <ul class="list_chat" @click="selectTab()">
                 <li ids="1" class="active_child active">商品推荐</li>
                 <li ids="2" class="active_child">最新订单</li>
                 <li ids="3" class="active_child">快捷回复</li>
             </ul>
         </div>
         <div class="content">
            <div class="show_once" v-show="recommendation_commodity">
                <div class="title">店铺商品</div>    
                <div class="explain">以下商品按商品排位顺序进行展示</div>
                <ul class="show_goods">
                    <li v-for="its in recommendationData">
                        <dl class="goods_detail">
                            <dt class="goods_img">
                                <img :src="its.original" alt="">
                            </dt>
                            <dd class="goods_details">
                                <div class="psds goods_tit">{{its.goods_name}}</div>
                                <div class="psd price">￥{{its.prom_price}}</div>
                                <div class="psd store_count">库存：{{its.store_count}}</div>
                                <div class="psd sales">销量：{{its.sales}}</div>
                            </dd>
                            <dd class="send_info"><button class="btns_send">发送</button></dd>
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
                        <li ids="1" class="order_class active">待支付订单</li> 
                        <li ids="2" class="order_class">待成团订单</li> 
                    </ul>
                    <div class="show_sec_order">
                        <ul class="order_style">
                            <p v-show="orderStoreData.length==0" class="no_order">暂无订单</p>
                            <li v-for="d in orderStoreData">
                                <div class="tit_order">订单号: {{d.order_sn}}</div>
                                <div class="tit_order">订单状态: <span class="status">{{d.annotation}}</span></div>
                                <div class="tit_order">下单时间: {{d.add_time}}</div>
                                <dl class="tit_order_detail">
                                    <dt><img src="../../img/goods_img.jpg" alt=""></dt>
                                    <dd>
                                        <div class="goods_name">{{d.goods_name}}</div>
                                        <div class="specifications">
                                            {{d.spec_key_name}} <span class="num">X{{d.goods_num}}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <div class="tit_order">实收金额：{{d.order_amount}} <button @click="searchLogistics(d.order_id)" class="btns_send">查看物流</button></div>
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
                        <li ids="3"class="status_class">待签收</li> 
                        <li ids="4" class="status_class">已签收</li> 
                        <li ids="5" class="status_class">退款中</li> 
                    </ul>
                    <div class="show_sec_order">
                        <ul class="order_style">
                            <p v-show="orderItem.length==0" class="no_order">暂无订单</p>
                            <li v-for="s in orderItem">
                                <div class="tit_order">订单号: {{s.order_sn}}</div>
                                <div class="tit_order">订单状态: <span class="status">{{s.annotation}}</span></div>
                                <div class="tit_order">下单时间: {{s.add_time}}</div>
                                <dl class="tit_order_detail">
                                    <dt>
                                        <img :src="s.goodsInfo | original" alt="">
                                    </dt>
                                    <dd>
                                        <div class="goods_name">{{s.goods_name}}</div>
                                        <div class="specifications">
                                            {{s.spec_key_name}} <span class="num">X{{s.goods_num}}</span>
                                        </div>
                                    </dd>
                                </dl>
                                <div class="tit_order">实收金额：{{s.goods_price}} <button @click="searchLogistics(s.order_id)" class="btns_send">查看物流</button></div>
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
            v-model="textareas">
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
            v-model="textareas">
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
                <el-input disabled v-model="logisticsInfo.logistics_name"></el-input>
            </el-form-item>
            <el-form-item label="物流公司">
                <el-input disabled v-model="logisticsInfo.logistics_mobile"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input disabled v-model="logisticsInfo.shipping_order"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleLogistics = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleLogistics = false">确 定</el-button>
        </span>
        </el-dialog>
 </div>
</template>
<script>
import Vue from 'vue';
import websdk from 'easemob-websdk';
import webim from '../../js/webim/webim';

let webIM = window.WebIM = websdk;
Vue.prototype.$WebIM = webIM;
/*头部连接*/  
// console.log(JSON.stringify(WebIM.config))
// console.log("头部连接")
// Vue.prototype.$imConn = imConn;
 export default {
     created(){    
        console.log(this.conn)   
        /**login_in */
        var data = {
            grant_type:"password",
            password:"b602925645e76b1254853e8b318d9d8b",
            timestamp:new Date().getTime(),
            username:"store1057"
        }
        webim.login_in(this.webimLogin,data,this);
        //  console.log(new Date().getTime())
        /**getStoreInfo */
        var getStoreInfoData = {
            store_id:'1057',
            time:'1523347846',
            version:'3.0',
            ajax_get:'1',
            sig:'abbe4f892dedd165cea5d0fdc7650864',
        }
        webim.getStoreInfo(this.webiminfo+'Chat/getStoreInfo',getStoreInfoData,this);
        /** Quickreply/listData */
        webim.Quickreply(this.webiminfo+'Quickreply/listData',getStoreInfoData,this);
        /** Chat/info */
        //拉取回话列表
        var chatInfoData = {
            storeId:'1057',
            time:'1523347846',
            version:'3.0',
            ajax_get:'1',
            sig:'0ec150ea054f1efd8237f28360e33781',
        }
        webim.chatInfo(this.webiminfo+'Chat/info',chatInfoData,this);
        /** 商品推荐 Storegoods/goodsList */
        var goodsListData = {
            store_id:'1057',
            page:'1',
            type:'3',
            time:'1523355063',
            version:'3.0',
            ajax_get:'1',
            sig:'519bf2644f44735ba60295a1ea5c354f',
        }
        webim.goodsList(this.webiminfo+'Storegoods/goodsList',goodsListData,this);
        
     },
   data () {
     return {
         currentUser:null,//正在聊天买家
         currentMsgList:[],
         storePassword:'',
         storeId:'store2015',//商家id
         sessionList:[],//聊天记录
         conn:new WebIM.connection({  
            isMultiLoginSessions: WebIM.config.isMultiLoginSessions,  
            https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',  
            url: WebIM.config.xmppURL,  
            heartBeatWait: WebIM.config.heartBeatWait,  
            autoReconnectNumMax: WebIM.config.autoReconnectNumMax,  
            autoReconnectInterval: WebIM.config.autoReconnectInterval,  
            apiUrl: WebIM.config.apiURL,  
            isAutoLogin: true  
        }),
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
         chatData: [],//聊天数据解析
         keys:'',//修改的第几个对象的值 
         dialogVisibleEdit:false,
         textarea:'',
         recommendation_commodity:true,
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
   methods:{   
//        设置消息体
        setExt:function (type,width,height,file,msg,id) {
            var ext = {//创建消息体
                recevierUser:this.currentMsgList[0].from,
                senderUser:this.currentMsgList[0].to,
                time:parseInt(Date.parse(new Date())/1000),
                terminal:'s_w'
//                from:this.storeId,
//                to:this.currentUser,
//                type:'chat'
            }
            if(this.currentMsgList[0].to!=this.storeId){//根据当前信息修改消息体
//                console.log('执行了');
                ext.recevierUser=this.currentMsgList[0].to;
                ext.senderUser=this.currentMsgList[0].from;
            }
            //图片加宽高
            if(type=='img'){
                ext.imageSize={
                    width:'80px',
                    height:'80px'
                    // width:width,
                    // height:height
                }
//                消息体设置完成，给环信发送消息
                this.imgSendHX(ext,file,msg,id);
            }
            return ext;
        },     
       //      发送消息
        sendPrivateText () {
            var self_=this;
            var ext = self_.setExt();
//            除去换行符
            // if(this.textMsg.indexOf('\n')!=-1){
            //     this.textMsg=this.textMsg.replace('\n','');
            // }
            // return
            if(this.textMsg!=''){
                var sendPrivateText = function () {
                    var id = self_.conn.getUniqueId();                 // 生成本地消息id
                    var msg = new WebIM.message('txt', id);      // 创建文本消息
                    ext.id=id;
                    console.log(self_.currentUser)
                    console.log(self_.currentUser)
                    return 
                    msg.set({
                        msg: 'fdsafsadfsda',                  // 消息内容
                        to: self_.currentUser,                          // 接收消息对象（用户id）
                        roomType: false,
                        ext:ext,
                        success: function (id, serverMsgId) {
//                            保存消息
                            var message = {
                                data:self_.textMsg,
                                from:self_.storeId,
                                ext:ext,
                                id:serverMsgId,
                                to:self_.currentUser,
                                type:'chat',
                            }
                            self_.sessionListConduct(message);
                            self_.saveMsg(message);
                            self_.textMsg='';
                        },
                        fail: function(e){
                            console.log("Send private text error");

                        }
                    });
                    msg.body.chatType = 'singleChat';
                    self_.conn.send(msg.body);
                };
                sendPrivateText();
            }
        },
    //    sendPrivateText(user){
    //     //    alert(this.textarea)
    //         var id = this.$imConn.getUniqueId();// 生成本地消息id
    //         // console.log(id)
    //         // return 
    //         var msg = new WebIM.message('txt', id);// 创建文本消息
    //         msg.set({
    //             msg: this.textarea,                  // 消息内容
    //             // to: '454982292750729716',                          // 接收消息对象（用户id）
    //             to:'2558895',
    //             roomType: false,
    //             success: function (id, serverMsgId) {
    //                 console.log('send private text Success');
    //             },
    //             fail: function(e){
    //                 console.log("Send private text error");
    //             }
    //         });
    //         msg.body.chatType = 'singleChat';
    //         console.log(msg.body);
    //         this.$imConn.send(msg.body);
    //    },
       upLoadImage(){
           alert(222)
       },
        // successUpLoad(response, file, fileList){
        //     if(response.status == 0){
        //         this.$message.warning(`${ response.msg }`);
        //     }else if(response.status == 1){
        //         this.$message.warning(`${ response.msg }`);
        //     }
        //     this.$refs.upload.clearFiles();
        // },
        // onExceed(files, fileList){
        //     var res = fileList[0].response;
        //     if(res.status==0){
        //         this.$message.warning(`${ res.msg }`);
        //     }else if(res.status==1){
        //         this.$message.warning(`${ res.msg }`);
        //     }
        //         this.$refs.upload.clearFiles();
        // },
       submitUpload(){
           /* 聊天上传图片 */
           this.$refs.upload.submit();
       },
       searchLogistics(val){
           /** 查看物流  */
           console.log(val)
           var data = {
               order_id:val,
                // order_id:'667058',
                time:'1523499146',
                version:'3.0',
                ajax_get:'1',
                sig:'91ab6a8a21c513f6691b948706f20f49'
           }
           webim.getLogistics(this.webiminfo+"goods/getCourier",data,this);
           
       },
       selectReply(val){
           /** 选择快捷回复 */
           this.textarea = val;
       },
       downInputPage(type){
           /**
            * type="commond" downInputVal 指定跳转页 商品推荐
            */
                if(type=="commond"){  
                    if(this.totalpage_commond<this.downInputVal_commond){
                        return 
                    }else if(this.downInputVal_commond<=this.totalpage_commond&&this.downInputVal_commond>0){
                        var goodsListData = {
                            store_id:'1057',
                            page:this.downInputVal_commond,
                            type:'3',
                            time:'1523355063',
                            version:'3.0',
                            ajax_get:'1',
                            sig:'519bf2644f44735ba60295a1ea5c354f',
                        }
                        webim.goodsList(this.webiminfo+'Storegoods/goodsList',goodsListData,this,type);
                    }           
                }else if(type=="peopleStore"){
                    if(this.totalpage_people<this.downInputVal_people){
                        return 
                    }else if(this.downInputVal_people<=this.totalpage_people&&this.downInputVal_people>0){
                        var data = {
                                type:this.selectStatusPeolpe,
                                user_id:'248',
                                store_id:'1057',
                                page:this.downInputVal_people,
                                time:'1523412626',
                                version:'3.0',
                                ajax_get:'1',
                                sig:'212f349de0987dcb3176bf3d08329a19'
                        }
                        webim.orderData(this.webiminfo+"Storeorder/orderData",data,this)
                    }
                }else if(type=="orderStore"){
                    if(this.totalpage_store<this.downInputVal_store){
                        return 
                    }else if(this.downInputVal_store<=this.totalpage_store&&this.downInputVal_store>0){
                        /** Storeorder/orderStore */
                        var orderStoreData = {
                                store_id:'1057',
                                type:this.selectStatusStore,
                                page:this.downInputVal_store,
                                time:'1523350574',
                                version:'3.0',
                                ajax_get:'1',
                                sig:'1313d3fa1bf77a11d9a90033b886faeb',
                        }
                        webim.orderStoreQuery(this.webiminfo+"Storeorder/orderStore",orderStoreData,this);
                    }
                }
       },
       downPage(type){
           /**
            * type="commond" 下一页 商品推荐
            */
                    if(type=="commond"){
                        if(this.currentpage_commond>=this.totalpage_commond){
                            return 
                        }else{
                            this.currentpage_commond++;
                            var goodsListData = {
                                store_id:'1057',
                                page:this.currentpage_commond,
                                type:'3',
                                time:'1523355063',
                                version:'3.0',
                                ajax_get:'1',
                                sig:'519bf2644f44735ba60295a1ea5c354f',
                            }
                            webim.goodsList(this.webiminfo+'Storegoods/goodsList',goodsListData,this);
                        }
                    }else if(type=="peopleStore"){
                        if(this.currentpage_people>=this.totalpage_people){
                            return 
                        }else{
                            this.currentpage_people++;
                            var data = {
                                    type:this.selectStatusPeolpe,
                                    user_id:'248',
                                    store_id:'1057',
                                    page:this.currentpage_people,
                                    time:'1523412626',
                                    version:'3.0',
                                    ajax_get:'1',
                                    sig:'212f349de0987dcb3176bf3d08329a19'
                            }
                            webim.orderData(this.webiminfo+"Storeorder/orderData",data,this)
                        }
                    }else if(type=="orderStore"){
                        if(this.currentpage_store>=this.totalpage_store){
                            return 
                        }else{
                            this.currentpage_store++;
                            /** Storeorder/orderStore */
                            var orderStoreData = {
                                    store_id:'1057',
                                    type:this.selectStatusStore,
                                    page:this.currentpage_store,
                                    time:'1523350574',
                                    version:'3.0',
                                    ajax_get:'1',
                                    sig:'1313d3fa1bf77a11d9a90033b886faeb',
                            }
                            webim.orderStoreQuery(this.webiminfo+"Storeorder/orderStore",orderStoreData,this);
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
                        store_id:'1057',
                        page:this.currentpage_commond,
                        type:'3',
                        time:'1523355063',
                        version:'3.0',
                        ajax_get:'1',
                        sig:'519bf2644f44735ba60295a1ea5c354f',
                    }
                    webim.goodsList(this.webiminfo+'Storegoods/goodsList',goodsListData,this);
               }
           }else if(type=="peopleStore"){
               if(this.currentpage_people<=1){
                   return 
               }else{
                   this.currentpage_people--;
                    var data = {
                            type:this.selectStatusPeolpe,
                            user_id:'248',
                            store_id:'1057',
                            page:this.currentpage_people,
                            time:'1523412626',
                            version:'3.0',
                            ajax_get:'1',
                            sig:'212f349de0987dcb3176bf3d08329a19'
                    }
                    webim.orderData(this.webiminfo+"Storeorder/orderData",data,this)
               }
           }else if(type=="orderStore"){
               if(this.currentpage_store<=1){
                   return 
               }else{
                    this.currentpage_store--;
                    /** Storeorder/orderStore */
                    var orderStoreData = {
                            store_id:'1057',
                            type:this.selectStatusStore,
                            page:this.currentpage_store,
                            time:'1523350574',
                            version:'3.0',
                            ajax_get:'1',
                            sig:'1313d3fa1bf77a11d9a90033b886faeb',
                    }
                    webim.orderStoreQuery(this.webiminfo+"Storeorder/orderStore",orderStoreData,this);
               }
           }
       },
       getUserInfo(keys){
           /*获取列表聊天信息 Chat/query * */
           var data = {
               storeId:'1057',
                userId:keys,
                timestamp:'',
                page:'1',
                time:'1523350574',
                version:'3.0',
                ajax_get:'1',
                sig:'83d684eb06a4d3777ced3196149b7050',
           }
           webim.chatQuery(this.webiminfo+"Chat/query",data,this);
           /*获取订单列表 Storeorder/orderStore * */
           var orderStoreData = {
               store_id:'1057',
                type:'1',
                page:'1',
                time:'1523350574',
                version:'3.0',
                ajax_get:'1',
                sig:'1313d3fa1bf77a11d9a90033b886faeb',
           }
           webim.orderStoreQuery(this.webiminfo+"Storeorder/orderStore",orderStoreData,this);
            this.currentUser = keys;
           console.log(keys)
       },
       addReplyData(){
           /*添加数据 */
           var data = {
                id:'',
                store_id:'1057',
                content:this.textareas,
                time:'1523431099',
                version:'3.0',
                ajax_get:'1',
                sig:'2d397e27474da49a6f150511400fa2c3',
           }
           alert(222)
           webim.addReplyData(this.webiminfo+"Quickreply/addInfo",data,this,'add');
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
                store_id:'1057',
                content:this.textareas,
                time:'1523431099',
                version:'3.0',
                ajax_get:'1',
                sig:'2d397e27474da49a6f150511400fa2c3',
           }
           webim.addReplyData(this.webiminfo+"Quickreply/addInfo",data,this,'edit');
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
        //    console.log(value)
        //   let obj = {};
        //   obj = this.replyData.find((item)=>{
        //       return item.id === value;
        //   });
        //   console.log(JSON.stringify(obj))
        
           var data = {
                id:id,
                store_id:'1057',
                time:'1523431099',
                version:'3.0',
                ajax_get:'1',
                sig:'2d397e27474da49a6f150511400fa2c3',
           }
           webim.deleteReplyData(this.webiminfo+"Quickreply/delData",data,this,value);
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
           if(target.nodeName.toLowerCase() == "li"){   
                ids = target.getAttribute("ids");
                for(var i=0;i<activeChild.length;i++){
                    activeChild[i].className = 'active_child';
                }
                target.className += " active";
                if(ids=='1'){
                   this.recommendation_commodity = true;
                   this.latest_order = false;
                   this.show_thr = false;
                }else if(ids=='2'){
                   this.latest_order = true;
                   this.recommendation_commodity = false;
                   this.show_thr = false;
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
           console.log(idStr)
           this.selectStatusStore = idStr;
           var data = {
                store_id:'1057',
                type:idStr,
                page:this.currentpage_store,
                time:'1523412626',
                version:'3.0',
                ajax_get:'1',
                sig:'212f349de0987dcb3176bf3d08329a19'
           }
            // webim.orderStore(this.webiminfo+"Storeorder/orderStore",data,this)  orderStoreQuery
            webim.orderStoreQuery(this.webiminfo+"Storeorder/orderStore",data,this)
       },
       selectStatus(){
           /* 个人订单  状态订单  Storeorder/orderData  * */
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
           console.log(idStr)
           this.selectStatusPeolpe = idStr;
           var data = {
                type:idStr,
                user_id:'248',
                store_id:'1057',
                page:'1',
                time:'1523412626',
                version:'3.0',
                ajax_get:'1',
                sig:'212f349de0987dcb3176bf3d08329a19'
           }
            webim.orderData(this.webiminfo+"Storeorder/orderData",data,this)
       }
   },
   components: {

   }
 }
</script>



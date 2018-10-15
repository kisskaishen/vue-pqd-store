<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/orderlist.less";
.item1{
	overflow: hidden;
	width:100%;
}
.orderList_warp{
}
</style>
<template>
 <div class="orderList">
 	<div class="orderList_warp">
   <div class="item1">
     <div class="left">快捷选择:</div>
     <div class="right">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--<el-tab-pane v-for="item in orderStatusCount" :label="''+item.name+'('+item.total_num+')'" :action="item.action" :name="item.value"></el-tab-pane>-->
        <el-tab-pane v-for="item in orderStatusCount" :label="''+item.name+'('+item.total_num+')'" :action="item.action" :key="item.value" :name="item.value"></el-tab-pane>
      </el-tabs>
     </div>
   </div>
   <div class="search">
     <div class="search-input">
       <div class="leftLable">订单编号：</div><div class="rightLable"><el-input size="small" v-model="order_sn" placeholder=""></el-input></div>
     </div>
     <div class="search-input">
       <div class="leftLable">商品ID：</div><div class="rightLable"><el-input size="small" v-model="goodsId" placeholder=""></el-input></div>
     </div>
     <div class="search-input">
       <div class="leftLable">收货人手机：</div><div class="rightLable"><el-input size="small" v-model="mobile" placeholder=""></el-input></div>
     </div>
     <!-- <div class="search-input">
       <div class="leftLable">快递单号：</div><div class="rightLable"><el-input size="small" v-model="logistics_code" placeholder=""></el-input></div>
     </div> -->
     <div class="search-input">
       <div class="leftLable">订单状态：</div><div class="rightLable">
           <el-select size="small"  v-model="order_state" placeholder="请选择" 
              @change = "getSlectStatus()">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
         </div>
     </div>
     <div class="search-input">
       <div class="leftLable">收货人姓名：</div><div class="rightLable"><el-input size="small" v-model="consignee" placeholder=""></el-input></div>
     </div>
     <picker-data title="日期:" @onPassByVal = "change"></picker-data>
     <div class="clickButtonMargin">     
      <el-button size="small" type="primary" @click="searchOrderList()">查询</el-button>
      <el-button size="small" type="success" @click ="batchExport()">批量导出</el-button>
     </div>
   </div>
   <div class="order-list">
     <div class="title">订单列表</div>
     <div class="empty_tips" v-show="tableData.length==0">
     	<img class="img_empty" src="../../img/empty/empty_img.png" alt="" />
     	<div class="text_empty">暂无订单</div>
     </div>
     <div class="table-content" v-for="item in tableData">
       <div class="table-content-info">
         <span class="info">订单编号：{{item.order_sn}}</span>
         <span class="info">成单时间：{{item.success_time}}</span>
         <span class="info">收货人：{{item.consignee}}</span>  
         <span v-show="item.confirm_time" class="info">确认收货时间：{{item.confirm_time}}</span>  
         <!-- <span class="info">收货人手机：{{item.phone}}</span> -->
         <!-- <span class="info">快递单号：{{item.logistics_order_sn}}</span> -->
       </div>
        <div class="table-content-box">
            <table class="show-order-product">
              <thead>
                <tr>
                  <th>商品</th>
                  <th>商品名称</th>
                  <th>订单状态</th>
                  <th>商品价格</th>
                  <th>购买数量</th>
                  <th>付款金额</th>
                  <th>订单类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="goods">
                    <img :src="item.list_img" style="width:60px;height:60px" alt="">
                    <div>{{item.goods_id}}</div>
                  </td>
                  <td class="goods_name"><div class="good_name">{{item.goods_name}}</div></td>
                  <td class="order_state">{{item.order_state}}</td>
                  <td class="goods_price">{{item.goods_price}}</td>
                  <td class="goods_price">{{item.num}}</td>
                  <td class="goods_price">{{item.order_amount}}</td>
                  <td class="goods_price">{{item.is_group}}</td>
                  <td class="goods_price">
                      <router-link :to='{path:"/store/orderManager/orderDetail", query:{ order_sn:item.order_sn} }'>查看</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
     </div>
       <div class="pagination" v-show="total!=0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total='total'>
        </el-pagination>
      </div>
   </div>
   </div>
 </div>
</template>

<script>
import orderList from '../../js/orderList';

import pickerData from "../../components/picker";
 export default {
   data () {
     return {
     	count:1,
     	total_page:0,
     	stateArr:[],
       orderStatusCount:[],
       quick_search_1:'',
       quick_search_2:'',
       pageSize:10,
       undelivery:0,
       pendinggroup:0,
       delivery:0,
       currentPage4: 1,
       activeName: '',//4   3  6   12
       order_sn:'',
       goodsId:'',
       mobile:'',
       logistics_code:'',
       order_state:'',
       consignee:'',
       picker:'',
       total:0,
       sTime:'',
       eTime:'',
       tableData: [],
        options: [],
        value: '',
        value:'',
        action:'',
     }
   },
   created(){
		this.fetch();
	   	var that = this;
	   	eventBus.$on('orderList', function(id){
		    that.fetch();
		});
   },
   components: {
     pickerData
   },
   methods:{
   	fetch(){
   		 var that = this;
	     orderList.getOrderStatus("/Order/orderInquireState",this); 
	     orderList.orderStatusCount("/order/orderStatusCount",that);
	     if(this.$route.query){
		     this.value = this.$route.query.value;
		     this.action = this.$route.query.action;
		     this.activeName = this.$route.query.value;
		     this.order_state = this.$route.query.value;
		     var data = {
		     	quick_search:this.value,
	            page:1,
	            pageSize:that.pageSize
		     }
	        orderList.getOrderListQuery("/Order/orderList",data,that);
	     }else{
	     	orderList.getOrderList("/Order/orderList",that); 
	     } 
   	},
     batchExport(){
       var that = this;
          var data = {
	     	'quick_search':this.value,
            'order_sn':that.order_sn,
            'goodsId':that.goodsId,
            'mobile':that.mobile,
            'logistics_code':that.logistics_code,
            'order_state':that.order_state,
            'consignee':that.consignee,
            'sTime':that.sTime=='NaN-0NaN-0NaN'?"":that.sTime,
            'eTime':that.eTime=='NaN-0NaN-0NaN'?"":that.eTime,
            'export':-1
          }
          orderList.getOrderListGetUrl("/order/exportOrder",data,this);
     },
     searchOrderList(){
       var that = this;
       var data = {
	     'quick_search':this.value,
        'page':1,
        'order_sn':that.order_sn,
        'goodsId':that.goodsId,
        'mobile':that.mobile,
        'logistics_code':that.logistics_code,
        'shipping_status':that.shipping_status,
        'order_state':that.order_state,
        'consignee':that.consignee,
          'sTime':that.sTime=='NaN-0NaN-0NaN'?"":that.sTime,
          'eTime':that.eTime=='NaN-0NaN-0NaN'?"":that.eTime,
       }
       orderList.getOrderListQuery("/Order/orderList",data,that);
     },
      handleClick(tab, event) {
        var that = this;
          var data = {
            'page':1,
            'quick_search':tab.name,
            'pageSize':that.pageSize,
          }
          this.value = tab.name;
          this.order_state = tab.name;
        orderList.getOrderListQuery("/Order/orderList",data,that);
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        var that = this;
        var data = {
	     	'quick_search':this.value,
          'page':val,
          'pageSize':that.pageSize,
          'order_sn':that.order_sn,
          'goodsId':that.goodsId,
          'mobile':that.mobile,
          'logistics_code':that.logistics_code,
        'shipping_status':that.shipping_status,
          'order_state':that.order_state,
          'consignee':that.consignee,
          'sTime':that.sTime=='NaN-0NaN-0NaN'?"":that.sTime,
          'eTime':that.eTime=='NaN-0NaN-0NaN'?"":that.eTime,
            }
            orderList.getOrderListQuery("/Order/orderList",data,that);
      },
      getSlectStatus(){
        var that = this;
        that.activeName = that.order_state;
      },
      change(msg){
        if(msg){
          this.sTime = msg[0];
          this.eTime = msg[1];
        }else{
          this.sTime = '';
          this.eTime = '';
        }
      }
   }
 }
</script>

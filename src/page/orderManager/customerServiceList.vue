<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/orderlist.less";
.empty_text{
	text-align: center;
    margin-top: 50px;
    font-size: 12px;
    color: rgb(153, 153, 153);
}
</style>
<template>
 <div class="orderList">   
 	<div class="item1">
     <div class="left">快捷选择:</div>
     <div class="right">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--<el-tab-pane v-for="item in orderStatusCount" :label="''+item.name+'('+item.total_num+')'" :action="item.action" :name="item.value"></el-tab-pane>-->
        <el-tab-pane v-for="item in orderStatusCount" :label="''+item.name+'('+item.total_num+')'" :action="item.action" :key="item.value" :name="item.value"></el-tab-pane>
      </el-tabs>
     </div>
   </div>
   <!--<div class="item1">
     <div class="common-top-title">退款/售后</div>
   </div>-->
   <div class="search">
     <div class="search-input">
       <div class="leftLable">订单编号：</div><div class="rightLable"><el-input size="small" v-model="orderSn" placeholder=""></el-input></div>
     </div>
     <div class="search-input">
       <div class="leftLable">商品ID：</div><div class="rightLable"><el-input size="small" v-model="goodId" placeholder=""></el-input></div>
     </div>
     <div class="search-input">
       <div class="leftLable">收货人手机：</div><div class="rightLable"><el-input size="small" v-model="userTel" placeholder=""></el-input></div>
     </div>
     <div class="search-input">
       <div class="leftLable">快递单号：</div><div class="rightLable"><el-input size="small" v-model="shipNumber" placeholder=""></el-input></div>
     </div>
     <div class="search-input">
       <div class="leftLable">售后类型：</div><div class="rightLable"> 
          <el-select size="small" v-model="order_service_type" placeholder="全部">
		      <el-option
		      v-for="item in optionsType"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
       </div>
     </div>
     <div class="search-input">
       <div class="leftLable">售后状态：</div><div class="rightLable"> 
          <el-select size="small" v-model="order_service_status" placeholder="全部"
		      	@change = "getSlectStatu()">
		      <el-option
		      v-for="item in optionsStatus"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
       </div>
     </div>
     <div class="search-input">
       <div class="leftLable">收货人姓名：</div><div class="rightLable"><el-input size="small" v-model="userName" placeholder=""></el-input></div>
     </div>
     <picker-data title="日期:" @onPassByVal = "change"></picker-data>
     <div class="clickButtonMargin">     
      <el-button type="primary" size="small" @click="searchQueryCustomer()">查询</el-button>
      <el-button type="success" size="small" @click ="batchExport()">批量导出</el-button>
     </div>
   </div>
   <div class="order-list">
     <div class="title">订单列表</div>
      <div class="empty_tips" v-show="itemData.length==0">
    <img class="img_empty" src="../../img/empty/empty_img.png" alt="" />
    <div class="text_empty">暂无订单</div>
 </div>
     <div class="table-content" v-for='item in itemData' v-show="itemData.length!=0">
       <div class="table-content-info">
         <span class="info">订单编号：{{item.order_sn}}</span>
         <span class="info">成单时间：{{item.success_time}}</span>
         <span class="info">收货人：{{item.consignee}}</span>
         <!-- <span class="info">收货人手机：{{item.phone}}</span> -->
         <span v-show="item.logistics_order_sn" class="info">快递单号：{{item.logistics_order_sn}}</span>
         <!-- <span class="info">快递编号：{{item.consignee}}</span> -->
       </div>
        <div class="table-content-box">
            <table class="show-order-product">
              <thead>
                <tr>
                  <th>商品</th>
                  <th>商品名称</th>
                  <th>订单状态</th>
                  <th>售后状态</th>
                  <th>付款金额</th>
                  <th>申请时间</th>
                  <th>售后类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="list_img">
                    <img :src="item.list_img" style="width:60px;height:60px" alt="">
                    <div>{{item.goods_id}}</div> 
                  </td>
                  <td class="goods_name"><div class="good_name">{{item.goods_name}}</div></td>
                  <td class="order_state">{{item.order_state}}</td>
                  <td class="order_service">{{item.order_service}}</td>
                  <td class="order_amount">{{item.order_amount}}</td>
                  <td class="success_time">{{item.success_time}}</td>
                  <td class="service_type">{{item.service_type}}</td>
                  <td class="search_1"><router-link :to='{path:"/store/orderManager/customerServiceDetail", query:{ order_sn:item.order_sn,ptime:item.tuantime } }'>查看</router-link></td>
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
          :page-size = 'pageSize'
          layout="total, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
   </div>
 </div>
</template>

<script>
import customerServiceList from "../../js/customerServiceList";

import pickerData from '../../components/picker';
 export default {
   data () {
     return {
     	count:1,
     	total_page:0,
     	optionsStatus:[],
     	optionsType:[],
     	datas:[],
     	orderStatusCount:[],
     	value:'',
        options: [],
        value: '',
       activeName: '',
       orderSn:'',
       goodId:'',
       userTel:'',
       shipNumber:'',
       order_service_status:'',
       order_service_type:'',
       userName:'',
       procssTime:'',
       sTime:'',
       eTime:'',
       itemData:[],
      currentPage4: 1,
      total:0,
      pageSize:10
     }
   },
   created(){
   		this.fetch();
	   	var that = this;
	   	eventBus.$on('customerServiceList', function(id){
		    that.fetch();
		})
   },
   components: {
     pickerData
   },
   methods:{        
   	batchExport(){
       var that = this;
          var data = {
            'export':-1,
	          'page':1,
		       'pageSize':this.pageSize,
	          'order_sn':this.orderSn,
	          'goodsId':this.goodId,
	          'mobile':this.userTel,
	          'logistics_code':this.shipNumber,
	          'order_service_status':this.order_service_status,
		       'service_type':this.order_service_type,
	          'consignee':this.userName,
	            'sTime':this.sTime=='NaN-0NaN-0NaN'?"":this.sTime,
	            'eTime':this.eTime=='NaN-0NaN-0NaN'?"":this.eTime,
          }
          customerServiceList.getOrderListGetUrl("/order/exportOrderService",data,this);
     },
   	fetch(){
   	 customerServiceList.orderServiceStatusCount("/Orderservice/orderServiceStatusCount",this)
     customerServiceList.orderServiceInquireStatus("/OrderService/orderServiceInquireStatus",this)
   	 if(this.$route.query){
	     this.value = this.$route.query.value;
	     this.action = this.$route.query.action;
	     this.activeName = this.$route.query.value;
	     this.order_service_status = this.$route.query.value;
	     var data = {
          'page':1,
	       'pageSize':this.pageSize,
          'order_sn':this.orderSn,
          'goodsId':this.goodId,
          'mobile':this.userTel,
          'logistics_code':this.shipNumber,
          'order_service_status':this.order_service_status,
	       'service_type':this.order_service_type,
          'consignee':this.userName,
            'sTime':this.sTime=='NaN-0NaN-0NaN'?"":this.sTime,
            'eTime':this.eTime=='NaN-0NaN-0NaN'?"":this.eTime,
	     }
	     customerServiceList.getCustomerServiceList("/Orderservice/orderServiceList",data,this)
     }else{
	     var data = {
	       'page':1,
	       'pageSize':this.pageSize,
          'order_sn':this.orderSn,
          'goodsId':this.goodId,
          'mobile':this.userTel,
          'logistics_code':this.shipNumber,
          'order_service_status':this.order_service_status,
	       'service_type':this.order_service_type,
          'consignee':this.userName,
            'sTime':this.sTime=='NaN-0NaN-0NaN'?"":this.sTime,
            'eTime':this.eTime=='NaN-0NaN-0NaN'?"":this.eTime,
	     }
	     customerServiceList.getCustomerServiceList("/Orderservice/orderServiceList",data,this)
     }
   	},
   	  getSlectStatu(){
        var that = this;
        that.activeName = that.order_service_status;
      },
   	handleClick(tab, event) {
        var that = this;
        this.order_service_status = tab.name;
        var data = {
          'page':1,
	       'pageSize':this.pageSize,
          'order_sn':this.orderSn,
          'goodsId':this.goodId,
          'mobile':this.userTel,
          'logistics_code':this.shipNumber,
          'order_service_status':this.order_service_status,
	       'service_type':this.order_service_type,
          'consignee':this.userName,
            'sTime':this.sTime=='NaN-0NaN-0NaN'?"":this.sTime,
            'eTime':this.eTime=='NaN-0NaN-0NaN'?"":this.eTime,
        }
        customerServiceList.getCustomerServiceList("/Orderservice/orderServiceList",data,this)
      },
     change(msg){
      if(msg){
        this.sTime = msg[0];
        this.eTime = msg[1];
       }else{
        this.sTime = '';
        this.eTime = '';
       }
     },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        var data = {
          'page':val,
	       'pageSize':this.pageSize,
          'order_sn':'',
          'goodsId':'',
          'mobile':'',
          'logistics_code':'',
	       'order_service_status':this.order_service_status,
	       'service_type':this.order_service_type,
          'consignee':"",
            'sTime':this.sTime=='NaN-0NaN-0NaN'?"":this.sTime,
            'eTime':this.eTime=='NaN-0NaN-0NaN'?"":this.eTime,
        }
        customerServiceList.getCustomerServiceList("/Orderservice/orderServiceList",data,this)
      },
      searchQueryCustomer(){
        var data = {
          'page':1,
	       'pageSize':this.pageSize,
          'order_sn':this.orderSn,
          'goodsId':this.goodId,
          'mobile':this.userTel,
          'logistics_code':this.shipNumber,
          'order_service_status':this.order_service_status,
	       'service_type':this.order_service_type,
          'consignee':this.userName,
            'sTime':this.sTime=='NaN-0NaN-0NaN'?"":this.sTime,
            'eTime':this.eTime=='NaN-0NaN-0NaN'?"":this.eTime,
        }
       customerServiceList.getCustomerServiceList("/Orderservice/orderServiceList",data,this)
      },
   }
 }
</script>

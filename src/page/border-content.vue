<style lang="less">
@import "./../less/config.less";
.index{
  .right-menu{
    /*padding:16px;*/
    margin-left:230px;
    min-width:1112px;
    position: relative;
    background:#f9f9f9;
    /*box-shadow: 0 0px 10px #ddd;*/
  }
}
 .self_crumbs{
 	/*width:100%;*/
 	padding-left:16px;
 	height:50px;
 	background:#fff;
 	overflow:hidden;
 	position:relative;
 	.right_chat{
 		position:absolute;
 		right:20px;
 		top:16px;
 		.item{
 			width:18px;
 			height:18px;
 			background:#eee;
 			border-radius: 50%;
 		}
 	}
 }
 .self_right_content{
 	padding:16px;
 }
</style>
<template>
 <div class="index">
    <!-- <store-top></store-top> -->
    <left-menu></left-menu>
    <div class="right-menu">
    	<div class="self_crumbs">
    		<breadcrumb :content="contentBreadCrumb"></breadcrumb>
    		<div class="right_chat">
    			<div class="item"></div>
    		</div>
    	</div>
    	<div class="self_right_content">
        	<router-view :key="key"></router-view>
    	</div>
    </div>
      <copy-right></copy-right>
 </div>
</template>

<script>
import echarts from "echarts"
import webim from './../js/webim/webim';
import breadcrumb from '../components/breadcrumb'
// console.log(echarts)



import leftMenu from '../components/leftMenu'
import storeTop from '../components/storeTop'
import copyRight from '../components/copyRight';
 export default {
   data () {
     return {
     	contentBreadCrumb:{
     		path1:'',
     		title1:'',
     		path2:'',
     		title2:'',
     	}
     }
   },
	watch: {
	    '$route' (to, from) {
	      // 对路由变化作出响应...
	      var routerName = to.name;
	      var arrRouter= [
	      		"index",
	      		"orderList",
	      		"orderDetail",
	      		"customerServiceList",
	      		"customerServiceDetail",
	      		"batchDelivery",
	      		"releaseNewProducts",
	      		"releaseNewProductEdit",
	      		"productList",
	      		"shemeProductList",
	      		"revenueRecord",
	      		"recharge",
	      		"wx_pay",
	      		"accountManager",
	      		"storeInfo",
	      		"IllegalInformation",
	      		"passwordSecurity",
	      		"messageSetting",
	      		"marketing_active",
	      		"marketing_detail",
	      		"marketing_goods",
	      		"resource_activity",
	      		"resource_activity_detail",
	      		"resource_activity_goods",
	      		"shopCoupons",
	      		"couponListDetail",
	      		"couponStatistics",
	      		"thirdPartyTools",
	      		"evaluate",
	      ]
	      var keys = arrRouter.indexOf(routerName);
	      	if(keys=='0'){
	      		this.contentBreadCrumb.path1 = "";
	      		this.contentBreadCrumb.title1 = "";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='1'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/order";
	      		this.contentBreadCrumb.title1 = "订单列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='2'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/customerServiceList";
	      		this.contentBreadCrumb.title1 = "订单列表";
	      		this.contentBreadCrumb.title2 = "订单详情";
	      	}else if(keys=='3'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/customerServiceList";
	      		this.contentBreadCrumb.title1 = "退货/售后列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='4'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/customerServiceList";
	      		this.contentBreadCrumb.title1 = "退货/售后列表";
	      		this.contentBreadCrumb.title2 = "订单详情";
	      	}else if(keys=='5'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/batchDelivery";
	      		this.contentBreadCrumb.title1 = "批量发货";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='6'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/releaseNewProducts";
	      		this.contentBreadCrumb.title1 = "发布新产品";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='7'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/releaseNewProducts";
	      		this.contentBreadCrumb.title1 = "发布新产品";
	      		this.contentBreadCrumb.title2 = "产品";
	      	}else if(keys=='8'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/productList";
	      		this.contentBreadCrumb.title1 = "产品列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='9'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/shemeProductList";
	      		this.contentBreadCrumb.title1 = "资源位列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='10'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/revenueRecord";
	      		this.contentBreadCrumb.title1 = "资金管理";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='11'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/revenueRecord";
	      		this.contentBreadCrumb.title1 = "资金管理";
	      		this.contentBreadCrumb.title2 = "保证金充值";
	      	}else if(keys=='12'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/revenueRecord";
	      		this.contentBreadCrumb.title1 = "资金管理";
	      		this.contentBreadCrumb.path2 = "/store/accountFund/recharge";
	      		this.contentBreadCrumb.title2 = "保证金充值";
	      	}else if(keys=='13'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/accountManager";
	      		this.contentBreadCrumb.title1 = "账户管理";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='14'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/storeInfo";
	      		this.contentBreadCrumb.title1 = "商家信息";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='15'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/IllegalInformation";
	      		this.contentBreadCrumb.title1 = "违规信息";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='16'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/passwordSecurity";
	      		this.contentBreadCrumb.title1 = "密码安全";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='17'){
	      		this.contentBreadCrumb.path1 = "/store/customerServiceSetting/messageSetting";
	      		this.contentBreadCrumb.title1 = "消息设置";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='18'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "营销活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='19'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "营销活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='20'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "营销活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='21'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "资源位活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='22'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "资源位活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='23'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "资源位活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='24'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/shopCoupons";
	      		this.contentBreadCrumb.title1 = "店铺优惠券";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='25'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/shopCoupons";
	      		this.contentBreadCrumb.title1 = "店铺优惠券";
	      		this.contentBreadCrumb.title2 = "店铺优惠券详情";
	      	}else if(keys=='26'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/couponStatistics";
	      		this.contentBreadCrumb.title1 = "优惠券统计";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='27'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/thirdPartyTools";
	      		this.contentBreadCrumb.title1 = "第三方工具";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='28'){
	      		this.contentBreadCrumb.path1 = "/store/evaluateManager/evaluate";
	      		this.contentBreadCrumb.title1 = "评价管理";
	      		this.contentBreadCrumb.title2 = "";
	      	}
			if(from.name=="wx_pay"){
				clearInterval(this.pay_timer_self)
			}
	    }
	 },
   mounted () {
   },
   computed:{
   	 	key(){
   	 		return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
   	 	}
   },
   components: {
      leftMenu,storeTop,copyRight,breadcrumb
   },
   created(){
	      var routerName = this.$route.name;
	      var arrRouter= [
	      		"index",
	      		"orderList",
	      		"orderDetail",
	      		"customerServiceList",
	      		"customerServiceDetail",
	      		"batchDelivery",
	      		"releaseNewProducts",
	      		"releaseNewProductEdit",
	      		"productList",
	      		"shemeProductList",
	      		"revenueRecord",
	      		"recharge",
	      		"wx_pay",
	      		"accountManager",
	      		"storeInfo",
	      		"IllegalInformation",
	      		"passwordSecurity",
	      		"messageSetting",
	      		"marketing_active",
	      		"marketing_detail",
	      		"marketing_goods",
	      		"resource_activity",
	      		"resource_activity_detail",
	      		"resource_activity_goods",
	      		"shopCoupons",
	      		"couponListDetail",
	      		"couponStatistics",
	      		"thirdPartyTools",
	      		"evaluate",
	      ]
	      var keys = arrRouter.indexOf(routerName);
	      	if(keys=='0'){
	      		this.contentBreadCrumb.path1 = "";
	      		this.contentBreadCrumb.title1 = "";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='1'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/order";
	      		this.contentBreadCrumb.title1 = "订单列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='2'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/customerServiceList";
	      		this.contentBreadCrumb.title1 = "订单列表";
	      		this.contentBreadCrumb.title2 = "订单详情";
	      	}else if(keys=='3'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/customerServiceList";
	      		this.contentBreadCrumb.title1 = "退货/售后列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='4'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/customerServiceList";
	      		this.contentBreadCrumb.title1 = "退货/售后列表";
	      		this.contentBreadCrumb.title2 = "订单详情";
	      	}else if(keys=='5'){
	      		this.contentBreadCrumb.path1 = "/store/orderManager/batchDelivery";
	      		this.contentBreadCrumb.title1 = "批量发货";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='6'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/releaseNewProducts";
	      		this.contentBreadCrumb.title1 = "发布新产品";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='7'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/releaseNewProducts";
	      		this.contentBreadCrumb.title1 = "发布新产品";
	      		this.contentBreadCrumb.title2 = "产品";
	      	}else if(keys=='8'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/productList";
	      		this.contentBreadCrumb.title1 = "产品列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='9'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/shemeProductList";
	      		this.contentBreadCrumb.title1 = "资源位列表";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='10'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/revenueRecord";
	      		this.contentBreadCrumb.title1 = "资金管理";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='11'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/revenueRecord";
	      		this.contentBreadCrumb.title1 = "资金管理";
	      		this.contentBreadCrumb.title2 = "保证金充值";
	      	}else if(keys=='12'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/revenueRecord";
	      		this.contentBreadCrumb.title1 = "资金管理";
	      		this.contentBreadCrumb.path2 = "/store/accountFund/recharge";
	      		this.contentBreadCrumb.title2 = "保证金充值";
	      	}else if(keys=='13'){
	      		this.contentBreadCrumb.path1 = "/store/accountFund/accountManager";
	      		this.contentBreadCrumb.title1 = "账户管理";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='14'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/storeInfo";
	      		this.contentBreadCrumb.title1 = "商家信息";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='15'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/IllegalInformation";
	      		this.contentBreadCrumb.title1 = "违规信息";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='16'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/passwordSecurity";
	      		this.contentBreadCrumb.title1 = "密码安全";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='17'){
	      		this.contentBreadCrumb.path1 = "/store/customerServiceSetting/messageSetting";
	      		this.contentBreadCrumb.title1 = "消息设置";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='18'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "营销活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='19'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "营销活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='20'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "营销活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='21'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "资源位活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='22'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "资源位活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='23'){
	      		this.contentBreadCrumb.path1 = "/home/marketing/marketing_active";
	      		this.contentBreadCrumb.title1 = "资源位活动";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='24'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/shopCoupons";
	      		this.contentBreadCrumb.title1 = "店铺优惠券";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='25'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/shopCoupons";
	      		this.contentBreadCrumb.title1 = "店铺优惠券";
	      		this.contentBreadCrumb.title2 = "店铺优惠券详情";
	      	}else if(keys=='26'){
	      		this.contentBreadCrumb.path1 = "/store/productManager/couponStatistics";
	      		this.contentBreadCrumb.title1 = "优惠券统计";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='27'){
	      		this.contentBreadCrumb.path1 = "/store/storeManager/thirdPartyTools";
	      		this.contentBreadCrumb.title1 = "第三方工具";
	      		this.contentBreadCrumb.title2 = "";
	      	}else if(keys=='28'){
	      		this.contentBreadCrumb.path1 = "/store/evaluateManager/evaluate";
	      		this.contentBreadCrumb.title1 = "评价管理";
	      		this.contentBreadCrumb.title2 = "";
	      	}
   }
 }
</script>

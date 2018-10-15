<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/coupon.less";
</style>
<template>
 <div class="business_listings">
	<!-- <breadcrumb :content="content_title"></breadcrumb> -->
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					优惠券统计
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>优惠券用户</span>
					<div class="width-120">
						<el-input size="small" v-model.trim="form.search_user_key" placeholder="优惠券用户"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券名称</span>
					<div class="width-120">
						<el-input size="small" v-model.trim="form.coupon_name" placeholder="优惠券名称"></el-input>
					</div>
				</div>
				<!-- <div class="search_content">
					<span>优惠券类型</span>
					<div class="width-120">
					  <el-select v-model="form.origin_type" placeholder="全部">
					    <el-option
					      v-for="item in couponTypeOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div> -->
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
					  <el-input size="small" v-model.trim="form.order_sn" placeholder="订单编号"></el-input>
					</div>
				</div>
				<div class="search_contents">
					<picker :title="titleLabelOne" @onPassByVal='getTime'></picker>
				</div>
				<div class="search_contents">
					<el-button size="small" type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">优惠券列表</div>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="nickname"
				      label="优惠券用户">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="优惠券名称">
				    </el-table-column>
				    <el-table-column
				      prop="origin_type"
				      label="优惠券类型">
				      <template slot-scope="scope">
				        <span v-if="scope.row.origin_type=='1'">平台优惠券</span>
				        <span v-if="scope.row.origin_type=='0'">商家优惠券</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="order_sn"
				      label="使用订单">
				    </el-table-column>
				    <el-table-column
				      prop="use_time"
				      label="使用时间">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_money"
				      label="优惠券金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="order_total_amount"
				      label="订单金额(元)">
				    </el-table-column>
				  </el-table>
				       <div class="pagination">
				        <el-pagination
				          @current-change="handleCurrentChange"
				          :current-page="currentPage"
				          :page-size = 'pageSize'
				          layout="total, prev, pager, next, jumper"
				          :total='totals'>
				        </el-pagination>
				      </div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
// import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import coupon from '../../js/coupon';
 export default {
   data () {
     return {
     	form:{
     		name:'',
     		coupon_status:'',
     		coupon_type:'',
     		use_start_time:'',
     		use_end_time:'',
     		add_start_time:'',
     		add_end_time:'',
     		store_id:'',
     	},
     	couponTypeOption:[
     		{
     			label:'平台',
     			value:'1'
     		},
     		{
     			label:'商家',
     			value:'2'
     		}
     	],
     	couponOption:[
     		{
     			label:'领取中',
     			value:'1'
     		},
     		{
     			label:'使用',
     			value:'2'
     		},
     		{
     			label:'已结束',
     			value:'3'
     		}
     	],
     	order_service:'',
     	titleLabelOne:'使用优惠券时间',
     	titleLabelTwo:'发放优惠券时间',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	tableData: [],
		content_title:{
			title1:"优惠券管理",
			title2:"优惠券列表"
		}
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('couponStatistics', function(id){
		    that.fetch();
		})
   },
   components: {
		picker
   },
   methods:{
   	fetch(){
		var data = {
			page:this.currentPage,
			rows:this.pageSize,
			search_user_key:this.form.search_user_key,
			coupon_name:this.form.coupon_name,
			origin_type:this.form.origin_type,
			store_name:this.form.store_name,
			order_sn:this.form.order_sn,
			use_time:this.form.use_time,
		}
		coupon.couponStatisticsList("Coupon/couponList",data,this);
		coupon.searchConf("Coupon/searchConf",data,this);
   	},
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.use_time = msg[0]+'/'+msg[1];
	        }else{
	   			this.form.use_time = '';
	        }
        }else{
	   			this.form.use_time = '';
        }
   	},
   	searchListData(){
		var data = {
			page:this.currentPage,
			rows:this.pageSize,
			search_user_key:this.form.search_user_key,
			coupon_name:this.form.coupon_name,
			origin_type:this.form.origin_type,
			store_name:this.form.store_name,
			order_sn:this.form.order_sn,
			use_time:this.form.use_time,
		}
		coupon.couponStatisticsList("Coupon/couponList",data,this);
   	},
   	addCoupon(){
   		this.$router.push({name:'coupon_list_detail'})
   	},
	editCoupon(id){
		this.$router.push({name:'coupon_list_detail',query:{coupon_id:id}})
	},
	deleteCoupon(id){
		var data = {
			id:id
		}
		coupon.delCoupon("Coupon/delCoupon",data,this);
	},
  handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize,
			search_user_key:this.form.search_user_key,
			coupon_name:this.form.coupon_name,
			origin_type:this.form.origin_type,
			store_name:this.form.store_name,
			order_sn:this.form.order_sn,
			use_time:this.form.use_time,
		}
		coupon.couponStatisticsList("Coupon/couponList",data,this);
  }
   }
 }
</script>

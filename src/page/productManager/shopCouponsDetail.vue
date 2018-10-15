<style lang="less" scoped>
// @import "../../less/config.less";
// @import "../../less/business_management/business_listings";
// @import "../../less/coupon/coupon";

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
					优惠券详情列表
				</span>
			</div>
			<div class="cash_statistics">
				<div class="cash_statistics_title">
					<span class="item name">优惠券名称：{{info.name}}</span>
					<span class="item type">优惠券类型：{{info.origin_type}}</span>
					<span class="item num">优惠券数量：{{info.createnum}}</span>
					<span class="item user">发券用户：{{info.store_name}}</span>
					<span class="item condit">使用条件：{{info.condition}}</span>
				</div>
				<div class="cash_statistics_chat">
					<ul class="chat">
						<li>
							<dl class="show_list">
								<dt><img src="../../img/coupon_amountto@2x.png" alt="" /></dt>
								<dd>
									<div class="cash">{{info.total_price}}</div>
									<div class="name">总计金额</div>
								</dd>
							</dl>
						</li>
						<li>
							<dl class="show_list">
								<dt><img src="../../img/coupon_make@2x.png" alt="" /></dt>
								<dd>
									<div class="cash">{{info.use_price}}</div>
									<div class="name">已用金额</div>
								</dd>
							</dl>
						</li>
						<li>
							<dl class="show_list">
								<dt><img src="../../img/coupon_amountto@2x.png" alt="" /></dt>
								<dd>
									<div class="cash">{{info.left_price}}</div>
									<div class="name">未用金额</div>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
			<div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">搜索</div>
				</div>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>领取用户</span>
					<div class="width-120">
						<el-input size="small" v-model.trim="form.uid" placeholder="领取用户"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券关联商家</span>
					<div class="width-120">
						<el-input size="small" v-model.trim="form.store_name" placeholder="优惠券关联商家"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>使用状态</span>
					<div class="width-120">
					  <el-select size="small" v-model.trim="form.coupon_status" placeholder="全部">
					    <el-option
					      v-for="item in couponOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
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
				      prop="coupon_money"
				      label="优惠券金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="uid"
				      label="领取用户">
				    </el-table-column>
				    <el-table-column
				      prop="send_time"
				      label="领取时间">
				    </el-table-column>
				    <el-table-column
				      prop="order_sn"
				      label="使用订单">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="订单关联商家">
				    </el-table-column>
				    <el-table-column
				      prop="use_time"
				      label="使用时间">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_status"
				      label="使用状态">
				    </el-table-column>
				    <!--<el-table-column
				      label="操作">
				      <template slot-scope="scope">

				      </template>
				    </el-table-column>-->
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
     	info:{
     		condition:'',
     		createnum:'',
     		left_price:'',
     		name:'',
     		origin_type:'',
     		store_name:'',
     		total_price:'',
     		use_price:'',
     	},
     	coupon_id:'',
     	form:{
     		store_id:'',
     		store_name:'',
     		send_time:'',
     		coupon_status:'',
     		order_sn:'',
     		coupon_name:'',
     		mobile:'',
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
			title1:"优惠券列表",
			title2:"优惠券详情列表"
		}
     }
   },
   created(){
   		this.coupon_id = this.$route.query.coupon_id;
		var data = {
			cid:this.coupon_id,
			page:this.currentPage,
			rows:this.pageSize,
			store_id:this.form.store_id,
			store_name:this.form.store_name,
			send_time:this.form.send_time,
			coupon_status:this.form.coupon_status,
			order_sn:this.form.order_sn,
			coupon_name:this.form.coupon_name,
			mobile:this.form.mobile,
		}
		coupon.countDetail("Coupon/countDetail",data,this);
		coupon.searchConf("Coupon/searchConf",data,this);
   },
   components: {
// breadcrumb,
picker
   },
   methods:{
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.send_time = msg[0]+'/'+msg[1];
	        }else{
	   			this.form.send_time = '';
	        }
        }else{
	   			this.form.send_time = '';
        }
   	},
   	getTimes(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.add_start_time = msg[0];
	   			this.form.add_end_time = msg[1];
	        }else{
	   			this.form.add_start_time = '';
	   			this.form.add_end_time = '';
	        }
        }else{
   			this.form.add_start_time = '';
   			this.form.add_end_time = '';
        }
   	},
   	searchListData(){
		var data = {
			cid:this.coupon_id,
			page:this.currentPage,
			rows:this.pageSize,
			store_id:this.form.store_id,
			store_name:this.form.store_name,
			send_time:this.form.send_time,
			coupon_status:this.form.coupon_status,
			order_sn:this.form.order_sn,
			coupon_name:this.form.coupon_name,
			mobile:this.form.mobile,
		}
		coupon.countDetail("Coupon/countDetail",data,this);
   	},
  handleCurrentChange(val) {
		var data = {
			cid:this.coupon_id,
			page:val,
			rows:this.pageSize,
			store_id:this.form.store_id,
			store_name:this.form.store_name,
			send_time:this.form.send_time,
			coupon_status:this.form.coupon_status,
			order_sn:this.form.order_sn,
			coupon_name:this.form.coupon_name,
			mobile:this.form.mobile,
		}
		coupon.countDetail("Coupon/countDetail",data,this);
  }
   }
 }
</script>

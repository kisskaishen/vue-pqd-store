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
					优惠券列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>优惠券名称</span>
					<div class="width-120">
						<el-input size="small" v-model.trim="form.name" placeholder="优惠券名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券领取条件</span>
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
				<div class="search_content">
					<span>优惠券类型</span>
					<div class="width-120">
					  <el-select size="small" v-model.trim="form.type" placeholder="全部">
					    <el-option
					      v-for="item in couponOptionType"
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
					<picker :title="titleLabelTwo" @onPassByVal='getTimes'></picker>
				</div>
				<div class="search_contents">
					<el-button size="small" type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">优惠券列表</div>
				</div>
				<div class="table_title_right"><el-button size="small" type="primary" @click="addCoupon()">+创建优惠券</el-button></div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="name"
				      label="优惠券名称">
				    </el-table-column>
				    <el-table-column
				      prop="type_name"
				      label="优惠券类型">
				    </el-table-column>
				    <el-table-column
				      prop="origin_type_name"
				      label="使用优惠券条件">
				    </el-table-column>
				    <el-table-column
				      prop="money"
				      label="优惠券金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="condition"
				      label="使用条件">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_status"
				      label="优惠券领用状态">
				    </el-table-column>
				    <el-table-column
				      prop="use_display_str"
				      label="发放|领取|使用">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="创建日期">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="发券用户">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				      	<div>
				        	<el-button type="text" size="small" @click="editCoupon(scope.row.id)">编辑</el-button>
				      	</div>
				      	<div>
				        	<el-button type="text" size="small" @click="detailCoupon(scope.row.id)">详情</el-button>
				      	</div>
				      	<div>
				        	<el-button type="text" size="small" @click="deleteCoupon(scope.row)">删除</el-button>
				      	</div>
				      </template>
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
        type:'',
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
     	couponOption:[],
     	couponOptionType:[],
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
	   	eventBus.$on('shopCoupons', function(id){
		    that.fetch();
		})
   },
   components: {
// breadcrumb,
picker
   },
   methods:{
   	fetch(){
		var data = {
			name:this.form.name,
			use_start_time:this.form.use_start_time,
      type:this.form.type,
			use_end_time:this.form.use_end_time,
			add_start_time:this.form.add_start_time,
			add_end_time:this.form.add_end_time,
			coupon_status:this.form.coupon_status,
			page:this.currentPage,
			rows:this.pageSize
		}
		coupon.couponList("Coupon/list",data,this);
		coupon.searchConf("Coupon/searchConf",data,this);
   	},
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.use_start_time = msg[0];
	   			this.form.use_end_time = msg[1];
	        }else{
	   			this.form.use_start_time = '';
	   			this.form.use_end_time = '';
	        }
        }else{
   			this.form.use_start_time = '';
   			this.form.use_end_time = '';
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
        this.fetch()
   	},
   	detailCoupon(id){
   		this.$router.push({name:'shopCouponsDetail',query:{coupon_id:id}})
   	},
   	addCoupon(){
   		this.$router.push({name:'couponListDetail'})
   	},
	editCoupon(id){
		this.$router.push({name:'couponListDetail',query:{coupon_id:id}})
	},
	deleteCoupon(params){
		var data = {
			id:params.id
		}
		coupon.delCoupon("Coupon/delCoupon",data,this,this.tableData,params);
	},
  handleCurrentChange(val) {
	var data = {
		page:val,
		rows:this.pageSize
	}
	coupon.couponList("Coupon/list",data,this);
  }
   }
 }
</script>

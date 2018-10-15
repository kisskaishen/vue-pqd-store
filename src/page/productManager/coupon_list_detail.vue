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
			<div class="search_admin_list_table_title" style="position:relative">
				<span>
					创建/编辑优惠券
				</span>
				<div id="btn_sends">
							<router-link :to="{path:root_back}">返回</router-link>
				</div>
			</div>
			<div class="coupon_detail">
				<div class="coupon_detail_content">
					<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券名称" prop="name">
								  <el-input size="small" :maxlength='10' v-model.trim="form.name"></el-input>
							  </el-form-item>
						  </div>
						  <div class="coupon_detail_left"><span class="explain">不超过10个中文字符，支持中文字母数字</span></div>
					  </div>
					  <div class="coupon_detail_warp">
						  <el-form-item label="使用优惠券类型">
    						<el-radio-group v-model="form.type" size="mini" v-if="coupon_id!=undefined">
							    <el-radio disabled class="radioMargin" label="0">通用优惠券</el-radio>
									<el-radio disabled class="radioMargin" label="1">推广优惠券</el-radio>
    						</el-radio-group>
      						<el-radio-group v-model="form.type" size="mini" v-else>
  							    <el-radio class="radioMargin" label="0">通用优惠券</el-radio>
  									<el-radio class="radioMargin" label="1">推广优惠券</el-radio>
      						</el-radio-group>
						  </el-form-item>
					  </div>
					  <div class="coupon_detail_warp">
						  <el-form-item label="使用优惠券条件" prop="typetags">
    						<el-radio-group @change="selectTypetags" v-model="form.typetags" size="mini">
							    <!-- <el-radio :disabled="typetagsAbled" class="radioMargin" v-model="form.typetags" label="1">限使用活动</el-radio> -->
								<el-radio :disabled="typetagsAbled" class="radioMargin" v-model="form.typetags" label="2">限使用商品</el-radio>
								<!-- <el-radio :disabled="typetagsAbled" class="radioMargin" v-model="form.typetags" label="4">限使用商家</el-radio> -->
								<!-- <el-radio :disabled="typetagsAbled" class="radioMargin" v-model="form.typetags" label="3">限使用类目</el-radio> -->
								<!-- <el-radio :disabled="typetagsAbled" class="radioMargin" v-model="form.typetags" label="5">平台通用券</el-radio> -->
								<el-radio :disabled="typetagsAbled" class="radioMargin" v-model="form.typetags" label="5">商家通用券</el-radio>
    						</el-radio-group>
						  </el-form-item>
					  </div>
					  <!--活动-->
					  <div class="coupon_detail_warp" v-show="limit_activity_data.length!=0">
						  	<div class="warp_action_all">
						  		<div class="single" v-for="(child,index) in limit_activity_data">
						  			{{child}}
						  			<div class="del" @click="deleteActive(child,index)">X</div>
						  		</div>
						  	</div>
					  </div>
					  <!--商品-->
					  <div class="coupon_detail_warp_category" v-show="form.limit_goods_data.length!=0">
					  	  	  <el-table
							    ref="multipleTable"
							    :data="form.limit_goods_data"
									row-key="goods_id"
							    tooltip-effect="dark"
							    style="width: 100%">
							    <el-table-column
							      prop="goods_id"
							      label="商品ID"
							      width="70">
							    </el-table-column>
							    <el-table-column
							      prop="goods_name"
							      label="商品名称"
							      width="240">
							    </el-table-column>
							    <el-table-column
							      prop="store_name"
							      label="商家名称">
							    </el-table-column>
							    <el-table-column
							      prop="cate_name"
							      label="分类名称">
							    </el-table-column>
							    <el-table-column
							      prop="shop_price"
							      label="单买价格(元)"
							      width="70">
							    </el-table-column>
							    <el-table-column
							      prop="prom_price"
							      label="团购价格(元)"
							      width="70">
							    </el-table-column>
							    <el-table-column
							      prop="store_count"
							      label="商品库存"
							      width="70">
							    </el-table-column>
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
							        <el-button type="text" size="small" @click="deleteCategory(scope.row,scope.$index,'goods')">删除</el-button>
							      </template>
							    </el-table-column>
							  </el-table>
					  </div>
					  <!--商家-->
					  <div class="coupon_detail_warp_category" v-show="form.limit_store_data.length!=0">
					  	  	  <el-table
							    ref="multipleTable"
							    :data="form.limit_store_data"
							    tooltip-effect="dark"
							    style="width: 100%">
							    <el-table-column
							      prop="id"
							      label="商家ID"
							      width="70">
							    </el-table-column>
							    <el-table-column
							      prop="store_name"
							      label="商家名称"
							      width="240">
							    </el-table-column>
							    <el-table-column
							      prop="store_from"
							      label="商家类型">
							    </el-table-column>
							    <el-table-column
							      prop="store_type"
							      label="门店类型">
							    </el-table-column>
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
							        <el-button type="text" size="small" @click="deleteCategory(scope.row,scope.$index,'store')">删除</el-button>
							      </template>
							    </el-table-column>
							  </el-table>
					  </div>
					  <!--类目-->
					  <div class="coupon_detail_warp_category" v-show="form.limit_category_data.length!=0">
					  	  	  <el-table
							    ref="multipleTable"
							    :data="form.limit_category_data"
							    tooltip-effect="dark"
							    style="width: 100%">
							    <el-table-column
							      prop="name"
							      label="类目名称">
							    </el-table-column>
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
							        <el-button type="text" size="small" @click="deleteCategory(scope.row,scope.$index,'category')">删除</el-button>
							      </template>
							    </el-table-column>
							  </el-table>
					  </div>
					  <!--以上-->
					  <div class="coupon_detail_warp" v-show="isShow">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="">
							  	<el-button size="small" @click="selectGood()">+添加</el-button>
							  </el-form-item>
						  </div>
					  </div>
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
					  	  	<el-form-item label="优惠券面额" prop="money">
							    <el-input size="small" :maxlength="6" v-model.trim="form.money"></el-input>
							  </el-form-item>
						  </div>
						  <div class="coupon_detail_left"><span class="explain">优惠券面额范围为0.01-999.00</span></div>
					  </div>
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券使用额度"  prop="condition">
							  	<div class="coupon_input_warp">
								  <span class="coupon_input_warp_left">满</span>
									  <div class="coupon_input_warp_left text_coupon_input">
									  	<el-input size="small" :maxlength="6" v-model.trim="form.condition" auto-complete="off"></el-input>
									  </div>
								  <span class="coupon_input_warp_left">元</span>
							  	</div>
							  </el-form-item>
						  </div>
						  <div class="coupon_detail_left"><span class="explain">满0.01元即可</span></div>
					  </div>
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券有效期" prop="expired_type">
							  	<div class="coupon_input_warp">
								  <el-select size="small" v-model="form.expired_type" placeholder="请选择">
								    <el-option
								      v-for="item in typetagsOptions"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							  	</div>
							  </el-form-item>
						  </div>
					  </div>
					  <div class="coupon_detail_warp" v-show="form.expired_type=='2'">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券使用时间">
								  <picker :sTime = 'form.use_time.start' :eTime = "form.use_time.end" @onPassByVal='getTime'></picker>
							  </el-form-item>
						  </div>
					  </div>
					  <div class="coupon_detail_warp" v-show="form.expired_type=='1'">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item>
							  	<div class="coupon_input_warp">
								  <!--<span class="coupon_input_warp_left"></span>-->
									  <div class="coupon_input_warp_lefts text_coupon_input">
											<input type="text" :maxlength="3" class="self_input_valiate" v-model.number="form.expirationday" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
									  	<!-- <el-input v-model="form.expirationday"></el-input> -->
									  </div>
								  <span class="coupon_input_warp_left">天</span>
							  	</div>
							  </el-form-item>
						  </div>
						  <div class="coupon_detail_left"><span class="explain">从用户领用日开始计算时间</span></div>
					  </div>
					  <!-- <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券类型" prop="origin_type">
							  	<div class="coupon_input_warp">
								  <el-select v-model="form.origin_type" placeholder="请选择">
								    <el-option
								      v-for="item in originTypeOptions"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							  	</div>
							  </el-form-item>
						  </div>
					  </div>		 -->
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券发放数量" prop="createnum" >
							  	<div class="coupon_input_warp">
								  <!--<span class="coupon_input_warp_left"></span>-->
									  <div class="coupon_input_warp_lefts text_coupon_input">
											<input type="text" :maxlength="8" class="self_input_valiate" v-model.number="form.createnum" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
									  	<!-- <el-input :maxlength='8' v-model="form.createnum"></el-input> -->
									  </div>
								  <span class="coupon_input_warp_left">张</span>
							  	</div>
							  </el-form-item>
						  </div>
						  <div class="coupon_detail_left"><span class="explain">优惠券发放数量范围最高不超过99999999张</span></div>
					  </div>
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券限领数量" prop="limit_take">
							  	<div class="coupon_input_warp">
								  <!--<span class="coupon_input_warp_left"></span>-->
									  <div class="coupon_input_warp_lefts text_coupon_input">
											<input type="text" :maxlength="1" class="self_input_valiate" v-model.number="form.limit_take" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
									  	<!-- <el-input  :maxlength='1' v-model="form.limit_take"></el-input> -->
									  </div>
								  <span class="coupon_input_warp_left">张</span>
							  	</div>
							  </el-form-item>
						  </div>
						  <div class="coupon_detail_left"><span class="explain">优惠券限领数量范围为1-5张</span></div>
					  </div>
					  <div class="coupon_detail_warp">
					  	  <div class="coupon_detail_left coupon_input">
							  <el-form-item label="优惠券领用时间">
								  <picker :sTime = 'form.send_time.start' :eTime = "form.send_time.end" @onPassByVal='getTimes'></picker>
							  </el-form-item>
						  </div>
					  </div>
	  				  	<div class="coupon_detail_warp">
		  				  <el-form-item>
		  				  		<el-button size="small" type="primary" @click="submitForm('form')">立即创建</el-button>
						  </el-form-item>
					  </div>
					</el-form>
				</div>
			</div>
		</div>
	</div>
<el-dialog width="80%" title="添加可使用的活动" :visible.sync="dialogTableVisibleActive">
  <div class="coupon_action">
  	  <div class="coupon_action_title">
	    <el-radio-group @change="selectAcion" v-model="form.limit_activity_ids" size="small">
	      <el-radio label="1" border>营销活动</el-radio>
	      <el-radio label="2" border>节日活动</el-radio>
	    </el-radio-group>
	  </div>
	  <div class="coupon_action_content">
	  	   <el-checkbox-group v-model="activeArr" @change="handleCheckedCitiesChange">
		    <el-checkbox v-for="item in actionoption" :key="item" :label="item"></el-checkbox>
		  </el-checkbox-group>
	  </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogTableVisibleActive = false">取 消</el-button>
    <el-button size="small" type="primary" @click="selectGoods('active')">确 定</el-button>
  </div>
</el-dialog>
<!--添加可使用的商品-->
<el-dialog width="80%" title="添加可使用的商品" :visible.sync="dialogTableVisible">
  <el-form :model="form" class="search_admin_list_table">
	<div class="search_btn">
		<div class="search_content">
			<span>商品ID</span>
			<div class="width-120">
				<el-input v-model.trim="searchForm.goods_id" placeholder="商品ID"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>商品名称</span>
			<div class="width-120">
				<el-input v-model.trim="searchForm.goods_name" placeholder="商品名称"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>商家名称</span>
			<div class="width-120">
				<el-input v-model.trim="searchForm.store_name" placeholder="商家名称"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>分类名称</span>
			<div class="width-120">
				<el-input v-model.trim="searchForm.cate_name" placeholder="分类名称"></el-input>
			</div>
		</div>
		<div class="search_contents">
			<el-button size="small" type="primary" @click="searchListData('goods')">查询</el-button>
		</div>
	</div>
  </el-form>
  <div class="dialog_table">
  	  <el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="60">
	    </el-table-column>
	    <el-table-column
	      prop="goods_id"
	      label="商品ID"
	      width="70">
	    </el-table-column>
	    <el-table-column
	      prop="goods_name"
	      label="商品名称"
	      width="300">
	    </el-table-column>
	    <el-table-column
	      prop="store_name"
	      label="商家名称">
	    </el-table-column>
	    <el-table-column
	      prop="cate_name"
	      label="分类名称">
	    </el-table-column>
	    <el-table-column
	      prop="shop_price"
	      label="单买价格(元)">
	    </el-table-column>
	    <el-table-column
	      prop="prom_price"
	      label="团购价格(元)">
	    </el-table-column>
	    <el-table-column
	      prop="store_count"
	      label="商品库存">
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
  <div slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="selectGoods('goods')">确 定</el-button>
  </div>
</el-dialog>
<!--添加可使用的商家-->
<el-dialog width="80%" title="添加可使用的商家" :visible.sync="dialogTableVisibleStore">
  <el-form :model="form" class="search_admin_list_table">
	<div class="search_btn">
		<div class="search_content">
			<span>商家ID</span>
			<div class="width-120">
				<el-input v-model.trim="searchForm.store_id" placeholder="商品ID"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>商家名称</span>
			<div class="width-120">
				<el-input v-model.trim="searchForm.store_name" placeholder="商品名称"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>商家类型</span>
			<div class="width-120">
			  <el-select v-model.trim="searchForm.store_from" placeholder="全部">
			    <el-option
			      v-for="item in store_fromOption"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
		</div>
		<div class="search_content">
			<span>门店类型</span>
			<div class="width-120">
			  <el-select v-model.trim="searchForm.store_type" placeholder="全部">
			    <el-option
			      v-for="item in store_typeOption"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
		</div>
		<div class="search_contents">
			<el-button type="primary" @click="searchListData('store')">查询</el-button>
		</div>
	</div>
  </el-form>
  <div class="dialog_table">
  	  <el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="30">
	    </el-table-column>
	    <el-table-column
	      prop="store_id"
	      label="商家ID"
	      width="70">
	    </el-table-column>
	    <el-table-column
	      prop="store_name"
	      label="商家名称"
	      width="300">
	    </el-table-column>
	    <el-table-column
	      prop="store_from_name"
	      label="商家类型">
	    </el-table-column>
	    <el-table-column
	      prop="store_name"
	      label="门店名称">
	    </el-table-column>
	  </el-table>
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChangeStore"
          :current-page="currentPage"
          :page-size = 'pageSize'
          layout="total, prev, pager, next, jumper"
          :total='totals'>
        </el-pagination>
      </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisibleStore = false">取 消</el-button>
    <el-button type="primary" @click="selectGoods('store')">确 定</el-button>
  </div>
</el-dialog>
<!--可使用类目-->
<el-dialog width="80%" title="添加可使用的类目" :visible.sync="dialogCategory">
  <div class="dialog_table">
  	  <el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="类目名称">
	    </el-table-column>
	  </el-table>
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChangeCategory"
          :current-page="currentPage"
          :page-size = 'pageSize'
          layout="total, prev, pager, next, jumper"
          :total='totals'>
        </el-pagination>
      </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogCategory = false">取 消</el-button>
    <el-button type="primary" @click="selectGoods('category')">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
// import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import coupon from '../../js/coupon';
 export default {
   data () {
   	var checkMoney = (rules, value, callback) => {
	        if (!value) {
	          return callback(new Error('优惠券面额不能为空'));
	        }
          if (isNaN(value)) {
          	this.form.money = parseInt(this.form.money);
          	if(isNaN(this.form.money)){
          		this.form.money = '';
          	}
            callback(new Error('请输入数字值'));
          } else {
          	value = value+'';
          	if(value.indexOf(".") != -1 && value.substring(value.indexOf("."),value.length).length>3){
          		callback(new Error('只能输入小数点后两位'));
          	}else{
	            if (value < 0.01) {
	              callback(new Error('必须大于0.01'));
	            } else if(value > 999) {
	              callback(new Error('必须小于999'));
	            }else{
	              callback();
	            }
          	}
          }
      };
      var checkCondition = (rules, value, callback) => {
	        if (!value&&value!=0) {
	          return callback(new Error('优惠券使用额度不能为空'));
	        }
          if (isNaN(value)) {
          	this.form.money = parseInt(this.form.money);
          	if(isNaN(this.form.money)){
          		this.form.money = '';
          	}
            callback(new Error('请输入数字值'));
          } else {
            if (value <= 0) {
              callback(new Error('优惠券使用额度必须大于0'));
            }else{
              callback();
            }
          }
      };
     return {
			 root_back:'',
     	seveActiveList:[],//保存所有待选择活动列表  确定
     	limit_activity_data_arr:[],//保存编辑活动  所有节目对象集合
     	limit_activity_data:[],//页面显示活动
		actionoption:[],//所有节目name集合
     	store_typeOption:[],
     	store_fromOption:[],
     	couponOption:[],
     	isShow:true,
     	typetagsAbled:false,
     	deleteId:[],//删除活动id集合
     	arrAll:[],//总的活动
     	arrAllActive:[],
     	saveactiveArr:[],//保存活动
     	activeArr:[],//活动
     	originTypeOptions:[
     		{
     			label:'商家优惠券 ',
     			value:'0'
     		},
     		{
     			label:'平台优惠券',
     			value:'1'
     		},
     	],
     	typetagsOptions:[
     		{
     			label:'按天计算',
     			value:'1'
     		},
     		{
     			label:'按有效日期计算',
     			value:'2'
     		},
     	],
     	currentPage:1,
		totals:0,
		pageSize:5,
     	tableData:[],
     	multipleSelection: [],
     	dialogTableVisibleActive:false,//活动
     	dialogTableVisible:false,//商品
     	dialogCategory:false,//类目
     	dialogTableVisibleStore:false,//商家
        rules: {
       		typetags:[
            { required: true, message: '请选择使用条件', trigger: 'change' }
          ],
         		typeCoupon:[
              { required: true, message: '请选择使用类型', trigger: 'change' }
            ],
          expired_type:[
            { required: true, message: '请选择优惠券类型', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          ],
          origin_type: [
            { required: true, message: '请选择优惠券条件', trigger: 'change' }
          ],
          money: [
            { validator: checkMoney, trigger: 'blur' }
          ],
          condition: [
			{ validator: checkCondition, trigger: 'blur' }
          ],
          expirationday: [
            { required: true, message: '请输入优惠券有效期', trigger: 'blur' },
          ],
          createnum: [
            { required: true, message: '请输入发放数量', trigger: 'blur' },
          ],
          limit_take: [
            { required: true, message: '请输入限领数量', trigger: 'blur' },
          ],
          picker: [
            { type: 'date', required: true, message: '请选择领用优惠券日期', trigger: 'change' }
          ],
        },
        searchForm:{

        },
     	form:{
     		goods_id:'',
     		goods_name:'',
     		store_id:'',
     		store_name:'',
     		send_time:{
     			start:'',
     			end:''
     		},
     		use_time:{
     			start:'',
     			end:''
     		},
     		store_id:'',
     		store_name:'',
     		store_from:'',
     		store_type:'',
     		typeId:'',
     		cid:'',
     		submitActiveId:[],//活动id
     		submitCategoryId:[],//类目id
     		checkAction:["女神节"],
     		couponActive:'1',
     		id:'',
     		name:'',
     		money:0,
     		condition:'',
     		createnum:'',
     		origin_type:'2',
     		typetags:'2',
        type:"0",
     		limit_activity_ids:'2',
     		limit_activity_data:[],
     		limit_goods_id:'',
     		limit_goods_data:[],
     		limit_category_ids:'',
     		limit_category_data:[],
     		limit_store_ids:'',
     		limit_store_data:[],
     		expired_type:'1',
     		expirationday:'',
     		use_start_time:'',
     		use_end_time:'',
     		send_start_time:'',
     		send_end_time:'',
     		limit_take:'',
     	},
  		content_title:{
  			title1:"优惠券管理",
  			title2:"优惠券列表"
  		},
  		coupon_id:'',
       }
   },
   created(){
   		this.coupon_id = this.$route.query.coupon_id;
   		if(this.coupon_id){
					this.typetagsAbled = true;
					var data = {
						id:this.coupon_id,
					}
				coupon.couponListDetail("Coupon/info",data,this);
   		}
					this.root_back = "/store/productManager/shopCoupons";
		coupon.searchConf("Coupon/searchConf",data,this);
   },
   components: {
	// breadcrumb,
	picker
   },
   methods:{
   	onkeyups(val){
   		var str = val;
		str = str.substring(0,val.length-1);
		return this.form.money
   	},
   	checkNum(val){
   	},
   	deleteActive(child,index){
   		this.limit_activity_data.splice(index,1);
   	},
   	handleCheckedCitiesChange(val){
   		this.seveActiveList = val;
   	},
   	selectGoods(type){
			 var self = this;
   		if(type=='active'){
   			this.seveActiveList.forEach(function(row,index){
   				if(self.limit_activity_data.indexOf(row)==-1){
   					self.limit_activity_data.push(row)
   				}
   			})
   			this.dialogTableVisibleActive = false;
   		}else if(type=='category'){
	   		/* 类目*/
	   		this.multipleSelection.forEach(function(row,index){
	   			self.form.limit_category_data.push(row)
	   		})
	   		this.dialogCategory = false;
   		}else if(type=='goods'){
	   		this.multipleSelection.forEach(function(row,index){
	   			self.form.limit_goods_data.push(row)
	   		})
	   		this.dialogTableVisible = false;
   		}else if(type=='store'){
	   		this.multipleSelection.forEach(function(row,index){
	   			self.form.limit_store_data.push(row)
	   		})
	   		this.dialogTableVisibleStore = false;
   		}
   	},
   	selectAcion(){
   		var self = this;
			var selected_id_arr = [];
   			this.limit_activity_data_arr.forEach(function(row,index){
	   			self.limit_activity_data.forEach(function(rows,indexs){
	   				if(row.activity_name==rows){
	   					selected_id_arr.push(row.activity_id);
	   				}
	   			})
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
	   			activity_type:this.form.limit_activity_ids,
				page:this.currentPage,
				rows:this.pageSize,
				selected_ids:selected_id,
	   		}
   			coupon.getNotAddedActivityList("coupon/getNotAddedActivityList",data,this);
   	},
   	selectGood(){
		var self = this;
			 this.form.typeId = this.form.typetags;
   		if(this.form.typeId==''){
   			this.$message({
   				type:'info',
   				message:'请先选择优惠券条件'
   			})
   			return
   		}
   		if(this.form.typeId=='1'){
   			/* active */
   			this.dialogTableVisibleActive = true;
			var selected_id_arr = [];
   			this.limit_activity_data_arr.forEach(function(row,index){
	   			self.limit_activity_data.forEach(function(rows,indexs){
	   				if(row.activity_name==rows){
	   					selected_id_arr.push(row.activity_id);
	   				}
	   			})
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
	   			activity_type:this.form.limit_activity_ids,
				page:this.currentPage,
				rows:this.pageSize,
				selected_ids:selected_id,
	   		}
   			coupon.getNotAddedActivityList("coupon/getNotAddedActivityList",data,this);
   		}else if(this.form.typeId=='2'){
   			/* goods */
   			this.dialogTableVisible = true;
			var selected_id_arr = [];
   			this.form.limit_goods_data.forEach(function(row,index){
   				selected_id_arr.push(row.goods_id);
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
				page:this.currentPage,
				rows:this.pageSize,
				selected_ids:selected_id,
	   		}
   			coupon.getNotAddedGoodsList("coupon/getNotAddedGoodsList",data,this);
   		}else if(this.form.typeId=='4'){
   			/* store */
   			this.dialogTableVisibleStore = true;
			var selected_id_arr = [];
   			this.form.limit_store_data.forEach(function(row,index){
   				selected_id_arr.push(row.id);
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
	   			store_name:this.form.store_name,
	   			store_from:this.form.store_from,
	   			store_type:this.form.store_type,
				selected_ids:selected_id,
				page:this.currentPage,
				rows:this.pageSize
	   		}
   			coupon.getNotAddedStoreList("coupon/getNotAddedStoreList",data,this);
   		}else if(this.form.typeId=='3'){
   			/* category */
   			this.dialogCategory = true;
			var selected_id_arr = [];
   			this.form.limit_category_data.forEach(function(row,index){
   				selected_id_arr.push(row.id);
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
				selected_ids:selected_id,
				page:this.currentPage,
				rows:this.pageSize
	   		}
   			coupon.getNotAddedCategoryList("coupon/getNotAddedCategoryList",data,this);
   		}
   	},
   	searchListData(names){
   		if(names=='store'){
	   		var data = {
				cid:this.coupon_id,
	   			store_id:this.searchForm.store_id,
	   			store_name:this.searchForm.store_name,
	   			store_from:this.searchForm.store_from,
	   			store_type:this.searchForm.store_type,
				page:this.currentPage,
				rows:this.pageSize
	   		}
   			coupon.getNotAddedStoreList("coupon/getNotAddedStoreList",data,this);
   		}else if(names=='goods'){

	   		var data = {
				cid:this.coupon_id,
				page:this.currentPage,
				rows:this.pageSize,
				goods_id:this.searchForm.goods_id,
				goods_name:this.searchForm.goods_name,
				store_id:this.searchForm.store_id,
				store_name:this.searchForm.store_name,
				cate_name:this.searchForm.cate_name,
	   		}
   			coupon.getNotAddedGoodsList("coupon/getNotAddedGoodsList",data,this);
   		}
   	},
   	selectTypetags(label){
   		if(label=='5'){
   			this.isShow = false;
   		}else{
   			this.isShow = true;
   		}
   		this.form.limit_category_data = [];
   		this.form.limit_goods_data = [];
   		this.form.limit_store_data = [];
   		this.limit_activity_data = [];
   		this.deleteId = [];
   	},
   	deleteCategory(row,index,type){
   		/* 删除类目 */
   		if(type=='category'){
			this.form.limit_category_data.splice(index,1);
			this.deleteId.push(row.id);
   		}else if(type=='goods'){
			this.form.limit_goods_data.splice(index,1);
			this.deleteId.push(row.id);
   		}else if(type=='store'){
   			this.form.limit_store_data.splice(index,1);
			this.deleteId.push(row.id);
   		}
   	},
   	handleSelectionChangeSelectCategory(){
   		/* 已选类目check*/
   	},
   	handleCurrentChangeSelectCategory(){
   		/* 已选类目check分页*/
   	},
   	selectCategory(){
   		/* 类目*/
   		var self = this;
   	},
   	selectActionArr(){
   		if(len=='0'){
   			this.$message({
   				type:'success',
   				message:'请先选择活动'
   			})
   			return
   		}else{
   			this.dialogTableVisibleActive = false;
   		}
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
	   			this.form.send_start_time = msg[0];
	   			this.form.send_end_time = msg[1];
	        }else{
	   			this.form.send_start_time = '';
	   			this.form.send_end_time = '';
	        }
        }else{
   			this.form.send_start_time = '';
	   			this.form.send_end_time = '';
        }
   	},
   	submitForm(formName){
   			var self = this;
   		this.$refs[formName].validate((valid) => {
          if (valid) {
			if(this.form.typetags=='1'){
	          	/*获取活动ID*/
		   		this.form.submitActiveId = [];
		        let obj = {};
		        var len = self.limit_activity_data;
				for(var i=0;i<len.length;i++){
					var name = len[i];
		          obj = self.limit_activity_data_arr.find((item)=>{
		              return item.activity_name === name;
		          });
		          if(obj){
		          	self.form.submitActiveId.push(obj.activity_id)
		          }
				}
				self.form.limit_activity_ids = self.form.submitActiveId.join(',');
				this.form.limit_category_ids = '';
				this.form.limit_goods_id = '';
				this.form.limit_store_ids = '';
			}else if(this.form.typetags=='3'){
				/*获取类目id*/
				self.form.submitCategoryId = [];
				this.form.limit_category_data.forEach(function(row,index){
					self.form.submitCategoryId.push(row.id)
				})
				this.form.limit_category_ids = this.form.submitCategoryId.join(',');
				this.form.limit_activity_ids = '';
				this.form.limit_goods_id = '';
				this.form.limit_store_ids = '';
			}else if(this.form.typetags=='2'){
				self.form.submitCategoryId = [];
				this.form.limit_goods_data.forEach(function(row,index){
					self.form.submitCategoryId.push(row.goods_id)
				})
				this.form.limit_goods_id = this.form.submitCategoryId.join(',');
				this.form.limit_activity_ids = '';
				this.form.limit_store_ids = '';
				this.form.limit_category_ids = '';
			}else if(this.form.typetags=='4'){
				self.form.submitCategoryId = [];
				this.form.limit_store_data.forEach(function(row,index){
					self.form.submitCategoryId.push(row.id)
				})
				this.form.limit_store_ids = this.form.submitCategoryId.join(',');
				this.form.limit_activity_ids = '';
				this.form.limit_goods_id = '';
				this.form.limit_category_ids = '';
			}else if(this.form.typetags=='5'){
				this.form.limit_store_ids =  '';
				this.form.limit_activity_ids = '';
				this.form.limit_goods_id = '';
				this.form.limit_category_ids = '';
			}else if(this.form.typetags=='6'){
				this.form.limit_store_ids =  '';
				this.form.limit_activity_ids = '';
				this.form.limit_goods_id = '';
				this.form.limit_category_ids = '';
			}
			if(this.form.condition!=0&&this.form.condition-this.form.money<0){
				this.$message({
					type:'info',
					message:'优惠券面额必须小于优惠券使用额度'
				})
				return
			}
			if(this.form.expired_type=='1'){
				if(this.form.expirationday==''){
					this.$message({
						type:'info',
						message:'请输入优惠券有效期天数'
					})
					return
				}
			}else if(this.form.expired_type=='2'){
				if(this.form.use_start_time==''){
					this.$message({
						type:'info',
						message:'请选择优惠券使用时间'
					})
					return
				}
			}
            var data = {
				id:this.coupon_id,
            	name:this.form.name,
            	money:this.form.money,
            	condition:this.form.condition,
            	createnum:this.form.createnum,
            	origin_type:this.form.origin_type,
            	typetags:this.form.typetags,
            	type:this.form.type,
            	limit_activity_ids:this.form.limit_activity_ids,
            	limit_goods_id:this.form.limit_goods_id,
            	limit_category_ids:this.form.limit_category_ids,
            	limit_store_ids:this.form.limit_store_ids,
            	expired_type:this.form.expired_type,
            	expirationday:this.form.expirationday,
            	use_start_time:this.form.use_start_time,
            	use_end_time:this.form.use_end_time,
            	send_start_time:this.form.send_start_time,
            	send_end_time:this.form.send_end_time,
            	limit_take:this.form.limit_take,
						}

            coupon.handleCoupon("Coupon/handleCoupon",data,this);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   	},
   	toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
			var selected_id_arr = [];
   			this.form.limit_goods_data.forEach(function(row,index){
   				selected_id_arr.push(row.goods_id);
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
				page:val,
				rows:this.pageSize,
				selected_ids:selected_id,
	   		}
   			coupon.getNotAddedGoodsList("coupon/getNotAddedGoodsList",data,this);
      },
      handleCurrentChangeStore(val){
			var selected_id_arr = [];
   			this.form.limit_store_data.forEach(function(row,index){
   				selected_id_arr.push(row.id);
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
	   			store_name:this.form.store_name,
	   			store_from:this.form.store_from,
	   			store_type:this.form.store_type,
				selected_ids:selected_id,
				page:val,
				rows:this.pageSize
	   		}
   			coupon.getNotAddedStoreList("coupon/getNotAddedStoreList",data,this);
      },
      handleCurrentChangeCategory(val){
			var selected_id_arr = [];
   			this.form.limit_category_data.forEach(function(row,index){
   				selected_id_arr.push(row.id);
   			})
			var selected_id = selected_id_arr.join(',');
	   		var data = {
				cid:this.coupon_id,
				selected_ids:selected_id,
				page:val,
				rows:this.pageSize
	   		}
   			coupon.getNotAddedCategoryList("coupon/getNotAddedCategoryList",data,this);
      }
   }
 }
</script>

<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/revenueRecord.less";
</style>
<template>
    <div class="order_record">
     <div class="main"> 
        <div class="search-input">
            <div class="leftLable">交易状态：</div><div class="rightLable">
                 <el-select size="small" v-model="refundForm.trading_status" placeholder="请选择">
                    <el-option
                    v-for="item in optionsReturn"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>       
        <div class="search-input">
            <div class="leftLable">交易用户：</div><div class="rightLable"><el-input size="small" v-model="refundForm.store_name" placeholder=""></el-input></div>
        </div>      
        <div class="search-input">
            <div class="leftLable">退款编号：</div><div class="rightLable"><el-input size="small" v-model="refundForm.return_sn" placeholder=""></el-input></div>
        </div>
        <!--<picker title="日期：" :sTime="sTime"  :eTime="eTime" @onPassByVal='getTimes'></picker>--> 
        <datepick title="日期：" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTimes'></datepick>
        <div class="clickButtonMargin">     
            <el-button size="small" type="primary" @click = "searchQueryShopCoupons()">查询</el-button>
        </div>
		<div class="account_cash" style="color:red">
			注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
		</div>
        <div class="list">
                     <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="return_sn"
            label="退款编号">
            </el-table-column>
            <el-table-column
            prop="order_sn"
            label="订单编号">
            </el-table-column>
            <el-table-column
            prop="serial_number"
            label="流水号">
            </el-table-column>
            <el-table-column
            prop="trading_type"
            label="交易类型">
            </el-table-column>
            <el-table-column
            prop="merchant_id"
            label="商家ID">
            </el-table-column>
            <el-table-column
            prop="merchant_name"
            label="交易商家">
            </el-table-column>
            <el-table-column
            prop="pay_name"
            label="交易方式">
            </el-table-column>
            <el-table-column
            prop="return_money"
            label="退款金额(元)">
            </el-table-column>
            <el-table-column
            prop="pqd_coupon_price"
            label="优惠金额(元)">
            </el-table-column>
            <el-table-column
            prop="trading_status"
            label="交易状态">
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="创建时间">
            </el-table-column> 
            <el-table-column
            prop="update_time"
            label="退款时间">
            </el-table-column>    
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="searchList(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
        </div>
     </div>
<el-dialog
  title="退款详情"
  :visible.sync="dialogVisibleRefund"
  width="90%">
<div class="list_info">
	<div class="list_info_item">
		<div class="title">店铺信息</div>
		<div class="content">
			<span>店铺名称： {{storeInfo.store_name}}</span>
			<span>店铺联系人：{{storeInfo.show_ower_name}}</span>
			<span>店铺联系电话：{{storeInfo.show_ower_mobile}}</span>
		</div>
	</div>
	<div class="list_info_item">
		<div class="title">订单信息</div>
		<div class="content">
			<span>退款编号： {{orderInfo.order_sn}}</span>
			<span>退款时间： {{orderInfo.add_time}}</span>
			<span>退款方式： {{orderInfo.pay_name}}</span>
		</div>
	</div>
	<div class="order_detail_table">
		<div class="current_system">
			<div class="warp">
				<table class="show_list_table" border="0" cellspacing="" cellpadding="">
					<thead>
						<tr>
							<th style="width:200px;text-align:center">商品名称：</th>
							<th>规格属性：</th>
							<th>商品单价(元)：</th>
							<th>数量：</th>
							<th>优惠：</th>
							<th>类型：</th>
							<th>订单状态：</th>
							<th>商品总价(元)：</th>
						</tr>
                    </thead>
                    <tbody>
						<tr>
							<td>{{goodsInfo.goods_name}}</td>
							<td>{{goodsInfo.spec_key_name}}</td>
							<td>{{goodsInfo.goods_price}}</td>
							<td>{{goodsInfo.goods_num}}</td>
							<td>{{goodsInfo.coupon_price}}</td>
							<td>{{goodsInfo.order_type}}</td>
							<td>{{goodsInfo.order_service}}</td>
							<td>{{goodsInfo.total_amount}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="list_info_item" v-show="logisticInfo.length!=0" v-for="item in logisticInfo">
		<div class="title">物流信息</div>
		<div class="content">
			<span>物流单号：{{item.logistics_order_sn}}</span>
		</div>
		<div class="content">
			<span>物流公司：{{item.logistics_name}}</span>
		</div>
		<div class="content">
			<span>收货人：{{item.consignee}}（{{item.mobile}}）</span>
		</div>
		<div class="content">
			<span>物流地址：{{item.address}}</span>
		</div>
	</div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisibleRefund = false">取 消</el-button>
    <el-button size="small" type="primary" @click="dialogVisibleRefund = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import account from '../../../js/account';
import picker from '../../../components/picker';
import datepick from '../../../components/datepick.vue';
    export default{
        data(){
            return {
            	sTime:'',
            	eTime:'',
                dialogVisibleRefund:false,
                coupon_status:'',
                goodsInfo:{},
                logisticInfo:{},
                orderInfo:{},
                storeInfo:{},
                tableData:[],
                statistics:{},
                currentPage:1,
                pageSize:10,
                total:0,
                optionsReturn:[],
                refundForm:{
                    trading_status: '',
                    store_name:'',
                    store_id: '',
                    pay_type: '',
                    serial_number:'',
                    order_sn: '',
                    return_Sn:'',
                    start_time: '',
                    stop_time: '',
                    is_export: '',
                },
                is_export:'',
            }
        },
        created(){
			this.setTime();
			this.fetch();
            account.returnStatus('Fundmanagement/returnStatus',this);
        },
        components:{
            picker,datepick
        },
        methods:{
        	fetch(val){
        		var str = this.refundForm.start_time;
        		var stramp = new Date(str).getTime();
        		var str1 = this.refundForm.stop_time;
        		var stramp1 = new Date(str1).getTime();
        		if(stramp1-stramp>180*24*60*60*1000){
        			this.$message({
        				type:'info',
        				message:'查询范围为180天之内'
        			})
        			return 
        		}else if(stramp1-stramp<0){
        			this.$message({
        				type:'info',
        				message:'截止时间不能小于开始时间'
        			})
        			return 
        		}else if(this.refundForm.start_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'开始时间不能为空'
        			})
        			return 
        		}else if(this.refundForm.stop_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'截止时间不能为空'
        			})
        			return 
        		}else{
		            var data = {
		                trading_status: this.refundForm.trading_status,
		                store_name: this.refundForm.store_name,
		                store_id: this.refundForm.store_id,
		                pay_type: this.refundForm.pay_type,
		                serial_number: this.refundForm.serial_number,
		                order_sn: this.refundForm.order_sn,
		                return_Sn: this.refundForm.return_sn,
		                start_time: this.refundForm.start_time,
		                stop_time: this.refundForm.stop_time,
		                is_export: this.is_export,
		                page:val?val:this.currentPage,
		                rows:this.pageSize
		            }
		            account.orderServiceList('Fundmanagement/orderServiceList',data,this)
        		}
        	},
        	setTime(){
	        	var currentData = new Date();
	        	var longTime = new Date(new Date()-7*24*60*60*1000);
	        	
	        	var yearCurrent = currentData.getFullYear();  
				var monthCurrent = currentData.getMonth() + 1; 
				var dayCurrent = currentData.getDate();  
				
	        	var yearLongTime = longTime.getFullYear();  
				var monthLongTime = longTime.getMonth() + 1; 
				var dayLongTime = longTime.getDate();  
				
				var monthCurr = monthCurrent > 9 ? monthCurrent : "0"+monthCurrent;
				var daysCurr = dayCurrent > 9 ? dayCurrent : "0"+dayCurrent;
				
				var monthLong = monthLongTime > 9 ? monthLongTime : "0"+monthLongTime;
				var daysLong = dayLongTime > 9 ? dayLongTime : "0"+dayLongTime;
				
				var strDate = yearLongTime + '-' + monthLong + '-'+dayLongTime;
				var strDateCurrent = yearCurrent + '-' + monthCurr +'-'+daysCurr;
				this.sTime = strDate;
				this.eTime = strDateCurrent;
				this.refundForm.start_time = strDate;
				this.refundForm.stop_time = strDateCurrent;
        	},
            getTimes(msg){
                if(msg!=undefined){
                    if(msg[0]!='NaN-0NaN-0NaN'){
                        this.refundForm.start_time = msg[0];
                        this.refundForm.stop_time = msg[1];
                    }else{
                        this.refundForm.start_time ='';
                        this.refundForm.stop_time ='';
                    }
                }else{
                        this.refundForm.start_time ='';
                        this.refundForm.stop_time ='';
                }
            },
            handleCurrentChange(val){
				this.fetch(val);
            },
            searchQueryShopCoupons(){
				this.fetch();
            },
            searchList(params){
                var data = {
                    return_sn:params.return_sn
                }
                account.orderServiceInfo('Fundmanagement/orderServiceInfo',data,this)
            }
        }
    }
</script>

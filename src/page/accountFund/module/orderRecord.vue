<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/revenueRecord.less";
</style>
<template>
    <div class="order_record">
     <div class="main">
        <div class="search-input">
            <div class="leftLable">交易状态：</div><div class="rightLable">
                 <el-select size="small" v-model="orderRecordForm.trading_status" placeholder="请选择">
                    <el-option
                    v-for="item in optionsOrder"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>       
        <div class="search-input">
            <div class="leftLable">交易用户：</div><div class="rightLable"><el-input size="small" v-model="orderRecordForm.nickname" placeholder=""></el-input></div>
        </div>      
        <div class="search-input">
            <div class="leftLable">订单编号：</div><div class="rightLable"><el-input size="small" v-model="orderRecordForm.order_sn" placeholder=""></el-input></div>
        </div>  
        <div class="search-input">
            <div class="leftLable">流水号：</div><div class="rightLable"><el-input size="small" v-model="orderRecordForm.serial_number" placeholder=""></el-input></div>
        </div>
        <!--<picker title="日期" :sTime="sTime"  :eTime="eTime" @onPassByVal='getTimes'></picker>--> 
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
            prop="order_sn"
            label="订单编号">
            </el-table-column>
            <el-table-column
            prop="serial_number"
            label="流水号">
            </el-table-column>
            <el-table-column
            prop="trading_type"
            label="交易类型"
            width='60'>
            </el-table-column>
            <el-table-column
            prop="pay_type"
            label="交易方式"
            width='80'>
            </el-table-column>
            <el-table-column
            prop="total_amount"
            label="订单金额(元)"
            width='80'>
            </el-table-column>
            <el-table-column
            prop="store_coupon_price"
            label="商家优惠金额(元)"
            width='80'>
            </el-table-column>
            <el-table-column
            prop="pqd_coupon_price"
            label="平台优惠金额(元)"
            width='80'>
            </el-table-column>
            <el-table-column
            prop="order_amount"
            label="实际支付(元)"
            width='80'>
            </el-table-column>
            <el-table-column
            prop="trading_status"
            label="交易状态"
            width='80'>
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="创建时间"
            width='160'>
            </el-table-column>
            <el-table-column
            prop="pay_time"
            label="支付时间"
            width='160'>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small"
                    @click="searchList(scope.row)">订单详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total1'>
            </el-pagination>
        </div>
        </div>
     </div>

<el-dialog
  title="订单详情"
  :visible.sync="dialogVisibleOrder"
  width="90%">
<div class="list_info">
	<div class="list_info_item">
		<div class="title">店铺信息:</div>
		<div class="content">
			<span>店铺名称： {{storeInfo.store_name}}</span>
			<span>店铺联系人：{{storeInfo.show_ower_name}}</span>
			<span>店铺联系电话：{{storeInfo.show_ower_mobile}}</span>
		</div>
	</div>
	<div class="list_info_item">
		<div class="title">订单信息:</div>
		<div class="content">
			<span>订单编号： {{orderInfo.order_sn}}</span>
			<span>下单时间： {{orderInfo.add_time}}</span>
			<span>成单时间： {{orderInfo.success_time}}</span>
			<span>支付方式： {{orderInfo.pay_name}}</span>
			<span>支付时间： {{orderInfo.pay_time}}</span>
			<span>发货时间： {{orderInfo.delivery_time}}</span>
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
							<td>{{goodsInfo.order_status}}</td>
							<td>{{goodsInfo.total_amount}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="list_info_item" v-show="logisticInfo!=''">
		<div class="title">物流信息:</div>
		<div class="content">
			<span>物流单号：{{logisticInfo.logistics_order_sn}}</span>
		</div>
		<div class="content">
			<span>物流公司：{{logisticInfo.logistics_name}}</span>
		</div>
		<div class="content">
			<span>收货人：{{logisticInfo.consignee}}（{{logisticInfo.mobile}}）</span>
		</div>
		<div class="content">
			<span>物流地址：{{logisticInfo.address}}</span>
		</div>
	</div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisibleOrder = false">取 消</el-button>
    <el-button size="small" type="primary" @click="dialogVisibleOrder = false">确 定</el-button>
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
                goodsInfo:{},
                logisticInfo:{},
                orderInfo:{},
                storeInfo:{},
                dialogVisibleOrder:false,
                is_export:'',
                coupon_status:'',
                tableData:[],
                statistics:{},
                currentPage1:1,
                pageSize:10,
                total1:0,
                optionsOrder:[],
                orderRecordForm:{
                   trading_status:'', 
                   nickname:'', 
                   serial_number:'', 
                   pay_type:'', 
                   order_sn:'', 
                   start_time:'', 
                   stop_time:'', 
                   is_export:'', 
                },
            }
        },
        created(){
			this.setTime();
			this.fetch();
            account.orderTransactionStatus('Fundmanagement/orderTransactionStatus',this)
        },
        components:{
            picker,datepick
        },
        methods:{
        	fetch(val){
        		var str = this.orderRecordForm.start_time;
        		var stramp = new Date(str).getTime();
        		var str1 = this.orderRecordForm.stop_time;
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
        		}else if(this.orderRecordForm.start_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'开始时间不能为空'
        			})
        			return 
        		}else if(this.orderRecordForm.stop_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'截止时间不能为空'
        			})
        			return 
        		}else{
		            var data = {
		                trading_status: this.orderRecordForm.trading_status,
		                nickname: this.orderRecordForm.nickname,
		                serial_number: this.orderRecordForm.serial_number,
		                pay_type: this.orderRecordForm.pay_type,
		                order_sn: this.orderRecordForm.order_sn,
		                start_time: this.orderRecordForm.start_time,
		                stop_time: this.orderRecordForm.stop_time,
		                is_export: this.is_export,
		                page:val?val:this.currentPage1,
		                rows: this.pageSize,
		            }
		            
					account.storePaymentOrderList('Fundmanagement/storePaymentOrderList',data,this);
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
				this.orderRecordForm.start_time = strDate;
				this.orderRecordForm.stop_time = strDateCurrent;
        	},
            getTimes(msg){
            	console.log(msg)
                if(msg!=undefined){
                    if(msg[0]!='NaN-0NaN-0NaN'){
                        this.orderRecordForm.start_time = msg[0];
                        this.orderRecordForm.stop_time = msg[1];
                    }else{
                        this.orderRecordForm.start_time ='';
                        this.orderRecordForm.stop_time ='';
                    }
                }else{
                        this.orderRecordForm.start_time ='';
                        this.orderRecordForm.stop_time ='';
                }
            },
            searchList(params){ 
                this.$router.push({path:'/store/orderManager/orderDetail',query:{order_sn:params.order_sn,accout:'accout'}}) 
            },
            handleSizeChange(){

            },
            handleCurrentChange(val){
				this.fetch(val);
            },
            searchQueryShopCoupons(){
				this.fetch();
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/revenueRecord.less";
</style>
<template>
    <div class="order_record">
     <div class="main">
        <div class="search-input">
            <div class="leftLable">收支类型：</div><div class="rightLable">
                 <el-select size="small" v-model="store_detail.is_payment" placeholder="请选择">
                    <el-option
                    v-for="item in is_paymentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="search-input">
            <div class="leftLable">收支明细：</div><div class="rightLable">
                 <el-select size="small" v-model="store_detail.withdrawal_payment_type" placeholder="请选择">
                    <el-option
                    v-for="item in pay_codeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="search-input">
            <div class="leftLable">流水号：</div><div class="rightLable"><el-input size="small" v-model="store_detail.payment_sn" placeholder=""></el-input></div>
        </div>
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
            prop="payment_sn"
            label="流水号">
            </el-table-column>
            <el-table-column
            prop="is_payment"
            label="收支类型">
            </el-table-column>
            <el-table-column
            prop="payment_type"
            label="收支明细">
            </el-table-column>
            <el-table-column
            prop="price"
            label="发生金额(元)">
            </el-table-column>
            <el-table-column
            prop="account_balance"
            label="可提现余额">
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="发生时间">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage2"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
        </div>
     </div>
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
              is_paymentOptions:[],
              pay_codeOptions:[],
                store_type:[],
                store_status:[],
                total_punish_price:'',
                coupon_status:'',
                tableData:[],
                currentPage2:1,
                pageSize:10,
                total:0,
                options:[],
                store_detail:{
                  store_id:'',
                  store_name:'',
                  is_payment:'',
                  withdrawal_payment_type:'',
                  payment_sn:'',
                  start_time:'',
                  end_time:'',
                }
            }
        },
        created(){
  				this.setTime();
  				this.fetch();
          account.storeBalanceSearchStatus('FundManagement/storeBalanceSearchStatus',this);
        },
        components:{
            picker,datepick
        },
        methods:{
        	fetch(val){
        		var str = this.store_detail.start_time;
        		var stramp = new Date(str).getTime();
        		var str1 = this.store_detail.end_time;
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
        		}else if(this.store_detail.start_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'开始时间不能为空'
        			})
        			return
        		}else if(this.store_detail.end_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'截止时间不能为空'
        			})
        			return
        		}else{
                  var data = {
                      store_id:this.store_detail.store_id,
                      store_name:this.store_detail.store_name,
                      is_payment:this.store_detail.is_payment,
                      withdrawal_payment_type:this.store_detail.withdrawal_payment_type,
                      payment_sn:this.store_detail.payment_sn,
                      start_time:this.store_detail.start_time=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?'':this.store_detail.start_time,
                      end_time:this.store_detail.end_time=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?'':this.store_detail.end_time,
                      page:val?val:this.currentPage,
                      rows:this.pageSize
                  }
                  account.storeBalanceHistory("FundManagement/storeBalanceHistory",data,this);
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
    				this.store_detail.start_time = strDate;
    				this.store_detail.end_time = strDateCurrent;
        	},
          getTimes(msg){
            if(msg!=undefined){
              if(msg[0]!='NaN-0NaN-0NaN'){
                  this.store_detail.start_time = msg[0];
                  this.store_detail.end_time = msg[1];
              }else{
                  this.store_detail.start_time = '';
                  this.store_detail.end_time = '';
              }
            }else{
                this.store_detail.start_time = '';
                this.store_detail.end_time = '';
            }
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

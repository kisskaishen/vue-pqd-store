<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/revenueRecord.less";
</style>
<template>
    <div class="order_record">
     <div class="main">
        <div class="search-input">
            <div class="leftLable">提现状态：</div><div class="rightLable">
                 <el-select size="small" v-model="forwardForm.status" placeholder="请选择">
                    <el-option
                    v-for="item in optionsForWard"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>       
        <div class="search-input">
            <div class="leftLable">提现编号：</div><div class="rightLable"><el-input size="small" v-model="forwardForm.serial_number" placeholder=""></el-input></div>
        </div>
        <picker title="创建时间：" @onPassByVal='getTime'></picker> 
        <!--<picker title="审核时间：" :sTime="sTime"  :eTime="eTime" @onPassByVal='getTimes'></picker>--> 
        <datepick title="审核时间：" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTimes'></datepick>
        <div class="clickButtonMargin">     
            <el-button  size="small" type="primary" @click = "searchQueryShopCoupons()">查询</el-button>
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
            prop="serial_number"
            label="提现编号">
            </el-table-column>
            <el-table-column
            prop="withdrawal_code"
            label="提现账号">
            </el-table-column>
            <el-table-column
            prop="withdrawal_money"
            label="提现金额(元)">
            </el-table-column>
            <el-table-column
            prop="status"
            label="提现状态">
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="提现申请时间">
            </el-table-column>
            <el-table-column
            prop="audit_time"
            label="提现审核时间">
            </el-table-column>
            <el-table-column
            prop="audit_time"
            label="备注">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage3"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total3'>
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
                coupon_status:'',
                tableData:[],
                statistics:{},
                currentPage3:1,
                pageSize:10,
                total3:0,
                optionsForWard:[],
                forwardForm:{

                }
            }
        },
        created(){
			this.setTime();
			this.fetch();
            account.withdrawalAuditStatus('Fundmanagement/withdrawalAuditStatus',this);
        },
        components:{
            picker,datepick
        },
        methods:{
        	fetch(val){
        		var str = this.forwardForm.audit_start_time;
        		var stramp = new Date(str).getTime();
        		var str1 = this.forwardForm.audit_stop_time;
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
        		}else if(this.forwardForm.audit_start_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'开始时间不能为空'
        			})
        			return 
        		}else if(this.forwardForm.audit_stop_time=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'截止时间不能为空'
        			})
        			return 
        		}else{
		            var data = {
		                serial_number: this.forwardForm.serial_number,
		                withdrawal_code: this.forwardForm.withdrawal_code,
		                status: this.forwardForm.status,
		                start_time: this.forwardForm.start_time,
		                stop_time: this.forwardForm.stop_time,
		                audit_start_time: this.forwardForm.audit_start_time,
		                audit_stop_time: this.forwardForm.audit_stop_time,
		                is_export: this.is_export,
		                page: val?val:this.currentPage3,
		                rows: this.pageSize,
		            }
		            account.WithdrawalFlow('Fundmanagement/withdrawHistory',data,this)
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
				this.forwardForm.audit_start_time = strDate;
				this.forwardForm.audit_stop_time = strDateCurrent;
        	},
            getTime(msg){
                if(msg!=undefined){
                    if(msg[0]!='NaN-0NaN-0NaN'){
                        this.forwardForm.start_time = msg[0];
                        this.forwardForm.stop_time = msg[1];
                    }else{
                        this.forwardForm.start_time ='';
                         this.forwardForm.stop_time ='';
                    }
                }else{
                        this.forwardForm.start_time ='';
                         this.forwardForm.stop_time ='';
                }
            },
            getTimes(msg){
                if(msg!=undefined){
                    if(msg[0]!='NaN-0NaN-0NaN'){
                        this.forwardForm.audit_start_time = msg[0];
                        this.forwardForm.audit_stop_time = msg[1];
                    }else{
                        this.forwardForm.audit_start_time ='';
                         this.forwardForm.audit_stop_time ='';
                    }
                }else{
                        this.forwardForm.audit_start_time ='';
                         this.forwardForm.audit_stop_time ='';
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

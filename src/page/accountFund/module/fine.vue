<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/revenueRecord.less";
</style>
<template>
    <div class="order_record">
     <div class="main">
        <div class="search-input">
            <div class="leftLable">违规类型：</div><div class="rightLable">
                 <el-select size="small" v-model="fineData.type" placeholder="请选择">
                    <el-option
                    v-for="item in store_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>  
        <div class="search-input">
            <div class="leftLable">状态：</div><div class="rightLable">
                 <el-select size="small" v-model="fineData.status" placeholder="请选择">
                    <el-option
                    v-for="item in store_status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>       
        <div class="search-input">
            <div class="leftLable">订单编号：</div><div class="rightLable"><el-input size="small" v-model="fineData.order_sn" placeholder=""></el-input></div>
        </div>      
        <div class="search-input">
            <div class="leftLable">违规编号：</div><div class="rightLable"><el-input size="small" v-model="fineData.punishment_sn" placeholder=""></el-input></div>
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
            prop="punishment_sn"
            label="违规编号">
            </el-table-column>
            <el-table-column
            prop="order_sn"
            label="订单编号">
            </el-table-column>
            <el-table-column
            prop="type_name"
            label="违规类型">
            </el-table-column>
            <el-table-column
            prop="sp_penal_sum"
            label="罚款金额(元)">
            </el-table-column>
            <el-table-column
            prop="admin_name"
            label="处理人">
            </el-table-column>
            <el-table-column
            prop="datetime"
            label="处理时间">
            </el-table-column>
            <el-table-column
            prop="status_name"
            label="状态">
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
                store_type:[],
                store_status:[],
                total_punish_price:'',
                coupon_status:'',
                tableData:[],
                currentPage2:1,
                pageSize:10,
                total:0,
                options:[],
                fineData:{
                    punishment_sn:'',
                    order_sn:'',
                    store_id:'',
                    type:'',
                    datetime_start:'',
                    datetime_end:'',
                    store_name:'',
                    status:'',
                }
            }
        },
        created(){
				this.setTime();
				this.fetch();
                account.storeSearchConf('Storepunishment/searchConf',this);
        },
        components:{
            picker,datepick
        },
        methods:{
        	fetch(val){
        		var str = this.fineData.datetime_start;
        		var stramp = new Date(str).getTime();
        		var str1 = this.fineData.datetime_end;
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
        		}else if(this.fineData.datetime_start=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'开始时间不能为空'
        			})
        			return 
        		}else if(this.fineData.datetime_end=='1970-01-01'){
        			this.$message({
        				type:'info',
        				message:'截止时间不能为空'
        			})
        			return 
        		}else{
	                var data = {
	                    punishment_sn:this.fineData.punishment_sn,
	                    order_sn:this.fineData.order_sn,
	                    store_id:this.fineData.store_id,
	                    type:this.fineData.type,
	                    datetime_start:this.fineData.datetime_start,
	                    datetime_end:this.fineData.datetime_end,
	                    store_name:this.fineData.store_name,
	                    status:this.fineData.status,
	                    page:val?val:this.currentPage2,
	                    rows:this.pageSize,
	                }
	                account.fineHistory("Storepunishment/list",data,this)
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
				this.fineData.datetime_start = strDate;
				this.fineData.datetime_end = strDateCurrent;
        	},
            getTimes(msg){
                if(msg!=undefined){
                    if(msg[0]!='NaN-0NaN-0NaN'){
                        this.fineData.datetime_start = msg[0];
                        this.fineData.datetime_end = msg[1];
                    }else{
                        this.fineData.datetime_start ='';
                       this.fineData.datetime_end ='';
                    }
                }else{
                        this.fineData.start_time ='';
                        this.fineData.datetime_end ='';
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

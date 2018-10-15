<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/revenueRecord.less";
</style>
<template>
    <div class="order_record">
     <div class="main">
        <!--<div class="search-input">
            <div class="leftLable">流水号：</div><div class="rightLable"><el-input size="small" v-model="bondForm.serial_number" placeholder=""></el-input></div>
        </div>     -->
        <div class="search-input">
            <div class="leftLable">支付方式：</div><div class="rightLable"><el-input size="small" v-model="bondForm.serial_number" placeholder=""></el-input></div>
        </div>    
        <picker title="日期：" @onPassByVal='getTimes'></picker> 
        <div class="clickButtonMargin">     
            <el-button size="small" type="primary" @click = "searchQueryShopCoupons()">查询</el-button>
        </div>
		<div class="account_cash" style="color:red">
			注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
		</div>
        <div class="list">
            <!--<el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="order_sn"
            label="订单号">
            </el-table-column>
            <el-table-column
            prop="pay_name"
            label="交易方式">
            </el-table-column>
            <el-table-column
            prop="price"
            label="缴纳金额(元)">
            </el-table-column>
            <el-table-column
            prop="status_name"
            label="交易状态">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="交易时间">
            </el-table-column>
        </el-table>-->
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="order_sn"
            label="创建时间">
            </el-table-column>
            <el-table-column
            prop="pay_name"
            label="流水号">
            </el-table-column>
            <el-table-column
            prop="pay_name"
            label="账户类型">
            </el-table-column>
            <el-table-column
            prop="pay_name"
            label="业务类型">
            </el-table-column>
            <el-table-column
            prop="price"
            label="金额(元)">
            </el-table-column>
            <el-table-column
            prop="status_name"
            label="支付方式">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="交易状态">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="完成时间">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="备注">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
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
    export default{
        data(){
            return {
                total_deposit_price:0,
                bondForm:{
                    store_id:'',
                    store_name:'',
                    order_sn:'',
                    pay_code:'',
                    status:'',
                    created_at_start:'',
                    created_at_end:'',
                },
                coupon_status:'',
                tableData:[],
                currentPage1:1,
                pageSize:10,
                total:0,
                options:[]
            }
        },
        created(){
            var data = {
                store_id:this.bondForm.store_id,
                store_name:this.bondForm.store_name,
                order_sn:this.bondForm.order_sn,
                pay_code:this.bondForm.pay_code,
                status:this.bondForm.status,
                created_at_start:this.bondForm.created_at_start,
                created_at_end:this.bondForm.created_at_end,
                page:this.currentPage1,
                rows:this.pageSize,
            }
            account.margin("Storedeposit/list",data,this)
//          account.marginCount("Storedeposit/countInfo",data,this)
        },
        components:{
            picker
        },
        methods:{
            getTimes(msg){
                if(msg!=undefined){
                    if(msg[0]!='NaN-0NaN-0NaN'){
                        this.bondForm.created_at_start = msg[0];
                        this.bondForm.created_at_end = msg[1];
                    }else{
                       this.bondForm.created_at_start ='';
                       this.bondForm.created_at_end ='';
                    }
                }else{
                       this.bondForm.created_at_start ='';
                       this.bondForm.created_at_end ='';
                }
            },
            handleCurrentChange(val){
                var data = {
                    store_id:this.bondForm.store_id,
                    store_name:this.bondForm.store_name,
                    order_sn:this.bondForm.order_sn,
                    pay_code:this.bondForm.pay_code,
                    status:this.bondForm.status,
                    created_at_start:this.bondForm.created_at_start,
                    created_at_end:this.bondForm.created_at_end,
                    page:val,
                    rows:this.pageSize,
                }
                account.margin("Storedeposit/list",data,this)
//              account.marginCount("Storedeposit/countInfo",data,this)
            },
            searchQueryShopCoupons(){
                var data = {
                    store_id:this.bondForm.store_id,
                    store_name:this.bondForm.store_name,
                    order_sn:this.bondForm.order_sn,
                    pay_code:this.bondForm.pay_code,
                    status:this.bondForm.status,
                    created_at_start:this.bondForm.created_at_start,
                    created_at_end:this.bondForm.created_at_end,
                    page:this.currentPage1,
                    rows:this.pageSize,
                }
                account.margin("Storedeposit/list",data,this)
//              account.marginCount("Storedeposit/countInfo",data,this)
            }
        }
    }
</script>

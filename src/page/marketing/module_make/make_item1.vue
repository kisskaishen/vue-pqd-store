<style lang="less" scoped>
@import "../../../less/config.less";
</style>
<template>
  <div class="search_admin_list_table">
        <div class="search_btn">
            <div class="search_content">
                <span>状态</span>
                <div class="width-120">
                    <el-select size="small" v-model.trim="form.status" placeholder="全部">
                        <el-option
                        v-for="item in statusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search_content">
                <span>过去七天</span>
                <div class="width-120">
                    <el-select size="small" @change="changeTime(form.time)" v-model.trim="form.time" placeholder="全部">
                        <el-option
                        v-for="item in selectTimeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.time">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search_contents">
                <picker :defaultTime = 'defaultTime' @onPassByVal='getTime'></picker>
            </div>
            <div class="search_contents">
                <el-button size="small" type="primary" @click="searchListData()">查询</el-button>
            </div>
        </div>
       <el-table
           :data="tableData"
           border
           style="width: 100%">
           <el-table-column
               prop="order_sn"
               label="订单编号"
               width="180">
           </el-table-column>
           <el-table-column
               prop="order_promotion_status"
               label="状态">
           </el-table-column>
           <el-table-column
               prop="confirm_time"
               label="收获时间">
           </el-table-column>
           <el-table-column
               prop="settlement_time"
               label="结算时间">
           </el-table-column>
           <el-table-column
               prop="add_time"
               label="创建时间">
           </el-table-column>
           <el-table-column
               prop="goods_name"
               label="推广商品"
               width="180">
           </el-table-column>
           <el-table-column
               prop="order_amount"
               label="订单金额(元)">
           </el-table-column>
           <el-table-column
               prop="goods_num"
               label="成交商品数">
           </el-table-column>
           <el-table-column
               prop="commission_rate"
               label="佣金比率">
           </el-table-column>
           <el-table-column
               prop="promotion_amount"
               label="佣金金额(元)">
           </el-table-column>
       </el-table>
      <div class="pagination" v-show="total!=0">
          <el-pagination
              @current-change="handleSizeChange"
              :current-page="currentPage"
              :page-size='pageSize'
              layout="total, prev, pager, next, jumper"
              :total='total'>
          </el-pagination>
      </div>
  </div>
</template>

<script>
import MakeFun from "../../../js/make_fun.js";
import picker from '../../../components/picker';
export default {
  data(){
    return{
      statusOption:[],
      selectTimeOption:[],
      defaultTime:[],
      form:{
        status:'',
        time:'',
        start_time:'',
        stop_time:"",
      },
      couponOption:[],
      tableData:[],
      currentPage:1,
      pageSize:10,
      total:0,
    }
  },
  components:{
    picker
  },
  created(){
     this.fetch();
     MakeFun.promotionStatus("Fundstatistics/promotionStatus",this);
     MakeFun.getTimeFundstatistics("Fundstatistics/getTime",this);
  },
  methods:{
    changeTime(val){
      this.defaultTime = val;
    },
    fetch(val){
        var data = {
            start_time:this.form.start_time,
            stop_time:this.form.stop_time,
            status:this.form.status,
            page:val?val:this.currentPage,
            rows:this.pageSize
        }
        MakeFun.promotionGoods("Fundstatistics/promotionOrderStatistics",data,this);
    },
    handleSizeChange(val){
        this.fetch(val);
    },
    searchListData(){
      this.fetch();
    },
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.start_time = msg[0];
	   			this.form.stop_time = msg[1];
	        }else{
	   			this.form.start_time = '';
	   			this.form.stop_time = '';
	        }
        }else{
   			this.form.start_time = '';
   			this.form.stop_time = '';
        }
   	},
  }
}
</script>

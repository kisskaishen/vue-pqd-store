<style lang="less" scoped>
@import "../../../less/config.less";
</style>
<template>
  <div class="search_admin_list_table">
        <div class="search_btn">
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
               prop="time"
               label="日期"
               width="180">
           </el-table-column>
           <el-table-column
               prop="share_count"
               label="分享次数"
               width="180">
           </el-table-column>
           <el-table-column
               prop="pv"
               label="PV(独立访客)">
           </el-table-column>
           <el-table-column
               prop="group_order_num"
               label="成团订单数">
           </el-table-column>
           <el-table-column
               prop="order_amount"
               label="订单金额(元)">
           </el-table-column>
           <el-table-column
               prop="settlement_order_num"
               label="结算订单数">
           </el-table-column>
           <el-table-column
               prop="settlement_amount"
               label="结算金额(元)">
           </el-table-column>
           <el-table-column
               prop="settlement_brokerage_amount"
               label="结算佣金(元)">
           </el-table-column>
           <el-table-column
               prop="settlement_brokerage_average_rate"
               label="平均佣金比率">
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
      defaultTime:[],
      selectTimeOption:[],
      form:{
        time:'',
        use_start_time:'',
        use_end_time:"",
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
       MakeFun.getTimeFundstatistics("Fundstatistics/getTime",this);
  },
  methods:{
    changeTime(val){
      this.defaultTime = val;
      console.log(val)
    },
    fetch(val){
        var data = {
            start_time:this.form.start_time,
            stop_time:this.form.stop_time,
            page:val?val:this.currentPage,
            rows:this.pageSize
        }
        MakeFun.promotionGoods("Fundstatistics/promotionSummary",data,this);
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

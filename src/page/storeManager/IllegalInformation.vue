<template>
 <div class="IllegalInformation">
     <div class="common-top-title">违规信息</div>
     <div class="main">
           <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="sp_id"
            label="违规编号"
            width="80">
            </el-table-column>
            <el-table-column
            prop="order_sn"
            label="订单编号"
            width="170">
            </el-table-column>
            <el-table-column
            label="违规类型">
              <template slot-scope="scope">
                <span v-if="scope.row.type==0">延迟发货</span>
                <span v-else-if="scope.row.type==1">虚假发货</span>
                <span v-else-if="scope.row.type==2">假货处理</span>
              </template>
            </el-table-column>
            <el-table-column
            prop="reason"
            label="惩罚理由"
            width="380">
            </el-table-column>
            <el-table-column
            prop="sp_penal_sum"
            label="罚款金额"
            width="80">
            </el-table-column>
            <el-table-column
            prop="admin_name"
            label="处理人"
            width="80">
            </el-table-column>
            <el-table-column
            prop="datetime"
            label="处理时间"
            width="160">
            </el-table-column>
            <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">已处理</span>
              <span v-else>已撤销</span>
            </template>
            </el-table-column>
        </el-table>
               <!-- <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size=pageSize
          layout="total, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
               </div> -->
     </div>
 </div>
</template>

<script>
import IllegalInformation from "../../js/IllegalInformation";
 export default {
   data () {
     return {
       total:0,
       pageSize:15,
       currentPage4:1,
       tableData: []
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('IllegalInformation', function(id){
		    that.fetch();
		})
   },
   components: {

   },
   methods:{
   	fetch(){
     IllegalInformation.getIllegalInformation('/store/illegal',this);
   	},
     handleCurrentChange(val){
     }
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.IllegalInformation{
    background:@backgroundfff;
    .main{
        padding:20px;
    }
}
 
</style>

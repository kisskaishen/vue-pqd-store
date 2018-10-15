<template>
 <div class="marketing_active">
     <div class="common-top-title">活动商品</div>
     <ul class="active_goods_list">
         <li class="table">
             <div class="title">
                待选择商品 
             </div>  
             <div class="search">
                 <div class="cod">
                     <span>商品ID：</span>
                     <span class="width_input">
                        <el-input size="small" v-model.trim="form.goods_id" placeholder="请输入内容"></el-input>
                     </span>
                 </div>
                 <div class="cod">
                     <span>商品名称：</span>
                     <span class="width_input">
                        <el-input size="small" v-model.trim="form.goods_name" placeholder="请输入内容"></el-input>
                     </span>
                 </div>
                 <div class="cod">
                     <el-button size="small" type="primary" @click="searchList()">搜索</el-button>
                 </div>
             </div>
             <div class="table_select">
                   <el-table
                   border
                    ref="multipleTable"
                    :data="toBeSelected"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="goods_id"
                    label="商品ID">
                    </el-table-column>
                    <el-table-column
                    prop="goods_name"
                    label="商品名称">
                    </el-table-column>
                </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total1'>
            </el-pagination>
        </div>
             </div>
         </li>
         <li class="trans">
             <div class="arow">
                 <!-- <div @click="selectLeft()" class="arow_left">
                     <
                 </div>
                 <div @click="selectRight()" class="arow_right">
                     >
                 </div> -->
             </div>
         </li>
         <li class="table">
             <div class="title">
                已选择商品 
             </div>
             <div class="emput"></div>
             <div class="table_select">
                   <el-table
                   border
                    ref="multipleTable"
                    :data="chosenAlready"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChangeChosen">
                    <el-table-column
                    type="selection"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="goods_id"
                    label="商品ID">
                    </el-table-column>
                    <el-table-column
                    prop="goods_name"
                    label="商品名称">
                    </el-table-column>
                    <el-table-column
                    label="设置活动">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">设置活动</el-button>
                    </template>
                    </el-table-column>
                </el-table>
        <!-- <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total2'>
            </el-pagination>
        </div> -->
             </div>
         </li>
     </ul>
        <div class="submit_btn">
            <div class="submit_active">
                <el-button size="small" @click="submitActive()" type="danger">提交</el-button>
            </div>
        </div>
     <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="60%">
  <el-table
    :data="tableDataObj"
    border
    style="width: 100%">
    <el-table-column
      prop="key_name"
      label="商品属性值"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单买价格(元)">
    </el-table-column>
    <el-table-column
      prop="prom_price"
      label="团购价格(元)">
    </el-table-column>
    <el-table-column
      prop="limit_price"
      label="活动价格(元)">
    </el-table-column>
    <el-table-column
      prop="store_count"
      label="商品库存">
    </el-table-column>
    <el-table-column
      label="活动库存">
        <template slot-scope="scope">
            <el-input size="small" v-model.trim="scope.row.limit_stock" placeholder="设置活动库存"></el-input>
        </template>
    </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="btnActive()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Market from '../../js/marketing';
 export default {
   data () {
     return {   
         tableDataObj:[],
         active_goods:'',
         activity_id:'', 
         deleteIndex:[], 
         chosenAlready:[],  
         toBeSelected: [],
         form:{
            goods_id:'',
            goods_name:'',
         },
         multipleSelection: [],
         currentPage4:1,
         itemData:[],
         pageSize:10,
         input:'',
         currentPage1:1,
         total1:0,
         total2:0,
         currentPage2:1,
         dialogVisible: false,
     }
   },
   created(){
       this.activity_id = this.$route.query.activity_id;
       var data = {
           activity_id:this.activity_id,
           goods_id:this.form.goods_id,
           goods_name:this.form.goods_name,
           page:this.currentPage1,
           rows:this.pageSize,
       }
       Market.storeJoinHelpActivityGoodsList("Helpactivity/storeJoinHelpActivityGoodsList",data,this);
   },
   components: {

   },
   methods:{
       submitActive(){
           var data = {
               activity_id:this.activity_id,
               goods:this.chosenAlready,
           }
           Market.storeAddActiveGoods("Helpactivity/storeAddActiveGoods",data,this);
       },
       btnActive(){
           this.submitData = this.tableDataObj;
           this.dialogVisible = false;
       },
       handleClick(data){
           this.dialogVisible = true;
           this.tableDataObj = data.specList;
       },
       searchList(){
            var data = {
                activity_id:this.activity_id,
                goods_id:this.form.goods_id,
                goods_name:this.form.goods_name,
                page:this.currentPage4,
                rows:this.pageSize,
            }
            Market.storeJoinHelpActivityGoodsList("Helpactivity/storeJoinHelpActivityGoodsList",data,this);
       },
       selectLeft(){
           this.multipleSelection.forEach(function(item,index){
                this.toBeSelected.push(item)
           })
       },
       selectRight(){
           var self = this;
           this.multipleSelection.forEach(function(value,ind){
               self.chosenAlready.push(value)
           })
           this.toBeSelected.forEach(function(item,indexs){
               if(self.chosenAlready.length!=0){
                    self.multipleSelection.forEach(function(val,index){
                        if (item.date===val.date) {
                            self.deleteIndex.push(indexs)
                        }
                    })
               }else{

               }
           })
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
      handleCurrentChange1(val){
        var data = {
            activity_id:this.activity_id,
            goods_id:this.form.goods_id,
            goods_name:this.form.goods_name,
            page:val,
            rows:this.pageSize,
        }
        Market.storeJoinHelpActivityGoodsList("Helpactivity/storeJoinHelpActivityGoodsList",data,this);
      },
      handleCurrentChange2(){
        var datas = {
            activity_id:this.activity_id,
            page:val,
            rows:this.pageSize,
        }
            Market.storeActiveGoodsList("Helpactivity/storeActiveGoodsList",datas,this);
      },
      handleSelectionChange(val) {
        var self = this;
        this.multipleSelection = val;
        if(val.length!=0){
            self.chosenAlready.push(val[0])
        }
        this.removeObjWithArr(this.toBeSelected,val[0])
      },
      handleSelectionChangeChosen(val) {
        var self = this;
        this.multipleSelection = val;
        if(val.length!=0){
            self.toBeSelected.push(val[0])
        }
        this.removeObjWithArr(this.chosenAlready,val[0])
      }
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/marketing.less";
</style>
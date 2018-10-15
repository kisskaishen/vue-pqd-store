
<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/marketing.less";
.tab_title{
    margin-top:10px;
}
</style>
<template>
 <div class="marketing">
     <div class="common-top-title">营销活动</div>
     <div class="marketing_main">    
        <div class="detail_warp">
            <div class="detail_warp_active">
                <div class="warp">
                    <div class="title">《&nbsp;{{activeDetail.activity_name}}&nbsp;》</div> 
                    <div class="active_time">活动时间：{{activeDetail.activity_view_time}}</div>
                    <div class="sign_time">报名时间：{{activeDetail.enter_view_time}}</div>
                    <div class="active_detail">当前状态：{{activeDetail.activity_status_name}}</div>
                    <div class="sign_btns">报名剩余： 
                    	<span class="times" v-show="activeDetail.enter_long_time!='1'">
                    		<count-down :endTime="activeDetail.enter_end_time" :callback="callback" endText="已经结束了"></count-down>
                    	</span>
                    	<span class="times" v-show="activeDetail.enter_long_time=='1'">
                    		长期
                    	</span>
                    </div>
                    <div class="sign_btn" v-show="this.is_type!='unabled'"><el-button size="small" @click="immediately()" type="danger">立即报名</el-button></div>
                </div>
            </div>
            <div class="detail_content_active">
                <div class="tab_title">
                    <div v-show="is_type=='unabled'">
                        <el-tabs v-model="activeNameDetail" @tab-click="handleClickDetail">
                            <el-tab-pane label="活动详情" name="first">
                                <ul class="text_container">
                                    <li v-html="activeDetail.details"></li>
                                </ul>
                            </el-tab-pane>
                            <el-tab-pane label="活动资质" name="second">
                                <div class="tab_active_zizhi">
                                        <el-table
                                        :data="limitData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        prop="name"
                                        label="资质名称"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="content"
                                        label="资质详情"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="desc"
                                        label="说明">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div v-show="is_type!='unabled'">
                        <el-tabs v-model="activeNameDetail" @tab-click="handleClickDetail">
                            <el-tab-pane label="活动详情" name="first">
                                <ul class="text_container">
                                    <li v-html="activeDetail.details"></li>
                                </ul>
                            </el-tab-pane>
                            <el-tab-pane label="活动资质" name="second">
                                <div class="tab_active_zizhi">
                                        <el-table
                                        :data="limitData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        prop="name"
                                        label="资质名称">
                                        </el-table-column>
                                        <el-table-column
                                        prop="content"
                                        label="资质详情"
								      width="900">
                                        </el-table-column>
                                        <el-table-column
                                        prop="desc"
                                        label="说明">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                                <el-tab-pane label="活动商品" name="third">
                                	<div style="color:red">注：活动商品删除后才可进入在正常的商品列表中展示</div>
                                    <div class="tab_active_goods">
                                        <el-table
                                        :data="tableDataActive"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        prop="goods_id"
                                        label="商品ID"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="goods_name"
                                        label="商品名称"
                                        width="380">
                                        </el-table-column>
                                        <el-table-column
                                        prop="limit_stock"
                                        label="商品库存">
                                        </el-table-column>
                                        <el-table-column
                                        prop="status_name"
                                        label="商品状态">
                                        </el-table-column>
                                        <el-table-column
                                        prop="last_audit_desc"
                                        label="审核意见">
                                        </el-table-column>
                                        <el-table-column
                                        prop="limit_price"
                                        label="活动价(元)">
                                        </el-table-column>
                                        <el-table-column
                                        prop="limit_stock"
                                        label="活动库存">
                                        </el-table-column>
                                        <el-table-column
                                        prop="limit_reach"
                                        label="参团人数">
                                        </el-table-column>
                                        <el-table-column
                                        label="操作">
                                        <template slot-scope="scope">
                                            <span v-show="scope.row.btn.detail">
                                                <el-button @click="handleClickEdit(scope.row)" type="text" size="small">详情</el-button>
                                            </span>
                                            <span v-show="scope.row.btn.edit">
                                                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                                            </span>
                                            <!--<span v-show="scope.row.btn.del">-->
                                                <el-button @click="handleClickDel(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                                            <!--</span>-->
                                        </template>
                                        </el-table-column>
                                        </el-table>
                                    </div>
                                </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
     </div>
     <!-- <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <div>1.报名成功后，活动不可撤销;</div>
  <div>2.活动商品通过审核后，活动期间商品不可编辑库存</div>
  <div>3.活动期间，商品不可下架;</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="btnActive()">确 定</el-button>
  </span>
</el-dialog> -->
     <el-dialog
  title="编辑商品"
  :visible.sync="dialogVisible"
  width="80%">
  <el-table
    :data="tableDataObj"
    border
    style="width: 100%">
    <el-table-column
      prop="key_name"
      label="商品属性值">
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
      prop="view_limit_stock"
      label="活动库存">
    </el-table-column>
    <el-table-column
      label="设置活动库存">
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
     <el-dialog
  title="商品"
  :visible.sync="dialogVisibleShow"
  width="80%">
  <el-table
    :data="tableDataObj"
    border
    style="width: 100%">
    <el-table-column
      prop="key_name"
      label="商品属性值">
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
    prop="limit_stock"
      label="活动库存">
    </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisibleShow = false">取 消</el-button>
    <el-button size="small" type="primary" @click="dialogVisibleShow = false">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Market from '../../js/marketing';
import countDown from '../../components/countDowm';
 export default {
   data () {
     return {
         id:'',
         is_type:'',
         goods_id:'',
         dialogVisibleShow:false,
         dialogVisible:false,
         activity_id:'',
         tableData: [],
         activeNameDetail:'first',
         activeName:'second',
         currentPage1:1,
         itemData:[],
         total:0,
         pageSize:10,
         activeDetail:{},
         limitData:[],
         tableDataActive:[],
         totalActive:0,
         currentPage2:1,
         tableDataObj:[],
     }
   },
   created(){
       this.activity_id = this.$route.query.activity_id;
       this.is_type = this.$route.query.type;
        var data = {
            activity_id : this.activity_id
        }
        Market.storeActiveInfo("Helpactivity/storeActiveInfo",data,this)
   },
   components: {
        countDown
   },
   methods:{
       btnActive(){
           var data = {
              activity_id:this.activity_id,
              goods_id:this.goods_id,
              specList:this.tableDataObj,
              id:this.id
           }
            Market.updateActiveGoodsSpec("Helpactivity/updateActiveGoodsSpec",data,this)
       },
       immediately(){
        // this.dialogVisible = true;
        this.$router.push({path:"/home/marketing/marketing_goods",query:{activity_id:this.activity_id}})
       },
       callback(val){
       }, 
       handleClickDetail(tab, event) {
        if(tab.name=="third"){
            var data = {
                activity_id : this.activity_id,
                page:this.currentPage2,
                rows:this.pageSize,
            }
             Market.storeActiveGoodsList("Helpactivity/storeActiveGoodsList",data,this)
        }
       },
      handleClickEdit(data) {
           this.tableDataObj = data.specList;
           this.goods_id = data.goods_id;
           this.dialogVisibleShow = true;
      },
      handleClick(data) {
           this.goods_id = data.goods_id;
           this.id = data.id;
           this.dialogVisible = true;
           this.tableDataObj = data.specList;
      },
      handleClickDel(params,index){
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
              activity_id:this.activity_id,
              goods_id:params.goods_id,
              id:params.id,
          }
        Market.storeDelGoods("Helpactivity/storeDelGoods",data,this,index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
       handleCurrentChange(){

       }
   }
 }
</script>
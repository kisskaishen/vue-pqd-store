<template>
 <div class="releaseNewProducts">
      <div class="common-top-title">
        趣多多赚商品推广
        <span class="common_top_right_btn">
          <el-button @click="coupon_manager" size="small" type="primary">优惠券管理</el-button>
        </span>
        <span class="common_top_right_btn_add">
          <el-button @click="search_exclusive" size="small" type="primary">查看明细数据</el-button>
        </span>
      </div>
     <div class="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="通用推广" name="1"></el-tab-pane>
            <el-tab-pane label="专属推广" name="2"></el-tab-pane>
        </el-tabs>
        <div class="new-product">
            <el-button type="danger" size="small" @click="newGeneralPromotion('1')">新建通用推广</el-button>
                <el-button type="danger" size="small" @click="newGeneralPromotion('2')">新建专属推广</el-button>
        </div>
     </div>
     <div class="main">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="推广商品"
                    width="280">
                    <template slot-scope="scope">
                    <dl class="sett_dl_warp" style="background:#f9f9f9;width:240px;padding:10px;">
                      <dt class="sett_dt">
                        <img class="dl_img" :src="scope.row.list_img" alt="">
                      </dt>
                      <dd>
                        <div class="title">
                            {{scope.row.goods_name}}
                        </div>
                        <div class="goods_id">
                          商品ID:{{scope.row.goods_id}}
                        </div>
                        <div class="price">
                          团购价:<span>{{scope.row.prom_price}}</span>元
                        </div>
                      </dd>
                    </dl>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="promotion_type"
                    label="推广类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="pv"
                    label="昨日PV"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="uv"
                    label="昨日UV"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="share_count"
                    label="昨日分享"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="order_count"
                    label="昨日成团订单数"
                    width="120">
                </el-table-column>
                    <el-table-column
                        prop="order_amount"
                        label="昨日订单金额(元)"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="settlement_order_count"
                        label="昨日审核订单"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        prop="settlement_order_amount"
                        label="昨日审核金额(元)"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="settlement_promotion_amount"
                        label="昨日审核佣金(元)"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="commission_rate"
                        label="佣金比率(%)"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="promotion_status"
                        label="状态"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="coupon_money"
                        label="优惠券信息"
                        width="140">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="returnUrl(scope.row)">编辑</el-button>
                            <el-button type="primary" size="small" @click="suspensionPromotion(scope.row)">{{scope.row.close_open_status==1?"暂停":"开启"}}</el-button>
                            <el-button type="danger" size="small" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
            </el-table>
         </div>
        <div class="pagination" v-show="total!=0">
            <el-pagination
                @current-change="handleSizeChange"
                :current-page="currentPage"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
     <el-dialog
       title="编辑商品推广信息"
       :visible.sync="dialogVisible"
       width="1000px">
       <div class="dialog_form">
             <dl class="sett_dl_warp" style="background:#f9f9f9;width:100%;padding:10px;">
               <dt class="sett_dt">
                 <img class="dl_img" :src="editForm.list_img" alt="">
               </dt>
               <dd style="width:100%">
                 <div class="title">
                   {{editForm.goods_name}}
                 </div>
                 <div class="goods_id">
                   商品ID:{{editForm.goods_id}}
                 </div>
                 <div class="price">
                   团购价:<span>{{editForm.prom_price}}</span>元
                 </div>
               </dd>
             </dl>
             <div class="dialog_setting">
               <div class="dialog_setting_left">
                   <span>设置佣金比率：</span><el-input v-model="editForm.commission_rate" size="small" style="width:190px;" placeholder="佣金比例范围为10%-90%"></el-input><span>%</span>
               </div>
               <div class="dialog_setting_right">
                   <el-button type="text">+新建优惠券</el-button>
               </div>
             </div>
             <div class="dialog_setting">
               <div class="dialog_setting_left">
                   <span>是否使用优惠券：</span>
                   <el-radio-group v-model="radio" @change="changeRadio">
                     <el-radio :label="1">不使用</el-radio>
                     <el-radio :label="2">使用</el-radio>
                   </el-radio-group>
               </div>
             </div>
             <div class="dialog_setting_explain">
                 添加优惠券：<span>仅展示当前商品可用优惠券信息</span>
             </div>
             <div class="dialog_setting_table" v-if="radio==2">
                  <el-table
                      :data="listData"
                      border
                      style="width: 100%"
                     @selection-change="handleSelectionChange">
                     <el-table-column
                       type="selection"
                       width="60">
                     </el-table-column>
                      <el-table-column
                          prop="coupon_name"
                          label="活动名称">
                      </el-table-column>
                      <el-table-column
                          prop="coupon_money"
                          label="面额(元)"
                          width="100">
                      </el-table-column>
                      <el-table-column
                          prop="use_time"
                          label="活动时间"
                          width="180">
                      </el-table-column>
                      <el-table-column
                          prop="limit_take"
                          label="限领/人"
                          width="80">
                      </el-table-column>
                      <el-table-column
                          prop="createnum"
                          label="发行量"
                          width="80">
                      </el-table-column>
                      <el-table-column
                          prop="surplusnum"
                          label="剩余量"
                          width="80">
                      </el-table-column>
                  </el-table>
             </div>
       </div>
       <span slot="footer" class="dialog-footer">
         <el-button size="small" @click="dialogVisible = false">取 消</el-button>
         <el-button size="small" type="primary" @click="setCoupon(editForm)">确 定</el-button>
       </span>
     </el-dialog>
 </div>
</template>

<script>
import MakeFun from "../../js/make_fun.js";
 export default {
   data () {
     return {
          listData:[],
          radio:1,
          editForm:{
              promotion_goods_id:'',
              commission_rate:'',
              coupon_id:'',
              goods_name:'',
              list_img:'',
              goods_id:'',
              prom_price:'',
          },
          multipleSelection:[],
          dialogVisible:false,
          activeName: '1',
          tableData:[],
          currentPage:1,
          total:0,
          pageSize:10,
          first:true,
          second:false,
          thirty:false,
          fifty:false,
          count:1,
          promotion_type:'1',
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('releaseNewProducts', function(id){
		    that.fetch();
		  })
   },
   components: {

   },
   methods:{
     coupon_manager(){
       this.$router.push({path:"/store/productManager/shopCoupons"})
     },
     setCoupon(params){
       var arrid = [];
       var strid = '';
       this.multipleSelection.forEach((item)=>{
         arrid.push(item.coupon_id)
       })
       strid = arrid.join(",");
        var data = {
            promotion_goods_id:params.promotion_goods_id,
            commission_rate:params.commission_rate,
            coupon_id:strid,
        }
        MakeFun.editPromotionGoods("Promotiongoods/editPromotionGoods",data,this);
     },
     changeRadio(val){
        if(val==2){
            var data = {
              goods_id:this.editForm.coupon_id
            }
            MakeFun.getPromotionGoodsList("Coupon/getPromotionGoodsList",data,this);
        }
     },
     returnUrl(params){
           this.dialogVisible = true;
           this.radio = 1;
           this.editForm.promotion_goods_id = params.promotion_goods_id;
           this.editForm.commission_rate = params.commission_rate;
           this.editForm.coupon_id = params.coupon_id;
           this.editForm.goods_name = params.goods_name;
           this.editForm.list_img = params.list_img;
           this.editForm.prom_price = params.prom_price;
           this.editForm.goods_id = params.goods_id;
     },
     handleSelectionChange(val){
        this.multipleSelection = val;
     },
     search_exclusive(){
        this.$router.push({path:"/home/marketing/new_create_make_fun_exclusive"})
     },
    handleClick(tab,name){
        this.promotion_type = tab.name;
        this.fetch();
    },
   	fetch(val){
       var data = {
           promotion_type:this.promotion_type,
           page:val?val:this.currentPage,
           rows:this.pageSize,
       }
       MakeFun.PromotiongoodsIndex("Promotiongoods/index",data,this);
   	},
    deleteRow(params){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
          var data = {
            promotion_goods_id:params.promotion_goods_id
          }
          MakeFun.deletePromotiongoods("Promotiongoods/delete",data,this);
      }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
      });
      });
    },
    suspensionPromotion(params){
        var data = {
            promotion_goods_id:params.promotion_goods_id,
            type:params.close_open_status==1?"2":"1",
        }
        MakeFun.pauseOrOpen("Promotiongoods/pauseOrOpen",data,this);
    },
    newGeneralPromotion(val){
        this.$router.push({path:"/home/marketing/new_create_make_fun",query:{promotion_type:val}})
    },
    newExclusivePromotion(){

    },
      handleSizeChange(val){
          this.fetch(val);
      },
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/new_create_make_fun.less";
.strong{
    font-size:30px;
}
.releaseNewProducts{
    background:@backgroundfff;
    .top{
        position: relative;
        padding:20px;
        .new-product{
            position: absolute;
            right:20px;
            top:20px;
        }
    }
    .main{
        padding:20px;
    }
}

</style>

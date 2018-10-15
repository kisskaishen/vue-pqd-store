<template>
 <div class="shopCoupons">
     <div class="common-top-title">平台活动列表</div>
     <div class="main">
        <div class="search-input">
        <div class="leftLable">活动类型：</div><div class="rightLable">
            <el-select v-model="value" placeholder="全部"
              @change = "selectType()">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="list">
                     <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="goods_id"
            label="优惠券用户"
            width="180">
            </el-table-column>
            <el-table-column
            prop="goods_name"
            label="优惠券名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="type"
            label="优惠券类型">
            </el-table-column>
            <el-table-column
            prop="is_recommend"
            label="使用订单">
            </el-table-column>
            <el-table-column
            prop="store_count"
            label="使用时间">
            </el-table-column>
            <el-table-column
            prop="sales"
            label="优惠券金额(元)">
            </el-table-column>
            <el-table-column
            prop="prom_price"
            label="订单金额(元)">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size='15'
                layout="total, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </div>
        </div>
     </div>
 </div>
</template>

<script>
import productActiveList from '../../js/productActiveList';
 export default {
   data () {
     return {
       currentPage4:1,
       total:0,
        tableData:[],
        options: [{
          value: 0,
          label: '全部'
        },{
          value: 1,
          label: '首页商品'
        }, {
          value: 4,
          label: '9.9专区'
        }, {
          value: 2,
          label: '限时秒杀'
        }, {
          value: 5,
          label: '省钱大法'
        }, {
          value: 8,
          label: '为我助力'
        }, {
          value: 9,
          label: '趣多严选'
        }, {
          value: 6,
          label: '免单拼'
        }],
        value:0
     }
   },
   created(){
     var data = {
       'page':1,
       'type':0
     }
      // productActiveList.getProductActiveList("/api/goods/activity",data,this);
      productActiveList.getProductActiveList("/goods/goodsActivityList",data,this);
   },
   components: {

   },
   methods:{
     handleCurrentChange(val){
            var data = {
              'page':val,
              'type':this.value
            }
            productActiveList.getProductActiveList("/api/goods/activity",data,this);
     },
     selectType(){
            var data = {
              'page':1,
              'type':this.value
            }
            productActiveList.getProductActiveList("/api/goods/activity",data,this);
     }
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.shopCoupons{
    .main{
        padding:10px 0;
        background:@backgroundfff;
        position: relative;
        .rightClickButton{
            position: absolute;
            right:20px;
            top:10px;
        }
        .list{
            padding:20px;
        }
    }
}
 
</style>

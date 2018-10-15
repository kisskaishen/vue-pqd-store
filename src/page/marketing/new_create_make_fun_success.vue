<style lang="less" scoped="scoped">
@import "../../less/config.less";
@import "../../less/new_create_make_fun.less";
</style>
<template>
  <div class="new_create_make_fun">
       <div class="common-top-title">
          新建通用推广
       </div>
      <div class="explain">
      	<div class="explain_test">
      		为已选择的商品设置佣金和优惠券后，您的推广商品将被推客获取进行推广。
      	</div>
      </div>
      <div class="steps_warp">
         <el-steps :space="200" :active="3" finish-status="success">
             <el-step title="添加商品"></el-step>
             <el-step title="推广设置"></el-step>
             <el-step title="创建成功"></el-step>
         </el-steps>
      </div>
      <div class="warp_btn_back">
          <dl class="dl_img_warp">
            <dt>
              <img class="success_img" src="../../img/quduoduo/icon_fun_ confirm@2x.png" alt="">
            </dt>
            <dd>恭喜，创建成功！</dd>
          </dl>
          <div class="btn_sett">
            <el-button type="danger" size="small">确认</el-button>
            <el-button type="info" plain size="small">返回趣多进宝</el-button>
          </div>
      </div>
  </div>
</template>
<script>
import MakeFun from "../../js/make_fun.js";
export default {
    data(){
      return {
        promotion_type:'',
        multipleSelection:[],
        listData:[],
        radio:'1',
        dialogVisible:false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
          input:'',
          checked:false,
      }
    },
    created(){
        this.promotion_type = this.$route.query.promotion_type;
         MakeFun.getPromotionGoodsList("Coupon/getPromotionGoodsList",this);
    },
    methods:{
      saveSelectList(){

      },
      saveList(){
          if(this.multipleSelection.length==0){
                that.$message({
                    type: 'info',
                    message:'请选择'
                })
                return
          }
          var data = {
            promotion_type:this.promotion_type,
            data:this.multipleSelection
          }
          MakeFun.savePromotionGoods("Promotiongoods/savePromotionGoods",data,this);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addCoupon(){
            this.dialogVisible = true;
            this.listData = [
                {
                    "id": "13377",
                    "coupon_id": "gKp2r4GpdKmxp6Spr3up34Dem2M",
                    "coupon_name": "zzz",
                    "coupon_money": "0.00",
                    "use_time": "1970-01-01 08:00:00-1970-01-01 08:00:00",
                    "limit_take": "0",
                    "createnum": "0",
                    "surplusnum": 0
                }
            ]
      },
      entryPre(){
        this.$router.push({path:"/home/marketing/new_create_make_fun"})
      }
    }
}
</script>

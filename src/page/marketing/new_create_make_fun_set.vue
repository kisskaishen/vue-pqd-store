<style lang="less" scoped="scoped">
@import "../../less/config.less";
@import "../../less/new_create_make_fun.less";
</style>
<template>
  <div class="new_create_make_fun">
       <div class="common-top-title">
          新建通用推广
       </div>
        <div class="steps_warp">
            <el-steps :space="200" :active="2" finish-status="success">
                <el-step title="添加商品"></el-step>
                <el-step title="推广设置"></el-step>
                <el-step title="创建成功"></el-step>
            </el-steps>
        </div>
  	     	<div class="explain">
  	     		<div class="explain_test">
  	     			为已选择的商品设置佣金和优惠券后，您的推广商品将被推客获取进行推广。
  	     		</div>
  	     	</div>
          <div class="table_setting">
            <el-table
            :data="listData"
            border
            style="width: 100%">
            <el-table-column
              label="推广商品"
              width="500">
              <template slot-scope="scope">
                  <dl class="sett_dl_warp">
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
                        团购价:<span>{{scope.row.price}}</span>元
                      </div>
                    </dd>
                  </dl>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="佣金比率"
              width="220">
              <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.commission_rate" placeholder="佣金比率范围为10%-90%"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="优惠券信息">
              <template slot-scope="scope">
                  <span>{{scope.row.coupon_name}}</span>
                  <el-button v-show="scope.row.coupon_name==undefined||scope.row.coupon_name==''" type="text" @click="addCoupon(scope.row)">添加优惠券</el-button>
                  <el-button v-show="scope.row.coupon_name!=undefined&&scope.row.coupon_name!=''" type="text" @click="addCoupon(scope.row,scope.row.goods_coupon_id)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                  <el-button type="text" @click="deleteCoupon(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
        <div class="setting_next">
            <el-button @click="entryPre()" size="small">上一步</el-button>
            <el-button @click="saveList()" type="primary" size="small">确认</el-button>
        </div>

<el-dialog
  title="编辑商品推广信息"
  :visible.sync="dialogVisible"
  width="1000px">
  <div class="dialog_form">
        <dl class="sett_dl_warp" style="background:#f9f9f9;width:100%;padding:10px;">
          <dt class="sett_dt">
            <img class="dl_img" :src="form.list_img" alt="">
          </dt>
          <dd style="width:100%">
            <div class="title">
              {{form.goods_name}}
            </div>
            <div class="goods_id">
              商品ID:{{form.goods_id}}
            </div>
            <div class="price">
              团购价:<span>{{form.price}}</span>元
            </div>
          </dd>
        </dl>
        <!-- <div class="dialog_setting">
          <div class="dialog_setting_left">
              <span>设置佣金比率：</span><el-input disabled size="small" style="width:190px;" v-model="form.commission_rate"></el-input><span>%</span>
          </div>
          <div class="dialog_setting_right">
              <el-button type="text">+新建优惠券</el-button>
          </div>
        </div> -->
        <div class="dialog_setting">
          <div class="dialog_setting_left">
              <span>是否使用优惠券：</span>
              <el-radio v-model="radio" label="1">不使用</el-radio>
              <el-radio v-model="radio" label="2">使用</el-radio>
          </div>
        </div>
        <div class="dialog_setting_explain" v-show="radio==2">
            添加优惠券：<span>仅展示当前商品可用优惠券信息</span>
        </div>
        <div class="dialog_setting_table" v-show="radio==2">
             <el-table
                 :data="setlistData"
                 border
                 style="width: 100%"
                 >
                <el-table-column width="79">
                    <template slot-scope="scope">
                        <el-radio :label="scope.row.id" v-model="selectradio" @change.native="getTemplateRow(scope.row)">&nbsp</el-radio>
                    </template>
                </el-table-column>
                 <el-table-column
                     prop="coupon_name"
                     label="活动名称" width="200">
                 </el-table-column>
                 <el-table-column
                     prop="coupon_money"
                     label="面额(元)"
                     width="80">
                 </el-table-column>
                 <el-table-column
                     prop="use_time"
                     label="活动时间"
                     width="300">
                 </el-table-column>
                 <el-table-column
                     prop="limit_take"
                     label="限领/人"
                     width="100">
                 </el-table-column>
                 <el-table-column
                     prop="createnum"
                     label="发行量"
                     width="100">
                 </el-table-column>
                 <el-table-column
                     prop="surplusnum"
                     label="剩余量"
                     width="100">
                 </el-table-column>
             </el-table>
        </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="setCoupon()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import MakeFun from "../../js/make_fun.js";
export default {
    data(){
      return {
        templateSelection:{},
        selectradio:false,
        selectradioId:'',
        selectCouponName:'',
        form:{
          goods_name:'',
          goods_id:'',
          commission_rate:'',
          list_img:'',
          price:'',
        },
        promotion_type:'',
        listData:[],
        setlistData:[],
        currentData:{
          coupon_id:'',
          coupon_name:'',
        },
        radio:'1',
        dialogVisible:false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
          input:'',
          checked:false,
          currentPage:1,
          pageSize:10,
          goods_id_arr:'',
          currentid:'',
          goodsIdCoupon:''
      }
    },
    created(){
        this.promotion_type = this.$route.query.promotion_type;
        this.goods_id_arr = this.$route.query.goods_id;
          var data = {
              goods_ids:this.goods_id_arr
          }
          MakeFun.getPromotiongoodsGetCheckGoods("Promotiongoods/getCheckGoods",data,this);
    },
    methods:{
      deleteCoupon(data,index){
        this.listData.splice(index,1)
      },
      getTemplateRow(params){
          this.selectradioId = params.coupon_id;
          this.goodsIdCoupon = params.id;
          this.selectCouponName = params.coupon_name;
      },
      addCoupon(params,goods_coupon_id){
          this.selectradioId = '';
          this.goodsIdCoupon = '';
          this.selectCouponName = '';
          this.selectradio = goods_coupon_id;
          if(goods_coupon_id!=undefined){
              this.radio='2'
          }else{
              this.radio='1'
          }
          this.currentid = params.goods_id;
          this.currentData = params;
          this.dialogVisible = true;
          this.form.goods_name = params.goods_name;
          this.form.goods_id = params.goods_id;
          this.form.commission_rate = params.commission_rate;
          this.form.list_img = params.list_img;
          this.form.price = params.price;
          var data = {
            goods_id:this.form.goods_id
          }
          MakeFun.getPromotionGoodsListCoupon("Coupon/getPromotionGoodsList",data,this);
      },
      setCoupon(){
          this.$set(this.currentData, 'coupon_name', this.selectCouponName);
          this.$set(this.currentData, 'coupon_id', this.selectradioId);
          this.$set(this.currentData, 'goods_coupon_id', this.goodsIdCoupon);
          this.dialogVisible = false;
      },
      saveList(){
          var arr = [];
          var checkArr = [];
          var flag = false;
          var keys = 0;
          var self = this;
          this.listData.forEach((item,k)=>{
              if(item.commission_rate==''){
                  flag = true;
                  keys = k+1;
                  checkArr.push(keys);
              }
              arr.push({
                "goods_id":item.goods_id,
                "commission_rate":item.commission_rate,
                "coupon_id":item.coupon_id==undefined?"":item.coupon_id,
              })
          })
          if(!flag){
            var data = {
              promotion_type:this.promotion_type,
              data:arr
            }
            MakeFun.savePromotionGoods("Promotiongoods/savePromotionGoods",data,this);
          }else{
              this.$message({
                  type: 'info',
                  message: "第"+checkArr[0]+"行请输入佣金比率"
              })
          }
          // this.$router.push({path:"/home/marketing/new_create_make_fun_success"})
      },
      entryPre(){
        this.$router.push({path:"/home/marketing/new_create_make_fun",query:{promotion_type:this.promotion_type}})
      }
    }
}
</script>

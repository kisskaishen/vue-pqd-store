<style lang="less" scoped="scoped">
@import "../../less/config.less";
@import "../../less/new_create_make_fun.less";
.el-checkbox__inner{
  display: inline-block;

    background-color: #409EFF;
    border-color: #409EFF;
    margin-left: 10px;
    margin-top: 10px;
}
.el-checkbox, .el-checkbox__input {
    display: inline-block;
    position: relative;
    white-space: wrap;
}
.el-checkbox__input {
    top: 10px;
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
    left: 10px;
}
.select{
  position: relative;
  .el-checkbox{
    width:170px;
    height:264px;
    z-index: 4;
    .el-checkbox__input{
      word-break:break-all;
      word-wrap:break-word;
    }
    .el-checkbox__label{
      position: relative;
      display: block;
      padding-left: 0;
      top:-17px;
    }
  }
  .el-checkbox, .el-checkbox__input{
  word-break:break-all;
  word-wrap:break-word;
  }
}
</style>
<template>
  <div class="new_create_make_fun">
       <div class="common-top-title">
          新建通用推广
       </div>
 	     	<div class="explain">
 	     		<div class="explain_test">
 	     			最多可为{{total}}个商品设置推广，您已设置{{num}}个商品推广
 	     		</div>
 	     	</div>
        <div class="steps_warp">
            <el-steps :space="200" :active="1" finish-status="success">
                <el-step title="添加商品"></el-step>
                <el-step title="推广设置"></el-step>
                <el-step title="创建成功"></el-step>
            </el-steps>
        </div>
        <div class="goods_text_title">
            <div class="goods_text_title_left">
                已选<span>0/5</span>,单次最多选择10个商品
            </div>
            <div class="goods_text_title_right">
              <span class="input_value">
                <el-input size="small" v-model="form.goods_id" placeholder="请输入商品ID"></el-input>
              </span>
              <el-button @click="searchList()" size="small" type="primary">查询</el-button>
            </div>
        </div>
        <div class="table_goods_warp">
            <ul class="table_goods_warp_ul">
              <li :class="{table_goods_warp_li:true,active:item.checked==true}" v-for="(item,index) in listData">
                <div class="select">
                  <el-checkbox :disabled="item.is_promotion_goods==1" @change="changeCheck(item,item.checked)"  v-model="item.checked">
                    <div class="setting" v-show="item.is_promotion_goods==1">
                    </div>
                    <img v-show="item.checked==true||item.is_promotion_goods==1" class="is_select_img" src="../../img/quduoduo/icon_fun_ confirm@2x.png" alt="">
                    <dl class="table_goods_warp_li_dl">
                        <dt>
                          <img class="dl_img" :src="item.list_img" alt="">
                          <!-- <div class="setting" v-show="item.is_promotion_goods==1">
                              <div class="setting_warp">
                                <div class="img">
                                      <img src="../../img/quduoduo/icon_fun_add@2x.png" alt="">
                                </div>
                                <div class="text">
                                  添加为推广商品
                                </div>
                              </div>
                          </div> -->
                        </dt>
                        <dd>
                          <div class="price_id">
                              <div class="price_id_left">
                                  ￥{{item.price}}
                              </div>
                              <div class="price_id_right">
                                  ID:{{item.goods_id}}
                              </div>
                          </div>
                          <div class="detail">{{item.goods_name}}</div>
                        </dd>
                    </dl>
                  </el-checkbox>
                </div>
              </li>
            </ul>
              <div class="pagination" v-show="listData.length!=0">
               <el-pagination
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-size="pageSize"
                 layout="total, prev, pager, next, jumper"
                 :total='totals'>
               </el-pagination>
             </div>
        </div>
        <div class="setting_next">
            <el-button @click="entryNext()" type="primary" size="small">下一步</el-button>
            <el-button size="small">取消</el-button>
        </div>
  </div>
</template>
<script>
import MakeFun from "../../js/make_fun.js";
export default {
    data(){
      return {
          form:{
            goods_id:''
          },
          input:'',
          checked:false,
          promotion_type:'',
          total:0,
          num:0,
          currentPage:1,
          totals:0,
          pageSize:10,
          listData:[],
      }
    },
    created(){
      this.promotion_type = this.$route.query.promotion_type;
      this.fetch();
      MakeFun.getPromotionGoodsNum("Promotiongoods/getPromotionGoodsNum",this);
    },
    methods:{
      searchList(){
          this.fetch();
      },
      handleCurrentChange(val){
          this.fetch(val);
      },
      fetch(val){
        var data = {
            goods_id:this.form.goods_id,
            page:val?val:this.currentPage,
            pageSize:this.pageSize,
        }
        MakeFun.getPromotiongoodsGetGoods("Promotiongoods/getGoods",data,this);
      },
      changeCheck(params,flag){
          // console.log(JSON.stringify(params))
          //     console.log(flag)
      },
      entryNext(){
        var arr_goods_id = [];
        var str = '';
        this.listData.forEach((item)=>{
          if(item.checked){
            arr_goods_id.push(item.goods_id)
          }
        })
        if(arr_goods_id.length==0){
          this.$message({
            type:"info",
            message:"请选择商品"
          })
          return
        }
        str = arr_goods_id.join(",");
        this.$router.push({path:"/home/marketing/new_create_make_fun_set",query:{promotion_type:this.promotion_type,goods_id:str}})
      }
    },
}
</script>

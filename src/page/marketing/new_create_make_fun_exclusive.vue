<style lang="less" scoped="scoped">
@import "../../less/config.less";
@import "../../less/new_create_make_fun.less";
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
</style>
<template>
<div class="new_create_make_fun">
    <div class="common-top-title">
        新建通用推广
        <span class="common_top_right_btn">
          <el-button @click="backUp" size="small" type="primary">返回</el-button>
        </span>
    </div>
    <div class="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="订单明细" name="make_item1"></el-tab-pane>
            <el-tab-pane label="推广汇总" name="make_item2"></el-tab-pane>
            <el-tab-pane label="推广商品" name="make_item3"></el-tab-pane>
            <el-tab-pane label="通用推广" name="make_item4"></el-tab-pane>
            <el-tab-pane label="专属推广" name="make_item5"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="main">
        <component :is="currentView"></component>
    </div>
</div>
</template>
<script>
import MakeFun from "../../js/make_fun.js";
import make_item1 from "./module_make/make_item1";
import make_item2 from "./module_make/make_item2";
import make_item3 from "./module_make/make_item3";
import make_item4 from "./module_make/make_item4";
import make_item5 from "./module_make/make_item5";
export default {
    data(){
      return {
        activeName:"make_item1",
        currentView:"make_item1"
      }
    },
    components:{
      make_item1,make_item2,make_item3,make_item4,make_item5,
    },
    created(){
    },
    methods:{
      backUp(){
        this.$router.push({path:"/home/marketing/make_fun"})
      },
      handleClick(tab,name){
          this.currentView = tab.name;
      },
    }
}
</script>

<template>
 <div class="store-top">
     <div class="left">拼趣多商户管理后台</div>
     <div class="right">
     <el-popover
        ref="popover"
        placement="bottom"
        width="40"
        trigger="click">
        <el-button @click="goOut()">退出</el-button>
        </el-popover>
        <el-button v-popover:popover>欢迎！{{store_name}}</el-button>
     </div>
 </div>
</template>

<script>
	import Login from '../js/login.js'
 export default {
   data () {
     return {
        store_name:''
     }
   },
   created(){
       this.store_name = localStorage.getItem("storeName");
   },
   components: {

   },
   methods:{
        goOut(){
            Login.logout("passport/logout",this);
        }
   }
 }
</script>

<style lang="less" scoped>
.store-top{
    height:70px;
    line-height: 70px;
    background:#F0475A;
    color:#fff;
    margin-bottom:10px;
    .left{
        float:left;
        padding-left:100px;
        position: relative;
    }
    .left:before{
        position: absolute;
        left:30px;
        top:5px;
        display: block;
        content:'';
        width:60px;
        height:60px;
        overflow: hidden;
        background:url("../img/LOGO.png") no-repeat;
        background-size: cover;
    }
    .right{
        float:right;
        margin-right:20px;
    }
}
 
</style>


<style lang="less" scoped>
@import "../less/config.less";
@import "../less/login.less";
.error_img_warp{
    width:574px;
    margin: 0 auto;
    text-align: center;
    .error{
        width:574px;
        height:219px;
    }
    .error_text{
        color:#333;
        font-size:20px;
        margin:50px 0;
    }
}
</style>
<template>
 <div class="login">
        <div class="logo">
          <div class="login_warp">
                <img src="../img/login/logo.png" alt="">
              </div>
        </div>
        <div class="main">
            <div class="error_img_warp">
                <img class="error" src="../img/login/404.png" alt="">
                <div class="error_text">网络出现了一些问题哦...</div>
                <div class="error_btn"><el-button @click="reconnection()" size="small" type="danger">点击重试</el-button></div>
            </div>
        </div>
 </div>
</template>

<script>
import login from '../js/login';
 export default {
     methods:{
        reconnection(){
            this.$router.push('/store')
        }
     }
}
</script>


<template>
 <div>
        <div class="self_input_warp">
            <input class="getVal" type="text" placeholder="请输入验证码">
            <input class="btnVal" type="button" value="获取验证码">
        </div>
        <div class="self_input_warp">
            <input class="getVal" type="text" placeholder="请输入验证码">
            <div class="graphic_verification"></div> 
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style>
.self_input_warp{
    margin-top:10px;
    overflow: hidden;
    width:332px;
}
.self_input_warp .getVal{
    width:100px;
    height:38px;
    float:left;
 }
.self_input_warp .btnVal{
    cursor: pointer;
    float:right;
    width:150px;
    height:42px;
    border:none;
    background:#3686FF;
    color:#fff;
 }
.self_input_warp .graphic_verification{
     cursor: pointer;
     border:1px solid #eee;
    float:right;
    width:148px;
    height:40px;
  }
</style>

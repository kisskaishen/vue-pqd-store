<template>
   <div class="dialog_tt">
       <div class="title">等待支付</div>
       <div class="content">
           <div class="item">请在新打开的页面完成支付！若已完成支付，则选择已完成支付，若未完成支付，请继续支付</div>
           <div class="item">
               <div class="box">
                   <input class="continue" type="button" value="继续支付" />
               </div>
               <div class="box">
                   <input class="completed" type="button" value="已完成支付" />
               </div>
           </div>
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
.dialog_tt{
    width:600px;
    margin:160px auto;
    background:#fff;
}
.dialog_tt .title{
    height:40px;
    line-height: 40px;
    background:#D2373D;
    color:#fff;
    padding-left:20px;
}
.dialog_tt .content{
    padding:40px 0 20px 0;
}
.dialog_tt .content .item{
    width:400px;
    margin:0 auto;
    line-height: 1.5;
    overflow: hidden;
}
.dialog_tt .content .item .completed{
    padding:10px 20px;
    background:#D2373D;
    color:#fff;
    border:none;
    border-radius: 2px;
}
.dialog_tt .content .item .continue{
    padding:10px 20px;
    background:#D28037;
    color:#fff;
    border:none;
    border-radius: 2px;
}
.dialog_tt .content .item .box{
    width:50%;
    padding-top:20px;
    float:left;
    text-align: center
}
</style>

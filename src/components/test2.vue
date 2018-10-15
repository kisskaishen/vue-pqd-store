<template>
   <div class="bond_tt">
      <div class="title">支付信息</div>
      <div class="contents">
        <div class="main2">
            <div class="success">恭喜您！</div>
            <div class="explain">
                你的开店申请已经申请成功，我们将在1-3工作日审核完您得申请！审核结果另行通知！
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
.bond_tt{
  width:620px;
  height:280px;
  background:#fff;
  padding:0 20px;
  margin:0 auto;
  font-size:14px;
}
.bond_tt .weight{
  font-weight:bold;
}
.bond_tt .cash{
  color:#D2373D;
}
.bond_tt .detail{
  color:#aaa;
  padding-left:20px;
  cursor: pointer;
}
.bond_tt .title{
  font-weight:bold;
  height:40px;
  line-height: 40px;
  padding-left:12px;
  position: relative;
  border-bottom:1px solid #eee;
}
.bond_tt .title::before{
  position: absolute;
  left:0;
  top:13px;
  display: block;
  content:'';
  width:2px;
  height:14px;
  background:#D2373D;
}
 .bond_tt .contents{
   padding:40px 0;
   text-align: center
 }
 .bond_tt .contents .main2 .success{
   color:#D2373D;
   padding:10px 0;
   font-size:20px;
 }

 
</style>

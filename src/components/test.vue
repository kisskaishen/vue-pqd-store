<template>
   <div class="bond_tt">
      <div class="title">支付信息</div>
      <div class="content">
        <div class="main">
          <div class="item">
            <span class="label">支付类型：</span><span class="text weight">个人店铺保证金缴纳</span>
          </div>
          <div class="item">
            <span class="label">支付金额：</span><span class="text cash">¥1500.00</span><span class="detail">金额说明</span>
          </div>
          <div class="item">
            <span class="label">支付方式：</span>
            <span class="text"><input class="pay_type" name="checkbox" type="checkbox"  checked="checked" /></span>
          </div>
          <div class="item">
                <input type="button" class="agree_pay" value="同意协议并支付" />
          </div>
          <div class="item">
            <div class="centers">
              <div class="warp">
                <div class="left"><input class="agreement" name="checkbox" type="checkbox"  checked="checked" /></div>
                <div class="right agreement_text">同意《拼趣多商家入驻协议》</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <vue-quill-editor></vue-quill-editor>
   </div>
</template>

<script>
import sendProduct from "../js/sendProduct";
import vueQuillEditor from "./vue_quill_editor";
 export default {
   data () {
     return {

     }
   },
   created(){

   },
   components: {
		vueQuillEditor
   },
   methods:{

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
 .bond_tt .content{
   width:240px;
   padding:20px 0;
   margin:0 auto;
 }
 .bond_tt .content .main .item{
   height:40px;
   line-height: 40px;
 }
 .bond_tt .content .main .item .label{
   font-weight:bold;
 }
 .bond_tt .content .main .item .text{
   margin-left:10px;
 }
 .bond_tt .content .main .pay_type{
   width:14px;
   height:14px;
   position: relative;
 }
 .bond_tt .content .main .pay_type::before{
   width:80px;
   height:30px;
   position: absolute;
   content:'';
   display: block;
   top:-5px;
   left:30px;
   background:url(../img/icon_alipay.png) no-repeat;
   background-size:contain;
 }
 .bond_tt .content .main .item .agree_pay{
   width:100%;
   height:30px;
   line-height: 30px;
   background:#D2373D;
   color:#fff;
   text-align: center;
   border:none;
   border-radius: 2px;
   cursor: pointer;
 }
  .bond_tt .content .main .item .agreement{
    width:14px;
    height:14px;
 }
   .bond_tt .content .main .item .centers{
    text-align: center
 }
   .bond_tt .content .main .item .warp{
    display: inline-block;
    overflow: hidden;
    margin:0 auto;
 }
  .bond_tt .content .main .item .agreement_text{
    display: inline-block;
    height:14px;
    line-height: 32px;
    padding-left:10px;
    cursor: pointer;
    color:#3686FF;
 }

</style>
